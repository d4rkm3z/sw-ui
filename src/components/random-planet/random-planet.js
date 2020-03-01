import React, {useCallback, useLayoutEffect, useState} from 'react';
import SwapiService from '../../services/SwapiService';
import Spinner from '../spinner';

import './random-planet.css';


const service = new SwapiService();

function getRandomId() {
    return Math.floor(Math.random() * 19) + 2;
}

export default React.memo(function RandomPlanet() {
    const [planet, setPlanet] = useState(null);
    const [loading, setLoading] = useState(true);

    const onPlanetLoaded = useCallback((planet) => {
        setPlanet(planet);
        setLoading(false);
    }, []);

    useLayoutEffect(() => {
        service.getPlanet(getRandomId()).then(onPlanetLoaded);
    }, [onPlanetLoaded]);

    return (
        <div className="random-planet jumbotron rounded">
            {loading ?
                <Spinner /> :
                <PlanetView planet={planet} />}
        </div>
    );
})

const PlanetView = ({ planet }) => {
    const { id, name, population, rotationPeriod, diameter } = planet;

    return (
        <>
            <img className="planet-image"
                 alt=""
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
        </>
    );
}
