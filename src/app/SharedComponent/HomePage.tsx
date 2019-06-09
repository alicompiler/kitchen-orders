import * as React from "react";
import AppHeader from "./AppHeader";
import {Link} from "react-router-dom";

interface Props {

}

export default class HomePage extends React.Component<Props> {
    render() {
        const rand = Math.floor(Math.random() * 3) + 1;
        const imagePath = `/images/home_bg_${rand}.svg`;
        return <div>
            <AppHeader/>
            <div style={{maxWidth: 1024, margin: 'auto'}}>
                <img alt={'home background'} src={imagePath} className={'home_background'}/>


                <br/><br/><br/><br/>

                <div className={'login-buttons-container'}>
                    <Link className={'admin-login-button'} to={'/login/admin'}>تسجيل الدخول كـ مدير</Link>
                    <span style={{width: 24, height: 10}}/>
                    <Link className={'user-login-button'} to={'/login/user'}>تسجيل الدخول كـ مستخدم</Link>
                </div>

            </div>
        </div>
    }
}