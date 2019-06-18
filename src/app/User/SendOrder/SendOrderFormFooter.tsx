import * as React from "react";
import HorizontalLoader from "../../SharedComponent/HorizontalLoader/HorizontalLoader";

interface Props {
    place: string;
    guest: any;
    onGuestChange:(e:any)=>void;
    onPlaceChange:(e:any)=>void;
    sending: boolean;
    send: () => void;
}

export default class SendOrderFormFooter extends React.Component<Props> {

    render() {
        return (
            <div>
                <div>
                    <label>المكان</label>
                    <input id={'place'} style={{display: 'inline-block', marginRight: 16}}
                           className={'main-input'}
                           placeholder={'المكان'} value={this.props.place}
                           onChange={this.props.onPlaceChange}/>
                </div>

                <label className='checkbox-container'>
                ضيف
                    <input type='checkbox' value={this.props.guest} onChange={this.props.onGuestChange}/>
                    <span className='checkmark'/>
                </label>


                <button className={`main-button ${this.props.sending ? 'disabled' : ''}`}
                        disabled={this.props.sending} onClick={this.props.send}>ارسال
                </button>

                {
                    this.props.sending && <HorizontalLoader/>
                }
            </div>
        )
    }

}