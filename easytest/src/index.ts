import express from 'express';
import { prisma } from './db.js';

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

   const sum= await prisma.request.create({
        data:{
            a:a,
            b:b,
            answer: ans,
            type:"sum"
        }
    })
console.log(sum)
    res.status(200).json({
        sum:ans,
        id: sum.id
    })
})