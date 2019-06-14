import * as React from "react";
import HorizontalLoader from "../../SharedComponent/HorizontalLoader/HorizontalLoader";

interface Props {
    place: string;
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
                           onChange={e => this.setState({place: e.target.value})}/>
                </div>
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