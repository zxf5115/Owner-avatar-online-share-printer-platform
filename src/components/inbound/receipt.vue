<template>
  <div class="oubound color">
    <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">
      <el-card class="box-card mt10" shadow="never">
        <div slot="header" class="clearfix">
          <span>{{ $t('inventory.inbound.receipt_info') }}</span>
        </div>
        <div class="text item">
          <el-form-item :label="$t('inventory.outbound.receipt_form')" prop="receipt_form">
            <el-upload class="avatar-uploader" :action="this.$http.adornUrl('/file/picture')" :show-file-list="false" :headers="upload_headers" :on-success="handlePictureSuccess" :before-upload="beforePictureUpload">
              <img v-if="dataForm.receipt_form" :src="dataForm.receipt_form" class="avatar-upload">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="red">
              上传签收单分辨率为：355*170
            </div>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:inbound:handle')" type="primary" @click="dataFormSubmit()">
              {{ $t('common.confirm') }}
            </el-button>
            <el-button @click="resetForm()">
              {{ $t('common.reset') }}
            </el-button>
          </el-form-item>
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  export default {
    extends: common,
    data() {
      return {
        model: 'inbound',
        upload_headers:{},
        dataForm:
        {
          id: 0,
          receipt_form: '',
        },
        dataRule: {}
      };
    },
    methods: {
      init ()
      {
        let query = this.$route.query
        let id = query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/inbound/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.receipt_form = data.data.receipt_form
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/inbound/third_step`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'receipt_form': this.dataForm.receipt_form,
              })
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.$message.success(this.$t('common.handle_success'));
                this.$router.go(-1);
              } else {
                this.$message.error(this.$t(data.message))
              }
            })
          }
        })
      },
      resetForm:function()
      {
        this.$refs['dataForm'].resetFields();
      },
      // 上传图片
      handlePictureSuccess(res, file) {
        this.dataForm.receipt_form = res.data;
      },
    },
    created() {
      this.init();

      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    },
  }
</script>

<style lang="scss" scoped>
  .oubound {
    padding-top: 50px;
  }
</style>
