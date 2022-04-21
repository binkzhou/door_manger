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
                <el-button type="primary" icon="el-icon-lx-add" @click="editVisible = true">添加</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <!-- <el-table-column prop="articleid" label="ID" width="200" align="center"></el-table-column> -->
                <el-table-column prop="category_name" label="分类名称"></el-table-column>
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
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" v-model="editVisible" width="70%">
            <el-form label-width="90px">
                <el-form-item label="分类编号">
                    系统指定
                </el-form-item>
                <el-form-item label="分类名称">
                    <el-input v-model="form.category_name"></el-input>
                </el-form-item>
                <el-form-item label="概述图片">
                    <el-upload
                        action="http://localhost:8080/admin/uploadCategoryImage"
                        list-type="picture-card"
                        :file-list="fileList"
                        :on-success="handleAvatarSuccess"
                    >
                        <i class="el-icon-upload"></i>
                    </el-upload>
                </el-form-item>                
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchCategory } from "../api/index";
import { useRouter } from 'vue-router'
import axios from 'axios'
export default {
    name: "basetable",
    setup() {
        const $router = useRouter()
        const query = reactive({
            // cond: "",
            // name: "",
            // number: 0,
        });
        const editVisible = ref(false);
        const page = reactive({
            pageNum: 1,
            maxPage: 10,
        })
        const tableData = ref([]);
        const pageTotal = ref(0);

        
        // 获取表格数据
        const getData = () => {
            fetchCategory(page.pageNum-1,page.maxPage,{...query,name:encodeURIComponent(query.name)}).then((res) => {
                console.log('res.list',res.data);
                const data = res.data;
                tableData.value = data.categoryList;
                pageTotal.value = data.pageUtil.total;
                page.pageNum = data.pageUtil.index+1;
                // page.maxPage = res.data.page.maxPage;
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
            category_name:'',
            category_image_src:"",
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

        const addArticle = () => {
            $router.push('/add_article')
        }

        const saveEdit = async () => {
            editVisible.value = false;
            const formData = new FormData();
            formData.append('category_name', form.category_name);
            formData.append('category_image_src', form.category_image_src);
            const config = {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            };
            const { data: res } = await axios.post(
                'http://localhost:8080/admin/category',
                formData,
                config
            );
            if (res.code === 200) {
                ElMessage.success("添加成功");
                form = {
                    category_name:'',
                    category_image_src:"",
                }
                getData();
            }
        };

        const handleAvatarSuccess = (res, file) => {
            const url = res.data.fileName;
            form.category_image_src = url;
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
            editVisible
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
