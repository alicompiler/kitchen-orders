import * as React from "react";

import {BrowserRouter, Route, Switch} from "react-router-dom"
import RegisterForm from "../User/RegisterForm/RegisterForm";
import HomePage from "../SharedComponent/HomePage";

enum UserType {
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
            <Route path={"/"} component={() => <h1>Admin Main Page</h1>}/>
            <Route path={"/orders"} component={() => <h1>New Orders</h1>}/>
            <Route path={"/orders/:id"} component={() => <h1>Order Detail</h1>}/>
        </Switch>
    };

    private userRoutes = () => {
        return <Switch>
            <Route path={"/"} component={() => <h1>User Main Page</h1>}/>
            <Route path={"/my-info"} component={() => <RegisterForm/>}/>
            <Route path={"/orders"} component={() => <h1>My Orders</h1>}/>
            <Route path={"/orders/:id"} component={() => <h1>Order Details</h1>}/>
        </Switch>
    };

    private nonLoginUserRoutes = () => {
        return <Switch>
            <Route path={"/"} component={() => <HomePage/>}/>
            <Route path={"/login/admin"} component={() => <h1>Admin Login</h1>}/>
            <Route path={"/login/user"} component={() => <h1>User Login</h1>}/>
        </Switch>
    }

}