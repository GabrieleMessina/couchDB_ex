var express = require('express');
var router = express.Router();
var cradle = require('cradle');
var db = new(cradle.Connection)('http://localhost', 5984, {auth: { username: 'admin', password: 'admin' }}).database('base2');

/** GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log('GET su /');



db.exists(function (err, exists) {
    if (err) {
      console.log('error', err);
    } else if (exists) {
        console.log('the force is with you.');
        popolato();
    } else {
          console.log('database does not exists.');
          creaDb();
          console.log('creo db');
      /** populate design documents */
    }


  });






function creaDb(){
    db.create();
}

function popolaDb(){
for (var i = 0; i < 3; i++) {

db.save({
    name: 'data',
    last_name: 'base',
    email: 'data@base.com',
    mobile: '123456789',
    premium: true,
    contacts: [],

  }, function (err, res) {
      console.log("ho popolato il db");
  });
}
for (var i = 0; i < 3; i++) {

db.save({
    name: 'data',
    last_name: 'base',
    email: 'data@base.com',
    mobile: '123456789',
    premium: false,
    contacts: [],

  }, function (err, res) {
      console.log("ho popolato il db");
  });
}
}

function popolato(){
    db.all(function(err, res) {
        console.log('--'+res+'--');
        if (err) {
            console.log('Error: %s', err);

        } else {
            if (res == '[]') {
                console.log('-------FALSE-----');
                popolaDb();
                console.log('popolo db');

            }
            else{
                console.log('-------TRUE-----');
                console.log('db già popolato');

            }


        }
    });
}







});

router.delete('/', function(req, res) {


    db.destroy();

    res.send('DELETE database');

});

module.exports = router;
