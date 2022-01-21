const presets = ['module:metro-react-native-babel-preset'];
const plugins = [];

if (process.env["ENV"] === "prod" || process.env["ENV"] === "production") {
    plugins.push("transform-remove-console");
}
module.exports = {
    plugins,
    presets,
};
