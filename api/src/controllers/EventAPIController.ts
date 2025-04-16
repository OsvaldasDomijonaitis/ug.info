import { Request, Response } from "express";
import { body, validationResult, matchedData } from 'express-validator';

import bcrypt from 'bcrypt';

import { Prisma } from '@prisma/client';
import prismaDb from '../app';

// -- // -- // -- // -- //

// visų renginių gavimas
async function getAllEvents(_: Request, res: Response) {
    try {
        const events = await prismaDb.event.findMany({
            where: { status: 1 }, // aktyvūs renginiai
            orderBy: { date: 'asc' },
        });
    
        res.status(200).json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json('Serverio klaida');
    }
}

// vartojo renginių gavimas
async function getUserEvents(req: Request, res: Response) {
    try {
        const events = await prismaDb.event.findMany({
            where: { status: 1, userId: parseInt(req.params.userId) },
            orderBy: { date: 'asc' },
        });
        res.status(200).json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json('Serverio klaida');
    }
}

// vieno renginio gavimas
async function getEvent(req: Request, res: Response) {
    try {
        res.status(200).json();
    } catch {
        res.status(500).json('Serverio klaida');
    }
}

// naujo renginio sukūrimas
async function storeEvent(req: Request, res: Response) {
    try {
        
    } catch {
        res.status(500).json('Serverio klaida');
    }
}

// renginio atnaujinimas
async function updateEvent(req: Request, res: Response) {
    try {
        
    } catch {
        res.status(500).json('Serverio klaida');
    }
}

// renginio ištrynimas
async function deleteEvent(req: Request, res: Response) {
    try {
        res.status(200).json({ message: 'Renginys ištrintas' });
    } catch {
        res.status(500).json('Serverio klaida');
    }
}

// validacija
const validateStore = () => [
    body('title').notEmpty().withMessage('Pavadinimas privalomas'),
    body('date').notEmpty().withMessage('Data privaloma'),
];

// atnaujinimo validacija
const validateUpdate = () => [
    body('title').optional(),
    body('date').optional(),
];

export default {
    getAllEvents,
    getUserEvents,
    getEvent,
    storeEvent,
    updateEvent,
    deleteEvent,
    validateStore,
    validateUpdate,
};