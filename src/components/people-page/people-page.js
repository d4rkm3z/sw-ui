import React, {useState} from 'react';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import SwapiService from '../../services/SwapiService';

import './people-page.css';

const service = new SwapiService();

export default React.memo(function PeoplePage() {
    const [selectedPerson, setSelectedPerson] = useState(null);

    const onPersonSelected = (id) => setSelectedPerson(id);

    return (
        <div className="row mb2">
            <div className="col-md-6">
                <ItemList
                    getData={service.getAllPeople}
                    onItemSelected={onPersonSelected}
                    renderItem={({ name }) => name} />
            </div>
            <div className="col-md-6">
                <PersonDetails personId={selectedPerson} />
            </div>
        </div>
    );
})
