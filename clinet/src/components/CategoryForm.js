import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Cookies from 'js-cookie';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from "react";
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';


const InitialForm = {
  amount: 0,
  description: '',
  date: new Date(),
  category_id: '',
};

export default function CategoryForm({ fetchTransactions, editTransaction }) {
  const { categories } = useSelector((state) => state.auth.user);
  const token = Cookies.get('token');
  const [form, setForm] = useState(InitialForm);


  React.useEffect(() => {
    if (editCategory.amount !== undefined) {
      setForm(editCategory);
    }
  }, [editCategory]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleDate(newValue) {
    setForm({ ...form, date: newValue })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = editCategory.amount === undefined ? create() : update();

  }

  function reload(res) {
    if (res.ok) {
      setForm(InitialForm);
      fetchTransactions();
    }
  }

  async function create() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        'content-type': "application/json",
        'Authorization': `Bearer ${token}`,
      },
    });
    reload(res);
  }

  async function update() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction/${editCategory._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(form),
        headers: {
          'content-type': "application/json",
          'Authorization': `Bearer ${token}`,
        }
      });
    reload(res);
  }

  function getCategoryNameById() {
    return (categories.find((category) => category._id === form.category_id) ?? ""
    );
  }

  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Typography variant="h6">Add new Category</Typography>

        <Box component='form' onSubmit={handleSubmit} sx={{ display: "flex" }}>
          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Label"
            size="small"
            name="label"
            variant="outlined"
            value={form.label}
            onChange={handleChange}
          />
          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Description"
            size="small"
            name="description"
            variant="outlined"
            value={form.description}
            onChange={handleChange}
          />

          <Autocomplete
            value={getCategoryNameById()}
            onChange={(event, newValue) => {
              setForm({ ...form, icon: newValue });
            }}
            id="icons"
            options={icons}
            sx={{ width: 200, marginRight: 5 }}
            renderInput={(params) => <TextField {...params} size="small" label="Icon" />}
          />

          {editCategory.amount !== undefined && (
            <Button type="submit" variant="secondary">Update</Button>
          )}
          {editCategory.amount === undefined && (
            <Button type="submit" variant="contained">Submit</Button>
          )}

        </Box>

      </CardContent>
    </Card>
  );
}