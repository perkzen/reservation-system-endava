<p align="center">
<img style="display: block;margin-left: auto;margin-right: auto;" src="https://user-images.githubusercontent.com/78727019/168024641-ef9488f8-f094-4b52-85b4-d2cbf7e68d5d.png" width="146.5" height="50">
</p>

# Seat reservation system
This is a seat reservation web application for company Endava. Where you can dynamically choose your workspace or reserve it for a few days in advance. It's simple and easy to use. Save time and optimize workflow with our app.

## Getting Started
First you need to install all necessary packages on the frontend and backend:
```
cd frontend
npm i

cd backend
npm i
```
After that create a .env file in the frontend folder, it should look something like this.
```
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
After that create a .env file in the backend folder, it should look something like this.
```
 DATABASE_URI=mongodb+srv://<username>:<password>@cluster0.g1ftw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```
To start the application you need to run the frontend and backend server with the following commands.
```
cd frontend
npm dev

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
