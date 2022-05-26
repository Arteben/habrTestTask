<template>
  <div class="main">
    <alias-tiles
      :aliases="tileList"
      @tile-click="(_alias) => { $emit('tile-click', _alias) }"
    ></alias-tiles>
    <input
      ref="input"
      placeholder="type some text..."
      v-model="text"
    />
  </div>
</template>

<script>
  const aliasTiles = httpVueLoader('./alias-tiles.vue')

  const getOneItem = (_img, _alias, _name) => {
    const img = _img != null && _img || './img/pic.png'
    return {
      img,
      alias: '@' + _alias,
      name: _name,
    }
  }

  const getObjForResult = () => {
    return {
      items: [],
      error: false,
      internetError: false,
      littleSymbols: false,
    }
  }

  const parseItems = (_items) => {
    const res = getObjForResult()
    let parseItems
    try {
      parseItems = JSON.parse(_items).data
    } catch(_er) {
      res.error = true
    }

    if (res.error) {
      return res
    }

    const getDataForSomeType = (i) => {
      const name = i.name || i.alias
      switch (i.type) {
        case 'user':
           return getOneItem(i.avatar, name, i.alias)
          break
        case 'company':
        default:
           return getOneItem(i.avatar, name, 'company')
      }
    }

    for (const item of parseItems) {
      res.items.push(getDataForSomeType(item))
    }

    return res
  }

  const sendQuery = (_val) => {
    const result = getObjForResult()

    const url = new URL('https://habr.com/kek/v2/publication/suggest-mention')
    url.searchParams.set('q', _val)
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.send()

    return new Promise((_resolve) => {
      xhr.onload = () => {
        if (xhr.status == 200) {
          const parseResult = parseItems(xhr.response)
          result.error = parseResult.error
          result.items = parseResult.items
        } else {
          result.error = true
        }
        _resolve(result)
      }
      xhr.error = () => {
        result.internetError = true
        _resolve(result)
      }
    })
  }

  let sendQueryTimeout = null

  const setSetTimeout = function (_func) {
    if (sendQueryTimeout) {
      sendQueryTimeout = null
    }
    sendQueryTimeout = window.setTimeout(() => {
      sendQueryTimeout = null
      _func()
    }, 1000)
  }

  module.exports = {
    name: 'specialSelect',
    props: {
      tileList: Array,
    },
    data () {
      return {
        textValue: ''
      }
    },
    components: {
      aliasTiles
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
          if (_value != this.textValue) {
            if (_value.length > 3 && _value.length < 20) {
              setSetTimeout(() => {
                sendQuery(_value).then((_result) => {
                  this.$emit('update-companies', _result)
                })
              })
            } else {
              sendQueryTimeout = null
              const res = getObjForResult()
              res.littleSymbols = true
              this.$emit('update-companies', res)
            }
            this.textValue = _value
          }
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