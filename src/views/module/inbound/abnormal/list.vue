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

      <div class="admin_table_main color">
        <el-table :data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandle">
          <el-table-column type="selection" header-align="center" align="center">
          </el-table-column>

          <el-table-column prop="id" label="#"  width="70px">
          </el-table-column>

          <el-table-column :label="$t('inventory.inbound.abnormal.inbound_id')" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.inbound">
                {{ scope.row.inbound.id }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('inventory.inbound.abnormal.type')" width="80">
            <template slot-scope="scope">
              <b class="red">{{ scope.row.type.text }}</b>
            </template>
          </el-table-column>

          <el-table-column :label="$t('inventory.type')" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.inbound">
                {{ scope.row.inbound.type.text }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="model" :label="$t('inventory.inbound.abnormal.model')" width="100">
          </el-table-column>

          <el-table-column prop="code" :label="$t('inventory.inbound.abnormal.code')">
          </el-table-column>

          <el-table-column :label="$t('inventory.outbound.operator')" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.inbound">
                {{ scope.row.inbound.operator }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('inventory.inbound.abnormal.create_time')" width="140">
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
        dataForm: [
          'inbound_id'
        ]
      };
    },
    created() {
      this.dataForm.inbound_id = this.$route.query.inbound_id;
      this.getDataList()
    }
  };
</script>
