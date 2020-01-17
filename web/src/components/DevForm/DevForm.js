import React, { useState, useEffect } from 'react';

import './DevForm.css';

function DevForm(props) {
    const { onSubmit } = props;

    const [github_username, setGithubusername] = useState('');
    const [skills, setSkills] = useState('');

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;

                setLatitude(latitude);
                setLongitude(longitude);
            },
            error => {
                console.log(error);
            },
            {
                timeout: 30000,
            }
        );
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            github_username,
            skills,
            latitude,
            longitude,
        });

        setGithubusername('');
        setSkills('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Github User</label>
                <input
                    name="github_username"
                    id="github_username"
                    required
                    value={github_username}
                    onChange={e => setGithubusername(e.target.value)}
                />
            </div>

            <div className="input-block">
                <label htmlFor="skills">Skills</label>
                <input
                    name="skills"
                    id="skills"
                    required
                    value={skills}
                    onChange={e => setSkills(e.target.value)}
                />
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                        type="number"
                        step="any"
                        name="latitude"
                        id="latitude"
                        required
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input
                        type="number"
                        step="any"
                        name="longitude"
                        id="longitude"
                        required
                        value={longitude}
                        onChange={e => setLongitude(e.target.value)}
                    />
                </div>
            </div>

            <button type="submit">Save</button>
        </form>
    );
}

export default DevForm;