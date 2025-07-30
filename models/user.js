const mongoose                  = require('mongoose');

const UserSchema = new mongoose.Schema({
   email: {type:"string",required:true},
   password: {type:"string",required:true}
},{ timestamps: true})

module.exports = mongoose.model('user', UserSchema);