import { MongoClient } from 'mongodb';

const client = new MongoClient(`${process.env.DB_HOST}:${process.env.DB_PORT}`, {
    useUnifiedTopology: true
});

export default client;

