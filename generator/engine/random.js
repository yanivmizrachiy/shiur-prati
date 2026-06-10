// Phase 3A engine random utilities.
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};
  E.pick = function(arr){ return arr[Math.floor(Math.random()*arr.length)]; };
  E.pickN = function(arr,n){
    const copy = arr.slice(), out = [];
    while(out.length < n && copy.length){
      const i = Math.floor(Math.random()*copy.length);
      out.push(copy.splice(i,1)[0]);
    }
    return out;
  };
  E.shuffle = function(arr){
    const copy = arr.slice();
    for(let i=copy.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [copy[i],copy[j]]=[copy[j],copy[i]];
    }
    return copy;
  };
})();
