const mongoose =require('mongoose');
const budgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    budgets:[{
        category:{
        type:String,
        enum:['food', 'entertainment', 'savings', 'rent', 'transport', 'investment', 'health', 'other'],
        required:true
    },
    percentage:{
        type:Number,
        required:true
    }
    }]
},
{timestamps:true})
const Budget= mongoose.model('Budget', budgetSchema)
module.exports= Budget