import React, {useState} from 'react'
import {useAuth} from '../contexts/AuthContext'
import {useNavigate} from 'react-router-dom'


function Dashboard() {
    const {currentUser, logout} = useAuth()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate("/login")
        } catch {
            setError('Failed to log out.')
        }
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default Dashboard
