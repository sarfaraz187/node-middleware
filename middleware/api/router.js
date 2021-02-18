// import createTicket from '../models/model';
const express = require('express');
const router = express.Router();
const models = require('../models/model');

router.post('/ticket_raised', async (req, res) => {
  console.log("Data from FreshService workflow Automator : ", req.body);
  let response = await models.createTicket(req.body);
  console.log({ response });
  res.status(200).end();
});

router.put('/ticket_updated', async (req, res) => {
  let response = await models.updateTicket(req.body);
  console.log({ response });
  res.status(200).end();
});

module.exports = router