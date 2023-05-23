import { baseURL } from "@/config"
import axios from "axios"

export const createProductService = async (name: string, size: string, type:string): Promise<void> => {
    return axios.post(`${baseURL}/products/create`,{
        name,
        size,
        type
    })
}
