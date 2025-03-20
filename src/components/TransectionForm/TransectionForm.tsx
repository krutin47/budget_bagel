import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/AxiosInstance';
import { Categories, Transection } from '../../types/transection';

import './TransectionForm.css'

type TransectionProps = {
  onSubmit: (data: Transection) => void
}

const TransectionForm = ({ onSubmit }: TransectionProps) => {
  
  const [categories, setCategories] = useState<Categories[]>([])
  const [formData, setFormData] = useState<Transection>({category: "", date: "", description: "", amount: 0, currency: "USD", color: ""})

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/getcategories');
        const data: Categories[] = await response.data;
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.date || !formData.description || formData.amount <= 0) {
      alert("Please fill in all fields correctly.");
      return;
    }
    onSubmit(formData);
    setFormData({ category: "", color: "", date: "", description: "", amount: 0, currency: "USD" });
  };
  
  const handleCategoryChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const selcetedCategory = categories.find(cat => cat.name === e.target.value)
    setFormData(prevState => ({
      ...prevState,
      category: selcetedCategory?.name || "",
      color: selcetedCategory?.color || "",
    }))
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };
  
  return (
    <div className="transaction-form-container">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label>Category</label>
        <select name="category" value={formData.category} onChange={handleCategoryChange} required>
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat.name} style={{ color: cat.color }}>
              {cat.name}
            </option>
          ))}
        </select>

        <label>Date</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />

        <label>Description</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} required />

        <label>Amount</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />

        <label>Currency</label>
        <select name="currency" value={formData.currency} onChange={handleChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
          <option value="GBP">GBP</option>
        </select>

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default TransectionForm