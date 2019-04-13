<template>
  <div class="edit">
    <div class="titleBox">账户详情</div>
    <div class="p20 mt20">
      <el-form
        label-width="80px"
        class="clearfix"
        v-loading="loading"
        element-loading-text="正在获取数据！"
        :model="form"
        :rules="rule_data"
        ref="form"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="店铺名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入店铺名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="店铺旺旺" prop="wangwang">
              <el-input v-model="form.wangwang" placeholder="请输入店铺旺旺"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发货人" prop="user_name">
              <el-input v-model="form.user_name" placeholder="请输入发货人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发货电话" prop="phone">
              <el-input type="number" v-model="form.phone" placeholder="请输入发货电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="店铺网址" prop="url">
              <el-input v-model="form.url" placeholder="请输入http://开头的网址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="平台选择" prop="type">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option
                  v-for="(item,index) in pingt"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="省" prop="province_id">
              <el-select v-model="form.province_id" placeholder="请选择" @change="setCity">
                <el-option
                  v-for="(item,index) in Province"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="市" prop="city_id">
              <el-select v-model="form.city_id" placeholder="请选择" @change="setArea">
                <el-option
                  v-for="(item,index) in City"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="区" prop="area_id">
              <el-select v-model="form.area_id" placeholder="请选择">
                <el-option
                  v-for="(item,index) in Area"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="发货地址" prop="address">
              <el-input v-model="form.address" placeholder="请输入发货地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">&nbsp;</el-col>
          <el-col :span="24" class="text-center">
            <el-button type="warning" @click="submit('form')">确定</el-button>
            <el-button @click="$router.push('/user/list')">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "list",
  created: function() {
    this.asyncData();
  },
  data() {
    return {
      loading: false,
      status: this.$route.query.id ? true : false,
      Province: [],
      City: [],
      Area: [],
      pingt: [],
      form: {
        type: "",
        name: "",
        url: "",
        wangwang: "",
        user_name: "",
        province_id: "",
        city_id: "",
        area_id: "",
        address: "",
        phone: ""
      },
      rule_data: {
        type: [
          {
            required: true,
            message: "请选择平台",
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: "不能为空！",
            trigger: "blur"
          }
        ],
        url: [
          {
            required: true,
            message: "不能为空！",
            trigger: "blur"
          },
          {
            pattern: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
            message: "请输入正确的网址！",
            trigger: "blur"
          }
        ],
        wangwang: [
          {
            required: true,
            message: "不能为空！",
            trigger: "blur"
          }
        ],
        user_name: [
          {
            required: true,
            message: "不能为空！",
            trigger: "blur"
          }
        ],
        province_id: [
          {
            required: true,
            message: "请选择省份！",
            trigger: "change"
          }
        ],
        city_id: [
          {
            required: true,
            message: "请选择市！",
            trigger: "change"
          }
        ],
        area_id: [
          {
            required: true,
            message: "请选择地区！",
            trigger: "change"
          }
        ],
        address: [
          {
            required: true,
            message: "不能为空！",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "不能为空！",
            trigger: "blur"
          },
          { 
            pattern: /^\d{11}$/,
            message: "请输入正确的电话格式",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    async asyncData() {
      await this.getShopTypes();
      await this.getProvince();
      if (this.status) await this.getList();
    },
    getShopTypes() {
      this.loading = true;
      this.$$api_shop_getShopTypes({
        //获取平台
        data: {},
        fn: data => {
          for (let i in data) {
            this.pingt.push({
              label: data[i],
              value: i
            });
          }
          this.loading = false;
        },
        errFn: err => {
          this.$message.error(err.info);
          this.loading = false;
        }
      });
    },
    getProvince() {
      //获取省
      this.loading = true;
      this.$$api_shop_getProvince({
        data: {},
        fn: data => {
          this.Province = data;
          this.loading = false;
        },
        errFn: err => {
          this.$message.error(err.info);
          this.loading = false;
        }
      });
    },
    getAreaByParentId(id, status) {
      this.loading = true;
      this.$$api_shop_getAreaByParentId({
        data: { parent_id: id },
        fn: data => {
          this.loading = false;
          switch (status) {
            case 1:
              this.City = data;
              console.log(this.City);
              break;
            case 2:
              this.Area = data;
              break;
          }
        },
        errFn: err => {
          this.$message.error(err.info);
          this.loading = false;
        }
      });
    },
    setCity(item) {
      this.form.city_id = "";
      this.form.area_id = "";
      this.getAreaByParentId(item, 1);
    },
    setArea(item) {
      this.form.area_id = "";
      this.getAreaByParentId(item, 2);
    },
    getList() {
      this.loading = true;
      this.$$api_shop_info({
        data: { id: this.$route.query.id },
        fn: data => {
          this.form = data;
          this.loading = false;
          this.form = Object.assign({}, this.form, {
            province_id: parseInt(this.form.province_id)
          });
          this.getAreaByParentId(this.form.province_id, 1);
          this.getAreaByParentId(this.form.city_id, 2);
        },
        errFn: err => {
          this.$message.error(err.info);
          this.loading = false;
        }
      });
    },
    submit(ref) {
      this.$refs[ref].validate(valid => {
        if (valid) {
          this.$$api_shop_edit({
            data: this.form,
            fn: data => {
              let text = "";
              if (this.status) {
                text = "修改";
              } else {
                text = "创建";
              }
              this.$message.success(`恭喜您${text}成功！`);
              this.loading = false;
              this.$router.push("/user/list");
            },
            errFn: err => {
              this.$message.error(err.info);
              this.loading = false;
            }
          });
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
</style>
