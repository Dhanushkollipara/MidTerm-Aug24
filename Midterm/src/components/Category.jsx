import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/categories');
        setCategories(response.data.categories);
      } catch (err) {
        setError('Error fetching categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Category name is required'),
    description: Yup.string().required('Category description is required'),
  });

  const handleAddCategory = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/categories', values);
      setCategories([...categories, response.data.category]);
      resetForm();
      alert('Category added successfully!');
    } catch (err) {
      console.error('Error adding category:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/categories/${id}`);
      setCategories(categories.filter(category => category._id !== id));
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Add Categories</h1>
      <Formik
        initialValues={{
          name: '',
          description: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleAddCategory}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Category Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Enter the name of a Category.."
              />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                placeholder="Enter the Description of a Category.."
              />
              <ErrorMessage name="description" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Add Category
            </button>
          </Form>
        )}
      </Formik>

      <h2>Category List</h2>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
