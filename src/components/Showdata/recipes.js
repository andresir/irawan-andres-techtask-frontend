import React from 'react';

export const Recipes = props => {
  return (
    <li className='list-group-item'>
      √ {props.title}
    </li>
  )
}

export default Recipes;