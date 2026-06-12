(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};

  // Central math-formatting helpers. Every math token embedded in Hebrew text
  // must go through these (or be hand-wrapped KaTeX) — never raw "B=80°"/"-4"
  // inside an RTL sentence.
  E.fmt = {
    inline: function(tex){ return '$' + tex + '$'; },
    block: function(tex){ return '$$' + tex + '$$'; },
    deg: function(v){ return '$' + v + '^\\circ$'; },
    angle: function(label, value){
      return value == null
        ? '$\\sphericalangle ' + label + '$'
        : '$\\sphericalangle ' + label + '=' + value + '^\\circ$';
    },
    eq: function(left, right){ return '$' + left + '=' + right + '$'; },
    signed: function(n){ return n < 0 ? '(' + n + ')' : '' + n; },
    point: function(x, y){ return '$(' + x + ',' + y + ')$'; }
  };

  E.questionTypes = {
    open: function(o){ return { questionHTML:(o.svg?'<div class="diagram">'+o.svg+'</div>':'')+'<div class="qtext">'+o.question+'</div>', answerHTML:o.answer }; },
    mcq: function(o){
      const html = o.choices.map(c=>'<div class="mcq-choice '+(c.correct?'mcq-correct':'')+'"><span class="mcq-label">'+c.label+'.</span> '+c.text+'</div>').join('');
      return { questionHTML:(o.svg?'<div class="diagram">'+o.svg+'</div>':'')+'<div class="qtext">'+o.question+'</div><div class="mcq-choices">'+html+'</div>', answerHTML:o.answer };
    },
    tf: function(o){ return { questionHTML:(o.svg?'<div class="diagram">'+o.svg+'</div>':'')+'<div class="qtext tf-statement"><span class="tf-label">נכון / שגוי:</span> '+o.question+'</div>', answerHTML:'<div class="tf-verdict">'+(o.isTrue?'✓ נכון':'✗ שגוי')+'</div>\n'+o.answer }; },
    mistake: function(o){ return { questionHTML:(o.svg?'<div class="diagram">'+o.svg+'</div>':'')+'<div class="mistake-prompt">מצאו את הטעות בפתרון הבא:</div><div class="qtext mistake-box">'+o.question+'</div>', answerHTML:o.answer }; }
  };
})();
