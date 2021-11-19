<template>
  <div class="oubound color">
    <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">

      <el-card class="box-card mt10" shadow="never">
        <div slot="header" class="clearfix">
          <span>{{ $t('inventory.inbound.basic_info') }}</span>
        </div>
        <div class="text item">
          <el-form-item :label="$t('inventory.type')" prop="type">
            <el-select v-model="dataForm.type" :placeholder="$t('common.please_select')+$t('inventory.type')">
              <el-option v-for="(v,k) in typeList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('inventory.inbound.category')" prop="category">
            <el-select v-model="dataForm.category" :placeholder="$t('common.please_select')+$t('inventory.inbound.category')" @change="handleCategory">
              <el-option v-for="(v,k) in categoryList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :class="display ? 'display' : ''" :label="$t('agent.nickname')" prop="member_id">
            <el-select v-model="dataForm.member_id" :placeholder="$t('common.please_select')+$t('agent.nickname')" @change="loadUsername">
              <el-option v-for="(v,k) in memberList" :label="v.nickname" :key="k" :value="v.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :class="display ? 'display' : ''" :label="$t('agent.username')" prop="username">
            {{ username }}
          </el-form-item>

          <el-form-item :label="$t('inventory.outbound.device_code')" prop="device_code">
            <el-upload class="upload-demo"
              :action="this.$http.adornUrl('/file/file')"
              :headers="upload_headers"
              :show-file-list="is_show"
              :file-list="device_code_url"
              :on-success="handleSuccess"
              :on-change="changeShow">
              <el-button size="small" type="primary">
                {{ $t('common.upload') }}
              </el-button>
            </el-upload>
          </el-form-item>

          <el-form-item :label="$t('inventory.inbound.total')" prop="total">
            <el-input-number :placeholder="$t('common.please_input')+$t('inventory.inbound.total')" v-model="dataForm.total"></el-input-number>
          </el-form-item>

          <el-form-item :label="$t('inventory.outbound.operator')" prop="operator">
            <el-input :placeholder="$t('common.please_input')+$t('inventory.outbound.operator')" v-model="dataForm.operator"></el-input>
          </el-form-item>

          <el-form-item :label="$t('inventory.outbound.picture')" prop="picture">
            <el-upload class="avatar-uploader" :action="this.$http.adornUrl('/file/picture')" :show-file-list="false" :headers="upload_headers" :on-success="handlePictureSuccess" :before-upload="beforePictureUpload">
              <img v-if="dataForm.picture" :src="dataForm.picture" class="avatar-upload">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="red">
              上传单据分辨率为：355*170
            </div>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:inbound:handle')" type="primary" @click="dataFormSubmit()">
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
</template>

<script>
  import common from '@/views/common/base'
  import { isNotEmpty } from '@/utils/validate'
  export default {
    extends: common,
    data() {
      return {
        model: 'inbound',
        upload_headers:{},
        memberList: [],
        is_show: false,
        device_code_url: [],
        display: true,
        typeList: [
          {'id': 1, 'title': '打印机'},
          {'id': 2, 'title': '墨盒'},
          {'id': 3, 'title': '纸张'},
        ],
        categoryList: [
          {'id': 1, 'title': '新入库'},
          {'id': 2, 'title': '损坏入库'},
          {'id': 3, 'title': '返修入库'},
        ],
        dataForm:
        {
          id: 0,
          member_id: '',
          type: '',
          category: '',
          device_code: '',
          total: 0,
          operator: '',
          picture: '',
        },
        dataRule:
        {
          type: [
            { required: true, message: this.$t('inventory.outbound.rules.type.require'), trigger: 'blur' },
          ],
          category: [
            { required: true, message: this.$t('inventory.outbound.rules.category.require'), trigger: 'blur' },
          ],
          total: [
            { required: true, message: this.$t('inventory.outbound.rules.total.require'), trigger: 'blur' },
          ],
          operator: [
            { required: true, message: this.$t('inventory.outbound.rules.operator.require'), trigger: 'blur' },
          ]
        },
        username: '',
      };
    },
    methods: {
      init ()
      {
        let query = this.$route.query
        let id = query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/inbound/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.member_id   = data.data.member_id
                this.dataForm.type        = data.data.type
                this.dataForm.category    = data.data.category
                this.dataForm.device_code = data.data.resource.device_code
                this.dataForm.total       = data.data.total
                this.dataForm.operator    = data.data.operator
                this.dataForm.picture     = data.data.resource.picture

                this.device_code_url = [{'url': data.data.resource.device_code}]

                if(isNotEmpty(data.data.resource.device_code))
                {
                  this.is_show = true
                }

                this.username = data.data.username
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
              url: this.$http.adornUrl(`/inbound/first_step`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'member_id': this.dataForm.member_id,
                'type': this.dataForm.type,
                'category': this.dataForm.category,
                'device_code': this.dataForm.device_code,
                'total': this.dataForm.total,
                'operator': this.dataForm.operator,
                'picture': this.dataForm.picture,
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
      resetForm:function()
      {
        this.$refs['dataForm'].resetFields();
      },
      loadMemberList () {
        this.$http({
          url: this.$http.adornUrl('/agent/select'),
          method: 'get',
          params: this.$http.adornParams({
            'role_id': 3
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.memberList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      loadUsername (id) {
        this.$http({
          url: this.$http.adornUrl(`/agent/view/${id}`),
          method: 'get',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.username = data.data.username
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      handleSuccess(res, file) {
        if(0 == res.status)
        {
          this.$message.error(res.message)
        }

        this.dataForm.device_code = res.data;
      },
      changeShow(file, fileList) {
        this.is_show = true
      },
      handleCategory(val) {
        if(3 == val) {
          this.display = false
        } else {
          this.display = true
        }
      }
    },
    created() {
      this.init();

      this.loadMemberList();

      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    },
  }
</script>

<style lang="scss" scoped>
  .oubound {
    padding-top: 50px;
  }
</style>
