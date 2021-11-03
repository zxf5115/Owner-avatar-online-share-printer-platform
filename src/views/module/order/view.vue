<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('order.view') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_order_list'})">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main color">
        <el-alert show-icon :closable="false" :type="type" :title="title"></el-alert>

        <el-card class="box-card mt10" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('order.basic_info') }}</span>
          </div>
          <div class="text item">
            <el-form :model="dataForm" label-width="80">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('order.order_no')" label-width="120">
                    {{ dataForm.order_no }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('order.create_time')" label-width="120">
                    {{ dataForm.create_time }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('order.order_status')" label-width="80">
                    {{ dataForm.order_status.text }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('order.pay_money')" label-width="80">
                    <span class="red">
                      {{ dataForm.pay_money }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('order.pay_type')" label-width="80">
                    {{ dataForm.pay_type.text }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('order.pay_time')" label-width="80">
                    {{ dataForm.pay_time }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('order.pay_status')" label-width="80">
                    {{ dataForm.pay_status.text }}
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>

        <el-card class="box-card mt10" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('order.member_info') }}</span>
          </div>
          <div class="text item">
            <el-form label-width="80">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('order.nickname')" label-width="80">
                    <span v-if="dataForm.member">
                      {{ dataForm.member.nickname }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('order.username')" label-width="80">
                    <span v-if="dataForm.member">
                      {{ dataForm.member.username }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>

        <el-card class="box-card mt10" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('order.manager_info') }}</span>
          </div>
          <div class="text item">
            <el-form label-width="80">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('manager.nickname')" label-width="80">
                    <span v-if="dataForm.manager">
                      {{ dataForm.manager.nickname }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('manager.username')" label-width="80">
                    <span v-if="dataForm.manager">
                      {{ dataForm.manager.username }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('common.area')" label-width="80">
                    <span v-if="dataForm.printer">
                      {{ dataForm.printer.province_id.text }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('printer.code')" label-width="80">
                    <span v-if="dataForm.printer">
                      {{ dataForm.printer.code }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('printer.ink_quantity')" label-width="80">
                    <span v-if="dataForm.printer">
                      {{ dataForm.printer.ink_quantity }}%
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('printer.status')" label-width="80">
                    <span v-if="dataForm.printer">
                      <span class="green1" v-if="1 == dataForm.printer.status.value">
                        {{ dataForm.printer.status.text }}
                      </span>
                      <span class="red" v-else-if="2 == dataForm.printer.status.value">
                        {{ dataForm.printer.status.text }}
                      </span>
                      <span v-else>
                        {{ dataForm.printer.status.text }}
                      </span>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>

        <el-card class="box-card mt10" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('order.remark_info') }}</span>
          </div>
          <div class="text item">
            <el-table border v-if="dataForm.log" :data="dataForm.log" v-loading="dataListLoading">
              <el-table-column prop="type" :label="$t('order.log.type')">
                <template slot-scope="scope">
                  {{ scope.row.type.text }}
                </template>
              </el-table-column>

              <el-table-column prop="content" :label="$t('order.log.paper_use_total')">
              </el-table-column>

              <el-table-column prop="create_time" :label="$t('order.log.create_time')">
              </el-table-column>
            </el-table>
          </div>
        </el-card>
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
        model: 'order',
        dataListLoading: false,
        type: '',
        title: '',
        dataForm:
        {
          id: 0,
          pay_type: '',
          pay_status: '',
          order_status: '',
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
              url: this.$http.adornUrl(`/order/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm   = data.data

                if(0 == this.dataForm.pay_status.value)
                {
                  this.type = 'info';

                }
                else
                {
                  this.type = 'success';
                }

                this.title = this.$t('order.current_order_status') + this.dataForm.pay_status.text;
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
