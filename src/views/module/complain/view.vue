<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('complain.view') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_complain_list'})">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main color">
        <el-form :model="dataForm" label-width="120">

          <el-form-item :label="$t('complain.type')" label-width="80">
            {{ dataForm.type.text }}
          </el-form-item>

          <el-form-item :label="$t('complain.content')" label-width="120">
            {{ dataForm.content }}
          </el-form-item>

          <el-form-item :label="$t('complain.customer_name')" label-width="80">
            <span v-if="dataForm.member">
              {{ dataForm.member.nickname }}
            </span>
          </el-form-item>

          <el-form-item :label="$t('complain.contact')" label-width="80">
            {{ dataForm.contact }}
          </el-form-item>

          <el-form-item :label="$t('complain.create_time')" label-width="80">
            {{ dataForm.create_time }}
          </el-form-item>

          <el-divider content-position="left">
            {{ $t('complain.resource.picture') }}
          </el-divider>

          <el-row type="flex" class="row-bg">
            <el-col :span="3" v-for="(item, index) in dataForm.resource" :key="index">
              <el-image style="width: auto;height: 100px;" :src="item.picture" :preview-src-list="resource">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </el-col>
          </el-row>
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
        model: 'complain',
        resource: [],
        dataForm: {
          type: ''
        },
        dataRule: {}
      };
    },
    methods:
    {
      init ()
      {
        let query = this.$route.query
        let id = query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/complain/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm   = data.data

                data.data.resource.forEach(res => {
                  this.resource.push(res.picture);
                });
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
