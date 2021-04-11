import axios from 'axios'

export const getSituation = async () => {
    try {
        return await axios.get('https://covid19.th-stat.com/api/open/today')
    } catch (error) {
        throw error
    }
}

export const getTraffy = async () => {
    try {
        return await axios.get('https://covid19.traffy.in.th/api/state-covid19')
    } catch (error) {
        throw error
    }
}