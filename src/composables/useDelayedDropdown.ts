// composables/useDelayedDropdown.ts
import { ref } from 'vue'

export function useDelayedDropdown<T extends string>() {
  const open = ref<null | T>(null)
  let closeTimer: ReturnType<typeof setTimeout> | null = null
  let suppressHover = false

  function openMenu(menu: T) {
    if (closeTimer) {
      clearTimeout(closeTimer)
      closeTimer = null
    }
    if (!suppressHover) {
      open.value = menu
    }
  }

  function closeMenu(delay = 100) {
    if (closeTimer) clearTimeout(closeTimer)
    closeTimer = setTimeout(() => {
      open.value = null
      closeTimer = null
    }, delay)
  }

  function toggleMenu(menu: T) {
    if (open.value === menu) {
      open.value = null
      // prevent hover-enter from immediately reopening
      suppressHover = true
      setTimeout(() => (suppressHover = false), 100)
    } else {
      open.value = menu
    }
  }

  return {
    open,
    openMenu,
    closeMenu,
    toggleMenu,
  }
}
