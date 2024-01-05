import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import emailRoutes from './routes/emailRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', emailRoutes);

const PORT = process.env.PORT || 3780;

// console.log(process.env);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
