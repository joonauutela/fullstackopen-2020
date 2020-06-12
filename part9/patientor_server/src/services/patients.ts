import patientsData from '../../data/patients';

import { Patient, PublicPatient, NewPatientEntry } from '../types';

const patients: Array<Patient> = patientsData;

const getEntries = (): Patient[] => {
    return patients;
};

const getEntry = (id: string) => {
    return patients.find(patient => patient.id === id);
};

const getPublicEntries = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addEntry = (entry: NewPatientEntry): Patient => {
    // TODO: make a proper id-generator
    const id: string = (Math.random() * 1000).toString();
    const newPatientEntry = {
        id,
        ...entry,
        entries: []
    };
    patients.push(newPatientEntry);
    console.log(patients);
    return newPatientEntry;
};

export default {
    getEntries,
    addEntry,
    getPublicEntries,
    getEntry
};