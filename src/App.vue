<template>
  <div style="display: flex; width: 400px;padding:10px">
    <a-button style="margin-right:10px" type="primary" @click="visibleCofig('add')">新增</a-button>
  </div>
  <a-table :dataSource="data" :columns="columns" :loading="Loding">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'edit'">
        <a @click="visibleCofig('edit', record)">编辑</a>
        <a> | </a>
        <a-popconfirm
          title="确认删除这个吊毛吗?"
          ok-text="是"
          cancel-text="否"
          @confirm="deleteTableData(record.key)"
        >
          <a>删除</a>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
  <TableConfig></TableConfig>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import {
  data,
  visibleCofig,
  configType,
  visible,
  Loding,
  name,
} from "./hooks/tableBusiness";
import { useTable } from "./hooks/useTable";
import TableConfig from "./components/TableConfig.vue";
import { columns,dataList } from "./hooks/baseData";
export default defineComponent({
  components: {
    TableConfig,
  },
  setup() {
    const { initDataList, deleteTableData } = useTable();
    onMounted(() => {
      initDataList();
    });
    return {
      columns,
      data,
      visible,
      configType,
      Loding,
      name,
      dataList,
      deleteTableData,
      visibleCofig,
      initDataList,
    };
  },
});
</script>
