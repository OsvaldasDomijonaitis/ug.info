import express from 'express';
import eventController from '../controllers/EventAPIController';

const router = express.Router();

// -- // -- // -- // -- //

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEvent);
router.get('users/:id', eventController.getUserEvents);

router.post('/', eventController.validateStore(), eventController.storeEvent);
router.put('/:id', eventController.validateUpdate(), eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

export default router;