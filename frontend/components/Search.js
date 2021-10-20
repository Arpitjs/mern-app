import { useContext, useState, useEffect } from "react"
import { UserContext } from "../context/index"
import axios from 'axios'
import People from '../components/cards/People'
import { toast } from 'react-toastify'

const Search = () => {
    let [state] = useContext(UserContext)
    let [query, setQuery] = useState('')
    let [result, setResult] = useState([])

    let searchUser = async e => {
        e.preventDefault()
        try {
            let { data } = await axios.get(`/users/search?query=${query}`)
            setResult(data)
        } catch (e) {
            toast.warning('no result found.')
        }
    }

    let handleFollow = async user => {
        try {
            let { data } = await axios.get(`/users/search?query=${query}`)
            setResult(data)
        } catch (e) {
            toast.warning('no result found.')
        }
    }
    let handleUnfollow = async user => {
        try {
            let { data } = await axios.get(`/users/search?query=${query}`)
            setResult(data)
        } catch (e) {
            toast.warning('no result found.')
        }
    }
    return (
        <>
            <form className="form-inline row"
                onSubmit={e => searchUser(e)}>
                <div className="col-8">
                    <input type="text" placeholder="Search"
                        onChange={(e) => {
                            setQuery(e.target.value)
                            setResult([])
                        }}
                        value={query} className="form-control"
                    />
                </div>
                <div className="col-4">
                    <button
                        className="btn btn-outline-primary col-12"
                        type="submit">Search</button>
                </div>
            </form>
            {result && result.length ? result.map(p => <People key={p._id} 
            people={result} 
            handleFollow={handleFollow} handleUnfollow={handleUnfollow}
            />) : ''}
        </>
    )
}

export default Search
