<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_right">
          <div>
            <el-button icon="el-icon-back" @click="$router.go(-1)">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.model" :placeholder="$t('common.please_input') + $t('inventory.model')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.code" :placeholder="$t('common.please_input') + $t('inventory.code')" clearable>
            </el-input>
          </div>
          <div>
            <el-button icon="el-icon-search" @click="getDataList(true)">
              {{ $t('common.search') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_table_main color">
        <el-table :data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandle">
          <el-table-column type="selection" header-align="center" align="center">
          </el-table-column>

          <el-table-column prop="id" :label="$t('common.id')" width="70">
          </el-table-column>

          <el-table-column :label="$t('inventory.type')" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.inbound">
                {{ scope.row.inbound.type.text }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="model" :label="$t('inventory.model')" width="100">
          </el-table-column>

          <el-table-column prop="code" :label="$t('inventory.code')">
          </el-table-column>

          <el-table-column :label="$t('inventory.outbound.log.content')">
            <template slot-scope="scope">
              <b class="red">
                {{ scope.row.content }}
              </b>
            </template>
          </el-table-column>

          <el-table-column :label="$t('inventory.outbound.operator')" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.inbound">
                {{ scope.row.inbound.operator }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('inventory.outbound.log.create_time')" width="140">
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
        model: 'inbound/log',
        dataForm: [
          'code',
          'model',
          'inbound_id',
        ],
      };
    },
    created() {
      this.dataForm.inbound_id = this.$route.query.inbound_id;
      this.getDataList()
    }
  };
</script>
