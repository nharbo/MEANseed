var mongoose = require('mongoose');

var connection = mongoose.connect('mongodb://user:password@ds015780.mlab.com:15780/mean_seed', function(err){
    if(err){
        console.log("Failed to connect to db! ----- " + err);
    } else {
        console.log("Connected to db!");

    }
});

exports.connection = connection;