import React from 'react';

class PokemonList extends React.Component {

    componentDidMount() {
        fetch('https://pokemon-academy-api-pbr.herokuapp.com/pokemons/list')
        .then(response => {
            console.log(response);
        })
    }


    render() {
        return(
            <h1>Pokemon List!</h1>
        )
    }
}

export default PokemonList;