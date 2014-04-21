var path = require('path');
var fs = require('fs');
var async = require('async');
var ObjectId = require('mongoose').Types.ObjectId;
module.exports = function(app, uri){
    if(!uri) uri = '/sections';

    app.param('section', populate)

    app.get(uri, render_list);
    app.get(uri + '/new', render_edit);
    app.get(uri + '/:section', render_detail);
    app.get(uri + '/:section/edit',render_edit);
    app.post(
        uri,
        [
            
                app.njax.s3.route(['image']),
            
            create
        ]
    );
    app.post(
        uri + '/:section',
        [
            
            app.njax.s3.route(['image']),
            
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
        app.model.Section.findOne(query, function(err, section){
            if(err){
                return next(err);
            }

            res.bootstrap('section', section);
            return next();
        })
    }

    function render_list(req, res, next){
        app.model.Section.find({}, function(err, section){
            if(err) return next(err);
            res.locals.section = section;
            res.render('model/section_list');
        });
    }
    function render_detail(req, res, next){
        if(!req.section){
            return next();
        }
        res.render('model/section_detail');
    }
    function render_edit(req, res, next){
        async.series([
            function(cb){
                if(!req.section){
                    //return next();
                    req.section = new app.model.Section();
                }
                return cb();
            },
            
            function(cb){

                res.render('model/section_edit');
            }
        ]);
    }
    function create(req, res, next){
        if(!req.user){
            return res.redirect('/');
        }
        if(!req.section){
            req.section = new app.model.Section();
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

        
            
                req.section.namespace = req.body.namespace;
            
        
            
                req.section.name = req.body.name;
            
        
            
                req.section.desc = req.body.desc;
            
        
            
                req.section.image = req.files.image.s3_path;
            
        

        req.section.save(function(err, section){
            //app._refresh_locals();
            res.render('model/section_detail', { section: req.section.toObject() });
        });

    }

}