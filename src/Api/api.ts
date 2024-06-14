// src/Api/api.ts
import axios from 'axios'
import { useEffect, useState } from 'react'

const apiClient = axios.create({
    baseURL: 'http://memory.beltaria.fr/api'
});

export default function useApi<T>(path: string) {
    const [data, setData] = useState<any>()
    const [error, setError] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MTgzNzc3MjgsImV4cCI6MTcxODM4MTMyOCwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFkbWluQG1lbW9yeWFwaS5jb20ifQ.TDLAu00YqG07IWSxFOeU_hjIDkhQ6PqZW7JRgxKTwQfDo_9j5eo5GWqJVkL13wA8HaGSZsg6o8sqO-baIhOnDYxV2emTp9HqYPgHWdl71BkuMnTiVRah-tNY0Y1hz_JV3Qu4ZsVh1vSS6AEgwcbIIiXi0hyS-6yi0ZhDAXVPO56p6foAZKd6C95nRo7H_W1YZWDwZS5wcHK2oSZmTmf0kul7wwVhQQlrzTXzV7KJTZvgSZs7cFn9L5vNJQkCGN8XJps4Em798IIxQ_J3U-yobgNM1nuzQEpBdQ70DpoiDRdu8IPsedo4UyjxyB_XssrvTvqbN8unG0AgRuHmVgGrakdbp2w4sKqcAggIIIL3Xx0joOte2tM4r3nyFFSgSpxI-e2UmGFxaBjGPIOfkRZ_-v9p6SekzN9qtBlEsbJww_DyTRKSk_l0R6YuH5a8p73GV4oLB2QLWTEmkcTeLFbRuerHpKmPzJV00iNLik3Vwx-98FQigD-n6p2C5eQPGp5GfeJUvtbu7FlEKQynMlwpRFDgZSoGhdv8JZojztUYTbphQijls63f8_2P69_ON4k5n1fiD1wKfWUHythPUACtAAg2m-FIDLKB2iE2x5FwmQLtE1rAH2kXeNwnKRdZ3no5eC5tZm705oeSLm7zLJvI0HMabbE3j0HtTjmx_G0ICks';
            localStorage.setItem('jwt', jwt);
            const token = localStorage.getItem('jwt');
            if (!token) {
                console.error('JWT not found in localStorage');
                return;
            }
            apiClient.get<T>(path, {
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
