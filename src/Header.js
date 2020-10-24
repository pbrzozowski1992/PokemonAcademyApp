import React from 'react';
import logProps from './logProps';

const Header = (props) => {
    return <h1>{props.title}</h1>
}

export default logProps(Header);