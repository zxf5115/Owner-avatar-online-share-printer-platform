<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('agent.archive_info') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_agent_list'})">
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
            <div class="text item">
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('agent.username')" label-width="80">
                    {{ dataForm.username }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('agent.asset.proportion')" label-width="100">
                    <span v-if="dataForm.asset">
                      {{ dataForm.asset.proportion }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('agent.level')" label-width="80">
                    {{ dataForm.level.text }} | {{ dataForm.another_name || $t('common.empty') }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('agent.asset.should_printer_total')" label-width="80">
                    <span v-if="dataForm.asset">
                      {{ dataForm.asset.should_printer_total }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('common.area')" label-width="80">
                    <span v-if="dataForm.archive">
                      {{ dataForm.archive.province_id.text || $t('common.empty') }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('agent.username')" label-width="80">
                    {{ dataForm.username }}
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-card>

          <el-card class="box-card mt10" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('agent.asset_info') }}</span>
            </div>
            <div class="text item">
              <el-row>
                <el-col :span="4">
                  <el-form-item :label="$t('agent.asset.money')" label-width="100">
                    <span v-if="dataForm.asset">
                      {{ dataForm.asset.money }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="4">

                </el-col>
                <el-col :span="4">
                  <el-form-item :label="$t('agent.asset.withdrawal_money')" label-width="100">
                    <el-link v-if="dataForm.asset" type="primary" @click="$router.push({name: 'module_withdrawal_list', query: {member_id: dataForm.id}})">
                      {{ dataForm.asset.withdrawal_money }}
                    </el-link>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item :label="$t('agent.below_agent')" label-width="100">
                    <el-link type="primary" @click="$router.push({name: 'module_agent_list', query: {parent_id: dataForm.id}})">
                      {{ dataForm.below_agent_total }}
                    </el-link>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item :label="$t('agent.below_manager')" label-width="100">
                    <el-link type="primary" @click="$router.push({name: 'module_manager_list', query: {parent_id: dataForm.id}})">
                      {{ dataForm.below_manager_total }}
                    </el-link>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-card>

          <el-card class="box-card mt10" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('agent.facility_info') }}</span>
              <div class="right ptb3">
                <el-button type="primary" size="mini" round @click="$router.push({name: 'module_agent_list', query: {id: dataForm.id}})">
                  {{ $t('agent.distribution') }}
                </el-button>
              </div>
            </div>
            <div class="text item color">
              <el-card  class="box-card" shadow="never">
                <el-row>
                  <el-col :span="4">
                    <el-form-item :label="$t('agent.asset.should_printer_total')" label-width="100">
                      <span v-if="dataForm.asset">
                        {{ dataForm.asset.should_printer_total }}
                      </span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item :label="$t('printer.online')" label-width="100">
                      <span class="green1">
                        {{ dataForm.online_total }}
                      </span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item :label="$t('printer.offline')" label-width="100">
                      <span class="red">
                        {{ dataForm.offline_total }}
                      </span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item :label="$t('printer.unbind')" label-width="100">
                      <span>
                        {{ dataForm.unbind_total }}
                      </span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item :label="$t('agent.asset.already_printer_total')" label-width="100">
                      <span v-if="dataForm.asset">
                        {{ dataForm.asset.already_printer_total }}
                      </span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item :label="$t('agent.asset.without_printer_total')" label-width="100">
                      <span v-if="dataForm.asset">
                        {{ dataForm.asset.should_printer_total - dataForm.asset.already_printer_total }}
                      </span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-card>
              <el-card class="box-card mt10" shadow="never">
                <el-table :data="dataForm.printer" v-loading="dataListLoading" height="260">
                  <el-table-column prop="id" :label="$t('common.id')" width="70">
                  </el-table-column>

                  <el-table-column prop="model" :label="$t('printer.model')">
                  </el-table-column>

                  <el-table-column prop="code" :label="$t('printer.code')">
                  </el-table-column>

                  <el-table-column :label="$t('printer.status')">
                    <template slot-scope="scope">
                      {{ scope.row.province_id.text }}
                    </template>
                  </el-table-column>

                  <el-table-column prop="activate_time" :label="$t('printer.activate_time')">
                  </el-table-column>

                  <el-table-column :label="$t('printer.status')">
                    <template slot-scope="scope">
                      <span v-if="2 == scope.row.activate_status.value">
                        {{ scope.row.bind_status.text }}
                      </span>
                      <span class="green1" v-else-if="1 == scope.row.activate_status.value">
                        {{ scope.row.activate_status.text }}
                      </span>
                      <span class="red" v-else-if="2 == scope.row.activate_status.value">
                        {{ scope.row.activate_status.text }}
                      </span>
                      <span v-else>
                        {{ scope.row.activate_status.text }}
                      </span>
                    </template>
                  </el-table-column>

                  <el-table-column :label="$t('printer.ink_quantity')">
                    <template slot-scope="scope">
                      <el-progress :text-inside="true" :stroke-width="20" status="exception" :percentage="scope.row.ink_quantity"></el-progress>
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
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
        model: 'agent',
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
              url: this.$http.adornUrl(`/agent/view/${this.dataForm.id}`),
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
    },
    created(request)
    {
      this.init();
    }
  };
</script>
