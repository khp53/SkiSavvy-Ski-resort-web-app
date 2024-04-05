// PathDescriptions.js

import React from 'react';

function PathDescriptions({ pathsWithDescriptions, isStartegy, title }) {
    return (
        <div>
            <h3>{title}</h3>
            <ul>
                {isStartegy ?
                    pathsWithDescriptions ?
                        <p>
                            <strong>{pathsWithDescriptions.route}</strong>: {pathsWithDescriptions.textDescription}
                        </p> :
                        <p>
                            <strong>Strategy not found</strong>
                        </p>
                    : pathsWithDescriptions.map((path, index) => (
                        <li key={index}>
                            <strong>{path.route}</strong>: {path.textDescription}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default PathDescriptions;
