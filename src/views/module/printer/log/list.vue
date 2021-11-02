<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:printer:log:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_complain_list'})">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">

        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item>
            <template slot="label">
              {{ $t('manager.nickname') }}
            </template>
            <span v-if="printerInfo.manager">
              {{ printerInfo.manager.nickname }}
            </span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              {{ $t('printer.address') }}
            </template>
            {{ printerInfo.address }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              {{ $t('printer.code') }}
            </template>
            {{ printerInfo.code }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              {{ $t('printer.paper_quantity') }}
            </template>
            <el-tag type="danger" size="small">
              {{ printerInfo.paper_quantity }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              {{ $t('printer.ink_quantity') }}
            </template>
            <el-tag type="danger" size="small">
              {{ printerInfo.ink_quantity }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              {{ $t('printer.failure_number') }}
            </template>
            <el-tag type="danger" size="small">
              <el-link type="danger" @click="$router.push({name: 'module_repair_list', query: {printer_id: printerInfo.id}})">
                {{ printerInfo.failure_number }}
              </el-link>
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.content" :placeholder="$t('common.please_input') + $t('printer.log.content')" clearable>
            </el-input>
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

          <el-table-column prop="content" :label="$t('printer.log.content')">
          </el-table-column>

          <el-table-column prop="operator" :label="$t('printer.log.operator')">
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('printer.log.create_time')" width="140">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="100">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:printer:log:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'printer/log',
        printer_id: 0,
        printerInfo: {},
        dataForm: [
          'content',
        ]
      };
    },
    methods:
    {
      printer ()
      {
        this.$http({
          url: this.$http.adornUrl(`/printer/view/${this.dataForm.printer_id}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.printerInfo = data.data
          }
        })
      }
    },
    created() {
      this.dataForm.printer_id = this.$route.query.printer_id;
      this.printer()
      this.getDataList()
    }
  };
</script>
