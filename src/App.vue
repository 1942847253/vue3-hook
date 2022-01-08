<template>
  <a-button type="primary" @click="visibleCofig('新增')">新增</a-button>
  <a-table :dataSource="data" :columns="columns" :loading="Loding">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'edit'">
        <a @click="visibleCofig('编辑', record)">编辑</a>
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
} from "./hooks/tableBusiness";
import { useTable } from "./hooks/useTable";
import TableConfig from "./components/TableConfig.vue";
import { columns } from "./hooks/baseData";
export default defineComponent({
  components: {
    TableConfig,
  },
  setup() {
    const { _initDataList, deleteTableData } = useTable();
    onMounted(() => {
      _initDataList();
    });
    return {
      columns,
      data,
      visible,
      configType,
      Loding,
      deleteTableData,
      visibleCofig,
    };
  },
});
</script>
