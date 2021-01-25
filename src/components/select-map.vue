<template>
  <div class="select-map">
    <div id="select-map"></div>
    <el-dialog title="提示" :visible.sync="dialogVisible">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      map: {}, //保存地图对象
      mouseTool: {}, // 鼠标多边形绘制工具
      polyType: {
        borderColor: "",
        fillOpacity: 0.5,
        fillColor: "",
      },
      polygonList: [],
      savePolygon: [],
    };
  },
  methods: {
    // 绘制多边形
    drawPolygon() {
      let that = this;
      this.mouseTool = new AMap.MouseTool(this.map);
      this.mouseTool.polygon({
        strokeColor: this.polyType.borderColor,
        fillColor: this.polyType.fillColor,
      });
      //监听draw事件可获取画好的覆盖物
      this.polygonList = [];
      this.mouseTool.on("draw", function (e) {
        that.polygonList.push(e.obj);
        console.log("绘制的多边形", that.polygonList);
      });
    },
    // 清空地图上绘制的多边形
    clearPolygon() {
      this.map.remove(this.polygonList);
      this.polygonList = [];
    },
    // 结束绘制多边形
    closeDrawPolygon() {
      this.mouseTool.close();
      let savePolygon = [];
      for (let i = 0; i < this.polygonList.length; i++) {
        console.log(this.polygonList[i].getOptions());
        let op = this.polygonList[i].getOptions();
        let routePath = [];
        op.path.forEach((item) => {
          routePath.push([item.lng, item.lat]);
        });
        let savearr = {
          path: routePath,
          strokeColor: op.strokeColor,
          strokeOpacity: op.strokeOpacity,
          fillOpacity: op.fillOpacity,
          fillColor: op.fillColor,
          zIndex: op.zIndex,
        };
        this.savePolygon.push(savearr);
      }
      let save = JSON.stringify(this.savePolygon);
      console.log("savePolygon", save);
      sessionStorage.setItem("savePolygon", save);
    },
    // 创建地图
    createMap() {
      let that = this;
      this.$nextTick(() => {
        //地图加载
        that.map = new AMap.Map("select-map", {
          zoom: 14,
        });
        // 地图上打印当前的鼠标点击点位
        that.map.on("click", function (e) {
          console.log(e.lnglat.getLng() + "," + e.lnglat.getLat());
        });
      });
    },
    // 用保存的数据重新绘制多边形并添加事件
    resetDraw() {
      let that = this;
      let savePolygon = JSON.parse(sessionStorage.getItem("savePolygon"));
      console.log("重绘多边形数据", savePolygon);
      for (let i = 0; i < savePolygon.length; i++) {
        var polygon = new AMap.Polygon(savePolygon[i]);
        polygon.on("click", function (e) {
          console.log("点击了" + i + "个内容", e);
          that.dialogVisible = true;
        });
        this.map.add(polygon);
      }
    },
  },
  mounted() {
    this.createMap();
  },
};
</script>
<style lang="scss" scoped>
.select-map {
  width: 100%;
  height: 100%;
  #select-map {
    width: 100%;
    height: 100%;
  }
}
</style>
