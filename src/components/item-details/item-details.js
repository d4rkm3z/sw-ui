import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import ItemView from '../item-view';

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
        <div className="item-details card">
            {error && <ErrorIndicator />}
            {loading && <Spinner />}
            {!item && !loading && <span>Select a item from a list</span>}
            {hasData && <ItemView item={item}>{children}</ItemView>}
        </div>
    )
}

ItemDetails.propTypes = {
    itemId: PropTypes.string,
    getData: PropTypes.func,
    children: PropTypes.any
};

export default React.memo(ItemDetails);

