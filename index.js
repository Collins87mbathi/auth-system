const dotenv = require("dotenv");
const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const authRouter = require("./routes/auth");
const userRouter = require('./routes/user')
const PORT = process.env.PORT || 8000;
const app = express();
dotenv.config();

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for My Application',
        version: '1.0.0',
        description: 'This is a REST API application made with Express.',
    },
    servers: [
        {
            url: `http://localhost:${PORT}`,
            description: 'Development server',
        },
    ],
};

const swaggerOptions = {
    swaggerDefinition,

    apis: ['./routes/*.js'],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);



app.listen(PORT, () => {
    console.log(`server is listening ${PORT}`);
})