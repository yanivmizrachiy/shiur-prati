(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};
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
