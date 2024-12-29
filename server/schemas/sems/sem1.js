const { default: mongoose } = require("mongoose");



const sem1Schema = new mongoose.Schema({

    branch: String,
    subject_name: String,
    unit_no: String,
    filename:String,
    reference_no:Number,
    content: Buffer,

});


const Sem1Model = mongoose.model("sem1", sem1Schema);
module.exports = Sem1Model;