const intialStore = {
  contacts: [],
  contactDetail: {},
  notif: {
    type: '',
    message: '',
    description: ''
  }
};

export const ContactReducer = (state = intialStore, { type, payload }) => {
  switch (type) {
    case 'SET_CONTACTS':
      return {
        ...state,
        contacts: payload,
      };
    case 'SET_CONTACT_DETAIL':
      return {
        ...state,
        contactDetail: payload,
      };
    case 'SET_NOTIFICATION':
      return {
        ...state,
        notif: payload,
      };
    default:
      return state;
  }
};