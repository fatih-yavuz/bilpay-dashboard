import User from "../../modals/User";

export interface UserState {
  user: User | null
}

export const SELECT_USER = "SELECT_USER";

interface SelectUserAction {
  type: typeof SELECT_USER
  payload: UserState
}

export type UserActionTypes = SelectUserAction;
