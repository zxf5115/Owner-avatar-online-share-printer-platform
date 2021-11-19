<template>
  <div class="oubound color">
    <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">
      <el-card class="box-card mt10" shadow="never">
        <div class="text item">
          <el-result icon="success" title="入库完成">
            <template slot="extra">
              <el-button type="primary" size="medium" @click="$router.go(-1)">
                {{ $t('common.return') }}
              </el-button>
            </template>
          </el-result>
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  export default {
    extends: common,
    data() {
      return {
        model: 'inbound',
        dataForm:
        {
          id: 0,
        },
        dataRule: {}
      };
    },
  }
</script>

<style lang="scss" scoped>
  .oubound {
    padding-top: 50px;
  }
</style>
