// assets
import { Message } from 'iconsax-react';

// icons
const icons = {
  contactMessages: Message
};

// ==============================|| MENU ITEMS - CONTACT MESSAGES ||============================== //

const contactMessages = {
  id: 'group-contact-messages',
  title: 'رسائل التواصل',
  type: 'group',
  children: [
    {
      id: 'dashboard/contact-messages',
      title: 'رسائل التواصل',
      type: 'item',
      url: '/dashboard/contact-messages',
      icon: icons.contactMessages
    }
  ]
};

export default contactMessages;
