import './index.scss'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import firebase from 'firebase/app'
import { setRecentSearches } from '../../redux/actions'
import { uniqueEntry } from '../../helpers/uniqueEntry'

const RecentSearches = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([])
    const db = firebase.firestore();
    const usersRef = db.collection("recentsearches")
    const recentSearches = useSelector(state => state.isRecentSearches)

    const getRecentSearches = () => {
        try {

            usersRef.get().then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                dispatch(setRecentSearches(uniqueEntry(data)));
            });

        } catch (e) {
            console.error(e)
        } finally {

        }

    }

    useEffect(() => {
        getRecentSearches()
    }, []);

    return (
        <div className="search-container" >
            {recentSearches && recentSearches.map((item, i) => {
                console.log(item)
                if (item.user) {
                    return <div className="search-entry" key={i}><a href={`/?player=${item.userOne}&player=${item.userTwo}`}><small>{item.userOne} & {item.userTwo}</small></a></div>
                }
            })}
        </div>
    );
}

export default RecentSearches;
