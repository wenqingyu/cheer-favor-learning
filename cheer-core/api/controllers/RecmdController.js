/**
 * RecmdController
 *
 * @description :: Server-side logic for managing Recommendation
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const raccoon = require('raccoon');

// these are the default values but you can change them
raccoon.config.nearestNeighbors = 5;  // number of neighbors you want to compare a user against
raccoon.config.className = 'POST';  // prefix for your items (used for redis)
raccoon.config.numOfRecsStore = 30;  // number of recommendations to store per user

module.exports = {

    // like
	like: function (req, res) {
        if(!req.query.userid || !req.query.postid){
            return res.send('Need userid and postid');
        }

        raccoon.liked(req.query.userid, req.query.postid).then(() => {
            return res.send('liked!')
        });
    },

    // unlike
    unlike: function (req, res) {
        if(!req.query.userid || !req.query.postid){
            return res.send('Need userid and postid');
        }

        raccoon.unlike(req.query.userid, req.query.postid).then(() => {
            return res.send('unliked!')
        });
    },

    // dislike
    dislike: function (req, res) {
        if(!req.query.userid || !req.query.postid){
            return res.send('Need userid and postid');
        }

        raccoon.dislike(req.query.userid, req.query.postid).then(() => {
            return res.send('disliked!')
        });
    },

    // undislike
    undislike: function (req, res) {
        if(!req.query.userid || !req.query.postid){
            return res.send('Need userid and postid');
        }

        raccoon.undislike(req.query.userid, req.query.postid).then(() => {
            return res.send('undisliked!')
        });
    },

    // recommendFor
    recommendFor: function (req, res) {
        if(!req.query.userid){
            return res.send('Need userid');
        }

        raccoon.recommendFor(req.query.userid, req.query.amount?req.query.amount:5).then((results) => {
            return res.json(results);
        });
    },

    // mostSimilarUsers
    mostSimilarUsers: function (req, res) {
        if(!req.query.userid){
            return res.send('Need userid');
        }

        raccoon.mostSimilarUsers(req.query.userid).then((results) => {
            return res.json(results);
        });
    },

    // leastSimilarUsers
    leastSimilarUsers: function (req, res) {
        if(!req.query.userid){
            return res.send('Need userid');
        }

        raccoon.leastSimilarUsers(req.query.userid).then((results) => {
            return res.json(results);
        });
    },

    // bestRated
    bestRated: function (req, res) {
        raccoon.bestRated().then((results) => {
            return res.json(results);
        });
    },

    // likedCount
    likedCount: function (req, res) {
        if(!req.query.itemid){
            return res.send('Need itemid');
        }

        raccoon.likedCount(req.query.itemid).then((results) => {
            return res.json({rate: results});
        });
    },








};

