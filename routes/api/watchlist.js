const express = require('express');
const ChatWatchlist = require('../../models/ChatWatchlist');
const GroupWatchlist = require('../../models/GroupWatchlist');
const PrivateWatchlist = require('../../models/PrivateWatchlist');
const router = express.Router();
const auth = require('../../middleware/auth');
const ChatShare = require('../../models/ChatShare');

router.get('/', auth, async (req, res) => {
  try {
    const data = await PrivateWatchlist.find();
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/', auth, async (req, res) => {
  try {
    const data = await PrivateWatchlist.findOne({ user: req.user.id });
    const { name, image } = req.body;
    if (data) {
      var check = false;
      for (var i = 0; i < data.movies.length; i++) {
        if (data.movies[i].name === name) {
          check = true;
          break;
        }
      }
      if (check) {
        return res.status(400).send('Movie already added');
      }
      data.movies.push({ name: name, image: image });
      await data.save();
      res.json(data);
    } else {
      const array = new Array();
      array.push({ name, image });
      const ne = new PrivateWatchlist({ user: req.user.id, movies: array });
      await ne.save();
      res.json(ne);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/group/:id', auth, async (req, res) => {
  try {
    const data = await GroupWatchlist.findOne({ group: req.params.id });
    if (data) {
      const { name, image } = req.body;
      data.movies.push({ name: name, image: image });
      await data.save();
      res.json(data);
    } else {
      const { name, image } = req.body;
      const array = new Array();
      array.push({ name, image });
      const ne = new GroupWatchlist({ group: req.params.id, movies: array });
      await ne.save();
      res.json(ne);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/group/:name', auth, async (req, res) => {
  try {
    const data = await GroupWatchlist.findOne({ name: req.params.name });
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/chat/:id', auth, async (req, res) => {
  try {
    const data = await ChatWatchlist.findOne({
      user1: req.user.id,
      user2: req.params.id,
    });
    if (data) {
      const { name, image } = req.body;
      data.movies.push({ name: name, image: image });
      await data.save();
      res.json(data);
    } else {
      const { name, image } = req.body;
      const array = new Array();
      array.push({ name, image });
      const ne = new ChatWatchlist({
        user1: req.user.id,
        user2: req.params.id,
        movies: array,
      });
      await ne.save();
      res.json(ne);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/chat/:id', auth, async (req, res) => {
  try {
    const data = await ChatWatchlist.findOne({
      user1: req.params.id,
      user2: req.user.id,
    });
    const data2 = await ChatWatchlist.findOne({
      user1: req.user.id,
      user2: req.params.id,
    });
    console.log(data);
    console.log(data2);
    const array = new Array();
    if (!data && !data2) res.json(null);
    else if (!data && data2) res.json(data2.movies);
    else if (data && !data2) res.json(data.movies);
    else {
      array = data.movies;
      for (var i = 0; i < data2.movies.length; i++) {
        array.push(data2.movies[i]);
      }
      res.json(array);
    }
  } catch (err) {
    console.log(err.message);
  }
});

router.post('/chat/share/:id', auth, async (req, res) => {
  try {
    const { name, image } = req.body;
    const newMovie = new ChatShare({
      user1: req.user.id,
      user2: req.params.id,
      name: name,
      image: image,
    });
    await newMovie.save();
    res.json(newMovie);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/chat/share/:id', auth, async (req, res) => {
  try {
    const mine = await ChatShare.find({ user1: req.user.id, user2: req.params.id });
    const shared = await ChatShare.find({ user1: req.params.id, user2: req.user.id });
    console.log(mine.data);
    console.log(shared.data);
    const data = {
      mine: mine,
      shared: shared,
    };
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
