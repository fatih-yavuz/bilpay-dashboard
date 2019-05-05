import { UserState, SELECT_USER, UPDATE_USER, UserActionTypes } from "./types";

export function selectUser(newUser: UserState): UserActionTypes {
  return {
    type: SELECT_USER,
    payload: newUser
  }
}

export function updateUser(newUser: UserState): UserActionTypes {
  return {
    type: UPDATE_USER,
    payload: newUser
  }
}
