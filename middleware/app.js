const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
const freshServiceRouter = require('./api/router');
app.use('/', freshServiceRouter);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));