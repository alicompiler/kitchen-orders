import * as React from "react";

interface Props {
    order: any;
}

export default class OrderItems extends React.Component<Props> {
    render() {
        return <div className={'items'}>
            {
                this.props.order.items.map((item: any, index: number) => {
                    return <div key={index} className={'item'}>
                        <div>
                                <span className={'count'}>
                                    {item.count}
                                </span>
                        </div>
                        <div className={'info'}>
                            <div className={'name'}>{item.name}</div>
                            {
                                item.note && <div className={'note'}>{item.note}</div>
                            }
                        </div>
                    </div>
                })
            }
        </div>
    }
}