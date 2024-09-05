const express = require('express');
const cors = require('cors');

const { ServerConfig } = require('./config');

const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors({
    // origin: `${ServerConfig.ORIGIN}`,
    origin: 'http://localhost:5173'
}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Server is listening to port ${ServerConfig.PORT}`);
});