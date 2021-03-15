/** Express app for jobly. */
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const cors = require("cors");

const ExpressError = require("./helpers/expressError");
const app = express();

const { ORIGIN_FRONTEND, NODE_ENV } = require("./config");

const { authenticateJWT } = require("./middleware/auth");
const corsOptions = {
  origin: ORIGIN_FRONTEND,
  optionsSuccessStatus: 200,
  methods: ['GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: true,
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization,Set-Cookie',
  exposedHeaders: 'Content-Range,X-Content-Range'
}

app.use(express.json());
app.set('trust proxy', 1);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(authenticateJWT);


/** API Routes */
const regRouter = require("./routes/register");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const productRoutes = require("./routes/products");
const merchantRouter = require("./routes/merchants");
const gatheringRouter = require("./routes/gatherings");
const orderRoutes = require("./routes/orders");

// Configurations for dev & test environments
if (NODE_ENV === "dev" || NODE_ENV === "test") {
  // add logging system
  app.use(morgan("tiny"));
}

app.use("/api/reg", regRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRoutes);
app.use("/api/merchants", merchantRouter);
app.use("/api/gatherings", gatheringRouter);
app.use("/api/orders", orderRoutes);

/** View Routes */
const paymentRouter = require("./integrations/Square/paymentRouter");

app.use("/api/sqpay", paymentRouter);

/** 404 handler */
app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  // console.error(err.stack);

  return res.json({
    status: err.status,
    message: err.message
  });
});

module.exports = app;
