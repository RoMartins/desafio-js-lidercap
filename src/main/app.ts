import 'reflect-metadata';
import './di'; // This should be one of the first imports to ensure the container is configured
import express, { Request, Response } from 'express';
import { postRoutes } from '../infra/http/routes/postRoutes';
import { userRoutes } from '../infra/http/routes/userRoutes';

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', userRoutes());
app.use('/api', postRoutes());

app.get('/', (req: Request, res: Response) => {
    res.send(
        'Bem-vindo à API do desafio Lidercap! Use /api/users/[id] para acessar os dados.',
    );
});

app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Servidor rodando na porta ${PORT}`);
});
