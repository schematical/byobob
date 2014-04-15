var path = require('path');
var fs = require('fs');
module.exports = function(app, uri){
    if(!uri) uri = '/sections';

    app.param('section', populate)
    app.get(uri, render_list);
    app.get(uri + '/:section', render_detail);
    app.post(uri, create);
    app.put(uri, update);


    function populate(req, res, next, id){
        app.model.Section.findOne({ hash: id }, function(err, section){
            if(err){
                return next(err);
            }
            req.section = section;//TODO:Bootstrap
            return next();
        })
    }
    function render_list(req, res, next){
        console.log("HIT");
        res.render('section_list');
    }
    function render_detail(req, res, next){
        if(!req.section){
            return next();
        }
        res.render('section_detail');
    }
    function create(req, res, next){
        if(!req.user){
            return res.redirect('/');
        }
        if(!req.section){
            req.section = new app.model.Project();
        }
        return update(req, res, next);

    }

    function update(req, res, next){
        if(!req.user){
            return res.redirect('/');
        }
        if(!req.section){
            return next(new Error('Section not found'));
        }

        
        req.section.name = req.body.name;
        
        req.section.desc = req.body.desc;
        
        req.section.image = req.body.image;
        

        req.section.save(function(err, section){
            //app._refresh_locals();
            res.render('section_edit', { section: req.section.toObject() });
        });

    }

}