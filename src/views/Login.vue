<template>
    <div class="login">
        <div class="col"><i class="iconfont icon-yonghu"></i><input type="text" v-model="userInfo.username" placeholder="请输入用户名" /></div>
        <div class="col"><i class="iconfont icon-mm"></i><input type="password" v-model="userInfo.password" placeholder="请输入密码" /></div>
        <div class="col"><span class="btn" @click="login()">登录</span></div>
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
                    //权限限制
                    $this.$axios({
                        method: "get",
                        url: $this.servUrl + "/api/g"
                    }).then((res) => {
                        $this.$store.dispatch('setLogind', res.data.logind);
                        $this.$router.replace({
                            path: '/'
                        })
                    }, (error) => {
                        console.log(error);
                    });

                    console.log(res);
                }, (error) => {
                    console.log(error);
                });
            }
        },
        mounted() {
            this.$axios({
                method: "get",
                url: this.servUrl + "/api/g"
            }).then((res) => {
                if (res.data.logind) {
                    this.$router.replace({
                        path: '/'
                    })
                }
            }, (error) => {
                console.log(error);
            });
        }

    }
</script>