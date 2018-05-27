const express = require('express');
// merge params allows us to get access to the id inside this router
const router = express.Router({ mergeParams: true });
const {
  createMessage,
  getMessage,
  deleteMessage
} = require('../handlers/messages');

//prefix - /api/users/:id/messages
router.route('/')
  .post(createMessage)
  .get(getMessage)
  .delete(deleteMessage);


module.exports = router;