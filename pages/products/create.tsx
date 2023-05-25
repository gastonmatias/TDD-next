import {  useEffect, useState } from "react"
import { NextPage } from "next"

import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography, TextField, FormControl, InputLabel, Select, Button, FormHelperText } from "@mui/material"

import { createProductService, getProductsService } from "@/services/createProduct";
import { ProductFormData, productSchema } from "@/validators";
import { CREATED_STATUS } from "@/consts/httpStatus";

const CreateProductPage: NextPage = () => {
  
  useEffect(() => {
    getProducts()
  },[]);

  const getProducts = async() => {
    await getProductsService()
  }

  const [errorMessage, setErrorMessage] = useState<string>('');

  //! USE FORM
  const {register, handleSubmit, formState:{errors}} = useForm<ProductFormData>({
    resolver: yupResolver(productSchema),
    mode: "onBlur"
  })

  //! REACT QUERY
  const mutation = useMutation(({name, size, type}:ProductFormData) => (
    createProductService(name, size, type)
    ))
    
    
  //! SUBMIT
  // const onSubmit: SubmitHandler<ProductFormData> = async ({name, size, type}) => {
  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    await mutation.mutate(data,{
      onError(error){
        if(axios.isAxiosError(error) && error?.response?.status === 500){
          setErrorMessage('Unexpected error, please try again')
      } else{
          setErrorMessage('The email or password are not correct')
      }        
      }
    })
  }

  return (
    <>
    <Typography variant="h3" color="initial">Create Product</Typography>
    
      { ( mutation.isError )  
          ? <Typography>{errorMessage}</Typography>
          : null
      }
      
      { ( mutation.data!=undefined && mutation['data']['status'] === 201 )  
          ? <Typography variant="h5">Product Stored successfully!</Typography>
          : null
      }
    
    <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="name"
          label="name"
          helperText={errors.name?.message}
          {...register("name")}
          />

        <TextField
          id="size"
          label="size"
          helperText={errors.size?.message}
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
            >
              <option aria-label="None" value=""></option>
              <option value="electronic">electronic</option>
              <option value="furniture">furniture</option>
              <option value="clothing">clothing</option>
            </Select>
            
            { errors.type?.message && 
              <FormHelperText>{errors.type?.message}</FormHelperText>
            }

            <Button
              type="submit"
              disabled={mutation.isLoading}
              >
                Submit
            </Button>
        </FormControl>

    </form>
    </>
  )
}
export default CreateProductPage