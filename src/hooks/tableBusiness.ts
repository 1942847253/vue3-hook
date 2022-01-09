import { reactive, ref, watch } from "vue";
import { message } from "ant-design-vue";
import { useTable } from "./useTable";
import { IDateInerface, _initFormState } from "./baseData";


const data = ref<IDateInerface[]>();
const formState = ref<IDateInerface>(_initFormState);
const name = ref<string>('');
const configType = ref<string>("新增");
const Loding = ref<boolean>(false);
const visible = reactive({
  config: false,
  detail: false,
});

function watchData(): void {
  watch(
    () => visible.config,
    (val) => {
      if (val) {
        if (configType.value === "新增") {
          cleanFormState();
        }
      }
    }
  );
}

function cleanFormState(): void {
  formState.value.key = null;
  formState.value.name = "";
  formState.value.age = null;
  formState.value.address = "";
}

function formRule(): boolean {
  if (
    !formState.value.name ||
    !formState.value.age ||
    !formState.value.address
  ) {
    message.warning("请将数据补充完整");
    return false;
  } else {
    return true;
  }
}

function updateOver(callback:()=>void):void{
    setTimeout(() => {
      Loding.value = false;
      message.success("完成");
      callback()
    }, 400);
  
}

function onSubmit(): void {
  const { addTableData, editTableData } = useTable();
  if (formRule()) {
    if (configType.value === "新增") {
      formState.value.key = Date.now();
      addTableData(JSON.parse(JSON.stringify(formState.value)));
    } else {
      editTableData(JSON.parse(JSON.stringify(formState.value)));
    }
    visible.config = false;
  }
}

function visibleCofig(type: "新增" | "编辑", record?: IDateInerface): void {
  switch (type) {
    case "新增":
      configType.value = "新增";
      visible.config = true;
      break;
    case "编辑":
      configType.value = "编辑";
      formState.value = JSON.parse(JSON.stringify(record as IDateInerface));
      visible.config = true;
      break;
    default:
      break;
  }
}

export {
  data,
  configType,
  Loding,
  formState,
  visible,
  _initFormState,
  name,
  watchData,
  cleanFormState,
  formRule,
  onSubmit,
  visibleCofig,
  updateOver,
};

