// assets
import { Mobile, Category } from 'iconsax-react';

// icons
const icons = {
  applications: Mobile,
  categories: Category
};

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const applications = {
  id: 'group-applications',
  title: 'التطبيقات',
  type: 'group',
  children: [
    {
      id: 'dashboard/categories',
      title: 'تصنيفات التطبيقات',
      type: 'item',
      url: '/dashboard/categories',
      icon: icons.categories
    },
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
