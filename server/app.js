const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const usersRouter = require('./router/users');
const keyboardsRouter = require('./router/keyboards');
const reviewsRouter = require('./router/reviews');
const likesRouter = require('./router/likes');
const inquiriesRouter = require('./router/inquiries');
const shopsRouter = require('./router/shops');
const authRouter = require('./router/auth');
const adminRouter = require('./router/admin');
const models = require('./models');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: 'https://keyplus.kr',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    Headers: { 'content-type': 'application/json' },
  })
);
app.use(morgan('tiny'));

app.use('/users', usersRouter);
app.use('/keyboards', keyboardsRouter);
app.use('/reviews', reviewsRouter);
app.use('/likes', likesRouter);
app.use('/inquiries', inquiriesRouter);
app.use('/shops', shopsRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
  res.status(201).send('success');
});

models.sequelize.sync({ force: false }).then(() => {
  console.log('success');
});

app.listen(5000);
