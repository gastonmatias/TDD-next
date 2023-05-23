import {  ChangeEvent, ChangeEventHandler, ReactEventHandler, SyntheticEvent, useState } from "react"
import { NextPage } from "next"

import { Typography, TextField, FormControl, InputLabel, Select, Button, FormHelperText } from "@mui/material"
import axios from "axios";
import { createProductService } from "@/services/createProduct";
import { HtmlProps } from "next/dist/shared/lib/html-context";

// interface IFormCreate{
//   name: string,
//   size: string,
//   type: string  
// }
interface IFormCreate{
  name: string,
  size: string,
  type: string  
}
interface IValidateField{
  name:  string,
  value: string,
}

const CreateProductPage: NextPage = () => {
  
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [formErrors, setFormErrors] = useState<IFormCreate>({
    name:'',
    size:'',
    type:'',
  });

  const validateField = ({name, value}:IValidateField) => {
    // x la naturaleza asincrona del useState, es necesario utilizar el prevState,
    // para qe la actualizacion del state sea correcta
    setFormErrors((prevState) => (
        { ...prevState, 
          [name]: value.length 
            ? '' // msje para campo valido
            :`The ${name} is required` // msje para campo INvalido
        }
      )
    )
  }

  const validateForm = ({name, size, type}: IFormCreate) => {
    validateField({name:'name', value: name})
    validateField({name:'size', value: size})
    validateField({name:'type', value: type})
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSaving(true)

    const form = e.target.elements as HTMLFormControlsCollection

    const name = form.namedItem('name') as HTMLInputElement;
    const size = form.namedItem('size') as HTMLInputElement;
    const type = form.namedItem('type') as HTMLInputElement;

    validateForm({name:name.value, size:size.value, type:type.value})

    await createProductService('cafe','grande',1)

    setIsSaving(false)
  }

  // event blur se gatilla cuando un elemento ha perdido su foco
  const handleBlur = (e:any) => {
    const {name, value} = e.target
    validateField({name,value})
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