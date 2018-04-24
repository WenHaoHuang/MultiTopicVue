<template>
    <div class="no-data">
        <div class="no-data-inner" :style="{backgroundImage: `url(${infoList[type]['img']})`}">
            <p>{{infoList[type]['info']}}</p>
        </div>
    </div>
</template>

<script>

  export default {
      name: 'noData',
      data() {
          return {
              infoList: {
                  "1": {
                      info: '一大波标的正在赶来...',
                      img: require('./icon/pageresault_blank_bdlb.png')
                  },
                  "2": {
                      info: '暂时还没有债权项目',
                      img: require('./icon/pageresault_blank_wdzq.png')
                  },
                  "3": {
                      info: '还没有回款项目哦',
                      img: require('./icon/pageresault_blank_hkrl.png')
                  },
                  "4": {
                      info: '你不理财 财不理你',
                      img: require('./icon/pageresault_blank_wdlc.png')
                  },
                  "5": {
                      info: '还没有消息哦',
                      img: require('./icon/pageresault_blank_xxzx.png')
                  },
                  "6": {
                      info: '网络可能跑到外太空了...',
                      img: require('./icon/pageresault_blank_wlcc.png')
                  },
                  "7": {
                      info: '还没有交易记录哦',
                      img: require('./icon/pageresault_blank_jyjl.png')
                  },
                  "8": {
                      info: '还没添加收货地址',
                      img: require('./icon/pageresault_blank_shdz.png')
                  },
                  "9": {
                      info: '业务出错',
                      img: require('./icon/pageresault_blank_ywyc.png')
                  },
                  "10": {
                      info: '快去摇一摇拿奖励',
                      img: require('./icon/pageresault_blank_wdjl.png')
                  },
                  "11": {
                      info: '还没有收藏的商品哦',
                      img: require('./icon/pageresault_blank_yxsc.png')
                  },
                  "12": {
                      info: '还没有订单哦',
                      img: require('./icon/pageresault_blank_yxdd.png')
                  },
                  "13": {
                      info: '没有搜到相关商品哦',
                      img: require('./icon/pageresault_blank_spss.png')
                  },
                  "14": {
                      info: '还没有月账单哦',
                      img: require('./icon/pageresault_blank_zdwk.png')
                  }
              }
          }
      },
      props: {
          type: {
              type: Number,
              default: 1
          }
      }
  }
</script>

<style lang="scss">
    .no-data {
        position:absolute;
        z-index:100;
        left:0;top:0;right:0;bottom:0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background: #FFF;
        .no-data-inner {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: flex-end;
            width: 4rem;
            height: 4rem;
            font-size: 0.28rem;
            color: #888;
            background-size: cover;
        }
    }
</style>
