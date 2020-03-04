import React from 'react';

export const Record = ({ item, field, label }) => (
    item.hasOwnProperty(field) && <li className="list-group-item">
        <span className="term">{label}</span>
        <span>{item[field]}</span>
    </li>
);