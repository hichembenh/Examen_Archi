"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commande_1 = __importDefault(require("./modules/commande"));
const body_parser_1 = __importDefault(require("body-parser"));
const serve_static_1 = __importDefault(require("serve-static"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const Eureka = require('eureka-js-client').Eureka;
require('dotenv').config();
let configClient = require('node-config-client');
var Database;
const eureka = new Eureka({
    instance: {
        instanceId: 'COMMANDESERVICE',
        app: 'COMMANDESERVICE',
        hostName: process.env.HOSTNAME,
        ipAddr: process.env.ADRESSE,
        statusPageUrl: 'http://' + process.env.HOSTNAME + ':' + process.env.PORT,
        port: {
            '$': process.env.PORT,
            '@enabled': 'true',
        },
        vipAddress: 'COMMANDESERVICE',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
        registerWithEureka: true,
        fetchRegistry: true,
    },
    eureka: {
        host: process.env.EUREKA_HOST,
        port: process.env.EUREKA_PORT,
        servicePath: '/eureka/apps/'
    }
});
eureka.logger.level('debug');
eureka.start(function (error) {
    console.log(error || 'complete');
});
/* Instancier Express */
const app = express_1.default();
/* Middleware bodyParser pour parser le corps des requêtes en Json*/
app.use(body_parser_1.default.json());
/* Middlware pour configurer le dossier des ressources statique*/
app.use(serve_static_1.default("public"));
/* Actvier CORS*/
app.use(cors_1.default());
//configClient.load({
//	name:'livres-service', // spring application name
//   location:'localhost:8888', // spring cloud server address
// name:'application_name', // spring application name
//profiles:['prod','test','dev'], // spring profiles    
//label:'master', // git branch
//location:'localhost:8888', // spring cloud server address
//}).then(config => {
// getting configuration
//console.log(`mysql host: ${config.get('mysql.frota.host')}`);
//console.log(`mysql username: ${config.get('mysql.username')}`);
//console.log(`mysql password: ${config.get('mysql.password')}`);
//console.log(`mysql database: ${config.get('Database')}`);
//const Database:String=`${config.get('Database')}`
//console.log(config.get('Database'))
/*const uri:string="mongodb://Livres.aliases:27017/biblio";*/
const uri = "mongodb://" + process.env.DATABASE + ":" + process.env.DBPORT + "/biblio";
//const uri:string="mongodb://localhost:27017/biblio";
mongoose_1.default.connect(uri, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Mongo db connection sucess");
    }
});
app.get("/", (req, resp) => {
    resp.send("Hello world");
});
/* Requête HTTP GET http://localhost:8700/ */
app.get("/", (req, resp) => {
    resp.send("Hello world");
});
/* Requête HTTP GET http://localhost:8700/commandes */
app.get("/commandes", (req, resp) => {
    commande_1.default.find((err, commandes) => {
        if (err) {
            resp.status(500).send(err);
        }
        else {
            resp.send(commandes);
        }
    });
});
/* Requête HTTP GET http://localhost:8700/commandes/id */
app.get("/commandes/:id", (req, resp) => {
    commande_1.default.findById(req.params.id, (err, commande) => {
        if (err) {
            resp.status(500).send(err);
        }
        else {
            resp.send(commande);
        }
    });
});
/* Requête HTTP POST http://localhost:8700/commandes */
app.post("/commandes", (req, resp) => {
    let commande = new commande_1.default(req.body);
    commande.save(err => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(commande);
    });
});
/* Requête HTTP PUT http://localhost:8700/commandes/id */
app.put("/commandes/:id", (req, resp) => {
    commande_1.default.findByIdAndUpdate(req.params.id, req.body, (err, commande) => {
        if (err)
            resp.status(500).send(err);
        else {
            resp.send("Successfuly updated commande");
        }
    });
});
/* Requête HTTP DELETE http://localhost:8700/commandes/id */
app.delete("/commandes/:id", (req, resp) => {
    commande_1.default.deleteOne({ _id: req.params.id }, err => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send("Successfuly deleted Commande");
    });
});
app.get("/pcommandes", (req, resp) => {
    let p = parseInt(req.query.page || 1);
    let size = parseInt(req.query.size || 5);
    commande_1.default.paginate({}, { page: p, limit: size }, function (err, result) {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(result);
    });
});
app.get("/commandes-serach", (req, resp) => {
    let p = parseInt(req.query.page || 1);
    let size = parseInt(req.query.size || 5);
    let keyword = req.query.kw || '';
    commande_1.default.paginate({ title: { $regex: ".*(?i)" + keyword + ".*" } }, { page: p, limit: size }, function (err, result) {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(result);
    });
});
/* Démarrer le serveur*/
app.listen(process.env.PORT, () => {
    console.log("Server Started on port %d", process.env.PORT);
});
