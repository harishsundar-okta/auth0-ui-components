import { CoreClientInterface } from '../types';
import { MFAController } from './mfa/mfa-controller';

/**
 * Service that handles all authentication-related API calls.
 * Acts as a central hub for all the different authentication controllers.
 */
export class AuthenticationAPIService {
  public readonly mfa: MFAController;

  constructor(coreClient: CoreClientInterface) {
    this.mfa = new MFAController(coreClient);
  }
}
