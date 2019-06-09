import * as React from "react";
import FirebaseAuth from "./FirebaseAuth";
import LoginStatus from "./LoginStatus";
import LoadingContainer from "../SharedComponent/LoadingContainer";
import RegisterForm from "../User/RegisterForm/RegisterForm";

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
        return (
            <div>
                <FirebaseAuth onLoginError={error => console.log(error)}
                              onLoginStatusChanged={this.onLoginStatusChanged}/>
                {
                    this.renderContent()
                }
            </div>
        )
    }

    private onLoginStatusChanged = (loginStatus: LoginStatus, user: any, userDoc: any) => {
        console.log(loginStatus, user, userDoc);
        this.setState({user: user, loginState: loginStatus, userDoc: userDoc});
    };


    private renderContent = () => {
        switch (this.state.loginState) {
            case LoginStatus.LOGGING_IN :
                return <LoadingContainer/>;
            case LoginStatus.LOGGED_IN:
                if (this.state.userDoc === null) {
                    return <RegisterForm/>
                } else {
                    return <h1>TODO : USER MAIN PAGE</h1>
                }
            case LoginStatus.LOGGED_OUT:
                return <h1>Logged Out</h1>
        }
    }



}