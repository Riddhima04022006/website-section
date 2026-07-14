(function(){
  var panels = document.querySelectorAll('.panel');
  var background = document.getElementById('section4-background');

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        if(!entry.target.classList.contains('in-view')){
          entry.target.classList.add('in-view');
        }
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });

  panels.forEach(function(p){ io.observe(p); });
})();