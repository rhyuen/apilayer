"use strict";
const winston = require("winston");

winston.configure({
    level: "verbose",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({
            name: "firstLoggingFileTransport",
            filename: "./loggerfile.log",
            handleExceptions: true,
            json: true            
        }) ,
        new (winston.transports.File)({
            name: "ImportanterLogs",
            filename: "./logs/importantlogs.log",
            json: true
        })
    ],  
    exitOnError: false  
});
