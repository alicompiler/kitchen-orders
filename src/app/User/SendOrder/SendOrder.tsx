import * as React from "react";
import firebase from "./../../Bootstrap/Firebase";
import HorizontalLoader from "../../SharedComponent/HorizontalLoader/HorizontalLoader";
import Select from "react-select";
import {Link} from "react-router-dom";

interface Props {
    user: any;
}

export default class SendOrder extends React.Component<Props, any> {

    constructor(props: Props) {
        super(props);
        this.state = {
            menu: [],
            loadingMenu: true,
            orders: [],
            error: false,
            sending: false,
            sendingFail: false,
            done: false,
            place: props.user.place
        };
    }

    componentDidMount() {
        const db = firebase.firestore();
        db.collection("menu").get().then((snapshot: any) => {
            const menu: any = [];
            snapshot.forEach((doc: any) => {
                const data = doc.data();
                menu[doc.id] = data.name;
            });
            this.setState({menu: menu, loadingMenu: false});
        }).catch(() => this.setState({error: true, loadingMenu: false}))
    }

    private addItem = (item: any) => {
        const orders = [...this.state.orders];
        let itemExists = false;
        for (let i = 0; i < orders.length; i++) {
            if (item.value === orders[i].id) {
                orders[i].count++;
                itemExists = true;
            }
        }
        if (!itemExists) {
            orders.push({id: item.value, name: item.label, count: 1});
        }
        this.setState({orders: orders});
    };


    private removeOrder = (index: number) => {
        const orders = [...this.state.orders];
        orders.splice(index, 1);
        console.log(orders);
        this.setState({orders: orders});
    };

    private increaseOrderCount = (index: number) => {
        const orders = [...this.state.orders];
        orders[index].count++;
        this.setState({orders: orders});
    };

    private decreaseOrderCount = (index: number) => {
        const orders = [...this.state.orders];
        if (orders[index].count > 0)
            orders[index].count--;
        this.setState({orders: orders});
    };

    private setOrderNote = (index: number, note: string) => {
        const orders = [...this.state.orders];
        orders[index].note = note;
        console.log(orders);
        this.setState({orders: orders});
    };

    private send = () => {
        const orders = this.state.orders;
        const db = firebase.firestore();

        this.setState({sending: true, sendingFail: false, done: false});

        const uid = (firebase.auth().currentUser as any).uid;
        const order = {
            items: orders,
            userId: uid,
            user: this.props.user.name,
            place: this.state.place
        };
        db.collection("orders").add(order)
            .then(() => this.setState({sending: false, sendingFail: false, done: true}))
            .catch(() => this.setState({sending: false, sendingFail: true, done: false}));
    };

    private startAgain = () => {
        this.setState({sending: false, orders: [], sendingFail: false, done: false});
    };

    render() {

        if (this.state.done) {
            return <div>
                <div style={{padding: 24, textAlign: 'center'}}>
                    <i className={'fas fa-check'} style={{color: '#02C39A', fontSize: '4em'}}/>
                    <p style={{color: '#777', textAlign: 'center', margin: '16px 0'}}>
                        تم ارسال الطلب
                    </p>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <button className={'secondary-button'} onClick={this.startAgain}>ارسال طلب جديد</button>
                    <span style={{width: 32, height: 10}}/>
                    <Link className={'main-button'} to={'/'}>القائمة الرئيسية</Link>
                </div>

            </div>
        }

        if (this.state.error) {
            return <h1>Error</h1>;
        }
        if (this.state.loadingMenu) {
            return <HorizontalLoader/>
        }

        const itemKeys = Object.keys(this.state.menu);

        const options: any = [];
        itemKeys.map(itemKey => options.push({label: this.state.menu[itemKey], value: itemKey}));
        // noinspection JSUnusedGlobalSymbols
        return (
            <div style={{padding: 16}}>

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
                } onChange={this.addItem} options={options}/>

                <div className={'orders'}>
                    {
                        this.state.orders.map((order: any, index: number) => {
                            return <div className={'order-item'} key={index}>
                                <div className={'order-item-info'}>
                                    <a onClick={() => this.removeOrder(index)} className={'delete-button'}>
                                        <i className={'fas fa-trash-alt'}/>
                                    </a>
                                    <p className={'order-name'}>{order.name}</p>
                                    <div className={'order-count'}>
                                        <p className={'order-count'}>{order.count}</p>
                                        <a onClick={() => this.increaseOrderCount(index)} className={'plus-button'}>
                                            <i className={'fas fa-plus-square'}/>
                                        </a>
                                        <a onClick={() => this.decreaseOrderCount(index)} className={'minus-button'}>
                                            <i className={'fas fa-minus-square'}/>
                                        </a>
                                    </div>
                                </div>
                                <div className={'order-item-note'}>
                                    <input value={order.note ? order.note : ''}
                                           onChange={e => this.setOrderNote(index, e.target.value)}
                                           placeholder={'الملاحظات'}/>
                                </div>
                            </div>;
                        })
                    }
                </div>

                <br/><br/><br/>

                {
                    this.state.orders.length > 0 &&
                    <div>
                        <div>
                            <label>المكان</label>
                            <input id={'place'} style={{display: 'inline-block', marginRight: 16}}
                                   className={'main-input'}
                                   placeholder={'المكان'} value={this.state.place}
                                   onChange={e => this.setState({place: e.target.value})}/>
                        </div>
                        <button className={`main-button ${this.state.sending ? 'disabled' : ''}`}
                                disabled={this.state.sending} onClick={this.send}>ارسال
                        </button>
                        {
                            this.state.sending && <HorizontalLoader/>
                        }
                    </div>
                }

            </div>
        )
    }

}