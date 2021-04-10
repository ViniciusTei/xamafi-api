import * as db from '../Database/firebase';
import {hashCode} from '../utils';

//Types
import { Request, Response, NextFunction } from 'express';

export const TokenController = {
    createToken: async (req: Request, res: Response) => {
        const hashInfo = hashCode();
        await db.DataService.collection('tokens').add({hash: hashInfo.hash})
            .then((doc) => {
                res.status(200).send({
                    status: 200,
                    token: hashInfo.code
                })
            })
            .catch((doc) => {
                res.status(400).send({
                    status: 400,
                    error: 'Failed creating your token'
                })
            })
    }
}
