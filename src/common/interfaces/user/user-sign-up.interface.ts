import { UserProvider } from '@shared/models/user-provider.model';

export interface UserSignUpInterface {
  email: string;
  password?: string;
  userProviders?: UserProvider[];

  // Profile
  firstName: string;
  lastName: string;
}
