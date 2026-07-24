const mongoose= require('mongoose');
const transactionSchema =new mongoose.Schema({
    title: { type: String,
        required:true
    },
    amount:{type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:['income', 'expense'],
        required:true
    },
    date:{
        type:String,
        required:true
    },
    user:{
        type :mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},
{timestamps:true});
const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports=Transaction;