import * as React from "react";
import OrdersContainer from "../../SharedComponent/OrdersList/OrdersContainer";
import firebase from "../../Bootstrap/Firebase";


export default class UnfinishedOrdersContainer extends OrdersContainer {

    protected fetchOrders(): void {
        const db = firebase.firestore();
        db.collection("orders")
            .where("status", ">", 0)
            .where("status", "<", 100)
            .onSnapshot((snapshot) => {
                const orders: any[] = [];
                snapshot.forEach((doc) => {
                    orders.push(doc.data());
                });
                this.setState({orders: orders, loading: false, error: false});
            });
    }
}