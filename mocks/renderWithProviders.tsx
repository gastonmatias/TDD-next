// componente que servirá para renderizar los componentes a testear con jest (children ui),
// Englobando el proveedor de react-query para el testeo de API

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render } from "@testing-library/react"
import { ReactNode } from "react"

export const renderWithProviders = (ui: ReactNode) => {

    const queryClient = new QueryClient()

    queryClient.clear() // resetea cache, util para ambiente testing

    render (
      
      <QueryClientProvider client={queryClient}>
        {ui}
      </QueryClientProvider>
    )
}

// nota: 
// react-query almacena en cache los request a API repetitivas,
// cosa qe es contraproducente en ambiente testing.
// para evitar que suceda eso se debe usar el metodo clear de queryClient