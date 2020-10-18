import React from 'react';

class PokemonList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { pokemonList: [], loadMore: null};
    }

    componentDidMount() {
        this.fetchPokemonList('https://pokemon-academy-api-pbr.herokuapp.com/pokemons/list')
    }

    fetchPokemonList = (url) => {
        fetch(url)
        .then(response => response.json())
        .then(jsonResponse => {
            console.log(jsonResponse);
            const { results, next } = jsonResponse; 
            this.setState({ pokemonList: this.state.pokemonList.concat(results), loadMore: next });
        })
    }

    onLoadMoreButtonClick = () => {
        this.fetchPokemonList(this.state.loadMore);
    }

    renderList = (pokemonList) => {
        return pokemonList.map((pokemon, index) => {
            const { imageUrl, name, level } = pokemon;
            return <tr key={index}>
                <td><img src={imageUrl} /></td>
                <td><p>{name}</p></td>
                <td><p>{level}</p></td>
            </tr>
        })
    }

    renderHeader = () => {
        return <tr>
            <td><p>Image</p></td>
            <td><p>Name</p></td>
            <td><p>Level</p></td>
        </tr>
    }

    render() {
        //window.scrollTo(0, 0)
        return (
            <div>
                <h1>Pokemon List:</h1>
                <table>
                    <thead>{this.renderHeader()}</thead>
                    <tbody>{this.renderList(this.state.pokemonList)}</tbody>
                </table>
                {this.state.loadMore && <button onClick={this.onLoadMoreButtonClick}>Load More</button> }
            </div>
        )
    }
}

export default PokemonList;