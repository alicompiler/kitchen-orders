import * as React from "react";
import firebase from "./../../Bootstrap/Firebase";
import HorizontalLoader from "../../SharedComponent/HorizontalLoader/HorizontalLoader";
import Select from "react-select";

interface Props {
}

export default class SendOrder extends React.Component<Props, any> {

    constructor(props: Props) {
        super(props);
        this.state = {menu: [], loadingMenu: true, orders: [], error: false};
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
        const orders = this.state.orders;
        let itemExists = false;
        for (let i = 0; i < this.state.orders.length; i++) {
            if (item.value === orders[i].id) {
                orders[i].count++;
                itemExists = true;
            }
        }
        if (!itemExists) {
            orders.push({id: item.value, name: item.label, count: 1});
        }
        this.setState({orders: [...orders]});
    };


    private removeOrder = (index: number) => {
        const orders = this.state.orders;
        orders.splice(index, 1);
        this.setState({orders: [...orders]});
    };

    private increaseOrderCount = (index: number) => {
        const orders = this.state.orders;
        orders[index].count++;
        this.setState({orders: [...orders]});
    };

    private decreaseOrderCount = (index: number) => {
        const orders = this.state.orders;
        if (orders[index].count > 0)
            orders[index].count--;
        this.setState({orders: [...orders]});
    };

    private setOrderNote = (index: number, note: string) => {
        const orders = this.state.orders;
        orders[index].note = note;
        this.setState({orders: [...orders]});
    };

    render() {
        if (this.state.error) {
            return <h1>Error</h1>;
        }
        if (this.state.loadingMenu) {
            return <HorizontalLoader/>
        }

        const itemKeys = Object.keys(this.state.menu);

        const options: any = [];
        itemKeys.map(itemKey => options.push({label: this.state.menu[itemKey], value: itemKey}));
        return (
            <div style={{padding: 16}}>

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
                                    <input onChange={e => this.setOrderNote(index, e.target.value)}
                                           placeholder={'الملاحظات'}/>
                                </div>
                            </div>;
                        })
                    }
                </div>

                <br/><br/><br/>

            </div>
        )
    }

}