import * as React from "react";
import OrdersContainer from "../../SharedComponent/OrdersList/OrdersContainer";
import firebase from "../../Bootstrap/Firebase";


export default class MyOrdersContainer extends OrdersContainer {

    protected fetchOrders(): void {
        const db = firebase.firestore();
        const user = firebase.auth().currentUser as any;
        db.collection("orders")
            .where("userId", "==", user.uid)
            .onSnapshot((snapshot) => {
            const orders: any[] = [];
            snapshot.forEach((doc) => {
                orders.push(doc.data());
            });
            this.setState({orders: orders, loading: false, error: false});
        })
    }

}