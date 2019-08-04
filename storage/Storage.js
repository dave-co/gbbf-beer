import React from 'react';
import { AsyncStorage } from 'react-native'

const WANTS_KEY = 'wants'

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