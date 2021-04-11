import * as fire from '../Database/firebase';
import { hashCode, checkForToken } from '../utils';
//Types
import { Request, Response, NextFunction } from 'express';
import { User } from '../Interfaces/User';

export const LoginController = {
    login: async (req: Request, res: Response, next: NextFunction) => {
        const { token } = req.params;
        const { email, password } = req.body;

        let user: User;

        const foundToken = await checkForToken(token);

        if(foundToken) {    
            firebaseLogin(email, password)
            .then(async (response) => {
                const uid = response.user?.uid;
                
                await fire.DataService.collection('users').where('uId', '==', uid).get()
                .then((snap) => {
                    snap.forEach(doc => {
                        const d = doc.data()
                        user = {
                            id: doc.id, 
                            email: d.email,
                            foto_url: d.foto_url,
                            primeiro_nome: d.primeiro_nome,
                            segundo_nome: d.segundo_nome,
                            uId: d.uId
                        }
                    })
                });

                //Eh importante deslogar do servico do firebase pois nao vamos mais utiliza-lo
                await fire.LoginService.signOut();
                
                res.status(200).send({status: 200, messase: 'Loged in ✨', data: user})
            })
            .catch((error) => {
                res.status(500).send({status: 404, messase: 'User not found 😢'})
            });

        } else {
            res.status(404).send({status: 404, messase: 'Token not found 😢'})

        }
    },

    singup: async (req: Request, res: Response) => {
        const { token } = req.params;
        const { email, password } = req.body;
        
        try {
            const foundToken = await checkForToken(token);

            if(foundToken) {
                let newUser: any;
                await fire.LoginService.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    const userCreated = userCredential.user;
                    newUser = {
                        uId: userCreated?.uid || '',
                        email: email,
                        foto_url: '',
                        primeiro_nome: '',
                        segundo_nome: ''
                    };
                  })
                await fire.DataService.collection('users').add(newUser);
                res.status(200).send({status: 200, messase: 'User created✨'})
            } else {
                res.status(404).send({status: 404, messase: 'Token not found 😢'})
            }
            
        } catch (error) {
            res.status(500).send({status: 500, messase: 'User not created 😢'})
        }
    }
}

//Chama o metodo de login por email e senha do firebase
async function firebaseLogin(email: string, password: string) {    
    return await fire.LoginService.signInWithEmailAndPassword(email, password)
        
}