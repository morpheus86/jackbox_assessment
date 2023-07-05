const { hash } = require("bcryptjs");
const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../utils/errors");
const { readData, writeData } = require("../utils");

const add = async (data) => {
  const storedData = await readData();
  const userId = generateId();
  const hashedPw = await hash(data.password, 12);

  if (!storedData.users) {
    storedData.users = [];
  }
  storedData.users.push({ ...data, password: hashedPw, id: userId });
  await writeData(storedData);
  return {
    id: userId,
    email: data.email,
  };
};

const getAllMail = async () => {
  const storedData = await readData();
  return storedData;
};

const getMail = async (email) => {
  const storedData = await readData();
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError("Could not find any users.");
  }
  const user = storedData.users.find((list) => list.email === email);
  if (!user) {
    throw new NotFoundError(
      "Could not find user with this particular email: " + email
    );
  }
  return user;
};

module.exports = {
  addUser: add,
  getAllMail,
  getMail,
};
