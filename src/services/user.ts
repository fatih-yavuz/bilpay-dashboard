import User from "../modals/User";
import users from "../mocks/users";
import { API } from "./config";

export const getUsers = (): Promise<User[]> => {
  return new Promise(res => {
    res(users);
  });
  return fetch(`${API}/users`).then(r => r.json()).catch(err => {
    throw err;
  });
};

export const changeUsersMerchantStatus = (user: User, isMerchant: boolean): Promise<User> => {
  return new Promise ((res) => {
    const newUser = Object.assign({}, user);
    newUser.isMerchant = isMerchant;
    res(newUser);
  });
};
