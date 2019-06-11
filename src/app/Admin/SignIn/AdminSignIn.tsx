import * as React from "react";
import firebase from "./../../Bootstrap/Firebase";
import HorizontalLoader from "../../SharedComponent/HorizontalLoader/HorizontalLoader";

interface Props {
}

export default class AdminSignIn extends React.Component<Props, any> {


    constructor(props: Props) {
        super(props);
        this.state = {email: '', password: '', fail: false, sending: false};
    }

    render() {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                flexDirection: 'column'
            }}>

                {
                    this.state.fail &&
                    <p style={{color: '#BA3D50', marginBottom: 24, fontWeight: 'bold'}}>البريد الالكتروني او كلمة المرور
                        غير صحيحة</p>
                }

                <input style={{width: 300}} className={'main-input'} name={'email'} value={this.state.email}
                       placeholder={'البريد الالكتروني'}
                       onChange={e => this.setState({email: e.target.value})}/>
                <input style={{width: 300}} className={'main-input'} name={'password'} value={this.state.password}
                       placeholder={'كلمة المرور'}
                       type='password' onChange={e => this.setState({password: e.target.value})}/>


                <button disabled={this.state.sending} className={`main-button ${this.state.sending ? 'disabled' : ''}`}
                        onClick={() => {
                            this.setState({fail: false, sending: true});
                            const auth = firebase.auth();
                            auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
                                return auth.signInWithEmailAndPassword(this.state.email, this.state.password);
                            }).catch(() => this.setState({fail: true, sending: false}));
                        }}>
                    تسجيل الدخول
                </button>

                {
                    this.state.sending && <HorizontalLoader/>
                }

            </div>
        )
    }

}