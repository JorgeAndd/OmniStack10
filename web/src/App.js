import React, { useEffect, useState } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {
  const [devs, setDevs] = useState([]);

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

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(e) {
    e.preventDefault();

    const response = await api.post('/devs', {
      github_username,
      skills,
      latitude,
      longitude,
    });

    setGithubusername('');
    setSkills('');

    let newDevs = [...devs, response.data];
    setDevs(newDevs);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
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
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <li key={dev._id} className="dev-item">
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
          ))}
        </ul>
      </main>
    </div >
  );
}

export default App;
