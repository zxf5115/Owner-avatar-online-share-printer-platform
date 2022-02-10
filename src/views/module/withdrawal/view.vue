<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('financial.view') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_withdrawal_list'})">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-form ref="form" :model="dataForm" label-width="80">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('common.basic_info') }}</span>
            </div>
            <div class="text item color">
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('financial.money')" label-width="100">
                    <b class="red">{{ dataForm.money }}</b>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('agent.nickname')" label-width="80">
                    <span v-if="dataForm.organization">
                      {{ dataForm.organization.nickname }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('agent.level')" label-width="80">
                    <span v-if="dataForm.organization">
                      {{ dataForm.organization.level.text }} | {{ dataForm.organization.another_name || $t('common.empty') }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('agent.username')" label-width="80">
                    <span v-if="dataForm.organization">
                      {{ dataForm.organization.username }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-card>

          <el-card class="box-card mt10" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('agent.bank_info') }}</span>
            </div>
            <div class="text item">
              <el-row>
                <el-col :span="4">
                  <el-form-item :label="$t('agent.bank.company_name')" label-width="100">
                    <span v-if="dataForm.bank">
                      {{ dataForm.bank.company_name }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item :label="$t('agent.bank.open_bank_name')" label-width="100">
                    <span v-if="dataForm.bank">
                      {{ dataForm.bank.open_bank_name }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item :label="$t('agent.bank.branch_bank_name')" label-width="100">
                    <span v-if="dataForm.bank">
                      {{ dataForm.bank.branch_bank_name }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item :label="$t('agent.bank.card_no')" label-width="100">
                    <span v-if="dataForm.bank">
                      {{ dataForm.bank.card_no }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-card>

          <el-card class="box-card mt10" shadow="never">
            <div class="text item">
              <el-button v-if="isAuth('module:withdrawal:handle') && dataForm.confirm_status && dataForm.confirm_status.value == 2" type="primary" @click="dataFormSubmit()">
                {{ $t('financial.finish') }}
              </el-button>
            </div>
          </el-card>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  export default
  {
    extends: common,
    data()
    {
      return {
        model: 'withdrawal',
        dataForm:
        {
          id: 0,
          level: '',
        },
        dataRule: {}
      };
    },
    methods:
    {
      init ()
      {
        let query = this.$route.query
        let id = query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/withdrawal/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm   = data.data
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$http({
          url: this.$http.adornUrl(`/withdrawal/handle`),
          method: 'post',
          data: this.$http.adornData({
            'id': this.dataForm.id,
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.$message.success(this.$t('common.handle_success'));
            this.$router.go(-1);
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
    },
    created(request)
    {
      this.init();
    }
  };
</script>
