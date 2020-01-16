import React, { useEffect, useState } from 'react';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {
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

  async function handleAddDev(e) {
    e.preventDefault();
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form>
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
          <li className="dev-item">
            <header>
              <img src="https://avatars1.githubusercontent.com/u/5915194?s=460&v=4" alt="Jorge Andrade" />
              <div className="user-info">
                <strong>Jorge Andrade</strong>
                <span>C#, Javascript, React</span>
              </div>
            </header>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ante diam, semper eget nulla sed, mattis venenatis ante.
            </p>
            <a href="https://github.com/JorgeAndd">Access Github profile</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars1.githubusercontent.com/u/5915194?s=460&v=4" alt="Jorge Andrade" />
              <div className="user-info">
                <strong>Jorge Andrade</strong>
                <span>C#, Javascript, React</span>
              </div>
            </header>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ante diam, semper eget nulla sed, mattis venenatis ante.
            </p>
            <a href="https://github.com/JorgeAndd">Access Github profile</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars1.githubusercontent.com/u/5915194?s=460&v=4" alt="Jorge Andrade" />
              <div className="user-info">
                <strong>Jorge Andrade</strong>
                <span>C#, Javascript, React</span>
              </div>
            </header>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ante diam, semper eget nulla sed, mattis venenatis ante.
            </p>
            <a href="https://github.com/JorgeAndd">Access Github profile</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars1.githubusercontent.com/u/5915194?s=460&v=4" alt="Jorge Andrade" />
              <div className="user-info">
                <strong>Jorge Andrade</strong>
                <span>C#, Javascript, React</span>
              </div>
            </header>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ante diam, semper eget nulla sed, mattis venenatis ante.
            </p>
            <a href="https://github.com/JorgeAndd">Access Github profile</a>
          </li>
        </ul>
      </main>
    </div >
  );
}

export default App;
