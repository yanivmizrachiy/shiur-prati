(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};
  E.isTriple = function(a,b,c){ return a*a + b*b === c*c; };
  E.uniqueValues = function(values){ return new Set(values).size === values.length; };
})();
