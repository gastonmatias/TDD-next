import { baseURL } from "@/config"
import axios from "axios"

export const createProductService = async (name: string, size: string, type:number): Promise<void> => {
    return axios.post(`${baseURL}/products`,{
        name,
        size,
        type
    })
}
