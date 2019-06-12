import * as React from "react";
import UserAppHeader from "../UserAppHeader";
import firebase from "./../../Bootstrap/Firebase";
import {Route, RouteComponentProps} from "react-router";
import RegisterForm from "../RegisterForm/RegisterForm";
import HorizontalLoader from "../../SharedComponent/HorizontalLoader/HorizontalLoader";
import {Link} from "react-router-dom";
import SendOrder from "../SendOrder/SendOrder";
import OrderList from "../../SharedComponent/OrdersList/OrderList";
import MyOrdersContainer from "../OrderList/MyOrdersContainer";

interface Props {
    route: RouteComponentProps
}

export default class Main extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
        this.state = {loading: true, user: null, activeTab: null};
    }

    componentDidMount() {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
            const db = firebase.firestore();
            db.collection("users").doc(currentUser.uid).get().then(doc => {
                if (doc.exists) {
                    this.setState({loading: false, user: doc.data()});
                } else {
                    this.setState({loading: false, user: {}, activeTab: 'my-info'});
                    this.props.route.history.push('/my-info');
                }
            });
        } else {
            this.setState({loading: false});
        }
    }

    render() {
        return (
            <div>
                <UserAppHeader/>
                <br/><br/>
                {
                    this.state.loading ?
                        <HorizontalLoader/>
                        :
                        <>
                            <div className={'container'}>
                                <div className={'button-tabs'}>
                                    <Link className={this.state.activeTab === 'home' ? 'active' : ''}
                                          onClick={() => this.setState({activeTab: 'home'})}
                                          to={'/'}>
                                        الرئيسية
                                    </Link>
                                    <Link className={this.state.activeTab === 'new-order' ? 'active' : ''}
                                          onClick={() => this.setState({activeTab: 'new-order'})}
                                          to={'/new-order'}>
                                        ارسال طلب
                                    </Link>
                                    <Link className={this.state.activeTab === 'my-info' ? 'active' : ''}
                                          onClick={() => this.setState({activeTab: 'my-info'})}
                                          to={'/my-info'}>
                                        معلوماتي
                                    </Link>
                                </div>
                                <Route exact path={"/my-info"} component={() => <RegisterForm/>}/>
                                <Route exact path={"/"} component={() => <MyOrdersContainer/>}/>
                                <Route exact path={"/new-order"} component={() => <SendOrder user={this.state.user}/>}/>
                                <Route exact path={"/orders/:id"} component={() => <h1>Order Details</h1>}/>
                            </div>
                        </>
                }
            </div>
        )
    }

}