<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('member.archive_info') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_member_list'})">
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
                  <el-form-item :label="$t('member.create_time')" label-width="80">
                    {{ dataForm.create_time }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('member.avatar')" label-width="80">
                    <el-avatar :size="30" :src="dataForm.avatar">
                      <img src="@/assets/images/default/circle.png"/>
                    </el-avatar>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.username')" label-width="80">
                    {{ dataForm.username }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.nickname')" label-width="80">
                    {{ dataForm.nickname }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('member.archive.age')" label-width="80">
                    <span v-if="dataForm.archive">
                      {{ dataForm.archive.age }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.archive.sex')" label-width="80">
                    <span v-if="dataForm.archive">
                      {{ dataForm.archive.sex.text }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-card>

          <el-card class="box-card mt10" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('member.order_info') }}</span>
            </div>
            <div class="text item color">
              <el-table :data="dataList" v-loading="dataListLoading" height="320">
                <el-table-column prop="id" :label="$t('common.id')" width="70">
                </el-table-column>

                <el-table-column prop="order_no" :label="$t('order.order_no')" width="180">
                </el-table-column>

                <el-table-column prop="title" :label="$t('order.title')">
                </el-table-column>

                <el-table-column prop="page_total" :label="$t('order.page_total')" width="80">
                </el-table-column>

                <el-table-column prop="print_total" :label="$t('order.print_total')" width="80">
                </el-table-column>

                <el-table-column prop="total" :label="$t('order.total')" width="80">
                </el-table-column>

                <el-table-column prop="pay_money" :label="$t('order.pay_money')" width="100">
                </el-table-column>

                <el-table-column :label="$t('order.pay_type')" width="80">
                  <template slot-scope="scope">
                    {{ scope.row.pay_type.text }}
                  </template>
                </el-table-column>

                <el-table-column :label="$t('order.pay_status')" width="80">
                  <template slot-scope="scope">
                    {{ scope.row.pay_status.text }}
                  </template>
                </el-table-column>

                <el-table-column prop="pay_time" :label="$t('order.pay_time')" width="140">
                </el-table-column>

                <el-table-column :label="$t('order.order_status')" width="80">
                  <template slot-scope="scope">
                    {{ scope.row.order_status.text }}
                  </template>
                </el-table-column>
              </el-table>
              <div class="admin_table_main_pagination">
                <el-pagination
                  @size-change="sizeChangeHandle"
                  @current-change="currentChangeHandle"
                  :page-sizes="[10, 50, 100, 500]"
                  :page-size="pageSize"
                  :total="totalPage"
                  :current-page="pageIndex"
                  background layout="prev, pager, next, jumper, total, sizes">
                </el-pagination>
              </div>
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
        model: 'member',
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
        let id = this.$route.query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/member/view/${this.dataForm.id}`),
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
      // 获取数据列表
      getDataList (is_search) {
        is_search = is_search || false

        if(is_search)
        {
          this.pageIndex = 1;
        }

        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/order/list'),
          method: 'get',
          params: this.$http.adornParams({
            'is_search': is_search,
            'page': this.pageIndex,
            'limit': this.pageSize,
            'member_id': this.dataForm.id
          })
        }).then(({data}) => {
          if (data && data.status === 200)
          {
            this.dataList = data.data.data
            this.totalPage = data.data.total
          }
          else
          {
            this.dataList = []
            this.totalPage = 0
            this.$message.error(data.message)
          }
          this.dataListLoading = false
        })
      },
    },
    created(request)
    {
      this.init();
      this.getDataList(true);
    }
  };
</script>
