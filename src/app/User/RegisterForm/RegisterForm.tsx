import * as React from "react";
import firebase from "./../../Bootstrap/Firebase";
import HorizontalLoader from "../../SharedComponent/HorizontalLoader/HorizontalLoader";
import {Link} from "react-router-dom";

interface Props {
    onUpdate: (user: any) => void;
}

interface State {
    name: string;
    place: string;
    sending: boolean;
}

export default class RegisterForm extends React.Component<Props, State> {
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
                this.setState({name: data.name, place: data.place});
            }
        });
    }

    render() {
        return <div style={{width: '100%', padding: 16}}>
            <Link to={"/"} style={{display: 'block', marginBottom: 24}}>
                <i style={{fontSize: '2.2em', color: '#05668D'}} className={'fas fa-home'}/>
            </Link>
            <div className={'user-info-form'}>
                <input autoComplete={'off'} placeholder={"الاسم"} name={"name"} value={this.state.name}
                       onChange={e => this.setState({name: e.target.value})}/>
                <input autoComplete={'off'} placeholder={"المكان"} name={"place"} value={this.state.place}
                       onChange={e => this.setState({place: e.target.value})}/>
                <button className={this.state.sending ? 'disabled' : ''} onClick={this.send}>حفظ</button>
                {
                    this.state.sending && <HorizontalLoader width={130} paddingTop={24} paddingBottom={24}/>
                }
            </div>
        </div>
    }

    private send = () => {
        this.setState({sending: true});
        const db = firebase.firestore();
        const user: any = firebase.auth().currentUser;
        const data = {name: this.state.name, place: this.state.place};
        db.collection("users").doc(user.uid).set(data)
            .then(() => {
                this.setState({sending: false});
                this.props.onUpdate(user);
            }).catch(() => {
            this.setState({sending: false});
        });
    }
}