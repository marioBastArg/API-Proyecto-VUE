<template>
	<div id="mySearch">
		<my-input v-model="valuee" @input='logit' type="number"></my-input>
		<my-button @click="onClick">Look</my-button>
		<label>{{valuee}}</label>
	</div>
</template>

<script>
	import myButton from '../atom/myButton';
	import myInput from '../atom/myInput';
		export default {
		name: "mySearch",
		data(){
			return{
				valuee:0,
				nigga:'negro'
			}
		},
		methods: {
			onClick()
			{
				this.valuee++;
			},
			logit()
			{
				console.log(this.valuee);
			}

		},
		components:{
			myButton,
			myInput
		}
	};
</script>

<style scoped>

</style>