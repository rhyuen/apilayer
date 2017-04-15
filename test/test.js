const chai = require("chai");
const mongoose = require("mongoose");
const chaiHttp = require("chai-http");
const server = require("../server.js");
const User = require("../models/user.js");
const config = require("../config.js");
const should = chai.should();

chai.use(chaiHttp);

describe("Unauthenticated Routes return 200", () => {
  const testCases = {
    Root: "/",
    Login: "/login",
    Setup: "/setup",
    Documentation: "/documentation",
    Error: "/error"
  };

  for(var test in testCases){
    (() => {
      it(test, (done) => {
        chai.request(server)
          .get(testCases[test])
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(200);
            res.should.be.a("object");
            done();
          });
      });
    })();
  }
});

describe("Accounts", () => {
    // before((done) => {
    //   mongoose.connect(config[process.env.NODE_ENV].db);
    //
    //   done();
    // });
    //
    // after((done) => {
    //   mongoose.connection.close();
    //   done();
    // });

    beforeEach((done) => {
      //const randomNumber = Math.floor(Math.random() * 1000);
      let newUser = new User();
      newUser.name = "TestAccount";
      newUser.password = newUser.generateHash("TestPassword");
      newUser.admin = true;

      newUser.save((err, newestUser) => {
        if(err){
          console.error(err);
        }else{
          console.log("Newest User Created: %s", newestUser.name);
        }
        done();
      });
    });

    it("find a user by name", (done) => {
      User.findOne({name: "TestAccount"}, (err, foundUser) => {
        if(err){
          console.log(err);
        }
        foundUser.name.should.eql("TestAccount");
        done();
      });
    });

    it("/SETUP, VIA HTTP, MAKE USER", (done) => {
      chai.request(server)
        .post("/setup")
        .send({username: "TestAccount9999", password: "TestPassword9999"})
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.should.be.a("object");
          res.body.message.should.be.eql("User Saved");
          res.body.should.have.property("time");
          res.body.username.should.be.eql("TestAccount9999");
          User.findOne({name: "TestAccount9999"}, (err, foundUser) => {
            if(err){
              console.error(err);
            }else{
              foundUser.name.should.eql("TestAccount9999");
              done();
            }
          });
        });
    });


    //TEST that you get a cookie.
    it("/LOGIN, via HTTP, LOGIN", (done) => {
      chai.request(server)
        .post("/login")
        .send({username: "TestAccount9999", password: "TestPassword9999"})
        .end((err, res) => {
            //DO ASSERTIONS HERE
            res.body.action.should.eql("LOGIN");
            res.body.message.should.eql("Authentication success");
            res.body.description.should.eql("Expires in an hour.");
            res.should.have.cookie("apilayer_token");
            done();
        });
    });

    it("/LOGIN, should FAIL, no USER found", (done) => {
      chai.request(server)
        .post("/login")
        .send({username: "RealPerson", password: "Password1"})
        .end((err, res) => {
          res.body.action.should.eql("LOGIN");
          res.body.message.should.eql("Auth failed.");
          res.body.description.should.eql("User not found.");
          done();
        });
    });

    it("/LOGIN, should FAIL, incorrect Password", (done) => {
      chai.request(server)
        .post("/login")
        .send({username: "TestAccount9999", password: "IncorrectPassword"})
        .end((err, res) => {
          res.body.action.should.eql("LOGIN");
          res.body.message.should.eql("Auth failed.");
          res.body.description.should.eql("Invalid password.");
          done();
        });
    });



    // it("/LOGOUT, should logout, should not have cookie", (done) => {
    //   let agent = chai.request.agent(server);
    //   agent.post("login")
    //     .send({username: "TestAccount9999", password: "TestPassword9999"})
    //     .then((res) => {
    //       res.body.action.should.eql("LOGIN");
    //       res.body.message.should.eql("Authentication success");
    //       res.body.description.should.eql("Expires in an hour.");
    //       res.should.have.cookie("apilayer_token");
    //
    //       return agent.get("/logout")
    //         .then((res) => {
    //           should.not.exist(res.cookie);
    //           done();
    //         });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // });
});

// describe("API__NEWS__ROUTES", () => {
//   it("/api/news/vsun", (done) => {
//     chai.request(server)
//       .get("/api/news/vsun")
//       .end((err, res) => {
//         should.not.exist(err);
//         res.status.should.equal(200);
//         res.body.should.be.a("object");
//         res.body.should.have.property("src");
//         res.body.should.have.property("count");
//         res.body.should.have.property("status");
//         res.body.should.have.property("timestamp");
//         res.body.should.have.property("data");
//         res.body.data.should.be.an("array");
//         done();
//       });
//   });
//
//   it("/api/news/province", (done) => {
//     chai.request(server)
//       .get("/api/news/province")
//       .end((err, res) => {
//         should.not.exist(err);
//         res.status.should.equal(200);
//         res.body.should.have.property("src");
//         res.body.should.have.property("count");
//         res.body.should.have.property("status");
//         res.body.should.have.property("timestamp");
//         res.body.should.have.property("data");
//         res.body.data.should.be.an("array");
//
//         done();
//       });
//   });
//
// });

describe("GET_API_KEY", () => {
  it("/user/key", (done) =>{
    chai.request(server)
      .post("/user/key")
      .end((err, res) => {
        should.not.exist(err);
        res.description.should.be.eql("SUCCESS");
        res.apiKey.should.a("string");
      });
  });
});
