const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const { createStream } = require('rotating-file-stream');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index.routes');
const userRouter = require('./routes/users.routes');
const healthRouter = require('./routes/health.routes');

const domain = ['http://localhost:3000'];
const allowedHeaders = ['Authorization', 'Content-Type', 'AuthorizationHeader'];

const app = express();
const PORT = 8081;

// Logging setup
const accessLogStream = createStream('access.log', {
    interval: '7d',
    path: path.join('./', 'access.log'),
});

// Middleware
app.use(morgan('combined', { stream: accessLogStream }));
app.use(cors({
    origin: domain,
    methods: ['GET,POST,PUT,PATCH,DELETE'],
    credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use(healthRouter);
app.use(indexRouter);
app.use(userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
