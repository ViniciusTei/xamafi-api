
export class DataService {
    
    public Firebase: any;
    
    constructor() {
        this.Firebase = {
            apiKey: "AIzaSyDsnWi-c1njM-Bjs2204mzueNnBLt8ilR8",
            authDomain: "xamafi-8e37a.firebaseapp.com",
            projectId: "xamafi-8e37a",
            storageBucket: "xamafi-8e37a.appspot.com",
            messagingSenderId: "318493703716",
            appId: "1:318493703716:web:adc3d7175feb74df9f62b1",
            measurementId: "G-H0G72RMTNZ"
        }
    }
    
    public async addUser(email: string, nome: string){
        var db = this.Firebase.firestore()
        
        return await db.collection("users").get()
    }
}