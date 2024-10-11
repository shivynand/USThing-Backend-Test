import { Request, Response } from 'express';
import { fetchClassQuota } from '../fetchQuota';

export const getClassQuota = async (req: Request, res: Response) => {
    try {
        const quotas = await fetchClassQuota();
        res.json(quotas);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch class quota information' });
    }
};