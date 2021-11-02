<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-button v-if="isAuth('module:repair:category:list')" icon="el-icon-price-tag" @click="$router.push({name: 'module_repair_category_list'})">
              {{ $t('repair.category.list') }}
            </el-button>
          </div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:repair:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-select v-model="dataForm.category_id" :placeholder="$t('common.please_select') + $t('repair.category.title')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in categoryList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </div>
          <div>
            <el-input v-model="dataForm.printer_code" :placeholder="$t('common.please_input') + $t('printer.code')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.member_username" :placeholder="$t('common.please_input') + $t('manager.username')" clearable>
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

          <el-table-column :label="$t('repair.category.title')" width="120">
            <template slot-scope="scope" v-if="scope.row.category">
              {{ scope.row.category.title }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('manager.nickname')" width="120">
            <template slot-scope="scope" v-if="scope.row.member">
              {{ scope.row.member.nickname }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('manager.username')" width="120">
            <template slot-scope="scope" v-if="scope.row.member">
              {{ scope.row.member.username }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('printer.code')" width="120">
            <template slot-scope="scope" v-if="scope.row.printer">
              {{ scope.row.printer.code }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('printer.address')">
            <template slot-scope="scope" v-if="scope.row.printer">
              {{ scope.row.printer.address }}
            </template>
          </el-table-column>

          <el-table-column prop="content" :label="$t('repair.content')">
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('repair.create_time')" width="140">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="200">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:repair:form')" type="primary" icon="el-icon-scissors" @click="$router.push({name: 'module_repair_form', query: {id: scope.row.id}})">
                {{ $t('repair.update') }}
              </el-button>

              <el-button v-if="isAuth('module:repair:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'repair',
        categoryList: [],
        dataForm: [
          'category_id',
          'printer_code',
          'member_username',
          'printer_id',
        ]
      };
    },
    methods: {
      loadCategoryList () {
        this.$http({
          url: this.$http.adornUrl('/repair/category/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.categoryList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
    },
    created() {
      this.dataForm.printer_id = this.$route.query.printer_id;

      this.getDataList();

      this.loadCategoryList();
    }
  };
</script>
