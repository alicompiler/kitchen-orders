import * as React from "react";
import OrdersContainer from "../../SharedComponent/OrdersList/OrdersContainer";
import firebase from "../../Bootstrap/Firebase";


export default class AllOrdersContainer extends OrdersContainer {

    protected fetchOrders(): void {
        const db = firebase.firestore();
        db.collection("orders")
            .limit(50)
            .onSnapshot((snapshot) => {
                const orders: any[] = [];
                snapshot.forEach((doc) => {
                    orders.push({...doc.data(), orderId: doc.id});
                });
                this.setState({orders: orders, loading: false, error: false});
            });
    }
}