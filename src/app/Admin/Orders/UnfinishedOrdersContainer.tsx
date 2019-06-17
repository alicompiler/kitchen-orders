import OrdersContainer from "../../SharedComponent/OrdersList/OrdersContainer";
import firebase from "../../Bootstrap/Firebase";


export default class UnfinishedOrdersContainer extends OrdersContainer {
    protected getFirestoreQuery() {
        const db = firebase.firestore();
        return db.collection("orders")
            .where("status", ">", 0)
            .where("status", "<", 100)
            .orderBy("status")
            .orderBy("time", "desc");
    }
}