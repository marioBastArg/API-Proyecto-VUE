<template>
	<input  ref="inputt" :value='value'  @input="emit">
</template>

<script> 
		export default {
		name: "myInput",
		props: [ 
			"value"
		],
		methods: {
			emit()
			{
				this.$emit('input', this.$refs.inputt.value)
			}
		},
	};
</script>

<style scoped>

</style>