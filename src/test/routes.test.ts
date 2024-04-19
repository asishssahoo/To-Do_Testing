//import { expect } from 'chai';
import chaiHttp from 'chai-http';
import chai from 'chai';
import { describe, it } from 'mocha';
import { basicAuth } from '../controllers/authMiddleware';
import { HttpStatusCode } from "../controllers/HttpStatusCode";
//import app from '../controllers/app';
import { app } from '..';


const expect = chai.expect;
chai.use(chaiHttp);

describe('Routes with basicAuth Middleware Tests', () => {
    // Test case to verify access with correct credentials
    it('should allow access with correct credentials', (done) => {
        // Send a request with correct credentials
        chai.request(app)
            .post('/insertrecord') // Protected route using basicAuth middleware
            .set('Authorization', 'Basic ' + Buffer.from('admin:password').toString('base64'))
            .send({
                "id": 999,
                "firstName": "Asish",
                "lastName": "K"
            })
            .end((err, res) => {
                expect(res).to.have.status(HttpStatusCode.Ok); // Expect HTTP status 200
                expect(res.body).to.deep.equal({ message: 'Record created successfully' }); // Expect response message
                done(); // Callback to signal completion of the test
            });
    });

    // Test case to verify rejection with incorrect credentials
    it('should reject access with incorrect credentials', (done) => {
        // Send a request with incorrect credentials
        chai.request(app)
            .post('/insertrecord') // Protected route using basicAuth middleware
            .set('Authorization', 'Basic ' + Buffer.from('invaliduser:invalidpass').toString('base64'))
            .send({
                "id": 999,
                "firstName": "Asish",
                "lastName": "K"
            })
            .end((err, res) => {
                expect(res).to.have.status(HttpStatusCode.Unauthorized); // Expect HTTP status 401 (Unauthorized)
                expect(res.body).to.have.property('message').that.includes('Unauthorized - Invalid credentials'); // Expect error message
                done(); // Callback to signal completion of the test
            });
    });
});

//chai.use(chaiHttp);

    // Test case for inserting a new record (POST /insertrecord)
    it('Should insert a new record with correct credentials', (done) => {
        const requestBody = {
            "id": 999,
            "firstName": "Asish",
            "lastName": "K"
        };

        chai.request(app)
            .post('/insertrecord')
            .set('Authorization', 'Basic ' + Buffer.from('admin:password').toString('base64'))
            .send(requestBody)
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(HttpStatusCode.Ok);
                expect(res.body).to.have.property('message').that.includes('Record created successfully');
                done();
            });
    }).timeout(30000);

    // Test case for unauthorized access (POST /insertrecord with invalid credentials)
    it('Should return an error message for invalid credentials', (done) => {
        const requestBody = {
            "id": 999,
            "firstName": "Asish",
            "lastName": "K"
        };

        chai.request(app)
            .post('/insertrecord')
            .set('Authorization', 'Basic ' + Buffer.from('invaliduser:invalidpass').toString('base64'))
            .send(requestBody)
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(HttpStatusCode.Unauthorized);
                expect(res.body).to.have.property('message').that.includes('Unauthorized - Invalid credentials');
                done();
            });
    }).timeout(30000);

    // Test case for getting a specific record (GET /getrecord/:empId)
    it('Should return a specific record with correct credentials', (done) => {
        const empId = "999";
    
        chai.request(app)
            .get(`/getrecord/${empId}`)
            .set('Authorization', 'Basic ' + Buffer.from('admin:password').toString('base64'))
            .end((err, res) => {
                console.log(res.body); // Log the response body to inspect its structure
                expect(res).to.be.json;
                expect(res).to.have.status(HttpStatusCode.Ok);
                //expect(res.body).to.have.property('id'); // Update this assertion based on the response structure
                done();
            });
    }).timeout(10000);
    
    

    // Test case for updating a record (PUT /updaterecord/:empId)
    it('Should update a specific record with correct credentials', (done) => {
        const empId = "999";
        const updatedData = {
            "lastName": "UpdatedLastName"
        };

        chai.request(app)
            .put(`/updaterecord/${empId}`)
            .set('Authorization', 'Basic ' + Buffer.from('admin:password').toString('base64'))
            .send(updatedData)
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(HttpStatusCode.Ok);
                expect(res.body).to.have.property('message').that.includes('Record updated successfully');
                done();
            });
    }).timeout(10000);

    // Test case for deleting a record (DELETE /deleterecord/:empId)
    it('Should delete a specific record with correct credentials', (done) => {
        const empId = "999";

        chai.request(app)
            .delete(`/deleterecord/${empId}`)
            .set('Authorization', 'Basic ' + Buffer.from('admin:password').toString('base64'))
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(HttpStatusCode.Ok);
                expect(res.body).to.have.property('message').that.includes('Record deleted successfully');
                done();
            });
    }).timeout(10000);

// it("Should insert a new record", (done) => {
//         const requestBody = {
//           "id": 999,
//           "firstName": "Asish",
//           "lastName": "K"
//         };
      
