import { REDIS_CONFIG } from "../../constant/config";
import Redis from "ioredis";

const redisMaster = new Redis(REDIS_CONFIG.MASTER);
const redisSlave = new Redis(REDIS_CONFIG.SLAVE);

// Connect Redis Master
redisMaster.on("ready", function () {
  console.log(">>>>>>>>>> Redis Master Connected :", redisMaster.client.name);
});
redisMaster.on("error", async function (err) {
  console.log(">>>>>>>>>>>>>>>>>>>> Err connect reidis master:", String(err));
  try {
  } catch (errSendtelegram) {
    console.log(">>>>> errSendtelegram:", String(errSendtelegram));
  }
});

// Connect Redis Slave
redisSlave.on("ready", function () {
  console.log(">>>>>>>>>> Redis Slave Connected :", redisSlave.client.name);
});
redisSlave.on("error", async function (err) {
  console.log(">>>>>>>>>>>>>>>>>>>> Err connect reidis Slave:", String(err));
  try {
  } catch (errSendtelegram) {
    console.log(">>>>> errSendtelegram:", String(errSendtelegram));
  }
});

async function setCache(key: string, value: any, ttl: number) {
  try {
    const setValue = await redisMaster.set(key, value, "EX", ttl);
    if (setValue && setValue == "OK") return true;
    return false;
  } catch (err) {
    console.log(">>>>>> Err Redis Set Cache");
    return;
  }
}

async function delCache(key: string) {
  return redisMaster.del(key); // => 0, 1
}

async function getCache(key: string, isGetFromMaster?: boolean) {
  try {
    if (isGetFromMaster) return redisMaster.get(key);
    return redisSlave.get(key);
  } catch (err) {
    console.log(">>>>>> Err Redis Get Cache");
    return null;
  }
}

async function getMulty(keyPrefix: string, isGetFromMaster?: boolean) {
  if (isGetFromMaster) return redisMaster.keys(`${keyPrefix}*`); // => ['key1', 'key2']
  return redisSlave.keys(`${keyPrefix}*`);
}

async function delMulty(keys: string[]) {
  if (!keys && keys.length == 0) return 0;
  let count = 0;
  for (const item of keys) {
    const isDeleted = await redisMaster.del(item);
    if (isDeleted > 0) count += 1;
  }
  return count; // => ex: 3
}

async function delMultyByPrefix(keyPrefix: string) {
  const keyScan = await getMulty(keyPrefix, true);
  if (!keyScan || keyScan.length == 0) return 0;
  return delMulty(keyScan);
}

export {
  // Single
  getCache,
  setCache,
  delCache,
  // Multy
  getMulty,
  delMulty,
  delMultyByPrefix,
};

/* TLL: time = second */
