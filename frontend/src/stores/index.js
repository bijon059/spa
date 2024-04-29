import {defineStore} from "pinia";
import axios from "axios";
import AxiosHelper from "@/libraries/AppsbdAxiosHelper";
import {apssbd_admin_url}  from "@/libraries/AppsbdURL";
export const useIndexStore = defineStore('index',{
    state:()=>({
        countries:[],
        timezones:[],
        isLoggedIn:false,
        isLoading:true,
        loggedUserData:{
            caps:{
                'role-menu': true,
                'add-role': true,
                'delete-role': true,
                'edit-role': true,
                'role-status': true,

                'app-menu': true,
                'add-app': true,
                'delete-app': true,
                'edit-app': true,
                'app-status': true,

                'package-menu': true,
                'add-package': true,
                'delete-package': true,
                'edit-package': true,
                'package-status': true,

                'feature-menu':true,
                'add-feature': true,
                'delete-feature': true,
                'edit-feature': true,
                'feature-status': true,



                'client-menu': true,
                'add-client': true,
                'delete-client': true,
                'edit-client': true,
                'client-status': true,

                'user-menu': true,
                'user-add': true,
                'user-edit': true,
                'user-delete': true,
                'user-force-change': true,
            }
        }
    }),
    getters:{
        loggedUser(){
            var sesData=sessionStorage.getItem('loggedUser');
            return JSON.parse(sesData);
        }
    },
    actions:{
        async v_init(){
            this.isLoggedIn=false;
            var sesData=sessionStorage.getItem('loggedUser');
            if(sesData) {
                try {
                    sesData = JSON.parse(sesData);
                    if (sesData.token) {
                        this.isLoggedIn = true;
                    }else {
                        sessionStorage.removeItem('loggedUser');
                    }
                }catch (e){}
            }else {}
        },
        async loadCsrf(){
            return await AxiosHelper
                .get(apssbd_admin_url.get_module_route('sanctum/csrf-cookie'))
                .then(response => {
                    try {
                        console.log(response);
                    }catch (e) {
                        console.log(e);
                        this.countries=[];
                    }
                })
                .catch(error => {
                    this.countries=[];
                });
        },
        async loadTimezone(){
            await axios
                .get(apssbd_admin_url.get_module_route('data'))
                .then(response => {
                    try {
                        console.log(response);
                    }catch (e) {
                        this.timezones=[];
                    }
                })
                .catch(error => {
                    this.timezones=[];
                });
        },
        async login(params){
            console.log(params);
            return (await AxiosHelper.public_post(apssbd_admin_url.get_module_route('api/login'),params.login_form)
                .then(response => {
                    //console.log(response.data.data);
                    if (response.status)
                    {
                        sessionStorage.setItem('loggedUser',JSON.stringify(response.data.data));
                        this.isLoggedIn = true;
                    }
                    //console.log(response);
                    return response.data;
                })
                .catch(error => {
                    return error.response.data;
                }));
        },
        sessionLogout(){
            sessionStorage.removeItem('loggedUser');
            this.isLoggedIn = false;
        },
        async redirectToLogin(){
            this.sessionLogout();
            this.$router.push({ name: 'login' });
        },
        async logOut(){
            console.log('called log out');
            return (await AxiosHelper.post(apssbd_admin_url.get_module_route('data'))
                .then(response => {
                    console.log(response);
                    if (response.status)
                    {
                        this.sessionLogout();
                    }
                    return response.data;

                })
                .catch(error => {
                    if(error?.response?.status==401){
                        this.sessionLogout();
                    }
                    return error.response.data;
                }));
        },
        async loggedUserProfile(params){
            console.log(params);
            return (await AxiosHelper.post(apssbd_admin_url.get_module_route('users/login'),params.login_form)
                .then(response => {
                    console.log(response.data.data);
                    if (response.status)
                    {
                        sessionStorage.setItem('loggedUser',JSON.stringify(response.data.data));
                        this.isLoggedIn = true;
                    }
                    //console.log(response);
                    return response.data;
                })
                .catch(error => {
                    return error.response.data;
                }));
        },
    }
})