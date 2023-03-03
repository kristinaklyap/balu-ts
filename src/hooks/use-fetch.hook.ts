import {useEffect, useState} from "react";
import {makeRequest} from "./../helpers/make-request";

const useFetch = <T>(url:string) => {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await makeRequest.get(url)
                setData(response.data.data)
            } catch (err) {
                setError(true)
            }
            setLoading(false)
        }
        fetchData();
        return () => {}
    }, [url])
    return { data, isLoading, isError } ;
}
export default useFetch
