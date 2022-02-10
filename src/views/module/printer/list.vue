<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:printer:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.title" :placeholder="$t('common.please_input') + $t('printer.title')" clearable>
            </el-input>
          </div>
          <div>
            <el-select v-model="dataForm.activate_status" :placeholder="$t('common.please_select') + $t('printer.status')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in statusList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </div>
          <div>
            <el-button icon="el-icon-search" @click="getDataList(true)">
              {{ $t('common.search') }}
            </el-button>
          </div>
        </div>
      </div>
      <div class="admin_table_main">
        <el-table :data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandle">

          <el-table-column type="selection" header-align="center" align="center">
          </el-table-column>

          <el-table-column prop="id" label="#" width="70">
          </el-table-column>

          <el-table-column :label="$t('printer.first_nickname')" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.first">
                {{ scope.row.first.nickname }}
              </span>
              <span v-else>
                {{ $t('common.empty') }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('printer.second_nickname')" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.second">
                {{ scope.row.second.nickname }}
              </span>
              <span v-else>
                {{ $t('common.empty') }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('manager.nickname')" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.manager">
                {{ scope.row.manager.nickname }}
              </span>
              <span v-else>
                {{ $t('common.empty') }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('manager.username')" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.manager">
                {{ scope.row.manager.username }}
              </span>
              <span v-else>
                {{ $t('common.empty') }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="code" :label="$t('printer.code')" width="120">
          </el-table-column>

          <el-table-column prop="ink_quantity" :label="$t('printer.ink_quantity')" width="200">
            <template slot-scope="scope">
              <el-progress :text-inside="true" :stroke-width="20" status="exception" :percentage="scope.row.ink_quantity"></el-progress>
            </template>
          </el-table-column>

          <el-table-column prop="paper_quantity" :label="$t('printer.paper_quantity')" width="120">
          </el-table-column>

          <el-table-column prop="address" :label="$t('printer.address')">
          </el-table-column>

          <el-table-column :label="$t('printer.qrcode_url')" width="120">
            <template slot-scope="scope" v-if="scope.row.qrcode_url != ''">
              <el-link type="primary" :href="scope.row.qrcode_url" target="_blank">
                {{ $t('common.download') }}
              </el-link>
            </template>
          </el-table-column>

          <el-table-column :label="$t('printer.bind_status')" width="100">
            <template slot-scope="scope">
              <span>
                {{ scope.row.bind_status.text }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('printer.status')" width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.activate_status.value"
                :active-value="1"
                :inactive-value="2"
                @change="handleStatus($event, scope.row.id, 'activate_status')">
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="580">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:printer:paper') && scope.row.bind_status.value == 1" icon="el-icon-files" @click="actionHandle(scope.row.id, 1)">
                {{ $t('printer.paper_info') }}
              </el-button>

              <el-button v-if="isAuth('module:printer:ink') && scope.row.bind_status.value == 1" type="warning" icon="el-icon-help" @click="actionHandle(scope.row.id, 2)">
                {{ $t('printer.ink_info') }}
              </el-button>

              <el-button v-if="isAuth('module:printer:equipment') && scope.row.bind_status.value == 1" type="success" icon="el-icon-printer" @click="actionHandle(scope.row.id, 3)">
                {{ $t('printer.equipment_info') }}
              </el-button>

              <el-button v-if="isAuth('module:printer:handle') && scope.row.bind_status.value == 1 && scope.row.qrcode_url == ''" icon="el-icon-menu" @click="qrcodeHandle(scope.row.id)">
                {{ $t('printer.qrcode_info') }}
              </el-button>

              <el-button v-if="isAuth('module:printer:log:list') && scope.row.bind_status.value == 1" type="info" icon="el-icon-paperclip" @click="$router.push({name: 'module_printer_log_list', query: {printer_id : scope.row.id}})">
                {{ $t('printer.log_info') }}
              </el-button>

              <el-button v-if="isAuth('module:printer:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
                {{ $t('common.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="admin_table_main_pagination">
          <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :page-size="pageSize"
            :total="totalPage"
            :current-page="pageIndex"
            background layout="prev, pager, next,jumper,total">
          </el-pagination>
        </div>
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
        model: 'printer',
        statusList: [
          {'id': 1, title: '在线'},
          {'id': 2, title: '离线'},
          {'id': 3, title: '损坏'},
        ],
        dataForm: [
          'title',
          'bind_status',
          'activate_status',
        ]
      };
    },
    methods: {
      // 操作
      actionHandle (id, action) {
        let message = '您确定要配送纸张？'

        if(2 == action)
        {
          message = '您确定要更新墨盒？'
        }
        else if(3 == action)
        {
          message = '您确定要更换设备？'
        }

        this.$confirm(message, this.$t('common.prompt'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/printer/log/handle'),
            method: 'post',
            data: {
              printer_id: id,
              action: action
            }
          }).then(({data}) => {
            if (data && data.status === 200) {
              this.$message({
                message: this.$t('common.handle_success'),
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(this.$t(data.message))
            }
          })
        }).catch(() => {})
      },
      // 生成二维码
      qrcodeHandle (id) {
        this.$http({
          url: this.$http.adornUrl(`/printer/handle`),
          method: 'post',
          data: {
            printer_id: id
          }
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.refresh();
          }
        })
      }
    },
    created() {
      this.getDataList()
    }
  };
</script>
