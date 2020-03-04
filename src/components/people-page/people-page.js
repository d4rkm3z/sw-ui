import React, {useState} from 'react';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import SwapiService from '../../services/SwapiService';
import Row from '../row';
import ErrorBoundry from '../error-boundry';

import './people-page.css';

const service = new SwapiService();

export default React.memo(function PeoplePage() {
    const [selectedPerson, setSelectedPerson] = useState(null);

    const onPersonSelected = (id) => setSelectedPerson(id);
    const itemList = (
        <ItemList
            getData={service.getAllPeople}
            onItemSelected={onPersonSelected}
        >
            {(item) => (`${item.name} (${item.gender}, ${item.birthYear})`)}
        </ItemList>
    );
    const personDetails = <PersonDetails personId={selectedPerson} />;

    return (
        <ErrorBoundry>
            <Row
                leftCol={itemList}
                rightCol={personDetails}
            />
        </ErrorBoundry>
    );
})