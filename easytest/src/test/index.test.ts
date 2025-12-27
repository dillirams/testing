import {describe, expect, test, it, vi} from 'vitest';
import request from 'supertest';
import { app } from '../index.js';
import { prisma } from '../__mocks__/db.js';
import { create } from 'domain';


// vi.mock("../db", ()=>{
//     return{
//         prisma:{
//             request:{
//                 create:vi.fn()
//             }
//         }
//     }
// })

vi.mock("../db")


describe("http sum server", ()=>{
    it("should return sum of two positive number", async ()=>{
      prisma.request.create.mockResolvedValue({
         id:1,
         a:5,
         b:5,
         type:"sum",
         answer:10
      })

      vi.spyOn(prisma.request, "create")

        const res=await request(app).post('/sum')
       .send({a:5, b:4})
        
      expect(prisma.request.create).toHaveBeenCalledWith({
       data:{
         a:5,
         b:4,
         type:"sum",
         answer:9
       }
      })

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