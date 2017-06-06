<template>
    <div class="login">
        <form data-vv-scope="form-1">
            <div class="col"><i class="iconfont icon-yonghu"></i><input type="text" name="username" v-validate="'required'" v-model="userInfo.username"
                    placeholder="请输入用户名" autocomplete="off"/>
                <p style="font-size: 12px;margin: 5px 0;color: red;">{{ errors.first('form-1.username') }}</p>
            </div>
            <div class="col"><i class="iconfont icon-mm"></i><input type="password" name="password"  v-validate="'required'"  v-model="userInfo.password" placeholder="请输入密码" @keyup.enter="login()" autocomplete="off"
                />
                <p style="font-size: 12px;margin: 5px 0;color: red;">{{ errors.first('form-1.password') }}</p>
            </div>
            <div class="col"><span class="btn" @click="login()">登录</span></div>
        </form>
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
                this.$validator.validateAll('form-1').then(result => {
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