<!--  -->
<template>
    <div>
        <mavon-editor v-model="value" @save="savePage"/>
    </div>
</template>

<script>
export default {
    name: "editor",
    data() {
        return {
            value:''
        };
    },

    components: {},

    methods: {
        savePage(value) {
            console.log( value,'value' );
            console.log( 'this.value', this.value );
            
        }
    },

    computed: {}
};
</script>
<style lang="less" scoped></style>
