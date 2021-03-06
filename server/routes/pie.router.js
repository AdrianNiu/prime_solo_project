const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();


// return all favorite saved pie in join of user table
router.get('/', (req, res) => {
    const id = req.user.id;
    console.log('GET pie id is:', req.user);
    const queryText = `SELECT * FROM "sentiment_pie"
                        WHERE user_id = $1
                        order by "sentiment_pie"."id" 
                        `;
    // need to add another row of data entry in pie_id
    const queryValues = [
        id,
    ];
    pool.query(queryText, queryValues)
        .then((result) => {
            console.log('Get PIE on server', result.rows);
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('Error completing SELECT PIE data', err);
            res.sendStatus(500);
        });
});


// add a new favorite Pie Chart update post data to upload user info， connect and update the sql table
// create a new column for user id
router.post('/', (req, res) => {
    const id = req.user.id;
    console.log('what is the id?????', id);
    
    console.log('the PieChart req body is:', req.body)
    const fav_pie = req.body;
    var pieData = [];
    console.log('TIME!!!', dateTime);

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    const queryText = `INSERT INTO sentiment_pie ("pie_negative", "pie_neutral", "pie_positive", "keyword", "time", "user_id")
                    VALUES ($1, $2, $3, $4, $5, $6)`;
    const queryValues = [
        fav_pie.saved_pie[0].toFixed(2),
        fav_pie.saved_pie[1].toFixed(2),
        fav_pie.saved_pie[2].toFixed(2),
        fav_pie.keyword,
        dateTime,
        id,
    ];
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(201); })
        .catch((err) => {
            console.log('Error completing insert Pie query', err);
            res.sendStatus(500);
        });
});



// update given favorite with a category id
router.put('/:favId', (req, res) => {
    // req.body should contain a category_id to add to this favorite image
    const data = req.body; const id = req.params.favId;
    console.log(`Setting category for id ${id} to ${req.body.category}`)
    const queryText = `UPDATE sentiment_result
                      SET note = ($1)
                      WHERE id = ($2)`;
    const queryValues = [
        req.body.category,
        id
    ]
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(201); })
        .catch((err) => {
            console.log('Error completing put category', err);
            res.sendStatus(500)
        })
});



// delete a saved pie
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    console.log(`In delete `, id)

    const queryText = `DELETE FROM sentiment_pie WHERE id = ($1)`
    const queryValues = [
        id
    ]
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(201); })
        .catch((err) => {
            console.log('Error completing put category', err);
            res.sendStatus(500)
        })
});

//add note router
router.put('/notes/:id', (req, res) => {
    let notes = req.body.notes;
    let id = req.params.id;
    console.log('In Notes Router, the PIE one!');

    //Updates the speech_info table on the notes field
    const queryText = `
                        UPDATE sentiment_pie 
                        SET notes = $1
                        WHERE id = $2;`;
    pool.query(queryText, [notes, id]).then((result) => {
        res.sendStatus(204);
    }).catch((error) => {
        console.log(`Error on query ${error}`);
        res.sendStatus(500);
    });
});

module.exports = router;


