import * as React from "react";
import firebase from "./../../Bootstrap/Firebase";

interface State {
    name: string;
    place: string;
    sending: boolean;
}

export default class RegisterForm extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {name: '', place: '', sending: false};
    }

    componentDidMount(): void {
        const db = firebase.firestore();
        const user: any = firebase.auth().currentUser;
        db.collection("users").doc(user.uid).get().then(doc => {
            if (doc.exists) {
                const data = doc.data()!;
                this.setState({name : data.name , place : data.place});
            }
        });
    }

    render() {
        return <div>
            <input placeholder={"الاسم"} name={"name"} value={this.state.name}
                   onChange={e => this.setState({name: e.target.value})}/>
            <input placeholder={"المكان"} name={"place"} value={this.state.place}
                   onChange={e => this.setState({place: e.target.value})}/>
            {
                this.state.sending &&
                <h1>Sending</h1>
            }
            <button onClick={this.send}>حفظ</button>
        </div>
    }

    private send = () => {
        const db = firebase.firestore();
        const user: any = firebase.auth().currentUser;
        db.collection("users").doc(user.uid).set({
            name: this.state.name,
            place: this.state.place
        }).then(() => {
            //TODO : success message
            console.log('succeed to save');
            this.setState({sending: false})
        }).catch(() => {
            //TODO : error message
            console.log('fail to save');
            this.setState({sending: false});
        });
    }
}