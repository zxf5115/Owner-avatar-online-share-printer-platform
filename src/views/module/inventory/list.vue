<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-button v-if="isAuth('module:inbound:form')" type="success" icon="el-icon-download" @click="$router.push({name: 'module_inbound_form'})">
              {{ $t('inventory.inbound.from') }}
            </el-button>
          </div>
          <div>
            <el-button v-if="isAuth('module:outbound:form')" type="primary" icon="el-icon-upload2" @click="$router.push({name: 'module_outbound_form'})">
              {{ $t('inventory.outbound.from') }}
            </el-button>
          </div>
        </div>
      </div>


      <div class="admin_main_block_top">
        <el-descriptions class="margin-top mt10 color" :column="7">
          <el-descriptions-item :label="$t('inventory.printer_total')">
            <b class="green1">
              {{ brief.printer }}
            </b>
          </el-descriptions-item>
          <el-descriptions-item :label="$t('inventory.ink_total')">
            <b class="blue">
              {{ brief.ink }}
            </b>
          </el-descriptions-item>
          <el-descriptions-item :label="$t('inventory.paper_total')">
            <b class="purple">
              {{ brief.paper }}
            </b>
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-select v-model="dataForm.type" :placeholder="$t('common.please_select') + $t('inventory.type')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in typeList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </div>
          <div>
            <el-select v-model="dataForm.equipment_status" :placeholder="$t('common.please_select') + $t('inventory.type')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in equipmentList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
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

          <el-table-column prop="id" label="#"  width="70px">
          </el-table-column>

          <el-table-column :label="$t('inventory.type')">
            <template slot-scope="scope">
              {{ scope.row.type.text }}
            </template>
          </el-table-column>

          <el-table-column prop="model" :label="$t('inventory.model')">
          </el-table-column>

          <el-table-column prop="code" :label="$t('inventory.code')">
          </el-table-column>

          <el-table-column :label="$t('inventory.equipment_status')" width="100">
            <template slot-scope="scope">
              {{ scope.row.equipment_status.text }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('inventory.inventory_status')" width="100">
            <template slot-scope="scope">
              {{ scope.row.inventory_status.text }}
            </template>
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('inventory.create_time')" width="150">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="100">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:inventory:log:list')" icon="el-icon-tickets" @click="$router.push({name: 'module_inventory_log_list', query: {inventory_id: scope.row.id}})">
                {{ $t('inventory.log_info') }}
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
        model: 'inventory',
        category_id: 0,
        typeList: [
          {'id': 1, 'title': '打印机'},
          {'id': 2, 'title': '墨盒'},
          {'id': 3, 'title': '纸张'},
        ],
        equipmentList: [
          {'id': 1, 'title': '全新'},
          {'id': 2, 'title': '返修'},
          {'id': 3, 'title': '损坏'},
        ],
        brief: [],
        dataForm: [
          'type',
          'equipment_status',
          'create_time',
        ]
      };
    },
    methods: {
      statistical ()
      {
        this.$http({
          url: this.$http.adornUrl(`/inventory/brief`),
          method: 'get',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.brief   = data.data
          }
        })
      }
    },
    created() {
      this.statistical()

      this.getDataList()
    }
  };
</script>

<style lang="scss" scoped>
  .label {
    width: 25%;
  }
</style>
