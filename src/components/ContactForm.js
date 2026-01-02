import React, { useState } from "react";
import { FiUser, FiMail, FiPhone, FiMessageCircle } from "react-icons/fi";
import { API_URL } from "../config";


const ContactForm = ({ onContactAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone must be at least 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      const response = await fetch(API_URL, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newContact = await response.json();
        setFormData({ name: "", email: "", phone: "", message: "" });
        setSuccessMessage("Contact added successfully!");
        onContactAdded(newContact);

        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    /\S+@\S+\.\S+/.test(formData.email);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Contact</h2>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <div className="flex items-center border rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500">
            <FiUser className="text-gray-400 mr-2" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className={`w-full outline-none ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <div className="flex items-center border rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500">
            <FiMail className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className={`w-full outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone *
          </label>
          <div className="flex items-center border rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500">
            <FiPhone className="text-gray-400 mr-2" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className={`w-full outline-none ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <div className="flex items-center border rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500">
            <FiMessageCircle className="text-gray-400 mr-2" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Optional message..."
              className="w-full outline-none resize-none border-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`w-full py-2 px-4 rounded-md font-medium transition duration-200 ${
            isFormValid && !isSubmitting
              ? "bg-blue-600 hover:bg-blue-700 text-white hover:scale-105"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Adding Contact..." : "Add Contact"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
