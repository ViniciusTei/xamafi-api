import { Request, Response, NextFunction } from 'express';

export const HTTPErrorController = {
    HTTPError: (req: Request, res: Response) => {
        res.status(404).send({
            status: 404,
            error: 'Not found'
        })
    }
}