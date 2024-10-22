<template>
    
    <view v-if="text==='MVP'" class="tag tag-with-icon tag-mvp" @click="showPop(text)"><icon class="iconfont icon-wangguan2"></icon>{{ text }}</view>
    
    <view v-else-if="text==='杀人王' || text==='杀戮机器'" class="tag tag-srw" @click="showPop(text)">{{ text }}</view>
    
    <view v-else-if="text==='天秀'" class="tag tag-with-icon tag-xiu" @click="showPop(text)"><icon class="iconfont icon-icon"></icon>{{ text }}</view>
    
    <view v-else-if="text==='战场终结者'" class="tag tag-srw" @click="showPop(text)">{{ text }}</view>
    
    <view v-else-if="text==='壕无人性'" class="tag tag-yuanbao" @click="showPop(text)">{{ text }}</view>
    
    <view v-else-if="text==='满头包'" class="tag tag-with-icon tag-mtb" @click="showPop(text)"><icon class="iconfont icon-kelian"></icon>{{ text }}</view>
    
    <view v-else-if="text==='挨最毒的打' || text==='霹得妈都不认识'" class="tag tag-with-icon tag-mtb" @click="showPop(text)"><icon class="iconfont icon-kulian"></icon>{{ text }}</view>
    
    <view v-else-if="text==='我是卧底'" class="tag tag-with-icon tag-wd" @click="showPop(text)"><icon class="iconfont icon-u___fm__gp_-copy"></icon>{{ text }}</view>
    
    <view v-else-if="text==='惨遭背刺'" class="tag tag-wd" @click="showPop(text)">{{ text }}</view>

    <view v-else-if="text.endsWith('这场克我')" class="tag" @click="showPop('这场克我')">{{ text }}</view>

    <view v-else-if="text.endsWith('相爱相杀')" class="tag" @click="showPop('相爱相杀')">{{ text }}</view>

    <view v-else-if="text.endsWith('杀手')" class="tag" @click="showPop('杀手')">{{ text }}</view>

    <view v-else-if="text.endsWith('追着打')" class="tag" @click="showPop('追着打')">{{ text }}</view>
    
    <view v-else-if="['超硬', '无私奉献', '最强辅助', '控制拉满', '无限火力', '仇恨拉满', '毒王', '无敌剑客', '固若金汤', '手速之王'].includes(text)" class="tag tag-yx" @click="showPop(text)">{{ text }}</view>
    
    <view v-else-if="text.includes('连杀')" class="tag tag-liansha" @click="showPop('连杀')">{{ text }}</view>
    
    <view v-else class="tag" @click="showPop(text)">{{ text }}</view>

    <up-popup v-model:show="isShowPop" :customStyle="{background: '#f4f8ff'}">
      <view class="tag-tips-popup-content">
        <view class="pop-title">{{ text }}</view>
        <view>{{ curText }}</view>
      </view>
		</up-popup>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'

  const props = defineProps<{
    text: string
  }>()

  const tagMap = reactive<{[key: string]: string}>({
    'MVP': '综合得分最高，斩获全队MVP',
    '这场克我': '这场被某人杀的比例很高',
    '相爱相杀': '这场对某人用卡/配药/法器比例很高',
    '杀手': '这场杀某人次数占自己杀人数的比例有点高',
    '追着打': '这场某人打我最多，记小本本上了',
    '天秀': '本场比赛，他突破了神灵的界限，秀得飞起',
    '无敌剑客': '招杀敌人数量全队第一',
    '固若金汤': '每死承伤数最高，是敌人难以突破的防线',
    '杀人王': '杀人数全队第一，杀疯了',
    '战场终结者': '获得最高连杀，战斗由此终结',
    '连杀': '最高连续杀人数，阵亡会重新开始计数',
    '超硬': '每次死亡承受的卡片/配药/法器伤害特别高，想杀我很难',
    '很硬': '每次死亡承受的卡片/配药/法器伤害很高，不容易死',
    '有点硬': '每次死亡承受的卡片/配药/法器伤害比较高',
    '无私奉献': '使用的卡片/配药/法器全队最高',
    '最强辅助': '使用的卡片/配药/法器很高但人头相对较少',
    '控制拉满': '使用解除卡次数全队第一',
    '仇恨拉满': '承受卡片/配药/法器伤害全队第一，下次小心点哦',
    '无限火力': '使用陷害卡次数全队第一',
    '嗜血成性': '使用吸血虫数量全队第一',
    '废人武功': '使用吃豆数全队第一，让人无法发挥招式威力',
    '毒王': '用毒杀人数全队第一',
    '满头包': '死亡数全队第一，下次跑快点哦',
    '挨最毒的打': '承受的伤害和被杀综合系数全队第一，下次躲起来吧',
    '霹得妈都不认识': '被霹雳超过一定数量，且被霹数全场第一',
    '拼命三郎': '拼命招杀比例超高',
    '擅长用毒': '用毒杀人比例超高',
    '法器专家': '法器杀人超过自己总人头的一半',
    '生了个主力': '小孩杀人超过一定数量',
    '控制型选手': '本场助攻数据不错，且使用解除卡比例很高',
    '陷害型选手': '本场助攻数据不错，且使用陷害卡比例很高',
    '法器选手': '比较喜欢法器攻击',
    '吸血鬼': '用吸血虫比例很高',
    '派发死神': '对别人下过死神',
    '霹雳啪啦': '对别人下过霹雳卡',
    '死神降临': '被下过死神卡',
    '挨霹倒霉蛋': '被用过霹雳卡',
    '狠起来连自己都杀': '杀过自己的号',
    '我信佛哦': '本场没杀人，但下一场不一定哦',
    '打了个酱油': '没用过卡片/配药/法器',
    '广结善缘': '没被别人过卡片/配药/法器',
    '我是卧底': '杀队友或者对队友用过卡片/配药/法器（用化功散分武功不算卧底行为）',
    '惨遭背刺': '被队友杀过或者用过卡片/配药/法器（用化功散分队友武功不算背刺行为）',
    '有福同享': '给队友分武功',
    '壕无人性': '本场战斗花费金币全队第一且超过一定金额',
    '手速之王': '同秒率超过50%'
  })

  const isShowPop = ref(false)
  const curText = ref('')
  const showPop = (key: string) => {
    curText.value = tagMap[key] || '暂无说明'
    isShowPop.value = true
  }

