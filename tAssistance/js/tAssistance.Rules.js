tAssistance.rules = {
	applyRules : function(obsel, rules, base) {
		var drawnObsel = null;
		for ( var i = 0; i < rules.length; i++) {
			var rule = rules[i];

			var pass = rule.selectorFn(obsel);

			if (pass) {
				drawnObsel = rule.styleFn(obsel, base);
				drawnObsel.setAttributeNS(null, 'class', 'obsel');// attributes for system design
				return drawnObsel;
			}
		}
		return drawnObsel;
	},
	translateRules : function(rules) {
		for ( var i = 0; i < rules.length; i++) {
			var rule = rules[i];
			var selector_script = rule.selector;
			var style_script = rule.style;

			eval("rule.selectorFn = " + selector_script + ";");
			eval("rule.styleFn = " + style_script + ";");
		}
	},
	getNewRules : function() {
		$.get("api.php?o=rule&fn=all", function(data) {
			localStorage["rules"] = JSON.parse(data);
		});
	},

};