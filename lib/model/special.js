'use strict';
var passport = require('passport');
var passportLocalMongoose = require('passport-local-mongoose');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var fields = {
	email: { type: String },
	password: { type: String },
	name: { type: String },
	 hash: { type: Boolean },
	creDate: { type: Date , default: Date.now }
};
var accountSchema = new Schema(fields);

accountSchema.plugin(passportLocalMongoose, { usernameField:'email', usernameLowerCase:true});



var AccountModel = mongoose.model('Account', accountSchema);

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(AccountModel.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(AccountModel.serializeUser());
passport.deserializeUser(AccountModel.deserializeUser());


module.exports = AccountModel;