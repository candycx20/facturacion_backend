
const express       = require('express');
const cors          = require('cors');
const logger        = require('morgan');
const http = require('http');
const xmlparser = require('express-xml-bodyparser');
const app = express();

app.use(logger('dev'));
app.use(xmlparser());
//validacion de rutas
app.use(cors());

app.use(express.json({limit:"50mb"}));  
app.use(express.urlencoded({limit:"50mb" , extended: false }));  


require("./routes/index")(app);

app.use(express.static('./public'));

app.get('*', (req, res) => res.status(200).send({
     message: 'Index.',
}));

const port = parseInt(3000, 10) || 3000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;