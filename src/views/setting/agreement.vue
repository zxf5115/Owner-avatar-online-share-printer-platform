<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            {{ $t('config.agreement.center') }}
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-form label-width="120px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-form-item :label="$t('config.agreement.title')" prop="title">
            <el-select v-model="dataForm.title" :placeholder="$t('common.please_select')+$t('config.agreement.title')" @change="changeContent">
              <el-option v-for="(v,k) in agreementList" :label="v.name" :key="k" :value="v.title"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="mavon" prop="content" :label="$t('config.agreement.content')">
            <editor ref="editor" :value="dataForm.content"></editor>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('setting:agreement')" type="primary" @click="dataFormSubmit()">
              {{ $t('common.confirm') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  import Editor from "@/components/form/editor"
  export default {
    extends: common,
    components: {
      Editor
    },
    data() {
      return {
        model: 'setting/agreement',
        agreementList: [],
        dataForm:
        {
          id: 0,
          title: '',
          content : '',
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('config.agreement.rules.title.require'), trigger: 'blur' },
          ]
        }
      };
    },
    methods: {
      init ()
      {
        this.$http({
          url: this.$http.adornUrl(`/setting/agreement`),
          method: 'get',
          params: this.$http.adornParams({
            'title': 'about',
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.dataForm.title = data.data.title
            this.dataForm.content = data.data.content
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/setting/agreement`),
              method: 'post',
              data: this.$http.adornData({
                'title': this.dataForm.title,
                'content': this.$refs.editor.content,
              })
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.$message.success(this.$t('common.handle_success'));
                this.refresh()
              } else {
                this.$message.error(this.$t(data.message))
              }
            })
          }
        })
      },
      loadAgreementList () {
        this.$http({
          url: this.$http.adornUrl('/config/agreement/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.agreementList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      changeContent (title) {
        this.$http({
          url: this.$http.adornUrl('/config/agreement/data'),
          method: 'get',
          params: this.$http.adornParams({
            'title': title,
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.dataForm.content = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      }
    },
    created(request)
    {
      this.loadAgreementList();

      this.init();
    },
  };
</script>
<style lang="scss" scoped>
  .mavon {
    width: 95% !important;
  }
</style>
