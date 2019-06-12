import * as React from "react";

interface Props {
    order: any;
}

export default class OrderActions extends React.Component<Props> {
    render() {
        return <div className={'actions'}>
            <div style={{display: 'flex', marginBottom: 12}}>
                <button className={'main-button'}
                        style={{margin: '0 6px', background: '#F0F3BD', color: '#454545'}}>جاري العمل
                </button>
                <button className={'main-button'} style={{margin: '0 6px'}}>اكتمل</button>
                <button className={'main-button'} style={{margin: '0 6px', background: '#BA3D50'}}>رفض</button>
            </div>
            <input placeholder={'ملاحظة'} className={'main-input'}/>
        </div>
    }
}