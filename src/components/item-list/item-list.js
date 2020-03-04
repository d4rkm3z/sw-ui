import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner';

import './item-list.css';

function ItemList({
                      getData,
                      onItemSelected,
                      children
                  }) {
    const [itemsList, setItemsList] = useState(null);

    useEffect(() => {
        getData().then(setItemsList);
    }, [getData]);

    if (!itemsList) return <Spinner />;

    return (
        <ul className="item-list list-group">
            {itemsList.map((item) => {
                const { id } = item;
                return (
                    <li className="list-group-item"
                        key={id}
                        onClick={() => onItemSelected(id)}
                    >
                        {children(item)}
                    </li>
                );
            })}
        </ul>
    );
}

ItemList.propTypes = {
    getData: PropTypes.func,
    onItemSelected: PropTypes.func,
    children: PropTypes.any
};

export default React.memo(ItemList);
