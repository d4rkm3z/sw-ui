import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SwapiService from '../../services/SwapiService';

import './person-details.css';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const service = new SwapiService();

function PersonDetails({ personId }) {
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        personId && service.getPerson(personId)
            .then((person) => {
                setPerson(person);
                setLoading(false);
            }).catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [personId]);

    const hasData = !(loading || error) && personId;

    return (
        <div className="person-details card">
            {error && <ErrorIndicator />}
            {loading && <Spinner />}
            {hasData && <PersonView person={person} />}
        </div>
    )
}

const PersonView = ({ person }) => {
    const { id, name, gender, birthYear, eyeColor } = person;

    return (
        <>
            <img className="person-image"
                 src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Birth Year</span>
                        <span>{birthYear}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Eye Color</span>
                        <span>{eyeColor}</span>
                    </li>
                </ul>
            </div>
        </>
    );
};

PersonDetails.propTypes = {
    personId: PropTypes.string
};

export default React.memo(PersonDetails);

