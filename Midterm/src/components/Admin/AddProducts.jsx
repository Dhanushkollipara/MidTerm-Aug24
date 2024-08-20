import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Typography, Box, Container, FormHelperText, Switch, FormControlLabel } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function Addproducts() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/categories`)
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        alert("Server is not responding. Please try again later.");
        console.error(error);
      });
  }, []);

  const generateId = () => {
    return uuidv4().substring(0, 6);
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Must be at least 3 characters').max(30, 'Must be at most 30 characters').required("Product name is required"),
    code: Yup.string().required("Product code is required"),
    excerpt: Yup.string().required("Product description is required"),
    category: Yup.string().required("Category is required"),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Price cannot be negative")
      .max(100000, "Price cannot be more than 1 Lakh")
      .positive("Price must be a positive number"),
    stock: Yup.number()
      .required("Stock is required")
      .integer("Stock must be an integer")
      .min(0, "Stock cannot be negative"),
    status: Yup.boolean().required("Status is required"), // Validation for status as boolean
  });

  return (
    <Container>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Product
        </Typography>
        <Formik
          initialValues={{
            name: "",
            code: "",
            excerpt: "",
            category: "",
            price: 0,
            stock: 0,
            status: true, // Default to true (Active)
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // Map status to boolean values
            const productData = {
              ...values,
              status: values.status, // status is already a boolean
            };
            axios
              .post("http://localhost:3000/api/v1/products", productData)
              .then((response) => {
                console.log(response);
                resetForm();
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting, setFieldValue, errors, touched, values }) => (
            <Form>
              <Box sx={{ mb: 2 }}>
                <Field name="name">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Product Name"
                      fullWidth
                      variant="outlined"
                      error={touched.name && Boolean(errors.name)}
                      helperText={<ErrorMessage name="name" />}
                    />
                  )}
                </Field>
              </Box>

              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Field name="code">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Product Code"
                      fullWidth
                      variant="outlined"
                      error={touched.code && Boolean(errors.code)}
                      helperText={<ErrorMessage name="code" />}
                    />
                  )}
                </Field>
                <Button
                  variant="contained"
                  onClick={() => setFieldValue("code", generateId())}
                  sx={{ ml: 2 }}
                >
                  Generate ID
                </Button>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Field name="excerpt">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Description"
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                      error={touched.excerpt && Boolean(errors.excerpt)}
                      helperText={<ErrorMessage name="excerpt" />}
                    />
                  )}
                </Field>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Field name="category">
                  {({ field }) => (
                    <FormControl fullWidth variant="outlined" error={touched.category && Boolean(errors.category)}>
                      <InputLabel>Category</InputLabel>
                      <Select
                        {...field}
                        label="Category"
                        onChange={(event) => setFieldValue("category", event.target.value)}
                      >
                        <MenuItem value="" disabled>Select a category</MenuItem>
                        {categories.map((cat) => (
                          <MenuItem key={cat.id} value={cat._id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText><ErrorMessage name="category" /></FormHelperText>
                    </FormControl>
                  )}
                </Field>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Field name="price">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Price"
                      type="number"
                      fullWidth
                      variant="outlined"
                      error={touched.price && Boolean(errors.price)}
                      helperText={<ErrorMessage name="price" />}
                    />
                  )}
                </Field>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Field name="stock">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Stock"
                      type="number"
                      fullWidth
                      variant="outlined"
                      error={touched.stock && Boolean(errors.stock)}
                      helperText={<ErrorMessage name="stock" />}
                    />
                  )}
                </Field>
              </Box>

              <Box sx={{ mb: 2 }}>
                <FormControl component="fieldset">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.status} // Use boolean for switch
                        onChange={() => setFieldValue("status", !values.status)}
                        color="primary"
                      />
                    }
                    label={values.status ? "Active" : "Inactive"}
                  />
                  <FormHelperText error={touched.status && Boolean(errors.status)}>{<ErrorMessage name="status" />}</FormHelperText>
                </FormControl>
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Submit
              </Button>

              <Button
                onClick={() => { navigate("/adminlogin") }}
                sx={{ ml: 2 }}
              >
                Close
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

export default Addproducts;
