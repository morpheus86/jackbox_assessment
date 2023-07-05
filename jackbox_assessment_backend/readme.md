- Task
    Using the language of your choice, create a backend service that allows for a user sign-up and a generic page to submit and return data.

A user should be able to open a page with form inputs for:

- First Name

- Last Name

- email

- username

- password

These form inputs should be transmitted to a version-able REST API and written to some sort of datastore--filesystem is fine.

An admin should be able to go to the same website which makes a REST call to retrieve any data stored. The data should be formatted per user in a grid or table.

# Run application:
 - npm install to install dependencies
 - npm start to start the backend which is running on localhost8080
 - start frontend application as well
  ** npm install
  ** npm start to run application which is running on localhost3000

# Backend application
  - data is being saved in our local disk since the application is pretty small
  - application has been split into differents file to make it leaner and more modular.
  - point of entry is app.js where most of the config has been done with a logger, bodyparser, headers and wiring of the routes
  - The main function that make the rest calls are in data/user.js which is imported in the router file to be executed

  # Suggestion to improve the application:
   - We could create a timer which would be sent to the frontend whenever we create a token to sync with when we want our token to be expired.
   - We can also create a middleware whch could validate our token to in case is either expired or invalid before making any type of api call requested by the users.
   This middleware will check for authorization and either throw an error or validate bfre the callback function get called.
   - We can also write a more robust validation check for the data in order to check every single character being entered when signing up and when logging in. The validation rules can be sent to the application as a get request as soon as the application load so we can compare our input against it before any type of post request to the backend.

# The front end there are a lot of things that can be improved
  - The UI for once can be more tailored in order to have a better experience
  - The navigation bar is just a generic navigation bar which could be updated whenever a user login to show the name of the user, the status of the session where you could log out if logged in and remove the token in the local storage that we stored
  - If this application was a much larger application, I would have considered adding a global storage that will take care of the state where we could access any data we need in order to do what we need in the application.
  - This storage will take care of updating, making rest call to the backend etc...

NB:
- All credentials as well as links for the rest api calls would not be displayed if this was a real app. I wanted to make clear that the credentials as well as links would either be in process.env file which we would ommit when pushing to github or in a json file which would be ommited as well

- There are a lot of upgrade that could be made on the front end. Session can be implemented, A more clean error handling can be implemented using a global state to show the user if they are missing anything while filling out the form. We can also add a timer to make sure the user is not always logging in, some type of persistent log in for a time being. User will be logged out whenever the timer has passed. The Navbar can also be made a little cleaner with a global state to show which user is logged in etc..
- Route guarding can be implemented as well to protect user and admin data.

<!-- Login instructions -->
## Admin=> test@test.com, password: aaaaaaa
## any other user => create a user with at least 6 characters in the password.

## Run the backend and the front end simultaneously by running npm install first to install the dependencies, then npm start to start the application (both applications), head to localhost3000,
  - Click on Sign up and if you already created an account click on the bottm to login and enter your informations
