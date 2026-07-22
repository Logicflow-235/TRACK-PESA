require('dotenv').config();
const bcrypt =require('bcrypt');
const User =require('./User');
const mongoose =require('mongoose');
const express =require('express');
const cors =require('cors');
const app = express();
const authMiddleware =require('./authmiddleware');

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('MongoDB connected'))
.catch((err)=>console.log('MongoDB connection error:', err))
const Transaction =require('./Transaction');
const { error } = require('node:console');

app.use(express.json());
app.use(cors());
app.use((req, res,next)=>{
    console.log(`${req.method}request to ${req.url}`);
    next();
}
)
app.get('/transactions', authMiddleware, async (req, res)=>{
    const {category}=req.query;
    try{
    if (category){
        const filtered= await Transaction.find({user:req.user.id, category});
        return res.json(filtered);
    }
    const allTransactions= await Transaction.find({user:req.user.id});
    res.json(allTransactions);}
    catch (err){
        res.status (500).json({error: err.message});
    }
});

app.post('/transaction', authMiddleware, async (req, res)=>{
    try{
        const newTransaction=new Transaction({
    amount:req.body.amount,
    category:req.body.category,
    user:req.user.id
   });
     const savedTransaction = await newTransaction.save();
   res.status(201).json(savedTransaction);
    }
    catch (err) {
 res.status(500).json({error: err.message})
    }
});
app.get('/transaction/:id', authMiddleware, async (req, res)=>
{try{
     const transaction= await Transaction.findOne({_id:req.params.id, user:req.user.id});
    if(!transaction){
        return res.status (404).send('Transaction not found');
    }
    res.json(transaction);
}
catch (err){
    res.status(500).json({error: err.message});
}
});
app.put('/transaction/:id', authMiddleware, async (req, res)=>{
    try{
        const updatedTransaction= await Transaction.findOneAndUpdate({_id:req.params.id, user:req.user.id},
            {amount:req.body.amount,
          category:req.body.category},{new: true}
        );
        if(!updatedTransaction){
            return res.status(404).send("Transaction not yefound");
        }
        res.json(updatedTransaction);
    }
    catch (err){
    res.status(500).json({error: err.message});
}
});
app.delete('/transaction/:id',  authMiddleware,async (req, res)=>{
    try{
        const deleteTransaction = await Transaction.findOneAndDelete({_id:req.params.id,
            user:req.user.id
        });
    if (!deleteTransaction){
        return res.status(404).send("Transaction not found");
    }
    res.status(200).send("Transaction deleted");
    }
    catch (err){
    res.status(500).json({error: err.message});}
});
app.post ('/register', async (req, res)=>{
    try{
        const{ username, password} =req.body;
        const hashedPassword =await bcrypt.hash(password, 10);
        const newUser= new User({
           username,
           password:hashedPassword
        });
        const savedUser =await newUser.save();
        res.status(201).json({id: savedUser._id, username: savedUser.username});
    }
    catch (err){
    res.status(500).json({error: err.message});}
});
const jwt=require('jsonwebtoken');
app.post('/login',  async (req,res)=>{
    try{
        const {username, password} =req.body;
        const user = await User.findOne({username});
        if(!user){return 
            res.status(401).send('Invalid username or password');
        }
        const isMatch =await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(401).send('Invalid username or password');
        }
        const token = jwt.sign(
            {id:user._id, username:user.username },
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        );
        res.json ({message:'Login sucessful', token});
    }
    catch (err){
    res.status(500).json({error: err.message});}
});
app.listen(5000, ()=>{
    console.log('server running on port')
});