import grpc from "grpc";
import { UserGRPC } from "./grpc/user";
const GRPC_PORT = 5000;

function startGrpcServer () {
    const server = new grpc.Server();
    UserGRPC(server);
    server.bind(`0.0.0.0:${GRPC_PORT}`, grpc.ServerCredentials.createInsecure());
    server.start();
    console.log(`>>>>>>>>>> Grpc Server running at: http://0.0.0.0:${GRPC_PORT}`);
}

export {
    startGrpcServer
};