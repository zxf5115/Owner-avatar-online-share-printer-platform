<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:member:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.username" :placeholder="$t('common.please_input') + $t('member.username')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.nickname" :placeholder="$t('common.please_input') + $t('member.nickname')" clearable>
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

          <el-table-column prop="id" :label="$t('common.id')" width="70">
          </el-table-column>

          <el-table-column prop="username" :label="$t('member.username')" width="100">
          </el-table-column>

          <el-table-column :label="$t('member.info')">
            <template slot-scope="scope">
              <dl class="table_dl">
                <dt>
                  <el-avatar :size="45" :src="scope.row.avatar">
                    <img src="@/assets/images/default/circle.png"/>
                  </el-avatar>
                </dt>
                <dd class="table_dl_dd_all_30">
                  {{ $t('member.nickname') }}： {{ scope.row.nickname }}
                </dd>
                <dd class="table_dl_dd_all_16_gray">
                  {{ $t('member.create_time') }}： {{ scope.row.create_time }}
                </dd>
              </dl>
            </template>
          </el-table-column>

          <el-table-column :label="$t('member.archive.age')" width="100">
            <template slot-scope="scope" v-if="scope.row.archive">
              {{ scope.row.archive.age }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('member.archive.sex')" width="100">
            <template slot-scope="scope" v-if="scope.row.archive">
              {{ scope.row.archive.sex.text }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('common.province')" width="140">
            <template slot-scope="scope" v-if="scope.row.archive">
              {{ scope.row.archive.province_id.text }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('common.city')" width="140">
            <template slot-scope="scope" v-if="scope.row.archive">
              {{ scope.row.archive.city_id.text }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('common.region')" width="140">
            <template slot-scope="scope" v-if="scope.row.archive">
              {{ scope.row.archive.region_id.text }}
            </template>
          </el-table-column>

          <el-table-column prop="last_login_time" :label="$t('member.last_login_time')" width="140">
          </el-table-column>

          <el-table-column prop="status" :label="$t('member.status')" width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status.value"
                :active-value="1"
                :inactive-value="2"
                @change="handleStatus($event, scope.row.id, 'status')">
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="200">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:member:view')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_member_view', query: {id: scope.row.id}})">
                {{ $t('common.view') }}
              </el-button>

              <el-button v-if="isAuth('module:member:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'member',
        dataForm: [
          'username',
          'nickname',
        ],
      };
    },
    methods: {
      handleStatus($event, id, field) {
        this.$http({
          url: this.$http.adornUrl('/member/status'),
          method: 'post',
          data: {
            id: id,
            field: field,
            value: $event
          }
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.$message({
              message: this.$t('common.handle_success'),
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      }
    },
    created() {
      this.getDataList()
    }
  };
</script>

