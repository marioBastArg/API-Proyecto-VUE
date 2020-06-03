<template>
	<div id="mySession" :session="session">
		<my-text>{{session}}</my-text>
		<my-button v-if="myCurrentSession == null" @click="register">Registrarme</my-button>
		<my-button v-if="myCurrentSession == null" @click="login">Iniciar Sesion</my-button>
		<my-button v-if="myCurrentSession != null" @click="logout">logout</my-button>
		<my-button v-if="myCurrentSession != null" @click="createPlace">Nuevo lugar</my-button>
	</div>
</template>
<script>
	import myText from '../atom/myText';
	import myButton from '../atom/myButton';
		export default {
		name: "mySession",
		props:["session"],
		data(){
			return{
				valuee:0,
			}
		},
		methods: {
			register()
			{
				this.$emit('register',true);
			},
			login()
			{
				this.$emit('login',true);
			},
			logout()
			{
				this.$emit('logout',true);
			},
			createPlace()
			{
				this.$emit('createPlace',true);
			}
		},
		computed:{
			myCurrentSession(){
				return this.session;
			}
		},
		components:{
			myButton,
			myText
		},
	};
</script>

<style scoped>
	
</style>