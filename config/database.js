const mongoose = require("mongoose")
const url = process.env.MONGO_URL || "mongodb://localhost:27017/notesDb"
mongoose.connect(url).then(()=>{
    console.log("Connection successfully")
}).catch(()=>{
    console.log("Connection failed")
})