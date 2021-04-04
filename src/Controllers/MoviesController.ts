import * as db from '../Database/firebase';

//Types
import { Request, Response } from 'express';
import { Category } from '../Models/Movies';

export const MoviesController = {
    async getTrending(req: Request, res: Response) {
        const trending: Category[] = new Array();

        try {
            const trendingRef = await db.DataService.collection('movies').doc('trending').collection('movie').get()
        
            let item: Category = {title: 'Em alta', movies: []}

            trendingRef.forEach(doc => {
                
                let data: any = doc.data()
                
                item.movies.push({
                    id: doc.id, 
                    backdrop_path: data.backdrop_path,
                    poster_path: data.poster_path,
                    overview: data.overview,
                    title: data.title,
                    release_date: data.release_date
                })
            });

            trending.push(item)
            res.status(200).send(JSON.stringify(trending))

        } catch (error) {
            res.status(400).send(error)
        }

    },

    async getById(req: Request, res: Response) {
        try {
            res.send('Hello World')
        } catch (error) {
            
        }
    }
}