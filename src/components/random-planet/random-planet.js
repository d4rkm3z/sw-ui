import React, { useCallback, useEffect, useState } from 'react';
import SwapiService from '../../services/SwapiService';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import PlanetView from '../planet-view';

import './random-planet.css';


const service = new SwapiService();
const TIMEOUT = 5000;

function getRandomId() {
    return Math.floor(Math.random() * 19) + 2;
}

export default React.memo(function RandomPlanet() {
    const [planet, setPlanet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const onPlanetLoaded = useCallback((planet) => {
        setPlanet(planet);
        setLoading(false);
    }, []);

    const updatePlanet = useCallback(() => {
        service.getPlanet(getRandomId())
            .then(onPlanetLoaded)
            .catch(onError);
    }, [onPlanetLoaded]);

    const onError = () => {
        setError(true);
        setLoading(false);
    };

    useEffect(() => {
        const interval = setInterval(updatePlanet, TIMEOUT);
        return () => clearInterval(interval);
    }, [updatePlanet]);

    const hasData = !(loading || error);

    return (
        <div className="random-planet jumbotron rounded">
            {error && <ErrorIndicator />}
            {loading && <Spinner />}
            {hasData && <PlanetView planet={planet} />}
        </div>
    );
})


