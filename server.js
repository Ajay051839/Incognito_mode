const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/group', require('./routes/api/group'));
app.use('/api/watchlist', require('./routes/api/watchlist'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
