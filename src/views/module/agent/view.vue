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
                  <el-form-item :label="$t('common.id')" label-width="80">
                    {{ dataForm.id }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('agent.create_time')" label-width="80">
                    {{ dataForm.create_time }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('agent.avatar')" label-width="80">
                    <el-avatar :size="30" :src="dataForm.avatar">
                      <img src="@/assets/images/default/circle.png"/>
                    </el-avatar>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('agent.another_name')" label-width="80">
                    {{ dataForm.another_name }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('agent.username')" label-width="80">
                    {{ dataForm.username }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('agent.nickname')" label-width="80">
                    {{ dataForm.nickname }}
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
                  <el-form-item :label="$t('agent.asset.proportion')" label-width="100">
                    <span v-if="dataForm.asset">
                      {{ dataForm.asset.proportion }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item :label="$t('agent.asset.should_printer_total')" label-width="100">
                    <span v-if="dataForm.asset">
                      {{ dataForm.asset.should_printer_total }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item :label="$t('agent.below_agent')" label-width="100">
                    {{ dataForm.below_agent_total }}
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item :label="$t('agent.below_manager')" label-width="100">
                    {{ dataForm.below_manager_total }}
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
