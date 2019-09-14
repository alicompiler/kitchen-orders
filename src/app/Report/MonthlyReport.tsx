import * as React from "react";
import Table from "./Table";
import firebase from "./../Bootstrap/Firebase";

interface Props {
}

interface State {
    date: string;
    orders: any[];
    loading: boolean;
    error: any;
    filteredOrders: any;
}

export default class MonthlyReport extends React.Component<Props, State> {


    constructor(props: any) {
        super(props);
        this.state = {date: '', orders: [], filteredOrders: {}, loading: true, error: null};
    }

    componentDidMount(): void {
        const storage = firebase.storage();
        const ref = storage.ref("monthly-report.json");
        ref.getDownloadURL().then((downloadUrl: string) => {
            console.log(downloadUrl);
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    const response = xmlHttp.response;
                    this.setState({loading: false, error: false, orders: JSON.parse(response)});
                    return;
                }
                if (xmlHttp.status >= 400) {
                    this.setState({loading: false, error: 'cannot download report file'});
                }
                this.setState({loading: false, error: false});
            };
            xmlHttp.open("GET", downloadUrl, true);
            xmlHttp.send(null);
        }).catch(e => this.setState({loading: false, error: e}));
    }


    private onDateChange = (e: any): void => {
        const month = e.target.value;


        const ordersDic: any = {};

        if (month) {
            this.state.orders.forEach(order => {
                const data = order;

                const time = new Date(data.time.seconds * 1000);

                if (Number(time.getMonth() + 1) === Number(month)) {


                    const o = ordersDic[data.userId];
                    if (o) {
                        o.orders.push(data);
                    } else {
                        ordersDic[data.userId] = {
                            name: data.user,
                            orders: []
                        }
                    }
                }
            });

            const keys = Object.keys(ordersDic);
            keys.forEach(key => {
                const orders = ordersDic[key].orders;
                orders.sort((a: any, b: any) => {
                    if (a.time.seconds < b.time.seconds)
                        return -1;
                    else if (a.time.seconds < b.time.seconds)
                        return 1;
                    return 0;
                });
            });


        }

        this.setState({filteredOrders: ordersDic});
    };

    render(): any {

        const keys = Object.keys(this.state.filteredOrders);

        keys.sort((a: any, b: any) => {
            if (this.state.filteredOrders[a].name < this.state.filteredOrders[b].name)
                return -1;
            else if (a < b)
                return 1;
            return 0;
        });

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

                {
                    keys.map((key: string, index: number) => {
                        const orders = this.state.filteredOrders[key].orders;
                        const name = this.state.filteredOrders[key].name;

                        return <Table key={index} orders={orders} name={name}/>
                    })
                }

                <br/><br/>

                <br/><br/>

            </div>
        )
    }

    static toStringTime(timeInSeconds: number) {
        const time = new Date(timeInSeconds * 1000);
        return time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes();
    }


}