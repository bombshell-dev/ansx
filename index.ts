import { styleText } from 'node:util';
import { DOCUMENT_NODE, ELEMENT_NODE, Fragment, type Node, TEXT_NODE, type Transformer, attrs, parse } from 'ultrahtml'
import inline from 'ultrahtml/transformers/inline'

const transformers: Transformer[] = [
	inline({ useObjectSyntax: true })
];
export function ansx(template: TemplateStringsArray, ...substitutions: unknown[]) {
	const markup = String.raw(template, ...substitutions);
	const doc = parse(markup);
	let newDoc = doc;
	for (const t of transformers) {
		newDoc = t(newDoc);
	}
	return renderSync(newDoc);
}

function renderElementSync(node: Node): string {
	const { name, attributes = {} } = node;
	const children = node.children
		.map((child: Node) => renderSync(child))
		.join('');
	if (name === Fragment) return children;
	const renderers: ((str: string) => string)[] = [];
	if (attributes.style) {
		// TODO:
		// parse complex style values (React Native style)
		// normalize capitalization
		// add proper layout algorithm
		const { background, color, "padding-inline": paddingInline, "margin-left": marginLeft } = attributes.style;
		if (paddingInline) {
			const space = ' '.repeat(Number.parseInt(paddingInline, 10));
			renderers.push(t => `${space}${t}${space}`)
		}
		if (marginLeft) {
			const space = ' '.repeat(Number.parseInt(marginLeft, 10));
			renderers.push(t => `${space}${t}`)
		}
		if (color) {
			renderers.push(styleText.bind(styleText, color))
		}
		if (background) {
			renderers.push(styleText.bind(styleText, `bg${background[0].toUpperCase() + background.slice(1)}`));
		}
	}
	let output = children;
	for (const r of renderers) {
		output = r(output);
	}
	return output;
}

function renderSync(node: Node): string {
	switch (node.type) {
		case DOCUMENT_NODE:
			return node.children.map((child: Node) => renderSync(child)).join('').trim();
		case ELEMENT_NODE:
			return renderElementSync(node);
		case TEXT_NODE: {
			if (node.value.trim().length === 0) {
				return '\n'.repeat(node.value.split('\n').length - 1);
			}
			return `${node.value}`;
		}
		default:
			return '';
	}
}

