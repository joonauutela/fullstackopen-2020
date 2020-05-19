import patientsData from '../../data/patients';

import { PatientsEntry, PatientsPublicEntry } from '../types';

const patients: Array<PatientsEntry> = patientsData;

const getEntries = (): PatientsEntry[] => {
    return patients;
};

const getPublicEntries = (): PatientsPublicEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addEntry = () => {
    return null;
};

export default {
    getEntries,
    addEntry,
    getPublicEntries
};