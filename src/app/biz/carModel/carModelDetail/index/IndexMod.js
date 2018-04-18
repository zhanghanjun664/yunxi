import React, { PropTypes, Component } from 'react';
import { observable, action, runInAction, useStrict, autorun } from 'mobx';
import Serv from './IndexServ';
import Config from 'config/Config';

useStrict(true)
class ProductDetailIndex {
  @observable state = {
    navTab: 0,
    skusId: '',
    baseInfo: {},
    commentData: {},
    nearbyInfo: {},
    carConfig: {},
    activityList: [],
    imgDetail: {
      activeIndex: 0,
      data: {},
      tabsBox: [
        { title: "全景", isShow: false },
        { title: "外观", isShow: false },
        { title: "中控", isShow: false },
        { title: "座椅", isShow: false },
        { title: "细节", isShow: false },
        { title: "视频", isShow: false },
      ],
      imgList: {
        qjList: [],
        wgList: [],
        zkList: [],
        zyList: [],
        xjList: [],
        spList: []
      }
    },
    switchSpec: {
      dataSource: []
    },
    dataSource: [],
    selectedSkusIdList: {},
    selectedValueIdList: {},
    canSubmitSku: true
  };
  @action
  handleScroll(type) {
    this.state.navTab = type
  }
  @action
  clearStaticData() {
    runInAction(() => {
      this.state.skuId = null
    })
  }
  // 设置skusId
  @action
  setSkusId(id) {
    console.log(id)
    this.state.skusId = id
    // this.changeImgData(id)
  }
  @action
  changeImg(obj) {
    this.state.imgDetail.activeIndex = obj.index
    console.log(obj)
  }
  @action
  setItem(type) {
    this.state.navTab = type
  }
  @action
  initSelectedSkuId(obj) {
    let dataSource = JSON.parse(JSON.stringify(this.state.dataSource))
    this.clearSelectedValueIdList()
    // obj：带进来的sku，对应属性初始化
    dataSource.map(item => {
      item.values.map(item2 => {
        if (item2.skusIdList.indexOf(obj.id) !== -1) {
          item2.checked = true
          item2.disabled = false
          this.setOrDeleteValueId(item2)
          this.setOrDeleteSkuId(item2)
        }
        else {
          item2.disabled = true
        }
      })
    })


    this.state.dataSource = dataSource
    console.log(this.state.dataSource, this.state.selectedSkusIdList, this.state.selectedValueIdList)
  }
  // 设置或者删除已选valueId
  @action
  setOrDeleteValueId(item) {
    let { valueId, nameId } = item
    let { selectedValueIdList } = this.state
    console.log(item)
    // 第一次，直接赋值
    console.log(selectedValueIdList[nameId])
    if (selectedValueIdList[nameId] == valueId) {
      console.log('clear===')
      selectedValueIdList[nameId] = ''
    } else {
      console.log('set======')
      selectedValueIdList[nameId] = valueId
    }
    runInAction(() => {
      this.state.selectedValueIdList = selectedValueIdList
    })
  }

  // 设置 已选valueId对应的skuId
  @action
  setOrDeleteSkuId(item) {
    let { valueId, nameId } = item
    let { selectedSkusIdList } = this.state
    let copySelectedSkusIdList = JSON.parse(JSON.stringify(selectedSkusIdList))
    console.log(item)
    console.log(selectedSkusIdList[nameId], item.skusIdList)
    // console.log(this.arrayIsSame(selectedSkusIdList[nameId], item.skusIdList))
    if (copySelectedSkusIdList[nameId] && this.arrayIsSame(copySelectedSkusIdList[nameId], item.skusIdList)) {
      copySelectedSkusIdList[nameId] = []
    } else {
      copySelectedSkusIdList[nameId] = item.skusIdList

    }
    console.log(copySelectedSkusIdList)
    runInAction(() => {
      this.state.selectedSkusIdList = copySelectedSkusIdList
    })
    console.log("this.state.selectedSkusIdList", this.state.selectedSkusIdList)
  }
  arrayIsSame(arr1, arr2) {
    console.log(arr1.sort().toString(), arr2.sort().toString())
    if (arr1.sort().toString() == arr2.sort().toString()) {
      return true
    }
    return false
  }
  @action
  clearSelectedValueIdList() {
      this.state.selectedValueIdList = {}
  }

