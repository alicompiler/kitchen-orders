import * as React from "react";
import firebase from "./../../Bootstrap/Firebase";
import HorizontalLoader from "../../SharedComponent/HorizontalLoader/HorizontalLoader";
import Select from "react-select";
import DoneView from "./DoneView";
import Orders from "./Orders";
import SendOrderFormFooter from "./SendOrderFormFooter";
import OrderStatus from "../../SharedComponent/OrdersList/OrderStatus";

interface Props {
    user: any;
}

interface State {
    menu: any,
    loadingMenu: boolean,
    orders: any[],
    error: boolean,
    sending: boolean,
    sendingFail: boolean,
    done: boolean,
    place: string,
    guest: any;
}

export default class SendOrder extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            guest: false,
            menu: [],
            loadingMenu: true,
            orders: [],
            error: false,
            sending: false,
            sendingFail: false,
            done: false,
            place: props.user.place ? props.user.place : ''
        };
    }

    componentDidMount() {
        const db = firebase.firestore();
        db.collection("menu").orderBy("name").get().then((snapshot: any) => {
            const menu: any = [];
            snapshot.forEach((doc: any) => {
                const data = doc.data();
                menu[doc.id] = data.name;
            });
            menu['special-order'] = 'طلب خاص';
            this.setState({ menu: menu, loadingMenu: false });
        }).catch(() => this.setState({ error: true, loadingMenu: false }))
    }

    private addItem = (item: any) => {
        const orders = [...this.state.orders];

        if (item.value === 'special-order') {
            orders.push({ id: item.value, isSpecialOrder: true, count: 1 });
            this.setState({ orders: orders });
            return;
        }


        let itemExists = false;
        for (let i = 0; i < orders.length; i++) {
            if (item.value === orders[i].id) {
                orders[i].count++;
                itemExists = true;
            }
        }
        if (!itemExists) {
            orders.push({ id: item.value, name: item.label, count: 1 });
        }
        this.setState({ orders: orders });
    };

    private onSpecialOrderChange = (index: number, value: string) => {
        const orders = [...this.state.orders];
        orders[index].name = value;
        this.setState({ orders: orders });
    }


    private removeOrder = (index: number) => {
        const orders = [...this.state.orders];
        orders.splice(index, 1);
        this.setState({ orders: orders });
    };

    private increaseOrderCount = (index: number) => {
        const orders = [...this.state.orders];
        orders[index].count++;
        this.setState({ orders: orders });
    };

    private decreaseOrderCount = (index: number) => {
        const orders = [...this.state.orders];
        if (orders[index].count > 1)
            orders[index].count--;
        this.setState({ orders: orders });
    };

    private setOrderNote = (index: number, note: string) => {
        const orders = [...this.state.orders];
        orders[index].note = note;
        this.setState({ orders: orders });
    };

    private send = () => {
        const orders = this.state.orders.filter(item => item.name && item.name.trim().length > 0);
        const db = firebase.firestore();

        this.setState({ sending: true, sendingFail: false, done: false });

        const uid = (firebase.auth().currentUser as any).uid;
        const order = {
            items: orders,
            userId: uid,
            user: this.props.user.name,
            place: this.state.place,
            time: firebase.firestore.FieldValue.serverTimestamp(),
            guest: this.state.guest,
            status: OrderStatus.WAITING
        };

        db.collection("orders").add(order)
            .then(() => this.setState({ sending: false, sendingFail: false, done: true }))
            .catch(() => this.setState({ sending: false, sendingFail: true, done: false }));
    };

    private startAgain = () => {
        this.setState({ sending: false, orders: [], sendingFail: false, done: false });
    };

    render() {

        if (this.state.done) {
            return <DoneView startAgain={this.startAgain} />
        }
        if (this.state.error) {
            return <h1>Error</h1>;
        }
        if (this.state.loadingMenu) {
            return <HorizontalLoader />
        }

        const itemKeys = Object.keys(this.state.menu);

        const options: any = [];
        itemKeys.map(itemKey => options.push({ label: this.state.menu[itemKey], value: itemKey }));
        // noinspection JSUnusedGlobalSymbols
        return (
            <div style={{ padding: 16 }}>

                <p>القائمة : </p>
                <Select styles={{
                    option: (style) => {
                        return {
                            ...style,
                            fontSize: 22,
                            paddingTop: 12,
                            paddingBottom: 12,
                            background: '#FFF',
                            color: '#05668D'
                        };
                    }
                }
                } onChange={this.addItem} options={options} />

                <div className={'orders'}>
                    <Orders orders={this.state.orders} removeOrder={this.removeOrder}
                        setSpecialOrder={this.onSpecialOrderChange}
                        increaseOrderCount={this.increaseOrderCount}
                        decreaseOrderCount={this.decreaseOrderCount}
                        setOrderNote={this.setOrderNote} />
                </div>

                <br /><br /><br />

                {
                    this.state.orders.length > 0 &&
                    <SendOrderFormFooter
                        onGuestChange={e => {
                            this.setState({ guest: !this.state.guest });
                        }} guest={this.state.guest}
                        onPlaceChange={e => this.setState({ place: e.target.value })} place={this.state.place}
                        sending={this.state.sending} send={this.send} />
                }

            </div>
        )
    }

}