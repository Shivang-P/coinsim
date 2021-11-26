import React, {useRef} from 'react'

export default function Signup() {
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const passwordConfirmRef = useRef('')
    return (
        <>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <h1 className="card-title text-center">Sign Up</h1>
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
                            <input className="input input-bordered" type="passwordConfirm" ref={passwordConfirmRef} required />
                    </div>
                    <button className="btn btn-primary mt-6" type="submit">Submit</button>
                    <div className="text-center mt-3">
                        Already have an account? Log in here!
                    </div>
                </div>
            </div>
        </>
    )
}
