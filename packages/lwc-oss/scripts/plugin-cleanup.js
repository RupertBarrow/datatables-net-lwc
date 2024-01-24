import fs from "fs-extra"

// Clean up the dist folder between each build.
export default () => ({
  name: "cleanup",
  renderStart(options) {
    if (process.env.NODE_ENV === "production") {
      fs.rmdirSync(options.dir, {
        recursive: true,
      })
    }
  },
})
