<template>
  <div class="container">
    <div class="row">
      <div v-if="isHideForm" class="ad-global-loader">
       Loading...
      </div>
      <div  v-else class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-0 shadow rounded-3 my-5">
          <div class="card-body p-4 p-sm-5">
            <h5 class="card-title text-center mb-5 fw-light fs-5" v-translate>Sign In</h5>
            <!--<div v-show="showErrorMsg || this.isPartialOffline" class=" align-items-center" :class="showErrorMsg||this.isPartialOffline?'w-100':''">
              <ResponseMsg :message="msg" :disable-remove="false" @removeInfo="removeWarning" />
            </div>-->

            <form  @submit.prevent="onSubmit">
              <div class="form-floating mb-3">
                <input type="email" class="form-control" name="Username" id="floatingInput" v-model="login_form.email" placeholder="name@example.com">
                <label for="floatingInput" ><translate>Email </translate></label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control" name="Password" v-model="login_form.password" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword"><translate>Password</translate></label>
              </div>
              <div class="d-grid">
                <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit"><span v-show="!isShowLoader" ><translate>Sign In</translate></span> <i class="vps vps-refresh " :class="isShowLoader?'slower animated infinite apf-spin':''" v-show="isShowLoader" aria-hidden="true"></i></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//import reCaptcha from "@/libraries/reCaptcha";
import {useIndexStore} from "../stores/index";
import {mapStores} from "pinia";

export default {
  name: "Login",
  data()
  {
    return{
      login_form: {
        email: "",
        password: "",
      },
      msg:{
        error:[],
      },
      isShowLoader:false,
      defLoader:false,
      showErrorMsg:false
    }
  },
  computed: {
    ...mapStores(useIndexStore),
  },
  mounted() {
    // if (!this.$store.state.isLoggedIn) {
    //   reCaptcha.hide_badge(false);
    // }
    // if (vitePos.login_type == 'W' && process.env.NODE_ENV !== 'development') {
    //   this.goToLogin();
    // }
  },
  components: {
  },
  emits:['logedIn'],
  methods:{
    async goToLogin(){
      this.defLoader=true;
    },
    removeWarning(){
      this.showErrorMsg = false;
    },
    async onSubmit() {
      this.isShowLoader = true;
      let requestParam = {login_form: this.login_form};
      let response = await this.indexStore.login(requestParam);
      console.log(response);
      this.isShowLoader=false;
      if(response.status){
        let userdata= {...response.data};
        this.$router.push(this.$route.query.redirect || '/');
      }else {
        this.msg=response.msg;
        this.showErrorMsg=true;
        this.login_form.password="";
      }
    },
    login_callback(status,msg,data)
    {
      this.isShowLoader=false;
      if(status){
        let userdata= {...data}
        this.$router.push(this.$route.query.redirect || '/');
      }else {
        this.msg=msg;
        this.showErrorMsg=true;
        this.login_form.password="";
      }
    }
  }
}
</script>

<style lang="scss">

</style>