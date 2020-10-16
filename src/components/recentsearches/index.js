import './index.scss'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import firebase from 'firebase/app'
import { setRecentSearches } from '../../redux/actions'
import { uniqueEntry } from '../../helpers/uniqueEntry'

const RecentSearches = () => {
    const dispatch = useDispatch();
    const db = firebase.firestore();
    const usersRef = db.collection("recentsearches")
    const recentSearches = useSelector(state => state.isRecentSearches)
    const userSession = useSelector(state => state.isUserSession);
    const getRecentSearches = () => {
        try {

            usersRef.get().then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                dispatch(setRecentSearches(data));
            });

        } catch (e) {
            console.error(e)
        } finally {
            // console.log(recentSearches.user.findIndex(userSession))
            // recentSearches.findIndex(function(element){
            //     if (element.user === userSession)
            //     {
            //         element.findIndex(userOne)
            //         console.log(element.userOne, element.userTwo)
            //     }
            //     return console.log()

            // })


            // const arr = recentSearches;
            // const u = uniqueEntry(recentSearches)
            // console.log(u, recentSearches)

            // console.log(Object.values(recentSearches))
            // if (Object.values(recentSearches.user) === userSession) {
            //     console.log(Object.values(recentSearches))
            // }
            // console.log(typeof recentSearches)


      
            
        }

    }

    useEffect(() => {
        getRecentSearches()
    }, []);

    return (
        <div className="search-container" >


            {recentSearches && recentSearches.map((item, i) => {
                if (item.user) {
                    return <div className="search-entry" key={i}><a href={`/?player=${item.userOne}&player=${item.userTwo}`}><small>{item.userOne} & {item.userTwo}</small></a></div>
                }
            })}
        </div>
    );
}

export default RecentSearches;
