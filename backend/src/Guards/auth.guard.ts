import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as firebase from 'firebase-admin';
import firebaseServiceAccount from '../utils/constants/firebase';
import { Errors } from '../utils/constants/errors';

@Injectable()
export class AuthGuard implements CanActivate {
  private app = firebase.initializeApp({
    credential: firebase.credential.cert(firebaseServiceAccount),
  });

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeaders = request.headers.authorization;
    if (authHeaders === null) {
      throw new HttpException(
        Errors.AUTHORIZATION_HEADERS_MISSING,
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (authHeaders === '') {
      throw new HttpException(Errors.TOKEN_MISSING, HttpStatus.UNAUTHORIZED);
    }
    try {
      const token = (authHeaders as string).split(' ')[1];
      const decodedToken = await this.app.auth().verifyIdToken(token);
      request.user = { uid: decodedToken.uid };
    } catch (e) {
      throw new HttpException(Errors.ACCESS_DENIED, HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
