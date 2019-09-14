import * as React from "react";
import {Route, RouteComponentProps} from "react-router";
import {Link} from "react-router-dom";
import UnfinishedOrdersContainer from "../Orders/UnfinishedOrdersContainer";
import AllOrdersContainer from "../Orders/AllOrdersContainer";
import UserAppHeader from "../../User/UserAppHeader";
import OnProgressOrdersContainer from "../Orders/OnProgressOrdersContainer";
import MonthlyReport from "../../Report/MonthlyReport";
import DownloadMonthlyReport from "../../Report/DownloadMonthlyReport";

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
                <UserAppHeader isAdmin={true}/>
                <br/><br/>
                <div className={'container'}>
                    <div className={'button-tabs'}>
                        <Link className={this.state.activeTab === 'unfinished' ? 'active' : ''}
                              onClick={() => this.setState({activeTab: 'unfinished'})}
                              to={'/'}>
                            غير المكتمل
                        </Link>
                        <Link className={this.state.activeTab === 'on-progress' ? 'active' : ''}
                              onClick={() => this.setState({activeTab: 'on-progress'})}
                              to={'/on-progress'}>
                            جاري العمل
                        </Link>
                        <Link className={this.state.activeTab === 'all' ? 'active' : ''}
                              onClick={() => this.setState({activeTab: 'all'})}
                              to={'/all'}>
                            كل الطلبات
                        </Link>
                    </div>
                    <Route exact path={"/"} component={() => <UnfinishedOrdersContainer isAdmin={true}/>}/>
                    <Route exact path={"/on-progress"} component={() => <OnProgressOrdersContainer isAdmin={true}/>}/>
                    <Route exact path={"/all"} component={() => <AllOrdersContainer isAdmin={true}/>}/>

                    <Route exact path={'/report/monthly'} component={() => <MonthlyReport/>}/>
                    <Route exact path={'/report/download/monthly'} component={() => <DownloadMonthlyReport/>}/>

                </div>
            </div>
        )
    }

}