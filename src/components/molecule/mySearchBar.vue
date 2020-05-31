<template>
	<div id="mySearchBar" :query="valuee">
		<my-session></my-session>
		<my-input v-model="valuee" @input='logit' placeholder="que buscas" type="text"></my-input>
		<div>
			<ul v-if="storeValue!=''">
			  <li v-for="(place,index) in storeValue" :key="index+'li'">
			  	<my-button @click="onClick" :value='{id:place.id}'>{{ place.name }}</my-button>
			  </li>
			</ul>
		</div>
	</div>
</template>

<script>
	import myButton from '../atom/myButton';
	import myInput from '../atom/myInput';
	import mySession from './mySession';
		export default {
		name: "mySearchBar",
		props: ["query"],
		data(){
			return{
				valuee:'',

			}
		},
		methods: {
			onClick(value)
			{
				console.log(this.storeValue);
				
			},
			logit()
			{
				console.log(this.valuee);
			}

		},
		components:{
			mySession,
			myButton,
			myInput
		},
		computed:{
			storeValue(){
				return this.$store.state.places;
			}
		},
	};
</script>

<style scoped>
	#mySearchBar{
		height: 100vh;
		overflow: scroll;
		padding: 10px;
	}
	ul{
		padding: 0px;
	}
	ul > li{
		list-style: none;
		padding: 5px;
		width: 100%;
		max-width: 40%;
	}
	li > button{
		min-width: 100%;
	}
</style>