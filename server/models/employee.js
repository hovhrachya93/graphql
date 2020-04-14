const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: String,
    last_name: String,
    email: String,
    phone: String,
    companyId: String,
})

module.exports = mongoose.model("Employee", employeeSchema)