import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

export class FirebaseWrapper {
    constructor() {
        this.initialized = false;
        this._firebaseInstance = null;
        this._firebaseWrapperInstance = null;
        this._firestore = null;
        this._auth = null;
    }

    Initialize(config) {
        if (!this.initialized) {
            this._firebaseInstance = firebase.initializeApp(config);
            this._firestore = firebase.firestore();
            this._auth = firebase.auth();
            this.initialized = true;
        } else {
            console.log('already initialized');
        }
    }

    static GetInstance() {
        if (null == this._firebaseWrapperInstance) {
            this._firebaseWrapperInstance = new FirebaseWrapper();
        }
        return this._firebaseWrapperInstance;
    }
}
