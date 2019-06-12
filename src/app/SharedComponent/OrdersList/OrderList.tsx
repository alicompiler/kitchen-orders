import * as React from "react";
import firebase from "../../Bootstrap/Firebase";
import HorizontalLoader from "../HorizontalLoader/HorizontalLoader";
import OrderItem from "./OrderItem";


interface Props {
    orders: any[];
}


export default class OrderList extends React.Component<Props, any> {




    render() {


        return <div>
            <div className={'orders-list'} style={{padding: 16}}>
                {
                    this.props.orders.map((order: any, index: number) => <OrderItem order={order} key={index}/>)
                }
            </div>
        </div>
    }


}