import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import firebase from 'firebase/app'
import md5 from 'md5'
import { setUserSessionID } from './../../redux/actions';
import uid from 'uid'

const Session = () => {
    const userSession = useSelector(state => state.isUserSession);
    const dispatch = useDispatch();
    const [session, setSession] = useState()
    const db = firebase.firestore();
    const awaitUserThenWrite = async (session) => {
        await userSession;
        db.collection('users').add({
            sessionid: session
        })
    }
    const awaitUserUpdateSession = async () => {
        await userSession;
        const usersRef = db.collection("users")
        await usersRef.where("sessionid", "==", userSession)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    console.log(doc.id, " => ", doc.data());
                    setSession(doc.id)
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

    }

  
    useEffect(() => {
        if (!userSession) {
            let session = md5(uid())
            dispatch(setUserSessionID(session))
            awaitUserThenWrite(session);
        }
        if (userSession) {
            awaitUserUpdateSession();
        }
  
    }, []);

    return <></>

}

export default Session



// window.onbeforeunload = async function () {
    //     const sfDocRef = db.collection("users").doc(session)
    //     return db.runTransaction(async function (transaction) {
    //         return transaction.get(sfDocRef).then(function (sfDoc) {
    //             if (!sfDoc.exists) {
    //                 throw "Document does not exist!";
    //             }
    //             let newStatus = sfDoc.data().online = !sfDoc.data().online;
    //             transaction.update(sfDocRef, { online: newStatus });
    //         });
    //     }).then(function () {
    //         console.log("Transaction successfully committed!");
    //     }).catch(function (error) {
    //         console.log("Transaction failed: ", error);
    //     });

    // }