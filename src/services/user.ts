import User from "../modals/User";
import users from "../mocks/users";

export const getUsers = (): Promise<User[]> => {
  return new Promise((res) => {
    res(users);
  });
};

export const changeUsersMerchantStatus = (user: User, isMerchant: boolean): Promise<User> => {
  return new Promise ((res) => {
    const newUser = Object.assign({}, user);
    newUser.isMerchant = isMerchant;
    res(newUser);
  });
};
