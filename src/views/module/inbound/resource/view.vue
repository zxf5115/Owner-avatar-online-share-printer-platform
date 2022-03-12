<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('inventory.inbound.resource_info') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_inbound_list'})">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-form ref="form" :model="dataForm" label-width="80">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('common.basic_info') }}</span>
            </div>
            <div class="text item">
              <el-row>
                <el-col :span="6" class="text-center">
                  <el-image class="resource" :src="dataForm.picture" :preview-src-list="picture">
                  </el-image>
                  <div class="mt10">
                    <span>
                      <el-link :underline="false">
                        {{ $t('inventory.inbound.resource.picture') }}
                      </el-link>
                    </span>
                  </div>
                </el-col>
                <el-col :span="6" class="text-center">
                  <el-link :href="dataForm.device_code" target="_blank" :underline="false">
                    <el-image class="resource" :src="require('@/assets/images/excel.png')">
                    </el-image>
                    <div class="mt10">
                      <span>
                        {{ $t('inventory.outbound.device_code') }}
                      </span>
                    </div>
                  </el-link>
                </el-col>
                <el-col :span="6" class="text-center">
                  <el-link :href="dataForm.device_code_warehouse" target="_blank" :underline="false">
                    <el-image class="resource" :src="require('@/assets/images/excel.png')">
                    </el-image>
                    <div class="mt10">
                      <span>
                        {{ $t('inventory.inbound.resource.device_code_warehouse') }}
                      </span>
                    </div>
                  </el-link>
                </el-col>
                <el-col :span="6" class="text-center">
                  <el-image class="resource" :src="dataForm.receipt_form" :preview-src-list="receipt_form">
                  </el-image>
                  <div class="mt10">
                    <span>
                      <el-link :underline="false">
                        {{ $t('inventory.inbound.resource.receipt_form') }}
                      </el-link>
                    </span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  export default
  {
    extends: common,
    data()
    {
      return {
        model: 'inbound/resource',
        dataForm:
        {
          id: 0,
        },
        picture: [],
        receipt_form: [],
      };
    },
    methods:
    {
      init ()
      {
        let id = this.$route.query.inbound_id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/inbound/resource/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams({})
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm   = data.data

                this.picture.push(data.data.picture)
                this.receipt_form.push(data.data.receipt_form)
              }
            })
          }
        })
      },
    },
    created(request)
    {
      this.init();
    }
  };
</script>
<style lang="scss" scoped>
  .resource {
    width: 120px;
    height: 120px
  }
</style>
