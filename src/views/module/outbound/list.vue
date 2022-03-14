<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-button v-if="isAuth('module:outbound:form')" type="success" icon="el-icon-download" @click="$router.push({name: 'module_outbound_form'})">
              {{ $t('inventory.outbound.from') }}
            </el-button>
          </div>
        </div>
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
            <el-select v-model="dataForm.category" :placeholder="$t('common.please_select') + $t('inventory.outbound.category')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in categoryList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </div>
          <div>
            <el-input v-model="dataForm.member_username" :placeholder="$t('common.please_input') + $t('agent.username')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.member_nickname" :placeholder="$t('common.please_input') + $t('agent.nickname')" clearable>
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

          <el-table-column prop="id" label="#"  width="70px">
          </el-table-column>

          <el-table-column :label="$t('inventory.outbound.category')" width="100">
            <template slot-scope="scope">
              {{ scope.row.category.text }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('inventory.type')">
            <template slot-scope="scope">
              {{ scope.row.type.text }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('agent.nickname')" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.member">
                {{ scope.row.member.nickname }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('agent.username')" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.member">
                {{ scope.row.member.username }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="total" :label="$t('inventory.outbound.total')" width="80">
          </el-table-column>

          <el-table-column prop="operator" :label="$t('inventory.outbound.operator')" width="80">
          </el-table-column>

          <el-table-column :label="$t('inventory.outbound.outbound_status')" width="80">
            <template slot-scope="scope">
              {{ scope.row.outbound_status.text }}
            </template>
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('inventory.outbound.create_time')" width="140">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="370">
            <template slot-scope="scope">
              <span>
                <el-button class="mr10i" v-if="isAuth('module:outbound:form') && (scope.row.outbound_status.value != 3)" type="success" icon="el-icon-download" @click="$router.push({name: 'module_outbound_form', query: {id: scope.row.id}})">
                  {{ $t('inventory.outbound.update') }}
                </el-button>
              </span>
              <span>
                <el-button v-if="isAuth('module:outbound:detail:list')" type="info" icon="el-icon-printer" @click="$router.push({name: 'module_outbound_detail_list', query: {outbound_id: scope.row.id}})">
                  {{ $t('inventory.inbound.detail_info') }}
                </el-button>

                <el-button v-if="isAuth('module:outbound:logistics:view')" type="primary" icon="el-icon-truck" @click="$router.push({name: 'module_outbound_logistics_view', query: {outbound_id: scope.row.id}})">
                  {{ $t('inventory.log.logistics_info') }}
                </el-button>

                <el-button v-if="isAuth('module:outbound:resource:view')" icon="el-icon-paperclip" @click="$router.push({name: 'module_outbound_resource_view', query: {outbound_id: scope.row.id}})">
                  {{ $t('inventory.log.attachment_info') }}
                </el-button>
              </span>
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
        model: 'outbound',
        category_id: 0,
        typeList: [
          {'id': 1, 'title': '打印机'},
          {'id': 2, 'title': '墨盒'},
          {'id': 3, 'title': '纸张'},
        ],
        categoryList: [
          {'id': 1, 'title': '新设备出库'},
          {'id': 2, 'title': '返修出库'},
        ],
        dataForm: [
          'type',
          'category',
          'member_username',
          'member_nickname',
          'create_time',
        ]
      };
    },
    created() {
      this.getDataList()
    }
  };
</script>

<style lang="scss" scoped>

</style>
