import { prebuildMdx } from './mdx.mjs'
import { prebuildStrapi } from './strapi.mjs'
import { prebuildNavigation } from './navigation.mjs'
import { prebuildContributors } from './contributors.mjs'
import { prebuildPatrons } from './patrons.mjs'
import { prebuildI18n } from './i18n.mjs'
import { prebuildLab } from './lab.mjs'
import { generateOgImage } from './og/index.mjs'

const run = async () => {
  console.log('in run')
  const SITE = process.env.SITE || 'lab'
  if (SITE === 'org') {
    const mdxPages = await prebuildMdx(SITE)
    const [posts] = await prebuildStrapi(SITE)
    prebuildNavigation(mdxPages, posts, SITE)
  } else if (SITE === 'dev') {
    const mdxPages = await prebuildMdx(SITE)
    if (process.env.GENERATE_OG_IMAGES) {
      // Create og image for the home page
      await generateOgImage({
        lang: 'en',
        site: SITE,
        slug: '',
        title: 'FreeSewing.dev',
      })
      // Create og image for the 404 page
      await generateOgImage({
        lang: 'en',
        site: SITE,
        slug: '/404',
        intro: "There's nothing here. Only this message to say there's nothing here.",
        title: 'Page not found',
        lead: '404',
      })
    }
    prebuildNavigation(mdxPages, false, SITE)
  } else await prebuildLab()

  await prebuildI18n(SITE)
  await prebuildContributors(SITE)
  await prebuildPatrons(SITE)
  console.log()
}

run()
