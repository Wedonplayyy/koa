import Mock from 'mockjs'

Mock.mock('api/getList','get',{
  code:200,
  msg:'success',
  'data|10':[{
    id:'@increment(1)',
    name:'@cword(2,4)',
    count:'@natural(2,10)',
    price:'@natural(10,1000)',
    img:'@dataImage(80x80)',
    phone:/1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
    tel:/\d{3}-\d{8}|\d{4}-\d{7}/,
    email:/[1-9]\d{7,10}@(qq|163Igmail)\.com/
  }]
})

Mock.mock('api/login','post',(options)=>{
  console.log(options)
  return {
    code:200,
    msg:'登陆成功'
  }
})

Mock.mock('api/getTableData','get',{
  code:200,
  msg:'success',
  'data|10':[{
    '_id|+1': 1,
    name:'@cword(2,4)',
    desc:'@cword(2,4)',
    startTime:'@date("yyyy-MM-dd")',
    endTime:'@date("yyyy-MM-dd")',
    'tag|1':["已截止","未发布"],
    'web|1':["Github","豆瓣","百度","掘金"],
  }]
})

Mock.mock('api/getAddressData','get',{
  code:200,
  msg:'success',
  'data|15':[{
    '_id|+1': 1,
    name:'@cword(2,4)',
    company:'@cword(2,4)',
    'position|1':['经理','实习生','主管'],
    'tags|0-3':['@cword(2,4)'],
    email:/[1-9]\d{7,10}@(qq|163Igmail)\.com/,
    phone:/1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
    tel:/\d{3}-\d{8}|\d{4}-\d{7}/,
    QQ:/\d{3}\d{8}|\d{4}\d{7}/,
    color:'@hex()'
  }]
})
