<template>
  <div class="main">
    <div
      v-if="false"
      class="tiles"
    >
      <div class="tile">3345345235423542345</div>
      <div class="tile">44</div>
      <div class="tile">555</div>
    </div>
    <input
      ref="input"
      placeholder="type some text..."
      v-model="text"
    />
  </div>
</template>

<script>

  const getDataForText = (() => {
    const getOneItem = (_val) => {
      return {
        img: './img/pic.png',
        alias: '@',
        name: _val,
        isSelected: false
      }
    }
    return (_value = '') => {
      const items = []
      for (let i = 0; i < _value.length; i++) {
        items.push(getOneItem(_value))
      }
      return items
    }
  })()

  module.exports = {
    name: 'specialSelect',
    data () {
      return {
        textValue: ''
      }
    },
    mounted () {
      const input = this.$refs.input
      if (input) {
        this.$emit('create-input', input)
      }
    },
    computed: {
      text: {
        set (_value) {
          this.textValue = _value
          this.$emit('update-companies', getDataForText(_value))
        },
        get () {
          return this.textValue
        }
      }
    }
  }
</script>

<style scoped>
.main {
  background: white;
  border: 1px solid gray;
  display: flex;
}

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
}

input {
  border: 0px;
  border: 0px;
  display: flex;
  flex-grow: 1;
  font-size: 20px;
  padding: 7px;
  margin: 0px;
}

input:focus{
  outline: none;
}
</style>