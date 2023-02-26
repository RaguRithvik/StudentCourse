import React, { useContext } from 'react'
import CounterContext from './Context';
export const Header = () => {
    const { user, setUser } = useContext(CounterContext);
    const handleOnsubmit = () => {
        setUser({ name: "", password: "", isLogged: false })
    }
    return (
        <>
            <span>Header</span>
            <span style={{ marginLeft: "200px" }}>
                {
                    user.name === "admin" && user.isLogged ? <>Hello {user.name}  <button onClick={handleOnsubmit}>Logout</button></> : "Welocme to Login Page"
                }
            </span>
            <br />
            <hr />
        </>

    )
}
