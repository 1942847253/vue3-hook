import { dataList, IDateInerface } from "./baseData";
import { data, Loding, updateOver } from "./tableBusiness";
import { useLocalStorage } from "./useLocalStorage";

export interface IUseTable {
  _initDataList: () => void;
  deleteTableData: (key: number) => void;
  addTableData: (formData: IDateInerface) => void;
  editTableData: (formData: IDateInerface) => void;
}

function useTable(): IUseTable {
  const { getLocalStorage, setLocalStorage } = useLocalStorage();

  function _initDataList() {
    Loding.value = true;
    setTimeout(() => {
      data.value = getLocalStorage() === null ? dataList : getLocalStorage();
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
    updateOver();
    setLocalStorage(data.value as IDateInerface[]);
  }

  function addTableData(formData: IDateInerface) {
    Loding.value = true;
    data.value?.unshift(formData);
    updateOver();
    setLocalStorage(data.value as IDateInerface[]);
  }

  function editTableData(formData: IDateInerface) {
    Loding.value = true;
    data.value?.forEach((item: IDateInerface, index: number) => {
      if (item.key === formData.key) {
        (data.value as IDateInerface[])[index] = formData;
      }
    });
    updateOver();
    setLocalStorage(data.value as IDateInerface[]);
  }

  return {
    _initDataList,
    deleteTableData,
    addTableData,
    editTableData,
  };
}

export { useTable };
