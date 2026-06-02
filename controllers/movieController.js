const Movie = require('../models/Movie');

// Admin only
module.exports.addMovie = async (req, res, next) => {
    try {
        const { title, director, year, description, genre } = req.body;

        const newMovie = new Movie({
            title,
            director,
            year,
            description,
            genre
        });

        const savedMovie = await newMovie.save();
        return res.status(201).json(savedMovie);

    } catch (err) {
        next(err);
    }
};

// All users
module.exports.getAllMovies = async (req, res, next) => {
    try {
        const movies = await Movie.find({});
        return res.status(200).json({ movies });

    } catch (err) {
        next(err);
    }
};

// All users
module.exports.getMovieById = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        return res.status(200).json(movie);

    } catch (err) {
        next(err);
    }
};

// Admin only
module.exports.updateMovie = async (req, res, next) => {
    try {
        const { title, director, year, description, genre } = req.body;

        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            { title, director, year, description, genre },
            { new: true }
        );

        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        return res.status(200).json(updatedMovie);

    } catch (err) {
        next(err);
    }
};

// Admin only
module.exports.deleteMovie = async (req, res, next) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        return res.status(200).json({ message: 'Movie deleted successfully' });

    } catch (err) {
        next(err);
    }
};

// All users
module.exports.addComment = async (req, res, next) => {
    try {
        const { comment } = req.body;

        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        movie.comments.push({
            userId: req.user.id,
            comment
        });

        await movie.save();
        return res.status(200).json(movie);

    } catch (err) {
        next(err);
    }
};

// All users
module.exports.getComments = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        return res.status(200).json({ comments: movie.comments });

    } catch (err) {
        next(err);
    }
};