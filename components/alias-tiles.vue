<template>
  <div class="tiles">
    <div
      v-for="alias in aliases"
      :key="alias"
      @click.stop="$emit('tile-click', alias)"
      class="tile"
    >{{alias}}</div>
  </div>
</template>

<script>
  module.exports = {
    name: 'aliasTiles',
    props: {
      aliases: Array
    }
  }
</script>

<style scoped>
.tiles {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 5px;
  padding-right: 0px;
}

.tile {
  display: inline-block;
  margin: 0 2px;
  padding: 2px 4px;
  font-size: 16px;
  font-weight: bold;
  background: #32386f;
  border-radius: 3px;
  color: white;
  cursor: pointer;
}
</style>