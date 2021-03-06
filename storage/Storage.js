import React from 'react';
import { AsyncStorage } from 'react-native'

const WANTS_KEY = 'wants'
const FAVOURITES_KEY = 'favourites'
const RATINGS_KEY = 'ratings'
const TRIED_KEY = 'tried'
const EXTRA_BEERS = 'extraBeers'

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
        await AsyncStorage.setItem(FAVOURITES_KEY, str)
    } catch (error) {
        console.error(error)
    }
}

export const fetchRatings = async () => {
    try{
        const ratings = await AsyncStorage.getItem(RATINGS_KEY)
        if(ratings !== null && ratings !== '{}'){
            return new Map(JSON.parse(ratings))
        }
        return new Map()
    } catch (error){
        console.error(error)
    }
    return new Map();
}

export const saveRatings = async (ratings) => {
    try {
        let str = JSON.stringify([...ratings])
        await AsyncStorage.setItem(RATINGS_KEY, str)
    } catch (error) {
        console.error(error)
    }
}

export const fetchTried = async () => {
    try{
        const tried = await AsyncStorage.getItem(TRIED_KEY)
        if(tried !== null && tried !== '{}'){
            return new Map(JSON.parse(tried))
        }
        return new Map()
    } catch (error){
        console.error(error)
    }
    return new Map();
}

export const saveTried = async (tried) => {
    try {
        let str = JSON.stringify([...tried])
        await AsyncStorage.setItem(TRIED_KEY, str)
    } catch (error) {
        console.error(error)
    }
}

export const fetchExtraBeers = async () => {
    try{
        const extraBeers = await AsyncStorage.getItem(EXTRA_BEERS)
        if(extraBeers !== null && extraBeers !== '{}'){
            return new Map(JSON.parse(extraBeers))
        }
        return new Map()
    } catch (error){
        console.error(error)
    }
    return new Map();
}

export const saveExtraBeers = async (extraBeers) => {
    try {
        let str = JSON.stringify([...extraBeers])
        // console.log('str=' + str)
        await AsyncStorage.setItem(EXTRA_BEERS, str)
    } catch (error) {
        console.error(error)
    }
}