  // 获取selectedValueIdList里面的valueId组成数组
  getSelectedValueIdList() {
    let selectedValueIdList = JSON.parse(JSON.stringify(this.state.selectedValueIdList));
    let valueIdList = Object.values(selectedValueIdList).filter(item => item);

    console.log(selectedValueIdList, valueIdList)
    return valueIdList
  }

  // 选择skus
  @action
  changeImgData(id) {
    console.log(id, this.state.baseInfo.skus)
    for (let item of this.state.baseInfo.skus) {
      if (item.id == id) {
        this.state.imgDetail.data = item
        this.handleTabsBox()
        return
      }
    }
  }

  // 经销商信息
  @action
  async getNearbyInfo(params) {
    let data = await Serv.getNearbyInfo(params)
    console.log(params)
    runInAction(() => {
      this.state.nearbyInfo = data.data
    })
  }
  // 评论
  @action
  async getCommentData(params) {
    let data = await Serv.getCommentData(params)
    runInAction(() => {
      this.state.commentData = data.data
    })
  }
  // 车型详情（参数）
  @action
  async getCarConfig(params) {
    let data = await Serv.getCarConfig(params)
    runInAction(() => {
      this.state.carConfig = data.data

      this.state.baseInfo = data.data
      if (!this.state.skusId||this.state.skusId == 'undefined') {
        this.setSkusId(data.data.skus[0].id)
        this.changeImgData(this.state.skusId)
      }
      this.changeImgData(this.state.skusId)
    })
  }

  // 找出属性的valueId=1的sku列表
  // 传入第一个参数应该是已选的valueId列表,skuArr为借口返回skus的大列表
  @action
  getSkuIds(valueId, skuArr) {
    let skuIdArr = '', skuIdObj = {};
    console.log(skuArr)
    skuArr.map((sku, i) => {
      sku.props.map((p, j) => {
        valueId.map((vId) => {
          if ('' + p.valueId === '' + vId) {
            if (skuIdObj[vId]) {
              skuIdObj[vId].push(sku.id)
            } else {
              skuIdObj[vId] = [sku.id]
            }
          }
        })

      })
    })
    skuIdArr = _.intersection(...Object.values(skuIdObj))
    console.log('skuIdObj', skuIdObj, Object.values(skuIdObj))
    return skuIdArr
  }

  // 获取已选valueId对应兄弟属性
  @action
  getPropsArr(valueIdItem, skuIdArr, skuArr) {
    let resultProps = [], newSkuArr = [];
    // 过滤掉非valueId为1的sku
    // let newSkuArr = _.filter(skuArr, function(o) { return _.includes(skuIdArr, '' + o.id) });
    skuIdArr.map((sId) => {
      skuArr.map(item => {
        if (item.id == sId) {
          newSkuArr.push(item)
        }
      })
    })
    newSkuArr.map((sku, k) => {
      sku.props.map((q, m) => {
        Object.keys(valueIdItem).map((key) => {
          // 处理同一nameId下选中了啥
          if (key == q.nameId) {
            if ('' + q.valueId !== '' + valueIdItem[key]) {
              resultProps.push(Object.assign(q, { skuId: sku.id }))
            }

          }

        })
      })
    })
    console.log('已选择属性对应sku下兄弟节点的属性:', resultProps)
    return resultProps
  }

