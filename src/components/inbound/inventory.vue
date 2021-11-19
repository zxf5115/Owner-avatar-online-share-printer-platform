<template>
  <div class="oubound">
    <el-form label-width="120px" ref="dataForm" :model="dataForm" :rules="dataRule">
      <el-card class="box-card mt10" shadow="never">
        <div slot="header" class="clearfix">
          <span>{{ $t('inventory.inbound.inventory_info') }}</span>
        </div>
        <div class="text item">
          <el-form-item :label="$t('inventory.inbound.resource.device_code_warehouse')" prop="device_code_warehouse">
            <el-upload class="upload-demo"
              :action="this.$http.adornUrl('/file/file')"
              :headers="upload_headers"
              :show-file-list="is_show"
              :file-list="device_code_warehouse_url"
              :on-success="handleSuccess"
              :on-change="changeShow">
              <el-button size="small" type="primary">
                {{ $t('common.upload') }}
              </el-button>
            </el-upload>
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
  import { isNotEmpty } from '@/utils/validate'
  export default {
    extends: common,
    data() {
      return {
        model: 'inbound',
        upload_headers:{},
        is_show: false,
        device_code_warehouse_url: [],
        dataForm:
        {
          id: 0,
          device_code_warehouse: '',
        },
        dataRule:
        {
          company_id: [
            { required: true, message: this.$t('inventory.outbound.rules.company_id.require'), trigger: 'blur' },
          ],
          logistics_no: [
            { required: true, message: this.$t('inventory.outbound.rules.logistics_no.require'), trigger: 'blur' },
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
              url: this.$http.adornUrl(`/inbound/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.device_code_warehouse = data.data.resource.device_code_warehouse

                this.device_code_url = [{'url': data.data.resource.device_code}]

                if(isNotEmpty(data.data.resource.device_code))
                {
                  this.is_show = true
                }
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
              url: this.$http.adornUrl(`/inbound/second_step`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'device_code_warehouse': this.dataForm.device_code_warehouse,
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
      handleSuccess(res, file) {
        if(0 == res.status)
        {
          this.$message.error(res.message)
        }

        this.dataForm.device_code_warehouse = res.data;
      },
      changeShow(file, fileList) {
        this.is_show = true
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
