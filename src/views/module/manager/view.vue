<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('manager.archive_info') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_manager_list'})">
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
                  <el-form-item :label="$t('manager.nickname')" label-width="80">
                    {{ dataForm.nickname }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('manager.asset.proportion')" label-width="100">
                    <span v-if="dataForm.asset">
                      {{ dataForm.asset.proportion }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('manager.username')" label-width="80">
                    {{ dataForm.username }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('manager.agent_name')" label-width="80">
                    <span v-if="dataForm.parent">
                      {{ dataForm.parent.nickname }} | {{ dataForm.parent.level.text }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('common.area')" label-width="80">
                    <span v-if="dataForm.archive">
                      {{ dataForm.archive.province_id.text }} {{ dataForm.archive.city_id.text }} {{ dataForm.archive.region_id.text }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('manager.archive.address')" label-width="80">
                    <span v-if="dataForm.archive">
                      {{ dataForm.archive.address }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-card>

          <el-card class="box-card mt10" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('manager.asset_info') }}</span>
            </div>
            <div class="text item">
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('manager.asset.money')" label-width="100">
                    <span v-if="dataForm.asset">
                      {{ dataForm.asset.money }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('manager.asset.withdrawal_money')" label-width="100">
                    <template slot-scope="scope" v-if="dataForm.asset">
                      <el-link type="primary" @click="$router.push({name: 'module_manager_list', query: {id: dataForm.id}})">
                        {{ dataForm.asset.withdrawal_money }}
                      </el-link>
                    </template>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('manager.asset.order_total')" label-width="100">
                    <template slot-scope="scope" v-if="dataForm.asset">
                      <el-link type="primary" @click="$router.push({name: 'module_manager_list', query: {id: dataForm.id}})">
                        {{ dataForm.asset.order_total }}
                      </el-link>
                    </template>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-card>

          <el-card class="box-card mt10" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('agent.facility_info') }}</span>
            </div>
            <div class="text item color">
              <el-table :data="dataForm.manager" v-loading="dataListLoading" height="260">
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
                    <span v-if="2 == scope.row.bind_status.value">
                      {{ scope.row.bind_status.text }}
                    </span>
                    <span class="green1" v-else-if="1 == scope.row.status.value">
                      {{ scope.row.status.text }}
                    </span>
                    <span class="red" v-else-if="2 == scope.row.status.value">
                      {{ scope.row.status.text }}
                    </span>
                    <span v-else>
                      {{ scope.row.status.text }}
                    </span>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('printer.ink_quantity')">
                  <template slot-scope="scope">
                    <el-progress :text-inside="true" :stroke-width="20" status="exception" :percentage="scope.row.ink_quantity"></el-progress>
                  </template>
                </el-table-column>
              </el-table>
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
        model: 'manager',
        dataForm:
        {
          id: 0
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
              url: this.$http.adornUrl(`/manager/view/${this.dataForm.id}`),
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
