import "../../modals/User";

import {
  UserState,
  UserActionTypes,
  SELECT_USER
} from "./types"

const initialState: UserState = {
  user: null
};

export function userReducer(
  state = initialState,
  action: UserActionTypes
): UserState {
  switch (action.type) {
    case SELECT_USER: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}
