import axios from "axios"

const url = "http://localhost:8000/"
export default class back{
    static async getLimitResumes(skip = 0) {
        try{
            const res = await axios.get(url+"resume/"+skip);
            return res.data
        }catch(error){ console.log(error) }
    }
    static async getAllResumes() {
        try{
            const res = await axios.get(url+"resume/");
            return res.data
        }catch(error){ console.log(error) }
    }
}