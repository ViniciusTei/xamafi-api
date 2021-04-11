import * as db from '../Database/firebase';

//Types
import { Request, Response } from 'express';
import { User } from '../Interfaces/User';

export const UserController = {
    async getUsers(req: Request, res: Response) {
        let users:User[] = []
    
        await db.DataService.collection('users').get()
        
        .then((snap: any) => {
                snap.forEach((doc: any) => {
                 users.push({
                     id: doc.id,
                     ...doc.data()
                 })
     
                })
                res.json(users) 
        })
        .catch((err: any) => {
            res.json({err: 'erro'})
        })
    },

    async createUser(req: Request, res: Response) {
        let user:User = req.body
    
        await db.DataService.collection('users').add(req.body)
        
        // .then((snap: any) => {
        //         snap.forEach((doc: any) => {
        //          users.push({
        //              id: doc.id,
        //              ...doc.data()
        //          })
     
        //         })
        //         res.json(users) 
        // })
        // .catch((err: any) => {
        //     res.json({err: 'erro'})
        // })
    }
}

