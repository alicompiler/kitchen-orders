import * as React from "react";
import AppRouter, {UserType} from "./Router";
import firebase from "./Firebase";
import LoadingContainer from "../SharedComponent/LoadingContainer";

interface Props {
}

interface State {
    user: any;
    loading: boolean;
    userType?: UserType;
}

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {loading: true, user: null};
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user);
                const userType = user.email ? UserType.ADMIN : UserType.USER;
                this.setState({loading: false, userType: userType});
                if (window.location.href.endsWith("/login/user") || window.location.href.endsWith("/login/admin")) {
                    window.location.href = "/";
                }
            } else {
                this.setState({loading: false})
            }
        })
    }

    render() {
        if (this.state.loading) {
            return <LoadingContainer message={"جاري محاولة تسجيل الدخول..."}/>;
        }

        return (
            <div>
                <AppRouter userType={this.state.userType}/>
            </div>
        )
    }

}