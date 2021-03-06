var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  firstName: { type : String ,  required : true },
  lastName: { type : String ,  required : true },
  email: { type : String },
  username: { type : String, required : true , index: true, unique: true },
  password: { type: String, required: true }
});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');