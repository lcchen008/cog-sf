var mongoose = require('mongoose');
 
var imageSchema = new mongoose.Schema({
    data: Buffer,
    userid: String,
    contentType: String
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('Image', imageSchema);