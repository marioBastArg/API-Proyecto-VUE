<template>
	<input  ref='inputt' :value='value' :type='type' :name='name' :placeholder="placeholder"  @input="emit">
</template>

<script> 
	export default {
		name: "myInput",
		props: [ 
			"value",
			"placeholder",
			"name",
			"type"

		],
		methods: {
			emit()
			{	
				if (this.type!='file') {
					this.$emit('input', this.$refs.inputt.value);
				}else{
					this.$emit('input', this.$refs.inputt);
				}
			}
		},
	};
</script>

<style scoped>
	input{
		max-width: 100%;
		width: -webkit-fill-available;
		width: -moz-available;
	}
</style>