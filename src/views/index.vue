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
        <span>设备状况</span>
        <div class="type">
          <el-select v-model="order_type" clearable @change="data">
            <el-option v-for="(v,k) in typeList" :label="v.title" :key="k" :value="v.id"></el-option>
          </el-select>
        </div>
      </div>
      <div class="text item text-center">
        <el-row :gutter="20">
          <el-col :span="12" class="default_block_col">
            <el-card shadow="never">
              <ve-map :data="statistical.map.data" :settings="statistical.map.settings"></ve-map>
            </el-card>
          </el-col>
          <el-col :span="12" class="default_block_col">
            <el-card shadow="never">
              <ve-histogram :data="statistical.data.histogram"></ve-histogram>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-card class="box-card mt10">
      <div slot="header" class="clearfix">
        <span>待处理设备</span>
        <div class="type">
          <el-select v-model="order_type" clearable @change="data">
            <el-option v-for="(v,k) in typeList" :label="v.title" :key="k" :value="v.id"></el-option>
          </el-select>
        </div>
      </div>
      <div class="text item text-center">
        <div>
          <el-row :gutter="20">
            <el-col :span="24" class="default_block_col">
              <el-card shadow="never">
                <el-row>
                  <el-col :span="24">
                    <div class="default_day_sale">
                      <div>订单总数</div>
                      <div class="blue mt10">
                        <b>{{ statistical.data.order_total }}</b>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="default_total">

        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import VeHistogram from 'v-charts/lib/histogram.common'
  import VeMap from 'v-charts/lib/map.common'
  import VeRing from 'v-charts/lib/ring.common'
  export default {
    components: {
      VeHistogram,
      VeMap,
      VeRing,
    },
    data() {
      return {
        order_type: 3,
        typeList: [
          {'id': 3, 'title': '最近七日'},
          {'id': 4, 'title': '最近一个月'},
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
              rows: [
                { '位置': '北京', '在线': 123, '离线': 123, '故障': 92134 },
                { '位置': '上海', '在线': 1223, '离线': 2123, '故障': 29234 },
                { '位置': '内蒙古自治区', '在线': 2123, '离线': 1243, '故障': 94234 },
                { '位置': '天津市', '在线': 4123, '离线': 5123, '故障': 29234 }
              ]
            },
            settings: {
              positionJsonLink: 'https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full',
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
          data: {
            order_total: 0,
            line: {
              columns: ['title', '订单数'],
              rows: []
            },
            histogram: {
              columns: ['title', '收益'],
              rows: [
                { 'title': '代理人1', '收益': 123 },
                { 'title': '代理人2', '收益': 1223 },
                { 'title': '代理人3', '收益': 2123 },
                { 'title': '代理人4', '收益': 4123 },
                { 'title': '代理人5', '收益': 3123 },
                { 'title': '代理人6', '收益': 7123 }
              ]
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
      course() {
        this.$http({
          url: this.$http.adornUrl(`/index/course`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.statistical.course.online_course_total  = data.data.online_course_total
            this.statistical.course.offline_course_total = data.data.offline_course_total
            this.statistical.course.course_total         = data.data.course_total
          }
        })
      },
      data(type = 3) {
        this.$http({
          url: this.$http.adornUrl(`/index/data`),
          method: 'get',
          params: this.$http.adornParams({
            'type': type
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.statistical.data.order_total = data.data.order_total
            this.statistical.data.line.rows   = data.data.line
          }
        })
      },
    },
    created(request)
    {
      this.printer();
      this.agent();
      // this.course();
      this.member();
      this.data();
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
