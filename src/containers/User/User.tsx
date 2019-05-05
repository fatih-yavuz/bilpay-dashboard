import SearchUser from "./SearchUser/SearchUser";
import * as React from "react";
import {connect} from "react-redux";
import {AppState} from "../../store";
import {UserState} from "../../store/user/types";
import UserInfo from "./UserInfo/UserInfo";
import "./User.scss";

interface UserProps {
  selectedUser: UserState,
}

class User extends React.Component<UserProps>{
  public render() {
    const { user } = this.props.selectedUser;
    return (
      <div className="main-user-wrapper">
        <SearchUser />
        { user ? <UserInfo /> : "" }
      </div>
    );
  }
}


const mapStateToProps = (state: AppState) => ({
  selectedUser: state.selectedUser
});

export default connect(mapStateToProps)(User)
