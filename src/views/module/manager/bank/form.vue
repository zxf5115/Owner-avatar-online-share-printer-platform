<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('manager.bank.from') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button icon="el-icon-back" @click="$router.go(-1)">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main color">
        <el-form label-width="120px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-form-item :label="$t('agent.bank.company_name')" prop="company_name">
            <el-input v-model="dataForm.company_name" :placeholder="$t('common.please_input') + $t('agent.bank.company_name')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('agent.bank.open_bank_name')" prop="open_bank_name">
            <el-select v-model="dataForm.open_bank_name" :placeholder="$t('common.please_select')+$t('agent.bank.open_bank_name')">
              <el-option v-for="(v,k) in bankList" :label="v.name" :key="k" :value="v.name"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('agent.bank.branch_bank_name')" prop="branch_bank_name">
            <el-input v-model="dataForm.branch_bank_name" :placeholder="$t('common.please_input') + $t('agent.bank.branch_bank_name')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('agent.bank.card_no')" prop="card_no">
            <el-input v-model="dataForm.card_no" :placeholder="$t('common.please_input') + $t('agent.bank.card_no')"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:agent:bank:handle')" type="primary" @click="dataFormSubmit()">
              {{ $t('common.confirm') }}
            </el-button>
            <el-button @click="resetForm()">
              {{ $t('common.reset') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  export default {
    extends: common,
    data() {
      return {
        model: 'manager/bank',
        bankList: [],
        dataForm:
        {
          member_id: 0,
          company_name: '',
          open_bank_name: '',
          branch_bank_name: '',
          card_no: '',
        },
        dataRule:
        {
          company_name: [
            { required: true, message: this.$t('agent.bank.rules.company_name.require'), trigger: 'blur' },
          ],
          open_bank_name: [
            { required: true, message: this.$t('agent.bank.rules.open_bank_name.require'), trigger: 'blur' },
          ],
          branch_bank_name: [
            { required: true, message: this.$t('agent.bank.rules.branch_bank_name.require'), trigger: 'blur' },
          ],
          card_no: [
            { required: true, message: this.$t('agent.bank.rules.card_no.require'), trigger: 'blur' },
          ],
        }
      };
    },
    methods: {
      init ()
      {
        let id = this.$route.query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/manager/bank/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200 && data.data) {
                this.dataForm.company_name     = data.data.company_name
                this.dataForm.open_bank_name   = data.data.open_bank_name
                this.dataForm.branch_bank_name = data.data.branch_bank_name
                this.dataForm.card_no          = data.data.card_no
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
              url: this.$http.adornUrl(`/manager/bank/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'member_id': this.dataForm.id,
                'company_name': this.dataForm.company_name,
                'open_bank_name': this.dataForm.open_bank_name,
                'branch_bank_name': this.dataForm.branch_bank_name,
                'card_no': this.dataForm.card_no,
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
      loadBankList () {
        this.$http({
          url: this.$http.adornUrl('/common/bank/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.bankList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      }
    },
    created() {
      this.init();

      this.loadBankList();
    },
  };
</script>
