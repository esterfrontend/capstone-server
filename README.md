# ACTÚO CONTRA EL BULLYING: 

"Actúo contra el bullying" is a web application that helps schools take action against cases of bullying. Students, teachers or external people can anonymously report an incident. The school will be notified, and a professional will be assigned to study and take measures along with the school.

## Deployed Application:

**Built using MERN: Mongo, Express, React and Node.**

1. Install the dependencies

```bash
npm install
```

2. Create a .env file in the root folder and add the following environment variables:

```bash
PORT=3000
MONGODB_URI="mongodb://127.0.0.1:27017/actuo-bullying"
```

3. Run the server to develop locally:

```bash
npm run dev
```


# API Routes


### Cases
| URL path                   | HTTP Method     | Response              | Action                  |
| :------------------------: | :-------------: | :-------------------: | :---------------------: | 
| /api/cases/getOne/:case_id | GET             | {case}                |  Get one user case      |
| /api/cases/create          | POST            | {createdCase}         |  Create a new case      |
| /api/cases/edit/:case_id   | PUT             | {editedCase}          |  Edit a case            |
| /api/cases/changeCaseStatus/:case_id | PUT   | {editedCase}          |  Edit case state        |
  

### Users  
| URL path                   | HTTP Method     | Response              | Action                  |
| :------------------------: | :-------------: | :-------------------: | :---------------------: |
| /api/users                 | GET             | [users]               |  Get all users          |
| /api/users/getOneUser      | GET             | {user}                |  Get one user           |
| /api/users/getAllMyCases   | GET             | {cases}               |  Get all user cases     |
| /api/users/editUser        | PUT             | {user}                |  Edit a user            |
| /api/users/remove          | DELETE          | {message}             |  Remove a user          |


## Auth routes
| URL path                   | HTTP Method     | Response              | Action                  |
| :-------------------------:| :-------------: | :--------------------:| :----------------------:|
| /api/auth/signup           | POST            | {createdUser}         | Create a new user       |
| /api/auth/login            | POST            | {token}               | Log user in             |
| /api/auth/verify           | POST            | {loggedUser}          | Get Logged User         |


  
<!-- ### Schools  
| URL path                   | HTTP Method     | Response              | Action                  |
| :------------------------: | :-------------: | :-------------------: | :---------------------: | 
| /api/schools               | GET             | [schools]             |  Get all schools        |
| /api/schools/getOne/:school_id    | GET             | {school}              |  Get one school         |
  

### Professionals  
| URL path                   | HTTP Method     | Response              | Action                  |
| :------------------------: | :-------------: | :-------------------: | :---------------------: |
| /api/professionals         | GET             | [professionals]       |  Get all professionals  |
| /api/professionals/getOne/:id| GET           | {professional}        |  Get one professional   | -->
