import * as React from "react";
import OrdersContainer from "../../SharedComponent/OrdersList/OrdersContainer";
import firebase from "../../Bootstrap/Firebase";


export default class AllOrdersContainer extends OrdersContainer {

    protected fetchOrders(): void {
        const db = firebase.firestore();
        db.collection("orders")
            .orderBy("time", "desc")
            .limit(50)
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach(change => {
                    this.setState((state: any) => {
                        return {orders: [{...change.doc.data(), orderId: change.doc.id}].concat(state.orders)};
                    });
                });
                this.setState({loading: false, error: false});
            });
    }
}