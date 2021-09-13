export const material = {
  list: '耗材列表',
  from: '耗材操作',
  view: '查看耗材',

  total: '耗材数量',

  rules: {
    category_id: {
      require: '耗材分类不能为空',
    },
    total: {
      require: '耗材数量不能为空',
    },
    member_id: {
      require: '所属店长不能为空',
    },
  },

  // 耗材分类
  category: {
    list: '耗材分类列表',
    from: '耗材分类操作',
    title: '耗材分类标题',

    rules: {
      title: {
        require: '耗材分类标题不能为空',
      }
    },
  },
}
