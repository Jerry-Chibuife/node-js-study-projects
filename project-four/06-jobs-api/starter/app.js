require('dotenv').config();
require('express-async-errors');

const helmet = require('helmet')
const cors = require('cors')
const xss_clean = require('xss-clean')
const express_rate_limit = require('express-rate-limit')


const express = require('express');
const app = express();


const authRoutes = require('./routes/auth')
const jobRoutes = require('./routes/jobs')


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1)
app.use(
    express_rate_limit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}))
app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xss_clean())

// extra packages

const connectDB = require('./db/connect')
const authenticator = require('./middleware/authentication')
// routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', authenticator, jobRoutes)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
