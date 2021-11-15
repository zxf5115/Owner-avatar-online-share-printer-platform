<template>
  <div class="oubound color">
    <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">
      <el-card class="box-card mt10" shadow="never">
        <div class="text item">
          <el-result icon="success" title="出库完成">
            <template slot="extra">
              <el-button type="primary" size="medium" @click="$router.go(-1)">
                {{ $t('common.return') }}
              </el-button>
            </template>
          </el-result>
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
        model: 'outbound',
        upload_headers:{},
        dataForm:
        {
          id: 0,
          receipt_form: '',
        },
        dataRule:
        {
          position_id: [
            { required: true, message: this.$t('advertising.rules.position_id.require'), trigger: 'blur' },
          ]
        }
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
              url: this.$http.adornUrl(`/outbound/view/${this.dataForm.id}`),
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
              url: this.$http.adornUrl(`/outbound/third_step`),
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
