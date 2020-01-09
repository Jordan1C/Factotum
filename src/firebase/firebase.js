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

    async FirebaseCreateNewUser(email, password, callback) {
        try {
            await this._auth
                .createUserWithEmailAndPassword(email, password)
                .then(user => callback(user));
        } catch (error) {
            console.error(error);
            console.log('FirebaseCreateNewUser failed', error);
        }
    }

    async FirebaseLoginUser(email, password, callback) {
        try {
            this._auth
                .signInWithEmailAndPassword(email, password)
                .then(user => callback(user));
        } catch (error) {
            console.log('FirebaseLoginUser failed', error);
        }
    }

    async FirebaseLogoutUser(callback) {
        try {
            this._auth.signOut().then(callback);
        } catch (error) {
            console.log('FirebaseLogoutUser failed', error);
        }
    }

    async FirebaseVerifyAuth(callback) {
        try {
            this._auth.onAuthStateChanged(user => callback(user));
        } catch (error) {
            console.log('FirebaseVerifyAuth failed', error);
        }
    }

    async GetAllEvents(callback) {
        try {
            const eventCollection = this._firestore.collection('Events');
            if (eventCollection) {
                await eventCollection.onSnapshot(snapshot => {
                    let container = [];
                    snapshot.forEach(doc => {
                        container.push(doc.data());
                    });
                    return callback(container);
                });
            }
        } catch (error) {
            console.log('GetAllEvents failed', error);
        }
    }

    async GetSingleEvent(event, callback) {
        try {
            const eventRef = this._firestore.collection('Events').doc(event);
            if (eventRef) {
                await eventRef.onSnapshot(snapshot => {
                    let container = [];
                    snapshot.forEach(doc => {
                        container.push(doc.data());
                    });
                    return callback(container);
                });
            }
        } catch (error) {
            console.log('GetSingleEvent failed', error);
        }
    }

    async AddEvent(event, city, startDate, endDate, group, callback) {
        try {
            const eventRef = this._firestore.collection('Events').doc(event);
            const timestamp = firebase.firestore.Timestamp.now().toDate();
            const newEvent = await eventRef.set({
                event,
                city,
                startDate,
                endDate,
                group,
                eventSite: null,
                eventSheet: null,
                updatedAt: timestamp
            });
            await newEvent.update({ id: newEvent.id });
            await newEvent.get().then(doc => callback(doc.data()));
        } catch (error) {
            console.log('AddEvent failed', error);
        }
    }

    async DelEvent(event, callback) {
        try {
            const eventRef = this._firestore.collection('Events').doc(event);
            if (eventRef) {
                return await eventRef.delete().then(callback);
            }
        } catch (error) {
            console.log('DelEvent failed', error);
        }
    }

    async UpdateEventDate(event, startDate, endDate, callback) {
        try {
            const eventRef = this._firestore.collection('Events').doc(event);
            const timestamp = firebase.firestore.Timestamp.now().toDate();
            if (eventRef) {
                // prettier-ignore
                await eventRef.update({
                    "startDate": startDate,
                    "endDate": endDate,
                    "updatedAt": timestamp
                });
                await eventRef.get().then(doc => callback(doc.data()));
            }
        } catch (error) {
            console.log('UpdateEventDate failed', error);
        }
    }

    async AddEventSite(event, siteLink, callback) {
        try {
            const eventRef = this._firestore.collection('Events').doc(event);
            const timestamp = firebase.firestore.Timestamp.now().toDate();
            if (eventRef) {
                // prettier-ignore
                await eventRef.update({
                    "eventSite": siteLink,
                    "updatedAt": timestamp
                });
                await eventRef.get().then(doc => callback(doc.data()));
            }
        } catch (error) {
            console.log('AddEventSite failed', error);
        }
    }

    async AddEventSheet(event, spreadsheet, callback) {
        try {
            const eventRef = this._firestore.collection('Events').doc(event);
            const timestamp = firebase.firestore.Timestamp.now().toDate();
            if (eventRef) {
                // prettier-ignore
                await eventRef.update({
                    "eventSheet": spreadsheet,
                    "updatedAt": timestamp
                });
                await eventRef.get().then(doc => callback(doc.data()));
            }
        } catch (error) {
            console.log('AddEventSheet failed', error);
        }
    }

    async AddAttendeeToList(event, callback) {
        try {
            const user = this._auth.currentUser;
            const attendeeRef = this._firestore
                .collection('Events')
                .doc(event)
                .collection('Attendees')
                .doc(user.displayName);
            await attendeeRef.get().then(async attendee => {
                attendee.exists
                    ? await attendee.delete().then(callback)
                    : await attendee
                          .set({
                              name: user.displayName,
                              id: user.uid,
                              email: user.email
                          })
                          .then(doc => callback(doc.data()));
            });
        } catch (error) {
            console.log('AddAttendeeToList failed', error);
        }
    }

    async RemoveAttendeeFromList(event, callback) {
        try {
            const user = this._auth.currentUser;
            const attendeeRef = this._firestore
                .collection('Events')
                .doc(event)
                .collection('Attendees')
                .doc(user.uid);
        } catch (error) {
            console.log('RemoveAttendeeFromList failed', error);
        }
    }
}
