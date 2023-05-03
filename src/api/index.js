import Vue from 'vue';

export const postLogin = ({
  email,
  password
}) => {
  const req = Vue.http.post('api/login', {
    email,
    password
  });
  return req;
};

export const getCheckedInVisitors = () => {
  const req = Vue.http.get('api/checkins');
  return req;
};

export const postNewCheckin = ({
  id_number,
  names,
  host_id,
  purpose_of_visit
}) => {
  const req = Vue.http.post('api/checkins', {
    id_number,
    names,
    host_id,
    purpose_of_visit
  });
  return req;
};

// Check out
export const postCheckoutVisitor = ({
  id
}) => {

  const req = Vue.http.put(`api/checkout/${id}`, {
    id
  });
  return req;
};

//get hosts
export const getHosts = () => {
  const req = Vue.http.get('api/hosts');
  return req;
};

// Search Visitor
export const postSearchVisitor = ({
  term
}) => {
  const req = Vue.http.get(`api/visitors/${term}`, {
    term
  });
  return req;
};

export default {
  postLogin,
  getCheckedInVisitors,
  postNewCheckin,
  getHosts,
  postCheckoutVisitor,
  postSearchVisitor
};