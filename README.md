# appstem project
**Assumptions and Decisions**

In this project, webpages are referred to as "articles". The design follows a simple Model-View-Controller (MVC) architecture, where the model contains both job and article information. A future improvement would be to separate these entities, both within the model/app structure and in the database, for clearer data management and operational workflows.

The routes are made to define the API and embody REST methods that are utilized. They invoke the controller, which is manages HTTP requests and responses. The controller then calls service methods, which are responsible for executing business logic such as enqueuing a job into the job queue.

The job queue is instantiated as a singleton and is added to every time a job is added. In order to emulate longer running processes, a timeout is added to the jobs. 

For the database selection, MongoDB was chosen attributed to our straightforward schema requirements. Mongoose (ORM) is used for database updates and operations.

Swagger Documentation is available at `/api-docs/`.
	Note: Don't use the Authorization button (bug), use apiKey field

The Api Key is `API_KEY_3c6ad820-2b21-4172-96cf-a4a04eb162ea`

Github: https://github.com/patrickjk94/appstemproject

Steps to run 
```
1. Install mongodb locally
2. Change into root directory of project 
    a. npm install 
    b. npm run start
3. Go to http://localhost:3000/api-docs
```

Some Curls to hit endpoints from terminal 
```
curl -X 'GET' \
  'http://localhost:3000/api/save-url/<url>' \
  -H 'accept: application/json' \
  -H 'x-api-key: API_KEY_3c6ad820-2b21-4172-96cf-a4a04eb162ea'

curl -X 'GET' \
  'http://localhost:3000/api/status/<job_id>' \
  -H 'accept: application/json' \
  -H 'x-api-key: API_KEY_3c6ad820-2b21-4172-96cf-a4a04eb162ea'
```

Steps to run MongoDB locally 
```
xcode-select --install
brew tap mongodb/brew
brew update
brew install mongodb-community@7.0
brew services start mongodb-community@7.0

brew services stop mongodb-community@7.0
```

TODO: 
- Separate Job and Articles in Models and Database
- Add unit, integration testing, can use something like JEST
- Have the Queue query the database on startup, to process unfinished jobs 
- Add in a Linter like esLint
- Make job_status into an ENUM (Maybe a constants file)
- Maybe refactor to use typescript
- Fix bug where Authorize button isn't working in Swagger