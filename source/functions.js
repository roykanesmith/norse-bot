const logger = require('winston');
const request = require('request-promise-native');
// Configure logger settings

module.exports = {
    add(args) {
        let response = 'Must add 2 numbers (Ex: "!add 1 2)"';
            if (args.length === 2) {
            const num1 = Number(args[0]);
            const num2 = Number(args[1]);
            logger.debug(`1: [${num1}], 2: [${num2}]`);

            if (isNaN(num1) || isNaN(num2)) { // if either is not NotANumber
                response = 'Arguments must be numbers'; // Should really throw an error which is caught in bots.js
            } else {
                response = num1 + num2;
            }
        }
        return response;
    },

    async randomImage(args) {
        let response = `Only exactly 1 argument allowed for image searches (Ex: !get nku esports)`;
        const keyword = encodeURI(args[0]);
        response = `Error getting image of ${keyword}`;
        let numPhotos = '100';
        let options = {
            uri: `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=3d48b0312aeb1b7e0f97bf7543c558b6&tags=${keyword}&sort=relevance&per_page=100&format=json&nojsoncallback=1`,
            json: true
        }
        logger.debug(options);
        await request(options).then(json => {
            numPhotos = json.photos.perpage; // reset incase less photos are available
            const photoIndex = Math.floor(Math.random() * Math.floor(numPhotos)); // Random int less than num photos
            
            const photo = json.photos.photo[photoIndex];
            response = `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
            logger.debug(response);
        }).catch( err => {
            logger.debug(err);
        });
        return response;
    }

//   isNKUStudent(firstName, lastName) {
//     // Check directory.nku.edu/student and check if the last/name combo returns any students
//   },
};
