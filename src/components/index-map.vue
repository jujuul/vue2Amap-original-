<template>
  <div class="index-map">
    <div class="func-line">
      <div>
        <p>绘制多边形操作</p>
        <p>
          <el-button @click="drawPolygon">开始绘制</el-button>
          <el-button @click="clearPolygon">清空当前绘制</el-button>
          <el-button @click="closeDrawPolygon">结束绘制并保存</el-button>
          <span style="font-size: 10px">小提示：右键取消</span>
        </p>
      </div>
      <div>
        <p>用保存的数据重新绘制多边形并添加事件</p>
        <el-button @click="resetDraw">重新绘制</el-button>
      </div>
    </div>
    <div class="map-select-box">
      <SelectMap ref="SelectMap"></SelectMap>
    </div>
  </div>
</template>
<script>
import SelectMap from "./select-map";
export default {
  data() {
    return {
      // 多边形绘制颜色选择
      polyType: {
        borderColor: "",
        fillOpacity: 0,
        fillColor: "",
      },
    };
  },
  components: {
    SelectMap,
  },
  methods: {
    // 绘制多边形
    drawPolygon() {
      this.$refs["SelectMap"].drawPolygon();
    },
    // 清空绘制
    clearPolygon() {
      this.$refs["SelectMap"].clearPolygon();
    },
    // 结束绘制
    closeDrawPolygon() {
      this.$refs["SelectMap"].closeDrawPolygon();
    },
    // 重绘多边形内容并添加事件
    resetDraw() {
      this.$refs["SelectMap"].resetDraw();
    },
  },
};
</script>
<style lang="scss" scoped>
.index-map {
  width: 100%;
  overflow: hidden;
  padding: 0;
  .func-line {
    width: 100%;
    margin-bottom: 20px;
    > div {
      border: 1px solid #ebebeb;
      padding: 10px;
    }
  }
  .map-select-box {
    height: 520px;
    width: 100%;
  }
}
</style>
