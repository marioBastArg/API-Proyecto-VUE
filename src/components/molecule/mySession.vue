<template>
	<div id="mySession">
		<my-button v-if="!session" @click="register">Registrarme</my-button>
		<my-button v-if="!session" @click="login">IniciarSession</my-button>
		<my-button v-if="session" @click="logout">logout</my-button>
	</div>
</template>
<script>
	import myButton from '../atom/myButton';
		export default {
		name: "mySession",
		data(){
			return{
				valuee:0,
				session: false
			}
		},
		methods: {
			register()
			{
				this.valuee++;
			},
			login()
			{
				this.session=true;
			},
			logout()
			{
				this.session=false;
			}
		},
		components:{
			myButton,
		}
	};
</script>

<style scoped>
	
</style>