
const express = require('express');
import sequelize from './database';
import authRoute from './routes/authRoute';
// import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
// dotenv.config();

const app = express();
const PORT = 8082;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:4200", 
    credentials: true,
}));

app.get('/test', (req: any, res: any) => {
    res.send('Hello World');
});

app.use('/api/auth', authRoute);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});