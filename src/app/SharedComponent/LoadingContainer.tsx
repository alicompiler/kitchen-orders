import * as React from "react";

interface Props {
    message: string;
}

export default class LoadingContainer extends React.Component<Props> {
    render() {
        const style: any = {
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
        };
        return <div className="loading-container" style={style}>
            <img alt={""} src={'/images/loading.gif'} style={{width: 96, height: 96}}/>
            <h3>{this.props.message}</h3>
        </div>
    }
}