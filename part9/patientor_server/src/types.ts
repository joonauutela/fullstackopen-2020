export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

type Gender = 'male' | 'female' | 'other';

export interface PatientsEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type PatientsPublicEntry = Omit<PatientsEntry, 'ssn'>;
export type NewPatientEntry = Omit<PatientsEntry, 'id'>;

export enum GenderOptions {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}