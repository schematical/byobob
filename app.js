var async = require('async');
var _ = require('underscore');

var njax = require('njax');
var njaxBootstrap = require('njax-bootstrap');
var models = require('./lib/model');
var config = require('./config');

var app = njax(config);
models(app);
njaxBootstrap(app);
app.locals.partials._navbar = '_navbar';
app.locals.partials._meta = '_meta';

app.locals.partials._meta_footer = '_meta_footer';
app.locals.partials._modal = '_modal';
app.locals.partials._section = '_section';

app.model.Section.find(function(err, sections){
    app.locals.sections = [];
    for(var i in sections){
        app.locals.sections[i] = sections[i].toObject();
    }
});


app.use(function(req, res, next){
    async.series([
        function(cb){

            return next();
/*
            //Shitty hack
            if(req.user){
                return next();
            }
            app.model.Account.findOne({ email:'mlea@schematical.com' }, function(err, account){

                req.login(account, function(err) {
                    if (err) { return next(err); }
                    return cb();
                });

            })*/

        }
    ],
    next
    );


})
//app._refresh_locals = require('./lib/modules/timeout')(app);
//setTimeout(app._refresh_locals, 5* 60 * 1000);
//app._refresh_locals();


var routes = require(__dirname + '/lib/routes');
routes(app);

app.start();