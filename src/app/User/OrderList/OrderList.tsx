import * as React from "react";
import firebase from "./../../Bootstrap/Firebase";
import HorizontalLoader from "../../SharedComponent/HorizontalLoader/HorizontalLoader";


interface Props {
}

enum OrderStatus {
    WAITING = 1,
    ON_PROGRESS = 2,
    DONE = 3,
    REJECTED = 4,
}

export default class OrderList extends React.Component<Props, any> {

    constructor(props: Props) {
        super(props);
        this.state = {orders: [], loading: true, error: false};
    }

    componentDidMount(): void {
        const db = firebase.firestore();
        const user = firebase.auth().currentUser as any;

        db.collection("orders").where("userId", "==", user.uid).onSnapshot((snapshot) => {
            const orders: any[] = [];
            snapshot.forEach((doc) => {
                orders.push(doc.data());
            });
            this.setState({orders: orders, loading: false, error: false});
        })
    }


    render() {
        if (this.state.loading) {
            return <HorizontalLoader/>
        } else if (this.state.error) {
            return <h1>Error</h1>
        }

        return <div>
            <div className={'orders-list'} style={{padding: 16}}>
                {
                    this.state.orders.map(this.orderItem)
                }
            </div>
        </div>
    }

    private orderItem = (order: any) => {
        let bgStatus = '#EEE';
        let colorStatus = '#454545';
        let message = 'الطلب مرسل';
        if (order.status === OrderStatus.ON_PROGRESS) {
            bgStatus = '#F0F3BD';
            colorStatus = '#222';
            message = 'جاري العمل';
        } else if (order.status === OrderStatus.DONE) {
            bgStatus = '#02C39A';
            colorStatus = '#FFF';
            message = 'اكتمل'
        } else if (order.status === OrderStatus.REJECTED) {
            bgStatus = '#FF1654';
            colorStatus = '#FFF';
            message = 'مرفوض';
        }

        return <div className={'order-list-item'}>
            <div className={'user-info'}>
                <img alt={'avatar image'} src={'/images/user.png'}/>
                <div className={'info'}>
                    <p className={'name'}>{order.user}</p>
                    <p className={'place'}>{order.place}</p>
                    <span className={'status'} style={{
                        background: bgStatus,
                        color: colorStatus
                    }}>{message}</span>
                </div>
            </div>
            <div className={'items'}>
                {
                    order.items.map((item: any) => {
                        return <div className={'item'}>
                            <div>
                                <span className={'count'}>
                                    {item.count}
                                </span>
                            </div>
                            <div className={'info'}>
                                <div className={'name'}>{item.name}</div>
                                {
                                    item.note && <div className={'note'}>{item.note}</div>
                                }
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    }


}