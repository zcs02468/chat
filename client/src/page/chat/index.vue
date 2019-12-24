<!--  -->
<template>
    <div>
        <el-input v-model="inputValue" placeholder="请输入内容"></el-input>
        <el-button @click="sendMessage">默认按钮</el-button>
    </div>
</template>

<script>
import platform from 'platform';
import io from 'socket.io-client'
import settings from './settings.js'
export default {
    name: "editor",
    data() {
        return {
            inputValue:'',
            socket:''
        };
    },

    components: {},

    created() {
        this.socket = io.connect(settings.socket,{'force new connection': true})
        this.socket.on('open', function() {
            console.log('已连接')
        })
        this.socket.on('news', function (data) {
            console.log(data);
            this.socket.emit('my other event', { my: 'data' });
        });
    },

    methods: {
        sendMessage() {
            console.log( 
            platform.os.family,
            platform.name,
            platform.description, platform,'$$$$$$$');
            
            this.socket.emit('msg', this.inputValue);
            this.socket.emit('news', this.inputValue);

        }
    },

    computed: {}
};
</script>
<style lang="less" scoped></style>
