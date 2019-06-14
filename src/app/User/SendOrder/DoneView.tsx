import * as React from "react";
import {Link} from "react-router-dom";

interface Props {
    startAgain: () => void;
}

export default class DoneView extends React.Component<Props> {

    render() {
        return (
            <div>
                <div style={{padding: 24, textAlign: 'center'}}>
                    <i className={'fas fa-check'} style={{color: '#02C39A', fontSize: '4em'}}/>
                    <p style={{color: '#777', textAlign: 'center', margin: '16px 0'}}>
                        تم ارسال الطلب
                    </p>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <button className={'secondary-button'} onClick={this.props.startAgain}>ارسال طلب جديد</button>
                    <span style={{width: 32, height: 10}}/>
                    <Link className={'main-button'} to={'/'}>القائمة الرئيسية</Link>
                </div>
            </div>
        )
    }

}