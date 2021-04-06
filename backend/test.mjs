import app from './src/app.mjs';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.use(chai.should);

describe('API VALIDATION', () => {
    it('should list orders from julian@parcellab.com', (done) => {
        chai.request(app)
            .get('/orders/julian@parcellab.com')
            .end((err, res) => {
                apiDataProperty(res).an('array').not.length(0);
                done();
            });
    });

    it('should get the order ORD-123-2018', (done) => {
        chai.request(app)
            .get('/order/ORD-123-2018')
            .end((err, res) => {
                apiDataProperty(res).an('object');
                done();
            });
    });

    it('should return no orders from nope@acme.com', (done) => {
        chai.request(app)
            .get('/orders/nope@acme.com')
            .end((err, res) => {
                apiDataProperty(res).an('array').length(0);
                done();
            });
    });

    it('should get no order to id ORD-456', (done) => {
        chai.request(app)
            .get('/order/ORD-456')
            .end((err, res) => {
                apiDataProperty(res).equal(null);
                done();
            });
    });
});

function apiDataProperty(res) {
    res.should.have.status(200);
    return res.body.should.have.property('data');
}
