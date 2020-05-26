var Chance = require('chance');
var chance = new Chance();

var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send(createJobs());
});

app.listen(3000, function(){
	console.log("Greetings ! you are on the port 3000 !");
});

function createJobs(){
	
	var numberOfJobs = chance.integer({
		min: 5,
		max: 20
	});
	
	var jobs = [];

	for(var i = 0; i< numberOfJobs; i++){

		var companyDomaine = chance.domain();

		jobs.push({
			jobName : chance.profession({rank: true}),
			companyName : chance.company(),
			companyContact : {
				companyAddress : chance.address(),
				companyWebsite : "https://"+companyDomaine,
				companyEmail : chance.email({domain: companyDomaine}),
				companyPhone : chance.phone({ country: 'fr', mobile: false })
			},
			rate : chance.integer({	min: 1, max: 5}) * 20 + "%",
			annualSalary : chance.euro({max: 100000})
		});

	}
	console.log(jobs);
	return jobs;
}
