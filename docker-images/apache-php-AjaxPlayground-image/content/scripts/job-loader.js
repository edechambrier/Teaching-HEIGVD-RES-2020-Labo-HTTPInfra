$(function(){
	function populateJobs(){
		
		// if already 50 jobs displayed, we clear out the displayed jobs
		if($("#jobList .job-container").length > 50){
			$("#jobList").html("");
		}
		
	$.getJSON( "/api/students/", function( jobs ) {
		
		$.each( jobs, function( key, job ) {
			var jobBox = '<div class="col-md-3 col-sm-6 job-container">' +
          '<div class="service-box">'+
            '<div class="service-icon yellow">'+
              '<div class="front-content">'+
                '<i class="fa fa-globe" aria-hidden="true"></i>'+
                '<h3>'+job.jobName+'</h3>'+
              '</div>'+
            '</div>'+
            '<div class="service-content">'+
              '<h3>'+job.jobName+'</h3>'+
              '<h4>'+job.companyName+'</h4>'+
							'<table class="table-jobs" class="w-100">'+
								'<tr>'+
									'<td class="text-right">Salary :<br /><span class="small">(annual)</span></td>'+
									'<td class="text-left">'+job.annualSalary+'</td>'+
								'</tr>'+
								'<tr>'+
									'<td class="text-right">Info : </td>'+
									'<td class="text-left">'+job.companyContact.companyAddress+'<br />'+
									'<a href="tel:'+job.companyContact.companyPhone+'">'+job.companyContact.companyPhone+'</a><br />'+
									'<a href="mailto:'+job.companyContact.companyEmail+'">'+job.companyContact.companyEmail+'</a><br />'+
									'<a href="'+job.companyContact.companyWebsite+'" target="_blanc">'+job.companyContact.companyWebsite+'</a></td>'+
								'</tr>'+
							'</table>'+
							'<a href="mailto:'+job.companyContact.companyEmail+'" class="btn btn-sm btn-outline-light mt-3"><i class="fa fa-envelope text-light" aria-hidden="true"></i> Get in touch !</a>'+
            '</div>'+
          '</div>'+
        '</div>';
			$($.parseHTML(jobBox)).appendTo( "#jobList");
		});
		
	});
	}
	 populateJobs();
	 setInterval(populateJobs, 2000);
});