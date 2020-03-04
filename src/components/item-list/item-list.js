import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner';

import './item-list.css';

function ItemList({
                      getData,
                      onItemSelected,
                      renderItem
                  }) {
    const [itemList, setPeopleList] = useState(null);

    useEffect(() => {
        getData().then(setPeopleList);
    }, [getData]);

    const renderList = () => {
        return itemList.map((item) => {
            const { id } = item;
            return (
                <li className="list-group-item"
                    key={id}
                    onClick={() => onItemSelected(id)}>
                    {renderItem(item)}
                </li>
            );
        });
    };

    if (!itemList) return <Spinner />;

    return (
        <ul className="item-list list-group">
            {renderList()}
        </ul>
    );
}

ItemList.propTypes = {
    getData: PropTypes.func,
    onItemSelected: PropTypes.func,
    renderItem: PropTypes.func
};

export default React.memo(ItemList);
