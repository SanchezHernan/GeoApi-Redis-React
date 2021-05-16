var redis = require('redis')
var express = require('express')
const cors = require('cors');


var redis_cliente = redis.createClient(6379, 'db-redis')
var app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors())


redis_cliente.on('connect', function(){
    console.log("conectado a tp3")
})


app.get('/', function( req, res){
    redis_cliente.keys('*', function(err, values){
        res.send(JSON.stringify(values))
    })
})

app.get('/delete/:key', function( req, res){
    const {key} = req.params;
    redis_cliente.del(key)
    res.send('Key eliminated correctly!')
})

app.get('/agregar/:grupo/:lat/:long/:lugar', function( req, res ){
    const {grupo, lat, long, lugar} = req.params
    redis_cliente.geoadd(grupo, long, lat, lugar)
    res.send('Punto cargado con exito')
})

app.get('/distancia/:grupo/:c1/:c2', function( req, res ){
    const {grupo, c1, c2} = req.params
    redis_cliente.geodist(grupo, c1, c2, 'km', function(err, value){
        res.send(JSON.stringify(value))
    })
})

app.get('/posicion/:grupo/:c1', function( req, res ){
    const {grupo, c1} = req.params
    redis_cliente.geopos(grupo, c1, 'km', function(err, value){
        res.send(JSON.stringify(value))
    })
})

app.get('/radio/:grupo/:lat/:long', function( req, res ){
    const {grupo, lat, long} = req.params
    redis_cliente.georadius(grupo, long, lat, '5', 'km', 'WITHCOORD', function(err, value){
        res.send(JSON.stringify(value))
    })
})

app.get('/radio/withdist/:grupo/:lat/:long', function( req, res ){
    const {grupo, lat, long} = req.params
    redis_cliente.georadius(grupo, long, lat, '5', 'km', 'WITHDIST', function(err, value){
        res.send(JSON.stringify(value))
    })
})




app.listen(3000, function(){
    console.log('Aplicación ejemplo, escuchando el puerto 3000!')
})