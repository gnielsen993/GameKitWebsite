// Site-wide configuration. Single source of truth.
// Edit here; pages read these values at runtime.

window.SITE_CONFIG = Object.freeze({
  appName: "GameDrawer",
  displayName: "GameDrawer",
  appVersion: "1.1",
  appStoreUrl: "#",
  supportEmail: "support@lauterstar.com",
  copyrightHolder: "Lauterstar",
  copyrightYear: 2026,
  bundleId: "com.lauterstar.gamekit",
  ecosystem: ["DesignKit", "HabitTracker", "Stack", "PantryPlanner", "GameDrawer"]
});

document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.SITE_CONFIG;
  document.querySelectorAll("[data-cfg]").forEach((el) => {
    const key = el.getAttribute("data-cfg");
    const val = cfg[key];
    if (val == null) return;
    if (el.tagName === "A" && (key.endsWith("Url") || key === "supportEmail")) {
      el.href = key === "supportEmail" ? `mailto:${val}` : val;
      if (!el.textContent.trim()) el.textContent = val;
    } else {
      el.textContent = val;
    }
  });
});
