import * as React from "react";
import FirebaseAuth from "./FirebaseAuth";
import LoginStatus from "./LoginStatus";
import LoadingContainer from "../SharedComponent/LoadingContainer";
import RegisterForm from "../User/RegisterForm/RegisterForm";

import firebase from "./Firebase";
import AppRouter from "./Router";

interface Props {
}

interface State {
    loginState: LoginStatus;
    user: any | null;
    userDoc: any;
}

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {loginState: LoginStatus.LOGGING_IN, user: null, userDoc: null};
    }

    render() {
        console.log('user', firebase.auth().currentUser);
        return (
            <div>
                <AppRouter/>
            </div>
        )
    }

    private onLoginStatusChanged = (loginStatus: LoginStatus, user: any, userDoc: any) => {
        console.log(loginStatus, user, userDoc);
        this.setState({user: user, loginState: loginStatus, userDoc: userDoc});
    };

}