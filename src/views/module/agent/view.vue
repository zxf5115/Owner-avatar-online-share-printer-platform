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
                  <el-form-item :label="$t('agent.asset_money')" label-width="100">
                    <span v-if="dataForm.asset">
                      {{ dataForm.asset.money }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item :label="$t('agent.proportion')" label-width="100">
                    <span v-if="dataForm.asset">
                      {{ dataForm.asset.proportion }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item :label="$t('agent.printer_total')" label-width="100">
                    {{ dataForm.printer_total }}
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
            <div class="text item">
              <el-table :data="dataForm.member_printer" v-loading="dataListLoading" height="200">
                <el-table-column prop="id" :label="$t('common.id')"  width="70">
                </el-table-column>

                <el-table-column prop="title" :label="$t('printer.title')">
                  <template slot-scope="scope">
                    <span v-if="scope.row.printer">
                      {{ scope.row.printer.title }}
                    </span>
                  </template>
                </el-table-column>

                <el-table-column prop="model" :label="$t('printer.model')">
                  <template slot-scope="scope">
                    <span v-if="scope.row.printer">
                      {{ scope.row.printer.model }}
                    </span>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('agent.printer.use_status')">
                  <template slot-scope="scope">
                    {{ scope.row.use_status.text }}
                  </template>
                </el-table-column>

                <el-table-column prop="create_time" :label="$t('common.create_time')">
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
