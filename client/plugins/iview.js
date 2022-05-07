import Vue from 'vue'
import ViewUI from 'view-design'
import locale from 'view-design/dist/locale/en-US' // Change locale, check node_modules/iview/dist/locale
import { mapGetters } from 'vuex';

Vue.use(ViewUI, {
  locale
})



// mixins for using common methods

Vue.mixin({ 
  computed: {
    ...mapGetters({
        authUser:'getAuthUser'
      }),
  },
  methods: {
      i(msg, i = 'Hey!') {
          this.$Notice.info({
              title: i,
              desc: msg
          });
      },
      s(msg, i = 'Great!') {
          this.$Notice.success({
              title: i,
              desc: msg
          });
      },
      w(msg, i = 'Hi!') {
          this.$Notice.warning({
              title: i,
              desc: msg
          });
      },
      e(msg, i = 'Oops!') {
          this.$Notice.error({
              title: i,
              desc: msg,

          });
      },
      swr() {
          this.$Notice.error({
              title: 'Oops',
              desc: 'Something went wrong, please try again later'
          });
      },
      
      async callApi(method, url, dataObj) {
        try {
          let data = await this.$axios({
            config: {
              withCredentials: false,
  
            },
            method: method,
            url: url,
            data: dataObj,
  
          })
          return data
        } catch (e) {
          let res = e.response
          if (res.status == 403) {
            window.location = '/login';
            
          } else if (res.status == 422 || res.status == 400) {
            this.validationError(res.data)
  
          } else if (res.status == 404 || res.status == 401) {
            if(res.data.message) this.i(res.data.message)
            if(res.data.msg) this.i(res.data.msg)
          } else {
            this.swr()
          }
          return e.response
        }
      },
      showVError(data) {
        for (let e of data) {
          this.i(e.message)
        }
      },
      validationError(res) {
        // console.log('res:',res.message);
        for (let e of res.message) {
          this.i(e.message)
        }
      },


  }
})

