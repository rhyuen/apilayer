const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server.js");
const should = chai.should();

chai.use(chaiHttp);

describe("Unauthenticated Routes return 200", () => {
  it("/ should return 200", (done) => {
    chai.request(server)
      .get("/")
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.should.be.a("object");
        done();
      });
  });

  it("/login should return 200", (done) => {
    chai.request(server)
      .get("/login")
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        done();
      });
  });

  it("/setup should return 200", (done) => {
    chai.request(server)
      .get("/setup")
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        //res.type.should("text/html");
        done();
      });
  });

  it("/documentation should return 200", (done) => {
    chai.request(server)
      .get("/documentation")
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        //res.type.should("text/html");
        done();
      });
  });

  it("/error should return 200", (done) => {
    chai.request(server)
      .get("/error")
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        //res.type.should("text/html");
        done();
      });
  });

  it("Weird routes should redirect to root", (done) => {
    chai.request(server)
      .get("/infinitycat")
      .end((err, res) => {
        should.not.exist(err);
      });
  });
});

describe("API__NEWS__ROUTES", () => {
  it("/api/news/vsun", (done) => {
    chai.request(server)
      .get("/api/news/vsun")
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.should.be.a("object");
        res.body.should.have.property("src");
        res.body.should.have.property("count");
        res.body.should.have.property("status");
        res.body.should.have.property("timestamp");
        res.body.should.have.property("data");
        res.body.data.should.be.an("array");
        done();
      });
  });

  it("/api/news/province", (done) => {
    chai.request(server)
      .get("/api/news/province")
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.should.have.property("src");
        res.body.should.have.property("count");
        res.body.should.have.property("status");
        res.body.should.have.property("timestamp");
        res.body.should.have.property("data");
        res.body.data.should.be.an("array");

        done();
      });
  });
});
