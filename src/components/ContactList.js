import React from "react";
import { FiTrash2 } from "react-icons/fi";


const ContactList = ({ contacts, onContactDeleted }) => {
  if (!contacts.length) {
    return (
      <div className="text-center text-gray-500 mt-6">
        No contacts available. Add a new contact above.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-white p-5 rounded-xl shadow-md hover:shadow-2xl transition duration-300 relative"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-800">{contact.name}</h3>
            <button
              onClick={() => onContactDeleted(contact._id)}
              className="text-red-500 hover:text-red-700 transition duration-200"
              title="Delete Contact"
            >
              <FiTrash2 />
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-1">
            <span className="font-medium">Email:</span> {contact.email}
          </p>
          <p className="text-gray-600 text-sm mt-1">
            <span className="font-medium">Phone:</span> {contact.phone}
          </p>
          {contact.message && (
            <p className="text-gray-700 text-sm mt-2 border-t pt-2">
              {contact.message}
            </p>
          )}
          <p className="text-gray-400 text-xs mt-3">
            {new Date(contact.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
