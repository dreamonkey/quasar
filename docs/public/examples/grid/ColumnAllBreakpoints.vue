<template>
  <div class="q-pa-md">

    <div class="column" style="height: 150px">
      <div class="col">.col</div>
      <div class="col">.col</div>
      <div class="col">.col</div>
      <div class="col">.col</div>
    </div>

    <div class="column" style="height: 150px">
      <div class="col-8">.col-8</div>
      <div class="col-4">.col-4</div>
    </div>

  </div>
</template>

<style lang="sass" scoped>
.column > div
  padding: 10px 15px
  background: rgba(61,89,124, .15)
  border: 1px solid rgba(126,135,149, .6)
.column + .column
  margin-top: 1rem
</style>
