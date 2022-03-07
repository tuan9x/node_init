async function listUser(call: any, done: any) {
  const result = {
    status: 200,
    data: {
      count: 100,
      rows: [
        {
          name: "AAA",
          age: 22,
        },
        {
          mess: "BBB",
          age: 23,
        },
      ],
    },
  };

  console.log({ result });
  return done(null, result);
}

async function createUser(call: any, done: any) {
  console.log({ data_body: call.request });
  const mess = JSON.stringify(call.request);
  const result = {
    mess,
  };

  return done(null, result);
}

export { listUser, createUser };
