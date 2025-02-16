import { DATA_COOKIES_KEY } from '@/constants';
import { getPersistedDataFromCookies, persistDataInCookies, deletePersistedDataFromCookies } from '@/utils/cookies';
import { useEffect, useState } from 'react';

export const useHandleCookiesData = (currentKey) => { //"hasWitnesses"

    const [incidentId, setIncidentId] = useState(null);
    const [nextStep, setNextStep] = useState(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const data = getPersistedDataFromCookies(DATA_COOKIES_KEY);
        if (!data) return;
        const updatedData = {
            ...data,
            [currentKey]: null
        }
        const isLastStep = Object.values(data).every((value) => value === null);
        if (!isLastStep) {
            persistDataInCookies(DATA_COOKIES_KEY, updatedData);
        } else {
            deletePersistedDataFromCookies(DATA_COOKIES_KEY);
        }
        const nextStep = isLastStep ? null : Object.keys(data).find((key) => data[key] !== null);
        const incidentId = data?.incidentId;
        setIncidentId(incidentId);
        setNextStep(nextStep);
    }, []);
    return {
        incidentId,
        nextStep,
    };
};
