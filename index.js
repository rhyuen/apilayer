"use strict";

const server = require("./server.js");

process.on("UncaughtError", (err) => {
  console.log("UNCAUGHT ERROR: %s", err);
});

server.listen(server.get("PORT"), (err) => {
  if(err){
    console.error("ERROR: %s", err);
  }else{
    console.log(
      "[%s] Server started. \n\tPORT: %s\n\tENV: %s",
      new Date().toLocaleString(),
      server.get("PORT"),
      process.env.NODE_ENV
    );
  }
});
