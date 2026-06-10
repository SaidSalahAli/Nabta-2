// assets
import { People } from 'iconsax-react';

// icons
const icons = {
  users: People
};

// ==============================|| MENU ITEMS - USERS ||============================== //

const users = {
  id: 'group-users',
  title: 'المستخدمين',
  type: 'group',
  children: [
    {
      id: 'dashboard/users',
      title: 'المستخدمين المسجلين',
      type: 'item',
      url: '/dashboard/users',
      icon: icons.users
    }
  ]
};

export default users;
