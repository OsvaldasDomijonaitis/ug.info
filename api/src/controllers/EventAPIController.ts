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
        const event = await prismaDb.event.findFirst(
            {
              where: { id: Number(req.params.id) }
            }
        );
      
        if (!event) {
            res.status(404).json('Renginys nerastas');
            
            return;
        };

        res.status(200).json(event);
    } catch {
        res.status(500).json('Serverio klaida');
    }
}

// naujo renginio sukūrimas
async function storeEvent(req: Request, res: Response) {
    try {
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
            res.status(400).json(validation.array());
            return;
        }

        const data = matchedData(req);

        const existing = await prismaDb.event.findFirst({
            where: { slug: data.slug }
        });

        if (existing) {
            res.status(400).json('Renginys su tokiu slug jau egzistuoja');
            return;
        }

        const event = await prismaDb.event.create({
            data: {
                userId: Number(data.userId),
                slug: data.slug,
                name: data.name,
                date: new Date(data.date),
                place: data.place,
                description: data.description,
                img: data.img || null,
                status: Number(data.status) || 2
            }
        });

        res.status(201).json({
            message: 'Renginys sukurtas',
            id: event.id
        });
    } catch {
        res.status(500).json('Serverio klaida');
    }
}

// renginio atnaujinimas
async function updateEvent(req: Request, res: Response) {
    try {
        const event = await prismaDb.event.findFirst({
            where: { id: Number(req.params.id) }
        });
      
        if (!event) {
            res.status(404).json('Renginys nerastas');
            return;
        }
      
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
            res.status(400).json(validation.array());
            return;
        }
      
        const data = matchedData(req);

        if (data.slug && data.slug !== event.slug) {
            const slugExists = await prismaDb.event.findFirst({
                where: { slug: data.slug }
        });
      
            if (slugExists) {
                res.status(400).json('Slug jau naudojamas kitam renginiui');
                return;
            }
        }
      
        const updated = await prismaDb.event.update({
            where: { id: event.id },
            data: {
                userId: Number(data.userId) || event.userId,
                slug: data.slug || event.slug,
                name: data.name || event.name,
                date: data.date ? new Date(data.date) : event.date,
                place: data.place || event.place,
                description: data.description || event.description,
                img: data.img ?? event.img,
                status: typeof data.status !== 'undefined' ? Number(data.status) : event.status
            }
        });
      
        res.status(200).json({
            message: 'Renginys atnaujintas',
            id: updated.id
        });
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
    body('name').trim().notEmpty().withMessage('Pavadinimas yra privalomas').escape(),
    body('date').notEmpty().withMessage('Data yra privaloma').isDate().withMessage('Neteisinga data'),
    body('place').trim().notEmpty().withMessage('Vieta yra privaloma').escape(),
    body('description').trim().notEmpty().withMessage('Aprašymas yra privalomas').escape(),
    body('img').trim().optional().isURL().withMessage('Neteisingas paveikslėlio URL')
];

// atnaujinimo validacija
const validateUpdate = () => [
    ...validateStore(),
    body('status').trim().isInt().withMessage('Būsenos numeris yra privalomas')
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