import * as React from "react";

interface Props {
    orders: any[];
    removeOrder: (index: any) => void;
    increaseOrderCount: (index: any) => void;
    decreaseOrderCount: (index: any) => void;
    setOrderNote: (index: any, note: string) => void;
}

export default class Orders extends React.Component<Props> {

    render() {
        return this.props.orders.map((order: any, index: number) => {
            return <div className={'order-item'} key={index}>
                <div className={'order-item-info'}>
                    <span onClick={() => this.props.removeOrder(index)} className={'delete-button'}>
                        <i className={'fas fa-trash-alt'}/>
                    </span>
                    <p className={'order-name'}>{order.name}</p>
                    <div className={'order-count'}>
                        <p className={'order-count'}>{order.count}</p>
                        <span onClick={() => this.props.increaseOrderCount(index)} className={'plus-button'}>
                            <i className={'fas fa-plus-square'}/>
                        </span>
                        <span onClick={() => this.props.decreaseOrderCount(index)} className={'minus-button'}>
                            <i className={'fas fa-minus-square'}/>
                        </span>
                    </div>
                </div>
                <div className={'order-item-note'}>
                    <input value={order.note ? order.note : ''}
                           onChange={e => this.props.setOrderNote(index, e.target.value)}
                           placeholder={'الملاحظات'}/>
                </div>
            </div>;
        })
    }

}