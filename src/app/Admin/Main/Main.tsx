import * as React from "react";
import {Route, RouteComponentProps} from "react-router";
import {Link} from "react-router-dom";
import AppHeader from "../../SharedComponent/AppHeader";
import UnfinishedOrdersContainer from "../Orders/UnfinishedOrdersContainer";
import AllOrdersContainer from "../Orders/AllOrdersContainer";
import UserAppHeader from "../../User/UserAppHeader";

interface Props {
    route: RouteComponentProps
}

export default class Main extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
        this.state = {user: null, activeTab: 'unfinished'};
    }

    render() {
        return (
            <div>
                <UserAppHeader/>
                <br/><br/>
                <div className={'container'}>
                    <div className={'button-tabs'}>
                        <Link className={this.state.activeTab === 'unfinished' ? 'active' : ''}
                              onClick={() => this.setState({activeTab: 'unfinished'})}
                              to={'/'}>
                            غير المكتمل
                        </Link>
                        <Link className={this.state.activeTab === 'all' ? 'active' : ''}
                              onClick={() => this.setState({activeTab: 'all'})}
                              to={'/all'}>
                            كل الطلبات
                        </Link>
                    </div>
                    <Route exact path={"/"} component={() => <UnfinishedOrdersContainer isAdmin={true}/>}/>
                    <Route exact path={"/all"} component={() => <AllOrdersContainer isAdmin={true}/>}/>

                </div>
            </div>
        )
    }

}