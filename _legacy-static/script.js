
  const defaultData = {
    name: "Divyanshu Sharma",
    heroLine: '> target_roles: ["Software Development", "QA Engineering", "AI/ML"]',
    tagline: "MCA graduate (AKTU) with hands-on manual QA experience and an active upskilling track into GenAI / LLM backend engineering. I like software that's tested as carefully as it's built.",
    location: "Meerut, UP, India",
    education: "MCA · MIET (AKTU)",
    status: "Open to Delhi NCR & remote",
    resumeLink: "",
    photoUrl: "",
    about: "I'm an MCA graduate from Meerut Institute of Engineering & Technology (AKTU-affiliated), with a BCA foundation from Pt. Deen Dayal Upadhyay Management College. My path started in manual QA — running functional, regression, smoke, sanity and UAT cycles, and tracking defects end-to-end through the STLC in Jira — and it's now extending into backend AI engineering, where I'm building with FastAPI, retrieval-augmented generation and agentic frameworks. I'm currently looking for full-time Software Development, QA, or AI/ML roles across Delhi NCR and remote.",
    contactLead: "Looking for Software Development, QA, or AI/ML roles in Delhi NCR or remote. Feel free to reach out — happy to chat.",
    skills: [
      {category:"QA & Testing", status:"pass", items:["Manual Testing","Functional Testing","Regression Testing","Smoke Testing","Sanity Testing","UAT","STLC","Defect Life Cycle","Jira"]},
      {category:"Programming & Backend", status:"pass", items:["Python","Django","Flask","PostgreSQL","Git"]},
      {category:"GenAI / LLM Engineering", status:"wip", items:["FastAPI","LLM APIs","RAG","Vector Databases","LangChain","LangGraph","LlamaIndex","CrewAI","Docker"]},
      {category:"Also learning", status:"wip", items:["OCR (PyMuPDF, Tesseract, PaddleOCR)","Redis","OpenSearch","AWS","CI/CD"]}
    ],
    experience: [
      {role:"Jr. QA / Manual QA Tester", company:"TECHERS, Meerut", dates:"Dates available on request", bullets:[
        "Executed manual test cycles — functional, regression, smoke, sanity and UAT — across the STLC and defect life cycle.",
        "Tested a media streaming platform deployed on Raspberry Pi hardware.",
        "Logged, triaged and tracked defects to resolution in Jira."
      ]},
      {role:"Python Development Intern", company:"Kryptora Infotech", dates:"Dates available on request", bullets:[
        "Built and debugged Python scripts and applications during the internship.",
        "Contributed to Python application development, debugging, and maintenance."
      ]},
      {role:"Core Java Intern", company:"Creative Technologies", dates:"Dates available on request", bullets:[
        "Built Java fundamentals through internship assignments and application exercises."
      ]}
    ],
    projects: [
      {title:"Hybrid AI-Based SMS Spam Detection System", tags:["Python","DistilBERT","NLP","Team Project"], description:"MCA final-year project built with a team, using a DistilBERT-based hybrid model to classify spam SMS messages. Guided by Mr. Ajit Singh.", githubUrl:"", demoUrl:""},
      {title:"Naive Bayes Spam Classifier", tags:["Python","Machine Learning","NLP"], description:"A lightweight spam-detection classifier built on a Naive Bayes model — an earlier, foundational take on the spam-detection problem.", githubUrl:"", demoUrl:""},
      {title:"Email Spam Detection — Chrome Extension", tags:["JavaScript","Chrome Extension"], description:"A browser extension that flags likely spam emails directly in the inbox.", githubUrl:"", demoUrl:""},
      {title:"CodeQuest", tags:["JavaScript","EdTech","Game Design"], description:"An interactive, browser-based coding education game teaching variables, loops, conditionals, functions and arrays through a quest map with difficulty modes.", githubUrl:"", demoUrl:""},
      {title:"Online Quiz System", tags:["Python","Web App"], description:"A web-based quiz platform for creating and taking timed quizzes.", githubUrl:"", demoUrl:""}
    ],
    utilityProjects: [
      {name:"Tic-Tac-Toe GUI", url:""},
      {name:"Email Sender GUI", url:""}
    ],
    contact: {
      links: [
        {caption:"email", value:"divyanshusharma1506@gmail.com", href:"mailto:divyanshusharma1506@gmail.com", icon:"✉"},
        {caption:"linkedin", value:"linkedin.com/in/divyanshu-sharma", href:"https://www.linkedin.com/in/divyanshu-sharma/", icon:"in"},
        {caption:"github", value:"github.com/Divyanshusha", href:"https://github.com/Divyanshusha", icon:"⌥"},
        {caption:"github", value:"github.com/divyanshu15", href:"https://github.com/divyanshu15", icon:"⌥"}
      ]
    }
  };

  let data = JSON.parse(JSON.stringify(defaultData));

  function escapeHtml(str){ return String(str==null?"":str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function isUsableUrl(url){
    if(!url) return false;
    const value = String(url).trim();
    return value !== '#' && value !== 'javascript:void(0)' && (
      /^https?:\/\//i.test(value) ||
      /^mailto:/i.test(value) ||
      /^tel:/i.test(value) ||
      /^\//.test(value) ||
      /^\.\.?\//.test(value)
    );
  }

  function applyLink(anchor, url){
    const usable = isUsableUrl(url);
    anchor.hidden = !usable;
    if(!usable){
      anchor.removeAttribute('href');
      anchor.removeAttribute('target');
      anchor.removeAttribute('rel');
      return false;
    }
    anchor.href = url;
    if(/^https?:\/\//i.test(url)){
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
    }else{
      anchor.removeAttribute('target');
      anchor.removeAttribute('rel');
    }
    return true;
  }

  function setRuntimeMeta(){
    const canonical = document.querySelector('link[rel="canonical"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const url = window.location.href.split('#')[0];
    if(canonical && /^https?:/i.test(url)) canonical.href = url;
    if(ogUrl && /^https?:/i.test(url)) ogUrl.setAttribute('content', url);

    const jsonLd = {
      "@context":"https://schema.org",
      "@type":"ProfilePage",
      "mainEntity":{
        "@type":"Person",
        "name":data.name,
        "jobTitle":"QA Engineer / Aspiring GenAI Backend Developer",
        "url":url,
        "email":"mailto:"+((data.contact && data.contact.links || []).find(x => /^mailto:/i.test(x.href || ""))?.href || "").replace(/^mailto:/i,"")
      }
    };
    let node = document.getElementById('profile-jsonld');
    if(!node){
      node = document.createElement('script');
      node.type = 'application/ld+json';
      node.id = 'profile-jsonld';
      document.head.appendChild(node);
    }
    node.textContent = JSON.stringify(jsonLd);
  }


  /* ---------- Save / load ----------
     Production behavior:
     1. localStorage works on GitHub Pages, Netlify, custom domains, etc.
     2. Claude's window.storage is used when available.
     3. If neither is available, the page remains usable with default data.
  */
  const STORAGE_KEY = 'portfolio-data-v2';
  let saveTimeout;

  function setSaveStatus(msg){
    document.getElementById('saveStatus').textContent = msg;
  }

  function cloneDefaultData(){
    return JSON.parse(JSON.stringify(defaultData));
  }

  function scheduleSave(){
    clearTimeout(saveTimeout);
    setSaveStatus('Saving…');
    saveTimeout = setTimeout(saveData, 600);
  }

  async function saveData(){
    const serialized = JSON.stringify(data);
    let saved = false;

    try{
      localStorage.setItem(STORAGE_KEY, serialized);
      saved = true;
    }catch(e){ /* storage may be blocked */ }

    try{
      if(window.storage && typeof window.storage.set === 'function'){
        await window.storage.set('portfolio-data', serialized, false);
        saved = true;
      }
    }catch(e){ /* Claude storage is optional */ }

    setSaveStatus(saved ? 'Saved ' + new Date().toLocaleTimeString() : 'Local save unavailable');
  }

  async function loadData(){
    let loaded = false;

    try{
      const local = localStorage.getItem(STORAGE_KEY);
      if(local){
        data = JSON.parse(local);
        loaded = true;
      }
    }catch(e){ /* ignore malformed/unavailable local data */ }

    if(!loaded){
      try{
        if(window.storage && typeof window.storage.get === 'function'){
          const res = await window.storage.get('portfolio-data', false);
          if(res && res.value){
            data = JSON.parse(res.value);
            loaded = true;
          }
        }
      }catch(e){ /* no saved data yet */ }
    }

    renderAll();
  }

  /* ---------- Simple field binding ---------- */
  function bindSimpleFields(){
    document.querySelectorAll('[data-field]').forEach(el=>{
      const field = el.getAttribute('data-field');
      el.textContent = data[field] || '';
      el.oninput = () => { data[field] = el.textContent; scheduleSave(); };
    });
    document.getElementById('footerName').textContent = data.name;
  }

  function updatePhoto(){
    const frame = document.getElementById('photoFrame');
    if(data.photoUrl){
      frame.style.backgroundImage = `url("${data.photoUrl.replace(/"/g,'')}")`;
      frame.classList.add('has-photo');
    } else {
      frame.style.backgroundImage = '';
      frame.classList.remove('has-photo');
    }
  }

  function makeLinkEditable(anchor, label, setter){
    anchor.addEventListener('click', (e)=>{
      if(document.body.classList.contains('edit-mode')){
        e.preventDefault();
        const val = prompt('Enter ' + label + ':', anchor.getAttribute('href') || '');
        if(val !== null){
          anchor.setAttribute('href', val);
          if(val && val.startsWith('http')){ anchor.setAttribute('target','_blank'); anchor.setAttribute('rel','noopener'); }
          else { anchor.removeAttribute('target'); anchor.removeAttribute('rel'); }
          setter(val);
        }
      }
    });
  }

  /* ---------- Skills ---------- */
  function renderSkills(){
    const container = document.getElementById('skillsContainer');
    container.innerHTML = '';
    data.skills.forEach((group, gi) => {
      const groupEl = document.createElement('div');
      groupEl.className = 'skill-group';
      groupEl.innerHTML = `
        <div class="skill-group-label">
          <span>&gt;</span>
          <span class="editable group-label" contenteditable="false">${escapeHtml(group.category)}</span>
          <button type="button" class="badge ${group.status==='pass'?'badge-pass':'badge-wip'} status-toggle edit-only" aria-label="Toggle skill category status">${group.status==='pass' ? '✓ PASS' : 'WIP'}</button>
          <button type="button" class="mini-remove edit-only remove-group" title="Remove category" aria-label="Remove skill category">✕</button>
        </div>
        <div class="pill-row"></div>
        <button type="button" class="add-btn edit-only add-skill">+ add skill</button>
      `;
      const pillRow = groupEl.querySelector('.pill-row');
      group.items.forEach((item, ii) => {
        const pill = document.createElement('span');
        pill.className = `pill ${group.status}`;
        pill.innerHTML = `<span class="dot"></span><span class="editable" contenteditable="false">${escapeHtml(item)}</span><button type="button" class="mini-remove edit-only" title="Remove" aria-label="Remove item">✕</button>`;
        pill.querySelector('span.editable').oninput = (e)=>{ data.skills[gi].items[ii] = e.target.textContent; scheduleSave(); };
        pill.querySelector('.mini-remove').onclick = ()=>{ data.skills[gi].items.splice(ii,1); scheduleSave(); renderSkills(); };
        pillRow.appendChild(pill);
      });
      groupEl.querySelector('.group-label').oninput = (e)=>{ data.skills[gi].category = e.target.textContent; scheduleSave(); };
      groupEl.querySelector('.status-toggle').onclick = ()=>{ data.skills[gi].status = data.skills[gi].status === 'pass' ? 'wip' : 'pass'; scheduleSave(); renderSkills(); };
      groupEl.querySelector('.remove-group').onclick = ()=>{ if(confirm('Remove this whole category?')){ data.skills.splice(gi,1); scheduleSave(); renderSkills(); } };
      groupEl.querySelector('.add-skill').onclick = ()=>{ data.skills[gi].items.push('New skill'); scheduleSave(); renderSkills(); };
      container.appendChild(groupEl);
    });
    syncEditableState();
  }
  document.getElementById('addSkillGroupBtn').addEventListener('click', ()=>{
    const name = prompt('Category name:', 'New category');
    if(name){ data.skills.push({category:name, status:'wip', items:[]}); scheduleSave(); renderSkills(); }
  });

  /* ---------- Experience ---------- */
  function renderExperience(){
    const container = document.getElementById('expContainer');
    container.innerHTML = '';
    data.experience.forEach((exp, ei) => {
      const card = document.createElement('div');
      card.className = 'card exp-card';
      card.innerHTML = `
        <button type="button" class="remove-card-btn edit-only remove-role">✕ remove role</button>
        <div class="exp-card-head">
          <div class="exp-role">
            <span class="editable role-text" contenteditable="false">${escapeHtml(exp.role)}</span>
            <span> @ </span>
            <span class="editable company-text" contenteditable="false">${escapeHtml(exp.company)}</span>
          </div>
          <div class="exp-date editable date-text" contenteditable="false">${escapeHtml(exp.dates)}</div>
        </div>
        <ul class="assert-list"></ul>
        <button type="button" class="add-btn edit-only add-bullet">+ add bullet</button>
      `;
      const ul = card.querySelector('.assert-list');
      exp.bullets.forEach((b, bi) => {
        const li = document.createElement('li');
        if(b.trim().startsWith('//')) li.classList.add('todo');
        li.innerHTML = `<span class="editable" contenteditable="false">${escapeHtml(b)}</span><button type="button" class="mini-remove edit-only" title="Remove bullet" aria-label="Remove experience bullet">✕</button>`;
        li.querySelector('span.editable').oninput = (e)=>{ data.experience[ei].bullets[bi] = e.target.textContent; scheduleSave(); };
        li.querySelector('.mini-remove').onclick = ()=>{ data.experience[ei].bullets.splice(bi,1); scheduleSave(); renderExperience(); };
        ul.appendChild(li);
      });
      card.querySelector('.role-text').oninput = (e)=>{ data.experience[ei].role = e.target.textContent; scheduleSave(); };
      card.querySelector('.company-text').oninput = (e)=>{ data.experience[ei].company = e.target.textContent; scheduleSave(); };
      card.querySelector('.date-text').oninput = (e)=>{ data.experience[ei].dates = e.target.textContent; scheduleSave(); };
      card.querySelector('.remove-role').onclick = ()=>{ if(confirm('Remove this role?')){ data.experience.splice(ei,1); scheduleSave(); renderExperience(); } };
      card.querySelector('.add-bullet').onclick = ()=>{ data.experience[ei].bullets.push('New achievement'); scheduleSave(); renderExperience(); };
      container.appendChild(card);
    });
    syncEditableState();
  }
  document.getElementById('addExpBtn').addEventListener('click', ()=>{
    data.experience.push({role:'New role', company:'Company', dates:'Dates available on request', bullets:['New achievement']});
    scheduleSave(); renderExperience();
  });

  /* ---------- Projects ---------- */
  function renderProjects(){
    const container = document.getElementById('projectsContainer');
    container.innerHTML = '';
    data.projects.forEach((p, pi) => {
      const card = document.createElement('div');
      card.className = 'card project-card';
      card.innerHTML = `
        <button type="button" class="remove-card-btn edit-only remove-project">✕ remove</button>
        <div class="project-title editable title-text" contenteditable="false">${escapeHtml(p.title)}</div>
        <div class="tag-row"></div>
        <button type="button" class="add-btn edit-only add-tag">+ add tag</button>
        <p class="editable desc-text" contenteditable="false">${escapeHtml(p.description)}</p>
        <div class="project-links">
          <a href="" class="link-github">GitHub ↗</a>
          <a href="" class="link-demo">Demo ↗</a>
        </div>
      `;
      const tagRow = card.querySelector('.tag-row');
      p.tags.forEach((t, ti) => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.innerHTML = `<span class="editable" contenteditable="false">${escapeHtml(t)}</span><button type="button" class="mini-remove edit-only" title="Remove tag" aria-label="Remove project tag">✕</button>`;
        tag.querySelector('span.editable').oninput = (e)=>{ data.projects[pi].tags[ti] = e.target.textContent; scheduleSave(); };
        tag.querySelector('.mini-remove').onclick = ()=>{ data.projects[pi].tags.splice(ti,1); scheduleSave(); renderProjects(); };
        tagRow.appendChild(tag);
      });
      card.querySelector('.title-text').oninput = (e)=>{ data.projects[pi].title = e.target.textContent; scheduleSave(); };
      card.querySelector('.desc-text').oninput = (e)=>{ data.projects[pi].description = e.target.textContent; scheduleSave(); };
      card.querySelector('.remove-project').onclick = ()=>{ if(confirm('Remove this project?')){ data.projects.splice(pi,1); scheduleSave(); renderProjects(); } };
      card.querySelector('.add-tag').onclick = ()=>{ data.projects[pi].tags.push('tag'); scheduleSave(); renderProjects(); };
      const githubLink = card.querySelector('.link-github');
      const demoLink = card.querySelector('.link-demo');
      applyLink(githubLink, p.githubUrl);
      applyLink(demoLink, p.demoUrl);
      makeLinkEditable(githubLink, 'GitHub URL', (val)=>{
        data.projects[pi].githubUrl = val;
        applyLink(githubLink, val);
        scheduleSave();
      });
      makeLinkEditable(demoLink, 'Demo URL', (val)=>{
        data.projects[pi].demoUrl = val;
        applyLink(demoLink, val);
        scheduleSave();
      });
      container.appendChild(card);
    });
    syncEditableState();
  }
  document.getElementById('addProjectBtn').addEventListener('click', ()=>{
    data.projects.push({title:'New project', tags:['tag'], description:'Description here.', githubUrl:'#', demoUrl:'#'});
    scheduleSave(); renderProjects();
  });

  /* ---------- Utility links ---------- */
  function renderUtility(){
    const container = document.getElementById('utilityContainer');
    container.innerHTML = '';
    data.utilityProjects.forEach((u, ui) => {
      const a = document.createElement('a');
      a.href = u.url;
      a.className = 'pill pass';
      if(u.url && u.url.startsWith('http')){ a.target = '_blank'; a.rel = 'noopener'; }
      a.innerHTML = `<span class="dot"></span><span>${escapeHtml(u.name)}</span><button type="button" class="mini-remove edit-only" title="Remove" aria-label="Remove item">✕</button>`;
      a.addEventListener('click', (e)=>{
        if(document.body.classList.contains('edit-mode')){
          e.preventDefault();
          const name = prompt('Name:', u.name); if(name===null) return;
          const url = prompt('URL:', u.url); if(url===null) return;
          data.utilityProjects[ui] = {name, url};
          scheduleSave(); renderUtility();
        }
      });
      a.querySelector('.mini-remove').addEventListener('click', (e)=>{
        e.preventDefault(); e.stopPropagation();
        data.utilityProjects.splice(ui,1); scheduleSave(); renderUtility();
      });
      container.appendChild(a);
    });
  }
  document.getElementById('addUtilityBtn').addEventListener('click', ()=>{
    const name = prompt('Name:', 'New link'); if(name===null) return;
    const url = prompt('URL:', '#');
    data.utilityProjects.push({name, url: url || '#'});
    scheduleSave(); renderUtility();
  });

  /* ---------- Contact links ---------- */
  function renderContactLinks(){
    const container = document.getElementById('contactLinksContainer');
    container.innerHTML = '';
    data.contact.links.forEach((item, li) => {
      const a = document.createElement('a');
      a.className = 'contact-item';
      applyLink(a, item.href);
      a.innerHTML = `<span class="icon">${escapeHtml(item.icon)}</span><span><span class="label">${escapeHtml(item.caption)}</span><span class="value">${escapeHtml(item.value)}</span></span><button type="button" class="mini-remove edit-only" title="Remove" aria-label="Remove item">✕</button>`;
      a.addEventListener('click', (e)=>{
        if(document.body.classList.contains('edit-mode')){
          e.preventDefault();
          const caption = prompt('Label (e.g. email, linkedin):', item.caption); if(caption===null) return;
          const value = prompt('Display text:', item.value); if(value===null) return;
          const href = prompt('Link URL (use mailto:... for email):', item.href); if(href===null) return;
          data.contact.links[li] = {...item, caption, value, href};
          scheduleSave(); renderContactLinks();
        }
      });
      a.querySelector('.mini-remove').addEventListener('click', (e)=>{
        e.preventDefault(); e.stopPropagation();
        data.contact.links.splice(li,1); scheduleSave(); renderContactLinks();
      });
      container.appendChild(a);
    });
  }
  document.getElementById('addContactLinkBtn').addEventListener('click', ()=>{
    const caption = prompt('Label:', 'website'); if(caption===null) return;
    const value = prompt('Display text:', 'example.com'); if(value===null) return;
    const href = prompt('URL:', 'https://'); if(href===null) return;
    data.contact.links.push({caption, value, href, icon:'↗'});
    scheduleSave(); renderContactLinks();
  });

  /* ---------- Photo & resume ---------- */
  function editPhoto(){
    if(!document.body.classList.contains('edit-mode')) return;
    const url = prompt('Photo image URL (leave blank to remove):', data.photoUrl || '');
    if(url===null) return;
    data.photoUrl = url;
    updatePhoto();
    scheduleSave();
  }
  document.getElementById('photoFrame').addEventListener('click', editPhoto);
  document.getElementById('photoFrame').addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      editPhoto();
    }
  });

  /* ---------- Edit mode toggle ---------- */
  function syncEditableState(){
    const isEdit = document.body.classList.contains('edit-mode');
    document.querySelectorAll('.editable').forEach(el => el.setAttribute('contenteditable', isEdit ? 'true' : 'false'));
  }
  const editToggle = document.getElementById('editToggle');
  editToggle.addEventListener('click', ()=>{
    const isEdit = document.body.classList.toggle('edit-mode');
    editToggle.setAttribute('aria-pressed', isEdit);
    editToggle.textContent = isEdit ? '✓ Done editing' : '✏️ Edit page';
    syncEditableState();
  });

  document.getElementById('resetBtn').addEventListener('click', async ()=>{
    if(!confirm('Reset all content back to the default portfolio? This cannot be undone.')) return;
    data = cloneDefaultData();
    try{ localStorage.removeItem(STORAGE_KEY); }catch(e){}
    try{
      if(window.storage && typeof window.storage.set === 'function'){
        await window.storage.set('portfolio-data', JSON.stringify(data), false);
      }
    }catch(e){}
    renderAll();
    setSaveStatus('Reset to defaults');
  });

  /* ---------- Nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');
  navToggle.addEventListener('click', ()=>{
    const isOpen = navLinksEl.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  navLinksEl.querySelectorAll('a').forEach(link => link.addEventListener('click', ()=>{
    navLinksEl.classList.remove('open');
    navToggle.setAttribute('aria-expanded','false');
  }));

  /* ---------- Reveal on scroll ---------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!prefersReducedMotion && 'IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); } });
    }, {threshold:0.12});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
  }

  /* ---------- Render all ---------- */
  function renderAll(){
    bindSimpleFields();
    updatePhoto();
    const resumeBtn = document.getElementById('resumeBtn');
    applyLink(resumeBtn, data.resumeLink);
    makeLinkEditable(resumeBtn, 'Résumé link', (val)=>{
      data.resumeLink = val;
      applyLink(resumeBtn, val);
      scheduleSave();
    });
    setRuntimeMeta();
    renderSkills();
    renderExperience();
    renderProjects();
    renderUtility();
    renderContactLinks();
    syncEditableState();
  }

  loadData();
