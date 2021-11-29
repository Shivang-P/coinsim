import React, {useState} from 'react'
import {useAuth} from '../contexts/AuthContext'
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faHome, faSearch } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
    const { logout } = useAuth()
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

    function goToSearch() {
        navigate('/search')
    }

    function goToDashboard() {
        navigate('/')
    }

    return (
        <div class="navbar m-3 shadow-lg bg-base-300 text-neutral-content rounded-box">
            {error && <div className=" mx-3 mb-3 alert alert-error">{error}</div>}
            <div class="flex-1 px-2 mx-2">
                <span class="text-xl font-bold">
                        CoinSim
                </span>
            </div> 
            <div class="flex-none">
                <button class="btn btn-square btn-ghost" onClick={goToDashboard}>
                    <FontAwesomeIcon icon={faHome} size='lg'/>
                </button>
            </div> 
            <div class="flex-none">
                <button class="btn btn-square btn-ghost" onClick={goToSearch}>
                    <FontAwesomeIcon icon={faSearch} size='lg'/>
                </button>
            </div> 
            <div class="flex-none">
                <button class="btn btn-square btn-ghost" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} size='lg'/>
                </button>
            </div>
        </div>
    )
}

export default Navbar
