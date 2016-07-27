var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
var ObjectID = require( 'mongodb' ).ObjectID;
var html = require('/index.html')

var url = 'mongodb://localhost:27017/farm';//make this global


//**------------------------------------------------------**//
                        // CREATE //
//**------------------------------------------------------**//

app.post( '/animals', function(req,res) {

  MongoClient.connect( url, function(err, db){
    var collection = db.collection('animals')
    collection.insert({
      name:req.body.name,
      type:req.body.type,
      age:req.body.age
    })
    res.status(200).end();//this shows OK and 200 in insomnia
    db.close();
  })

});

//**------------------------------------------------------**//

//UNSUCCESSFUL ATTEMPTS


// app.get('/animals/:id',(function(req,res) {
//   MongoClient.connect( url, function(err, db) {
//    var collection = db.collection('animals')
//    collection.findById(req.params.id).toArray(function(err, docs) {
//      res.json( docs);
//    })
// });

// app.put( '/animals/:id', function(req,res) {

//   MongoClient.connect( url, function(err, db){
//     var collection = db.collection('animals')
//     collection.update({req}{
//       name:req.body.name,
//       type:req.body.type,
//       age:req.body.age
//     })
//     res.status(200).end();//this shows OK and 200 in insomnia
//     db.close();
//   })
  
// });

//**------------------------------------------------------**//
                        // INDEX //
//**------------------------------------------------------**//

app.get('/animals', function(req,res) {
 // res.send('Hello World!') - no longer need to do this- now want to send all animals.
 //to set up connection to db
 
 MongoClient.connect( url, function(err, db) //err -- error and db for database // 
 {
  var collection = db.collection('animals')//find us everything and convert this to a JS array as below
  collection.find({ }).toArray(function(err, docs) {
    res.json( docs);
    db.close();//closes connection to the db
  })
  })
 });

//**------------------------------------------------------**//
                        // UPDATE //
//**------------------------------------------------------**//

app.put( '/animals/:id', function( req, res ) {
 MongoClient.connect( url, function( err, db ) {
     var collection = db.collection( 'animals' )
     collection.updateOne({_id: new ObjectID(req.params.id)}, {$set: {name: req.body.name, type: req.body.type, age: req.body.age}});
         res.status(200).end();
         db.close();
     })
 console.log( req.body );
});

//**------------------------------------------------------**//
                        // DELETE //
//**------------------------------------------------------**//

app.delete( '/animals/:id', function( req, res ) {
 MongoClient.connect( url, function( err, db ) {
     var collection = db.collection( 'animals' )
     collection.remove({_id: new ObjectID(req.params.id)});
         res.status(200).end();
         db.close();
     })
 console.log( req.body );
});

//**------------------------------------------------------**//
                        // UPDATE DB //
//**------------------------------------------------------**//
// app.post('/', function(req, res) {

// })



// var request = new XMLHttpRequest();
//   request.open("POST", url);
//   request.setRequestHeader("Content-Type", "application/json");
//   request.onload = function(){
//     if(request.status === 200){
//     }
//   }
//   request.send(JSON.stringify( //**YOUR OBJECT HERE **//  ));




app.listen('3000', function() {
  console.log( 'running on 3000!');
})
