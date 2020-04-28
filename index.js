const express = require('express')
const app = express();
console.log("TEST");
app.use(express.static(__dirname + '/dist/my-recipes'));

app.get('/', (req, res) => {
    res.send("Server started");
})


let server = app.listen(process.env.PORT || 2000, () => {
    let port = server.address().port;
    console.log("Server started at port : "+port);
})