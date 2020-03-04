import React, {useState} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ItemList from '../item-list';
import SwapiService from '../../services/SwapiService';
import ItemDetails from '../item-details';

import './app.css';
import Row from '../row';
import {Record} from '../item-details/item-details';
import ErrorBoundry from '../error-boundry';

const service = new SwapiService();

export default React.memo(function App() {
    const [showRandomPlanet, setShowRandomPlanet] = useState(true);
    const [selectedStarship, setSelectedStarship] = useState(null);

    return (
        <div className="stardb-app">
            <Header />
            {showRandomPlanet && <RandomPlanet />}

            <div className="row mb2 button-row">
                <button
                    className="toggle-planet btn btn-warning btn-lg"
                    onClick={() => setShowRandomPlanet(state => !state)}>
                    Toggle Random Planet
                </button>
            </div>
            <PeoplePage />

            <ErrorBoundry>
                <Row
                    leftCol={
                        <ItemList
                            getData={service.getAllStarships}
                            onItemSelected={setSelectedStarship}
                        >
                            {({ name }) => name}
                        </ItemList>
                    }
                    rightCol={
                        <ItemDetails
                            itemId={selectedStarship}
                            getData={service.getStarship}
                        >
                            <Record key="model" field="model" label="Model" />
                            <Record key="manufacturer" field="manufacturer" label="Manufacturer" />
                        </ItemDetails>
                    }
                />
            </ErrorBoundry>
        </div>
    );
});