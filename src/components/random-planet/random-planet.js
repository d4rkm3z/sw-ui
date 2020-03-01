import React, {useCallback, useLayoutEffect, useState} from 'react';
import SwapiService from '../../services/SwapiService';

import './random-planet.css';

const service = new SwapiService();

function getRandomId() {
    return Math.floor(Math.random() * 19) + 2;
}

export default React.memo(function RandomPlanet() {
    const [id, setId] = useState(null);
    const [name, setName] = useState(null);
    const [population, setPopulation] = useState(null);
    const [rotationPeriod, setRotationPeriod] = useState(null);
    const [diameter, setDiameter] = useState(null);

    const onPlanetLoaded = useCallback(({
                                            name,
                                            population,
                                            diameter,
                                            rotationPeriod
                                        }) => {
        setId(getRandomId());
        setName(name);
        setPopulation(population);
        setRotationPeriod(rotationPeriod);
        setDiameter(diameter);
    }, []);

    useLayoutEffect(() => {
        service.getPlanet(getRandomId()).then(onPlanetLoaded);
    }, [onPlanetLoaded]);

    return (
        <div className="random-planet jumbotron rounded">
            <img className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
})
