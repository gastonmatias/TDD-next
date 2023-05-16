// componente que servirá para renderizar los componentes a testear con jest (children ui),
// Englobando el proveedor de react-query para el testeo de API

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render } from "@testing-library/react"
import { ReactNode } from "react"

export const renderWithProviders = (ui: ReactNode) => {

    const queryClient = new QueryClient()

    render (
      
      <QueryClientProvider client={queryClient}>
        {ui}
      </QueryClientProvider>
    )
}