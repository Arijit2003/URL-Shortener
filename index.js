const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const URL = require("./models/url");
const { connectToMongoDB } = require('./connect');
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth");


//rouer
const urlRouter = require("./routes/url");
const staticRouter = require('./routes/staticRouter');
const userRouter = require('./routes/user');

const PORT = 8001;
const app = express();

//connection
connectToMongoDB("mongodb://127.0.0.1:27017/url-shortner");

//view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoggedInUserOnly, urlRouter);
app.use('/', checkAuth, staticRouter);
app.use('/user', userRouter);




app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));