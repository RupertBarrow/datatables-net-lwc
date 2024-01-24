import fs from "fs-extra"

const ASSETS = {
  "node_modules/@salesforce-ux/design-system/assets/icons/": "slds/icons/",
  "node_modules/@salesforce-ux/design-system/assets/images/": "slds/images/",
  "node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css": "slds/styles/salesforce-lightning-design-system.min.css",

  "src/resources/": "resources/",
  "src/modules/ui/datatablesNet/external/": "external/",
}

// Copy the assets to the dist folder.
export default () => ({
  name: "copy-assets",
  buildStart() {
    for (const src of Object.keys(ASSETS)) {
      this.addWatchFile(src)
    }
  },
  renderStart(options) {
    function copyAssets(config) {
      for (const [src, dest] of Object.entries(config)) {
        fs.copySync(src, `${options.dir}/${dest}`)
      }
    }

    copyAssets(ASSETS)
  },
})
