import * as React from "react";
import UserAppHeader from "../UserAppHeader";
import firebase from "./../../Bootstrap/Firebase";
import {RouteComponentProps} from "react-router";
import HorizontalLoader from "../../SharedComponent/HorizontalLoader/HorizontalLoader";
import UserMainRoutes from "./UserMainRoutes";
import UserMainTabs from "./UserMainTabs";

interface Props {
    route: RouteComponentProps
}

interface State {
    activeTab: string | null;
    user: any;
    loading: boolean;
}

export default class Main extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {loading: true, user: null, activeTab: null};
    }

    componentDidMount() {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
            this.loadUser(currentUser);
        } else {
            this.setState({loading: false});
        }
    }

    private loadUser(currentUser: any) {
        const db = firebase.firestore();
        db.collection("users").doc(currentUser.uid).get().then(doc => {
            if (doc.exists) {
                this.setState({loading: false, user: doc.data()});
            } else {
                this.setState({loading: false, user: {}, activeTab: 'my-info'});
                this.props.route.history.push('/my-info');
            }
        });
    }

    render() {
        return (
            <div>
                <UserAppHeader/>
                <br/><br/>
                {
                    this.state.loading ? <HorizontalLoader/> :
                        <>
                            <div className={'container'}>
                                <UserMainTabs onTabClick={tab => this.setState({activeTab: tab})}
                                              activeTab={this.state.activeTab}/>
                                <UserMainRoutes onUserUpdate={(user) => this.setState({user: {...user}})}
                                                user={this.state.user}/>
                            </div>
                        </>
                }
            </div>
        )
    }

}