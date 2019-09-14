import * as React from "react";
import firebase from "firebase";


interface State {
    downloading: boolean;
    error: any;
}

export default class DownloadMonthlyReport extends React.Component<any, State> {

    constructor(props: any) {
        super(props);
        this.state = {downloading: false, error: false};
    }


    render() {
        if (this.state.error) {
            return <div>
                <h1>هناك مشكلة خلال تحميل البيانات ، يرجى التحقق من الاتصال بالانترنت : </h1>
                <p style={{padding: 16, background: '#EA1'}}>
                    {
                        this.state.error.toString()
                    }
                </p>
            </div>
        }

        return <div style={{textAlign: 'center', width: '100%'}}>
            <button style={{padding: 24, width: 180, display: 'inline-block'}}
                    disabled={this.state.downloading || this.state.error}
                    className={'main-button'} onClick={() => {
                const firestore = firebase.firestore();

                firestore.collection('orders').get()
                    .then(snap => {

                        const orders = snap.docs.map(doc => {
                            return {...doc.data()};
                        });
                        const data = JSON.stringify(orders);
                        localStorage.setItem('monthly-report', data);
                        this.download(data);
                        this.setState({downloading: false, error: false});
                    })
                    .catch(e => this.setState({error: e, downloading: false}));
            }}>
                تحميل التقرير الشهري
            </button>
        </div>
    }

    private download = (data: string) => {
        const a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(new Blob([data], {type: 'text/plain'}));
        a.download = 'report.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    }
}