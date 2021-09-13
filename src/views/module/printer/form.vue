<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('printer.from') }}</div>
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
        <el-form label-width="140px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <!-- <el-form-item :label="$t('printer.category.title')" prop="category_id">
            <el-select v-model="dataForm.category_id" :placeholder="$t('common.please_select')+$t('printer.category.title')">
              <el-option v-for="(v,k) in categoryList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </el-form-item> -->

          <el-form-item :label="$t('printer.title')" prop="title">
            <el-input :placeholder="$t('printer.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('printer.model')" prop="model">
            <el-input :placeholder="$t('printer.model')" v-model="dataForm.model"></el-input>
          </el-form-item>

          <form-area ref="area" :province_id="dataForm.province_id" :city_id="dataForm.city_id" :region_id="dataForm.region_id" @setProvinceInfo="setProvinceInfo" @setCityInfo="setCityInfo" @setAreaInfo="setAreaInfo"></form-area>

          <el-form-item :label="$t('printer.address')" prop="address">
            <el-input type="textarea" v-model="dataForm.address" :placeholder="$t('common.please_input')+$t('printer.address')"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:printer:handle')" type="primary" @click="dataFormSubmit()">
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
    data()
    {
      return {
        model: 'printer',
        categoryList: [],
        dataForm:
        {
          id: 0,
          category_id: '',
          title: '',
          model: '',
          province_id : '',
          city_id : '',
          region_id : '',
          address: '',
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('printer.rules.title.require'), trigger: 'blur' },
          ]
        }
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
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/printer/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.category_id = data.data.category_id
                this.dataForm.title       = data.data.title
                this.dataForm.model       = data.data.model
                this.dataForm.province_id  = data.data.province_id
                this.dataForm.city_id      = data.data.city_id
                this.dataForm.region_id    = data.data.region_id
                this.dataForm.address      = data.data.address
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
              url: this.$http.adornUrl(`/printer/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'category_id': this.dataForm.category_id,
                'title': this.dataForm.title,
                'model': this.dataForm.model,
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
      loadCategoryList () {
        this.$http({
          url: this.$http.adornUrl('/printer/category/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.categoryList = data.data
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
    },
    created(request)
    {
      this.init();

      // this.loadCategoryList();
    },
  };
</script>
