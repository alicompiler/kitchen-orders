import * as React from "react";
import firebase from "./../../Bootstrap/Firebase";
import HorizontalLoader from "../../SharedComponent/HorizontalLoader/HorizontalLoader";


interface Props {
}

export default class OrderList extends React.Component<Props, any> {

    constructor(props: Props) {
        super(props);
        this.state = {orders: [], loading: true, error: false};
    }

    componentDidMount(): void {
        const db = firebase.firestore();
        const user = firebase.auth().currentUser as any;

        db.collection("orders").where("userId", "==", user.uid).get().then((snapshot) => {
            const orders: any[] = [];
            snapshot.forEach((doc) => {
                orders.push(doc.data());
            });
            this.setState({orders: orders, loading: false, error: false});
        });
    }


    render() {
        if (this.state.loading) {
            return <HorizontalLoader/>
        } else if (this.state.error) {
            return <h1>Error</h1>
        }

        return <div>
            <div className={'orders-list'}>
                {
                    this.state.orders.map((order: any) => {
                        return <div className={'order-list-item'}>
                            <p>{order.user}</p>
                            <p>{order.place}</p>
                            <p>{order.status ? order.status : 'في الانتظار'}</p>
                        </div>
                    })
                }
            </div>
        </div>
    }

}