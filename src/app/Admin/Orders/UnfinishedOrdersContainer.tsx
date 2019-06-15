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
                snapshot.docChanges().forEach(change => {
                    console.log(change);
                    if (change.type === "added") {
                        this.setState((state: any) => {
                            return {orders: [{...change.doc.data(), orderId: change.doc.id}].concat(state.orders)};
                        });
                    } else if (change.type === "removed") {
                        this.setState((state: any) => {
                            const orders = [...state.orders];
                            orders.splice(change.oldIndex, 1);
                            return {orders: [...orders]};
                        });
                    }
                });
                this.setState({loading: false, error: false});
            });
    }
}