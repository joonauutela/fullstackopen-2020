import express from 'express';
import patientsService from '../services/patients';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, _res) => {
    _res.send(patientsService.getPublicEntries());
});

router.post('/', (req, res) => {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientsService.addEntry(newPatientEntry);
    res.json(addedEntry);
});

export default router;