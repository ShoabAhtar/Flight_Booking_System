import { User } from '../Model/user.js';

let create = async (body) => {
  const user = await User.create(body);
  return user;
};

let find = async (email) => {
  const user = await User.aggregate([
    { $match: { email: email } },
    { $limit: 1 },
    { $project: { __v: 0 } }
  ])
  return user[0]
}

let update = async (email, body) => {
  const user = await User.updateOne({ email }, body, { new: true });
  return user;
};


export { create, find, update };
