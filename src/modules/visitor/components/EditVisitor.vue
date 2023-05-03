<template>
	
	<modal-layouts name="editRecord" id="editRecord">
		
		<template slot="heading">Edit Visitor Details </template>

		<template slot="main">

			<div class="row">
				<div class="col-md-4">
					<div class="form-group">
						<label for="names">Names</label>
						<input type="text" 
							   name="names" 
							   id="names" 
							   class="form-control" 
							   v-model="editRec.names"
							   @keydown="delete errors.names">
						<span v-if="errors.names" class="text-danger">
							<small v-text="errors.names[0]"></small>
						</span>
					</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<label for="email">Email Address</label>

						<input type="email" 
							   name="email" 
							   id="email" 
							   class="form-control" 
							   v-model="editRec.email"
							   @keydown="delete errors.email"
							   disabled>

						<span v-if="errors.email" class="text-danger">
							<small v-text="errors.email[0]"></small>
						</span>
					</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<label for="phone_number">Phone Number</label>

						<input type="text" 
							   name="phone_number" 
							   id="phone_number" 
							   class="form-control" 
							   v-model="editRec.phone_number"
							   @keydown="delete errors.phone_number">

						<span v-if="errors.phone_number" class="text-danger">
							<small v-text="errors.phone_number[0]"></small>
						</span>
					</div>
				</div>
			</div>

		</template>

		<template slot="footer">
			<button type="button" 
					class="btn btn-outline-secondary" 
					@click="clearModal" 
					data-dismiss="modal"> <i class="fa fa-close"></i> Close</button>

			<button type="submit" 
					class="btn btn-outline-primary" 
					@click="updateRecord"> <i class="fa fa-check-circle"></i> Save Changes </button>
		</template>

	</modal-layouts>

</template>

<script>
	import ModalLayouts from '@/modules/shared/components/ModalLayouts'
	export default {
		props: ['editRec'],

		data() {
			return {
				errors: [],
			}
		},

		components: { ModalLayouts },

		methods: {
			updateRecord() {
				axios.put(`/visitors/${this.editRec.id}`, this.editRec)
					.then(response => {
						this.$emit('recordUpdated', response);
						
						toast({
						  type: 'success',
						  title: 'Visitor has been updated successfully!'
						})

						$('#editRecord').modal('hide');
					})
					.catch(error => this.errors = error.response.data.errors)
			},

			clearModal() {
				this.errors = [];
			}
		}
	};
</script>