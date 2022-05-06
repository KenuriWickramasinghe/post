const express = require('express');
const Posts = require('../models/posts');

const router = express.Router();

//add posts
router.route('/add').post((req, res) => {
    const topic = req.body.topic;
    const description = req.body.description;
    const postCatecory = req.body.postCatecory;

    const newPost = new Posts({
        topic,
        description,
        postCatecory,
    });

    newPost
        .save()
        .then(() => {
            res.json('Post added');
        })
        .catch((err) => {
            console.log(err);
        });
});

//all data
router.route('/').get((req,res) =>{
    Posts.find()
        .then((posts)=>{
            res.json({success:true,existingPost:posts});
        })
        .catch((err) =>{
            console.log(err);
        })
});

//update data
router.route('/update/:id').put(async(req,res)=>{
    let postID = req.params.id;
    const {topic, description, postCatecory} = req.body;

    const updatePost = {
        topic,
        description,
        postCatecory
    };

    const update = await Posts.findByIdAndUpdate(postID,updatePost)
        .then(()=>{
            res.status(200).send({
                status:'post updated'
            });
        }).catch((err)=>{
            console.log(err);
            res.status(200).send({status:'error with updating data', error:err.message});
        })
})

//delete one
router.route('/delete/:id').delete(async (req, res) => {
    let postID = req.params.id;
    await Posts.findByIdAndDelete(postID)
        .then(() => {
            res.status(200).send({ status: 'Post deleted' });
        })
        .catch((err) => {
            console.log(err.message);
            res
                .status(500)
                .send({ status: 'Error with delete user', error: err.message });
        });
});

//get one
router.route('/get/:id').get(async (req, res) => {
    let postID = req.params.id;
    const post = await Posts.findById(postID) //findOne(email)
        .then((post) => {
            res.status(200).send({ status: 'Post fetched', post: post })
                .json({
                    success:true,
                    post
                });
        })
        .catch((err) => {
            console.log(err.message);
            res
                .status(500)
                .send({ status: 'Error with get user', error: err.message })
        });
});
module.exports = router;