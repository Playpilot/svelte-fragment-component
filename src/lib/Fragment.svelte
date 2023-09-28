<script>
  import {
    setContext,
    onMount as _onMount,
    beforeUpdate as _beforeUpdate,
    afterUpdate as _afterUpdate,
    onDestroy as _onDestroy
  } from 'svelte'

  export let context = null
  export let onMount = null
  export let beforeUpdate = null
  export let afterUpdate = null
  export let onDestroy = null

  if (context) {
    Object.keys(context).forEach((key) => {
      setContext(key, context[key])
    })
  }

  if (onMount) _onMount(bind(onMount))
  if (beforeUpdate) _beforeUpdate(bind(beforeUpdate))
  if (afterUpdate) _afterUpdate(bind(afterUpdate))
  if (onDestroy) _onDestroy(bind(onDestroy))

  function bind(callback) {
    return () => callback({ props: $$restProps })
  }
</script>

<slot />
