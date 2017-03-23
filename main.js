const https = require('https');
const cheerio = require('cheerio');
const fork = require('child_process').fork;

let server = fork(`${__dirname}/server/server.js`);


https.get('https://github.com/NERVdy?tab=stars', (res) => {

	let rowData = '';
	let $ = null;
	let i = 0;

	res.on('data',(chunk) => {
		rowData += chunk;
	});

	res.on('end', () => {
		$ = cheerio.load(rowData.toString());
		let userInfo = {
			userName: $('#js-pjax-container .js-user-profile-sticky-fields .vcard-username').html().trim(),
			stars: []
		};

		let starRepo = $('.js-repo-filter .width-full');
		starRepo.each(function(i){
			userInfo.stars.push({
				repoName: $(this).find('div.d-inline-block a').text().trim(),
				star: $(this).find('div.text-gray a[aria-label="Stargazers"]').text().trim()
			});
		});

		server.send(userInfo);
		console.log('send message');
	})

}).on('error', (e) => {
	console.log(`error ${e.message}`);
})