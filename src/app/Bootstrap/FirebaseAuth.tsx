import * as React from "react";
import firebase from "./Firebase";
import LoginStatus from "./LoginStatus";

interface Props {
    onLoginStatusChanged: (loginStatus: LoginStatus, user: any, userDoc?: any) => void;
    onLoginError: (error: any) => void;
}

export default class FirebaseAuth extends React.Component<Props> {

    componentDidMount() {
        this.props.onLoginStatusChanged(LoginStatus.LOGGING_IN, null);
        this.signInUser();
        firebase.auth().onAuthStateChanged(this.onUserAuthenticated, this.onAuthenticationFails)
    }

    private signInUser = () => {
        firebase.auth().signInAnonymously().catch(error => {
            this.props.onLoginStatusChanged(LoginStatus.LOGGED_OUT, null);
            this.props.onLoginError(error);
        })
    };

    private onUserAuthenticated = (user: any) => {
        if (user) {
            const db = firebase.firestore();
            db.collection("users").doc(user.uid).get()
                .then(doc => {
                    if (doc.exists) {
                        this.props.onLoginStatusChanged(LoginStatus.LOGGED_IN, user, doc.data());
                    } else {
                        this.props.onLoginStatusChanged(LoginStatus.LOGGED_IN, user, null);
                    }
                });
        } else {
            this.props.onLoginStatusChanged(LoginStatus.LOGGED_OUT, null);
        }
    };

    private onAuthenticationFails = (error: any) => {
        this.props.onLoginStatusChanged(LoginStatus.LOGGED_OUT, null);
        this.props.onLoginError(error);
    };

    render() {
        return null;
    }

}