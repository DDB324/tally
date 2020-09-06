let id: number = parseInt(window.localStorage.getItem('_maxId') || '0') || 0
function createId(){
  id+=1
  window.localStorage.setItem('_maxId',id.toString())
  return id
}
export default createId