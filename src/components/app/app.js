import React, {useState} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ItemList from '../item-list';
import SwapiService from '../../services/SwapiService';
import PersonDetails from '../person-details';

import './app.css';
import Row from '../row';

const service = new SwapiService();

export default React.memo(function App() {
    const [showRandomPlanet, setShowRandomPlanet] = useState(true);
    const [selectedPlanet, setSelectedPlanet] = useState(null);

    const onPlanetSelected = (id) => setSelectedPlanet(id);

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

            <Row
                leftCol={
                    <ItemList
                        getData={service.getAllPlanets}
                        onItemSelected={onPlanetSelected}
                    >
                        {({ name }) => name}
                    </ItemList>
                }
                rightCol={<PersonDetails personId={selectedPlanet} />}
            />

            <Row
                leftCol={
                    <ItemList
                        getData={service.getAllStarships}
                        onItemSelected={onPlanetSelected}
                    >
                        {({ name }) => name}
                    </ItemList>
                }
                rightCol={<PersonDetails personId={selectedPlanet} />}
            />
        </div>
    );
});