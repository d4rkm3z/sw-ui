import React, { Children, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './item-details.css';

function ItemDetails({ itemId, getData, children }) {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (itemId) {
            setLoading(true);
            getData(itemId)
                .then((item) => {
                    setItem(item);
                    setLoading(false);
                }).catch(() => {
                    setError(true);
                    setLoading(false);
                }
            );
        }
    }, [itemId, getData]);

    const hasData = !(loading || error) && item;
    return (
        <div className="person-details card">
            {error && <ErrorIndicator />}
            {loading && <Spinner />}
            {!item && !loading && <span>Select a person from a list</span>}
            {hasData && <PersonView item={item}>{children}</PersonView>}
        </div>
    )
}

const PersonView = ({ item, children }) => {
    const { name, img } = item;
    return (
        <>
            <img className="person-image"
                 alt="person"
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
};

export const Record = ({ item, field, label }) => (
    item.hasOwnProperty(field) && <li className="list-group-item">
        <span className="term">{label}</span>
        <span>{item[field]}</span>
    </li>
);

ItemDetails.propTypes = {
    itemId: PropTypes.string,
    getData: PropTypes.func,
    children: PropTypes.any
};

export default React.memo(ItemDetails);

