var path = require('path');
var fs = require('fs');
module.exports = function(app){
   var product = require('./product');
   product(app);

}