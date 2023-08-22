// @ts-nocheck
const strip = require("@rollup/plugin-strip");
const typescript = require("@rollup/plugin-typescript");
const path = require("path");
const postcss = require("rollup-plugin-postcss");
const postcssUrl = require("postcss-url");
const pkg = require("./package.json");
// import typescript from "@rollup/plugin-typescript";
// import path from "path";
// import postcss from "rollup-plugin-postcss";
// import postcssUrl from "postcss-url";
// import pkg from "./package.json";

function getOutputConfig({ dir = "lib/index.js", format = "cjs" }) {
	return {
		dir,
		format,
		exports: "named",
		name: pkg.name,
		preserveModules: true,
		preserveModulesRoot: "src",
	};
}


const config =  [{
		input: "./src/index.ts",
		external: ["ms"],
		output: [
			getOutputConfig({
				dir: path.dirname(pkg.module),
				format: "es"
			})
		],
		plugins: [
			typescript({
				outDir: "dist",
				declaration: true,
				declarationDir: "dist",
			}),
			postcss({
				modules: false,
				use: [
					"sass",
					"stylus",
				],
				plugins: [
					postcssUrl({
						url: "inline",
					}),
				],
			}),
			strip(),
		],
}]

module.exports = config
