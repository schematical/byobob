var path = require('path');
var fs = require('fs');
var ObjectId = require('mongoose').Types.ObjectId;
module.exports = function(app, uri){
    if(!uri) uri = '/products';

    app.param('product', populate)

    app.get(uri, render_list);
    app.get(uri + '/new', render_edit);
    app.get(uri + '/:product', render_detail);
    app.get(uri + '/:product/edit',render_edit);
    app.post(
        uri,
        [
            
            create
        ]
    );
    app.post(
        uri + '/:product',
        [
            
            update
        ]
    );


    function populate(req, res, next, id){
        var or_condition = []


        var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
        if(checkForHexRegExp.test(id)){
            or_condition.push({ _id:new ObjectId(id) });
        }
        
            or_condition.push({ namespace:id });
        
        if(or_condition.length == 0){
            return next();
        }
        var query = { $or: or_condition };
        app.model.Product.findOne(query, function(err, product){
            if(err){
                return next(err);
            }

            res.bootstrap('product', product);
            return next();
        })
    }

    function render_list(req, res, next){
        app.model.Product.find({}, function(err, product){
            if(err) return next(err);
            res.locals.product = product;
            res.render('model/product_list');
        });
    }
    function render_detail(req, res, next){
        if(!req.product){
            return next();
        }
        res.render('model/product_detail');
    }
    function render_edit(req, res, next){
        if(!req.product){
            //return next();
            req.product = new app.model.Product();
        }
        res.render('model/product_edit');
    }
    function create(req, res, next){
        if(!req.user){
            return res.redirect('/');
        }
        if(!req.product){
            req.product = new app.model.Product();
        }
        return update(req, res, next);

    }

    function update(req, res, next){
        if(!req.user){
            return res.redirect('/');
        }
        if(!req.product){
            return next(new Error('Product not found'));
        }

        
            
                req.product.namespace = req.body.namespace;
            
        
            
                req.product.name = req.body.name;
            
        
            
                req.product.desc = req.body.desc;
            
        
            
                req.product.url = req.body.url;
            
        
            
                req.product.weight = req.body.weight;
            
        
            
                req.product.section = req.body.section;
            
        

        req.product.save(function(err, product){
            //app._refresh_locals();
            res.render('model/product_detail', { product: req.product.toObject() });
        });

    }

}