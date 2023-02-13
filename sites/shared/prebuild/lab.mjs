import fs_ from 'fs'
import path from 'path'
import { capitalize } from '../utils.mjs'
import { designsByType, plugins, designs } from '../../../config/software/index.mjs'

const fs = fs_.promises

const header = `/*
 *
 * This page was auto-generated by the prebuild script
 * Any changes you make to it will be lost on the next (pre)build.
 *
 * If you want to make changes, update the pageTemplate in:
 *
 *   sites/shared/prebuild/lab.mjs
 *
 */`

const pageTemplate = (design) => `${header}
import { ${capitalize(design)} } from 'designs/${design}/src/index.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { WorkbenchPage } from 'site/page-templates/workbench.mjs'

const Page = (props) => <WorkbenchPage {...props} design={${capitalize(design)}} version="next"/>
export default Page

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    }
  }
}
`

/*
 * Main method that does what needs doing
 */

export const prebuildLab = async () => {
  const promises = []
  for (const section in designsByType) {
    // Iterate over sections
    console.log(`Generating pages for ${section} designs`)
    for (const design in designsByType[section]) {
      // Generate pattern pages for next
      console.log(`  - ${design}`)
      const page = pageTemplate(design)
      const pages = ['..', 'lab', 'pages']
      await fs.mkdir(path.resolve(...pages, 'v', 'next'), { recursive: true })
      promises.push(
        fs.writeFile(path.resolve(...pages, `${design}.mjs`), page),
        fs.writeFile(path.resolve(...pages, section, `${design}.mjs`), page)
      )
    }
  }

  // Write designs file
  const header =
    '// This file is auto-generated by the prebuild script | Any changes will be overwritten\n'
  const nl = '\n'
  promises.push(
    fs.writeFile(
      path.resolve('..', 'lab', 'prebuild', 'designs.mjs'),
      `${header}export const designs = ${JSON.stringify(Object.keys(designs))}${nl}`
    ),
    fs.writeFile(
      path.resolve('..', 'lab', 'prebuild', 'plugins.mjs'),
      `${header}export const plugins = ${JSON.stringify(Object.keys(plugins))}${nl}`
    ),
    fs.writeFile(
      path.resolve('..', 'lab', 'prebuild', 'designs-by-type.mjs'),
      `${header}export const designsByType = ${JSON.stringify(designsByType)}${nl}`
    )
  )

  await Promise.all(promises)
}
