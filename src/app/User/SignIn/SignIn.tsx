import * as React from "react";
import LoadingContainer from "../../SharedComponent/LoadingContainer";
import firebase from "../../Bootstrap/Firebase";

interface Props {
}

export default class SignIn extends React.Component<Props, any> {

    state = {loading: true, error: false};

    componentDidMount() {
        this.startSignIn();
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.succeedToSignIn(user);
            } else {
                this.setState({loading: false, error: true});
            }
        })
    }

    private succeedToSignIn(user: any) {
        this.setState({loading: false, error: false});
        localStorage["uid"] = user.uid;
        localStorage["userType"] = "user";
        window.location.href = "/";
    }

    private startSignIn() {
        this.setState({loading: true, error: false});
        const auth = firebase.auth();
        auth.signInAnonymously().catch(this.onFail);
    }

    private onFail = () => {
        this.setState({loading: false, error: true});
    };

    render() {
        if (this.state.loading) {
            return <LoadingContainer message={"جاري محاولة تسجيل الدخول..."}/>
        }
        if (this.state.error) {
            return <h1>فشل في تسجيل الدخول , يرجى اعادة المحاولة</h1>
        }
        return <p>جاري اعادة التوجيه...</p>
    }

}