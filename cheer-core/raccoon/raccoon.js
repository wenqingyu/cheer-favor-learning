const raccoon = require('raccoon');

// these are the default values but you can change them
raccoon.config.nearestNeighbors = 5;  // number of neighbors you want to compare a user against
raccoon.config.className = 'post';  // prefix for your items (used for redis)
raccoon.config.numOfRecsStore = 30;  // number of recommendations to store per user

raccoon.liked('garyId', 'movieId').then(() => {
  return raccoon.liked('garyId', 'movie2Id');  
}).then(() => {
  return raccoon.liked('chrisId', 'movieId');  
}).then(() => {
  return raccoon.recommendFor('chrisId', 10);
}).then((recs) => {
  console.log('recs', recs);
  // results will be an array of x ranked recommendations for chris
  // in this case it would contain movie2
});


module.exports = raccoon;

