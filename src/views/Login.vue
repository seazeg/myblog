<template>
    <div style="margin:0 auto;margin-top:250px;min-height:450px;width:600px;">
        <input type="text" v-model="userInfo.username" placeholder="请输入用户名" />
        <input type="password" v-model="userInfo.password" placeholder="请输入密码" />
        <input type="button" value="登录" @click="login()" />
    </div>
</template>
<script>
    export default {
        data() {
            return {
                userInfo: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {
                var $this = this;
                var params = $this.userInfo;
                $this.$axios({
                    method: "get",
                    url: $this.servUrl + '/api/login',
                    params
                }).then((res) => {
                    alert(res.data);
                    $this.$router.replace({ path: '/' })
                    console.log(res);
                }, (error) => {
                    console.log(error);
                });
            }
        }

    }
</script>