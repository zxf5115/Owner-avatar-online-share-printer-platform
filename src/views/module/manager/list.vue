<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:manager:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
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
      <div class="admin_table_main">
        <el-table :data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandle">
          <el-table-column type="selection" header-align="center" align="center">
          </el-table-column>

          <el-table-column prop="id" :label="$t('common.id')" width="70">
          </el-table-column>

          <el-table-column prop="username" :label="$t('manager.username')" width="100">
          </el-table-column>

          <el-table-column :label="$t('manager.info')" width="260">
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

          <el-table-column :label="$t('manager.asset_money')">
            <template slot-scope="scope" v-if="scope.row.asset">
              {{ scope.row.asset.money }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('manager.certification_info')">
            <template slot-scope="scope" v-if="scope.row.certification">
              {{ scope.row.certification.type.text }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('manager.certification_status')">
            <template slot-scope="scope" v-if="scope.row.certification">
              {{ scope.row.certification.certification_status.text }}
            </template>
          </el-table-column>

          <el-table-column prop="status" :label="$t('manager.status')" width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status.value"
                :active-value="1"
                :inactive-value="2"
                @change="handleStatus($event, scope.row.id, 'status')">
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="380">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:manager:view')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_manager_view', query: {id: scope.row.id}})">
                {{ $t('common.view') }}
              </el-button>

              <el-button v-if="isAuth('module:manager:form')" type="primary" icon="el-icon-check" @click="$router.push({name: 'module_manager_form', query: {id: scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:manager:certification') && scope.row.certification && 1 != scope.row.certification.certification_status.value" type="warning" icon="el-icon-edit" @click="$router.push({name: 'module_manager_certification', query: {id: scope.row.id}})">
                {{ $t('common.certification') }}
              </el-button>

              <el-button v-if="isAuth('module:manager:delete') && scope.row.id != 1" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'manager',
        dataForm: [
          'username',
          'nickname',
        ],
      };
    },
    methods: {
      handleStatus($event, id, field) {
        this.$http({
          url: this.$http.adornUrl('/manager/status'),
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

