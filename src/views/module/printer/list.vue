<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <router-link :to="{name: 'module_printer_form'}">
              <el-button v-if="isAuth('module:printer:form')" type="success" icon="el-icon-plus">
                {{ $t('common.create') }}
              </el-button>
            </router-link>
          </div>
        </div>
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
            <el-select v-model="dataForm.status" :placeholder="$t('common.please_select') + $t('printer.status')" clearable>
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

          <el-table-column :label="$t('printer.nickname')" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.member">
                {{ scope.row.member.nickname }}
              </span>
              <span v-else>
                {{ $t('common.empty') }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('printer.username')" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.member">
                {{ scope.row.member.username }}
              </span>
              <span v-else>
                {{ $t('common.empty') }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="title" :label="$t('printer.title')" width="140">
          </el-table-column>

          <el-table-column prop="model" :label="$t('printer.model')" width="120">
          </el-table-column>

          <el-table-column prop="failure_number" :label="$t('printer.failure_number')" width="100">
          </el-table-column>

          <el-table-column :label="$t('common.province')" width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.province_id">
                {{ scope.row.province_id.text }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('common.city')" width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.city_id">
                {{ scope.row.city_id.text }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('common.region')" width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.region_id">
                {{ scope.row.region_id.text }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="address" :label="$t('printer.address')">
          </el-table-column>

          <el-table-column :label="$t('printer.allot_status')" width="100">
            <template slot-scope="scope">
              <span>
                {{ scope.row.allot_status.text }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="status" :label="$t('printer.status')" width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status.value"
                :active-value="1"
                :inactive-value="2"
                @change="handleStatus($event, scope.row.id, 'status')">
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="280">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:printer:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_printer_form', query: {id : scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:printer:log:list')" type="info" icon="el-icon-paperclip" @click="$router.push({name: 'module_printer_log_list', query: {printer_id : scope.row.id}})">
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
        ],
        dataForm: [
          'title',
          'status',
        ]
      };
    },
    created() {
      this.getDataList()
    }
  };
</script>
