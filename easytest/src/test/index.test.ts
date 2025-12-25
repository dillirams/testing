import {describe, expect, test, it, vi} from 'vitest';
import request from 'supertest';
import { app } from '../index.js';
import { prisma } from '../db.js';
import { create } from 'domain';

vi.mock("../db", ()=>{
    return{
        prisma:{
            request:{
                create:vi.fn()
            }
        }
    }
})


describe("http sum server", ()=>{
    it("should return sum of two positive number", async ()=>{
        const res=await request(app).post('/sum')
       .send({a:4, b:5})
        
       expect(res.status).toBe(200);
       expect(res.body.sum).toBe(9)
    })

     it("should return sum of two negative number", async ()=>{
        const res=await request(app).post('/sum')
       .send({a:-4, b:-5})
        
       expect(res.status).toBe(200);
       expect(res.body.sum).toBe(-9)
    })

    

     it("should return sum of two integer", async ()=>{
        const res=await request(app).post('/sum')
       .send({a:-4, b:5})
        
       expect(res.status).toBe(200);
       expect(res.body.sum).toBe(1)
    })

     it("should not support big number", async ()=>{
        const res=await request(app).post('/sum')
       .send({a:100000000, b:5})
        
       expect(res.status).toBe(422);
    })
})