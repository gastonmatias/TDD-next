import { NextPage } from "next"
import Typography from '@mui/material/Typography'
import { TextField } from "@mui/material"

const GithubSearchPage:NextPage = () => {
  return (
    <>
    <Typography variant="h1" color="initial">
        Github repositories List
    </Typography>

    <TextField id="filterBy" label="Filter by name" variant="outlined" />
    

    </>
  )
}
export default GithubSearchPage