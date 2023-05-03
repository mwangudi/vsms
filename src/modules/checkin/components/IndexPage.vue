<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card card-default">
          <div class="card-header bg-primary text-white">
            All Checked In Visitors Today
            <button
              class="btn btn-danger btn-sm pull-right"
              @click="isCheckinModalOpen = true"
            >
              <i class="fa fa-plus"></i> Check-In Visitor
            </button>
          </div>

          <div class="card-body overflow-scroll">
            <table class="table">
              <thead>
                <tr class="text-center">
                  <th style="display:none">#</th>
                  <th>Visitor Names</th>
                  <th>Person to See</th>
                  <th>TimeIn</th>
                  <th>TimeOut</th>
                  <th>ID Number</th>
                  <th>Email</th>
                  <th>Reason of visit</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="record in records" v-bind:key="record.id" class="text-center">
                  <th style="display:none" v-text="record.id"></th>
                  <td v-text="record.names"></td>
                  <td v-text="record.host_name"></td>
                  <td v-text="record.timein"></td>
                  <td v-text="record.timeout"></td>
                  <td v-text="record.id_number"></td>
                  <td v-text="record.email"></td>
                  <td v-text="record.purpose_of_visit"></td>
                  <td>
                    <button
                      v-if="record.timeout == null"
                      class="btn btn-outline-danger btn-sm"
                      @click="checkout(record.id)"
                    >
                      <i class="fa fa-check-circle"></i> CheckOut
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-md-4 offset-4 mt-4"></div>
      </div>
    </div>
    <checkin-modal
      :isCheckinModalOpen="isCheckinModalOpen"
      @closeCheckinModal="isCheckinModalOpen = false"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CheckinModal from "./CheckinModal";
export default {
  data() {
    return {
      isCheckinModalOpen: false
    };
  },
  components: { CheckinModal },
  computed: {
    ...mapGetters({
      records: "checkinRecords"
    })
  },
  created() {
    this.loadAllCheckins();
  },
  methods: {
    ...mapActions(["loadAllCheckins", "checkoutVisitor"]),
    checkout(id) {
      this.checkoutVisitor({ id }).then(response => {
        this.loadAllCheckins(response);
      });
    }
  }
};
</script>