import * as db from '../Database/firebase';

//Types
import { Request, Response } from 'express';
import { Category } from '../Models/Movies';

export const MoviesController = {
    async getTrending(req: Request, res: Response) {
        let trending: Category;

        const movieRef = db.DataService.collection('movie')
        const snapshot = await movieRef.get();
        
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
        });
    }
}