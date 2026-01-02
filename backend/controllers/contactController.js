const Contact = require('../models/Contact');

// Get all contacts
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new contact
const createContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        
        const contact = new Contact({
            name,
            email,
            phone,
            message
        });

        const savedContact = await contact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete contact (bonus feature)
const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        await Contact.findByIdAndDelete(id);
        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getContacts,
    createContact,
    deleteContact
};
