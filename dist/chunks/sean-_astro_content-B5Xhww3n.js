import { Traverse } from 'neotraverse/modern';
import pLimit from 'p-limit';
import { removeBase, isRemotePath, prependForwardSlash } from '@astrojs/internal-helpers/path';
import { V as VALID_INPUT_FORMATS, A as AstroError, U as UnknownContentCollectionError } from './sean-astro/assets-service-BsQMz-WM.js';
import { c as createComponent, h as renderUniqueStylesheet, i as renderScriptElement, j as createHeadAndContent, r as renderTemplate, a as renderComponent, u as unescapeHTML } from './sean-astro/server-BJyMlwxL.js';
import 'kleur/colors';
import * as devalue from 'devalue';

const site = {
  title: "Suyi的小站",
  // required
  favicon: "/favicon.png",
  // required
  description: "记录自己的成长历程",
  author: "Suyi",
  // required
  avatar: "/avatar.jpg",
  // required
  url: "https://suyi.xyz",
  // required
  motto: "路漫漫其修远兮。",
  recentBlogSize: 5,
  archivePageSize: 25,
  postPageSize: 10,
  feedPageSize: 20,
  beian: ""
};
const config = {
  busuanzi: false,
  lang: "zh-cn",
  // en | zh-cn | cs
  codeFoldingStartLines: 16,
  // Need to re-run the project to take effect
  ga: "UA-98612723-2"
  // If you want to integrate with Google Analytics, just enter your GA-ID here.
};
const categories = [
  {
    name: "Blog",
    iconClass: "ri-draft-line",
    href: "/blog/1"
  },
  {
    name: "Feed",
    iconClass: "ri-lightbulb-flash-line",
    href: "/feed/1"
  },
  {
    name: "Archive",
    iconClass: "ri-archive-line",
    href: "/archive/1"
  },
  // {
  //   name: "Message",
  //   iconClass: "ri-chat-1-line",
  //   href: "/message",
  // },
  {
    name: "Search",
    iconClass: "ri-search-line",
    href: "/search"
  },
  {
    name: "About",
    iconClass: "ri-information-line",
    href: "/about"
  }
  // {
  //   name: "More",
  //   iconClass: "ri-more-fill",
  //   href: "javascript:void(0);",
  //   children: [
  //     {
  //       name: 'About',
  //       iconClass: 'ri-information-line',
  //       href: '/about',
  //     },
  //     {
  //       name: 'Friends',
  //       iconClass: 'ri-user-5-line',
  //       href: '/friends',
  //       target: '_self',
  //     },
  //   ]
  // }
];
const infoLinks = [
  // {
  //   icon: 'ri-telegram-fill',
  //   name: 'telegram',
  //   outlink: 'xxxxxxx',
  // },
  // {
  //   icon: 'ri-twitter-fill',
  //   name: 'twitter',
  //   outlink: 'xxxxxxx',
  // },
  // {
  //   icon: 'ri-instagram-fill',
  //   name: 'instagram',
  //   outlink: 'xxxxxxx',
  // },
  {
    icon: "ri-github-fill",
    name: "github",
    outlink: "https://github.com/suyi91"
  },
  // {
  //   icon: 'ri-rss-fill',
  //   name: 'rss',
  //   outlink: 'xxxxxxx',
  // },
  {
    icon: "ri-mail-line",
    name: "email",
    outlink: "mailto:suyi_2012@outlook.com"
  }
];
const donate = {
  enable: false,
  tip: "Thanks for the coffee !!!☕",
  wechatQRCode: "/WeChatQR.png",
  alipayQRCode: "/AliPayQR.png",
  paypalUrl: "https://paypal.me/xxxxxxxxxx"
};
const friendshipLinks = [
  // {
  //   name: "Cirry's Blog",
  //   url: 'https://cirry.cn',
  //   avatar: "https://cirry.cn/avatar.png",
  //   description: '前端开发的日常'
  // },
];
const comment = {
  enable: false,
  type: "giscus",
  // waline | giscus,
  walineConfig: {
    serverUrl: "",
    lang: "en",
    pageSize: 20,
    wordLimit: "",
    count: 5,
    pageview: true,
    reaction: true,
    requiredMeta: ["nick", "mail"],
    whiteList: ["/message/", "/friends/"]
  },
  // giscus config
  giscusConfig: {
    "data-repo": "",
    "data-repo-id": "",
    "data-category": "",
    "data-category-id": "",
    "data-mapping": "",
    "data-strict": "",
    "data-reactions-enabled": "",
    "data-emit-metadata": "",
    "data-input-position": "",
    "data-theme": "",
    "data-lang": "",
    "crossorigin": ""
  }
};

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1);
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class DataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('./sean-_astro_data-layer-content-BcEe_9wP.js');
      if (data.default instanceof Map) {
        return DataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return DataStore.fromMap(map);
    } catch {
    }
    return new DataStore();
  }
  static async fromMap(data) {
    const store = new DataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = DataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://suyi.xyz", "SSR": true};
function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection
}) {
  return async function getCollection(collection, filter) {
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('./sean-_astro_asset-imports-D9aVaOQr.js');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        const entry = {
          ...rawEntry,
          data,
          collection
        };
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign(__vite_import_meta_env__, { _: process.env._ })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = cacheEntriesByCollection.get(collection);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (hasFilter) {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  };
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new Traverse(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        ctx.update(imported);
      } else {
        ctx.update(src);
      }
    }
  });
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/new-features-test.md": () => import('./sean-new-features-test-XzrjP21P.js'),"/src/content/feed/2024-01-23.md": () => import('./sean-2024-01-23-Bqa9IXkc.js')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"feed":{"type":"content","entries":{"2024-01-23":"/src/content/feed/2024-01-23.md"}},"blog":{"type":"content","entries":{"new-features-test":"/src/content/blog/new-features-test.md"}}};

new Set(Object.keys(lookupMap));

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/new-features-test.md": () => import('./sean-new-features-test-D0lpIgGo.js'),"/src/content/feed/2024-01-23.md": () => import('./sean-2024-01-23-4N_JwagY.js')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
});

export { config as a, categories as b, comment as c, donate as d, friendshipLinks as f, getCollection as g, infoLinks as i, site as s };
