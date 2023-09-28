import { render, act } from '@testing-library/svelte'
import { vi, it, expect, describe } from 'vitest'

import Fragment from '../lib/Fragment.svelte'
import Children from './Children.svelte'

describe('Fragment.svelte', () => {
  it('Should render all childs', () => {
    const { container } = render(Children)

    expect(container.innerHTML).toMatch('<div>A<span>B</span>C</div>')
  })

  it('Should call onMount', async () => {
    const onMount = vi.fn()

    render(Fragment, { onMount, a: 1 })
    expect(onMount).toHaveBeenCalledWith({ props: { a: 1 } })
  })

  it('Should call beforeUpdate', async () => {
    const beforeUpdate = vi.fn()
    const { component } = render(Fragment, { props: { beforeUpdate, a: 1 } })

    expect(beforeUpdate).toHaveBeenCalledWith({ props: { a: 1 } })
    await act(() => component.$set({ b: 2 }))
    expect(beforeUpdate).toHaveBeenCalledWith({ props: { a: 1, b: 2 } })
  })

  it('Should call afterUpdate', async () => {
    const afterUpdate = vi.fn()
    const { component } = render(Fragment, { props: { afterUpdate, a: 1 } })

    expect(afterUpdate).toHaveBeenCalledWith({ props: { a: 1 } })
    await act(() => component.$set({ b: 2 }))
    expect(afterUpdate).toHaveBeenCalledWith({ props: { a: 1, b: 2 } })
  })

  it('Should call onDestroy', async () => {
    const onDestroy = vi.fn()
    const { component } = render(Fragment, { onDestroy, a: 1 })

    await act(() => component.$destroy())
    expect(onDestroy).toHaveBeenCalledWith({ props: { a: 1 } })
  })
})
