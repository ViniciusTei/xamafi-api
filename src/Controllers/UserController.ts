import * as db from '../services/firebase';

export const UserController = {
    async getAllUsers(req: any, res: any) {
        let users:any[] = []
    
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
    }
}

