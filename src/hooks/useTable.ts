import { dataList, IDateInerface } from "./baseData";
import { data, Loding, updateOver, name} from "./tableBusiness";
import { useLocalStorage } from "./useLocalStorage";

export interface IUseTable {
  initDataList: () => void;
  deleteTableData: (key: number) => void;
  addTableData: (formData: IDateInerface) => void;
  editTableData: (formData: IDateInerface) => void;
  searchTableData: (name: string) => void;
}

// 实际业务为ajax异步处理，demo中使用定时器来代替
function useTable(): IUseTable {

  const { getLocalStorage, setLocalStorage } = useLocalStorage();

  function initDataList() {
    Loding.value = true;
    name.value = '';
    setTimeout(() => {
      data.value = getLocalStorage(); 
      if(data.value === null || data.value.length === 0){
        data.value = dataList;
      }
      Loding.value = false;
      setLocalStorage(data.value as IDateInerface[]);
    }, 500);
  }

  function deleteTableData(key: number) {
    Loding.value = true;
    data.value?.forEach((item: IDateInerface, index: number) => {
      if (item.key === key) {
        data.value?.splice(index, 1);
      }
    });
    updateOver(()=>setLocalStorage(data.value as IDateInerface[]));
    setTimeout(()=>{
      if(getLocalStorage().length === 0){
        location.reload()
      }
    },600)
  }

  function addTableData(formData: IDateInerface) {
    Loding.value = true;
    const _data = getLocalStorage();
    _data.unshift(formData);
    data.value = _data;
    updateOver(()=>setLocalStorage(data.value as IDateInerface[]));
  }

  function editTableData(formData: IDateInerface) {
    Loding.value = true;
    data.value?.forEach((item: IDateInerface, index: number) => {
      if (item.key === formData.key) {
        (data.value as IDateInerface[])[index] = formData;
      }
    });
    updateOver(()=>setLocalStorage(data.value as IDateInerface[]));
    
  }

  function searchTableData(name: string): void {
    if(!name.trim()) return;
    Loding.value = true;
    const list:IDateInerface[] = [];
    getLocalStorage()?.forEach((item: IDateInerface, index: number) => {
      if (item.name?.indexOf(name.trim()) !== -1) {
        console.log((getLocalStorage() as IDateInerface[])[index]);
        list.push(getLocalStorage()[index]);
      }
    });
    updateOver(()=>data.value = list)
  }

  return {
    initDataList,
    deleteTableData,
    addTableData,
    editTableData,
    searchTableData,
  };
}

export { useTable };
