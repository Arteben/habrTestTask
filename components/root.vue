<template>
  <div class="root">
    <h3> test task </h3>
      <div class="headerContainer">
        <div class="header">
          <span class >*</span>
          <h4>Пользователь или компания</h4>
        </div>
        <special-select/>
      </div>
    <scrolled-popup>
      content for scroll popup
    </scrolled-popup>
  </div>
</template>

<script>

  const specialSelect = httpVueLoader('./special-select.vue')
  const scrolledPopup = httpVueLoader('./scrolled-popup.vue')

  module.exports = {
    name: 'root',
    components: {
      specialSelect,
      scrolledPopup
    }
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