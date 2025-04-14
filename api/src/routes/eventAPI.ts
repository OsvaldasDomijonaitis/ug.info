import express from 'express';
import eventController from '../controllers/EventAPIController';

const router = express.Router();

// -- // -- // -- // -- //

router.get('/events', eventController.getAllEvents);
router.get('/events/:id', eventController.getEvent);
router.get('/user/:id/events', eventController.getUserEvents);

router.post('/events', eventController.validateStore(), eventController.storeEvent);
router.put('/events/:id', eventController.validateUpdate(), eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);

export default router;