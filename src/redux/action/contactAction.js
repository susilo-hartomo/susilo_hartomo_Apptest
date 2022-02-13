import Axios from '../../services/Axios';

export const getContacts = () => {
  return async (dispatch) => {
    try {
      const params = `contact`;
      const query = '';
      const response = await Axios.Get({
        params,
        query,
      });
      if (response.data) {
        dispatch({
          type: 'SET_CONTACTS',
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getContactById = (id) => {
  return async (dispatch) => {
    try {
      const params = `contact/${id}`;
      const query = '';
      const response = await Axios.Get({
        params,
        query,
      });
      if (response.data) {
        dispatch({
          type: 'SET_CONTACT_DETAIL',
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const setContactDetail = (news) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_CONTACT_DETAIL',
      payload: news,
    });
  };
};

export const postContact = (data) => {
  return async (dispatch) => {
    try {
      const params = `contact`;
      const response = await Axios.Post({
        params,
        data,
      });
      if (response.message === 'contact saved') {
        const resp = await Axios.Get({ params });
        if (resp.data) {
          dispatch({
            type: 'SET_CONTACTS',
            payload: resp.data,
          });
          dispatch({
            type: 'SET_NOTIFICATION',
            payload: {
              type: 'success',
              message: 'Succusfully add data',
              description: `Data ${data.firstName} ${data.lastName} with age ${data.age} success add `
            }
          })
        }
      } else {
        dispatch({
          type: 'SET_NOTIFICATION',
          payload: {
            type: 'error',
            message: 'Error add data',
            description: `Please try again add Data ${data.firstName} ${data.lastName} with age ${data.age}`
          }
        })
      }
    } catch (error) {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          type: 'error',
          message: 'Error add data',
          description: `${error.message}`
        }
      })
      console.log(error);
    }
  };
};

export const putContact = (id, data) => {
  return async (dispatch) => {
    try {
      const params = `contact/${id}`;
      const response = await Axios.Put({
        params,
        data,
      });
      if (response.message === 'Contact edited') {
        const resp = await Axios.Get({ params: 'contact' });
        if (resp.data) {
          dispatch({
            type: 'SET_CONTACTS',
            payload: resp.data,
          });
          dispatch({
            type: 'SET_NOTIFICATION',
            payload: {
              type: 'success',
              message: 'Succusfully update data',
              description: `Data ${data.firstName} ${data.lastName} with age ${data.age} success edited `
            }
          })
        }
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          type: 'error',
          message: 'error add data',
          description: `${error.message}`
        }
      })
    }
  };
};

export const resetNotif = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: {
        type: '',
        message: '',
        description: ""
      }
    })
  }
}

export const deleteContact = (id, data) => {
  return async (dispatch) => {
    try {
      const params = `contact/${id}`;
      const query = ``;
      const response = await Axios.Delete({
        params: params,
        query,
      });
      if (response.message === 'OK') {
        const resp = await Axios.Get({ params: 'contact' });
        if (resp.data) {
          dispatch({
            type: 'SET_CONTACTS',
            payload: resp.data,
          });
          dispatch({
            type: 'SET_NOTIFICATION',
            payload: {
              type: 'success',
              message: 'Succusfully delete data',
              description: `Data ${data.firstName} ${data.lastName} with age ${data.age} success add `
            }
          })
        }
      } else {
        dispatch({
          type: 'SET_NOTIFICATION',
          payload: {
            type: 'error',
            message: 'Error delete data',
            description: `Please try again, Data ${data.firstName} ${data.lastName} with age ${data.age} undeleted `
          }
        })
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          type: 'error',
          message: 'error delete data',
          description: `${error.message}`
        }
      })
    }
  };
};

export const getFilterContact = (filterNews) => {
  return async (dispatch) => {
    const params = `api/news`;
    const query = `tone=${filterNews.ton}&media=${filterNews.med}&company=${filterNews.comp}&startDate=${filterNews.startDate}&endDate=${filterNews.endDate}`;
    const response = await Axios.Get({
      params: params,
      query,
    });
    console.log('response: ', response);
    if (response.code === 'OK') {
      dispatch({
        type: 'SET_FILTER_NEWS',
        payload: { data: response.data.news, filterNews },
      });
    }
  };
};