<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('agent.from') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button icon="el-icon-back" @click="$router.go(-1)">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main color">
        <el-form label-width="120px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('common.basic_info') }}</span>
            </div>
            <div class="text item">
              <el-form-item :label="$t('agent.nickname')" prop="nickname">
                <el-input v-model="dataForm.nickname" :placeholder="$t('common.please_input') + $t('agent.nickname')"></el-input>
              </el-form-item>

              <el-form-item :label="$t('agent.archive.id_card_no')" prop="id_card_no">
                <el-input v-model="dataForm.id_card_no" :placeholder="$t('common.please_input') + $t('agent.archive.id_card_no')"></el-input>
              </el-form-item>

              <el-form-item :label="$t('agent.username')" prop="username">
                <el-input v-model="dataForm.username" :placeholder="$t('common.please_input') + $t('agent.username')"></el-input>
              </el-form-item>

              <el-form-item :label="$t('agent.level')" prop="level">
                <el-radio-group v-model="dataForm.level" @change="handleParentAgent">
                  <el-radio label="1">一级代理</el-radio>
                  <el-radio label="2">二级代理</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item :class="display ? 'display' : ''" :label="$t('agent.parent_agent_mobile')" prop="parent_username">
                <el-input v-model="dataForm.parent_username" :placeholder="$t('common.please_input') + $t('agent.parent_agent_mobile')"></el-input>
              </el-form-item>

              <el-form-item :label="$t('agent.another_name')" prop="another_name">
                <el-input v-model="dataForm.another_name" :placeholder="$t('common.please_input') + $t('agent.another_name')"></el-input>
              </el-form-item>

              <el-form-item :label="$t('agent.asset.should_printer_total')" prop="should_printer_total">
                <el-input-number v-model="dataForm.should_printer_total" :placeholder="$t('common.please_input') + $t('agent.asset.should_printer_total')"></el-input-number>
              </el-form-item>

              <el-form-item :label="$t('agent.asset.proportion')" prop="proportion">
                <el-input-number v-model="dataForm.proportion" :min="0.00" :precision="2" :placeholder="$t('common.please_input') + $t('agent.asset.proportion')"></el-input-number>
              </el-form-item>

              <el-form-item :label="$t('agent.asset.manger_proportion')" prop="manger_proportion">
                <el-input-number v-model="dataForm.manger_proportion" :min="0.00" :precision="2" :placeholder="$t('common.please_input') + $t('agent.asset.manger_proportion')"></el-input-number>
              </el-form-item>

              <form-area ref="area" :province_id="dataForm.province_id" :city_id="dataForm.city_id" :region_id="dataForm.region_id" @setProvinceInfo="setProvinceInfo" @setCityInfo="setCityInfo" @setAreaInfo="setAreaInfo"></form-area>

              <el-form-item :label="$t('agent.archive.address')" prop="address">
                <el-input type="textarea" v-model="dataForm.address" :placeholder="$t('common.please_input')+$t('agent.archive.address')"></el-input>
              </el-form-item>

              <el-form-item :label="$t('agent.resource.business_license')" prop="business_license">
                <el-upload class="avatar-uploader" :action="this.$http.adornUrl('/file/picture')" :show-file-list="false" :headers="upload_headers" :on-success="handlePictureSuccess" :before-upload="beforePictureUpload">
                  <img v-if="dataForm.business_license" :src="dataForm.business_license" class="avatar-upload">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div class="red">
                  上传图片分辨率为：355*170
                </div>
              </el-form-item>

              <el-form-item :label="$t('agent.resource.contract')" prop="contract">
                <el-upload class="upload-demo"
                  :action="this.$http.adornUrl('/file/file')"
                  :headers="upload_headers"
                  :show-file-list="is_show"
                  :file-list="contract_url"
                  :on-success="handleSuccess"
                  :on-change="changeShow">
                  <el-button size="small" type="primary">
                    {{ $t('common.upload') }}
                  </el-button>
                </el-upload>
              </el-form-item>
            </div>
          </el-card>

          <el-card class="box-card mt10" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('agent.printer_info') }}</span>
            </div>
            <div class="text item">
              <el-form-item :label="$t('agent.archive.source')" prop="source">
                <el-radio-group v-model="dataForm.source" @change="handleSource">
                  <el-radio label="1">官方提供</el-radio>
                  <el-radio label="2">分销商提供</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item :class="disable ? 'display' : ''" :label="$t('agent.resource.equipment')" prop="equipment">
                <el-upload class="upload-demo"
                  :action="this.$http.adornUrl('/file/file')"
                  :headers="upload_headers"
                  :show-file-list="is_equipemnt_show"
                  :file-list="equipment_url"
                  :on-success="handleEquipemntSuccess"
                  :on-change="changeEquipemntShow">
                  <el-button size="small" type="primary">
                    {{ $t('common.upload') }}
                  </el-button>
                </el-upload>
              </el-form-item>
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
  import formArea from '@/views/common/component/form-area'
  import { isNotEmpty } from '@/utils/validate'
  export default {
    extends: common,
    components: {
      formArea
    },
    data() {
      return {
        model: 'agent',
        display: true,
        disable: true,
        upload_headers:{},
        is_show: false,
        is_equipemnt_show: false,
        contract_url: [],
        equipment_url: [],
        bankList: [],
        dataForm:
        {
          id: 0,
          level: '1',
          another_name: '',
          parent_username: '',
          username: '',
          nickname: '',
          should_printer_total: 0,
          proportion: 0.00,
          manger_proportion: 0.00,
          id_card_no : '',
          province_id : '',
          city_id : '',
          region_id : '',
          address: '',
          business_license: '',
          contract: '',
          equipment_url: '',
          source: '1',
        },
        dataRule:
        {
          username: [
            { required: true, message: this.$t('agent.rules.username.require'), trigger: 'blur' },
          ],
          nickname: [
            { required: true, message: this.$t('agent.rules.nickname.require'), trigger: 'blur' },
          ],
          level: [
            { required: true, message: this.$t('agent.rules.level.require'), trigger: 'blur' },
          ],
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
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/agent/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.level                = data.data.level.value
                this.dataForm.parent_username      = data.data.parent_username
                this.dataForm.another_name         = data.data.another_name
                this.dataForm.username             = data.data.username
                this.dataForm.nickname             = data.data.nickname
                this.dataForm.should_printer_total = data.data.asset.should_printer_total
                this.dataForm.proportion           = data.data.asset.proportion
                this.dataForm.manger_proportion    = data.data.asset.manger_proportion
                this.dataForm.id_card_no           = data.data.archive.id_card_no
                this.dataForm.province_id          = data.data.archive.province_id.value
                this.dataForm.city_id              = data.data.archive.city_id.value
                this.dataForm.region_id            = data.data.archive.region_id.value
                this.dataForm.address              = data.data.archive.address
                this.dataForm.business_license     = data.data.resource.business_license
                this.dataForm.contract             = data.data.resource.contract
                this.dataForm.equipment_url        = data.data.resource.equipment_url

                this.contract_url = [{'url': data.data.resource.contract}]

                if(isNotEmpty(data.data.resource.contract))
                {
                  this.is_show = true
                }

                this.equipment_url = [{'url': data.data.resource.equipment}]

                if(isNotEmpty(data.data.equipment_url))
                {
                  this.is_equipemnt_show = true
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
              url: this.$http.adornUrl(`/agent/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'level': this.dataForm.level,
                'parent_username': this.dataForm.parent_username,
                'another_name': this.dataForm.another_name,
                'username': this.dataForm.username,
                'nickname': this.dataForm.nickname,
                'should_printer_total': this.dataForm.should_printer_total,
                'proportion': this.dataForm.proportion,
                'manger_proportion': this.dataForm.manger_proportion,
                'id_card_no': this.dataForm.id_card_no,
                'province_id': this.$refs.area.province_id,
                'city_id': this.$refs.area.city_id,
                'region_id': this.$refs.area.region_id,
                'address': this.dataForm.address,
                'business_license': this.dataForm.business_license,
                'contract': this.dataForm.contract,
                'equipment_url': this.dataForm.equipment_url,
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
      setProvinceInfo (id) {
        this.dataForm.province_id = id
      },
      setCityInfo (id) {
        this.dataForm.city_id = id
      },
      setAreaInfo (id) {
        this.dataForm.region_id = id
      },
      // 上传图片
      handlePictureSuccess(res, file) {
        this.dataForm.business_license = res.data;
      },
      handleParentAgent(level) {
        if(2 == level)
        {
          this.display = false
        }
        else
        {
          this.display = true
        }
      },
      handleSource(source) {
        if(2 == source)
        {
          this.disable = false
        }
        else
        {
          this.disable = true
        }
      },
      handleSuccess(res, file) {
        if(0 == res.status)
        {
          this.$message.error(res.message)
        }

        this.dataForm.contract = res.data;
      },
      changeShow(file, fileList) {
        this.is_show = true
      },
      handleEquipemntSuccess(res, file) {
        this.dataForm.equipment_url = res.data;
      },
      changeEquipemntShow(file, fileList) {
        this.is_equipemnt_show = true
      }
    },
    created() {
      this.init();

      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    },
  };
</script>
