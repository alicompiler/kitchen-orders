import * as React from "react";
import UserAppHeader from "../UserAppHeader";

interface Props {
}

export default class Main extends React.Component<Props> {

    render() {
        const buttonStyle = {
            width: 120,
            background: '#777',
            padding: 16,
            border: 0,
            borderRadius: 120,
            margin: 8
        };
        return (
            <div>
                <UserAppHeader/>
                <br/><br/>
                <div className={'tabs'} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <button style={buttonStyle}>MY ORDERS</button>
                    <button style={buttonStyle}>NEW ORDER</button>
                </div>
            </div>
        )
    }

}