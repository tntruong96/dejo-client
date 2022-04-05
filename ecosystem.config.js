module.exports = {
  apps : [{
    name   : "dejo-client",
    cwd: '.',
    script : "yarn",
    args: "start",
    exec_mode: "cluster",
    autorestart: false,
    env: {
      "NOODE_ENV":"production"
    }
  }]
}
