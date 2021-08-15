import React from 'react';

export default function Square(props) {
  return (
    <td>
      <button className="square"
        onClick={props.onClick}
        onContextMenu={props.onClick}>
        {props.value}
      </button>
    </td>
    )
}
