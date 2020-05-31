<template>
	<input  ref="inputt" :value='value' :placeholder="placeholder"  @input="emit">
</template>

<script> 
		export default {
		name: "myInput",
		props: [ 
			"value",
			"placeholder"
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
	input{
		max-width: 100%;
		width: 96%;
	}
</style>