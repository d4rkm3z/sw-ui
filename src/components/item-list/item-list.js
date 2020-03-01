import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SwapiService from '../../services/SwapiService';

import './item-list.css';
import Spinner from '../spinner';

const service = new SwapiService();

function ItemList({
                      onItemSelected
                  }) {
    const [peopleList, setPeopleList] = useState(null);

    useEffect(() => {
        service.getAllPeople().then(setPeopleList);
    }, []);

    const renderList = () => {
        return peopleList.map(({ id, name }) =>
            <li className="list-group-item"
                key={id}
                onClick={() => onItemSelected(id)}>
                {name}
            </li>
        );
    };

    if (!peopleList) return <Spinner />;

    return (
        <ul className="item-list list-group">
            {renderList()}
        </ul>
    );
}
ItemList.propTypes = {
    onItemSelected: PropTypes.func
};

export default React.memo(ItemList);
