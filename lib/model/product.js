'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var fields = {

    name:{"type":"string"},

    desc:{"type":"md"},

    url:{"type":"string"},

    weight:{"type":"number"},

    cre_date:Date
};

var productSchema = new Schema(fields);

module.exports = mongoose.model('Product', productSchema);