<template>
  <div class="qingwu color">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>销售额总览</span>
      </div>
      <div class="text item text-center">
        <el-row :gutter="20">
          <el-col :span="8" class="default_block_col">
            <el-card shadow="never">
              <el-row>
                <el-col :span="24">
                  <div class="default_day_sale">
                    <div class="fs24">
                      <span>设备总数</span>
                      <b class="blue ml10">{{ statistical.printer.total || 0 }}</b>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row class="mb10">
                <el-col :span="8">
                  <div class="green1">
                    <span>在线</span>
                    <b class="ml10">{{ statistical.printer.online_total || 0 }}</b>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="">
                    <span>离线</span>
                    <b class="ml10">{{ statistical.printer.offline_total || 0 }}</b>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="red">
                    <span>故障</span>
                    <b class="ml10">{{ statistical.printer.fault_total || 0 }}</b>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="8" class="default_block_col">
            <el-card shadow="never">
              <el-row>
                <el-col :span="24">
                  <div class="default_day_sale">
                    <div class="fs24">
                      <span>代理商总数</span>
                      <b class="blue ml10">{{ statistical.agent.total || 0 }}</b>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row class="mb10">
                <el-col :span="12">
                  <div class="">
                    <span>一级代理</span>
                    <b class="ml10">{{ statistical.agent.first_total || 0 }}</b>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="">
                    <span>二级代理</span>
                    <b class="ml10">{{ statistical.agent.second_total || 0 }}</b>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="8" class="default_block_col">
            <el-card shadow="never">
              <el-row>
                <el-col :span="24">
                  <div class="default_day_sale">
                    <div class="fs24">
                      <span>用户总数</span>
                      <b class="blue ml10">{{ statistical.member.total || 0 }}</b>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row class="mb10">
                <el-col :span="12">
                  <div class="">
                    <span>店长</span>
                    <b class="ml10">{{ statistical.member.manger_total || 0 }}</b>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="">
                    <span>用户</span>
                    <b class="ml10">{{ statistical.member.member_total || 0 }}</b>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-card class="box-card mt10">
      <div slot="header" class="clearfix">
        <span>各地区设备状态</span>
      </div>
      <div class="text item text-center">
        <el-card shadow="never">
          <ve-map height="640px" :data="statistical.map.data" :settings="statistical.map.settings"></ve-map>
        </el-card>
      </div>
    </el-card>

    <el-card class="box-card mt10">
      <div slot="header" class="clearfix">
        <span>各地区市场销售额</span>
        <div class="type">
          <el-select v-model="area_id" clearable @change="agentArea">
            <el-option v-for="(v,k) in areaList" :label="v.title" :key="k" :value="v.id"></el-option>
          </el-select>
        </div>
      </div>
      <div class="text item text-center">
        <el-card shadow="never">
          <ve-histogram :data="statistical.histogram.area"></ve-histogram>
        </el-card>
      </div>
    </el-card>

    <el-card class="box-card mt10">
      <div slot="header" class="clearfix">
        <span>各代理商市场销售额</span>
        <div class="type">
          <el-select v-model="level" clearable @change="agentLevel">
            <el-option v-for="(v,k) in levelList" :label="v.title" :key="k" :value="v.id"></el-option>
          </el-select>
        </div>
      </div>
      <div class="text item text-center">
        <el-card shadow="never">
          <ve-histogram :data="statistical.histogram.level"></ve-histogram>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
  import VeHistogram from 'v-charts/lib/histogram.common'
  import VeMap from 'v-charts/lib/map.common'
  import VeRing from 'v-charts/lib/ring.common'
  import china from '@/assets/china.json'
  export default {
    components: {
      VeHistogram,
      VeMap,
      VeRing,
    },
    data() {
      return {
        area_id: 110000,
        level: 1,
        areaList: [],
        levelList: [
          {'id': 1, 'title': '一级代理'},
          {'id': 2, 'title': '二级代理'},
        ],
        statistical: {
          printer: {
            total: 0,
            online_total: 0,
            offline_total: 0,
            fault_total: 0,
          },
          agent: {
            total: 0,
            first_total: 0,
            second_total: 0,
          },
          member: {
            total: 0,
            manger_total: 0,
            member_total: 0,
          },
          course: {
            online_course_total: 0,
            offline_course_total: 0,
            course_total: 0,
          },
          map: {
            data: {
              columns: ['位置', '在线', '离线', '故障'],
              rows: []
            },
            settings: {
              aspectScale: 1,
              roam: true,
              zoom: 5,
              beforeRegisterMap (json) {
                return china
              },
              itemStyle: {
                normal: {
                  borderColor: '#fff',
                  areaColor: '#E6EFFF'
                },
                emphasis: {
                  areaColor: '#6A9FFF'
                }
              },
            }
          },
          histogram: {
            area: {
              columns: ['title', '销售额'],
              rows: []
            },
            level: {
              columns: ['title', '销售额'],
              rows: []
            }
          }
        },
      };
    },
    methods: {
      printer() {
        this.$http({
          url: this.$http.adornUrl(`/index/printer`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.statistical.printer.total         = data.data.total
            this.statistical.printer.online_total  = data.data.online_total
            this.statistical.printer.offline_total = data.data.offline_total
            this.statistical.printer.fault_total   = data.data.fault_total
          }
        })
      },
      agent() {
        this.$http({
          url: this.$http.adornUrl(`/index/agent`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.statistical.agent.total        = data.data.total
            this.statistical.agent.first_total  = data.data.first_total
            this.statistical.agent.second_total = data.data.second_total
          }
        })
      },
      member() {
        this.$http({
          url: this.$http.adornUrl(`/index/member`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.statistical.member.total        = data.data.total
            this.statistical.member.manger_total = data.data.manger_total
            this.statistical.member.member_total = data.data.member_total
          }
        })
      },
      equipment() {
        this.$http({
          url: this.$http.adornUrl(`/index/equipment`),
          method: 'get',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.statistical.map.data.rows   = data.data
          }
        })
      },
      area() {
        this.$http({
          url: this.$http.adornUrl(`/common/area/list`),
          method: 'get',
          params: this.$http.adornParams({
            'parent_id': 0
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.areaList   = data.data
          }
        })
      },
      agentArea(area_id = 110000) {
        this.$http({
          url: this.$http.adornUrl(`/index/area`),
          method: 'get',
          params: this.$http.adornParams({
            'area_id': area_id
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.statistical.histogram.area.rows   = data.data
          }
        })
      },
      agentLevel(level = 1) {
        this.$http({
          url: this.$http.adornUrl(`/index/level`),
          method: 'get',
          params: this.$http.adornParams({
            'level': level
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.statistical.histogram.level.rows   = data.data
          }
        })
      },
    },
    created(request)
    {
      // 获取打印机信息
      this.printer();

      // 获取代理商信息
      this.agent();

      // 获取会员信息
      this.member();

      // 获取设备信息
      this.equipment();

      // 获取全国地区信息
      this.area();

      // 根据区域获取代理商销售额
      this.agentArea();

      // 根据代理商级别获取代理商销售额
      this.agentLevel();
    }
  };
</script>
<style lang="scss" scoped>
  .text-center {
    text-align: center;
  }
  .type {
    float: right;
    padding: 3px 0
  }
  .icon {
    font-size: 36px;
    padding-top: 40px;
  }
  .unline {
    margin: 15px 0;
  }
  .default_block_col {
    margin-bottom: 20px;
  }
  .default_total:after {
    clear: both;
    content: "";
    display: block;
  }
  .default_day_sale {
    margin-top: 30px;
    margin-bottom: 45px;
  }
  .el-button--mini, .el-button--small {
    font-size: 15px;
  }
</style>
