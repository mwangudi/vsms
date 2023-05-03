<template>
  <modal-layouts
    name="addVisitorCheckin"
    id="addVisitorCheckin"
    @keydown.esc="closeCheckinModal"
    @click.left="closeCheckinModal"
    v-if="isCheckinModalOpen"
  >
    <template slot="heading">Check-In Visitor</template>
    <template slot="main">
      <form>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <input
                type="text"
                v-model="postItems.id_number"
                name="id_number"
                placeholder="ID Number"
                class="form-control"
                @keyup="watchingRecord"
                :class="{ 'is-invalid': !isFieldValid('id_number') }"
              />
              <div
                v-show="!isFieldValid('id_number')"
                class="invalid-feedback"
              >ID Number is required</div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input
                type="text"
                v-model="postItems.names"
                name="names"
                placeholder="Visitor Names"
                class="form-control"
                :class="{ 'is-invalid': !isFieldValid('names') }"
              />
              <div
                v-show="!isFieldValid('names')"
                class="invalid-feedback"
              >Visitor names is required</div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <v-select
                v-model="postItems.host_id"
                :options="hostOptions"
                :placeholder="'Select a Host'"
                :class="{ 'is-invalid': !isFieldValid('host_id') }"
              ></v-select>
              <div v-show="!isFieldValid('host_id')" class="invalid-feedback">Please Select Host</div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input
                type="text"
                v-model="postItems.purpose_of_visit"
                name="purpose_of_visit"
                placeholder="Purpose of Visit"
                class="form-control"
                :class="{ 'is-invalid': !isFieldValid('purpose_of_visit') }"
              />
              <div
                v-show="!isFieldValid('purpose_of_visit')"
                class="invalid-feedback"
              >Purpose of Visit is required</div>
            </div>
          </div>
        </div>
      </form>
    </template>
    <template slot="footer">
      <button type="button" class="btn btn-outline-secondary" @click="closeCheckinModal">
        <i class="fa fa-close"></i> Close
      </button>
      <button type="submit" class="btn btn-outline-primary" @click="submitted">
        <i class="fa fa-check-circle"></i> CheckIn
      </button>
    </template>
  </modal-layouts>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ModalLayouts from "@/modules/shared/components/ModalLayouts";
import vSelect from "vue-select";

export default {
  components: { ModalLayouts, vSelect },
  props: {
    isCheckinModalOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      postItems: {
        id_number: "",
        host_id: "",
        names: "",
        purpose_of_visit: ""
      },
      postItemsValidations: {
        id_number: false,
        host_id: false,
        names: false,
        purpose_of_visit: false,
        isFormSubmiting: false
      },
      visitor: {},
      watchRecord: {}
    };
  },
  watch: {
    record: {
      handler: "watchingRecord",
      deep: true
    },
    postItems: {
      handler: "watchingPostItems",
      deep: true
    }
  },
  computed: {
    ...mapGetters({ hosts: "hostDetails" }),
    hostOptions() {
      //const hosts = this.hosts;
      return this.hosts.map(host => {
        host.label = host.host_name;
        host.value = host.id;
        return host;
      });
    }
  },
  created() {
    //get hosts
    this.loadHostDetails();
  },

  methods: {
    ...mapActions([
      "loadHostDetails",
      "checkinVisitor",
      "loadAllCheckins",
      "searchVisitor"
    ]),

    submitted() {
      this.postItemsValidations.isFormSubmiting = true;

      if (!this.isFormValid()) {
        return;
      }

      const { postItems } = this;
      const filteredItems = this.returnItemId({ ...postItems }, ["host_id"]);
      this.checkinVisitor(filteredItems)
        .then(response => {
          this.loadAllCheckins(response);
        })
        .then(() => {
          this.closeCheckinModal();
          this.postItemsValidations.isFormSubmiting = false;
        });
    },

    closeCheckinModal() {
      this.postItems = {};
      this.postItemsValidations.isFormSubmiting = false;
      this.$emit("closeCheckinModal");
    },

    //Return host_id from post array
    returnItemId(parent, itemsToFilter) {
      itemsToFilter.map(item => {
        parent[item] = parent[item].value;
      });
      return parent;
    },

    watchingRecord() {
      const { postItems, watchRecord } = this;
      if (
        JSON.stringify({ ...postItems }) !== JSON.stringify({ ...watchRecord })
      ) {
        if (postItems.id_number !== watchRecord.id_number) {
          const term = postItems.id_number;
          this.searchVisitor({ term });
        }
        this.watchRecord = { ...postItems };
      }
    },

    watchingPostItems() {
      const validObject = this.postItemsValidations;
      Object.keys(this.postItemsValidations).forEach(field => {
        const validObject = this.postItemsValidations;
        validObject[field] = !!validObject[field] || !!this.postItems[field];
      });
      this.postItemsValidations = validObject;
    },

    isFieldValid(fieldName) {
      return (
        (!this.postItemsValidations[fieldName] &&
          !this.postItemsValidations.isFormSubmiting) ||
        (!!this.postItemsValidations[fieldName] && !!this.postItems[fieldName])
      );
    },

    isFormValid() {
      return Object.keys(this.postItems).reduce(
        (sum, fieldName) => sum && this.isFieldValid(fieldName),
        true
      );
    }
  }
};
</script>