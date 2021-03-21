<template>
  <div>
    <el-col :span="12">
      <el-form ref="form" :model="form" :rules="formRules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="分享时展示的标题"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" v-model="form.desc" placeholder="分享时展示的描述"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="src">
          <el-upload
            action=""
            accept="image/png, image/jpeg, image/jeg"
            :auto-upload="false"
            :show-file-list="false"
            :on-change='changeUpload'>
            <img v-if="form.src" :src="form.src" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="作品链接" prop="link">
          <el-input v-model="form.link" placeholder="作品的链接">
            <template slot="prepend">https://720yun.com/</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="loading">发布</el-button>
        </el-form-item>
      </el-form>
    </el-col>
     <!-- vueCropper 剪裁图片实现-->
    <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
      <div class="cropper-content">
        <div class="cropper" style="text-align:center">
        <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :fixedBox="option.fixedBox"
          ></vueCropper>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="finish">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Api from "@/api/api"
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        title: "",
        desc: "",
        src: "",
        link: ""
      },
      formRules: {
        title: [{required: true, message: "请填写标题", trigger: "blur"}, {min: 2, max: 16, message: "标题在2~16个字符之间", trigger: "blur"}],
        link: [{required:  true, message: "请填写作品链接", trigger: "blur"}, {min: 2, message: "链接长度太短", trigger: "blur"}],
        desc: []
      },
      dialogVisible: false,
      // 裁剪组件的基础配置option
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 300, // 默认生成截图框宽度
        autoCropHeight: 300, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      loading: false,
      file: "",
      bolbData: ""
    }
  },
  computed: {
    ...mapState("common", ["user"])
  },
  methods:{
    onSubmit() {
      // this.loading = !this.loading;
      this.$refs.form.validate(e => {
        if(e) {
          const src = new window.File([this.bolbData], this.file.name, {type: this.file.type});
          const params = new FormData();
          params.set("title", this.form.title);
          params.set("desc", this.form.desc);
          params.set("link", this.form.link);
          params.set("src", src);
          params.set("id", this.user.id);
          Api.addWorks(params).then(res => {
            if(res.code===0) {
              this.$message.success("发布成功")
            }
            this.$refs.form.resetFields();
          })
        } else {
          this.loading = !this.loading
        }
      })
    },
    // 上传按钮   限制图片大小
    changeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isJPG = file.raw.type === 'image/jpg';
      const isJPEG = file.raw.type === 'image/jpeg';
      const isPNG = file.raw.type === 'image/png';
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!')
        return false
      }
      if(isJPG || isPNG || isJPEG) {
        // 上传成功后将图片地址赋值给裁剪框显示图片
        this.file = file.raw;
        const url =URL.createObjectURL(file.raw)
        this.$nextTick(() => {
          this.option.img = url
          this.dialogVisible = true
        })
      } else {
        this.$message.error("仅支持PNG,JPG,JPEG文件");
        return
      }
    },
    // 点击裁剪，这一步是可以拿到处理后的地址
    finish() {
      this.$refs.cropper.getCropBlob((data) => {
        this.bolbData = data;
        const url =URL.createObjectURL(data)
        this.form.src = url;
        this.dialogVisible = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
 ::v-deep .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409EFF;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  // 截图
.cropper-content {
    .cropper {
        width: auto;
        height: 300px;
    }
}
</style>