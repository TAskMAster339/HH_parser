import axios from "axios"

const url = "http://localhost:8000/"
export default class back{
    static async getAllResumes() {
        try{
            const res = await axios.get(url+"resume/");
            return res.data
        }catch(error){ console.log(error) }
    }
    static async getAllVacancies() {
        try{
            const res = await axios.get(url+"vacancy/");
            return res.data
        }catch(error){ console.log(error) }
    }
}