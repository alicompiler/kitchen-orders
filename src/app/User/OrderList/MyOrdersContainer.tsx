import OrdersContainer from "../../SharedComponent/OrdersList/OrdersContainer";
import firebase from "../../Bootstrap/Firebase";


export default class MyOrdersContainer extends OrdersContainer {
    protected getFirestoreQuery() {
        const db = firebase.firestore();
        const user = firebase.auth().currentUser as any;
        return db.collection("orders")
            .orderBy("time", "desc")
            .where("userId", "==", user.uid);
    }

}