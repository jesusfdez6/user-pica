const express = require('express');
var cors = require('cors')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/v1/users';

        //middlewares
        this.middlewares();
        //rutas de mi aplicacion
        this.routes();


    }

    routes() {

        this.app.use(this.usuariosPath, require('../routes/user'));

    }
    listen() {
        this.app.listen(this.port);
        console.log(this.port);
    }

    middlewares() {

        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(cors())
    }





}
module.exports = Server;

//export {
  //  Server
//}