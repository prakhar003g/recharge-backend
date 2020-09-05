var mongoose = require('mongoose')
var RechargeSchema = mongoose.Schema({
    name: String,
    amount: String,
    operator: String,
    created_at: {
        type: String,
        default: Date
    },
    status:{
        type:String,
        default:"PENDING"
    },
    paid_date: String
});

exports = mongoose.model('recharge', RechargeSchema);