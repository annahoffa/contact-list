import { TextField } from '@mui/material'
import React from 'react'

interface IProps {
  value: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar = ({ value, handleChange }: IProps) => (
  <TextField
    id='outlined-searchbox'
    label='Searchbox'
    variant='outlined'
    value={value}
    onChange={handleChange}
    fullWidth
  />
)

export default SearchBar
