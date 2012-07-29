$$('[data-src]').forEach(function(element) {
	var src = element.getAttribute('data-src'),
	    html = element.getAttribute('data-type') === 'text/html',
	    contentProperty = html? 'innerHTML' : 'textContent';
	
	$u.xhr({
		url: src,
		callback: function(xhr) {
			element[contentProperty] = xhr.responseText;
			
			$u.event.fire(element, 'contentreceived', {
				src: src
			});
		}
	});
});

document.body.addEventListener('contentreceived', function(evt) {
	var pre = evt.target;
	
	if(!/pre/i.test(pre.nodeName)) {
		return;
	}

	var language = {
		'js': 'javascript',
		'css': 'css',
		'html': 'markup',
		'svg': 'markup'
	}[(evt.src.match(/\.(\w+)$/) || [,''])[1]];
	
	var code = document.createElement('code');
	
	code.className = 'lang-' + language;
	
	code.textContent = pre.textContent;
	pre.textContent = '';
	
	pre.appendChild(code);
	
	Prism.highlightElement(code);
});

/**
 * Table of contents
 */
(function(){
var toc = document.createElement('ol');

$$('body > section > h1').forEach(function(h1) {
	var section = h1.parentNode,
	    text = h1.textContent,
	    id = h1.id || section.id;
	
	// Assign id if one does not exist
	if (!id) {
		id = text.toLowerCase();
		
		// Replace spaces with hyphens, only keep first 10 words
		id = id.split(/\s+/g, 10).join('-');
		
		// Remove non-word characters
		id = id.replace(/[^\w-]/g, '');
		
		section.id = id;
	}
	
	// Linkify heading text
	if (h1.children.length === 0) {
		h1.innerHTML = '';
		
		$u.element.create('a', {
			properties: {
				href: '#' + id
			},
			contents: text,
			inside: h1
		});
	}

	$u.element.create('li', {
		contents: {
			tag: 'a',
			properties: {
				href: '#' + (h1.id || section.id)
			},
			contents: text
		},
		inside: toc
	});
});

if(toc.children.length > 0) {
	$u.element.create('section', {
		properties: {
			id: 'toc'
		},
		contents: [{
			tag: 'h1',
			contents: 'On this page'
		}, toc],
		before: $('body > section')
	});
}

})();

// calc()
(function(){

	if (PrefixFree.functions.indexOf('calc') == -1) {
		var style = document.createElement('_').style;
		style.width = 'calc(1px + 1%)'
		
		if(!style.width) {
			// calc not supported
			var header = $('header'),
			    footer = $('footer');
			    
			function calculatePadding() {
				header.style.padding =
				footer.style.padding = '30px ' + (innerWidth/2 - 450) + 'px';
			}
			
			addEventListener('resize', calculatePadding);
			calculatePadding();
		}
	}
})();

var components = {
	core: {
		meta: {
			path: 'components/prism-core.js',
			option: 'mandatory'
		},
		'core': 'Core'
	},
	themes: {
		meta: {
			path: '{id}.css',
			option: 'default'
		},
		'prism': 'Default',
		'prism-funky': 'Funky'
	},
	languages: {
		meta: {
			path: 'components/prism-{id}',
			option: 'default'
		},
		'markup': 'Markup',
		'css': 'CSS',
		'javascript': 'JavaScript'
	},
	plugins: {
		meta: {
			path: 'plugins/{id}/prism-{id}',
			link: 'plugins/{id}/',
			hasCSS: true
		},
		'line-highlight': 'Line Highlight',
		'show-invisibles': 'Show Invisibles'
	}
};

(function() {
var p = $u.element.create('p', {
	properties: {
		id: 'theme'
	},
	contents: 'Theme:',
	before: 'header #features'
});
var themes = components.themes;
var current = (location.search.match(/theme=([\w-]+)/) || [,'prism'])[1];

if (!(current in themes)) {
	current = 'prism';
}

if (current == 'prism') {
	var stored = localStorage.getItem('theme');
	
	if (stored in themes) {
		current = stored;
	}
}

function setTheme(id) {
	$('#prism-css').href = themes.meta.path.replace(/\{id}/g, id);
	localStorage.setItem('theme', id);
	
	history.pushState(null, '', location.pathname + (id !== 'prism'? '?theme=' + id : '') + location.hash);
}

for (var id in themes) {

	if (id === 'meta') {
		continue;
	}
	
	$u.element.create('input', {
		properties: {
			type: 'radio',
			name: "theme",
			id: 'theme=' + id,
			checked: current === id,
			value: id,
			onclick: function () {
				setTheme(this.value);
			}
		},
		inside: p
	});
	
	$u.element.create('label', {
		properties: {
			htmlFor: 'theme=' + id
		},
		contents: themes[id],
		inside: p
	});
}

setTheme(current);
})();