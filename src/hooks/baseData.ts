import {
  ColumnsType,
  DefaultRecordType,
} from "ant-design-vue/lib/vc-table/interface";

export interface IDateInerface {
  key: number | null;
  name: string | null | string;
  age: number | null;
  address: string;
}

export const dataList:IDateInerface[] = [
  {
    key:1,
    name:'吴彦祖',
    age:40,
    address:'香港九龙湾'
  },
  {
    key:2,
    name:'杨俊杰',
    age:21,
    address:'五道口职业技术学院 6号楼 666寝'
  },
  {
    key:3,
    name:'金城武',
    age:40,
    address:'香港铜锣湾'
  },
  {
    key:4,
    name:'陈冠希',
    age:40,
    address:'香港摄影馆'
  },
]

export const _initFormState: IDateInerface = {
  key: null,
  name: "",
  age: null,
  address: "",
};

export const columns: ColumnsType<DefaultRecordType> = [
  {
    title: "姓名",
    dataIndex: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
  },
  {
    title: "操作",
    dataIndex: "edit",
    fixed: "right",
  },
];
