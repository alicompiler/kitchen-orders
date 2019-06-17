import * as React from "react";
import OrderActions from "./OrderActions";
import OrderItems from "./OrderItems";
import OrderHeader from "./OrderHeader";
import beep from "../../../utils/Beep";

interface Props {
    order: any;
    isAdmin?: boolean;
}

export default class OrderItem extends React.Component<Props> {

    private updated = false;
    private readonly WAIT_FOR_IS_NEW = 1000 * 60;
    private readonly cancelInterval: any = null;

    constructor(props: Props) {
        super(props);
        console.log(props.order.orderId);
        if (props.order.isNew) {
            beep();
            this.cancelInterval = setInterval(() => {
                if (this.updated) {
                    if (this.cancelInterval) {
                        clearInterval(this.cancelInterval);
                    }
                } else {
                    this.forceUpdate();
                }
            }, this.WAIT_FOR_IS_NEW);
        }
    }

    render() {
        const order = this.props.order;
        return <div className={`order-list-item`}>

            {
                this.isNew() &&
                <img alt={'new'} src={'/images/new-tag.png'} style={{
                    position: 'absolute',
                    left: 16,
                    top: 16,
                    width: 64,
                    height: 64,
                    borderRadius: 100,
                }}/>
            }
            <OrderHeader order={order}/>
            <OrderItems order={order}/>

            {
                this.props.isAdmin === true && <OrderActions order={order}/>
            }
        </div>
    }

    public isNew = () => {
        if (this.props.order.isNew && !this.updated) {
            const currentTime = new Date().getTime();
            const orderFetchTimePlus1Minute = this.props.order.isNew + this.WAIT_FOR_IS_NEW;
            const isNew = currentTime <= orderFetchTimePlus1Minute;
            if (!isNew) {
                this.updated = true;
            }
            return isNew;
        }
        return false;
    }
}