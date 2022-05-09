<template>
  <div>
    <div class="_2menu">
      <div class="_2menu_con">
        <div class="row align-items-center">
          <div class="col">
            <router-link to="/">
              <h3 class="_menu_logo_text">
                <span class="_menu_logo_symbol">A</span>
                <span class="_menu_logo_text_main">Appointment System</span>
              </h3>
            </router-link>
          </div>

          <div class="col-auto">
            <router-link to="/login">
              <button class="_log_btn _2menu_long" type="button">Login</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Banner -->
    <div class="_4banner">
      <div class="_4banner_main">
        <h1 class="_4banner_title">Easy Appointment</h1>
        <p class="_4banner_text">
          Creating a conscious and safe community where human<br />
          connection and new ideas can thrive
        </p>
      </div>
    </div>
    <!-- Banner -->
    <!-- form -->
    <register></register>
    <!-- form -->
  </div>
</template>
<script>
import register from "../components/register.vue";
export default {
  middleware: "guest",
  components: { register: register },
  //
};
</script>