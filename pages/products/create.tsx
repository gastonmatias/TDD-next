import {  ChangeEvent, ChangeEventHandler, ReactEventHandler, SyntheticEvent, useState } from "react"
import { NextPage } from "next"

import { Typography, TextField, FormControl, InputLabel, Select, Button, FormHelperText } from "@mui/material"
import axios from "axios";
import { createProductService } from "@/services/createProduct";
import { HtmlProps } from "next/dist/shared/lib/html-context";
import { SubmitHandler, useForm } from "react-hook-form";

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

  const {register, handleSubmit, formState:{errors}} = useForm()

  const [name, setName] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [type, setType] = useState<string>('');

  const onSubmit: SubmitHandler<any> = async (data) => {
    
    setIsSaving(true)

    console.log(data);
    const {name, size, type} = data
    // await createProductService('cafe','grande','1')
    await createProductService(name, size, type)

    setIsSaving(false)
  }
  
  // event blur se gatilla cuando un elemento ha perdido su foco
  const handleBlur = (e:any) => {
    const {name, value} = e.target
  }
  
  return (
    <>
    <Typography variant="h1" color="initial">Create Product</Typography>
    
    <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="name"
          label="name"
          // name="name"
          // helperText={formErrors.name}
          helperText={formErrors.name}
          // onBlur={handleBlur}
          {...register("name")}
          />

        <TextField
          id="size"
          label="size"
          // name="size"
          helperText={formErrors.size}
          // onBlur={handleBlur}
          {...register("size")}
          />

        <FormControl fullWidth>
            <InputLabel htmlFor="type" id="type">Type</InputLabel>

            <Select
              native //! IMPORTANTE PARA QUE JEST RECONOZCA LOS OPTIONS
              aria-labelledby="type"
              labelId="type"
              id="type"
              label="Type"
              {...register("type")}
              inputProps={{
                name: 'type',
                id:'type',
                "data-testid": 'type-select'
              }}
              // onChange={}
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