# Multiplicity - RSS Aggregator Starter Based On Eleventy

**Multiplicity** (abbreviated as 'm10y') is a simple starter pack based on [Eleventy static site generator](https://11ty.dev) that allows you to create RSS aggregator site.

Alongside the template code, it also contains a GitHub action required to keep the site up to date.

**[View demo](https://eleventy-m10y.lkmt.us/)**

**Project development is primarily done on [GitHub](https://github.com/lwojcik/eleventy-template-multiplicity).** Mirrors of the main branch are also available on [Codeberg](https://codeberg.org/lukem/eleventy-template-multiplicity) and [GitLab](https://gitlab.com/lukaszwojcik/eleventy-template-multiplicity).

## Instant deploy

Netlify:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/lwojcik/eleventy-template-multiplicity)

Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lwojcik/eleventy-template-multiplicity)

Render:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/lwojcik/eleventy-template-multiplicity)

## Setup and personalization

1. Fork the repository.
2. Configure the site according to your preferences - see [`siteConfig.js`](./content/_data/siteConfig.js) and template files.
3. Modify the list of feeds you want to aggregate - they are located in [`content/sites`](./content/sites/).
   1. Each site has the following properties:
      - `name` - name of the site
      - `url` - URL of the site
      - `avatar` - image to display alongside the site name (e.g. favicon). During the build process the image will be downloaded, resized and served locally
      - `feed` - URL of the RSS or JSON feed to fetch articles from
      - `hideFromSiteList` - set it to `true` if you want to hide this site from the list of sites on the Sites page. It is useful if you want to add two sites with different RSS feeds under the same name and avoid seeing duplicates on the list
4. Deploy the site to Netlify or Vercel
5. Set up the GitHub action in [`.github/workflows/scheduled_build.yml`](./.github/workflows/scheduled_build.yml):
   1. Create a build hook URL and save it as a GitHub secret in your repository - e.g. `NETLIFY_BUILD_HOOK_URL` or `VERCEL_BUILD_HOOK_URL`
6. Done! Your aggregator is up and running.

## Translation file

See [`phrases.js`](./content/_data/phrases.js) for the list of translatable static phrases.

## Note on persisting feed cache

The aggregator uses [@11ty/eleventy-fetch](https://www.11ty.dev/docs/plugins/fetch/) plugin for fetching and caching network requests. If you use a hosting provider that supports persisting cache (e.g. Netlify or Vercel), you can limit number of network requests by making your `.cache` folder persistent between builds. See [Eleventy docs on how to set it up](https://www.11ty.dev/docs/deployment/#persisting-cache).

## Contributions

Contributions of the following kind are welcome:

- bug reports / fixes
- feature suggestions / improvements of existing features

Before contributing be sure to read [Code of Conduct](./CODE_OF_CONDUCT.md).

## Sponsors

Huge thanks to generous sponsors of this project!

- [Adam DJ Brett](https://github.com/adamdjbrett)

## Licence

No license. [Public domain, no strings attached.](https://raw.githubusercontent.com/lwojcik/eleventy-template-multiplicity/main/LICENSE) Yes, I'm being serious.
