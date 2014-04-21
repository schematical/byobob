var aws = require("aws-lib");
module.exports = function(app){
    app.locals.partials._amazon_result = 'amazon/_result';
    app.get('/amazon/search', function(req, res, next){
        res.render('amazon/search');
    });
    app.post('/amazon/search', function(req, res, next){


        var prodAdv = aws.createProdAdvClient(
            app.njax.config.aws.accessKeyId,
            app.njax.config.aws.secretAccessKey,
            app.njax.config.aws.associateId
        );

        prodAdv.call(
            "ItemSearch",
            {
                SearchIndex: "Blended",
                Keywords: req.body.keywords,
                ResponseGroup:'Images,ItemAttributes,Similarities'
            },
            function(err, _results) {
                if(err) return next(err);
                var results = [];
                for(var i in _results.Items.Item){
                    results.push(_results.Items.Item[i]);
                }
                res.locals.results = results;
                console.log(res.locals.results[0]);
                res.render('amazon/search');
            }
        )
    })
}