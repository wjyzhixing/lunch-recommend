const mock = {
  'POST /api/login': (req, res) => {
    setTimeout(() => {
      if (req.query.type === 'error') {
        res.status(200).json({
          errCode: -1,
          errMsg: '连接数据库错误啦',
          data: '',
        });
      } else {
        res.status(200).json({
          data: {
            list: [
              {
                title: '点石成金',
                name: '202122',
                code: '9527',
                content: '描述描述描述描述描述描述描述',
                type: '咨询',
                firstPersonNameInCharge: '某某某',
                createTime: '2020-01-20',
                status: '0', //工单状态0：未受理，1:受理，2已解决，3待审核
                tagId: '0', //标签id，0二次受理，1无效投诉，2重大投诉，3延期
                hasWarn: true,
              },
              {
                title: '点石成金',
                name: '202122',
                code: '9527',
                content: '描述描述描述描述描述描述描述',
                type: '咨询',
                firstPersonNameInCharge: '某某某',
                createTime: '2020-01-20',
                status: '1', //工单状态0：未受理，1:受理，2已解决，3待审核
                tagId: '1', //标签id，0二次受理，1无效投诉，2重大投诉，3延期
                hasWarn: true,
              },
              {
                title: '点石成金',
                name: '202122',
                code: '9527',
                content: '描述描述描述描述描述描述描述',
                type: '咨询',
                firstPersonNameInCharge: '某某某',
                createTime: '2020-01-20',
                status: '2', //工单状态0：未受理，1:受理，2已解决，3待审核
                tagId: '2', //标签id，0二次受理，1无效投诉，2重大投诉，3延期
                hasWarn: true,
              },
              {
                title: '点石成金',
                name: '202122',
                code: '9527',
                content: '描述描述描述描述描述描述描述',
                type: '咨询',
                firstPersonNameInCharge: '某某某',
                createTime: '2020-01-20',
                status: '3', //工单状态0：未受理，1:受理，2已解决，3待审核
                tagId: '3', //标签id，0二次受理，1无效投诉，2重大投诉，3延期
                hasWarn: true,
              },
            ],
            total: 4,
          },

          code: '200',
          message: '后台处理成功！',
          success: true,
        });
      }
    }, 1000);
  },
};

// module.exports = mock;
