import * as React from "react";

import {BrowserRouter, Route, RouteComponentProps, Switch} from "react-router-dom"
import AdminMain from "./../Admin/Main/Main";
import HomePage from "./../SharedComponent/HomePage";
import SignIn from "./../User/SignIn/SignIn";
import Main from "./../User/Main/Main";
import AdminSignIn from "./../Admin/SignIn/AdminSignIn";

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
            <Route path={"/"} component={(route: RouteComponentProps) => <AdminMain route={route}/>}/>
        </Switch>
    };

    private userRoutes = () => {
        return <Switch>
            <Route path={"/"} component={(route: RouteComponentProps) => <Main route={route}/>}/>
        </Switch>
    };

    private nonLoginUserRoutes = () => {
        return <Switch>
            <Route exact path={"/"} component={() => <HomePage/>}/>
            <Route exact path={"/login/admin"} component={() => <AdminSignIn/>}/>
            <Route exact path={"/login/user"} component={() => <SignIn/>}/>
        </Switch>
    }

}