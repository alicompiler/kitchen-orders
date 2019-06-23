import * as React from "react";
import LoadingBox from "./LoadingBox";

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
            <LoadingBox/>
            <h3>{this.props.message}</h3>

            <h3 style={{marginTop: 35, color: '#565656'}}>POWERED BY : Sindbad</h3>
        </div>
    }
}