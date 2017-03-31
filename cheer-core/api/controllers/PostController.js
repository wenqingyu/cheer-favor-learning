/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const raccoon = require('raccoon');
const async = require('async');

module.exports = {
    // Post Recmd
    recmd: function (req, res) {
        if(!req.query.userid){
            return res.send('Need userid');
        }

        raccoon.recommendFor(req.query.userid, 5).then((results) => {
            // Get list of posts
            console.log('recmd:', results)
            async.map(
                results, 
                function getPost(postid, callback){
                    Post.findOne({id: postid}).exec(callback);
                }, 
                function(err, posts){
                    res.json(posts);
                }    
            )
        });
    },


    // Post like
    like: function (req, res) {
        if(!req.query.userid || !req.query.postid){
            return res.send('Need userid and postid');
        }

        raccoon.liked(req.query.userid, req.query.postid).then(() => {
            console.log("stats liked")
        });

        Post.findOne({id: req.query.postid}).exec(function(err, post){
            post.action = "liked";
            res.json(post);
        })
    },

    // Post dislike
    dislike: function (req, res) {
        if(!req.query.userid || !req.query.postid){
            return res.send('Need userid and postid');
        }

        raccoon.liked(req.query.userid, req.query.postid).then(() => {
            console.log("stats dislike")
        });

        Post.findOne({id: req.query.postid}).exec(function(err, post){
            post.action = "dislike";
            res.json(post);
        })
    },


    
 
};