  @action
  getCheckedGrop(skuGroup, nameId, valueId) {
    let skuGroupCopy = JSON.parse(JSON.stringify(skuGroup))
    skuGroupCopy.map((sg, i) => {
      let tmpArr = sg.values
      tmpArr.map((tp, j) => {
        // 同一组
        if ('' + tp.nameId === '' + nameId) {
          if ('' + tp.valueId === '' + valueId) {
            tp.checked = !tp.checked
          } else {
            tp.checked = false
          }
        }
      })
    })
    return skuGroupCopy
  }
  // 设置disabled属性
  // 1：当前选中的valueId列表 2：归类后的列表【二维数组name,values】3
  @action
  getNewSkuGroup(valueIdList, skuGroup, resProps) {
    let skuGroupCopy = JSON.parse(JSON.stringify(skuGroup))
    console.log('skuGroupCopy:', skuGroup.length)
    console.log("valueIdList", valueIdList)
    if (valueIdList.length) {
      skuGroupCopy.map((sg, i) => {
        let tmpArr = sg.values
        tmpArr.map((tp, j) => {
          tp.disabled = true
        })
      })
      skuGroupCopy.map((sg, i) => {
        let tmpArr = sg.values
        console.log('tmpArr:', tmpArr, 'resProps:', resProps)
        tmpArr.map((tp, j) => {
          // 可选的resProps里面的valueId对应item不禁用
          resProps.map((rp, k) => {
            if (tp.nameId == rp.nameId) {
              console.log(tp, rp)
              if ('' + tp.valueId === '' + rp.valueId) {
                tp.disabled = false
              }
              // else{
              //   console.log('被禁用的:', tp, rp)
              //   tp.disabled = true
              // }

            }
          })
          // 已选列表不禁用
          Object.values(valueIdList).map((vId) => {
            if (vId == tp.valueId) {
              tp.disabled = false
            }
          })
          // if('' + valueId === '' + tp.valueId){
          //   tp.disabled = false
          // }
        })
      })
    } else {
      skuGroupCopy.map((sg, i) => {
        let tmpArr = sg.values
        tmpArr.map((tp, j) => {
          tp.disabled = false
        })
      })
    }
    console.log(skuGroupCopy)
    return skuGroupCopy
  }

  @action
  getUniqData(tmpSkuList) {
    let cpTsl = JSON.parse(JSON.stringify(tmpSkuList))

    if (0 !== cpTsl.length) {
      cpTsl.map((ts, i) => {
        let res = [ts.values[0]]
        ts.values.map((tv, j) => {
          let repeat = false
          res.map((r, k) => {
            if ('' + tv.valueId == '' + res[k].valueId) {
              console.log('res[k].skusIdList:', res[k].skusIdList, 'tv.skusIdList:', tv.skusIdList)
              res[k].skusIdList.push(...tv.skusIdList)
              res[k].skusIdList = _.uniq(res[k].skusIdList)
              repeat = true
              return
            }
          })
          if (!repeat) {
            res.push(tv)
          }
        })
        console.log('res:', res)
        ts.values = res
      })
    }
    return cpTsl
  }

  // 第一次处理接口返回的数据，得到二维数组
  @action
  getGroupSkuData() {
    let len = _.get(this.state, 'baseInfo.skus.length', 0)
    if (0 === len) {
      return false;
    }
    let allData = [], arr = this.state.baseInfo.skus
    arr.map(item => {
      item.props.map(sItem => {
        // 给每一项加上skuId
        if (sItem.skusIdList && _.isArray(sItem.skusIdList)) {
          sItem.skusIdList.push(item.id)
        } else {
          sItem.skusIdList = [item.id]
        }
      })
      allData.push(...item.props)
    })
    console.log(allData)
    // 根据nameId归类
    let tmp = _.groupBy(allData, item => item.nameId), tmpSkuList = []
    _.each(tmp, (item, key) => {
      tmpSkuList.push({
        nameId: key,
        values: item
      })
    })

    runInAction(() => {
      this.state.dataSource = this.getUniqData(tmpSkuList)
      console.log("this.state.dataSource", this.state.dataSource)
    })
  }


