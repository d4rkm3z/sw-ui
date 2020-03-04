import React, { useState } from 'react';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import SwapiService from '../../services/SwapiService';
import Row from '../row';
import ErrorBoundary from '../error-boundary';
import Record from '../record';

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
    const itemDetails = (
        <ItemDetails
            itemId={selectedPerson}
            getData={service.getPerson}
        >
            <Record field="gender" label="Gender" />
            <Record field="eyeColor" label="Eye color" />
            <Record field="birthYear" label="Birth year" />
        </ItemDetails>
    );

    return (
        <ErrorBoundary>
            <Row
                leftCol={itemList}
                rightCol={itemDetails}
            />
        </ErrorBoundary>
    );
})