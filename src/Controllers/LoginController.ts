import * as db from '../Database/firebase';
import { hashCode } from '../utils';
//Types
import { Request, Response, NextFunction } from 'express';

export const LoginController = {
    login: async (req: Request, res: Response, next: NextFunction) => {
        const { token } = req.params;
        let foundToken = false;

        await db.DataService.collection('tokens').get()
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
                    res.status(200).send({status: 200, messase: 'Loging in ✨'})
                } else {
                    res.status(404).send({status: 404, messase: 'Token not found 😢'})

                }

            })
            .catch((error) => {
                res.status(500).send({status: 500, messase: error})
            })
        
        
    }
}