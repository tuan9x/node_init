import { errors } from "celebrate";
const PROTO_PATH = __dirname + "/../../../src/grpc/protos/user.proto";
import * as grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
const user_grpc_url = "nodemain.main:5000";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const userProto: any = grpc.loadPackageDefinition(packageDefinition).user;

const userClient = new userProto.UserService(user_grpc_url, grpc.credentials.createInsecure());

async function createUserLib(data: any) {
  return new Promise((resolve, reject) => {
    return userClient.createUser({ username: data.u, password: data.p }, (error: any, response: any) => {
      console.log({ errors, response });
      return resolve(response);
    });
  });
}

async function listUserLib() {
  return new Promise((resolve, reject) => {
    return userClient.listUser({}, (error: any, response: any) => {
      console.log({ errors, response });
      return resolve(response);
    });
  });
}

export { userClient, createUserLib, listUserLib };
