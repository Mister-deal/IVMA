const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const { createStream } = require('rotating-file-stream');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require("mysql2");

const indexRouter = require('./routes/index.routes');
const userRouter = require('./routes/users.routes');
const healthRouter = require('./routes/health.routes');
const supplierRouter = require('./routes/suppliers.routes');
const categoryRouter = require('./routes/categories.routes');
const qrCodeRouter = require('./routes/qrCodes.routes');
const resetPasswordRouter = require('./routes/resetPassword.routes');

const url = new URL(process.env.DATABASE_URL);
const db = mysql.createConnection({
    host: url.hostname,
    user: url.username,
    password: url.password,
    port: url.port,
    database: url.pathname.substring(1) // Remove the leading '/' from pathname
});

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
app.use(categoryRouter);
app.use(qrCodeRouter);
app.use(supplierRouter);
app.use(resetPasswordRouter)


app.get('/api/test', (req, res) => {
    res.json({ message: 'GET request reçue !' });
});

app.post('/api/test', (req, res) => {
    res.json({ message: 'POST request reçue !', data: req.body });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// Se connecter à la base de données
db.connect( (error)=>{
    if(error){
        console.log(error)
    }else {
console.log('Connexion réussie à la base de données MySQL!')
}})

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
