<template>
  <div>
    <a-modal
      :visible="visible.config"
      title="新增 / 编辑"
      ok-text="确定"
      cancel-text="取消"
      :maskClosable="false"
      @ok="onSubmit"
      @cancel="() => (visible.config = false)"
    >
      <a-form ref="formRef" :model="formState" name="form_in_modal">
        <a-form-item name="title" label="姓名">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item name="description" label="年龄">
          <a-input v-model:value="formState.age" />
        </a-form-item>
        <a-form-item
          name="modifier"
          class="collection-create-form_last-form-item"
          label="住址"
        >
          <a-input v-model:value="formState.address" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  formState,
  visible,
  watchData,
  onSubmit,
} from "../hooks/tableBusiness";
export default defineComponent({
  setup() {
    watchData();
    return {
      formState,
      visible,
      onSubmit,
    };
  },
});
</script>
<style>
.collection-create-form_last-form-item {
  margin-bottom: 0;
}
</style>