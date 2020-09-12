//声明类型
type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
}
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  save: () => void;
  create: (name: string | null) => 'success' | 'duplicated' | 'null';//success：成功，duplicated：name重复，null name为空
  update: (id: string, name: string) => 'success' | 'duplicated' | 'not found' | 'nothing';
  remove: (id: string) => boolean;
}

// interface Window {
//
// }