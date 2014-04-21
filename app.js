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
app.locals.partials._product = '_product';


app.model.Section.find(function(err, sections){
    if(err) throw err;
    app.locals.sections = [];
    async.eachSeries(
        sections,
        function(section, cb){
            app.model.Product.find(
                { section:section._id },
                function(err, products){
                    if(err) throw err;
                    var section_obj = section.toObject();
                    section_obj.products = [];
                    for(var i in products){
                        var product_objs = products[i].toObject();
                        product_objs._index = i;
                        section_obj.products.push(product_objs);
                    }
                    app.locals.sections.push(section_obj);
                    return cb();
                }
            );
        },
        function(){
            //Were Done
            console.log(app.locals.sections);
        }
    )
});



var routes = require(__dirname + '/lib/routes');
routes(app);

var amazon_routes = require(__dirname + '/lib/routes/amazon');
amazon_routes(app);

app.start();