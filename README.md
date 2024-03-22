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

## Auth routes
| URL path                            | HTTP Method   | Response           | Action                  | Protected |
| :----------------------------------:| :-----------: | :----------------: | :---------------------: | :-------: |
| /api/auth/signup                    | POST          | {message, newUser} | Create a new user       |    ❌     |
| /api/auth/login                     | POST          | {token}            | Log user in             |    ❌     |
| /api/auth/getProfile                | POST          | {loggedUser}       | Get Logged User         |    ✅     |


### Cases
| URL path                            | Method  | Response               | Action                  | Protected |
| :----------------------------------:| :-----: | :--------------------: | :---------------------: | :-------: |
| /api/cases/getAll                   | GET     | [cases]                |  Get all cases          |    ✅     |
| /api/cases/getOne/:case_id          | GET     | {case}                 |  Get one case           |    ✅     |
| /api/cases/create                   | POST    | {message, newCase}     |  Create a new case      |    ✅     |
| /api/cases/changeStatus/:case_id    | PUT     | {message, updatedCase} |  Edit case status       |    ✅     |

  

### Users  
| URL path                            | Method  | Response               | Action                  | Protected |
| :----------------------------------:| :-----: | :--------------------: | :---------------------: | :-------: |
| /api/users/edit                     | PUT     | {message, updatedUser} |  Edit a user            |    ✅     |
| /api/users/remove                   | DELETE  | {message}              |  Remove a user          |    ✅      |

  
### Schools  
| URL path                                               | Method  | Response          | Action                                   | Protected |
| :-----------------------------------------------------:| :-----: | :---------------: | :--------------------------------------: | :-------: |
| /api/schools/getAll                                    | GET     | [schools]         |  Get all schools                         |    ❌     |
| /api/schools/getOnePrivate/:school_id                  | GET     | {school}          |  Get one school with private info        |    ✅     |
  

### Professionals  
| URL path                                               | Method  | Response          | Action                                   | Protected |
| :-----------------------------------------------------:| :-----: | :---------------: | :--------------------------------------: | :-------: |
| /api/professionals/getAll                              | GET     | [professionals]   |  Get all professionals                   |    ❌     |
| /api/professionals/getOnePrivate/:professional_id      | GET     | {professional}    |  Get one professional with private info  |    ✅     |
