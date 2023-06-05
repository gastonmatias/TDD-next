import { NextPage } from "next"
import Typography from '@mui/material/Typography'
import { TextField, Button, Container, Grid, Box } from "@mui/material"
import { useState } from "react";

const GithubSearchPage:NextPage = () => {

    const [isSearching, setIsSearching] = useState(false);

    const handleSearchClick = async () => {
        setIsSearching(true)
        await Promise.resolve()
        setIsSearching(false)
    }

    return (
    <>
    <Container>
        <Typography variant="h2" color="white" sx={{my:3}}>
            Github repositories List
        </Typography>

        <Grid container spacing={2} justifyContent='space-between'>

            <Grid item md={6} xs={12}>
                <TextField 
                    fullWidth id="filterBy" 
                    label="Filter by name" 
                    variant="outlined" 
                />
            </Grid>

            <Grid item md={3} xs={12} sx={{display:'flex'}}>{/* flex para el stretch default */}
                <Button 
                    fullWidth 
                    variant="contained" 
                    color="primary"
                    disabled={isSearching}
                    onClick={handleSearchClick}
                    >
                  Search
                </Button>
            </Grid>
        </Grid>

        <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            height={400}
        >
            <Typography variant="h5" color="gray">
                Please provide a search option and click in the search button
            </Typography>
        </Box>



    </Container>
    </>
  )
}
export default GithubSearchPage