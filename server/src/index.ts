import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
	origin: process.env.CLIENT_URL,
	credentials: true,
}));

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})