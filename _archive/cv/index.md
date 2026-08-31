---
layout: default
title: CV
---

<h2 class="page-title">Curriculum Vitae</h2>

<div class="cv-download">
  <a href="/assets/papers/maziarz-cv.pdf" class="cv-btn">↓ Download Full CV (PDF)</a>
</div>

{% for section in site.data.cv %}
<div class="cv-category">
  <h2>{{ section.heading }}</h2>
  {% for item in section.entries %}
  <div class="cv-item">
    <span class="cv-dates">{{ item.dates }}</span>
    <div class="cv-info">
      <h3>{{ item.title }}</h3>
      {% if item.institution %}<span class="institution">{{ item.institution }}</span>{% endif %}
      {% if item.description %}<p>{{ item.description }}</p>{% endif %}
    </div>
  </div>
  {% endfor %}
</div>
{% endfor %}
