import express from 'express';

export const app=express();

app.use(express.json());
app.post("/sum", async(req,res)=>{
    const a=req.body.a;
    const b=req.body.b;

    if(a>10000 || b>10000){
        res.status(422).json({
            message:"sorry we dont support big number"
        })
    }
    const ans=a+b;
    res.status(200).json({
        sum:ans
    })
})