const axios = require('axios');
const apiUrl = "https://simple-contact-crud.herokuapp.com"

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const multipartHeaders = {
  Accept: 'application/json',
  'Content-Type': 'multipart/form-data',
};

const Axios = {
  Get: ({ params, query }) => {
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: 'GET',
          url: `${apiUrl}/${params}?${query}`,
          headers: {
            ...defaultHeaders,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log('Request canceled', error);
          } else {
            reject(error);
          }
        });
    });
  },

  Delete: ({ params, query }) => {
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: 'DELETE',
          url: `${apiUrl}/${params}?${query}`,
          headers: {
            ...defaultHeaders,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log('Request canceled', error);
          } else {
            reject(error);
          }
        });
    });
  },

  Post: ({ params, data, cancelToken = '' }) => {
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: 'POST',
          url: `${apiUrl}/${params}`,
          data: data,
          headers: {
            ...defaultHeaders,
          },
          cancelToken: cancelToken,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log('Request canceled', error);
          } else {
            reject(error);
          }
        });
    });
  },

  Put: ({ params, data, cancelToken = '' }) => {
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: 'PUT',
          url: `${apiUrl}/${params}`,
          data: data,
          headers: {
            ...defaultHeaders,
          },
          cancelToken: cancelToken,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log('axios error', error);
          if (axios.isCancel(error)) {
            console.log('Request canceled', error);
          } else {
            reject(error);
          }
        });
    });
  },

  PostFormData: ({ url, data, cancelToken }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data, {
          headers: {
            ...defaultHeaders,
          },
          cancelToken: cancelToken,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            // console.log('Request canceled', error);
          } else {
            reject(error);
          }
        });
    });
  },

  PostMultipart: ({ url, data, cancelToken }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data, {
          headers: {
            ...multipartHeaders,
          },
          cancelToken: cancelToken,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            // console.log('Request canceled', error);
          } else {
            reject(error);
          }
        });
    });
  },
};

export default Axios;