import React from 'react';

export const CheckBox = props => {
  return (
    <li className='list-group-item'>
      <input key={props.id} onChange={props.handleCheckChieldElement} type='checkbox' checked={props.isChecked} value={props.title} /> {props.title} - {props['use-by']}
    </li>
  )
}

export default CheckBox;