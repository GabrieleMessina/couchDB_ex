var express = require('express');
var router = express.Router();
var members;
var detailMembers;
var cradle = require('cradle');
var db = new(cradle.Connection)().database('base2');

router.get('/', function(req, res, next) {

    console.log('GET su members');



    db.all(function(err, res) {
        console.log('--'+res+'--');
        if (err) {
            console.log('Error: %s', err);

        } else {

            console.log("esistono utenti");
            members = res;

            if (res == '[]') {
                console.log('Nessun utente');
                stampaGet();
            }
            else{
                console.log('ajskbdja', res);
                var arr = res;
                var i = 0;
                var u = 0;
                var User = [];
                console.log('aihbsd', arr);
                for (i = 0; i < arr.length; i++){
                    console.log(i, arr.length);
                    db.get(arr[i].id, function (err, doc) {
                        User[u] = doc;
                        u++;
                    });

                }
                detailMembers = User;
                console.log('detailMembers-------->', detailMembers);
                setTimeout(stampaGet, 500);
                }
            }
        });


    function stampaGet(){
    console.log("stampo a schermo la lista degli utenti");
    res.send(members);
    }

});

router.post('/', function (req, res) {
    console.log('POST su members');

    /**user modify*/

    if(req.body.tagId != undefined){
    db.merge(req.body.tagId, {name: 'altro nome'}, function (err, res) {
      console.log("modifico utente")
    });

    /**post members/:id*/

    stampaMod();
    }
    else{
        console.log('nessun UserId');
            db.save({
                name: 'data',
                last_name: 'base',
                email: 'data@base.com',
                mobile: '123456789',
                premium: true,

              }, function (err, res) {
                  /** Handle response*/
                  if (err) {
                        console.log('Error: %s', err);

                    } else {
                        console.log("creo utente");
                        stampaPost();

                    }
                });
    }



    function stampaPost(){
        res.send('POST request to memebers');
    }

    function stampaMod(){
        res.send(" POST modifica utente con id");
    }


});

router.delete('/', function(req, res) {


    db.remove(req.body.tagId, function (err, res) {
      /** Handle response*/
    });

    res.send('DELETE utente con id');

});

router.get('/:tagId/contacts', function(req, res, next) {
    db.get(req.params.tagId, function (err, doc) {
      console.log(doc);
      res.send(doc.contacts);
  });
});


router.post('/contacts', function (req, res) {

    if(req.body.tagId != undefined){
    console.log("modifico utente", detailMembers);
        var pivot = isIdInArray(req.body.tagId);
        if(pivot != null){
            console.log("ciao", detailMembers[pivot].contacts);

            var RanIndice = Math.floor((Math.random() * detailMembers.length) + 0);

            detailMembers[pivot].contacts.push(detailMembers[RanIndice]._id);
            console.log("push", detailMembers[pivot].contacts);
            var contactsPush = detailMembers[pivot].contacts;

        db.merge(req.body.tagId, {contacts : contactsPush}, function (err, res) {
      console.log("modifico utente");
    });
    }
    res.send("modifico lista contatti utente");
    }
    else res.send("inserisci id utente");

    function isIdInArray(id){
        for (i = 0; i < detailMembers.length; i++){
            if(detailMembers[i]._id == id){
                return i;
            }
        }
        return null;
    }


});


router.delete('/contacts', function(req, res) {

if(req.body.tagId != undefined && req.body.tagId2 != undefined ){
    console.log("modifico utente", detailMembers);
        var pivot = isIdInArray(req.body.tagId);



        if(pivot != null){
            console.log("ciao", detailMembers[pivot].contacts);
            var index = detailMembers[pivot].contacts.indexOf(req.body.tagId2);

            if (index > -1) {
                detailMembers[pivot].contacts.splice(index, 1);
            }


            console.log("splice", detailMembers[pivot].contacts);
            var contactsSplice = detailMembers[pivot].contacts;


        db.merge(req.body.tagId, {contacts : contactsSplice}, function (err, res) {
      console.log("modifico utente");
    });
    }
    res.send('DELETE utente con id');
    }
    else res.send("inserisci id utente");



    function isIdInArray(id){
        for (i = 0; i < detailMembers.length; i++){
            if(detailMembers[i]._id == id){
                return i;
            }
        }
        return null;
    }




});



module.exports = router;
