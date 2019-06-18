import * as React from "react";
import OrderList from "./OrderList";
import HorizontalLoader from "../HorizontalLoader/HorizontalLoader";

interface Props {
    isAdmin?: boolean;
}

export default abstract class OrdersContainerBase extends React.Component<Props, any> {

    protected firstDownloadedDocs = new Set();

    protected constructor(props: Props) {
        super(props);
        this.state = {orders: [], loading: true, error: false};
    }

    componentDidMount(): void {
        this.fetchOrders();
    }

    protected fetchOrders(): void {
        const query = this.getFirestoreQuery();
        query.get().then((snapshot: any) => {
            const orders: any = [];
            snapshot.forEach((doc: any) => {
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

    protected listenForChanges(): void {
        this.getFirestoreQuery().onSnapshot(((snapshot: any) => {
            snapshot.docChanges().forEach((change: any) => {
                console.log(change);
                if (change.type === "added") {
                    this.onNewOrder(change);
                } else if (change.type === "removed") {
                    this.onOrderRemoved(change);
                } else if (change.type === "modified") {
                    this.onOrderModified(change);
                }
            });
        }));
    }

    private onNewOrder(change: any): void {
        if (this.firstDownloadedDocs.has(change.doc.id)) {
            return;
        }
        const orders = [{
            ...change.doc.data(),
            orderId: change.doc.id,
            isNew: new Date().getTime()
        }].concat(this.state.orders);

        this.setState({orders: orders});
    }

    private onOrderRemoved(change: any): void {
        this.setState((state: any) => {
            const orders = [...state.orders];
            let index = -1;
            for (let i = 0; i < orders.length; i++) {
                if (orders[i].orderId === change.doc.id) {
                    index = i;
                    break;
                }
            }

            if (index > -1) {
                orders.splice(index, 1);
                return {orders: orders};
            }
        });
    }

    private onOrderModified(change: any): void {
        this.setState((state: any) => {
            const orders = [...state.orders];
            let index = -1;
            for (let i = 0; i < orders.length; i++) {
                if (orders[i].orderId === change.doc.id) {
                    index = i;
                    break;
                }
            }

            if (index > -1) {
                orders[index] = {...change.doc.data(), orderId: change.doc.id};
                return {orders: orders};
            }
        });
    }

    protected abstract getFirestoreQuery(): any;

    render() {
        if (this.state.loading) {
            return <HorizontalLoader/>
        } else if (this.state.error) {
            return <h1>Error</h1>
        }
        return <OrderList isAdmin={this.props.isAdmin} orders={this.state.orders}/>
    }
}