//声明类型
type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: string;
}
type Tag = {
  id: string;
  name: string;
}
type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
  currentTagReturnValue?: 'duplicated' | 'null' | 'success';
  removeTagReturnValue?: boolean;
  updateTagReturnValue?: 'duplicated' | 'not found' | 'nothing' | 'success';
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