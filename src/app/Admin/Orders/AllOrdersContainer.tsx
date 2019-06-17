import OrdersContainer from "./../../SharedComponent/OrdersList/OrdersContainer";
import firebase from "./../../Bootstrap/Firebase";


export default class AllOrdersContainer extends OrdersContainer {

    protected getFirestoreQuery() : any{
        const db = firebase.firestore();
        return db.collection("orders")
            .orderBy("time", "desc")
            .limit(50);
    }

}