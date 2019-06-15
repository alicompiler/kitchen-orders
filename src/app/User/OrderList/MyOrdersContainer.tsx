import * as React from "react";
import OrdersContainer from "../../SharedComponent/OrdersList/OrdersContainer";
import firebase from "../../Bootstrap/Firebase";


export default class MyOrdersContainer extends OrdersContainer {

    protected fetchOrders(): void {
        const db = firebase.firestore();
        const user = firebase.auth().currentUser as any;
        db.collection("orders")
            .orderBy("time", "desc")
            .where("userId", "==", user.uid)
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach(change => {
                    this.setState((state: any) => {
                        return {orders: [change.doc.data()].concat(state.orders)};
                    });
                });
                this.setState({loading: false, error: false});
            })
    }

}