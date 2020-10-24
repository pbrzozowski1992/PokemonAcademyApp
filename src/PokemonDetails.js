import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom'

const PokemonDetails = (props) => {

    const [pokemonDetails, setPokemonDetails] = useState(null);

    useEffect(()=>{
        const name = props.match.params.name;
        fetch(`https://pokemon-academy-api-pbr.herokuapp.com/pokemons/${name}`)
        .then(response => response.json())
        .then(jsonResponse => {
            console.log(jsonResponse);
            setPokemonDetails(jsonResponse);
        })
    }, [])

    const onBackButtonClick = () => {
        props.history.goBack();
    }

    const renderPokemon = () => {
        const { imageUrl, name, types, abilities, height, weight } = pokemonDetails;
        return (
            <div>
                <h3>{`name: ${name}`}</h3>
                <h3>{`types: ${types}`}</h3>
                <h3>{`abilities: ${abilities}`}</h3>
                <h3>{`height: ${height}`}</h3>
                <h3>{`weight: ${weight}`}</h3>
                <img src={imageUrl}/>
            </div>
        )
    }

    return (
        <div>
            <h1>Pokemon details</h1>
            {/* renderujemy szczegóły jeśli state pokemon details istnieje */}
            {pokemonDetails && renderPokemon()}
            {/* renderujemy napis ładowania jeśli state pokemon details nie istnieje */}
            {!pokemonDetails && <h2>Loading details</h2>}
            <button onClick={onBackButtonClick}>Back to list</button>
        </div>
    )
}

export default withRouter(PokemonDetails);
