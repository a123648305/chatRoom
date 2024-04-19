<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <van-button type="primary" >test</van-button>
    </div>
  </header>
  <section>
    <RouterView />
  </section>
</template>

<style lang="less" scoped>
.wrapper{
    border: 1px solid red;
    width:200px;
    height: 100%;
    margin: auto;
}
</style>
