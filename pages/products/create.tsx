import {  useState } from "react"
import { NextPage } from "next"

import { Typography, TextField, FormControl, InputLabel, Select, Button, FormHelperText } from "@mui/material"
import { baseURL } from "@/config";
import axios from "axios";
import { createProductService } from "@/services/createProduct";

const CreateProductPage: NextPage = () => {
  
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [formErrors, setFormErrors] = useState({
    name:'',
    size:'',
    type:'',
  });

  const handleSubmit = async (e:any) => {
    e.preventDefault()

    setIsSaving(true)

    const {name, size, type} = e.target.elements
    
    // x la naturaleza asincrona del useState, es necesario utilizar el prevState,
    // para qe la actualizacion del state sea correcta
    if (!name.value) {
      setFormErrors((prevState) => (
          { ...prevState, name: "The name is required" }
        )
      )
    }
    
    if (!size.value) {
      setFormErrors((prevState) => (
          { ...prevState, size: "The size is required" }
        )
      )
    }
    
    if (!type.value) {
      setFormErrors((prevState) => (
          { ...prevState, type: "The type is required" }
        )
      )
    }

    await createProductService('cafe','grande',1)

    // await fetch(`${baseURL}/products`, {
    //   method: 'POST',
    //   body: JSON.stringify({})
    // })

    setIsSaving(false)
  }

  // event blur se gatilla cuando un elemento ha perdido su foco
  const handleBlur = (e:any) => {
    const {name, value} = e.target
    setFormErrors({
      ...formErrors, 
      [name]:value.length ? '' : `The ${name} is required`
    })
  }
  
  return (
    <>
    <Typography variant="h1" color="initial">Create Product</Typography>
    
    <form onSubmit={handleSubmit}>
        <TextField
          id="name"
          label="name"
          name="name"
          helperText={formErrors.name}
          onBlur={handleBlur}
          />

        <TextField
          id="size"
          label="size"
          name="size"
          helperText={formErrors.size}
          onBlur={handleBlur}
          />

        <FormControl fullWidth>
            <InputLabel htmlFor="type" id="type">Type</InputLabel>

            <Select
              native //! IMPORTANTE PARA QUE JEST RECONOZCA LOS OPTIONS
              aria-labelledby="type"
              labelId="type"
              id="type"
              label="Type"
              inputProps={{
                name: 'type',
                id:'type',
                "data-testid": 'type-select'
              }}
            >
              <option aria-label="None" value=""></option>
              <option value="electronic">electronic</option>
              <option value="furniture">furniture</option>
              <option value="clothing">clothing</option>
            </Select>
            
            { formErrors.type && 
              <FormHelperText>{formErrors.type}</FormHelperText>
            }

            <Button
              type="submit"
              disabled={isSaving}
              >
                Submit
            </Button>
        </FormControl>

    </form>
    </>
  )
}
export default CreateProductPage