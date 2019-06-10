import * as React from "react";
import firebase from "./../../Bootstrap/Firebase";
import HorizontalLoader from "../../SharedComponent/HorizontalLoader/HorizontalLoader";

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
                menu.push({name: data.name, id: doc.id});
            });
            this.setState({menu: menu, loadingMenu: false})
        }).catch(() => this.setState({error: true, loadingMenu: false}))
    }

    render() {
        if (this.state.error) {
            return <h1>Error</h1>;
        }
        if (this.state.loadingMenu) {
            return <HorizontalLoader/>
        }
        return (
            <div>
                {
                    this.state.orders.map((order: any) => {
                        return <p>{order}</p>;
                    })
                }

                <br/><br/><br/>

                <select onChange={(e) => console.log(e)}>
                    {
                        this.state.menu.map((item: any) => {
                            return <option value={item.id}>{item.name}</option>
                        })
                    }
                </select>
            </div>
        )
    }

}