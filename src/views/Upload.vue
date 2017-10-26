<template>
    <div class="upload-box">
        <p class="title">新建相册</p>
        <Form :model="albumItem" :label-width="80" class="upload">
            <FormItem label="中文名称">
                <Input v-model="albumItem.title" placeholder="请输入中文名称"></Input>
            </FormItem>
            <FormItem label="英文名称">
                <Input v-model="albumItem.subTitle" placeholder="请输入英文名称"></Input>
            </FormItem>
            <FormItem label="描述">
                <Input v-model="albumItem.desc" placeholder="请输入描述"></Input>
            </FormItem>
            <FormItem label="图片上传">
                <Upload ref="upload" accept="image/*" :format="['jpeg','jpg','png','gif']" multiple type="drag" name="upload" :action="action"
                    :on-success="upload" :max-size="2048">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或将文件拖拽到这里上传</p>
                    </div>
                </Upload>
            </FormItem>
            <FormItem label="封面选择">
                <Select v-model="albumItem.albumPic" placeholder="请选择封面">
                    <Option v-for="item in albumSel" :value="item.response.src.replace(/\\/g, '/')">{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="subAlbum()">提交</Button>
                <Button type="ghost" style="margin-left: 8px" @click="clear()">清空</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                albumItem: {
                    albumPic: "",
                    title: "",
                    subTitle: "",
                    desc: "",
                    src: []
                },
                albumSel: [],
                action: this.servUrl + "/api/upload"
            }
        },
        methods: {
            subAlbum() {
                var $this = this;
                var params = $this.albumItem;
                params.date = $this.$utils.formatDateTime(new Date());
                $this.$axios({
                    method: "post",
                    url: $this.servUrl + '/api/saveAlbumPhotos',
                    data: params
                }).then((res) => {
                    if (res.data.logind) {
                        $this.$Message.success("保存成功!")
                    } else {
                        $this.$Message.error("保存失败!")
                    }
                }, (error) => {
                    console.log(error);
                });
            },
            upload(response, file, fileList) {
                this.albumItem.src.push({
                    src: file.response.src.replace(/\\/g, '/'),
                    name: file.name.split(".")[0],
                    show: false
                });
                this.albumSel.push(file);
            },
            clear() {
                this.albumItem = {
                    albumPic: "",
                    title: "",
                    subTitle: "",
                    desc: "",
                    src: []
                }
                this.albumSel = [];
                this.$refs["upload"].clearFiles();
            }
        },
        mounted() {
            var $this = this;
            if (!$this.$store.getters.getLogind) {
                this.$router.replace({
                    path: '/'
                })
                console.log("未登录");
            }

        }
    }
</script>
<style>
    .ivu-input-wrapper .ivu-input{
        box-sizing: border-box!important;
    }
</style>