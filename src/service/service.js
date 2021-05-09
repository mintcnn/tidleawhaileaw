import axios from 'axios'

export const getSituation = async () => {
    try {
        return await axios.get('https://covid19.th-stat.com/api/open/today')
    } catch (error) {
        throw error
    }
}
