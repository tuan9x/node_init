import * as grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
const PROTO_PATH = __dirname + "/../../../src/grpc/protos/user.proto";

import * as handlers from "./handler";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const userProto = grpc.loadPackageDefinition(packageDefinition).user as any;

export function UserGRPC(server: any) {
    server.addService(userProto.UserService.service, handlers);
}