import * as React from "react";
import firebase from "../../Bootstrap/Firebase";

interface Props {
}

export default class SignIn extends React.Component<Props, any> {

    componentDidMount() {
        this.startSignIn();
    }

    private startSignIn() {
        const auth = firebase.auth();
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => auth.signInAnonymously())
            .catch(this.onFail);
    }

    private onFail = (error: any) => {
        console.log(error);
    };

    render() {
        return null;
    }

}