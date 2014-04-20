'use strict';
module.exports = function(app){
    
        app.model.Section =  require('./section')(app);
    
        app.model.Product =  require('./product')(app);
    
}