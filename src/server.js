var PROTO_PATH = __dirname + "/ping_pong.proto";

var assert = require("assert");
var async = require("async");
var _ = require("lodash");
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var pingPongProto = protoDescriptor.pingpong;

var server = new grpc.Server();

server.addService(pingPongProto.PingPongService.service, {
  pingPong: function (call, callback) {
    console.log("Request");
    return callback(null, { pong: "Pong" });
  },
});

server.bindAsync(
  "0.0.0.0:8080",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    assert.ifError(err);
    server.start();
  }
);
//server.start();
