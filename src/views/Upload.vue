<template>
    <div class="upload-box">
        <Form :model="formItem" :label-width="80" class="upload">
            <FormItem label="图片名称">
                <Input v-model="formItem.name" placeholder="请输入图片名称"></Input>
            </FormItem>
            <FormItem label="图片宽度">
                <Input v-model="formItem.width" placeholder="请输入图片宽度"></Input>
            </FormItem>
            <FormItem label="图片高度">
                <Input v-model="formItem.height" placeholder="请选择图片高度"></Input>
            </FormItem>
            <FormItem label="所在相册">
                <Select v-model="formItem.albumId" placeholder="请选择相册">
                    <Option value="1">秋意浓</Option>
                    <Option value="2">秋意浓</Option>
                    <Option value="3">秋意浓</Option>
                </Select>
            </FormItem>
            <FormItem label="图片上传">
                <Upload multiple type="drag" name="upload" :action="action" :on-success="upload">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或将文件拖拽到这里上传</p>
                    </div>
                </Upload>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="sub()">提交</Button>
                <Button type="ghost" style="margin-left: 8px">取消</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formItem: {
                    albumId: "",
                    name: "",
                    width: "",
                    height: "",
                    src: ""
                },
                albumSel: [],
                action: this.servUrl + "/api/upload"
            }
        },
        methods: {
            sub() {
                var $this = this;
                var params = $this.formItem;
                params.date = $this.$utils.formatDateTime(new Date()),
                    this.$axios({
                        method: "post",
                        url: $this.servUrl + '/api/savePhotos',
                        data: params
                    }).then((res) => {
                        alert("保存成功")
                        console.log("保存成功");
                    }, (error) => {
                        console.log(error);
                    });
            },
            upload(response, file, fileList) {
                this.formItem.src = "/upload/" + file.name;
            }
        }
    }
</script>