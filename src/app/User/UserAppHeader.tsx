import * as React from "react"
import firebase from "./../Bootstrap/Firebase";

export default class UserAppHeader extends React.Component {
    render() {
        return <div className={'app-header'}>
            <div className={'container'}>
                <div className={'app-header-content'}>
                    <div className={'logo-and-name'}>
                        <img alt={'coffee cup'} src={'/images/logo.png'}/>
                        <p>نظام الطلبات</p>
                    </div>
                    <div className={'actions'} style={{cursor: 'pointer'}}>
                        <span onClick={() => firebase.auth().signOut()}>
                            <i className={'fas fa-sign-out-alt'} style={{fontSize: 24, color: '#FFF'}}/>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    }
}