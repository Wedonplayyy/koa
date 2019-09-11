import Mock from 'mockjs'

Mock.mock('api/getList','get',{
  code:200,
  msg:'success',
  data:{
    id:'@increment(1)',
    name:'@cword(2,4)',
    count:'@natural(2,10)',
    price:'@natural(10,1000)',
    img:'@dataImage(80x80)',
    phone:/1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
    tel:/\d{3}-\d{8}|\d{4}-\d{7}/,
    email:/[1-9]\d{7,10}@(qq|163Igmail)\.com/
  }
})

Mock.mock('api/login','post',(options)=>{
  console.log(options)
  return {
    code:200,
    msg:'登陆成功'
  }
})
