import * as React from "react";

import {BrowserRouter, Route, Switch} from "react-router-dom"
import RegisterForm from "../User/RegisterForm/RegisterForm";
import HomePage from "../SharedComponent/HomePage";
import SignIn from "../User/SignIn/SignIn";

export enum UserType {
    USER = 1,
    ADMIN = 2
}

interface Props {
    userType?: UserType
}

export default class AppRouter extends React.Component<Props> {
    render() {

        return <BrowserRouter>
            {
                this.routes()
            }
            <Route exact path={'/logout'} component={() => <h1>Logout Component</h1>}/>
        </BrowserRouter>
    }

    private routes = () => {
        if (this.props.userType) {
            if (this.props.userType === UserType.USER) {
                return this.userRoutes()
            } else {
                return this.adminRoutes()
            }
        } else {
            return this.nonLoginUserRoutes();
        }
    };

    private adminRoutes = () => {
        return <Switch>
            <Route exact path={"/"} component={() => <h1>Admin Main Page</h1>}/>
            <Route exact path={"/orders"} component={() => <h1>New Orders</h1>}/>
            <Route exact path={"/orders/:id"} component={() => <h1>Order Detail</h1>}/>
        </Switch>
    };

    private userRoutes = () => {
        return <Switch>
            <Route exact path={"/"} component={() => <h1>User Main Page</h1>}/>
            <Route exact path={"/my-info"} component={() => <RegisterForm/>}/>
            <Route exact path={"/orders"} component={() => <h1>My Orders</h1>}/>
            <Route exact path={"/orders/:id"} component={() => <h1>Order Details</h1>}/>
        </Switch>
    };

    private nonLoginUserRoutes = () => {
        return <Switch>
            <Route exact path={"/"} component={() => <HomePage/>}/>
            <Route exact path={"/login/admin"} component={() => <h1>Admin Login</h1>}/>
            <Route exact path={"/login/user"} component={() => <SignIn/>}/>
        </Switch>
    }

}