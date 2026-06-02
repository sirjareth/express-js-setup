const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { verify, verifyAdmin } = require('../auth');

// Admin only
router.post('/addMovie', verify, verifyAdmin, movieController.addMovie);

// All users
router.get('/getMovies', verify, movieController.getAllMovies);
router.get('/getMovie/:id', verify, movieController.getMovieById);

// Admin only
router.put('/updateMovie/:id', verify, verifyAdmin, movieController.updateMovie);
router.delete('/deleteMovie/:id', verify, verifyAdmin, movieController.deleteMovie);

// All users
router.post('/addComment/:id', verify, movieController.addComment);
router.get('/getComments/:id', verify, movieController.getComments);

module.exports = router;