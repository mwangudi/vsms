<template>
	
	<modal-layouts name="viewRecord" id="viewRecord" @keydown.esc="clearModal" @click.left="clearModal">
		
		<template slot="heading">View Record</template>

		<template slot="main">
			<table class="table">
				<thead>
					<tr class="text-center">
						<th style="display:none">ID</th>
						<th>Visitor Names</th>
						<th>ID Number</th>
						<th>Phone Number</th>
						<th>Email Address</th>
					</tr>
				</thead>
				<tbody>
					<tr class="text-center">
						<th style="display:none" v-text="viewRec.id" value="viewRec.id" v-model="record.visitor_id"></th>
						<td v-text="viewRec.names"></td>
						<td v-text="viewRec.id_number"></td>
						<td v-text="viewRec.phone_number"></td>
						<td v-text="viewRec.email"></td>
					</tr>
				</tbody>
			</table> <hr />

			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label for="host_id"> Select Host </label>
						<v-select v-model="record.host_id" :options="hosts" item-value="hosts.value" :placeholder="'Select a Host'" ></v-select>
						<span v-if="errors.host_id" class="text-danger">
							<small v-text="errors.host_id[0]"></small>
						</span>
					</div>
				</div>

				<input type="hidden" name="visitor_id" class="form-control" :value="viewRec.id">
				
				<div class="col-md-6">
					<div class="form-group">
						<label for="purpose_of_visit"> Purpose of Visit </label>
						<input type="text" 
							   name="purpose_of_visit" 
							   id="purpose_of_visit" 
							   class="form-control" 
							   placeholder="Indicate Purpose of Visit" 
							   v-model="record.purpose_of_visit"
							   @keydown="delete errors.purpose_of_visit">

						<span v-if="errors.purpose_of_visit" class="text-danger">
							<small v-text="errors.purpose_of_visit[0]"></small>
						</span>
					</div>
				</div>

			</div>
		</template>

		<template slot="footer">
			<button type="button" class="btn btn-outline-secondary" @click="clearModal" data-dismiss="modal"> <i class="fa fa-close"></i> Close </button>
			<button type="submit" class="btn btn-outline-primary" @click="saveRecord"> <i class="fa fa-check-circle"></i> Check-In </button>
		</template>

	</modal-layouts>

</template>

<script>
	import ModalLayouts from '@/modules/shared/ModalLayouts'
	import vSelect from 'vue-select'

	export default {
		props: ['viewRec'],

		data() {
			return {
				record: {},
				errors: [],
				hosts: [],
			    host_id: {},
			    visitor_id: {},
			}
		},

		components: { ModalLayouts, vSelect },

		methods: {
			saveRecord() {
				const { record, viewRec } = this
				const recordToPost = this.returnItemId({...record}, ['host_id']);
				axios.post('/checkins', {...recordToPost, visitor_id:viewRec.id})
					.then(data => {
						this.$emit('recordAdded', data);

						toast({
						  type: 'success',
						  title: 'Visitor Checked in successfully!'
						})

						this.record = {};
						$('#viewRecord').modal('hide');
					})
					.catch(error => this.errors = error.response.data.errors)
			},

			clearModal() {
				this.errors = [];
				this.record = {};
			},

			returnItemId(parent, itemsToFilter) {
				itemsToFilter.map(item => {
					parent[item] = parent[item].value;
				})
				return parent;
			}
		},

		created() {
		    //get hosts
		    axios.get('/hosts')
		    .then(response => { 
		    	this.hosts = response.data.data.map(host => {
		    		host.label = host.host_name;
		    		host.value = host.id;
		    		return host;
				})
		    	//console.log('host data ', this.host, response)
			})
		    .catch(error => { console.log(error) }) 
    	}
	};
</script>