<template>
  <div class="root">
    <h3> test task </h3>
      <div class="headerContainer">
        <div class="header">
          <span class >*</span>
          <h4>Пользователь или компания</h4>
        </div>
        <special-select
          @update-companies="onUpdateList"
        />
      </div>
    <scrolled-popup>
      <template
        v-if="dataList && dataList.length"
      >
        <company-tile
          :company-data="dataList[0]"
          :selected="true"
        >
      </template>
    </scrolled-popup>
  </div>
</template>

<script>

  const specialSelect = httpVueLoader('./special-select.vue')
  const scrolledPopup = httpVueLoader('./scrolled-popup.vue')
  const companyTile = httpVueLoader('./company-tile.vue')

  module.exports = {
    name: 'root',
    components: {
      specialSelect,
      scrolledPopup,
      companyTile,
    },
    data () {
      return {
        dataList: null
      }
    },
    methods: {
      onUpdateList (_list) {
        console.log('update list', _list)
        this.dataList = _list
      }
    },
  }
</script>

<style scoped>
.root {
  background: whitesmoke;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  border: 1px solid gray;
}
h3 {
  text-align: end;
  color: gray;
}

.headerContainer {
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  padding: 10px;
}

.header {
  display: flex;
  align-items: center;
  margin: 5px;
}

.header span {
  color: red;
  margin: 0;
  margin-right: 3px;
}

.header h4 {
  margin: 0;
}
</style>