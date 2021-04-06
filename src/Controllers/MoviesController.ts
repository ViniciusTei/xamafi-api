import * as db from '../Database/firebase';

//Types
import { Request, Response, NextFunction } from 'express';
import { CategoryModel, MovieModel, BaseMovie } from '../Models/Movies';

export const MoviesController = {
    async getMovies(req: Request, res: Response, next: NextFunction){
        const trending: MovieModel[] = new Array<MovieModel>();
        const { id } = req.body;

        try {
            const trendingRef = await db.DataService.collection('movies').get()

            trendingRef.forEach(doc => {
                
                let data: BaseMovie = doc.data() as BaseMovie
                if(id) {
                    if(doc.id === id){
                        trending.push({
                            id: doc.id,
                            ...data
                        })
                    }
                } else  {
                    trending.push({
                        id: doc.id,
                        ...data
                    })
                }
            });

            res.status(200).send(JSON.stringify({status: 200, data: trending}))

        } catch (error) {
            res.status(400).send(error)
        }

    },

    async getById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        try {
            const trendingRef = await db.DataService.collection('movies').get()

            trendingRef.forEach(doc => {
                
                if(doc.id === id) {
                    res.json({status: 200, data: { id: doc.id, ...doc.data()}})
                }
            });

            return 
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async createMovie(req: Request, res: Response, next: NextFunction) {

        const movie = req.body;

        try {
            const moviesRef = await db.DataService.collection('movies')

            moviesRef.add(movie).then((doc) => {
                res.status(200).send({status: 200, message: 'Movie created!', id: doc.id})
            })
        } catch (error) {
            res.status(400).send(error)
        }

    },

    async getAllByCategorie(req: Request, res: Response, next: NextFunction) {
        let response = new Array<number>();
        console.log('a')
        try {
            // const moviesRef = await db.DataService.collection('movies').get()
            // const categoriesRef = await db.DataService.collection('categories').get()
            // categoriesRef.forEach(doc => {
            //     let data = doc.data()
            //     response.push({
            //         slug: data.slug,
            //         title: data.title,
            //         itens: moviesRef.docs.filter(movie => {
            //             let movieData = movie.data()
            //             if(movieData.genres.contain(data.slug)) {
            //                 return movieData
            //             }
            //         })
            //     })
            // });
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send(error)
        }
    }
}