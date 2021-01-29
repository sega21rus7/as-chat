module.exports = {
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          modules: "./modules",
          tools: "./tools",
        },
      },
    ],
  ],
};
