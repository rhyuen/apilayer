"use strict";

const nconf = require("nconf");

nconf.file("keys.json");

module.exports = {
  jwtsecret: process.env.jwtsecret || nconf.get("jwtsecret"),
  db: process.env.db || nconf.get("db"),
  cookieSecret: process.env.cookieSecret || nconf.get("cookieSecret"),
  apiKeySecret: process.env.test_apiKeySecret || nconf.get("apiKeySecret"),

  test: {
    jwtsecret: process.env.test_jwtsecret || nconf.get("test:jwtsecret"),
    db: process.env.test_db || nconf.get("test:db"),
    cookieSecret: process.env.test_cookieSecret || nconf.get("test:cookieSecret"),
    apiKeySecret: process.env.test_apiKeySecret || nconf.get("test:apiKeySecret")
  },
  development: {
    jwtsecret: process.env.dev_jwtsecret || nconf.get("development:jwtsecret"),
    db: process.env.dev_db || nconf.get("development:db"),
    cookieSecret: process.env.dev_cookieSecret || nconf.get("development:cookieSecret"),
    apiKeySecret: process.env.dev_apiKeySecret || nconf.get("development:apiKeySecret")
  },
  production: {
    jwtsecret: process.env.prod_jwtsecret || nconf.get("production:jwtsecret"),
    db: process.env.prod_db || nconf.get("production:db"),
    cookieSecret: process.env.prod_cookieSecret || nconf.get("production:cookieSecret"),
    apiKeySecret: process.env.prod_apiKeySecret || nconf.get("production:apiKeySecret")
  }
};
