import React from 'react';

class PokemonDetails extends React.Component {
    render() {
        return(
            <div>
        <h1> {this.props.match.params.name} </h1>
        </div>
        )
    }
}

export default PokemonDetails