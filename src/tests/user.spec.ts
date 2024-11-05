import appInstance, { server } from "../app";

import request from "supertest";
import mongoose from "mongoose";
import { afterEach, beforeEach, describe, expect, test } from '@jest/globals';
require("dotenv").config();

let token: string;
let userId: string;

beforeEach(async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI!);
    }

    const getJwtToken = await request(appInstance.app)
        .post("/api/token/generate")
        .send({ userName: "test" });

    token = getJwtToken.body.token;
});

describe("Test CRUD API", () => {
    test("Should return 200 and list of users", async () => {
        const res = await request(server)
            .get("/api/users")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200)
        expect(res.body.data).toBeInstanceOf(Array)
    });

    test("Should return 401 Unauthorized for unauthenticated requests", async () => {
        const res = await request(server).get("/api/users");
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("message", "Access denied.");
    });
    
    test("Should create a new user", async () => {
        const res = await request(server)
            .post("/api/users/create")
            .send({
                userName: "testBaru",
                accountNumber: "0323923823",
                emailAddress: "testbaru@gmail.com",
                identifyNumber: "392832"
            })
            .set("Authorization", `Bearer ${token}`);

        userId = res.body.data._id
    
        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty("data")
        expect(res.body.data).toHaveProperty("userName", "testBaru")
    });

    test("Shoud update the user's email", async () => {
        const res = await request(server)
            .put(`/api/users/update/${userId}`)
            .send({
                emailAddress: "testbaru@gmail.com",
            })
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).toHaveProperty("emailAddress", "testbaru@gmail.com")
    })

    test("Should delete a user", async () => {
        const res = await request(server)
            .delete(`/api/users/delete/${userId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.body).toHaveProperty("message", "User deleted successfully!")
    })
});

afterEach(async () => {
    await mongoose.connection.close();
})
