import * as React from "react";
import OrderItem from "./OrderItem";


interface Props {
    orders: any[];
    isAdmin?: boolean;
}


export default class OrderList extends React.Component<Props, any> {

    render() {
        return <div>
            <div className={'orders-list'} style={{padding: 16}}>
                {
                    this.props.orders.map((order: any) => <OrderItem
                        isAdmin={this.props.isAdmin}
                        order={order} key={order.orderId}/>)
                }
            </div>
        </div>
    }


}