const Dev = require('../models/dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        // Search devs in a 10km radius
        // Filter devs by skill

        const { latitude, longitude, skills } = request.query;

        const skillsArray = parseStringAsArray(skills);

        console.log(skillsArray);
        const devs = await Dev.find({
            skills: {
                $in: skillsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                }
            }
        });

        return response.json({ devs })
    }
}