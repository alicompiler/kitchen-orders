import * as React from "react";
import firebase from "../Bootstrap/Firebase";

interface Props {
}

interface State {
    date: string;
    orders: any[];
    loading: boolean;
    error: any;
    filteredOrders: any[];
}

export default class MonthlyReport extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {date: '', orders: [], filteredOrders: [], loading: true, error: null};
    }


    componentDidMount() {
        const firestore = firebase.firestore();
        firestore.collection('orders').get()
            .then(snap => {
                console.log(snap.docs);
                this.setState({loading: false, error: null, orders: snap.docs});
            })
            .catch(e => this.setState({error: e}));
    }

    private onDateChange = (e: any): void => {
        const month = e.target.value;
        const filteredOrders: any[] = [];
        if (month) {
            this.state.orders.forEach(order => {
                const data = order.data();
                const time = new Date(data.time.seconds * 1000);

                if (Number(time.getMonth() + 1) === Number(month)) {
                    filteredOrders.push(data);
                }
            });

            filteredOrders.sort((a: any, b: any) => {
                if (a.time.seconds < b.time.seconds)
                    return -1;
                else if (a.time.seconds < b.time.seconds)
                    return 1;
                return 0;
            })
        }

        this.setState({filteredOrders: filteredOrders});
    };

    render(): any {
        if (this.state.loading)
            return <h1>جاري تحميل البيانات...</h1>;
        if (this.state.error) {
            return <div>
                <h1>هناك مشكلة خلال تحميل البيانات ، يرجى التحقق من الاتصال بالانترنت : </h1>
                <p style={{padding: 16, background: '#EA1'}}>
                    {
                        this.state.error.toString()
                    }
                </p>
            </div>
        }
        return (
            <div>
                <h3>التقرير الشهري</h3>
                {
                    (!this.state.error && !this.state.loading) &&
                    <select onChange={this.onDateChange}>
                        <option value={''}>SELECT MONTH</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                        <option value={11}>11</option>
                        <option value={12}>12</option>
                    </select>
                }

                <br/><br/>

                <table className={'report-table'}>
                    <thead>
                    <tr>
                        <th>المستخدم</th>
                        <th>الوقت</th>
                        <th>المكان</th>
                        <th>الطلبات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.filteredOrders.map((order: any) => {
                            return <tr>
                                <td>{order.user}</td>
                                <td>{MonthlyReport.toStringTime(order.time.seconds)}</td>
                                <td>{order.place}</td>
                                <td>
                                    <ul>
                                        {
                                            order.items.map((item: any) => {
                                                return <li>{item.name}</li>
                                            })
                                        }
                                    </ul>
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>

                <br/><br/>

                <h3>مجموع الطلبات : {this.state.filteredOrders.length}</h3>

                <br/><br/>

            </div>
        )
    }

    static toStringTime(timeInSeconds: number) {
        const time = new Date(timeInSeconds * 1000);
        return time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
    }


}