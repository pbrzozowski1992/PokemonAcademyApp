import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom'


const PokemonList = (props) => {

    const [pokemonList, setPokemonList] = useState([]);
    const [next, setNext] = useState(null);
    const [prev, setPrev] = useState(null);


    useEffect(()=>{
        fetchPokemonList('https://pokemon-academy-api-pbr.herokuapp.com/pokemons/list')
    }, [])

    const fetchPokemonList = (url) => {
        fetch(url)
        .then(response => response.json())
        .then(jsonResponse => {
            console.log(jsonResponse);
            const { results, next, prev } = jsonResponse; 
            setPokemonList(results);
            setNext(next);
            setPrev(prev);
        })
    }

    const onNextButtonClick = () => {
        fetchPokemonList(next);
    }

    const onPrevButtonClick = () => {
        fetchPokemonList(prev);
    }

    const onItemClick = (name) => {
        props.history.push({pathname: `/pokemon/${name}`});
    }

    const renderList = (pokemonList) => {
        return pokemonList.map((pokemon, index) => {
            const { imageUrl, name, level } = pokemon;
            const itemClick = onItemClick.bind(this, name);
            return <tr onClick={itemClick} key={index}>
                <td><img src={imageUrl} /></td>
                <td><p>{name}</p></td>
                <td><p>{level}</p></td>
            </tr>
        })
    }

    const renderHeader = () => {
        return <tr>
            <td><p>Image</p></td>
            <td><p>Name</p></td>
            <td><p>Level</p></td>
        </tr>
    }

    window.scrollTo(0, 0)
    return (
        <div>
            <h1>Pokemon List:</h1>
            {prev && <button onClick={onPrevButtonClick}>Prev</button>}
            {next && <button onClick={onNextButtonClick}>Next</button> }
            <table>
                <thead>{renderHeader()}</thead>
                <tbody>{renderList(pokemonList)}</tbody>
            </table>
            {prev && <button onClick={onPrevButtonClick}>Prev</button>}
            {next && <button onClick={onNextButtonClick}>Next</button> }
        </div>
    )
}

export default withRouter(PokemonList);