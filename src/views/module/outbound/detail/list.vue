<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:inventory:log:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.operator" :placeholder="$t('common.please_input') + $t('inventory.log.operator')" clearable>
            </el-input>
          </div>
          <div>
            <el-date-picker format="yyyy-MM-dd HH:mm" v-model="dataForm.create_time" type="daterange" :range-separator="$t('common.to')" :start-placeholder="$t('common.start_time')" :end-placeholder="$t('common.end_time')" clearable>
            </el-date-picker>
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

          <el-table-column prop="id" :label="$t('common.id')" width="70">
          </el-table-column>

          <el-table-column prop="content" :label="$t('inventory.log.content')">
          </el-table-column>

          <el-table-column prop="operator" :label="$t('inventory.log.operator')" width="100">
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('inventory.log.create_time')" width="150">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="280">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:inventory:log:list')" icon="el-icon-truck" @click="$router.push({name: 'module_inventory_log_list', query: {inventory_id: scope.row.id}})">
                {{ $t('inventory.log.logistics_info') }}
              </el-button>

              <el-button v-if="isAuth('module:inventory:log:list')" icon="el-icon-paperclip" @click="$router.push({name: 'module_inventory_log_list', query: {inventory_id: scope.row.id}})">
                {{ $t('inventory.log.attachment_info') }}
              </el-button>

              <el-button v-if="isAuth('module:inventory:log:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
            background layout="prev, pager, next, jumper, total">
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
        model: 'inventory/log',
        dataForm: [
          'inventory_id',
          'operator',
          'create_time'
        ],
      };
    },
    created() {
      this.dataForm.inventory_id = this.$route.query.inventory_id;
      this.getDataList()
    }
  };
</script>
