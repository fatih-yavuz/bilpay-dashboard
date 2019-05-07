import {Button, Card, Elevation, Switch, UL} from "@blueprintjs/core";
import React from "react";
import { connect } from "react-redux";
import User from "../../../modals/User";
import { UserState } from "../../../store/user/types";
import {AppState} from "../../../store";
import { updateUser } from "../../../store/user/actions";
import { changeUsersMerchantStatus } from "../../../services/user";
import BilcoinSender from "../UserActions/BilcoinSender";
import TransactionHistory from "./TransactionHistory";
import BilcoinTaker from "../UserActions/BilcoinTaker";

interface UserInfoProps {
  selectedUser: UserState
  updateUser: typeof updateUser
}

interface UserInfoState {
  bilcoinSenderOpen: boolean,
  bilcoinTakerOpen: boolean,
  transactionHistoryisOpen: boolean
}

class UserInfo extends React.Component<UserInfoProps, UserInfoState> {
  state = {
    bilcoinSenderOpen: false,
    bilcoinTakerOpen: false,
    transactionHistoryisOpen: false
  };

  render() {
    const { name, id, email, isMerchant, balance, public_key } = this.props.selectedUser.user as User;

    return <div>
      <Card interactive={false} elevation={Elevation.FOUR} className="user-info-card">
        <div className="bp3-running-text bp3-text-large user-info-details">
          <h3>{name}</h3>
          <p><b>Balance:</b> {balance} BLC</p>
          <p><b>ID:</b> {id}</p>
          <p><b>Email:</b> {email}</p>
          <p><b>PublicKey:</b> {public_key}</p>
          <Switch checked={isMerchant} label="Merchant" onChange={this.handleMerchantStatusChange} />
        </div>
        <div className="user-info-action-buttons">
          <Button icon="direction-left" large intent="success" onClick={() => this.setState({ bilcoinTakerOpen: true })}>Take Bilcoin</Button>
          <Button icon="direction-right" large intent="success" onClick={() => this.setState({ bilcoinSenderOpen: true })}>Send Bilcoin</Button>
          <Button icon="history" large intent="primary" onClick={() => this.setState({ transactionHistoryisOpen: true })}>View Transaction History</Button>
        </div>
      </Card>
      <BilcoinSender
        isOpen={this.state.bilcoinSenderOpen}
        open={() => this.setState({ bilcoinSenderOpen: true })}
        close={() => this.setState({ bilcoinSenderOpen: false })}
        name={name}
        id={id}
        sendBilcoins={this.sendBilcoins}
      />
      <BilcoinTaker
        isOpen={this.state.bilcoinTakerOpen}
        open={() => this.setState({ bilcoinTakerOpen: true })}
        close={() => this.setState({ bilcoinTakerOpen: false })}
        name={name}
        id={id}
        takeBilcoins={this.takeBilcoins}
      />
      <TransactionHistory
        isOpen={this.state.transactionHistoryisOpen}
        userEmail={email}
        open={() => this.setState({ transactionHistoryisOpen: true })}
        close={() => this.setState({ transactionHistoryisOpen: false })}
      />
    </div>
  }

  handleMerchantStatusChange = async () => {
    const user = this.props.selectedUser.user as User;
    const newUser = await changeUsersMerchantStatus(user, !user.isMerchant);
    this.props.updateUser({ user: newUser });
  };

  sendBilcoins = async (amount: number) => {
    const user = this.props.selectedUser.user as User;
    const newUser = Object.assign({}, user);
    newUser.balance = String(Number(user.balance) + amount);
    this.props.updateUser({ user: newUser });
  };

  takeBilcoins = async (amount: number) => {
    const user = this.props.selectedUser.user as User;
    const newUser = Object.assign({}, user);
    newUser.balance = String(Number(user.balance) - amount);
    this.props.updateUser({ user: newUser });
  };
}

const mapStateToProps = (state: AppState) => ({
  selectedUser: state.selectedUser
});

export default connect(mapStateToProps, { updateUser })(UserInfo);
