import * as React from "react";

export default class LoadingBox extends React.Component {
    render() {
        return (
            <div style={{padding: '20px 0', textAlign: 'center'}}>
                <div className="dl">
                    <div className="dl__container">
                        <div className="dl__corner--top"/>
                        <div className="dl__corner--bottom"/>
                    </div>
                    <div className="dl__square"/>
                </div>
            </div>
        );
    }
}