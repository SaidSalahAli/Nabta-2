// assets
import { Mobile } from 'iconsax-react';

// icons
const icons = {
  applications: Mobile
};

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const applications = {
  id: 'group-applications',
  title: 'التطبيقات',
  type: 'group',
  children: [
    {
      id: 'dashboard/applications',
      title: 'التطبيقات',
      type: 'item',
      url: '/dashboard/applications',
      icon: icons.applications
    }
  ]
};

export default applications;
