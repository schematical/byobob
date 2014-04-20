module.exports = function(app){
    /**
     * Model Routes
     */
    
        require('./section')(app);
    
        require('./product')(app);
    

}