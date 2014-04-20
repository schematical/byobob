'use strict';
module.exports = function(app){

    var Schema = app.mongoose.Schema;

    var fields = {
        _id: { type: Schema.Types.ObjectId },
    
        
            namespace:{"type":"String","ipsum":"sentence"},
        
    
        
            name:{"type":"String","ipsum":"sentence"},
        
    
        
            desc_raw:String,
            desc_rendered:String,
        
    
        
            image:{"type":"String"},
        
    
        cre_date:Date
    };

    var sectionSchema = new Schema(fields);

    sectionSchema.virtual('uri').get(function(){
        
            return '/sections/' + this.namespace;
        
    });

    
        
    
        
    
        
            sectionSchema.virtual('desc').get(function(){
                return this.desc_rendered;
            }).set(function(value){
                var markdown = require('markdown');
                this.desc_raw = value;
                this.desc_rendered = markdown.toHTML(value);
            });

        
    
        
    


    sectionSchema.pre('save', function(next){
        if(!this._id){
            this._id = new app.mongoose.Types.ObjectId();
        }
        return next();
    });

    if (!sectionSchema.options.toObject) sectionSchema.options.toObject = {};
    sectionSchema.options.toObject.transform = function (doc, ret, options) {
        ret.uri = doc.uri;
        
            

            
        
            

            
        
            
                ret.desc = doc.desc_rendered;
                ret.desc_raw = doc.desc_raw;
            
        
            
                ret.image_s3_url = 'http://s3.amazonaws.com/' + app.njax.config.aws.bucket_name  +  '/' + doc.image;
            
        
    }

    return app.mongoose.model('Section', sectionSchema);
}