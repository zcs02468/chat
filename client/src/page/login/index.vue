<!--  -->
<template>
    <div class="auth-modal-box">
        <login v-show="showLogin"></login>
        <registered v-show="!showLogin"></registered>
    </div>

</template>

<script>
import login from '../../components/login/index'
import registered from '../../components/registered/index'
export default {
    name: "loginPage",
    data() {
        return {
            showLogin: true
        };
    },

    components: {
        login,
        registered
    },

    methods: {},

    computed: {}
};
</script>
<style lang="less" scoped>
.auth-modal-box {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 500;
}
</style>
