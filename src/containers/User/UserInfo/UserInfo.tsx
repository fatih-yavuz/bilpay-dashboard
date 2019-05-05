import { Button, Card, Elevation, Switch } from "@blueprintjs/core";
import React from "react";
import { connect } from "react-redux";
import User from "../../../modals/User";
import { UserState } from "../../../store/user/types";
import {AppState} from "../../../store";
import { updateUser } from "../../../store/user/actions";
import { changeUsersMerchantStatus } from "../../../services/user";

interface UserInfoProps {
  selectedUser: UserState
  updateUser: typeof updateUser
}

class UserInfo extends React.Component<UserInfoProps> {
  render() {
    const { name, id, email, isMerchant } = this.props.selectedUser.user as User;
    return <Card interactive={false} elevation={Elevation.FOUR} className="user-info-card">
      <div className="bp3-running-text bp3-text-large">
        <h3>{name}</h3>
        <p>ID: {id}</p>
        <p>Email: {email}</p>
        <Switch checked={isMerchant} label="Merchant" onChange={this.handleMerchantStatusChange} />
      </div>
      
    </Card>
  }

  handleMerchantStatusChange = async () => {
    const user = this.props.selectedUser.user as User;
    const newUser = await changeUsersMerchantStatus(user, !user.isMerchant);
    this.props.updateUser({ user: newUser });
  }
}

const mapStateToProps = (state: AppState) => ({
  selectedUser: state.selectedUser
});

export default connect(mapStateToProps, { updateUser })(UserInfo);
