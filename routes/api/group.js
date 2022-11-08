const express = require('express');
const Group = require('../../models/Group');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Invite = require('../../models/Invite');
const { default: axios } = require('axios');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const data = await Group.find();
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.body;
    try {
      const users = new Array();
      users.push({ user: req.user.id });
      let grp = new Group({
        name: name,
        users: users,
      });
      await grp.save();
      res.json(grp);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.put(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.body;
    try {
      const s = await Group.findOne({ name: name })
      console.log(s)
      console.log(s.users);
      s.users.push({ user: req.user.id });
      console.log(s.users)
      await s.save();
      res.json(s);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/:name', auth, async (req, res) => {
  try {
    console.log(req.params.name);
    const mem = await Group.find({ name: req.params.name });
    res.json(mem);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/:name/:member', auth, async (req, res) => {
  const name = req.params.name;
  const member = req.params.member;
  try {
    let invite = new Invite({
      name: name,
      member: member,
      user: req.user.id,
    });
    await invite.save();
    res.json(invite);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/invite/:name', auth, async (req, res) => {
  try {
    const data = await Invite.find({ member: req.params.name });
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/invite/:id', auth, async (req, res) => {
  try {
    const invite = await Invite.findById(req.params.id);
    if (!invite) return res.status(404).json({ msg: 'invite not found' });
    await Invite.remove();
    res.json({ msg: 'invite removed from Invite' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'invite not found' });
    res.status(500).send('Server Error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try{
     const data = await Group.find();
  } catch(err){
    console.log(err.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router;
