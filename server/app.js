const express = require('express');
const path = require('path');
const app = express();
var port = process.env.PORT || 4000;

app.use('/public',express.static(path.join(__dirname ,"../public/")));
app.get('/', (req, res) => {
    /* console.log(path.join(__dirname,"../public/index.html")); */
    res.sendFile(path.join(__dirname,"../public/index.html"));
});

app.listen(port, () => {
    console.log("Server running on port 4000");
});