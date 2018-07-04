<template>
  <div class="el-autocomplete">
  </div>
</template>
<script>

  export default {
    name: 'countDown',
    props: {
      beginTime: Number,
      endTime: Number
    },
    data() {
      return {
        activated: false,
        isOnComposition: false,
        suggestions: [],
        loading: false,
        highlightedIndex: -1
      };
    },
    computed: {
      suggestionVisible() {
        const suggestions = this.suggestions;
        let isValidData = Array.isArray(suggestions) && suggestions.length > 0;
        return (isValidData || this.loading) && this.activated;
      },
      id() {
        return `el-autocomplete-${generateId()}`;
      }
    },
    watch: {
      suggestionVisible(val) {
        this.broadcast('ElAutocompleteSuggestions', 'visible', [val, this.$refs.input.$refs.input.offsetWidth]);
      }
    },
    methods: {
      getMigratingConfig() {
        return {
          props: {
            'custom-item': 'custom-item is removed, use scoped slot instead.',
            'props': 'props is removed, use value-key instead.'
          }
        };
      },
      formatDate(date, fmt) {
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        const o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds()
        }
        for (const k in o) {
          if (new RegExp(`(${k})`).test(fmt)) {
            const str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
          }
        }
        return fmt
      }
    },
    mounted() {
      this.debouncedGetData = debounce(this.debounce, (val) => {
        this.getData(val);
      });
      this.$on('item-click', item => {
        this.select(item);
      });
      let $input = this.$el.querySelector('.el-input__inner');
      $input.setAttribute('role', 'textbox');
      $input.setAttribute('aria-autocomplete', 'list');
      $input.setAttribute('aria-controls', 'id');
      $input.setAttribute('aria-activedescendant', `${this.id}-item-${this.highlightedIndex}`);
    },
    beforeDestroy() {
      this.$refs.suggestions.$destroy();
    }
  };
</script>
