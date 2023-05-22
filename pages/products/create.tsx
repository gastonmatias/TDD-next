import { NextPage } from "next"
import { Typography, TextField, FormControl, InputLabel, Select, Button, FormHelperText } from "@mui/material"
import { FormEvent, HtmlHTMLAttributes, useState } from "react"

const CreateProductPage: NextPage = () => {
  
  const [formErrors, setFormErrors] = useState({
    name:'',
    size:'',
    type:'',
  });

  const handleSubmit = (e:any) => {
    e.preventDefault()

    // const {name, size, type} = e.target.elements as HTMLFormControlsCollection
    // const {name, size, type} = (e.target as HTMLFormElement).elements
    
    // const form = e.currentTarget as HTMLInputElement
    // const form = e.target as HTMLInputElement
    
    // const {name, size, type} = form.elements!
    
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
    
  }
  
  return (
    <>
    <Typography variant="h1" color="initial">Create Product</Typography>
    
    <form onSubmit={handleSubmit}>
        <TextField
          id="name"
          label="name"
          helperText={formErrors.name}
          />

        <TextField
          id="size"
          label="size"
          helperText={formErrors.size}
          />

        <FormControl fullWidth>
            <InputLabel htmlFor="type" id="type">Type</InputLabel>

            <Select
              native //! IMPORTANTE PARA QUE JEST RECONOZCA LOS OPTIONS
              aria-labelledby="type"
              labelId="type"
              id="type"
              label="Type"
              // helperText={formErrors.size}
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

            <Button type="submit">Submit</Button>
        </FormControl>

    </form>
    </>
  )
}
export default CreateProductPage