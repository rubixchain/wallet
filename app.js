const express = require('express');
const app = express();
const port=2000;

app.listen(port, () => console.log("app listening on port ", port));
console.log("IN EXPRESS")