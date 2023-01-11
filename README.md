### School API v1.0
Classroom activities done by both Master and Student.

#### Project overview
School Api provides easy solution for classroom activities for both Master and Students. Master can create a activity and post it in calssroom by master portel then Students can access those activities from classroom by student portal. We also provide white board with basic arithmetic operations for Master. Student can we all the posts posted by the Master in activity logs.

#### Project Requirement 
* node >= v18.12.1

#### Project kick start
1. First clone the project 
2. Open terminal and navigate to the root of the project
3. Copy the .env.sample to .env and update it based on your necessity 
4. Then run the follow commands ***[note: Here, I am using yarn. If you wish you can use something familiar to you]***
	```
	yarn install
	yarn db:migrate
	yarn dev
	```

The graphql development server will starts at http://localhost:8000

#### Available scripts
* ### yarn dev
	* Start a development server
* ### yarn build
	* Compile the files from typescript to javascript
* ### yarn start 
	* Build a project and Start production server
* ### yarn migration:new
	* Generate new migration file
* ### yarn migration:compile
	* Compile the migration files from typescript to javascript ***[Note: Sequelize only works with the javascript files]***
* ### yarn db:migrate
	* Compile the migration files and update (migrate) the migration file to database
* ###  yarn db:migrate:undo
	 * Compile the migration files and revert the last one migration
