# appstemproject

running at localhost:3000
swagger docs at http://localhost:3000/api-docs/#/

Appstem Node.js Developer Prototype


Create a Node.js app that manages a job queue. 
The workers in the job queue will fetch data from a URL and store the results in a database.

API key to authenticate.. 

/jobs/addJob 
url: `asdfadsf`
returns <id>

/jobs/status

/jobs/results

Please expose a REST API that allows adding new jobs as well as checking the
status and retrieving the results of a job.

Your API should require an API key to authenticate the user.
Example: A user submits www.google.com to your API. The user will get back a job
ID. Your job queue retrieves the HTML contents of www.google.com and
stores the result in the database. 

When a user asks your API what the status
of a job is, they should get a response that includes whether or not the job is completed, as well as the HTML if the job is completed.


Feel free to use any database system and third party libraries you would use in a
production application.

Make sure to take into account some error handling, and keep your code clean and
organized.

Create a README that documents the assumptions and decisions that you have
made in designing the architecture of your application.

Please send us a zip file of the code when you’re done. Thank you!