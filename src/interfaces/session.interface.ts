import { UserRole } from 'src/enums/user-role.enum';

export interface Session {
  id: number;
  role: UserRole;
}
