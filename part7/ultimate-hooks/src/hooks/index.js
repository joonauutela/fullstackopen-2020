import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useResource = (url) => {
    const [resources, setResources] = useState([])

    // ...
    useEffect(() => {
        axios.get(url).then(response =>
            setResources(response.data))
    }, [])

    const create = async (resource) => {
        const response = await axios.post(url, resource)
        const newResources = resources.concat(response.data)
        setResources(newResources)
        return response.data
    }

    const service = {
        create
    }

    return [
        resources, service
    ]
}
