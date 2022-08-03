import React, { useState } from "react"

export default function Auth(props) {

    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ login, setLogin ] = useState(true)

    const isLogin = () => {
        return !login ? "Signup" : "Login"
    }

    const isSignup = () => {
        return login ? "Signup": "Login"
    }

    const toggleLogin = (e) => {
        e.preventDefault()
        setLogin(!login)
        setName("")
        setEmail("")
        setUsername("")
        setPassword("")
    }

    const handleSubmit = e => {
        e.preventDefault()

        let requestBody = login ? {
            username: username,
            password: password
        } : {
            name: name,
            email: email,
            username: username,
            password: password
        }

        let url = login ? 
            "http://localhost:4000/api/auth/login" :
            "http://localhost:4000/api/auth/register"
        
        fetch(url, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        .then(res => res.json())
        .then(data => {props.updateLocalStorage(data.token); console.log(data)})
        .catch(err => console.log(err))
    }

    const signup = () => !login ? (
        <>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
            </div>
        </>
    ) : null

    return (
        <div>
            <h1>{isLogin()}</h1>
            <form className="formWrapper" action="">
                {signup()}
                <div className="username">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                </div>
                
                <div className="password">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                </div>
                <button onClick={toggleLogin}>{isSignup()}</button>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )


}