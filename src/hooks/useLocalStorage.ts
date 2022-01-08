import { IDateInerface } from "./baseData";

interface IUseLocalStorage {
  setLocalStorage: (data:IDateInerface[]) => void;
  getLocalStorage: () => IDateInerface[];
}

function useLocalStorage(): IUseLocalStorage {
	function setLocalStorage(data:IDateInerface[]){
		localStorage.setItem('data-list',JSON.stringify(data));
	}
	function getLocalStorage(){
		const data:IDateInerface[] = JSON.parse(localStorage.getItem('data-list') as string) as IDateInerface[];
		return data;
	}
  return {
    setLocalStorage,
    getLocalStorage,
  };
}

export {
	useLocalStorage,
}
