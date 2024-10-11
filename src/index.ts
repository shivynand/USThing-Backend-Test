import express from 'express';
import { getClassQuota } from './controllers/classQuotaController';

export const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/class-quota', getClassQuota);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});