  @action
  getCheckAndDisableList(item) {
    let { nameId, valueId, skusIdList } = item
    let { selectedValueIdList } = this.state
    // 原始sku列表
    let skuList = this.state.baseInfo.skus
    console.log('skuList', skuList)
    // 获取所有的skuId列表 
    // 应传入已选的 valueId列表 要得出skuID list的交集
    // 先根据当前传入的item设置valueIdList
    this.setOrDeleteValueId(item)
    this.setOrDeleteSkuId(item)
    let valueIdList = this.getSelectedValueIdList()
    let skuIdList = this.getSkuIds(valueIdList, skuList)
    console.log('skuIdList', skuIdList)
    console.log('valueIdList',valueIdList)
    // sku分组后的列表
    let skuGroup = this.state.dataSource
    // 获取已选valueIdList中同一skuId下的兄弟属性（剩下还可以选的属性）
    let resProps = this.getPropsArr(selectedValueIdList, skuIdList, skuList)
    console.log('resProps:', resProps, 'skuGroup:', skuGroup)
    // 设置disabled属性
    let sgc = this.getNewSkuGroup(valueIdList, skuGroup, resProps)
    // 设置checked属性
    let sgc2 = this.getCheckedGrop(sgc, nameId, valueId)
    this.canSubmit()
    console.log('属性禁用情况:', sgc)
    console.log('属性勾选情况2:', sgc2)
    runInAction(() => {
      this.state.dataSource = sgc2
      this.state.selectedSkusIdList[nameId] = skusIdList
      console.log(this.state.selectedSkusIdList)
    })
  }

  // 找出重复元素
  @action
  duplicate(tmpArr) {
    var tmp = [];
    tmpArr.concat().sort().sort(function (a, b) {
      if (a == b && tmp.indexOf(a) === -1) tmp.push(a);
    });
    return tmp;
  }

  @action
  submit(e, cbf) {
    let { selectedSkusIdList } = this.state
    let newSkuIdList = []
    console.log(selectedSkusIdList)
    Object.keys(selectedSkusIdList).map((k, i) => {
      newSkuIdList.push(...selectedSkusIdList[k])
    })
    let tmpSkuId = this.duplicate(newSkuIdList)
    this.setSkusId(tmpSkuId[0])
    this.changeImgData(tmpSkuId[0])
    let canSubmitSku = this.canSubmit();
    if (canSubmitSku) {
      cbf(tmpSkuId[0])
    }
  }

  // 判断是否可确定该sku
  @action
  canSubmit() {
    let { selectedValueIdList } = this.state
    let canSubmitBoo = true;
    Object.keys(selectedValueIdList).map((key) => {
      console.log(selectedValueIdList, selectedValueIdList[key])
      if (!selectedValueIdList[key]) {
        canSubmitBoo = false
      }
    })
    console.log(canSubmitBoo)
    runInAction(() => {
      this.state.canSubmitSku = canSubmitBoo
    })
    return canSubmitBoo
  }


  @action
  handleTabsBox() {
    let copyImgList = {
      qjList: [],
      wgList: [],
      zkList: [],
      zyList: [],
      xjList: [],
      spList: []
    }
    // let copyImgList = JSON.parse(JSON.stringify(this.state.imgDetail.imgList))
    let { qjList, wgList, zkList, zyList, xjList, spList } = copyImgList
    let { data, tabsBox } = this.state.imgDetail
    tabsBox.map((item)=>{
      item.isShow = false
    })
    data.cmpMedias.map((item, index) => {
      item.fileType == 1 && qjList.push(item)
      item.fileType == 2 && wgList.push(item)
      item.fileType == 3 && zkList.push(item)
      item.fileType == 4 && zyList.push(item)
      item.fileType == 5 && xjList.push(item)
      item.fileType == 6 && spList.push(item)
      console.log(tabsBox, tabsBox[item.fileType - 1], item.fileType - 1)

      item.fileType && (tabsBox[item.fileType - 1].isShow = true)
    })
    this.state.imgDetail.imgList = copyImgList
  }
  // 活动
  @action
  async getActivityList(params) {
    let data = await Serv.getActivityList(params)
    runInAction(() => {
      this.state.activityList = data.data.list
    })
  }


}

const productDetailIndex = new ProductDetailIndex();


export default productDetailIndex;
