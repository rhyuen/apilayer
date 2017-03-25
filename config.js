"use strict";

const nconf = require("nconf");

nconf.file("keys.json");

module.exports = {
  jwtsecret: process.env.jwtsecret || nconf.get("jwtsecret"),
  db: process.env.db || nconf.get("db"),
  cookieSecret: process.env.cookieSecret || nconf.get("cookieSecret"),

  test: {
    jwtsecret: process.env.test_jwtsecret || nconf.get("test:jwtsecret"),
    db: process.env.test_db || nconf.get("test:db"),
    cookieSecret: process.env.test_cookieSecret || nconf.get("cookieSecret"),
  },
  dev: {
    jwtsecret: process.env.dev_jwtsecret || nconf.get("dev:jwtsecret"),
    db: process.env.dev_db || nconf.get("dev:db"),
    cookieSecret: process.env.dev_cookieSecret || nconf.get("dev:cookieSecret"),
  },
  prod: {
    jwtsecret: process.env.prod_jwtsecret || nconf.get("prod:jwtsecret"),
    db: process.env.prod_db || nconf.get("prod:db"),
    cookieSecret: process.env.prod_cookieSecret || nconf.get("prod:cookieSecret"),
  }
};