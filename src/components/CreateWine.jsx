import React, { useEffect, useState } from "react"

const CreateWine = props => {

    const [ wineName, setWineName ] = useState("")

    const postWine = e => {
        e.preventDefault()

        let url = "http://localhost:4000/api/wines"

        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                wineName
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": props.sessionToken
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    return (
        <h1>Create Wine rendered</h1>
    )
}

export default CreateWine