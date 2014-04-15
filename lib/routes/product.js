var path = require('path');
var fs = require('fs');
module.exports = function(app, uri){
    if(!uri) uri = '/products';

    app.param('product', populate)
    app.get(uri, render_list);
    app.get(uri + '/:product', render_detail);
    app.post(uri, create);
    app.put(uri, update);


    function populate(req, res, next, id){
        app.model.Product.findOne({ hash: id }, function(err, account){
            if(err){
                return next(err);
            }
            req.product = product;//TODO:Bootstrap
            return next();
        })
    }
    function render_list(req, res, next){
        console.log("HIT");
        res.render('product_detail');
    }
    function render_detail(req, res, next){
        if(!req.product){
            return next();
        }
        res.render('product_detail');
    }
    function create(req, res, next){
        if(!req.user){
            return res.redirect('/');
        }
        if(!req.product){
            req.product = new app.model.Project();
        }
        return update(req, res, next);

    }

    function update(req, res, next){
        if(!req.user){
            return res.redirect('/');
        }
        if(!req.product){
            return next(new Error('Project not found'));
        }
        req.product.username = req.body.username;
      

        req.user.save(function(err, user){
            //app._refresh_locals();
            res.render('edit', { user: req.user.toObject() });
        });

    }

}