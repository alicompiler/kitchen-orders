import * as React from "react";
import {Route} from "react-router";
import RegisterForm from "../RegisterForm/RegisterForm";
import MyOrdersContainer from "../OrderList/MyOrdersContainer";
import SendOrder from "../SendOrder/SendOrder";

interface Props {
    user: any;
    onUserUpdate: (user: any) => void;
}

export default class UserMainRoutes extends React.Component<Props> {

    render() {
        return (
            <>
                <Route exact path={"/my-info"} component={() => <RegisterForm onUpdate={this.props.onUserUpdate}/>}/>
                <Route exact path={"/"} component={() => <MyOrdersContainer/>}/>
                <Route exact path={"/new-order"} component={() => <SendOrder user={this.props.user}/>}/>
            </>
        )
    }

}