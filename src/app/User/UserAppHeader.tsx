import * as React from "react"


export default class UserAppHeader extends React.Component {
    render() {
        return <div className={'app-header'}>
            <div className={'container'}>
                <div className={'app-header-content'}>
                    <div className={'logo-and-name'}>
                        <img alt={'coffee cup'} src={'/images/logo.png'}/>
                        <p>نظام الطلبات</p>
                    </div>
                    <div className={'actions'}>
                        <a>
                            <i className={'fas fa-exit'} style={{fontSize: 18, color: 'red'}}/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    }
}