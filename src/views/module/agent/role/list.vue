<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.title" :placeholder="$t('common.please_input') + $t('member.role.title')" clearable>
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

          <el-table-column prop="id" :label="$t('common.id')" fixed="left" width="70px">
          </el-table-column>

          <el-table-column prop="title" :label="$t('member.role.title')">
          </el-table-column>

          <el-table-column prop="content" :label="$t('member.role.content')">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="100">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:member:role:form')" type="primary" icon="el-icon-edit" @click="$router.push({name:'module_member_role_form',query:{id:scope.row.id}})">
                {{ $t('common.update') }}
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
        model: 'member/role',
        dataForm: [
          'title'
        ],
      };
    },
    created() {
      this.getDataList()
    }
  };
</script>
