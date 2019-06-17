import OrdersContainer from "../../SharedComponent/OrdersList/OrdersContainer";
import firebase from "../../Bootstrap/Firebase";


export default class AllOrdersContainer extends OrdersContainer {

    private firstDownloadedDocs = new Set();

    protected fetchOrders(): void {
        const db = firebase.firestore();
        db.collection("orders")
            .orderBy("time", "desc")
            .limit(50)
            .get().then((snapshot) => {
            const orders: any = [];
            snapshot.forEach(doc => {
                this.firstDownloadedDocs.add(doc.id);
                orders.push({
                    ...doc.data(),
                    orderId: doc.id
                });
            });

            this.setState({orders: orders, loading: false, error: false},
                () => this.listenForChanges());
        });
    }

    private listenForChanges() {
        const db = firebase.firestore();
        db.collection("orders")
            .orderBy("time", "desc")
            .limit(50)
            .onSnapshot((snapshot => {
                snapshot.docChanges().forEach((change: any) => {
                    if (change.type === "added") {
                        if (this.firstDownloadedDocs.has(change.doc.id)) {
                            return;
                        }
                        console.log('added', change.doc.data());
                        const orders = [{
                            ...change.doc.data(),
                            orderId: change.doc.id,
                            isNew: new Date().getTime()
                        }].concat(this.state.orders);
                        console.log(orders.length);
                        this.setState({orders: orders});
                    } else if (change.type === "removed") {
                        console.log('removed', change);
                        this.setState((state: any) => {
                            const orders = [...state.orders];
                            orders.splice(change.oldIndex, 1);
                            return {orders: [...orders]};
                        });
                    } else if (change.type === "modified") {
                        this.setState((state: any) => {
                            const orders = [...state.orders];
                            orders[change.oldIndex] = {...change.doc.data(), orderId: change.doc.id};
                            return {orders: [...orders]};
                        });
                    }
                });
            }))
    }
}