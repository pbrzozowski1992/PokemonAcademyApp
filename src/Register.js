import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';

const RegisterForm = (props) => {

    const [error, setError] = useState(false);

    let loginRef = null;
    let passwordRef = null;

    const onRegisterButtonClick = (event) => {
        event.preventDefault();
        console.log('login', loginRef.value);
        console.log('password', passwordRef.value);
        const user = {login: loginRef.value, password: passwordRef.value}
        console.log('user', JSON.stringify(user));
        fetch("https://pokemon-academy-api-pbr.herokuapp.com/pokemons/signup", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response=>{
            if(response.status == 200) {
                props.history.push({pathname: '/login'});
            } else {
                throw new Error("User already exists in db!")
            }
            console.log('status', response.status);
        })
        .catch(error=>{
            //komunikat błędu
            console.log('error', error);
            setError(true);
        })

    }

    return( 
        <div>
            <form>
                {error && <p>User already exists in db</p>}
                <p>Login</p>
                <input ref={ref=>{
                    loginRef = ref;
                }}type="text"/>
                <p>Password</p>
                <input ref={ref=>{
                    passwordRef = ref;
                }}type="test"/>
                <button onClick={onRegisterButtonClick}>Register</button>
            </form>
        </div>
    )
}

export default withRouter(RegisterForm);