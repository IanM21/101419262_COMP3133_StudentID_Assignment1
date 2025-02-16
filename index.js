const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./src/graphql/schema.js');
const resolvers = require('./src/graphql/resolvers.js');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Connect to DB or throw error if connection fails
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        formatError: (error) => {
            return {
                message: error.message,
                status: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
            };
        },
        introspection: true,
        playground: true
    });

    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`
            🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}
            📝 GraphiQL available at http://localhost:${PORT}${server.graphqlPath}
        `);
    });
}

startServer();