import * as db from '../Database/firebase';

//Types
import { Request, Response } from 'express';
import { Movie } from '../Models/Movies';

export const MoviesController = {
    async getMovies(req: Request, res: Response){
        const trending: Movie[] = new Array<Movie>();

        try {
            const trendingRef = await db.DataService.collection('movies').get()

            trendingRef.forEach(doc => {
                
                let data: any = doc.data()
                
                trending.push({
                    id: doc.id, 
                    backdrop_path: data.backdrop_path,
                    poster_path: data.poster_path,
                    overview: data.overview,
                    title: data.title,
                    release_date: data.release_date,
                    genres: data.genres
                })
            });

            res.status(200).send(JSON.stringify(trending))

        } catch (error) {
            res.status(400).send(error)
        }

    },

    async getById(req: Request, res: Response) {
        const { id } = req.params
        try {
            const trendingRef = await db.DataService.collection('movies').get()

            trendingRef.forEach(doc => {
                
                if(doc.id == id) {
                    res.json({ id: doc.id, ...doc.data()})
                }
            });

            return 
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async createMovie(req: Request, res: Response) {

        const movie = req.body;

        try {
            const moviesRef = await db.DataService.collection('movies')

            moviesRef.add(movie).then((doc) => {
                res.status(200).send({status: 200, message: 'Movie created!', id: doc.id})
            })
        } catch (error) {
            res.status(400).send(error)
        }

    }
}