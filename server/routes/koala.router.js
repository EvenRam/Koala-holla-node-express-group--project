const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');
//DONT forget the require 
//note that pool goes up by ..
// DB CONNECTION


// GET
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "koala_info";';
    pool.query(queryText).then(result => {
      // Sends back the results in an object
      res.send(result.rows);
    }) 
      .catch(error => {
        console.log('error getting koala info', error);
        res.sendStatus(500);
      });
  });

// POST
router.post('/', (req, res) => {
    let newKoala = req.body;
    console.log(`Adding Koala`, newKoala);
  

    let queryText = `INSERT INTO "koala_info" ("name", "favorite_color","age","transfer", "notes")
                     VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [newKoala.name, newKoala.favorite_color, newKoala.age, newKoala.transfer, newKoala.notes])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new koala`, error);
        res.sendStatus(500);
      });
  });

// PUT
router.put('/:id', (req, res) => {

    
    let koalaId = req.params.id;
    //not sure if I should change direction 
    //isRead refers to the body as the isRead is in the data part of put request
    let transfer  = req.body.transfer;
  
    let queryText = `
    UPDATE "koala_info" SET "transfer"= NOT "transfer"
    WHERE "id"= $1;
`
    console.log("Change ready for transfer: ", koalaId, transfer)
  
  //line 56 confuses me 
  
  
    //in the below statement [] turns the koalaId into an Array

    // pool.query needed to take queryText and both koalaId and transfer, it was missing transfer - Michael

    pool.query(queryText, [koalaId])
      .then((result) => {
        res.sendStatus(204)
      })
      .catch((err) => {
        console.log(`Error making query.. '${queryText}'`, err)
        res.sendStatus(500)
      })
  })

// DELETE

module.exports = router;