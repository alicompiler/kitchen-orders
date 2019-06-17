import firebase from "./../../Bootstrap/Firebase";
import OrderStatus from "../../SharedComponent/OrdersList/OrderStatus";

export default class OrderStateManager {


    public cancel(orderId: any, onComplete?: () => void, onError?: (error:any) => void) {
        const db = firebase.firestore();
        db.collection("orders").doc(orderId)
            .delete()
            .then(() => onComplete && onComplete())
            .catch((error:any) => onError && onError(error))
    }

    public onProgress(orderId: any, onComplete?: () => void, onError?: (error: any) => void) {
        this.updateData(orderId, {status: OrderStatus.ON_PROGRESS} , onComplete , onError);
    }

    public done(orderId: any, onComplete?: () => void, onError?: (error: any) => void) {
        this.updateData(orderId, {status: OrderStatus.DONE} , onComplete , onError);
    }

    public reject(orderId: any, note?: string, onComplete?: () => void, onError?: (error: any) => void) {
        const data: any = {
            status: OrderStatus.REJECTED
        };
        if (note) {
            data["note"] = note;
        }
        this.updateData(orderId, data, onComplete, onError);
    }

    private updateData(orderId: any, data: any, onComplete?: () => void, onError?: (error: any) => void) {
        const db = firebase.firestore();
        db.collection("orders").doc(orderId)
            .update(data)
            .then(() => onComplete && onComplete())
            .catch((error:any) => onError && onError(error))
    };


}