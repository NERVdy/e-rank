const https = require('https');
const cheerio = require('cheerio');

https.get('https://github.com/cheeriojs/cheerio', (res) => {

	let rowData = '';
	let $ = null;
	let i = 0;

	res.on('data',(chunk) => {
		rowData += chunk;
		console.log(i++);
	});

	res.on('end', () => {
		$ = cheerio.load(rowData.toString());
		console.log($('.js-toggler-container').html());
		// let repoInfo = {
		// 	star: $('.starring-container a').html().trim(),
		// 	fork: $('.pagehead-actions li:last-child a').html().trim(),
		// 	watch: $('.pagehead-actions li:first-child a').html().trim()
		// };
		// console.log(`this repo star: ${repoInfo.star}, fork: ${repoInfo.fork}, watch: ${repoInfo.watch}`);
	})

}).on('error', (e) => {
	console.log(`error ${e.message}`);
})