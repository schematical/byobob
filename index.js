var async = require('async');
var _ = require('underscore');

var njax = require('njax');
var njaxBootstrap = require('njax-bootstrap');
var app = njax({
    app_dir: __dirname,
    model:{
        account_plugin: require('./lib/model/_account')
    },
    port:3020
});

//njaxBootstrap(app);
app.locals.partials._navbar = '_navbar';
app.locals.partials._meta = '_meta';
app.locals.partials._account = '_account';
app.locals.partials._meta_footer = '_meta_footer';
app.locals.partials._modal = '_modal';

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
routes(app)
app.start();