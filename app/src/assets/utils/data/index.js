
/**
 * @description 扁平数组转树结构
 * @export
 * @param {*} array
 * @return {*}
 */
export function arrayToTree(array) {
  // 创建一个哈希表用于快速查找节点
  const nodeMap = new Map()
  const tree = []

  // 遍历数组，将每个节点存入哈希表
  for (const item of array) {
    const node = { ...item, children: [] } // 添加children字段
    nodeMap.set(item.id, node) // 将节点存入哈希表
  }

  // 再次遍历数组，根据parentId将节点加入到父节点的children中
  for (const item of array) {
    const node = nodeMap.get(item.id)
    if (item.parent) {
      const parentNode = nodeMap.get(item.parent)
      if (parentNode) {
        parentNode.children.push(node) // 添加到父节点的children中
      }
    } else {
      tree.push(node) // 如果没有parentId，则为根节点
    }
  }

  return tree
}
