<template>
  <div class="q-pa-md">

    <div class="column" style="height: 150px">
      <div class="col">
        1 of 2
      </div>
      <div class="col">
        1 of 2
      </div>
    </div>

    <div class="column" style="height: 150px">
      <div class="col">
        1 of 3
      </div>
      <div class="col">
        1 of 3
      </div>
      <div class="col">
        1 of 3
      </div>
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
