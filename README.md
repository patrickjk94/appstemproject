# appstemproject

running at localhost:3000
swagger docs at http://localhost:3000/api-docs/#/
    // https://www.npmjs.com/package/swagger-autogen

-----

Appstem Node.js Developer Prototype

Create a Node.js app that manages a job queue. 
The workers in the job queue will fetch data from a URL and store the results in a database.

/jobs/addJob 
url: `asdfadsf`
returns <job_id>

/jobs/status

Please expose a REST API that allows adding new jobs as well as checking the
status and retrieving the results of a job.

Example: A user submits www.google.com to your API. The user will get back a job

ID. Your job queue retrieves the HTML contents of www.google.com and
stores the result in the database. 

When a user asks your API what the status
of a job is, they should get a response that includes whether or not the job is completed, as well as the HTML if the job is completed.


. error handling
. code clean and organized

TODO: 
    . Create a README that documents the assumptions and decisions in design

    . Send Zip file 


---
DONE: Your API should require an API key to authenticate the user.
