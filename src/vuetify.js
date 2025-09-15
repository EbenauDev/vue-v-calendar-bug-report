// Styles
import "@fortawesome/fontawesome-free/css/all.css";
import "@mdi/font/css/materialdesignicons.css";
import { pt } from "vuetify/locale";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { fa } from "vuetify/iconsets/fa";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { VCalendar } from "vuetify/labs/VCalendar";
import {
  VStepperVertical,
  VStepperVerticalItem,
} from "vuetify/labs/VStepperVertical";

// Vuetify
import { createVuetify } from "vuetify";

export const vuetify = createVuetify({
  locale: {
    locale: "pt",
    fallback: "pt",
    messages: {
      pt,
    },
  },
  components: {
    ...components,
    VCalendar,
    VStepperVertical,
    VStepperVerticalItem,
  },
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      fa,
      mdi,
    },
  },
  theme: {
    themes: {
      light: {
        colors: {},
      },
    },
    options: {
      customProperties: true,
    },
  },
  defaults: {
    VSelect: { variant: "underlined", color: "primary" },
    VAutocomplete: { variant: "underlined", color: "primary" },
    VCombobox: { variant: "underlined", color: "primary" },
    VTextField: { variant: "underlined", color: "primary" },
    VTab: {
      baseColor: "#00000096",
    },
    VTable: {
      VBtn: { density: "comfortable", variant: "text" },
    },
  },
});
