const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersController = require('./controllers/users');
app.use('/users', usersController);

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`app is listening on port ${port}`);
});
