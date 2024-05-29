import { ValidRoles } from '@/modules/auth/constants/valid-roles';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';

interface SeedUser extends CreateUserDto {
  roles?: ValidRoles[];
}

export const usersInitialData: SeedUser[] = [
  {
    email: 'john.doe@example.com',
    password: 'Str0ngP@ssword!',
    fullName: 'John Doe',
    roles: ['admin'],
  },
  {
    email: 'jane.smith@example.com',
    password: 'An0th3rStr0ngP@ss!',
    fullName: 'Jane Smith',
  },
  {
    email: 'alice.johnson@example.com',
    password: 'Y3tAn0th3rP@ss!',
    fullName: 'Alice Johnson',
    roles: ['superadmin'],
  },
  {
    email: 'bob.brown@example.com',
    password: 'Sup3rStr0ngP@ss!',
    fullName: 'Bob Brown',
  },
  {
    email: 'charlie.davis@example.com',
    password: 'V3ryStr0ngP@ss!',
    fullName: 'Charlie Davis',
  },
];
