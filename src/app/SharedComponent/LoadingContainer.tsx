import * as React from "react";

export default class LoadingContainer extends React.Component {
    render() {
        const style: any = {
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
        };
        return <div style={style}>
            <img alt={""} src={'/images/loading.gif'} style={{width: 96, height: 96}}/>
            <h3>جاري تحميل البيانات...</h3>
        </div>
    }
}