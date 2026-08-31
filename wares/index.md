---
layout: default
title: Wares
---

<div class="writing">
<div class="folio ruled">
  <div class="vline vline-l" aria-hidden="true"></div>
  <div class="vline vline-r" aria-hidden="true"></div>

  <div>
    <h2 class="folio-title">Maź Maziarza</h2>
    <p class="drop-cap">Maziarz is a trade before it is a name. The men who bore it burned resinous pine slowly in earthen kilns, the smolarnie, and caught the black tar as it wept from the wood. They blended it with fat and wax into maź: the grease that kept the wagons of the countryside turning. Then the wagons stopped, the kilns went cold, and the trade slept in the name for generations. This jar wakes it. The grease holds true as it ever was, tar, fat, and wax, put up now for steel instead of axles.</p>
  </div>
  <div class="margin-item arms-block">
    <img src="/assets/img/arms.svg" alt="Maziarz coat of arms: per bend red and gold, a silver dove, three black tar drops" style="width: 192px; transform: rotate(0.8deg);">
    <div class="mg" style="margin: 8px 0 0 0; transform: rotate(-1deg); font-size: 13px; white-space: nowrap;">(The drops are tar. It's the family trade)</div>
  </div>

  <div class="rubric-label">The Wares</div>
  <div class="m-desktop"></div>

  <div class="ware">
    <div class="miniframe"><img src="/assets/img/labels/front-steel.svg" alt="Maź Maziarza Blade Grease front label, brass lettering on murrey" style="width: 122px;"></div>
    <p><strong>Blade Grease, for steel.</strong> Beeswax, lanolin, true pine tar. A thin coat on clean, dry steel; buff off the excess. Not food. Feed it to your steel.</p>
  </div>
  <div class="m-desktop"></div>

  <div class="ware">
    <div class="miniframe" style="transform: rotate(0.6deg);"><img src="/assets/img/labels/front-wagon.svg" alt="Maź Maziarza Wagon Grease front label, murrey lettering on cream" style="width: 122px;"></div>
    <p><strong>Wagon Grease, for wood and leather.</strong> Beeswax, neatsfoot, pine tar and rosin. Work in sparingly; it darkens where the tar loves it. For leather, haft, and wheel.</p>
  </div>
  <div class="m-desktop"></div>

  <p class="wares-safety">Not food. Keep from children. Feed it to your wares.</p>
  <div class="m-desktop"></div>

  <div class="rubric-label">Batch Notes</div>
  <div class="m-desktop"></div>

  {% assign batch_posts = site.posts | where_exp: "post", "post.categories contains 'batch-notes'" %}
  {% if batch_posts.size > 0 %}
  <div>
  {% for post in batch_posts %}
    <div class="post-entry">
      <div class="post-date">{{ post.date | date: "%B %Y" }}</div>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    </div>
  {% endfor %}
  </div>
  {% else %}
  <p class="wares-empty">Batch one is not yet cooked. Its notes will live here.</p>
  {% endif %}
  <div class="m-desktop"></div>

  <div class="rubric-label">Purchase</div>
  <div class="m-desktop"></div>

  <div>
    <p class="wares-empty" style="margin-bottom: 31px;">First batch coming; jars are gifted before they're sold.</p>
    <p>There is no cart and there will not be one. When jars are ready, write me at <a href="mailto:maziarztrent@gmail.com">maziarztrent@gmail.com</a> and we sort it out.</p>
  </div>
  <div class="catchword"><a href="/blog/">contents</a></div>
</div>
</div>
