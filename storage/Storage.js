import React from 'react';
import { AsyncStorage } from 'react-native'

const WANTS_KEY = 'wants'
const FAVOURITES_KEY = 'favourites'

export const fetchWants = async () => {
    try{
        const wants = await AsyncStorage.getItem(WANTS_KEY)
        if(wants !== null && wants !== '{}'){
            return new Map(JSON.parse(wants))
        }
        return new Map()
    } catch (error){
        console.error(error)
    }
    return new Map();
}

export const saveWants = async (wants) => {
    try {
        let str = JSON.stringify([...wants])
        // console.log('str=' + str)
        await AsyncStorage.setItem(WANTS_KEY, str)
    } catch (error) {
        console.error(error)
    }
}

export const fetchFavourites = async () => {
    try{
        const favourites = await AsyncStorage.getItem(FAVOURITES_KEY)
        if(favourites !== null && favourites !== '{}'){
            return new Map(JSON.parse(favourites))
        }
        return new Map()
    } catch (error){
        console.error(error)
    }
    return new Map();
}

export const saveFavourites = async (favourites) => {
    try {
        let str = JSON.stringify([...favourites])
        // console.log('str=' + str)
        await AsyncStorage.setItem(FAVOURITES_KEY, str)
    } catch (error) {
        console.error(error)
    }
}