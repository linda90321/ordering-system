var Food = require('./models/food');

function getFoods(res) {
    Food.find(function (err, foods) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(foods); // return all foods in JSON format
    });
}
;

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all foods
    app.get('/api/food', function (req, res) {
        // use mongoose to get all foods in the database
        getFoods(res);
    });

    // create food and send back all foods after creation
    app.post('/api/food', function (req, res) {

        // create a food, information comes from AJAX request from Angular
        Food.create({
            name: req.body.name,
            price: req.body.price,
            done: false
        }, function (err, foods) {
            if (err)
                res.send(err);

            // get and return all the foods after you create another
            getFoods(res);
        });

    });

    // delete a food
    app.delete('/api/food/:food_id', function (req, res) {
        Food.remove({
            _id: req.params.food_id
        }, function (err, foods) {
            if (err)
                res.send(err);

            getFoods(res);
        });
    });
        

    // total price of foods
    app.get('/api/total', function (req, res) {
        Food.find(function (err, foods) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }
            var count=0;
            foods.forEach(function(food){
                count+=parseInt(food.price);
            });
            var tax = count * 0.075;
            var total = count * 1.075;
            res.json({Tax: "Tax : "+tax, Total:"Total : "+total}); // return all foods in JSON format
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};