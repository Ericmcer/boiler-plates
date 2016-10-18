## Synopsis

A solid boilerplate that can be dropped in to any new application to get front and backend up and running quickly. 

## Features

After setting this up you will have a modern webserver that is extensible and efficient. The only routes included are the authorization routes. The only pre-built front-end stuff is a blank homepage and a React authorization app that handles signup/login. Building out the homepage and styling the auth page will result in a quick and easy boilerplate for a web app.

## Technologies

1. Back-end
  1. Nginx - Serving static files and reverse proxying API calls to Node
  2. NodeJS - handling API routes
  3. MongoDB - Database
  4. Mongoose - Database validation and business Logic
  5. JWT - Authorization and stateless sessions
2. Front-end
  1. React
  2. Bootstrap
  
## File Structure

All in project Folder, these will all be filled out with more models/controllers/routes in a full application

1. controllers - back-end business logic for corresponding models
  1. user.js - user controller
2. models - db models
  1. user.js - schema for user model
3. routes - routes that node api will use
  1. user.js - routes for /user, will call on controllers/user.js to handle db interaction logic
4. middleware - pre API middleware for node
  1.authorize.js - Authorizes user from JWT, adds permission parameter to request object, creates new JWT for logins
5. public - Static content served from here, Nginx is pointed to serve things stored here as open to public/ no permissions.
  1. index.html - homepage
  2. about - folder for a static page
    1. index.html - about page home
    2. about.css - about page styles
  3. auth - folder for a react application page
    1. index.html - Auth page home
    2. auth.css - Auth page css
    3. auth.js - entry point for react app on this page
    4. webpack.config.js - webpack config for auth app
    5. components/ - react class definitions here
    6. dist/ - bundled app js here
    7. routes/ - react router code
    8. utils - react utility classes here
  4. ?? other folders/front-end dependencies can be arranged here in whatever way suits app

## Licensing

wat
