import * as React from "react";
import {Route, RouteComponentProps} from "react-router";
import {Link} from "react-router-dom";
import AppHeader from "../../SharedComponent/AppHeader";

interface Props {
    route: RouteComponentProps
}

export default class Main extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
        this.state = {user: null, activeTab: null};
    }

    render() {
        return (
            <div>
                <AppHeader/>
                <br/><br/>
                <div className={'container'}>
                    <div className={'button-tabs'}>
                        <Link className={this.state.activeTab === 'unfinished' ? 'active' : ''}
                              onClick={() => this.setState({activeTab: 'new-order'})}
                              to={'/'}>
                            غير المكتمل
                        </Link>
                        <Link className={this.state.activeTab === 'home' ? 'active' : ''}
                              onClick={() => this.setState({activeTab: 'home'})}
                              to={'/all'}>
                            كل الطلبات
                        </Link>
                    </div>
                    <Route exact path={"/"} component={() => <h1>Unfinished Orders</h1>}/>
                    <Route exact path={"/all"} component={() => <h1>All Orders</h1>}/>

                </div>
            </div>
        )
    }

}