import * as React from "react";
import OrderActions from "./OrderActions";
import OrderItems from "./OrderItems";
import OrderHeader from "./OrderHeader";

interface Props {
    order: any;
    isAdmin?: boolean;
}

export default class OrderItem extends React.Component<Props> {
    render() {
        const order = this.props.order;
        return <div className={'order-list-item'}>

            <OrderHeader order={order}/>
            <OrderItems order={order}/>

            {
                this.props.isAdmin === true && <OrderActions order={order}/>
            }
        </div>
    }
}