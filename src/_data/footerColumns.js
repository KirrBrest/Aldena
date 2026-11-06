import { readFileSync } from 'node:fs';

// порядок и состав колонок задаёт footerLayout.json.
const readJson = (name) => JSON.parse(readFileSync(new URL(`./${name}.json`, import.meta.url), 'utf8'));

export default function () {
	const navigation = readJson('navigation');
	const layout = readJson('footerLayout');

	const pages = new Map();
	const add = (page) => {
		if (pages.has(page.title)) {
			throw new Error(`navigation.json: название «${page.title}» встречается дважды`);
		}
		pages.set(page.title, page);
	};
	for (const item of navigation) {
		add(item);
		for (const child of item.children ?? []) add(child);
	}

	return layout.columns.map((column) => ({
		title: column.title,
		links: column.links.map((link) => {
			const key = typeof link === 'string' ? link : link.page;
			const page = pages.get(key);
			if (!page) {
				throw new Error(`footerLayout.json: страница «${key}» не найдена в navigation.json`);
			}
			return { title: typeof link === 'string' ? page.title : link.title, url: page.url };
		}),
	}));
}
