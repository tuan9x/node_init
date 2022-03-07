import { app } from "./app";
import http from "http";
import { initModels, dbConnect, initDataConfig } from "./setup";
import { startGrpcServer } from "./grpc";
import { APP_CONFIG } from "./constant/config";

const PORT = APP_CONFIG.PORT;
const server = http.createServer(app);

async function initServer() {
  try {
    await initModels();
    await dbConnect();
    await initConfig();
    return Promise.all([
      startServer(),
      // startGrpcServer(),
    ]);
  } catch (err) {
    throw err;
  }
}

async function startServer() {
  return server.listen(PORT, () => {
    console.log(">>>>>>>  Server is running on port :" + PORT);
  });
}

async function initConfig() {
  return;
}

// Start server
initServer().then().catch();
