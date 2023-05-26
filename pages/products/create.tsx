import {  useEffect, useState } from "react"
import { NextPage } from "next"

import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography, TextField, FormControl, InputLabel, Select, Button, FormHelperText } from "@mui/material"

import { createProductService, getProductsService } from "@/services/createProduct";
import { ProductFormData, productSchema } from "@/validators";
import { CREATED_STATUS, INTERNAL_ERROR_STATUS } from "@/consts/httpStatus";

const CreateProductPage: NextPage = () => {
  
  useEffect(() => {
    getProducts()
  },[]);

  
  const getProducts = async() => {
    await getProductsService()
  }
  
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  //! USE FORM
  const {register, handleSubmit, reset, formState, formState:{errors}} = useForm<ProductFormData>({
    resolver: yupResolver(productSchema),
    mode: "onBlur"
  })
  
  useEffect(() => {
    if (formState.isSubmitSuccessful && mutation.isSuccess) {
      reset()
    }
  }, [formState, reset]);

  //! REACT QUERY
  const mutation = useMutation(({name, size, type}:ProductFormData) => (
    createProductService(name, size, type)
    ))
    
    
  //! SUBMIT
  // const onSubmit: SubmitHandler<ProductFormData> = async ({name, size, type}) => {
  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    await mutation.mutate(data,{
      onError(error){
        if(axios.isAxiosError(error) && error?.response?.status === INTERNAL_ERROR_STATUS){
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
      
      { ( mutation.data!=undefined && mutation['data']['status'] === CREATED_STATUS )  
          ? <Typography variant="h5">Product Stored successfully!</Typography>
          : null
      }
    
    <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="name"
          label="name"
          helperText={errors.name?.message}
          disabled={mutation.isLoading}
          {...register("name")}
          />

        <TextField
          id="size"
          label="size"
          helperText={errors.size?.message}
          disabled={mutation.isLoading}
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
              disabled={mutation.isLoading}
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