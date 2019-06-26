import * as React from "react"
import firebase from "./../Bootstrap/Firebase";

interface Props {
    isAdmin?: boolean;
}

export default class UserAppHeader extends React.Component<Props> {
    render() {
        return <div className={'app-header'}>
            <div className={'container'}>
                <div className={'app-header-content'}>
                    <div className={'logo-and-name'}>
                        <img alt={'coffee cup'} src={'/images/logo.png'} />
                        <p>ضيافة</p>
                    </div>
                    <div className={'actions'} style={{ cursor: 'pointer' }}>
                        {
                            this.props.isAdmin &&
                            <span onClick={() => firebase.auth().signOut()}>
                                <i className={'fas fa-sign-out-alt'} style={{ fontSize: 24, color: '#FFF' }} />
                            </span>
                        }
                    </div>
                </div>
            </div>
        </div>
    }
}