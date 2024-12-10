const express = require('express');
const path = require('path');

const app = express();

app.use("/", express.static(path.join(__dirname, "dist")));

app.use("/rom", express.static(path.join(__dirname, "dist" ,"rom")));

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
