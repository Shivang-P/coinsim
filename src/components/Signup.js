import React, { useRef, useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'



export default function Signup() {
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const passwordConfirmRef = useRef('')
    const {signup} = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return  setError('Passwords do not match!')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch {
            setError('Failed to create account')
        }

        setLoading(false)
    }

    return (
        <>
        <div className="hero min-h-screen bg-base-200">
        <div className="flex-col justify-center hero-content lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="mb-5 text-5xl font-bold">
            Welcome to 
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">CoinSim</h1>
            </h1> 
          </div> 
          <div className="card flex-shrink-0 w-full max-w-sm shadow-lg bg-base-100">
                <form className="card-body" onSubmit={handleSubmit}>
                    <h1 className="card-title text-3xl text-bold text-center">Sign Up</h1>
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
                    <div className="form-control" id="passwordConfirm">
                            <label className="label">
                                <span className="label-text">
                                    Password Confirmation
                                </span>
                            </label>
                            <input className="input input-bordered" type="password" ref={passwordConfirmRef} required />
                    </div>
                    <button disabled={loading} className="btn btn-primary mt-6" type="submit">Submit</button>
                    <div className="text-center mt-3">
                        Already have an account? <Link to="/login">Log In Here!</Link>
                    </div>
                </form>
                {error && <div className=" mx-3 mb-3 alert alert-error">{error}</div>}
            </div>
        </div>
        </div>   
        </>
    )
}