//         chai.request(app)
//           .post("/insertrecord")
//           .set('Authorization', 'Basic ' + Buffer.from('invaliduser:invalidpass').toString('base64'))
//           .send(requestBody) // Send the request body directly
//           .end((err, response) => {
//             // Assert the response
//             expect(response).to.be.json;
//             expect(response).to.have.status(HttpStatusCode.Ok); // Check for the expected status code
//             expect(response.body).to.have.property('message').that.includes('Record created successfully'); // Check for a success message in the response
//             if (err) return done(err);
//             done();
//           });
//       }).timeout(30000);      
//    it("Should return error message", (done) => {
//       const requestBody = {
//           "id" : 999,
//           "firstName": "Asish",
//           "lastName": "K"
//       };
//       chai.request(app)
//       .post("/insertrecord")
//       .send(requestBody)
//       .end((err, response) => {
//           expect(response)
//           .to.be.json;
//           expect(response)
//           .have.status(HttpStatusCode.BadRequest);
//           if (err) return done(err);
//           done();
//       })
//   }).timeout(30000);
//    it("Should return error message1", (done) => {
//        const testProduct = {
//            "firstName": "Asish",
//            "address" : "Odisha"
//        };
//        chai.request(app)
//        .post("/insertrecord")
//        .send(testProduct)
//        .end((err, response) => {
//            expect(response)
//            .to.be.json;
//            expect(response)
//            .have.status(HttpStatusCode.Ok);
//            if (err) return done(err);
//            done();
//        })
//    }).timeout(30000);
//    it("Should return error message", (done) => {
//       const testProduct = {};
//       chai.request(app)
//       .post("/insertrecord")
//       .send(testProduct)
//       .end((err, response) => {
//           expect(response)
//           .to.be.json;
//           expect(response)
//           .have.status(HttpStatusCode.BadRequest);
//           if (err) return done(err);
//           done();
//       })
//   }).timeout(30000);

// describe("Get request to /getrecord/:empId", async () => {
//    it("Should return a array of one record", (done) => {
//        const empId = "999";
       
//        chai.request(app)
//        .get(`/getrecord/${empId}`)
//        .end((err, response) => {
//            expect(response)
//            .to.be.json;
//            expect(response)
//            .have.status(HttpStatusCode.Ok);
//            if (err) return done(err);
//            done();
//        })
//    }).timeout(10000);
//    it("Should return error mesage", (done) => {
//       const empId = 9999;
//       chai.request(app)
//       .get(`/getrecord/${empId}`)
//       .end((err, response) => {
//            expect(response)
//            .to.be.json;
//            expect(response)
//            .have.status(HttpStatusCode.NotFound);
//            if (err) return done(err);
//            done();
//        })
//    }).timeout(10000);
// });

// describe("PUT request to /updaterecord/:empId", async () => {
//    it("Should return a array of one produts", (done) => {
//        const empId = "999";
//        const recordToBeUpdated = {
//            "lastName": "Sahoo",
//        }
//        chai.request(app)
//        .put(`/updaterecord/${empId}`)
//        .send(recordToBeUpdated)
//        .end((err, response) => {
//            expect(response)
//            .to.be.json;
//            expect(response)
//            .have.status(HttpStatusCode.Ok);
//            if (err) return done(err);
//            done();
//        })
//    }).timeout(10000);
//    it("Should return error mesage", (done) => {
//       const empId = 999;
//       const recordToBeUpdated = {
//           "address": "Odisha",
//       }
//       chai.request(app)
//       .put(`/updaterecord/${empId}`)
//       .send(recordToBeUpdated)
//       .end((err, response) => {
//            expect(response)
//            .to.be.json;
//            expect(response)
//            .have.status(HttpStatusCode.Ok);
//            if (err) return done(err);
//            done();
//        })
//    }).timeout(10000);
// });

// describe("GET request to get all records", async () => {
//    it("Should return a array of records", (done) => {
//        chai.request(app)
//        .get("/getallrecords")
//        .end((err, response) => {
//            expect(response)
//            .to.be.json;
//            expect(response)
//            .have.status(HttpStatusCode.Ok);
//            if (err) return done(err);
//            done();
//        })
//    }).timeout(10000);
// });


// describe("Delete request to /deleterecord/:empId", async () => {
//    it("Should return a array of one produts", (done) => {
//        const empId = "999";
       
//        chai.request(app)
//        .delete(`/deleterecord/${empId}`)
//        .end((err, response) => {
//            expect(response)
//            .to.be.json;
//            expect(response)
//            .have.status(HttpStatusCode.Ok);
//            if (err) return done(err);
//            done();
//        })
//    }).timeout(10000);
//    it("Should return error mesage", (done) => {
//       const empId = 999;
//       chai.request(app)
//       .delete(`/deleterecord/${empId}`)
//       .end((err, response) => {
//            expect(response)
//            .to.be.json;
//            expect(response)
//            .have.status(HttpStatusCode.NotFound);
//            if (err) return done(err);
//            done();
//        })
//    }).timeout(10000);
// });