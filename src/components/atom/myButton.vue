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
				this.$emit("click", {key:this.$refs.button.value});
			}
		}
	};
</script>

<style scoped>
	button{
		max-width: 100%;
		width: 100%;
	}
</style>