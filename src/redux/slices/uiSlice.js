import { createSlice } from "@reduxjs/toolkit";

/**
 * UI slice — global interface state that doesn't belong to any
 * single feature: nav appearance, mobile drawer, active section
 * for scroll-spy highlighting, and the hero assembly progress.
 */
const initialState = {
  isMobileNavOpen: false,
  isNavScrolled: false,
  activeSection: "home",
  heroAssembled: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileNav(state) {
      state.isMobileNavOpen = !state.isMobileNavOpen;
    },
    closeMobileNav(state) {
      state.isMobileNavOpen = false;
    },
    setNavScrolled(state, action) {
      state.isNavScrolled = action.payload;
    },
    setActiveSection(state, action) {
      state.activeSection = action.payload;
    },
    setHeroAssembled(state, action) {
      state.heroAssembled = action.payload;
    },
  },
});

export const {
  toggleMobileNav,
  closeMobileNav,
  setNavScrolled,
  setActiveSection,
  setHeroAssembled,
} = uiSlice.actions;
export default uiSlice.reducer;
