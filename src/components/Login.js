import React, { useRef, useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import {Link, useNavigate} from 'react-router-dom'



export default function Login() {
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const {login} = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch {
            setError('Failed to sign in.')
        }

        setLoading(false)
    }

    return (
        <>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-lg bg-base-100">
                <form className="card-body" onSubmit={handleSubmit}>
                    <h1 className="card-title text-3xl text-bold text-center">Login</h1>
                    <div className="form-control" id="email">
                        <label className="label">
                            <span className="label-text">
                                Email
                            </span>
                        </label>
                        <input className="input input-bordered" type="email" ref={emailRef} required />
                    </div>
                    <div className="form-control" id="password">
                            <label className="label">
                                <span className="label-text">
                                    Password
                                </span>
                            </label>
                            <input className="input input-bordered" type="password" ref={passwordRef} required />
                    </div>
                    <button disabled={loading} className="btn btn-primary mt-6" type="submit">Login</button>
                    <div className="text-center mt-3">
                        Need an account? <Link to="/signup">Sign Up Here!</Link>
                    </div>
                </form>
                {error && <div className=" mx-3 mb-3 alert alert-error">{error}</div>}
            </div>
        </>
    )
}

