import React from 'react';

import './row.css';

const Row = ({ leftCol, rightCol }) => {
    return (
        <div className="row mb2">
            <div className="col-md-6">
                {leftCol}
            </div>
            <div className="col-md-6">
                {rightCol}
            </div>
        </div>
    )
};

export default Row;
