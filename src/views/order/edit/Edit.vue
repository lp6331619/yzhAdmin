<template>
    <div class="form bgfff p20">
        <el-row :gutter="20">
            <h1 class="backTitle"><a @click="back()"><i class="iconfont icon-left"></i>票务</a></h1>
            <el-form
                label-position="right"
                label-width="110px"
                v-loading="loading"
                element-loading-text="正在提交!"
                class="mt20"
                :rules="productRule"
                ref='productData'
                :model='productData'>
                <el-col :span="7">
                    <el-form-item
                        prop="departure"
                        label="出发站">
                        <el-select class="w220" v-model="productData.departure" placeholder="出发站">
                            <el-option
                              v-for="(item,index) in stationBox"
                              :key="index"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
    </div>
</template>
<script>
    import EditJs from './Edit.js';
    export default EditJs;
</script>
<style scoped>
    .edit-form{
        width:500px;
    }
</style>
