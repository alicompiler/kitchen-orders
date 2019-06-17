import OrdersContainer from "../../SharedComponent/OrdersList/OrdersContainer";
import firebase from "../../Bootstrap/Firebase";
import OrderStatus from "../../SharedComponent/OrdersList/OrderStatus";


export default class OnProgressOrdersContainer extends OrdersContainer {
    protected getFirestoreQuery() {
        const db = firebase.firestore();
        return db.collection("orders")
        .where("status", "==", OrderStatus.ON_PROGRESS)
        .orderBy("time", "desc");
    }
}