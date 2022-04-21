<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="query.cond" placeholder="搜索条件" class="handle-select mr10">
                    <el-option key="1" label="按标题查询" value="title"></el-option>
                    <el-option key="2" label="按是否顶置查询" value="istop"></el-option>
                    <el-option key="3" label="按是否轮播查询" value="isflv"></el-option>
                    <el-option key="4" label="按发布日期查询" value="addtime"></el-option>
                    <el-option key="5" label="按点击数查询" value="hits"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <!-- <el-table-column prop="articleid" label="ID" width="200" align="center"></el-table-column> -->
                <el-table-column prop="productOrder_code" label="订单号" width="300"></el-table-column>
                <el-table-column prop="productOrder_post" label="邮政编码"></el-table-column>
                <el-table-column prop="productOrder_receiver" label="收货人"></el-table-column>
                <el-table-column prop="productOrder_mobile" label="联系方式"></el-table-column>
                <el-table-column prop="productOrder_status" label="订单状态"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="page.pageNum"
                    :page-size="10" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchOrders } from "../api/index";
import { useRouter } from 'vue-router'
export default {
    name: "basetable",
    setup() {
        const $router = useRouter()
        const query = reactive({
            // cond: "",
            // name: "",
            // number: 0,
        });

        const page = reactive({
            pageNum: 1,
            maxPage: 10,
        })
        const tableData = ref([]);
        const pageTotal = ref(0);

        
        // 获取表格数据
        const getData = () => {
            fetchOrders(page.pageNum-1,page.maxPage,{...query,name:encodeURIComponent(query.name)}).then((res) => {
                console.log('res.list',res.data);
                const data = res.data;
                tableData.value = data.productOrderList;
                pageTotal.value = data.pageUtil.total;
            });
        };
        getData();
        // 删除管理员
        const deleteArticle = (index)=>{
            deleteArticleId(tableData.value[index].articleid).then((res) => {  
                ElMessage.success("删除成功");
                tableData.value.splice(index, 1); 
                // console.log('res.list',res);
            });
        }

        // 更新管理员信息
        const updateAdmin = ()=>{
            updateAdminInfo(form).then((res) => {  
                ElMessage.success("更新成功");
                Object.keys(form).forEach((item) => {
                    tableData.value[idx][item] = form[item];
                });
            });
        }
        // 查询操作
        const handleSearch = () => {
            query.number = 0;
            getData();
        };
        // 分页导航
        const handlePageChange = (val) => {
            page.pageNum = val;
            getData();
        };

        // 删除操作
        const handleDelete = (index) => {
            // 二次确认删除
            ElMessageBox.confirm("确定要删除吗？", "提示", {
                type: "warning",
            })
                .then(() => {
                    deleteArticle(index);
                })
                .catch(() => {});
        };


        let form = reactive({
            adminid:'',
            username: "",
            password:"",
            realname: "",
            contact:"",
            addtime:""
        });

        const article = reactive({
            title: "",
            bannername:"",
            image: ""
        });
        let idx = -1;
        const handleEdit = (index, row) => {
            const id = row.articleid;
            $router.push(`/add_article?id=${id}`)
        };
        const saveEdit = () => {
            editVisible.value = false;
            updateAdmin();
        };

        const addArticle = () => {
            $router.push('/add_article')
        }



        const handleAvatarSuccess = (res, file) => {
            imageUrl.value = URL.createObjectURL(file.raw)
            console.log(res);
        }

        return {
            query,
            tableData,
            pageTotal,
            page,
            form,
            article,
            handleSearch,
            handlePageChange,
            handleDelete,
            handleEdit,
            saveEdit,
            addArticle,
            handleAvatarSuccess,
        };
    },
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 180px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
.avatar-uploader-icon{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 180px;
    
}
</style>
