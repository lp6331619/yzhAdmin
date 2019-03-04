<template>
<div class="edit">
	<el-row :gutter="20">
		<h1 class="backTitle"><router-link to="/admin/rule/returning"><i class="iconfont icon-left"></i>退款列表</router-link></h1>
		<el-form
        label-position="right"
        label-width="110px"
        v-loading="loading"
        element-loading-text="正在提交!"
        class="mt20"
        :rules="tableRule"
        ref='tableData'
        :model='tableData'>
			<el-col :span="14">
				<el-form-item label="退款规则" prop="name">
					<el-input v-model="tableData.name" placeholder="请输入退款规则"></el-input>
				</el-form-item>
			</el-col>
      <el-col :span="24">
        <el-form-item label="退款说明" >
          <vue-editor id="detail" v-model="tableData.remark" placeholder="请输入退款说明"></vue-editor>
        </el-form-item>
      </el-col>
      <el-col class="clear" :span="24">
        <el-form-item
						required
            label='退款设置'>
            <el-radio-group v-model="tableData.change_type">
                <el-radio :label="1">不可改</el-radio>
                <el-radio :label="2">免费随时改</el-radio>
                <el-radio :label="3">时间段改</el-radio>
                <el-radio :label="4">手续费改</el-radio>
            </el-radio-group>
            <el-table
              v-if="tableData.change_type==4 || tableData.change_type==3"
              :data="rulesArry"
              border
              style="width: 100%;">
                <el-table-column
                    label="退款规则">
                    <template slot-scope="scope">
                        小于
                        <el-input size="mini" type="number" style="width:100px;" placeholder="如：2" v-model="scope.row.min_time">
                        </el-input>
                        大于等于
                        <el-input size="mini" type="number" style="width:100px;" placeholder="如：10" v-model="scope.row.max_time">
                        </el-input>
                        小时
                    </template>
                </el-table-column>
                <el-table-column
                    label="收取">
                    <template slot-scope="scope">
                        <el-radio-group v-model="scope.row.type">
                            <el-radio :label="1">按比例</el-radio>
                            <el-radio :label="2">按金额</el-radio>
                        </el-radio-group>
                        <el-input v-if="scope.row.type==1" class="ml20" size="mini" type="number" style="width:200px;" placeholder="如：50" v-model="scope.row.rate">
                            <template slot="append">%</template>
                        </el-input>
                        <el-input v-if="scope.row.type==2" class="ml20" size="mini" type="number" style="width:200px;" placeholder="如：50" v-model="scope.row.money">
                            <template slot="append">元/份</template>
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    fixed="right"
                    width="70">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" plain icon="el-icon-delete" @click="del(scope.row.index)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button size="mini" v-if="tableData.change_type==4 || tableData.change_type==3" @click="addRule()">增加规则</el-button>
        </el-form-item>
			</el-col>
      <el-col class="clear" >
				<el-form-item>
					<el-button type="primary" @click="submi('tableData')">提交</el-button>
					<el-button @click="$router.push('/admin/rule/returning')">返回</el-button>
				</el-form-item>
      </el-col>
		</el-form>
	</el-row>
</div>
</template>
<script>
import axios from 'axios';
import Qs from 'qs';
import {VueEditor} from 'vue2-editor';
export default {
	name: 'list',
	created: function() {
		if (this.$route.query.id) {
			this.getList()
		}
	},
	data() {
		return {
			loading: false,
      tableRule:{
        name   : [{
            required: true,
            message : '不能为空！',
            trigger : 'blur'
        }],
      },
      tableData:{
        name:'',
        change_type:1
      },
      rulesArry:[]
		}
	},
	methods: {
		getList() {
			this.loading = true;
      this.$$api_admin_change_detail({
          data     : {id:this.$route.query.id},
          fn       : data => {
              this.loading=false;
              this.tableData=data;
              this.tableData.change_type = parseInt(this.tableData.change_type)
              // console.log(this.tableData.rules)
              // this.rulesArry = JSON.parse(this.tableData.rules)
              this.rulesArry = this.tableData.rules
          },
          errFn    : (err) => {
              this.$message.error(err.msg);
              this.loading=false;
          },
      });
		},
    del(index){
      this.$confirm('是否确定删除该规则', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.rulesArry.splice(index,1);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    addRule(){
      this.rulesArry.push({
          max_time:1,
          min_time:0,
          money:0,
          rate:0,
          type:2
      })
    },
		submi(ref) {
      this.$refs[ref].validate((valid) => {
        if (valid) {
    			let status=true;
          this.tableData.type=1
          if(this.tableData.change_type!=1 && this.tableData.change_type!=2){
            if(this.rulesArry.length>2 || this.tableData.change_type==3 || this.tableData.change_type==4){
        			this.rulesArry.forEach((item)=>{
        				if( item.min_time.length==0||item.max_time.length==0){
        					this.$message.error('规则填写不完整！')
        					status=false
        				}
        			})
            }
          }
    			if(status){
            this.tableData.rules = JSON.stringify(this.rulesArry)
            this.loading=true;
            let options={
             method:'post',
             url:'http://admin-api.quitang.com/change/edit',
             data:this.tableData,
             headers:{
               'Authorization':this.$store.state.user.userinfo.token,
               'Content-Type':"application/x-www-form-urlencoded",
             }
            };
            axios(options).then((res) => {
              if(res.data.error_code==0){
                this.loading=false;
                this.$message.success('恭喜您操作成功')
                this.$router.push('/admin/rule/returning')
              }else{
                this.loading=false;
                this.$message.error(res.data.msg)
              }
            })
    			}
        }
      })
		}
	},
  components: {
      VueEditor
  },
}
</script>
<style scoped lang='less'>

</style>
