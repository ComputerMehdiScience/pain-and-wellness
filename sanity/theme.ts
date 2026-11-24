import { buildLegacyTheme } from "sanity";

// Kathy's brand teal instead of Sanity's default blue.
export const studioTheme = buildLegacyTheme({
  "--black": "#1a2326",
  "--white": "#ffffff",
  "--gray": "#6b7c80",
  "--gray-base": "#6b7c80",
  "--component-bg": "#ffffff",
  "--component-text-color": "#1a2326",
  "--brand-primary": "#367c83",
  "--default-button-color": "#6b7c80",
  "--default-button-primary-color": "#367c83",
  "--default-button-success-color": "#367c83",
  "--default-button-warning-color": "#c58b2a",
  "--default-button-danger-color": "#b64a3c",
  "--focus-color": "#367c83",
  "--state-info-color": "#367c83",
  "--state-success-color": "#367c83",
  "--main-navigation-color": "#1f4f55",
  "--main-navigation-color--inverted": "#ffffff",
});
