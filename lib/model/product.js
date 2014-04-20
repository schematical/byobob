'use strict';
module.exports = function(app){

    var Schema = app.mongoose.Schema;

    var fields = {
        _id: { type: Schema.Types.ObjectId },
    
        
            namespace:{"type":"String","ipsum":"sentence"},
        
    
        
            name:{"type":"String","ipsum":"sentence"},
        
    
        
            desc_raw:String,
            desc_rendered:String,
        
    
        
            url:{"type":"String","ipsum":"sentence"},
        
    
        
            weight:{"type":"Number"},
        
    
        
            section:{ type: Schema.Types.ObjectId, ref: 'Section' },
        
    
        cre_date:Date
    };

    var productSchema = new Schema(fields);

    productSchema.virtual('uri').get(function(){
        
            return '/products/' + this.namespace;
        
    });

    
        
    
        
    
        
            productSchema.virtual('desc').get(function(){
                return this.desc_rendered;
            }).set(function(value){
                var markdown = require('markdown');
                this.desc_raw = value;
                this.desc_rendered = markdown.toHTML(value);
            });

        
    
        
    
        
    
        
    


    productSchema.pre('save', function(next){
        if(!this._id){
            this._id = new app.mongoose.Types.ObjectId();
        }
        return next();
    });

    if (!productSchema.options.toObject) productSchema.options.toObject = {};
    productSchema.options.toObject.transform = function (doc, ret, options) {
        ret.uri = doc.uri;
        
            

            
        
            

            
        
            
                ret.desc = doc.desc_rendered;
                ret.desc_raw = doc.desc_raw;
            
        
            

            
        
            

            
        
            

            
        
    }

    return app.mongoose.model('Product', productSchema);
}