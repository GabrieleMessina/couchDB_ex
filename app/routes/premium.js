var express = require('express');
var router = express.Router();
var cradle = require('cradle');
var db = new(cradle.Connection)('http://localhost', 5984, {auth: { username: 'admin', password: 'admin' }}).database('base2');

router.get('/', function(req, res, next) {

    db.all(function(err, res) {
        console.log('--'+res+'--');
        if (err) {
            console.log('Error: %s', err);

        } else {
            if (res == '[]') {
                console.log('Nessun utente');

            }
            else{
                console.log('ajskbdja', res);
                var arr = res;
                var i = 0;
                var u = 0;
                var premiumUser = [];
                console.log('aihbsd', arr);
                for (i = 0; i < arr.length; i++){
                    console.log(i, arr.length);
                    db.get(arr[i].id, function (err, doc) {
                      if (doc.premium == true) {
                        premiumUser[u] = doc;
                        u++;
                      }
                    });
                    if(i == (arr.length-1)) stampaGet(premiumUser);
                }
                }
            }
        });

    function stampaGet(premiumUser){
        console.log('premiumUser', premiumUser);
        res.send(premiumUser);

    }

});

module.exports = router;