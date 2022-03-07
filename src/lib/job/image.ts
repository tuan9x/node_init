import * as uuid from "uuid";
import path from "path";
const Queue = require("bull");
const { setQueues, BullAdapter } = require("bull-board");
import { REDIS_BULL_CONFIG } from "../../constant/config";

const Task = new Queue("GEN_IMAGE", {
  redis: REDIS_BULL_CONFIG,
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: false /* >>> Fail then not cancel, can manage on UI bull :)) */,
  },
});

// Task.process(async function(job: any , done: any ) {
//     // job include data to create JOB
//     const idd = uuid.v4();
//     job.progress(idd);

//     await Slow();
//     // await genAvatar(job.data.filename);
//     done(null , `Gen avatar id ${job.data.filename} thanh cong`);
// });

// Task.on("completed", (job: any, result: any) => {
//    console.log( result );
// })
// .on("error", function(error: any) {
//    console.log({ error });
// })
// .on("failed", function(job: any, result: any) {
//    console.log(`Job ${job.id} failed! Result: ${result}`);
//    job.remove();
// });

function createJobGenAvatar(filename: any) {
  try {
    return Task.add({ filename });
  } catch (err) {
    console.log({ err });
  }
}

export { createJobGenAvatar };

/* ++++++++++++++++++++++++++++++++++++++++++++ */
async function Slow() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      return resolve(true);
    }, 30000);
  });
}

/******* Example use in projewct for manage task bull ******/
// const setQueuesInit = setQueues([
//     new BullAdapter(Task)
// ]);
// export { setQueuesInit };
