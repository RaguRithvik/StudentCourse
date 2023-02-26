import React, { useContext, useState } from 'react'
import CounterContext from './Context';

export const Login = () => {
    const { user, setUser } = useContext(CounterContext);
    const [userDetails, setUserDetails] = useState(user)

    const handleOnchange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }
    const handleOnsubmit = (e) => {
        e.preventDefault()
        setUser(() => { return { ...userDetails, isLogged: true } })
    }
    return (
        <>
            {user.isLogged && user.name === "admin" ? `Hello ${user.name} you have succefully logged` : <>
                <form onSubmit={handleOnsubmit}>
                    <input type="text" required name='name' onChange={handleOnchange} placeholder="Enter UserName" /><br /><br />
                    <input type="password" required name='password' onChange={handleOnchange} placeholder="Enter Password" /><br /><br />
                    <button type='submit'>Login</button>
                </form>
                <p>{user.name !== "admin" && user.isLogged ? "Please Check UserName and Password" : ""}</p>
            </>}
            <hr />
            <p>Footer</p>
        </>


    )
}
