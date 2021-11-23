<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_right">
          <div>
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_inbound_list'})">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_table_main">
        <el-table :data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandle">
          <el-table-column type="selection" header-align="center" align="center">
          </el-table-column>

          <el-table-column prop="id" label="#"  width="70px">
          </el-table-column>

          <el-table-column :label="$t('inventory.inbound.abnormal.inbound_id')">
            <template slot-scope="scope">
              <span v-if="scope.row.inbound">
                {{ scope.row.inbound.id }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('inventory.inbound.abnormal.type')">
            <template slot-scope="scope">
              {{ scope.row.type.text }}
            </template>
          </el-table-column>

          <el-table-column prop="model" :label="$t('inventory.inbound.abnormal.model')">
          </el-table-column>

          <el-table-column prop="code" :label="$t('inventory.inbound.abnormal.code')">
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('inventory.inbound.abnormal.create_time')" width="150">
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
        model: 'inbound/abnormal',
        dataForm: []
      };
    },
    created() {
      this.getDataList()
    }
  };
</script>
