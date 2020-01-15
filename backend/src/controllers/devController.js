const axios = require('axios');
const Dev = require('../models/dev');

module.exports = {
    async store(request, response) {
        const { github_username, skills, latitude, longitude } = request.body;

        const dev = await Dev.findOne({ github_username });
        if (dev) {
            return response.json(dev);
        }

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
    }
};