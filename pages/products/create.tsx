import { NextPage } from "next"
import { Typography, TextField, FormControl, InputLabel, Select } from "@mui/material"

const CreateProductPage: NextPage = () => {
  return (
    <>
    <Typography variant="h1" color="initial">Create Product</Typography>
    
    <form>
        <TextField
          id="name"
          label="name"
        />

        <TextField
          id="size"
          label="size"
        />

        <FormControl fullWidth>
            <InputLabel htmlFor="type" id="type">Type</InputLabel>

            <Select
              native //! IMPORTANTE PARA QUE JEST RECONOZCA LOS OPTIONS
              aria-labelledby="type"
              labelId="type"
              role="type-select"
              id="type"
            //   value=''
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


        </FormControl>

    </form>
    </>
  )
}
export default CreateProductPage