</script>

<style lang="scss" >
  .tag {
    @mixin gradient-color-bg {
      animation: gradientText 800s infinite linear;
      -webkit-animation: gradientText 800s infinite linear;
      -webkit-text-fill-color: #fff;
      border: 1px solid transparent;
    }
    @mixin grater-icon {
      top: 4rpx;
      width: 26rpx;
      height: 26rpx;
      font-size: 26rpx;
      line-height: 26rpx;
    }
    display: inline-flex;
    position: relative;
    border-radius: 2px;
    margin-right: 4rpx;
    margin-bottom: 4rpx;
    padding: 0 4rpx;
    font-size: 24rpx;
    border: 1px solid #80abd6;
    color: #80abd6;
    -webkit-text-fill-color: #80abd6;
    &.tag-with-icon {
      padding-left: 30rpx;
    }
    .iconfont {
      position: absolute;
      left: 2rpx;
      top: 2rpx;
      width: 24rpx;
      height: 24rpx;
      font-size: 24rpx;
      line-height: 24rpx;
      &::before {
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    &.tag-mvp {
      background-image: linear-gradient(60deg, #ff9f50, #ff5500, #ff9f50);
      @include gradient-color-bg;
      .iconfont {
        @include grater-icon;
      }
    }

    &.tag-srw {
      background-image: linear-gradient(60deg, #f26060, #ff2222, #f26060);
      @include gradient-color-bg;
    }

    &.tag-xiu {
      background-image: linear-gradient(60deg, #a96fff, #6a3eee, #a96fff);
      @include gradient-color-bg;
    }
    &.tag-yuanbao {
      background-image: linear-gradient(60deg, #f3e765, #ffdd61, #f3e765);
      @include gradient-color-bg;
    }
    &.tag-yx {
      border: 1px solid #fe853f;
      color: #fe853f;
      -webkit-text-fill-color: #fe853f;
    }

    &.tag-liansha {
      border: 1px solid #ff2a2a;
      color: #ff2a2a;
      -webkit-text-fill-color: #ff2a2a;
    }

    &.tag-mtb {
      border: 1px solid #022202;
      color: #022202;
      -webkit-text-fill-color: #022202;
      .icon-kelian {
        @include grater-icon;
      }
      .icon-kulian {
        top: 4rpx;
      }
    }
    &.tag-wd {
      border: 1px solid #a09797;
      color: #a09797;
      -webkit-text-fill-color: #a09797;
      .iconfont {
        top: 4rpx;
        left: -2rpx;
      }
    }
  }
  @keyframes gradientBg {
    0% {
      background-position: 0;
    }
    100% {
      background-position: 28000px;
    }
  }
  .tag-tips-popup-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 300rpx;
    padding: 0 60rpx;
    font-size: 26rpx;
    color: #999;
    -webkit-text-fill-color: #999;
    .pop-title {
      font-size: 30rpx;
      color: #022202;
      -webkit-text-fill-color: #022202;
      font-weight: bold;
      margin-bottom: 20rpx;
    }
  }
</style>