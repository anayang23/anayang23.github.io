const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "dist");

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

const siteFiles = fs.readdirSync(root).filter((file) => /\.(html|css|js)$/i.test(file));
for (const file of siteFiles) {
    fs.copyFileSync(path.join(root, file), path.join(output, file));
}

const dependencies = [
    "bootstrap/dist/css/bootstrap.min.css",
    "bootstrap/dist/js/bootstrap.bundle.min.js",
    "bootswatch/dist/minty/bootstrap.min.css",
    "bootstrap-icons/font/bootstrap-icons.min.css",
    "bootstrap-icons/font/fonts",
];

for (const dependency of dependencies) {
    const source = path.join(root, "node_modules", dependency);
    const destination = path.join(output, "node_modules", dependency);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.cpSync(source, destination, { recursive: true });
}
