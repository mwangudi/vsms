<template>
	
	<modal-layouts name="addVisitor" id="addVisitor" @keydown.esc="clearModal" @click.left="clearModal">
		
		<template slot="heading"> Add New Visitor </template>

		<template slot="main">

			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label for="names">Names</label>
						<input type="text" 
							   name="names" 
							   id="names"
							   placeholder="Names" 
							   class="form-control" 
							   v-model="record.names"
							   @keydown="delete errors.names">

						<span v-if="errors.names" class="text-danger">
							<small v-text="errors.names[0]"></small>
						</span>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label for="id_number">ID Number</label>
						<input type="id_number" 
							   name="id_number" 
							   id="id_number" 
							   placeholder="ID Number" 
							   class="form-control" 
							   v-model="record.id_number" 
							   @keydown="delete errors.id_number">

						<span v-if="errors.id_number" class="text-danger">
							<small v-text="errors.id_number[0]"></small>
						</span>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label for="email">E-Mail Address</label>
						<input type="email" name="email" id="email" placeholder="Email" class="form-control" v-model="record.email"  @keydown="delete errors.email">
						<span v-if="errors.email" class="text-danger">
							<small v-text="errors.email[0]"></small>
						</span>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label for="phone_number">Phone Number</label>
						<input type="text" name="phone_number" id="phone_number" placeholder="Phonenumber" class="form-control" v-model="record.phone_number" @keydown="delete errors.phone_number">
						<span v-if="errors.phone_number" class="text-danger">
							<small v-text="errors.phone_number[0]"></small>
						</span>
					</div>
				</div> 
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label for="type_id">Visitor Type </label>
						<v-select v-model="record.type_id" :options="typeitems" item-value="value" :placeholder="'Choose Visitor Type'"></v-select>
						<span v-if="errors.type_id" class="text-danger">
							<small v-text="errors.type_id[0]"></small>
						</span>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label for="gender_id">Gender</label>
						<v-select v-model="record.gender_id" :options="genderitems" item-value="value" :placeholder="'Choose Gender'" ></v-select>
						<span v-if="errors.gender_id" class="text-danger">
							<small v-text="errors.gender_id[0]"></small>
						</span>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="checkbox">
						<label>
							<input type="checkbox" v-model="record.checked"> Check-In This Visitor 
						</label>
					</div>
				</div>
			</div>
			<div class="row" v-if="record.checked">
				<div class="col-md-6">
					<div class="form-group">
						<label for="host_id"> Select Host </label>
						<v-select v-model="record.host_id" :options="hosts" :placeholder="'Select a Host'" ></v-select>
						<span v-if="errors.host_id" class="text-danger">
							<small v-text="errors.host_id[0]"></small>
						</span>
					</div>
				</div>
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
			
			<button type="button"  class="btn btn-outline-secondary" @click="clearModal" data-dismiss="modal"> <i class="fa fa-close"></i> Close </button>
			<button type="submit" class="btn btn-outline-primary" @click="saveRecord"> <i class="fa fa-check-circle"></i> Add Visitor </button>

		</template>

	</modal-layouts>

</template>

<script>
	import ModalLayouts from '@/modules/shared/components/ModalLayouts'
	import vSelect from 'vue-select'
	export default {

		data() {
			return {
				record: {
					gender_id: {},
				    type_id: {},
				    checked: false,
				    host_id: {}
				},
				errors: [],
				genderitems: [
			      {value: '1', label:'Male'},
			      {value: '2', label:'Female'},
			    ],
			    typeitems: [
			      {value: '1', label:'General Visitor'},
			      {value: '2', label:'Friend'},
			    ]
			}
		},

		components: { ModalLayouts, vSelect },

		methods: {
			saveRecord() {
				const { record } = this
				console.log(record)
				const recordToPost = this.returnItemId({...record}, ['gender_id', 'type_id', 'host_id']);
				axios.post('/visitors', recordToPost)
					.then(data => {
						this.$emit('recordAdded', data);

						toast({
						  type: 'success',
						  title: 'New visitor added successfully!'
						})

						this.record = {};
						$('#addVisitor').modal('hide');
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