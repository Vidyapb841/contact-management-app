import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import { FiPlusCircle, FiList, FiTrash2, FiDatabase } from "react-icons/fi";
import { API_URL } from "./config"; // Use your deployed backend

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(API_URL); // Use deployed backend URL
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactAdded = (newContact) => {
    setContacts((prev) => [newContact, ...prev]);
  };

  const handleContactDeleted = async (deletedId) => {
    try {
      await fetch(`${API_URL}/${deletedId}`, { method: "DELETE" });
      setContacts((prev) => prev.filter((contact) => contact._id !== deletedId));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-2">
            Contact Management System
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your contacts efficiently
          </p>
        </header>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-2xl transition duration-300 flex items-center space-x-3">
            <FiPlusCircle className="text-blue-600 text-3xl" />
            <div>
              <h3 className="font-semibold text-gray-800">Add Contacts</h3>
              <p className="text-gray-500 text-sm">
                Quickly add new contacts with validation.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-2xl transition duration-300 flex items-center space-x-3">
            <FiList className="text-green-500 text-3xl" />
            <div>
              <h3 className="font-semibold text-gray-800">View Contacts</h3>
              <p className="text-gray-500 text-sm">
                Real-time contact list display without page reload.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-2xl transition duration-300 flex items-center space-x-3">
            <FiTrash2 className="text-red-500 text-3xl" />
            <div>
              <h3 className="font-semibold text-gray-800">Delete Contacts</h3>
              <p className="text-gray-500 text-sm">
                Remove unwanted contacts easily with a click.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-2xl transition duration-300 flex items-center space-x-3">
            <FiDatabase className="text-purple-600 text-3xl" />
            <div>
              <h3 className="font-semibold text-gray-800">Persistent Data</h3>
              <p className="text-gray-500 text-sm">
                All contacts stored in MongoDB for reliability.
              </p>
            </div>
          </div>
        </div>

        {/* Form & List */}
        <div className="grid grid-cols-1 gap-8 mb-10">
          <ContactForm onContactAdded={handleContactAdded} />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Contacts</h2>
        <ContactList contacts={contacts} onContactDeleted={handleContactDeleted} />
      </div>
    </div>
  );
}

export default App;
