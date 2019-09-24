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
    'company|1':['成都分公司', '北京分公司', '上海分公司', '哈尔滨公司',
      '微易', '郑州公司','测试部门', '财务部', '地州区', '盒马项目组',
      '成都区', '贵州区', '电商部', '综合管理部', '全民营销项目组',
      '单团部', '新销售业务部', '欧洲组', '中东非组', '票务组', '外联部',
      '西南总经理办公室', '市场营销部', '单团计调部', '票务部', '南亚计调部',
      '欧洲散拼计调部', '签证部', '东南亚事业部', '产品组', '途牛组',
      '携程组', '其他电商组', '资料组', '运营支持组', '京津组', '河北组',
      '太原公司', '内蒙古组'],                   //部门
    'position|1':['经理','实习生','主管'],
    'tags|0-3':['@cword(2,4)'],
    email:/[1-9]\d{7,10}@(qq|163gmail)\.com/,
    phone:/1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
    tel:/\d{3}-\d{8}|\d{4}-\d{7}/,
    QQ:/\d{3}\d{8}|\d{4}\d{7}/,
    'sex|1':['男','女'],
    color:'@hex()'
  }]
})

Mock.mock('api/getOfferData','get',{
  code:200,
  msg:'success',
  'data|100':[{
    '_id|+1': 1,
    name:'@cword(2,4)',                        //名字
    email:/[1-9]\d{7,10}@(qq|163gmail)\.com/,  //邮箱
    type:'@cword(2,4)',                        //证件类型
    number:'@id()',                            //证件号码
    'sex|1':['男','女'],                        //性别
    'position|1':['经理','实习生','主管'],       //职位
    region:'@city(true)',                      //籍贯
    QQ:/\d{3}\d{8}|\d{4}\d{7}/,                //qq
    date:'@date("yyyy-MM-dd")',                //入职日期
    'offer|1':['待发offer','已发offer','已接受offer','已拒绝offer','已入职offer'],                //offer状态
    birth:'@date("yyyy-MM-dd")',               //生日
    'folk|1':['汉','藏','回','壮','维吾尔','蒙古'],//民族
    tel:/\d{3}-\d{8}|\d{4}-\d{7}/,             //电话
    'edu|1':['高中','专科','本科','硕士','博士'],//学历
    phone:/1([38]\d|5[0-35-9]|7[3678])\d{8}$/, //手机
    place:'@city(true)',                       //工作地点
    'dept|1':['成都分公司', '北京分公司', '上海分公司', '哈尔滨公司',
      '微易', '郑州公司','测试部门', '财务部', '地州区', '盒马项目组',
      '成都区', '贵州区', '电商部', '综合管理部', '全民营销项目组',
      '单团部', '新销售业务部', '欧洲组', '中东非组', '票务组', '外联部',
      '西南总经理办公室', '市场营销部', '单团计调部', '票务部', '南亚计调部',
      '欧洲散拼计调部', '签证部', '东南亚事业部', '产品组', '途牛组',
      '携程组', '其他电商组', '资料组', '运营支持组', '京津组', '河北组',
      '太原公司', '内蒙古组'],                   //部门
    marriage:''                                //婚姻状态
  }]
})
Mock.mock('api/getPersonData','get',{
  code:200,
  msg:'success',
  'data|100':[{
    '_id|+1': 1,
    name:'@cword(2,4)',                        //名字
    number:'@string("number", 4)',             //工号
    jg:'区域中心',                              //机构
    'dept|1':['成都分公司', '北京分公司', '上海分公司', '哈尔滨公司',
      '微易', '郑州公司','测试部门', '财务部', '地州区', '盒马项目组',
      '成都区', '贵州区', '电商部', '综合管理部', '全民营销项目组',
      '单团部', '新销售业务部', '欧洲组', '中东非组', '票务组', '外联部',
      '西南总经理办公室', '市场营销部', '单团计调部', '票务部', '南亚计调部',
      '欧洲散拼计调部', '签证部', '东南亚事业部', '产品组', '途牛组',
      '携程组', '其他电商组', '资料组', '运营支持组', '京津组', '河北组',
      '太原公司', '内蒙古组'],                   //部门
    startTime:'@date("yyyy-MM-dd")',           //试用期开始日期
    endTime:'@date("yyyy-MM-dd")',             //试用期结束日期
    'status|1':['审批通过','审批未通过','审批中'] //审批状态
  }]
})

Mock.mock('api/getSalaryData','get',{
  code:200,
  msg:'success',
  'data|1-4':[{
    '_id|+1': 1,
    name:'@cword(2,4)',                             //薪资构成
    actualCost:'@natural(10000, 1000000)',          //实际支出
    planCost:'@natural(10000, 1000000)',            //计划支出
    actualCostLastM:'@natural(10000, 1000000)',     //上月实际
    planCostLastM:'@natural(10000, 1000000)',       //上月计划
  }]
})

Mock.mock('api/getHomeData','get',{
  code:200,
  msg:'success',
  'data|3':[{
    '_id|+1': 1,
    name:'@cword(2,4)',                             //
    number:'@natural(10000, 1000000)',          //数字
    percent:'@natural(1,100)',                  //百分比
  }]
})

Mock.mock('api/getChartData','get',{
  code:200,
  msg:'success',
  'data|15':[{
    'word': '@city()',
    'count': '@natural(0, 1000)'
  }]
})
