<template>
  <q-list dense class="shadow-bottom-small menu-items">
    <template v-for="(navItem, navIndex) in navItems" :key="`navMenu-${navIndex}`">
      <q-separator class="q-mb-sm q-mt-md" v-if="navItem.isSeparator"/>
      <template v-else>
        <q-item
          v-if="!navItem.subMenu"
          clickable v-close-popup
          :to="!navItem.subMenu? `/${navItem.path}`:undefined"
          :href="navItem.href || undefined"
          :target="navItem.href? '_blank':'_self'"
          class="add-shadow-on-hover"
        >
          <q-item-section avatar v-if="navItem.icon">
            <q-icon :name="navItem.icon" color="lp-primary"/>
          </q-item-section>
          <q-item-label v-if="navItem.isHeader" header class="text-lp-accent">{{ navItem.label }}</q-item-label>
          <q-item-section v-else>{{ navItem.label }}</q-item-section>
        </q-item>
        <q-item v-else clickable class="add-shadow-on-hover">
          <q-item-section>{{ navItem.label }}</q-item-section>
          <q-item-section side>
            <q-icon name="keyboard_arrow_right" color="lp-dark"/>
          </q-item-section>

          <q-menu anchor="top end" self="top start" class="shadow-bottom-small">
            <q-list class="menu-items">
              <q-item
                v-for="(subNavItem, subNavIndex) in navItem.subMenu"
                :key="`subNav-${subNavIndex}`"
                :to="!subNavItem.isHeader? `/${subNavItem.path}`:undefined"
                :href="subNavItem.href || undefined"
                :target="subNavItem.href? '_blank':'_self'"
                dense
                clickable
                class="add-shadow-on-hover"
              >
                <q-item-section avatar v-if="subNavItem.icon">
                  <q-icon :name="subNavItem.icon" color="lp-primary"/>
                </q-item-section>
                <q-item-label v-if="subNavItem.isHeader" header class="text-lp-accent">{{ subNavItem.label }}</q-item-label>
                <q-item-section v-else>{{ subNavItem.label }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>
      </template>
    </template>
  </q-list>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'NavDropdownMenu',
  props: {
    navItems: {
      type: Array,
      required: true
    }
  }
})
</script>
<style lang="scss" scoped>
.add-shadow-on-hover:hover {
  background-color: rgba($lp-primary, 0.08);
}
.menu-items {
  font-family: $lp-font-family;
}
</style>
