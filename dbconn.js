const mongoose = require("mongoose");
const config = require("./config.js");

module.exports = () => {
  const mongooseServerOptions = {
    server: {
      auto_reconnect: true,
      reconnectTries: Number.MAX_VALUE
    }
  };

  mongoose.connect(config[process.env.NODE_ENV].db, mongooseServerOptions, (err) => {
    if(err){
      console.error("[%s] DB CONN ERROR: %s", new Date().toLocaleString(), err);
    }else{
      console.log("[%s] DB CONN ATTEMPT", new Date().toLocaleString());
    }
  });
  mongoose.connection.once("open", () => {
    console.log("[%s] DB CONN open", new Date().toLocaleString());
  });
  mongoose.connection.on("error", (err) => {
    console.log("[%s][MONGOOSE ERR] %s", new Date().toLocaleString(), err);
  });
  mongoose.connection.on("connected", () => {
    console.info("[%s] DB CONN connected", new Date().toLocaleString());
  });
  mongoose.connection.on("disconnected", () => {
    console.error("[%s] DB disconnected", new Date().toLocaleString());
  });
  mongoose.connection.on("reconnected", () => {
    console.info("[%s] DB reconnected", new Date().toLocaleString());
  });
};
