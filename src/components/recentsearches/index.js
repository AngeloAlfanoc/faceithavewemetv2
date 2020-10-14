import './index.scss'

import React, { useEffect, useState } from 'react';

import firebase from 'firebase/app'

const RecentSearches = () => {
    const [items, setItems] = useState()
    const db = firebase.firestore();
    const usersRef = db.collection("recentsearches")
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (!isLoaded) {
            usersRef.get().then((snapshot) => {
                setItems(snapshot.docs.forEach(doc => {
                    setItems(doc.data())
                    console.log(items)
                }))
            })
                setIsLoaded(true)
        
        }
     
    }, [items]);

    return (
        <div >
             {/* {items.map((item, i)=> {
                return <div>{item.userOne}</div>
             }) */}
            
        
        </div>
    );
}

export default RecentSearches;
