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

      <div class="admin_form_main">
        <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-form-item :label="$t('agent.nickname')" prop="nickname">
            <el-input v-model="dataForm.nickname" :placeholder="$t('common.please_input') + $t('agent.nickname')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('agent.username')" prop="username">
            <el-input v-model="dataForm.username" :placeholder="$t('common.please_input') + $t('agent.username')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('agent.level')" prop="level">
            <el-select v-model="dataForm.level" :placeholder="$t('common.please_select')+$t('agent.level')" @change="handleParentAgent">
              <el-option v-for="(v,k) in levelList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('agent.another_name')" prop="another_name">
            <el-input v-model="dataForm.another_name" :placeholder="$t('common.please_input') + $t('agent.another_name')"></el-input>
          </el-form-item>

          <el-form-item :class="display ? 'display' : ''" :label="$t('agent.superior_agent')" prop="parent_id">
            <el-select v-model="dataForm.parent_id" :placeholder="$t('common.please_select')+$t('agent.superior_agent')">
              <el-option v-for="(v,k) in memberList" :label="v.nickname" :key="k" :value="v.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('agent.proportion')" prop="proportion">
            <el-input-number v-model="dataForm.proportion" :min="0.00" :precision="2" :placeholder="$t('common.please_input') + $t('agent.proportion')"></el-input-number>
          </el-form-item>

          <form-area ref="area" :province_id="dataForm.province_id" :city_id="dataForm.city_id" :region_id="dataForm.region_id" @setProvinceInfo="setProvinceInfo" @setCityInfo="setCityInfo" @setAreaInfo="setAreaInfo"></form-area>

          <el-form-item :label="$t('agent.archive.address')" prop="address">
            <el-input type="textarea" v-model="dataForm.address" :placeholder="$t('common.please_input')+$t('agent.archive.address')"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:agent:handle')" type="primary" @click="dataFormSubmit()">
              {{ $t('common.confirm') }}
            </el-button>
            <el-button @click="resetForm()">
              {{ $t('common.reset') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  import formArea from '@/views/common/component/form-area'
  export default {
    extends: common,
    components: {
      formArea
    },
    data() {
      return {
        model: 'agent',
        memberList: [],
        levelList: [
          {'id': 1, 'title': '一级代理'},
          {'id': 2, 'title': '二级代理'},
          {'id': 3, 'title': '三级代理'},
        ],
        display: true,
        dataForm:
        {
          id: 0,
          level: '',
          another_name: '',
          parent_id: '',
          username: '',
          nickname: '',
          proportion: 0.00,
          province_id : '',
          city_id : '',
          region_id : '',
          address: '',
        },
        dataRule:
        {
          username: [
            { required: true, message: this.$t('user.rules.username.require'), trigger: 'blur' },
          ],
          nickname: [
            { required: true, message: this.$t('user.rules.nickname.require'), trigger: 'blur' },
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
                this.dataForm.level        = data.data.level.value
                this.dataForm.parent_id    = data.data.parent_id
                this.dataForm.another_name = data.data.another_name
                this.dataForm.username     = data.data.username
                this.dataForm.nickname     = data.data.nickname
                this.dataForm.proportion   = data.data.asset.proportion
                this.dataForm.province_id  = data.data.archive.province_id.value
                this.dataForm.city_id      = data.data.archive.city_id.value
                this.dataForm.region_id    = data.data.archive.region_id.value
                this.dataForm.address      = data.data.archive.address
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
                'parent_id': this.dataForm.parent_id,
                'another_name': this.dataForm.another_name,
                'username': this.dataForm.username,
                'nickname': this.dataForm.nickname,
                'proportion': this.dataForm.proportion,
                'province_id': this.$refs.area.province_id,
                'city_id': this.$refs.area.city_id,
                'region_id': this.$refs.area.region_id,
                'address': this.dataForm.address,
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
      loadMemberList (level) {
        this.$http({
          url: this.$http.adornUrl('/agent/select'),
          method: 'get',
          params: this.$http.adornParams({
            'level': --level
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.memberList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
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
      handleParentAgent(level) {
        if(2 == level || 3 == level)
        {
          this.display = false

          this.loadMemberList(level);
        }
        else
        {
          this.display = true
        }
      }
    },
    created() {
      this.init();
    },
  };
</script>
