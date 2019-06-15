import * as React from "react";
import OrderStatus from "./OrderStatus";

interface Props {
    order: any;
}

export default class OrderHeader extends React.Component<Props> {
    render() {
        const order = this.props.order;

        let {bgStatus, colorStatus, message} = this.getOrderStatusMetadata(order);

        return <div className={'user-info'}>
            <img alt={'avatar'} src={'/images/user.png'}/>
            <div className={'info'}>
                <p className={'name'}>{order.user}</p>
                <p className={'place'}>{order.place}</p>
                <span className={'status'} style={{
                    background: bgStatus,
                    color: colorStatus
                }}>{message}</span>
            </div>
        </div>
    }

    private getOrderStatusMetadata = (order: any) => {
        let bgStatus = '#EEE';
        let colorStatus = '#454545';
        let message = 'الطلب مرسل';
        if (order.status === OrderStatus.ON_PROGRESS) {
            bgStatus = '#F0F3BD';
            colorStatus = '#222';
            message = 'جاري العمل';
        } else if (order.status === OrderStatus.DONE) {
            bgStatus = '#02C39A';
            colorStatus = '#FFF';
            message = 'اكتمل'
        } else if (order.status === OrderStatus.REJECTED) {
            bgStatus = '#FF1654';
            colorStatus = '#FFF';
            message = 'مرفوض';
        }
        return {bgStatus, colorStatus, message};
    }
}