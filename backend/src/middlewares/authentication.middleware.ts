import { Injectable, NestMiddleware } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import firebaseServiceAccount from '../utils/constants/firebase';
import { NextFunction } from 'express';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private app: firebase.app.App;

  constructor() {
    this.app = firebase.initializeApp({
      credential: firebase.credential.cert(firebaseServiceAccount),
    });
  }

  // send uid of token won't work
  use(req: any, res: any, next: NextFunction) {
    const token = req.headers.authorization;
    if (token !== null && token !== '') {
      this.app
        .auth()
        .verifyIdToken(token.replace('Bearer', ''))
        .then((user) => {
          req.user = { uid: user.uid };
        })
        .catch((err) => {
          //res.status(403).json({ message: Errors.ACCESS_DENIED });
          console.log(err.message);
        });
    }
    next();
  }
}
