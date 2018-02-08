const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

	router.get('/courses', (req, res, next) => {
		let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
			from = query.start,
			to = +query.start + +query.count,
			sort = query.sort,
			search = query.search,
			courses = server.db.getState().courses;
		console.log(sort);
		console.log(search);
		if (courses.length < to) {
			to = courses.length;
		}
		
		if (search) {
			courses = courses
				.filter(course => 
					course.name.indexOf(search) >= 0 ||
					course.description.indexOf(search) >= 0);
		}

		courses = courses.slice(from, to);
		
		res.json(courses);
	});

	router.get('/authors', (req, res, next) => {
		const authors = [];
		server.db.getState()
			.courses
			.forEach(course => {
				course.authors.forEach(author => {
					const name = `${author.firstName} ${author.lastName}`;
					if (authors.indexOf(name) < 0) {
						authors.push(name);
					}
				})
			});

		res.json(authors);
	});
	
	return router;
};
