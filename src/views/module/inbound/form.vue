<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('inventory.inbound.from') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button icon="el-icon-back" @click="$router.go(-1)">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-steps space="33%" :active="dataForm.active" finish-status="success" :align-center="true">
          <el-step :title="$t('inventory.inbound.write')"></el-step>
          <el-step :title="$t('inventory.inbound.inventory')"></el-step>
          <el-step :title="$t('inventory.inbound.finish')"></el-step>
        </el-steps>

        <div v-if="0 == dataForm.active">
          <write></write>
        </div>
        <div v-if="1 == dataForm.active">
          <inventory></inventory>
        </div>
        <div v-if="2 == dataForm.active">
          <abnormal></abnormal>
        </div>
        <div v-if="3 == dataForm.active">
          <finish></finish>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  import Write from "@/components/inbound/write.vue";
  import Inventory from "@/components/inbound/inventory.vue";
  import Abnormal from "@/components/inbound/abnormal.vue";
  import Finish from "@/components/inbound/finish.vue";
  export default {
    extends: common,
    components: {
      Write,
      Inventory,
      Abnormal,
      Finish,
    },
    data() {
      return {
        model: 'inbound',
        dataForm:
        {
          id: 0,
          active: 0
        }
      };
    },
    methods: {
      init ()
      {
        let query = this.$route.query
        let id = query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/inbound/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.active = data.data.active
              }
            })
          }
        })
      },
    },
    created() {
      this.init();
    },
  };
</script>
