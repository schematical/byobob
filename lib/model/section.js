'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var fields = {

    name:{"type":"string"},

    desc:{"type":"md"},

    image:{"type":"s3-asset"},

    cre_date:Date
};

var sectionSchema = new Schema(fields);

module.exports = mongoose.model('Section', sectionSchema);