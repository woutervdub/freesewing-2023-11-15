import yaml from 'js-yaml'
import path from 'path'
import rdir from 'recursive-readdir'
import { readFile, writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// No __dirname in Node 14
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/*
 * Helper method to get a list of yaml/yml files.
 * Will traverse recursively to get all files from the current folder
 */
const getTranslationFileList = async () => {
  let allFiles
  try {
    allFiles = await rdir(path.resolve(__dirname, 'locales'))
  }
  catch (err) {
    console.log(err)
    return false
  }

  // Filter out all that's a .yaml or .yml file
  const files = []
  for (const file of allFiles) {
    if (file.slice(-5) === `.yaml` || file.slice(-4) === `.yml`) {
      files.push(file)
    }
  }

  return files.sort()
}

/*
 * Figures out the list of locales from the list of files
 * (by checking how many version of aaron.yaml exist)
 */
const getLocalesFromFileList = files => files
  .filter(file => (file.slice(-10) === 'aaron.yaml'))
  .map(file => file.split(`${path.sep}locales${path.sep}`).pop())
  .map(file => file.split(`${path.sep}plugin${path.sep}`).shift())

// Helper method to see if a dir occurs in a full path
const pathContains = (fullPath, dir) => fullPath
  .indexOf(`${path.sep}${dir}${path.sep}`) !== -1

/*
 * Determines the namespace name based on the file path
 */
const namespaceFromFile = file => {
  const ext = path.extname(file)
  const name = path.basename(file, ext)

  //if (pathContains(file, 'components')) return 'c_' + name
  if (pathContains(file, 'options')) return 'o_' + name
  if (pathContains(file, 'plugin')) return 'plugin'

  return name
}

/*
 * This method flattens a .yml files with a structure like:
 * key:
 *   title:
 *   description:
 *   options; (this one is not always present)
 */
const flattenYml = content => {
  const flat = {}
  for (const l1 in content) {
    flat[`${l1}.t`] = content[l1].title
    flat[`${l1}.d`] = content[l1].description
  }

  return flat
}

/*
 * Loads and parses a translation file, making sure to
 * handle nested keys in .yml files
 */
const loadTranslationFile = async (file) => {
  const data = yaml.load(
    (await readFile(file, { encoding: 'utf-8'}))
  )

  return (path.extname(file) === '.yml')
    ? flattenYml(data)
    : data
}


/*
 * Creates an object with namespaces and the YAML/YML files
 * that go with them
 */
const getNamespacesFromFileList = async (files, locales) => {
  const namespaces = {}
  for (const locale of locales) {
    namespaces[locale] = {}
    const locFiles = files.filter(file => (
      file.split(`${path.sep}locales${path.sep}${locale}${path.sep}`).length > 1)
    )
    for (const file of locFiles) {
      const namespace = namespaceFromFile(file)
      if (typeof namespaces[locale][namespace] === 'undefined') {
        namespaces[locale][namespace] = {}
      }
      // Spread in the result of yaml.load since
      //console.log((await loadTranslationFile(file)))
      // some namespaces are made up of multiple files
      namespaces[locale][namespace] = {
        ...namespaces[locale][namespace],
        ...(await loadTranslationFile(file))
      }
    }
  }

  return namespaces
}

const header = `/*
 * This file is auto-generated by the prebuild script
 * All edits will be overwritten on the next (pre)build
 */`
const namespaceFile = (name, data) => `${header}
const ${name} = ${JSON.stringify(data, null ,2)}

export default ${name}
`
const localeFile = (namespaces) => `${header}
${namespaces
  .map(ns => 'import '+ns+' from "./'+ns+'.mjs"')
  .join("\n")
}

const allNamespaces = {
  ${namespaces.join(",\n  ")}
}

export default allNamespaces
`
const indexFile = (locales, data) => `${header}
${locales
  .map(l => 'import '+l+'Namespaces from "./next/'+l+'/index.mjs"')
  .join("\n")
}

${locales
  .map(l => 'export const '+l+' = '+l+'Namespaces')
  .join("\n")
}

export const languages = {
${locales
  .map(l => '  '+l+': "'+ data[l].i18n[l]+'"')
  .join(",\n")
}
}
`

/*
 * Writes out files
 */
const writeFiles = async allNamespaces => {
  const promises = []
  for (const [locale, namespaces] of Object.entries(allNamespaces)) {
    for (const [namespace, data] of Object.entries(namespaces)) {
      promises.push(
        writeFile(
          path.resolve(__dirname, 'next', locale, namespace+'.mjs', ),
          namespaceFile(namespace, data)
        )
      )
    }
    // Locale index files
    promises.push(
      writeFile(
        path.resolve(__dirname, 'next', locale, 'index.mjs', ),
        localeFile(Object.keys(namespaces))
      )
    )
  }
  // Locale index files
  promises.push(
    writeFile(
      path.resolve(__dirname, 'next.mjs', ),
      indexFile(Object.keys(allNamespaces), allNamespaces)
    )
  )
  await Promise.all(promises)

  return
}

/*
 * Turns YAML translation files into JS
 */
const build = async () => {
  const files = await getTranslationFileList()
  const locales = getLocalesFromFileList(files)
  const namespaces = await getNamespacesFromFileList(files, locales)
  await writeFiles(namespaces)
}

build()







//export default strings