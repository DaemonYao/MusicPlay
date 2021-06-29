<template>
  <div class="fault">
    <div class="fault-contant">
      <img src="../../src/assets/404.png" alt="" />
      <h1>程序猿正在加班加点···············</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "404",
};
</script>

<style lang="scss" scoped>
.fault {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & .fault-contant {
    width: 800px;
    height: 500px;
    // background-color: aquamarine;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
   
  }
}
</style>
