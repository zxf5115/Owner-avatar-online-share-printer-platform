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
            <el-select v-model="dataForm.parent_id" :placeholder="$t('common.please_select') + $t('manager.agent_name')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in agentList" :label="v.nickname" :key="k" :value="v.id"></el-option>
            </el-select>
          </div>
          <div>
            <el-input v-model="dataForm.username" :placeholder="$t('common.please_input') + $t('agent.username')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.nickname" :placeholder="$t('common.please_input') + $t('agent.nickname')" clearable>
            </el-input>
          </div>
          <div>
            <el-select v-model="dataForm.archive_province_id" :placeholder="$t('common.please_select') + $t('common.area')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in provinceList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </div>
          <div>
            <el-select v-model="dataForm.level" :placeholder="$t('common.please_select') + $t('agent.level')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in levelList" :label="v.title" :key="k" :value="v.id"></el-option>
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

          <el-table-column prop="id" :label="$t('common.id')" width="70">
          </el-table-column>

          <el-table-column :label="$t('agent.parent_agent')" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.parent">
                {{ scope.row.parent.nickname }}
              </span>
              <span v-else>
                {{ $t('common.empty') }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('agent.info')">
            <template slot-scope="scope">
              <dl class="table_dl">
                <dt>
                  <el-avatar :size="45" :src="scope.row.avatar">
                    <img src="@/assets/images/default/circle.png"/>
                  </el-avatar>
                </dt>
                <dd class="table_dl_dd_all_30">
                  {{ $t('agent.nickname') }}： {{ scope.row.nickname }}
                </dd>
                <dd class="table_dl_dd_all_16_gray">
                  {{ $t('agent.create_time') }}： {{ scope.row.create_time }}
                </dd>
              </dl>
            </template>
          </el-table-column>

          <el-table-column prop="username" :label="$t('agent.username')" width="120">
          </el-table-column>

          <el-table-column :label="$t('agent.level')" width="120">
            <template slot-scope="scope">
              {{ scope.row.level.text }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('common.area')" width="120">
            <template slot-scope="scope" v-if="scope.row.archive">
              {{ scope.row.archive.province_id.text }}
            </template>
          </el-table-column>

          <el-table-column prop="below_agent_total" :label="$t('agent.below_agent')" width="100">
          </el-table-column>

          <el-table-column :label="$t('statistical.withdrawal_money')" width="100">
            <template slot-scope="scope" v-if="scope.row.asset">
              {{ scope.row.asset.withdrawal_money }}
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
        model: '/statistical/agent',
        levelList: [
          {'id': 1, 'title': '一级代理'},
          {'id': 2, 'title': '二级代理'},
        ],
        provinceList: [],
        agentList: [],
        total: 0.00,
        dataForm: [
          'username',
          'nickname',
          'parent_id',
          'archive_province_id',
          'level',
        ],
      };
    },
    methods: {
      money ()
      {
        this.$http({
          url: this.$http.adornUrl(`/statistical/agent/total`),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'username': this.dataForm.username,
            'nickname': this.dataForm.nickname,
            'parent_id': this.dataForm.parent_id,
            'archive_province_id': this.dataForm.archive_province_id,
            'level': this.dataForm.level,
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.total   = data.data
          }
        })
      },
      loadProvinceList () {
        this.$http({
          url: this.$http.adornUrl('/common/area/list'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.provinceList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      loadAgentList () {
        this.$http({
          url: this.$http.adornUrl('/agent/select'),
          method: 'get',
          params: this.$http.adornParams({
            'role_id': 3,
            'level': 1
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.agentList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      }
    },
    created() {
      this.dataForm.parent_id = this.$route.query.parent_id;

      this.money();

      this.getDataList();

      this.loadProvinceList();
      this.loadAgentList();
    }
  };
</script>

