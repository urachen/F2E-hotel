<template>
  <div>
    <loading :active="showLoading" :color="'#2C3A4B'" :height="80" :width="80"></loading>
    <router-view></router-view>
  </div>
</template>
<script>
import Loading from "vue-loading-overlay";
export default {
  name: "app",
  components: {
    Loading
  },
  computed: {
    showLoading() {
      return this.$store.getters.showLoading;
    }
  }
}
</script>

