const { Router } = require('express');
const axios = require('axios');
const Dev = require('./models/dev');

const routes = Router();

// Parameters types:
// Query params: request.query (filters, sorting, paging, etc...)
// Route params: request.params (resource id on change or deletion)
//         Body: request.body (data for creation or change of a registry)     

routes.post('/devs', async (request, response) => {
    const { github_username, skills, latitude, longitude } = request.body;

    const githubResponse = await axios.get(`https://api.github.com/users/${github_username}`);

    const name = githubResponse.data.name || githubResponse.data.login;
    const avatar_url = githubResponse.data.avatar_url;
    const bio = githubResponse.data.bio || '';

    const skillsArray = skills.split(',').map(skill => skill.trim());

    const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
    }

    const newDev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        skills: skillsArray,
        location
    });

    return response.json(newDev);
});

module.exports = routes;