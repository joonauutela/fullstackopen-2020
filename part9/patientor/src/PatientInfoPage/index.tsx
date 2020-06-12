import React from "react";
import { Container } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { useStateValue } from "../state";
import { apiBaseUrl } from '../constants';
import axios from 'axios';

const PatientListPage: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const [{ patientInfo }, dispatch] = useStateValue();

    React.useEffect(() => {
        const fetchPatientList = async () => {
            try {

                const { data: patientFromApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch({ type: "SET_PATIENT", payload: patientFromApi });
            } catch (e) {
                console.error(e);
            }
        };
        fetchPatientList();
    }, [dispatch]);

    if (!patientInfo) {
        return (
            <div className="App">
                <Container textAlign="center">
                    <h3>No patient found</h3>
                </Container>
            </div>
        );
    }
    return (
        <div className="App">
            <Container textAlign="center">
                <h3>{patientInfo.name}</h3>
                <p>gender: {patientInfo.gender}</p>
                <p>ssn: {patientInfo.ssn}</p>
                <p>occupation: {patientInfo.occupation}</p>
            </Container>
        </div>
    );
};

export default PatientListPage;
