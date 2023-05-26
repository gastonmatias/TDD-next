// custom hook para inicializar la api falsa mockeada

import { initMocks } from "@/mocks";
import { useEffect, useState } from "react";

export const initMSW = () => {

    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        loadMocks()
    },[]);
    
    const loadMocks = async() => {
        await initMocks()
        setShouldRender(true)
    }
    
    return shouldRender
}