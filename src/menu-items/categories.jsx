// assets
import { Category } from 'iconsax-react';

// icons
const icons = {
  categories: Category
};

// ==============================|| MENU ITEMS - CATEGORIES ||============================== //

const categories = {
  id: 'group-categories',
  title: 'تصنيفات التطبيقات',
  type: 'group',
  children: [
    {
      id: 'dashboard/categories',
      title: 'تصنيفات التطبيقات',
      type: 'item',
      url: '/dashboard/categories',
      icon: icons.categories
    }
  ]
};

export default categories;
