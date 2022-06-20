'use strict';

const EventService = require('../service/events');
const NotFoundError = require('../module/error/notFound.error');

exports.createEvent = async (req, res) => {
  const { type, action, ...body } = req.body;

  if (type !== 'REVIEW') throw new NotFoundError('Does not match type');

  switch (action) {
    case 'ADD':
      return res.send({ result: (await EventService.create(body)) });
    case 'MOD':
      return res.send({ result: (await EventService.update(body)) });
    case 'DELETE':
      return res.send({ result: (await EventService.delete(body)) });
    default:
      throw new NotFoundError('Does not match action');
  }
};
