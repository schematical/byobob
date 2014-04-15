var markdown = require('markdown').markdown;
module.exports = exports = function lastModifiedPlugin (schema, options) {
    schema.add({ username: String });
    schema.add({ notes: String });
    schema.add({ name: String });
    schema.add({ url: String });
    schema.add({ active_date: Date });
    schema.add({ bkgd_image: String });
    schema.add({ bkgd_color: String });
    if (!schema.options.toObject) schema.options.toObject = {};

    schema.options.toObject.transform = function (doc, ret, options) {
        try{
            ret.notes_rendered =  markdown.toHTML(doc.notes);
        }catch(e){
            console.error(e);
        }

    }

 /*   schema.pre('save', function (next) {
        this.lastMod = new Date
        next()
    })
*/
   /* if (options && options.index) {
        schema.path('lastMod').index(options.index)
    }*/
}