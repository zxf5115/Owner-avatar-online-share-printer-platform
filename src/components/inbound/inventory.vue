<template>
  <div class="oubound">
    <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">
      <el-card class="box-card mt10" shadow="never">
        <div slot="header" class="clearfix">
          <span>{{ $t('inventory.outbound.logistics_info') }}</span>
        </div>
        <div class="text item">
          <el-form-item :label="$t('inventory.outbound.company_id')" prop="company_id">
            <el-select v-model="dataForm.company_id" :placeholder="$t('common.please_select')+$t('inventory.outbound.company_id')">
              <el-option v-for="(v,k) in logisticsList" :label="v.name" :key="k" :value="v.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('inventory.outbound.logistics_no')" prop="logistics_no">
            <el-input :placeholder="$t('common.please_input')+$t('inventory.outbound.logistics_no')" v-model="dataForm.logistics_no"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:outbound:handle')" type="primary" @click="dataFormSubmit()">
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
        model: 'outbound',
        logisticsList: [
          {'id': 1, 'title': '顺丰快递'},
        ],
        dataForm:
        {
          id: 0,
          company_id: '',
          logistics_no: '',
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
              url: this.$http.adornUrl(`/outbound/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.company_id   = data.data.company_id
                this.dataForm.logistics_no = data.data.logistics_no
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
              url: this.$http.adornUrl(`/outbound/second_step`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'company_id': this.dataForm.company_id,
                'logistics_no': this.dataForm.logistics_no,
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
      loadLogisticsCompanyList () {
        this.$http({
          url: this.$http.adornUrl('/logistics/company/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.logisticsList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      }
    },
    created() {
      this.init();

      this.loadLogisticsCompanyList();
    },
  }
</script>

<style lang="scss" scoped>
  .oubound {
    padding-top: 50px;
  }
</style>
