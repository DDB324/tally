//声明类型
type RecordItem = {
  tags: string[];
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
  update: (id: string, name: string) => boolean;
  remove: (id: string) => boolean;
}
interface Window{
  tagList: Tag[];
}