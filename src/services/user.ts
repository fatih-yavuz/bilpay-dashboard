import User from "../modals/User";
import users from "../mocks/users";

export const getUsers = (): Promise<User[]> => {
  return new Promise((res) => {
    res(users);
  });
};
