<template>
	<button ref="button" :class="classButton" @click="action" :value="value"><slot></slot></button>
</template>

<script> 
		export default {
		name: "myButton",
		props: [
		 'value',
		 'classButton'
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
	button.crimson{
		background-color: #CD5C5C;
		color: white;
		text-transform: uppercase;
	}
	button.blue{
		background-color: #3090C7;
		color: white;
		text-transform: uppercase;
	}
</style>