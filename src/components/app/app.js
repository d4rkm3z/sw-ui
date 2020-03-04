import React, {useState} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ItemList from '../item-list';
import SwapiService from '../../services/SwapiService';
import PersonDetails from '../person-details';

import './app.css';

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

            <div className="row mb2">
                <div className="col-md-6">
                    <ItemList
                        getData={service.getAllPlanets}
                        onItemSelected={onPlanetSelected}
                        renderItem={({ name }) => name} />
                </div>
                <div className="col-md-6">
                    <PersonDetails personId={selectedPlanet} />
                </div>
            </div>

            <div className="row mb2">
                <div className="col-md-6">
                    <ItemList
                        getData={service.getAllStarships}
                        onItemSelected={onPlanetSelected}
                        renderItem={({ name }) => name} />
                </div>
                <div className="col-md-6">
                    <PersonDetails personId={selectedPlanet} />
                </div>
            </div>
        </div>
    );
});