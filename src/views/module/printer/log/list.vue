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

          <el-table-column :label="$t('printer.model')" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.printer">
                {{ scope.row.printer.model }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('printer.title')" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.printer">
                {{ scope.row.printer.title }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="content" :label="$t('printer.log.content')">
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('common.create_time')" width="140">
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
        dataForm: [
          'content',
        ]
      };
    },
    created() {
      this.dataForm.printer_id = this.$route.query.printer_id;
      this.getDataList()
    }
  };
</script>
