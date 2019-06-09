import * as React from "react";
import LoginStatus from "./LoginStatus";
import AppRouter, {UserType} from "./Router";

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
        const isUserAlreadyLoggedIn = !!localStorage['uid'];
        let userType = undefined;
        if (isUserAlreadyLoggedIn && this.state.loginState !== LoginStatus.LOGGED_OUT) {
            const currentUserType = localStorage['userType'];
            userType = currentUserType === "admin" ? UserType.ADMIN : UserType.USER;
        }

        return (
            <div>
                <AppRouter userType={userType}/>
            </div>
        )
    }

}