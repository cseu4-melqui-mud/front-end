import React from 'react'
import Game from "./game"
import SignInSide from "./signUpRegister"

let token = localStorage.getItem("token")

export const GameAndSignIn = () => {
    return (
        <div>
            {token ? <Game /> : <SignInSide />}
        </div>
    )
}

export default GameAndSignIn