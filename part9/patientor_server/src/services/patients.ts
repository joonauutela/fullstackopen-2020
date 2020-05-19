import patientsData from '../../data/patients';

import { PatientsEntry, PatientsPublicEntry, NewPatientEntry } from '../types';

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

const addEntry = (entry: NewPatientEntry): PatientsEntry => {
    // TODO: make a proper id-generator
    const id: string = (Math.random() * 1000).toString();
    const newPatientEntry = {
        id,
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    addEntry,
    getPublicEntries
};