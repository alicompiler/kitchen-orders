import * as React from "react";
import MonthlyReport from "./MonthlyReport";
import OrderStatus from "../SharedComponent/OrdersList/OrderStatus";

interface Props {
    orders: any[];
    name: string;
}

export default class Table extends React.Component<Props> {
    render(): JSX.Element {

        if (this.props.orders.length === 0) {
            return <div/>;
        }
        return <div style={{margin: '16px 0'}}>

            <h2>{this.props.name}</h2>

            <table className={'report-table'}>
                <thead>
                <tr>
                    <th>المستخدم</th>
                    <th>الوقت</th>
                    <th>المكان</th>
                    <th>الطلبات</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {

                    this.props.orders.map((order: any, index: number) => {
                        return <tr key={index}
                                   style={{
                                       background: order.status === OrderStatus.REJECTED ? 'red' : 'inherent',
                                       color: order.status === OrderStatus.REJECTED ? 'white' : 'inherent'
                                   }}>
                            <td>{order.user}</td>
                            <td style={{direction: 'ltr'}}>{MonthlyReport.toStringTime(order.time.seconds)}</td>
                            <td>{order.place}</td>
                            <td>
                                <ul>
                                    {
                                        order.items.map((item: any, index: number) => {
                                            return <li key={index}>{item.name}</li>
                                        })
                                    }
                                </ul>
                            </td>
                            <td>{order.guest ? 'ضيف' : '-'}</td>
                        </tr>
                    })

                }

                </tbody>
            </table>

            <h4 style={{textAlign: 'left'}}>المجموع الكلي : {this.props.orders.length}</h4>

        </div>
    }
}