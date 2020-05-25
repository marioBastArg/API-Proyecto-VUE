<template>
	<button ref="button" @click="action" :value="value"><slot></slot></button>
</template>

<script> 
		export default {
		name: "myButton",
		props: [
		 'value'
		],
		methods: {
			action(){
				this.$emit("click", this.$refs.button.value);
			}
		}
	};
</script>

<style scoped>

</style>