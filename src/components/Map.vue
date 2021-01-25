<template>
  <div class="hello">
    <div id="container">
      <div class="info">
        操作说明：圆和矩形通过拖拽来绘制，其他覆盖物通过点击来绘制
      </div>
    </div>
    <div class="toolbar">
      <div class="input-card" style="width: 24rem">
        <div class="input-item">
          <button id="clear" class="btn">清除</button>
          <button class="btn" @click="open()" style="margin-bottom: 5px">
            开始编辑
          </button>
          <button class="btn" @click="close()">结束编辑</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AMap from "AMap"; //在页面中引入高德地图

export default {
  data() {
    return {
      path: [],
      rePath: [],
      mouseTool: {},
    };
  },
  mounted() {
    // this.loadmap(); //加载地图和相关组件
    window.map = new AMap.Map("container", {
      center: [116.400274, 39.905812],
      zoom: 14,
    });
    window.mouseTool = new AMap.MouseTool(map);
    window.overlays = [];
    mouseTool.on("draw", function (e) {
      overlays.push(e.obj);
    });
    mouseTool.polygon({
      strokeColor: "#80d8ff",
      //同Polyline的Option设置
    });
  },
  methods: {
    open() {
      // mouseTool.polygon.getPath()
      console.log(overlays);
      // polyEditor.open();
    },
    close() {
      // polyEditor.close();
    },
  },
};
</script>
<style>
#container {
  height: calc(100vh - 108px);
  position: relative;
}
.info {
  position: fixed;
  top: 4px;
  right: 8px;
  z-index: 1000;
}
.toolbar {
  height: 90px;
}
</style>