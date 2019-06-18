import * as React from "react"


export default class AppHeader extends React.Component {
    render() {
        return <div className={'app-header'}>
            <div className={'container'}>
                <div className={'app-header-content'}>
                    <div className={'logo-and-name'}>
                        <img alt={'coffee cup'} src={'/images/logo.png'}/>
                        <p>ضيافة</p>
                    </div>
                    <div className={'actions'}>

                    </div>
                </div>
            </div>
        </div>
    }
}