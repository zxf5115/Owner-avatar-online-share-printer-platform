<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <router-link :to="{name: 'module_agent_form'}">
              <el-button v-if="isAuth('module:agent:form')" type="success" icon="el-icon-plus">
                {{ $t('common.create') }}
              </el-button>
            </router-link>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:agent:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
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

          <el-table-column :label="$t('agent.info')" width="260">
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

          <el-table-column :label="$t('agent.asset.money')" width="100">
            <template slot-scope="scope" v-if="scope.row.asset">
              {{ scope.row.asset.money }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('agent.asset.proportion')" width="100">
            <template slot-scope="scope" v-if="scope.row.asset">
              {{ scope.row.asset.proportion }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('agent.asset.should_printer_total')" width="100">
            <template slot-scope="scope" v-if="scope.row.asset">
              {{ scope.row.asset.should_printer_total }}
            </template>
          </el-table-column>

          <el-table-column prop="below_agent_total" :label="$t('agent.below_agent')" width="100">
          </el-table-column>

          <el-table-column :label="$t('agent.below_manager')" width="100">
            <template slot-scope="scope">
              <el-link type="primary" @click="$router.push({name: 'module_manager_list', query: {parent_id: scope.row.id}})">
                {{ scope.row.below_manager_total }}
              </el-link>
            </template>
          </el-table-column>

          <el-table-column :label="$t('agent.archive.qrcode_url')" width="120">
            <template slot-scope="scope" v-if="scope.row.archive">
              <el-link type="primary" :href="scope.row.archive.qrcode_url" target="_blank">
                {{ $t('common.download') }}
              </el-link>
            </template>
          </el-table-column>

          <el-table-column prop="status" :label="$t('agent.status')" width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status.value"
                :active-value="1"
                :inactive-value="2"
                @change="handleStatus($event, scope.row.id, 'status')">
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="350">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:agent:view')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_agent_view', query: {id: scope.row.id}})">
                {{ $t('common.view') }}
              </el-button>

              <el-button v-if="isAuth('module:agent:apply')" type="primary" icon="el-icon-view" @click="applyHandle(scope.row.id)">
                {{ $t('agent.apply_info') }}
              </el-button>

              <el-button v-if="isAuth('module:agent:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
                {{ $t('common.delete') }}
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
        model: 'agent',
        levelList: [
          {'id': 1, 'title': '一级代理'},
          {'id': 2, 'title': '二级代理'},
        ],
        provinceList: [],
        agentList: [],
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
      },
      applyHandle(id) {
        this.$http({
          url: this.$http.adornUrl('/agent/apply'),
          method: 'post',
          data: this.$http.adornData({
            'id': id
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            window.open(data.data)
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      }
    },
    created() {
      this.dataForm.parent_id = this.$route.query.parent_id;

      this.getDataList();

      this.loadProvinceList();
      this.loadAgentList();
    }
  };
</script>

