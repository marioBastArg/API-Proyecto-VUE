<template>
	<div id="mySearchBar" :query="query">
		<my-session :session="storegeid" @login="constructlogin" @logout="logout" @register="constructregister" @createPlace="constructPlace"></my-session>
		<my-input v-model="valuee" @input='search' placeholder="que buscas" type="text"></my-input>
		<div>
			<ul v-if="storeValue!=''">
			  <li v-for="(place,index) in storeValue" :key="index+'li'">
			  	<my-button v-if="search(place)" @click="onClick({id:place.id})">{{ place.name }}</my-button>
			  </li>
			</ul>
		</div>
		<my-description  v-if="!active"  :query="getmyQuery"></my-description>
		<my-form v-if="active" :myFormData="formConstructor" @myFormSubmit="directForm" :response="response"></my-form>
	</div>
</template>

<script>

	import axios from 'axios';
	import myButton from '../atom/myButton';
	import myInput from '../atom/myInput';
	import mySession from '../molecule/mySession';
	import myDescription from '../molecule/myDescription';
	import myForm from '../molecule/myForm';
	import VueLocalStorage from 'vue-localstorage'

		export default {
		name: "mySearchBar",
		props: ["query"],
		data(){
			return{
				valuee: '',
				dataQuery: 0,
				formConstructor: {},
				active: false,
				response: "",
				sessionid: "",
				localid: "",
				localName: "",
				localToken: ""
			}
		},
		mounted(){
			this.localStorage.set('id','');
			this.localStorage.set('name','');
			this.localStorage.set('token','');
			console.log(this.localStorage);
		},
		methods: {
			onClick(value)
			{
				this.active = false
				this.$emit('selected-bar',value.id);
			},
			search(place)
			{
				if (this.valuee!='null') {
					if (place.name.toUpperCase().indexOf(this.valuee.toUpperCase())> -1) {
						return true;
					}else{
						return false;
					}
				}else{
					return true;
				}
			},
			directForm(value){
				if (value.type=="Logearme") {
					this.sendLogin(value.form);
				}else if (value.type=="Registrarme") {
					this.sendRegister(value.form);
				}else if (value.type=="registerPlace") {
					this.sendnewPlace(value.form);
				}
			},
			constructlogin(){
				this.active = true;
				this.formConstructor = {
					title: "Iniciar sesion",
					action: "postLogin",
					submitType: "submit",
					submitName: "Logearme",
					data:[
						{title: "E-mail:",type:"email",name:"email",value:""},
						{title: "Password:",type:"password",name:"password",value:""}
					]

				};
			},
			constructregister(){
				this.active = true;
				this.formConstructor = {
					title: "Registrarse",
					action: "postPlace",
					submitType: "submit",
					submitName: "Registrarme",
					data:[
						{title: "Nombre completo:",type:"text",name:"name",value:""},
						{title: "E-mail:",type:"email",name:"email",value:""},
						{title: "Password:",type:"password",name:"password",value:""},
						{title: "Fecha de nacimiento:",type:"date",name:"birthday",value:""}
					]
				};
			},
			constructPlace(){
				this.active = true;
				this.formConstructor = {
					title: "Registrar Lugar",
					action: "postRegister",
					submitType: "submit",
					submitName: "registerPlace",
					data:[
						{title: "Nombre del lugar:",type:"text",name:"name",value:""},
						{title: "Longitud:",type:"text",name:"lon",value:""},
						{title: "Latitud:",type:"text",name:"lat",value:""},
						{title: "Descripcion:",type:"text",name:"description",value:""},
						{title: "Imagen:",type:"file",name:"img",value:""}
					]
				};
			},
			sendLogin(e){
				axios.post('http://localhost:3000/usuarios/login', e)
					.then((res) => {
						this.localStorage.Name=JSON.stringify(res.data.data.user.name);
						this.localStorage.id=JSON.stringify(res.data.data.user.id);
						this.localStorage.token=JSON.stringify(res.data.data.token);
						this.response =  res.data.message;
						setTimeout(()=>{
							this.response = '';
							this.active = false;
						}, 5000);
					}).catch((err) => {
						this.response =  "Correo electronico o contraseña incorrecto/s";
						setTimeout(()=>{
							this.response = '';
						}, 5000);
					});
			},
			sendRegister(e){
				axios.post('http://localhost:3000/usuarios/create', e)
					.then((res) => {
						this.response =  res.data.message;
						setTimeout(()=>{
							this.response = '';
							this.active = false;
						}, 5000);
					}).catch((err) => {
						this.response =  "Los datos no son correctos";
						setTimeout(()=>{
							this.response = '';
						}, 5000);
					});
			},
			sendnewPlace(e){
				var auth = { Headers: { Authorization: localStorage.getItem('currentSessionToken') }};
				axios.post('http://localhost:3000/lugares/registerPlace', e, auth)
					.then((res) => {
						this.response =  res.data.message;
						setTimeout(()=>{
							this.response = '';
							this.active = false;
						}, 5000);
					}).catch((err) => {
						this.response =  "Los datos no son correctos";
						setTimeout(()=>{
							this.response = '';
						}, 5000);
					});
			},
			logout(){
				this.active = false;
				this.localStorage.Name='';
				this.localStorage.id='';
				this.localStorage.token='';
			}

		},
		components:{
			mySession,
			myButton,
			myInput,
			myDescription,
			myForm
		},
		computed:{
			storeValue(){
				return this.$store.state.places;
			},
			getmyQuery(){
				return this.query;
			},
			loginData(){
				return this.formConstructor;
			},
			storegeid(){
				return this.localStorage.Name;
			},
			storegename(){
				return this.localStorage.id;
			},
			storegeToken(){
				return this.localStorage.token;				
			}
		},
	};
</script>

<style scoped>
	#mySearchBar{
		height: 100%;
		max-height: 100%;
		padding: 10px;
	}
	ul{
		padding: 0px;
		max-height: 500px;
	}
	ul:hover{
		overflow: scroll;
		overflow-x: hidden;
	}
	ul > li{
		list-style: none;
		margin-top: 5px;
		margin-bottom: 5px;
		max-width: 100%;

	}
	li > button{
		min-width: 100%;
	}
</style>