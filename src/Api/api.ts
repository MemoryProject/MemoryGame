// src/Api/api.ts
import axios from 'axios'
import { useEffect, useState } from 'react'

axios.defaults.baseURL = 'https://memory.beltaria.fr/api'

export default function useApi<T extends any []>(path: string) {
    const [data, setData] = useState<any[]>([])
    const [error, setError] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MTg2MzgxOTYsImV4cCI6MTcxODY0MTc5Niwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFkbWluQG1lbW9yeWFwaS5jb20ifQ.D3hya0ATlamTL0xKwW7LQRAdEu3TLS155QZeFo6bH0ocmZg0CXd3Qop0LMeKvYewkPpcGuGJtX-2ka609uVPxXsV4xPXrFgcsf3RBFwlAe1gsU0ofgWUImtAr8wUJMlfLVfM33qzLNdfFZJsBHthFtVLLfXNTnaF3nwSCLpxiK8ri6maq2rs2wdl-Ci-7qvSz3ZID-PXasd54KVXJL6pCVVxcXkw2rBI1F0jjYfRpnpVGuNE7cg2hNPDJ_Ppz7eCNAFbK4dkyv4EdkiVTzb2u35Op24rKxsLSwBDTImCzahEVkW5I0BztwftOew6iz4wziSn5asCA0lELT5Ajpoyu0NLenHjq7MnYvZ9vHoTIrOu6YMwJarfYP-VjoczIPPmXg5V1FSrPV0_MAcrVe5gQnDIqD5dOTMPKGdwRFcqD0zrXTG6flNRLsEwZlo4LlsnJ81_dzTMH9nQvO0QUl6dN2bbSDpGLc4n84ldWbZ9yCqE9FG8gdX-e0o1D8dHJm-e1xkH5SRFiukiiXArPLGtZK29xY7-5qiPWjIUjmWvbgefftsrBSkJvHYIwfRFR7wA2B4JZjZnOCwVzLEpk9E9hWNQ7ZcSOtukdEqjcfjMJVKa3cZDGGVGlhtH7YxugH3HJeZc0SA4LisYOu0OzWSLE1eBHxuxqCpWGp5Lc4xaKC0';
            localStorage.setItem('jwt', jwt);
            const token = localStorage.getItem('jwt');
            if (!token) {
                console.error('JWT not found in localStorage');
                return;
            }
            axios.get<T>(path, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setData(response.data)
                }).catch((error) => {
                console.error(error)
                setError(error)
            })
        }
        fetchData()
    }, [])
    return {
        data,
        error
    }
}
