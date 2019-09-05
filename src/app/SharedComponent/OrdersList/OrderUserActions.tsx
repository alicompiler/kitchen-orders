import * as React from "react";
import OrderStateManager from "../../Admin/Services/OrderStateManager";
import HorizontalLoader from "../HorizontalLoader/HorizontalLoader";
import OrderStatus from "./OrderStatus";
import StarRatingComponent from 'react-star-rating-component';
import firebase from "./../../Bootstrap/Firebase";

interface Props {
    order: any;
}

export default class OrderActions extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
        this.state = { loading: false, error: false };
    }

    render() {
        return <div className={'actions'}>
            <div style={{ display: 'flex', marginBottom: 12 }}>
                {
                    this.props.order.status === OrderStatus.WAITING &&
                    <button disabled={this.state.loading}
                        onClick={this.cancel}
                        className={'main-button'} style={{ margin: '0 6px', background: '#BA3D50' }}>الغاء الطلب
                </button>
                }
            </div>
            <label>ارسل تقيمك</label>
            <StarRatingComponent
                name='order-rating' value={this.props.order.rating ? this.props.order.rating : 0}
                starCount={5} /* number of icons in rating, default `5` */
                onStarClick={value => this.rate(value)} /* on icon click handler */
                editing={!this.state.loading} /* is component available for editing, default `true` */
            />
            {
                this.state.loading && <HorizontalLoader />
            }
            {
                this.state.error &&
                <p style={{ color: '#BA3D50', margin: '16px 0' }}>
                    لم تتم العملية , تحقق من الاتصال بالانترنت ثم حاول مرة ثانية
                </p>
            }
        </div>
    }

    private cancel = () => {
        this.setState({ loading: true, error: false });
        const statusManager = new OrderStateManager();
        statusManager.cancel(this.props.order.orderId, () => {
            this.setState({ loading: false, error: false });
        }, () => {
            this.setState({ loading: false, error: false });
        })
    };

    private rate = (value: number) => {
        this.setState({ loading: true, error: false });
        const db = firebase.firestore();
        db.collection("orders").doc(this.props.order.orderId)
            .update({ rating: value })
            .then(() => this.setState({ loading: false, error: false }))
            .catch(() => this.setState({ loading: false, error: true }))

    }
}