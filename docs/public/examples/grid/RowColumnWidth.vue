<template>
  <div class="q-pa-md">

    <div class="row">
      <div class="col">
        .col
      </div>
      <div class="col-6">
        .col-6 (wider)
      </div>
      <div class="col">
        .col
      </div>
    </div>

    <div class="row">
      <div class="col">
        .col
      </div>
      <div class="col-5">
        .col-5 (wider)
      </div>
      <div class="col">
        .col
      </div>
    </div>

  </div>
</template>

<style lang="sass" scoped>
.row > div
  padding: 10px 15px
  background: rgba(61,89,124, .15)
  border: 1px solid rgba(126,135,149, .6)
.row + .row
  margin-top: 1rem
</style>
