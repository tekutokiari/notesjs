const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const dotenv = require('dotenv');
dotenv.config();

const UserRoute = require('./routes/UserRoutes');
const NotesRoutes = require('./routes/NotesRoutes');

mongoose.connect(
  'mongodb+srv://teku:0BquyUUesLNgjgco@cluster0.6debptc.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running, port: ${PORT}`);
});

db.on('error', (err) => {
  console.log(err);
});

db.once('open', () => {
  console.log('open');
});

app.use('/api/notes', NotesRoutes);
app.use('/api/auth', UserRoute);
