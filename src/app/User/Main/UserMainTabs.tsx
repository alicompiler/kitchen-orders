import * as React from "react";
import {Link} from "react-router-dom";

interface Props {
    activeTab: string | null;
    onTabClick: (tab: string) => void;
}

export default class UserMainTabs extends React.Component<Props> {

    render() {
        return (
            <>
                <div className={'button-tabs'}>
                    <Link className={this.props.activeTab === 'home' ? 'active' : ''}
                          onClick={() => this.props.onTabClick('home')}
                          to={'/'}>
                        الرئيسية
                    </Link>
                    <Link className={this.props.activeTab === 'new-order' ? 'active' : ''}
                          onClick={() => this.props.onTabClick('new-order')}
                          to={'/new-order'}>
                        ارسال طلب
                    </Link>
                    <Link className={this.props.activeTab === 'my-info' ? 'active' : ''}
                          onClick={() => this.props.onTabClick('my-info')}
                          to={'/my-info'}>
                        معلوماتي
                    </Link>
                </div>
            </>
        )
    }

}