<p align="center">
<img style="display: block;margin-left: auto;margin-right: auto;" src="https://user-images.githubusercontent.com/78727019/168024641-ef9488f8-f094-4b52-85b4-d2cbf7e68d5d.png" width="146.5" height="50">
</p>

# Workspace reservation system
This is a workspace reservation web application for company Endava. Where you can dynamically choose your workspace or reserve it for a few days in advance. It's simple and easy to use. Save time and optimize workflow with our app. 

Application is available at: [Workspace reservation system](https://workspace-reservation-endava.herokuapp.com/sign-in)<br/>
Note: This may not be the final version.

## Getting started with Docker
First you need to have Docker Engine and Docker Compose installed on your computer. Then go to the root directory of the application where `docker-compose.yml` is located and open command line. Write the following command which will build and run our application.
```
docker-compose up
```
After that just enter `http://localhost:3000` in a browser to see the application running.

The API documentaion is available at `http://localhost:8000/swagger`.

## Getting started without Docker
First you need to install all necessary packages on the frontend and backend:
```
cd frontend
npm i

cd backend
npm i
```
After that create a `.env` file in the frontend folder, it should look something like this.
```env
REACT_APP_BE_BASE_URL=http://localhost:8000/api/
REACT_APP_API_VERSION=v1
REACT_APP_FIREBASE_API_KEY=<api-key>
REACT_APP_FIREBASE_AUTH_DOMAIN=reservation-system-endava.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=reservation-system-endava
REACT_APP_FIREBASE_STORAGE_BUCKET=reservation-system-endava.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<messaging-sender-id>
REACT_APP_FIREBASE_APP_ID=<firebase-app-id>
REACT_APP_FIREBASE_MEASUREMENT_ID=<measurement-id>
```
After that create a `.env` file in the backend folder, it should look something like this.
```env
 DATABASE_URI=mongodb+srv://<username>:<password>@cluster0.g1ftw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
 PORT=8000
```

You eill also need to create a file `firebase-service-account.json`  and fill in this information.
```json
{
  "type": "service_account",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": ""
}

```

To start the application you need to run the frontend and backend server with the following commands.
```
cd frontend
npm start

cd backend
npm run start
```

## Project details
NodeJS version: 17.7.2 <br/>
ReactJS version: 18.1.0 <br/>
Typescript version: 4.6.4 <br/>
NestJS version: 8.0.0 <br/>
### Important frontend packages
- redux
- redux-saga
- redux-toolkit
- react-router
- tailwindcss
- typescript
- react-hook-form
- uuid
- axios
- i18next
### Important backend packages
- nestjs
- mongoose
- typescript
