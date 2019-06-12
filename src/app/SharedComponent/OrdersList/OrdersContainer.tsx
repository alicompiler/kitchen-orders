import * as React from "react";
import OrderList from "./OrderList";
import HorizontalLoader from "../HorizontalLoader/HorizontalLoader";

interface Props {
    isAdmin?: boolean;
}

export default abstract class OrdersContainerBase extends React.Component<Props, any> {

    protected constructor(props: Props) {
        super(props);
        this.state = {orders: [], loading: true, error: false};
    }

    componentDidMount(): void {
        this.fetchOrders();
    }


    protected abstract fetchOrders(): void ;

    render() {
        if (this.state.loading) {
            return <HorizontalLoader/>
        } else if (this.state.error) {
            return <h1>Error</h1>
        }
        return <OrderList isAdmin={this.props.isAdmin} orders={this.state.orders}/>
    }
}