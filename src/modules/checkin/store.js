import Api from "@/api";

//States
const state = {
  checkinlist: [],
  status: "",
  checkedin: false,
  checkedout: false,
  hosts: [],
  visitor: []
};

//Getters
const getters = {
  checkinRecords: state => state.checkinlist,
  getLoadStatus: state => state.status,
  checkedInStatus: state => state.checkedin,
  hostDetails: state => state.hosts,
  visitorDetails: state => state.visitor,
  checkedOutStatus: state => state.checkedout
};

//Mutations
const mutations = {
  LOAD_CHECKINS_SUCCESS(state, checkinlist) {
    //console.log(' data ', checkinlist)
    state.checkinlist = checkinlist;
    state.status = "checkins loaded";
  },
  LOAD_CHECKINS_ERROR(state) {
    state.status = "unable to load checkins";
    state.checkinlist = "";
  },
  LOAD_HOSTS_SUCCESS(state, hosts) {
    state.status = "hosts loaded";
    state.hosts = hosts;
  },
  LOAD_HOSTS_ERROR(state) {
    state.status = "unable to load hosts";
  },
  LOAD_VISITOR_SUCCESS(state, visitor) {
    state.visitor = visitor;
    state.status = "visitor details loaded";
  },
  LOAD_VISITOR_ERROR(state) {
    state.status = "unable to load visitor details";
  },
  CHECKIN_SUCCESS(state) {
    state.checkedin = true;
  },
  CHECKIN_ERROR(state) {
    state.checkedin = false;
  },
  CHECKOUT_SUCCESS(state) {
    state.checkedout = true;
  },
  CHECKOUT_ERROR(state) {
    state.checkedout = false;
  }
};

//Actions
const actions = {
  loadAllCheckins({
    commit
  }) {
    Api.getCheckedInVisitors()
      .then(resp => {
        commit("LOAD_CHECKINS_SUCCESS", resp.data.data);
      })
      .catch(commit("LOAD_CHECKINS_ERROR"));
  },
  loadHostDetails({
    commit
  }) {
    Api.getHosts()
      .then(resp => {
        commit("LOAD_HOSTS_SUCCESS", resp.body);
      })
      .catch(commit("LOAD_HOSTS_ERROR"));
  },
  checkinVisitor({
    commit
  }, {
    id_number,
    names,
    host_id,
    purpose_of_visit
  }) {
    Api.postNewCheckin({
        id_number,
        names,
        host_id,
        purpose_of_visit
      })
      .then(commit("CHECKIN_SUCCESS"))
      .catch(commit("CHECKIN_ERROR"));
  },
  checkoutVisitor({
    commit
  }, {
    id
  }) {
    Api.postCheckoutVisitor({
        id
      })
      .then(commit("CHECKOUT_SUCCESS"))
      .catch(commit("CHECKOUT_ERROR"));
  },
  searchVisitor({
    commit
  }, {
    term
  }) {
    Api.postSearchVisitor({
        term
      })
      .then(resp => {
        commit("LOAD_VISITOR_SUCCESS", resp.data);
      })
      .catch(commit("LOAD_VISITOR_ERROR"));
  },
};

export default {
  state,
  getters,
  mutations,
  actions
};