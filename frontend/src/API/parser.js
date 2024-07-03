import axios from "axios"

const url = "http://localhost:8000/"
export default class parser{
    static async parseResume(data) {
        try{
            const res = await axios.post(url+"parser/resume",{...data})
            return res.data
        }catch(error){ console.log(error) }
    }
    static async parseVacancy(data) {
        try{
            const res = await axios.post(url+"parser/vacancy",{...data})
            return res.data
        }catch(error){ console.log(error) }
    }
    static async getAreaData() {
        try{
            const res = await axios.get("https://api.hh.ru/areas")
            return res.data
        }catch(error){ console.log(error) }
    }
}