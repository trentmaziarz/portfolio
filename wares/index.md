---
layout: default
title: Wares
---

<figure class="wares-arms">
  <img src="/assets/img/arms.svg" alt="Maziarz coat of arms: per bend red and gold, a silver dove, three black tar drops">
  <figcaption>The drops are tar. It's the family trade.</figcaption>
</figure>

<h2 class="page-title">Maź Maziarza</h2>

<div class="page-text">
<p>Maziarz is a trade before it is a name. The men who bore it burned resinous pine slowly in earthen kilns, the smolarnie, and caught the black tar as it wept from the wood. They blended it with fat and wax into maź: the grease that kept the wagons of the countryside turning. Then the wagons stopped, the kilns went cold, and the trade slept in the name for generations. This jar wakes it. The grease holds true as it ever was, tar, fat, and wax, put up now for steel instead of axles.</p>
</div>

<div class="section-label">The Wares</div>

<div class="ware">
  <div class="ware-photo"><span class="photo-placeholder">photograph coming with batch one</span></div>
  <p><strong>Blade Grease, for steel.</strong> Beeswax, lanolin, true pine tar. A thin coat on clean, dry steel; buff off the excess. Not food. Feed it to your steel.</p>
</div>

<div class="ware">
  <div class="ware-photo"><span class="photo-placeholder">photograph coming with batch one</span></div>
  <p><strong>Wagon Grease, for wood and leather.</strong> Beeswax, neatsfoot, pine tar and rosin. Work in sparingly; it darkens where the tar loves it. For leather, haft, and wheel.</p>
</div>

<p class="wares-safety">Not food. Keep from children. Feed it to your steel.</p>

<div class="section-label">Batch Notes</div>

{% assign batch_posts = site.posts | where_exp: "post", "post.categories contains 'batch-notes'" %}
{% if batch_posts.size > 0 %}
{% for post in batch_posts %}
<div class="post-entry">
  <div class="post-date">{{ post.date | date: "%B %Y" }}</div>
  <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
</div>
{% endfor %}
{% else %}
<p class="wares-empty">Batch one is not yet cooked. Its notes will live here.</p>
{% endif %}

<div class="section-label">Purchase</div>

{% if site.stripe_link and site.stripe_link != "" %}
<p><a class="buy-button" href="{{ site.stripe_link }}">Buy a jar</a></p>
{% else %}
<p class="wares-empty">First batch coming; jars are gifted before they're sold.</p>
{% endif %}
