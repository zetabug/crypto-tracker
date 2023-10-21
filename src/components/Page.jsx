import { Stack } from '@mui/material'
import React from 'react'

const PageComponent = ({currentPage,setCurrentPage}) => {
  return (
    <Stack direction="row" justifyContent={'center'} gap={2} alignItems={'center'} marginBottom={5}>
        <button onClick={()=>{if(currentPage===0){return};setCurrentPage(currentPage=>currentPage-1)}}>Previous</button>
        <span>{currentPage+1}</span>
        <button onClick={()=>setCurrentPage(currentPage=>currentPage+1)}>Next</button>
    </Stack>
  )
}

export default PageComponent