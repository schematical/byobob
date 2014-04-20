module.exports = function(app){
    app.all('/', function(req, res, next){
        res.render('index');
    });


    /**
     * Model Routes
     */
    require('./model/index')(app);
}