
// Echarts图表配置对象
let option = {
  // 标题配置
  title: {
    text: '用户100代表有100个用户----停车场100代表1号停车场',
    textStyle: {
      color: '#666', // 标题字体颜色
      fontSize: 18, // 标题字体大小
      fontWeight: 'normal'
    },
    show: true,
    x: 'center' // 水平居中
  },

  // 画布边距设置
  grid: {
    left: '5%',
    right: '10%',
    bottom: '15%',
    containLabel: true
  },

  // 提示配置
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow' // 阴影模式
    }
  },

  // 图例配置
  legend: {
    data: [
      '用户', '使用量', '停车场'
    ],
    selected: {
      '用户': true,
      '使用量': false,
      '停车场': false
    },
    show: true,
    type: 'scroll', // 启用翻页模式
    orient: 'vertical', // 纵向显示
    right: 15,
    top: 45,
    backgroundColor: '#eee',
    padding: 10
  },

  // 工具箱配置
  toolbox: {
    feature: {
      // 自定义工具按钮，注：自定义按钮必须以my开头
      myTool: {
        show: true,
        title: '自定义扩展方法',
        icon: 'image://http://echarts.baidu.com/images/favicon.png', // 注：image:// 这个是固定格式，后面跟图片地址
        onclick: () => {}
      },

      // 线形图和柱状图的切换
      magicType: {
        type: ['line', 'bar'],
        title: {
          line: '折线图',
          bar: '柱状图'
        }
      },
      restore: {}, // 还原
      saveAsImage: {} // 保存为图片
    }
  },

  // X轴配置
  xAxis: {
    name: '( 月份 )',
    type: 'category',
    axisLabel: {
      rotate: 30 // X轴文字旋转角度
    },
    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  },

  // Y轴配置
  yAxis: {
    name: '( 月用户/月停车场使用 )',
    nameLocation: 'middle', // 居中
    nameGap: 60, // 与轴线之间的间距
    nameRotate: 90, // 字体旋转角度
    type: 'value',

    // Y轴线条设置
    axisLine: {
      show: true,
      lineStyle: {
        type: 'solid'
      }
    },

    // Y轴分割线设置
    splitLine: {
      show: true,
      lineStyle: {
        color: '#ddd',
        type: 'solid'
      }
    }
  },

  // 底部缩放条配置
  dataZoom: [{
    type: 'slider',
    start: 0,
    end: 50,
    bottom: 0,
    show: true
  }],

  // 系列数据配置
  series: [{
    name: '用户',
    data: [820, 932, 901, 934, 1290, 1330, 1320, 901, 934, 1290, 1330, 1320],
    type: 'bar',
    label: {
      show: true
    }
  }, {
    name: '使用量',
    data: [820, 932, 901, 934, 1290, 1330, 1320, 901, 934, 1290, 1330, 1320],
    type: 'line',
    label: {
      show: true
    }
  }, {
    name: '停车场',
    data: [100, 200, 500, 600, 400, 800, 600, 200, 600, 300, 200, 400],
    type: 'bar',
    label: {
      show: true
    }
  }]
}

export default option
