import React, { Children } from 'react';

import './item-view.css';

export default React.memo(function ItemView({ item, children }) {
    const { name, img } = item;
    return (
        <>
            <img className="item-image"
                 alt="item"
                 src={img}
            />

            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {Children.map(children, child =>
                        React.cloneElement(child, { item })
                    )}
                </ul>
            </div>
        </>
    );
});