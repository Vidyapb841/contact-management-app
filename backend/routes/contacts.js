const express = require('express');
const { getContacts, createContact, deleteContact } = require('../controllers/contactController');

const router = express.Router();

// GET /api/contacts
router.get('/', getContacts);

// POST /api/contacts
router.post('/', createContact);

// DELETE /api/contacts/:id
router.delete('/:id', deleteContact);

module.exports = router;
