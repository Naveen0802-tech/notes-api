const mongoose   = require('mongoose');
const objectId   = mongoose.Schema.Types.ObjectId;
const NotesSchema = new mongoose.Schema({
   title: {type:"string",required:true},
   content: {type:"string",required:true},
   userId:{type:objectId,ref:'user'}
},{ timestamps: true})

module.exports = mongoose.model('notes', NotesSchema);