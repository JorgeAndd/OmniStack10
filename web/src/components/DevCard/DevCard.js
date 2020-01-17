import React from 'react';

import './DevCard.css';

function DevCard(props) {
    const { dev } = props;

    return (
        <li className="dev-item">
            <header>
                <img src={dev.avatar_url} alt="Jorge Andrade" />
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.skills.join(', ')}</span>
                </div>
            </header>
            <p>
                {dev.bio}
            </p>
            <a href={`https://github.com/${dev.github_username}`}>Access Github profile</a>
        </li>
    );
}

export default DevCard;