import * as React from "react";
import OrderStateManager from "../../Admin/Services/OrderStateManager";
import HorizontalLoader from "../HorizontalLoader/HorizontalLoader";
import StarRatingComponent from "react-star-rating-component";

interface Props {
    order: any;
}

export default class OrderActions extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
        this.state = {loading: false, error: false, note: ''};
    }

    render() {
        return <div className={'actions'}>
            <div style={{display: 'flex', marginBottom: 12}}>
                <button disabled={this.state.loading}
                        onClick={this.onProgress}
                        className={'main-button'}
                        style={{margin: '0 6px', background: '#F0F3BD', color: '#454545'}}>جاري العمل
                </button>
                <button disabled={this.state.loading}
                        onClick={this.done}
                        className={'main-button'} style={{margin: '0 6px'}}>اكتمل
                </button>
                <button disabled={this.state.loading}
                        onClick={this.reject}
                        className={'main-button'} style={{margin: '0 6px', background: '#BA3D50'}}>رفض
                </button>
            </div>
            {
                this.state.loading && <HorizontalLoader/>
            }
            <input disabled={this.state.loading} onChange={e => this.setState({note: e.target.value})}
                   value={this.state.note} placeholder={'ملاحظة'}
                   className={'main-input'}/>
            {
                this.state.error &&
                <p style={{color: '#BA3D50', margin: '16px 0'}}>
                    لم تتم العملية , تحقق من الاتصال بالانترنت ثم حاول مرة ثانية
                </p>
            }

            <StarRatingComponent
                name='order-rating' value={this.props.order.rating ? this.props.order.rating : 0}
                starCount={5} editing={false}
            />
            
        </div>
    }

    private done = () => {
        this.setState({loading: true, error: false});
        const statusManager = new OrderStateManager();
        statusManager.done(this.props.order.orderId, () => {
            this.setState({loading: false, error: false, note: ''});
        }, () => {
            this.setState({loading: false, error: false});
        })
    };

    private onProgress = () => {
        this.setState({loading: true, error: false});
        const statusManager = new OrderStateManager();
        statusManager.onProgress(this.props.order.orderId, () => {
            this.setState({loading: false, error: false, note: ''});
        }, () => {
            this.setState({loading: false, error: false});
        })
    };

    private reject = () => {
        this.setState({loading: true, error: false});
        const statusManager = new OrderStateManager();
        statusManager.reject(this.props.order.orderId, this.state.note, () => {
            this.setState({loading: false, error: false, note: ''});
        }, () => {
            this.setState({loading: false, error: false});
        })
    }
}