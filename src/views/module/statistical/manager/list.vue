<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left color">
          <div>
            {{ $t('statistical.content') }} <b class="red">{{ total }}</b>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.username" :placeholder="$t('common.please_input') + $t('manager.username')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.nickname" :placeholder="$t('common.please_input') + $t('manager.nickname')" clearable>
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

          <el-table-column :label="$t('manager.agent_name')" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.parent">
                {{ scope.row.parent.nickname }}
              </span>
              <span v-else>
                {{ $t('common.empty') }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('manager.info')">
            <template slot-scope="scope">
              <dl class="table_dl">
                <dt>
                  <el-avatar :size="45" :src="scope.row.avatar">
                    <img src="@/assets/images/default/circle.png"/>
                  </el-avatar>
                </dt>
                <dd class="table_dl_dd_all_30">
                  {{ $t('manager.nickname') }}： {{ scope.row.nickname }}
                </dd>
                <dd class="table_dl_dd_all_16_gray">
                  {{ $t('manager.create_time') }}： {{ scope.row.create_time }}
                </dd>
              </dl>
            </template>
          </el-table-column>

          <el-table-column prop="username" :label="$t('manager.username')" width="120">
          </el-table-column>

          <el-table-column :label="$t('common.area')" width="150">
            <template slot-scope="scope" v-if="scope.row.archive">
              {{ scope.row.archive.province_id.text }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('statistical.money')" width="100">
            <template slot-scope="scope" v-if="scope.row.asset">
              <b class="red">{{ scope.row.asset.money }}</b>
            </template>
          </el-table-column>

          <el-table-column :label="$t('statistical.withdrawal_money')" width="100">
            <template slot-scope="scope" v-if="scope.row.asset">
              <b class="red">{{ scope.row.asset.withdrawal_money }}</b>
            </template>
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="100">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:statistical:manager:view')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_statistical_manager_view', query: {id: scope.row.id}})">
                {{ $t('common.view') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="admin_table_main_pagination">
          <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :page-sizes="[10, 50, 100, 500]"
            :page-size="pageSize"
            :total="totalPage"
            :current-page="pageIndex"
            background layout="prev, pager, next, jumper, total, sizes">
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
        model: 'statistical/manager',
        provinceList: [],
        total: 0.00,
        dataForm: [
          'username',
          'nickname',
          'parent_nickname',
          'archive_province_id',
        ],
      };
    },
    methods: {
      money ()
      {
        this.$http({
          url: this.$http.adornUrl(`/statistical/manager/total`),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'username': this.dataForm.username,
            'nickname': this.dataForm.nickname,
            'parent_nickname': this.dataForm.parent_nickname,
            'archive_province_id': this.dataForm.archive_province_id,
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.total   = data.data
          }
        })
      }
    },
    created() {
      if(this.$route.query.parent_id)
      {
        this.dataForm.parent_id = this.$route.query.parent_id;
      }

      this.money();

      this.getDataList();
    }
  };
</script>

