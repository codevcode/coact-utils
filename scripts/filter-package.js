const { stdin } = process

let data = ''
stdin
  .setEncoding('utf8')
  .on('readable', () => {
    const chunk = stdin.read()
    if (chunk) data += chunk
  })
  .on('end', () => {
    const json = JSON.parse(data)
    delete json.scripts.preinstall
    delete json.scripts.postinstall
    delete json.devDependencies.codev
    delete json.dependencies.codev
    console.log(JSON.stringify(json, null, 2))
  })
