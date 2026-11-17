Prism.languages.kusto = {
	'comment': {
		pattern: /\/\/.*/,
		greedy: true
	},
	'string': {
		pattern: /```[\s\S]*?```|[hH]?(?:"(?:[^\r\n\\"]|\\.)*"|'(?:[^\r\n\\']|\\.)*'|@(?:"(?:[^\r\n"]|"")*"|'(?:[^\r\n']|'')*'))/,
		greedy: true
	},

	'command': {
		pattern: /(^[ \t]*)\.[a-z][a-z\d-]*\b/m,
		lookbehind: true,
		greedy: true,
		alias: 'keyword'
	},

	'verb': {
		pattern: /(\|\s*)[a-z][\w-]*/i,
		lookbehind: true,
		alias: 'keyword'
	},

	'class-name': /\b(?:bool|date|datetime|decimal|double|dynamic|guid|int|int32|int64|long|real|string|time|timespan)\b/,
	'keyword': /\b(?:access|alias|and|anti|as|asc|auto|between|by|(?:contains|(?:ends|starts)with|has(?:prefix|suffix)?)(?:_cs)?|count|database|datatable|declare|desc|distinct|evaluate|extend|external|external_data|externaldata|facet|find|fork|from|fullouter|getschema|graph-match|graph-shortest-paths|graph-to-table|has_all|has_any|in~?|ingestion|inline|inner|innerunique|into|invoke|join|kind|(?:left|right)(?:anti(?:semi)?|inner|outer|semi)?|let|like|limit|local|lookup|macro-expand|make-graph|make-series|materialize|mv-apply|mv-expand|not|of|on|or|order|parse|parse-kv|parse-where|partition|pattern|print|project|project-away|project-keep|project-rename|project-reorder|query_parameters|range|reduce|render|restrict|sample|sample-distinct|scan|schema|search|serialize|set|sort|step|summarize|table|tables|take|to|top|top-hitters|top-nested|union|view|where|with|with_itemindex|withsource|matches\s+regex|nulls\s+(?:first|last))(?![\w-])/,
	'boolean': /\b(?:FALSE|False|TRUE|True|false|null|true)\b/,

	'function': /\b[a-z_]\w*(?=\s*\()/i,

	'datetime': [
		{
			// RFC 822 + RFC 850
			pattern: /\b(?:(?:Fri|Friday|Mon|Monday|Sat|Saturday|Sun|Sunday|Thu|Thursday|Tue|Tuesday|Wed|Wednesday)\s*,\s*)?\d{1,2}(?:\s+|-)(?:Apr|Aug|Dec|Feb|Jan|Jul|Jun|Mar|May|Nov|Oct|Sep)(?:\s+|-)\d{2}\s+\d{2}:\d{2}(?::\d{2})?(?:\s*(?:\b(?:[A-Z]|(?:[ECMT][DS]|GM|U)T)|[+-]\d{4}))?\b/,
			alias: 'number'
		},
		{
			// ISO 8601
			pattern: /[+-]?\b(?:\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)?|\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)Z?/,
			alias: 'number'
		}
	],
	'number': /\b(?:0x[0-9A-Fa-f]+|\d+(?:\.\d+)?(?:[Ee][+-]?\d+)?)(?:(?:min|sec|[mnµ]s|[dhms]|microsecond|tick)\b)?|[+-]?\binf\b/,

	'operator': /=>|<\||<>|[!=]~|[!=<>]=?|[-+*/%|]|\.\./,
	'punctuation': /[()\[\]{},;.:]/
};
