<template>
  <div>
    <el-tree
      :data="obj"
      :props="defaultProps"
      @node-click="handleNodeClick"
    ></el-tree>

    <div>-------------------------------------------------------</div>
    <el-tree
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
    ></el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      obj: {},
      numArr:[],
      //删除的数组
      spliceArr:'',
      saveSpliceArr:'',
      data: [
        {
          id: 'yi',
          parentId: '',
          children: [
            {
              id: 'er',
              parentId: 'yi',
              children: [
                {
                  id: 'san',
                  parentId: 'er',
                },
                {
                  id: 'wu',
                  parentId: 'er',
                },
              ]
            }
          ]
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'id'
      },
      arr1: [
        { id: 'yi', parentId: '' },
        { id: 'er', parentId: 'yi' },
        { id: 'er', parentId: 'san' },
        { id: 'san', parentId: 'er' },
        { id: 'wu1', parentId: 'er' }
      ]
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    buildTree(data, config) {
      // 设置 三个变量就是为了 动态的查找 data 的数据
      let code = config.code
      let parentCode = config.parentCode
      let children = config.children
      // idMap 利用 code的值 作为key, 因为 parentCode 的值指向的 key
      let idMap = {}
      // 最终要返回的数据
      let jsonTree = []
      // 如果有1000 条数据，最多才循环了 2000 次，浏览器执行 2000 次的速度是非常快的
      data.forEach(item => {
        // 这个地方就是为了做一张地图， 能通过 parentCode 不通过循环快速查找
        idMap[item[code]] = item
      })
      data.forEach(item => {
        // item 的 parentCode 其实 就是 parent 的 code  所以 在 idMap 中能快速定位
        let parent = idMap[item[parentCode]]
        if (parent) {
          // 如果 parent[children] 不存在就 等于 空数组
          !parent[children] && (parent[children] = [])
          parent[children].push(item)
        } else {
          // 走到这里说明没有 parent
          jsonTree.push(item)
        }
      })
      return jsonTree
    }
  },
  created() {
    //找出要删除的数组的索引
    for(var i =0 ;i<this.arr1.length;i++){
      for(var j =0 ;j<this.arr1.length;j++){
        if(this.arr1[i].id == this.arr1[j].parentId && this.arr1[i].parentId == this.arr1[j].id){
          //到了这步可以确定出 已经有互相调用的了
          //现在就要找出哪个跟上一个有关系，保留这个就行，另一个给删除就可以了
          //首先将数组中的这个两组数据剔除
          this.numArr.push(i)
        }
      }
    }

    // 这个位置是从大数组中删除spliceArr中的数组
    // 要注意的是 从第二个起删除不能按照index删除 因为第一个删除的时候已经改变数组了，

    // // 1    -1
    // // 2    -2
    // // 3    -3
    this.spliceArr = this.arr1.splice(this.numArr[0],1)
    for(var m =1;m<this.numArr.length;m++){
      this.spliceArr.push(...this.arr1.splice(this.numArr[m]-m,1))
    }

    // this.spliceArr = this.arr1.splice(this.numArr[0],1)
    // this.spliceArr.push(...this.arr1.splice(this.numArr[1]-1,1))
    
    // 将剔除的找到要保存的那个
    for(let i=0;i<this.spliceArr.length;i++){
      for(let j=0;j<this.arr1.length;j++){
        if(this.spliceArr[i].parentId == this.arr1[j].id){
          this.saveSpliceArr =  this.spliceArr[i]
        }
      }
    }

    //push到剩下的数组中
    this.arr1.push(this.saveSpliceArr)
    // 这里的arr1就是我最终处理之后的数组
    console.log('删除的数组',this.spliceArr)
    console.log('剩下的数组',this.arr1)

    //调用创建tree的方法
    let zz =  JSON.parse(JSON.stringify(this.arr1))
    this.obj = this.buildTree(zz, {
      code: 'id',
      parentCode: 'parentId',
      children: 'children'
    })
  }
}
</script>

<style></style>
