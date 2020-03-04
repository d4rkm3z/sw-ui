import React from 'react';

import './header.css';

const Header = () => {
    return (
        <div className="header d-flex">
            <h3>
                <a href="/">
                    Star DB
                </a>
            </h3>
            <ul className="d-flex">
                <li>
                    <button>People</button>
                </li>
                <li>
                    <button>Planets</button>
                </li>
                <li>
                    <button>Starships</button>
                </li>
            </ul>
        </div>
    );
};

export default Header;