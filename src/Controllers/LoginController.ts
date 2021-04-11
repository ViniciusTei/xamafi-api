import * as fire from '../Database/firebase';
import { hashCode } from '../utils';
//Types
import { Request, Response, NextFunction } from 'express';
import { User } from '../Models/User';

export const LoginController = {
    login: async (req: Request, res: Response, next: NextFunction) => {
        const { token } = req.params;
        const { email, password } = req.body;

        let user: User;

        let foundToken = false;

        await fire.DataService.collection('tokens').get()
            .then((docs) => {
                docs.forEach((document) => {
                    const data = document.data();
                    
                    const hash = hashCode(token);

                    if(hash.hash === data.hash) {
                        foundToken = true;
                        return
                    }
                })

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

            })
            .catch((error) => {
                res.status(500).send({status: 500, messase: error})
            })
    },

    sigup: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            await fire.LoginService.createUserWithEmailAndPassword(email, password)
            res.status(200).send({status: 200, messase: 'User created✨'})
        } catch (error) {
            res.status(500).send({status: 500, messase: 'User not created 😢'})
        }
    }
}

//Chama o metodo de login por email e senha do firebase
async function firebaseLogin(email: string, password: string) {    
    return await fire.LoginService.signInWithEmailAndPassword(email, password)
        
}