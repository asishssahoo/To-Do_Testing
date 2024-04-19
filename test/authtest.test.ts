import { expect } from 'chai';
import chaiHttp from 'chai-http';
import chai from 'chai';
import { describe, it } from 'mocha';
import { basicAuth } from '../src/controllers/authMiddleware';
import { HttpStatusCode } from "../src/controllers/HttpStatusCode";
import app from '../src/controllers/app';

// Initialize Express application for testing
//const app: Express = express();

// Use the basicAuth middleware in the Express app
app.use(basicAuth);

// Use Chai HTTP plugin
chai.use(chaiHttp);

describe('basicAuth Middleware Tests', () => {
    it('should allow access with correct credentials', (done) => {
        // Send a request with correct credentials
        chai.request(app)
            .get('/')
            .set('Authorization', 'Basic ' + Buffer.from('admin:password').toString('base64'))
            .end((err, res) => {
                expect(res).to.have.status(HttpStatusCode.Ok);
                expect(res.body).to.deep.equal({ message: 'Authorized' });
                done();
            });
    });

    it('should deny access with incorrect credentials', (done) => {
        // Send a request with incorrect credentials
        chai.request(app)
            .get('/')
            .set('Authorization', 'Basic ' + Buffer.from('user:wrongpassword').toString('base64'))
            .end((err, res) => {
                expect(res).to.have.status(HttpStatusCode.Unauthorized);
                expect(res.body).to.deep.equal({ message: 'Unauthorized - Invalid credentials' });
                done();
            });
    });

    it('should deny access with invalid username format', (done) => {
        // Send a request with invalid username format
        chai.request(app)
            .get('/')
            .set('Authorization', 'Basic ' + Buffer.from('user@123:password').toString('base64'))
            .end((err, res) => {
                expect(res).to.have.status(HttpStatusCode.BadRequest);
                expect(res.body).to.deep.equal({ message: 'Invalid username format - Username must contain only alphanumeric characters' });
                done();
            });
    });

    it('should deny access without credentials', (done) => {
        // Send a request without Authorization header
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(HttpStatusCode.Unauthorized);
                expect(res.body).to.deep.equal({ message: 'Unauthorized - Username and password are required' });
                done();
            });
    });
});