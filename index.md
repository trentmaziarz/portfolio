---
layout: default
title: Home
---

<div class="home-photo">
  <img src="/assets/img/headshot.jpg" alt="Trent Maziarz">
</div>

<div class="about-text">
<p class="drop-cap">My name is Trent Maziarz and I am a student working at the intersection of <strong>digital history</strong> and <strong>computer science</strong>. My research explores how computational methods - network analysis, natural language processing, data visualization - can help us ask new questions of historical sources and illuminate patterns that traditional methods alone cannot reveal.</p>

<p>I am drawn to this work because historical sources are messy, incomplete, and deeply human - exactly the kind of data that demands both computational rigor and interpretive sensitivity. I build tools and frameworks that try to honor both, creating bridges between the humanities and computer science that serve scholars across disciplines.</p>

<p>Additional information about my work can be found in the <a href="/projects/">projects</a> and <a href="/publications/">publications</a> sections. For inquiries or potential collaborations, feel free to <a href="mailto:trentmaziarz@umass.edu">get in touch</a>.</p>
</div>

<div class="section-label">Research Interests</div>
<p class="interest-list">
  Digital History · Network Analysis · NLP for Historical Texts · Data Visualization · Computational Humanities · GIS &amp; Spatial History · Digital Archives · Text Encoding (TEI)
</p>

<div class="link-row">
  <a href="#">Google Scholar</a>
  <a href="https://orcid.org/404">ORCID</a>
  <a href="https://github.com/trentmaziarz">GitHub</a>
  <a href="mailto:trentmaziarz@umass.edu">Email</a>
</div>

<div class="umaring-wrap">
  <script id="umaring_js" src="https://umaring.mkr.cx/ring.js?id=devaanand19"></script>
  <div id="umaring" style="display:none;"></div>
  <div id="umaring-colophon" class="ring-colophon"></div>
  <script>
    function formatRing() {
      var ring = document.getElementById('umaring');
      var colophon = document.getElementById('umaring-colophon');
      if (!ring || !colophon) return;
      var links = ring.querySelectorAll('a');
      if (links.length >= 3) {
        colophon.innerHTML = 'This site is part of the <a href="' + links[1].href + '">UMass Webring</a>.<br>Visit <a href="' + links[0].href + '">' + links[0].textContent + '</a> or <a href="' + links[2].href + '">' + links[2].textContent + '</a> nearby.';
      }
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() { setTimeout(formatRing, 100); });
    } else {
      setTimeout(formatRing, 100);
    }
  </script>
</div>
