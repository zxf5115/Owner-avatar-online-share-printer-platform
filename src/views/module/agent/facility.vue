<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('agent.facility_info') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_member_list'})">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('agent.printer_info') }}</span>
            </div>
            <div class="text item">
              <el-transfer
                filterable
                :props="props"
                :titles="titles"
                v-model="dataForm.printer_id"
                :data="printerList">
              </el-transfer>
            </div>
          </el-card>

          <el-card class="box-card mt10" shadow="never">
            <div class="text item">
              <el-form-item>
                <el-button v-if="isAuth('module:agent:handle')" type="primary" @click="dataFormSubmit()">
                  {{ $t('common.confirm') }}
                </el-button>
                <el-button @click="resetForm()">
                  {{ $t('common.reset') }}
                </el-button>
              </el-form-item>
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
        model: 'agent',
        printerList: [],
        dataForm:
        {
          id: 0,
          printer_id: [],
        },
        dataRule: {},
        props: {
          key: 'id',
          label: 'title',
        },
        titles: ['全部设备', '我的设备'],
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
              url: this.$http.adornUrl(`/agent/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.id          = data.data.id
                if(data.data.member_printer)
                {
                  let printer = data.data.member_printer

                  printer.forEach(res=>{
                    this.dataForm.printer_id.push(res.printer_id);
                  });
                }
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/agent/facility`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'printer_id': this.dataForm.printer_id,
              })
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.$message.success(this.$t('common.handle_success'));
                this.$router.go(-1);
              } else {
                this.$message.error(this.$t(data.message))
              }
            })
          }
        })
      },
      loadPrinterList () {
        this.$http({
          url: this.$http.adornUrl('/printer/data'),
          method: 'get',
          params: this.$http.adornParams({
            'member_id': this.dataForm.id
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.printerList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
    },
    created(request)
    {
      this.init();
      this.loadPrinterList();
    }
  };
</script>
