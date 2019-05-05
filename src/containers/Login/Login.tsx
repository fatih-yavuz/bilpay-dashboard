import * as React from "react";
import {connect} from "react-redux";
import {Card, Elevation} from "@blueprintjs/core"
import "./Login.css";
import auth from "../../services/auth";
import {
  Button,
  InputGroup,
  Intent,
  Tooltip,
} from "@blueprintjs/core";
import {updateSession} from "../../store/system/actions";
import {Notification} from "../../components/Notification";

interface LoginProps {
  updateSession: typeof updateSession
}

export interface LoginState {
  [key: string]: string | boolean,

  showPassword: boolean;
  email: string;
  password: string;
}

class Login extends React.PureComponent<LoginProps, LoginState> {
  public state: LoginState = {
    showPassword: false,
    email: "",
    password: ""
  };

  public render() {
    const {showPassword} = this.state;

    const lockButton = (
      <Tooltip content={`${showPassword ? "Hide" : "Show"} Password`}>
        <Button
          icon={showPassword ? "unlock" : "lock"}
          intent={Intent.WARNING}
          minimal={true}
          onClick={this.handleLockClick}
        />
      </Tooltip>
    );

    return (
        <Card interactive={false} elevation={Elevation.ONE}>
          <form onSubmit={this.handleSubmit}>
            <div className="login-form">
              <InputGroup
                className="row"
                placeholder="Enter your email..."
                onChange={this.handleChange}
                type="email"
                name="email"
                required
              />
              <InputGroup
                className="row"
                placeholder="Enter your password..."
                rightElement={lockButton}
                onChange={this.handleChange}
                type={showPassword ? "text" : "password"}
                name="password"
              />
              <Button intent="primary" type="submit">Login</Button>
            </div>
          </form>
        </Card>
    );
  }

  private handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {email, password} = this.state;
    try {
      const response = await auth(email, password);
      console.log(response);
      this.props.updateSession({
        loggedIn: true,
        session: response.session,
        email: response.email
      });
      Notification.show({message: "Login Success", icon: "log-in", intent: "success"});
    } catch (e) {
      Notification.show({message: "Wrong email or password.", icon: "warning-sign", intent: "danger"});
    }
  };

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const state = Object.assign({}, this.state);
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  private handleLockClick = () => this.setState({showPassword: !this.state.showPassword});
}

export default connect(null, {updateSession})(Login);
