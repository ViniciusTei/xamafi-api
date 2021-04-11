import * as db from '../Database/firebase';

//Types
import { Request, Response, NextFunction } from 'express';
import { CategoryModel, MovieModel, BaseMovie } from '../Interfaces/Movies';
import { json } from 'body-parser';

class HTTPResponse {
    status: number
    error?: string
    data?: any
    constructor(s: number, d?: any, e?: string,) {
        this.status = s
        d ? this.data = d : undefined
        e ? e = this.error : undefined
    }
}

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

            res.status(200).send(JSON.stringify(new HTTPResponse(200, trending)))

        } catch (error) {
            res.status(400).send(new HTTPResponse(400, 'Erro', error))
        }

    },

    async getById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        try {
            const trendingRef = await db.DataService.collection('movies').get()

            trendingRef.forEach(doc => {
                
                if(doc.id === id) {
                    
                    res.json(new HTTPResponse(200, {id: doc.id, ...doc.data()}))
                }
            });
 
        } catch (error) {
            res.status(400).send(new HTTPResponse(400, 'Erro', error))
        }
    },

    async createMovie(req: Request, res: Response, next: NextFunction) {

        const movie = req.body;

        const moviesRef = await db.DataService.collection('movies')

        moviesRef.add(movie)
        .then((doc) => {
            res.status(200).send({status: 200, message: 'Movie created!', id: doc.id})
        })
        .catch(err => {
            res.status(400).send(new HTTPResponse(400, 'Culdnt create movie', err)) 
        })
    },

    async getAllByCategorie(req: Request, res: Response, next: NextFunction) {
        try {
            const moviesRef = await db.DataService.collection('movies').get()
            const categoriesRef = await db.DataService.collection('categories').get()

            let movies: MovieModel[] = [];
            let response: any[] = []

            categoriesRef.forEach((categorie) => {
                let data: CategoryModel = <CategoryModel>categorie.data()
                
                moviesRef.forEach((movie) => {
                    let i: BaseMovie = <BaseMovie>movie.data()
                    console.log(i)
                    if(i.genres?.includes(data.slug)) {
                        movies.push({id: movie.id, ...i})
                    }
                })

                response.push({...data, itens: movies})
                movies = [];
            })

            res.status(200).send(new HTTPResponse(200, response))
        } catch (error) {
            res.status(400).send(new HTTPResponse(400, 'Culdnt retrieve movies', error))
        }
    }
}