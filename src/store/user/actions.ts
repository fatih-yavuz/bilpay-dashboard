import { UserState, SELECT_USER, UserActionTypes } from "./types";

export function selectUser(newUser: UserState): UserActionTypes {
  return {
    type: SELECT_USER,
    payload: newUser
  }
}
