import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from "react";
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/auth.js';


const InitialForm = {
  label: '',
  icon: '',
};
const icons = [ "User" ];

export default function CategoryForm({ fetchTransactions, editCategory }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()
  const token = Cookies.get('token');
  const [form, setForm] = useState(InitialForm);


  React.useEffect(() => {
    if (editCategory._id !== undefined) {
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
    const res = editCategory._id === undefined ? create() : update();

  }

  function reload(res) {
    if (res.ok) {
      const _user = {
        ...user,
        categories: [...user.categories,{...form}],
    };
    dispatch(setUser(_user));
      setForm(InitialForm);
    }
  }

  async function create() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/category`, {
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
    const res = await fetch(`${process.env.REACT_APP_API_URL}/category/${editCategory._id}`,
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
    return (user.categories.find((category) => category._id === form.category_id) ?? ""
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

          {editCategory._id !== undefined && (
            <Button type="submit" variant="secondary">Update</Button>
          )}
          {editCategory._id === undefined && (
            <Button type="submit" variant="contained">Submit</Button>
          )}

        </Box>

      </CardContent>
    </Card>
  );
}