import React from 'react';
import {connect} from "react-redux";
import { SystemState } from "../store/system/types";
import { AppState } from "../store";
import Login from "./Login/Login";
import User from "./User/User";
import "./App.scss";

interface AppProps {
    system: SystemState
}

class App extends React.Component<AppProps> {
    render() {
        const { loggedIn } = this.props.system;
        return (
            <div className="App">
                {
                    loggedIn ? <User /> : <Login />
                }
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    system: state.system
});

export default connect(mapStateToProps)(App);


