import { useState, createContext, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from "next/router"

let UserContext = createContext()

let UserProvider = ({ children }) => {

    const router = useRouter()
    
    let [state, setState] = useState({
        user: {},
        token: ""
    })

    //to set the user and token 
    useEffect(() => {
        setState(JSON.parse(localStorage.getItem('auth')))
    }, [])

    //for backend
    // set tokens and base url in the context
    let token = state && state.token ? state.token : ''
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    //if token is expired
    axios.interceptors.response.use(response => response, error => {
        let res = error.response
        // console.log('res>>>', res)
        if(res.status === 401 && res.config && !res.config.__isRetryRequest) {
            setState(null)
            localStorage.removeItem('auth')
            router.push('/Login')
        }
        return Promise.reject(error)
    })
    return (
        <UserContext.Provider value={[state, setState]}>
            { children }
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }

// context used to update the state of the app