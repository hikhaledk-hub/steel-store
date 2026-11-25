/* =========================================================
   AL-ASAI STEEL — Storefront logic
   ========================================================= */
(function () {
  "use strict";

  var S = window.STORE;
  var CART_KEY = "asaai_steel_cart_v1";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- helpers ---------- */
  function money(n) {
    return (
      Number(n).toLocaleString("en-US", {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3
      }) + " ر.ع"
    );
  }

  var ICONS = {
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.4l6.5-.9z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v5M14 11v5"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 7h12l1.4 12.2a1 1 0 0 1-1 1.1H5.6a1 1 0 0 1-1-1.1L6 7z"/><path d="M9 7V5.6a3 3 0 0 1 6 0V7"/></svg>'
  };

  function stars(n) {
    var out = "";
    for (var i = 0; i < 5; i++) out += ICONS.star;
    return out;
  }

  /* ---------- toast ---------- */
  function toast(msg) {
    var wrap = $(".toast-wrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.className = "toast-wrap";
      document.body.appendChild(wrap);
    }
    var el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = ICONS.check + "<span>" + msg + "</span>";
    wrap.appendChild(el);
    setTimeout(function () { el.remove(); }, 4000);
  }

  /* ---------- cart ---------- */
  function readCart() {
    try {
      var raw = JSON.parse(localStorage.getItem(CART_KEY) || "{}");
      return raw && typeof raw === "object" ? raw : {};
    } catch (e) {
      return {};
    }
  }
  function writeCart(c) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch (e) {}
    syncCartUI();
  }
  function cartEntries() {
    var c = readCart(), out = [];
    Object.keys(c).forEach(function (id) {
      var p = S.byId(id);
      if (p) out.push({ p: p, qty: c[id] });
    });
    return out;
  }
  function cartTotals() {
    var sub = 0, count = 0;
    cartEntries().forEach(function (it) {
      sub += it.p.price * it.qty;
      count += it.qty;
    });
    var vat = sub * 0.05;
    return { sub: sub, vat: vat, total: sub + vat, count: count };
  }
  function addToCart(id, qty) {
    var c = readCart();
    var p = S.byId(id);
    if (!p) return;
    qty = Math.max(1, parseInt(qty || 1, 10) || 1);
    c[id] = (c[id] || 0) + qty;
    writeCart(c);
    toast("تمت إضافة «" + p.name + "» إلى طلب عرض السعر");
    var btn = $('[data-add="' + id + '"]');
    if (btn) {
      btn.classList.add("added");
      btn.innerHTML = ICONS.check;
      setTimeout(function () {
        btn.classList.remove("added");
        btn.innerHTML = ICONS.plus;
      }, 1400);
    }
  }
  function setQty(id, qty) {
    var c = readCart();
    if (qty <= 0) delete c[id];
    else c[id] = qty;
    writeCart(c);
  }

  function renderCartDrawer() {
    var listEl = $("#cartItems");
    var footEl = $("#cartFoot");
    var emptyEl = $("#cartEmpty");
    var countEl = $("#cartCount");
    var headerCount = $("#drawerCount");
    var t = cartTotals();

    if (countEl) {
      countEl.textContent = t.count > 99 ? "99+" : t.count;
      countEl.style.display = t.count ? "grid" : "none";
    }
    if (headerCount) headerCount.textContent = t.count + " منتج";

    if (!listEl) return;
    var items = cartEntries();
    if (!items.length) {
      listEl.innerHTML = "";
      if (emptyEl) emptyEl.style.display = "block";
      if (footEl) footEl.style.display = "none";
      return;
    }
    if (emptyEl) emptyEl.style.display = "none";
    if (footEl) footEl.style.display = "block";

    listEl.innerHTML = items
      .map(function (it) {
        return (
          '<div class="cart-item">' +
          '<div class="ci-media">' + S.art(it.p.art) + "</div>" +
          '<div class="ci-body">' +
          '<h4>' + it.p.name + "</h4>" +
          '<span class="unit">' + it.p.unit + " · " + money(it.p.price) + "</span>" +
          '<div class="ci-foot">' +
          '<div class="ci-qty">' +
          '<button data-dec="' + it.p.id + '" aria-label="تقليل">−</button>' +
          "<span>" + it.qty + "</span>" +
          '<button data-inc="' + it.p.id + '" aria-label="زيادة">+</button>' +
          "</div>" +
          '<span class="ci-price">' + money(it.p.price * it.qty) + "</span>" +
          "</div>" +
          '<button class="ci-remove" data-remove="' + it.p.id + '">' + ICONS.trash + " إزالة</button>" +
          "</div></div>"
        );
      })
      .join("");

    $("#sumSub").textContent = money(t.sub);
    $("#sumVat").textContent = money(t.vat);
    $("#sumTotal").textContent = money(t.total);
  }

  function syncCartUI() {
    renderCartDrawer();
  }

  function openDrawer() {
    var d = $("#drawer"), o = $("#overlay");
    if (d) d.classList.add("open");
    if (o) o.classList.add("show");
    document.body.classList.add("locked");
    showCartStep();
  }
  function closeDrawer() {
    var d = $("#drawer"), o = $("#overlay");
    if (d) d.classList.remove("open");
    if (o) o.classList.remove("show");
    document.body.classList.remove("locked");
  }
  function showCartStep() {
    $("#cartStep") && ($("#cartStep").style.display = "block");
    $("#quoteStep") && ($("#quoteStep").classList.remove("show"));
    $("#quoteSuccess") && ($("#quoteSuccess").classList.remove("show"));
    renderCartDrawer();
  }
  function showQuoteStep() {
    if (!cartTotals().count) { toast("أضف منتجات أولاً لطلب عرض السعر"); return; }
    $("#cartStep") && ($("#cartStep").style.display = "none");
    $("#quoteStep") && ($("#quoteStep").classList.add("show"));
    $("#cartFoot") && ($("#cartFoot").style.display = "none");
  }

  /* ---------- product card ---------- */
  function card(p) {
    var badge = p.badge
      ? '<span class="badge ' + (p.badgeType || "") + '">' + p.badge + "</span>"
      : "";
    return (
      '<article class="product-card">' +
      '<div class="pc-media">' +
      badge +
      '<button class="pc-quick" data-view="' + p.id + '" aria-label="عرض المنتج">' + ICONS.eye + "</button>" +
      S.art(p.art) +
      "</div>" +
      '<div class="pc-body">' +
      '<span class="pc-cat">' + S.catName(p.cat) + "</span>" +
      '<h3 class="pc-title"><a href="product.html?id=' + p.id + '">' + p.name + "</a></h3>" +
      '<span class="pc-spec">' + p.spec + "</span>" +
      '<div class="pc-foot">' +
      '<div class="pc-price"><b>' + money(p.price) + "</b><span>لكل " + p.unit + "</span></div>" +
      '<button class="pc-add" data-add="' + p.id + '" aria-label="أضف إلى طلب العرض">' + ICONS.plus + "</button>" +
      "</div></div></article>"
    );
  }

  /* ---------- featured ---------- */
  function renderFeatured() {
    var grid = $("#featuredGrid");
    if (!grid) return;
    grid.innerHTML = S.featured.map(card).join("");
  }

  /* ---------- shop ---------- */
  function initShop() {
    var grid = $("#shopGrid");
    if (!grid) return;

    var params = new URLSearchParams(location.search);
    var state = {
      cats: [],
      q: params.get("q") || "",
      cat: params.get("cat") || "",
      sort: "featured",
      max: 400
    };
    if (state.cat) state.cats = state.cat.split(",");

    var boxes = $$('input[name="cat"]');
    boxes.forEach(function (b) {
      b.checked = state.cats.indexOf(b.value) > -1;
      b.addEventListener("change", function () {
        state.cats = boxes.filter(function (x) { return x.checked; }).map(function (x) { return x.value; });
        render();
      });
    });

    var search = $("#shopSearch");
    if (search) {
      search.value = state.q;
      search.addEventListener("input", function () {
        state.q = search.value.trim();
        render();
      });
    }

    var sort = $("#shopSort");
    if (sort) {
      sort.addEventListener("change", function () {
        state.sort = sort.value;
        render();
      });
    }

    var price = $("#priceRange");
    var priceOut = $("#priceOut");
    if (price) {
      price.addEventListener("input", function () {
        state.max = Number(price.value);
        if (priceOut) priceOut.textContent = money(state.max);
        render();
      });
      if (priceOut) priceOut.textContent = money(state.max);
    }

    var clear = $("#clearFilters");
    if (clear) {
      clear.addEventListener("click", function () {
        state.cats = [];
        state.q = "";
        state.max = 400;
        state.sort = "featured";
        boxes.forEach(function (b) { b.checked = false; });
        if (search) search.value = "";
        if (sort) sort.value = "featured";
        if (price) price.value = 400;
        if (priceOut) priceOut.textContent = money(400);
        render();
      });
    }

    var filterBtn = $("#filterToggle");
    var filterPanel = $("#filters");
    if (filterBtn && filterPanel) {
      filterBtn.addEventListener("click", function () {
        filterPanel.classList.toggle("show");
      });
      var closeF = $("#closeFilters");
      if (closeF) closeF.addEventListener("click", function () { filterPanel.classList.remove("show"); });
    }

    function render() {
      var list = S.products.filter(function (p) {
        if (state.cats.length && state.cats.indexOf(p.cat) === -1) return false;
        if (p.price > state.max) return false;
        if (state.q) {
          var hay = (p.name + " " + p.spec + " " + S.catName(p.cat)).toLowerCase();
          if (hay.indexOf(state.q.toLowerCase()) === -1) return false;
        }
        return true;
      });

      if (state.sort === "price-asc") list.sort(function (a, b) { return a.price - b.price; });
      else if (state.sort === "price-desc") list.sort(function (a, b) { return b.price - a.price; });
      else if (state.sort === "name") list.sort(function (a, b) { return a.name.localeCompare(b.name, "ar"); });
      else list.sort(function (a, b) { return (b.rating || 0) - (a.rating || 0); });

      grid.innerHTML = list.length
        ? list.map(card).join("")
        : '<div class="empty-state">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/></svg>' +
          "<b>لا توجد نتائج مطابقة</b>" +
          "<span>جرّب تعديل الفلاتر أو البحث بكلمة أخرى.</span></div>";

      var count = $("#resultCount");
      if (count) count.innerHTML = "عرض <b>" + list.length + "</b> من أصل " + S.products.length + " منتج";
    }

    // category counts
    $$("[data-cat-count]").forEach(function (el) {
      var id = el.getAttribute("data-cat-count");
      el.textContent = S.products.filter(function (p) { return p.cat === id; }).length;
    });

    render();
  }

  /* ---------- product detail ---------- */
  function initProduct() {
    var root = $("#pdp");
    if (!root) return;
    var params = new URLSearchParams(location.search);
    var p = S.byId(params.get("id")) || S.products[1];

    document.title = p.name + " | خالد العسيائي لصناعة الحديد ومواد البناء";
    var crumb = $("#pdpCrumb");
    if (crumb) crumb.textContent = p.name;

    $("#pdpCat").textContent = S.catName(p.cat);
    $("#pdpTitle").textContent = p.name;
    $("#pdpCode").textContent = "كود: AS-" + p.id.toUpperCase();
    $("#pdpPrice").textContent = money(p.price);
    $("#pdpUnit").textContent = "سعر الوحدة / " + p.unit;
    $("#pdpDesc").textContent = p.short;
    $("#pdpRating").innerHTML = '<span class="stars">' + stars() + "</span> " + p.rating + " من 5 · " + p.reviews + " تقييم موثّق";
    $("#pdpArt").innerHTML = S.art(p.art);

    var artWrap = $("#pdpArtWrap");
    var tf = [
      { t: "none", label: "أمامي" },
      { t: "rotate(-14deg) scale(.9)", label: "زاوية" },
      { t: "scale(1.32)", label: "تفاصيل" },
      { t: "scaleX(-1)", label: "معاكس" }
    ];
    var thumbs = $("#pdpThumbs");
    if (thumbs) {
      thumbs.innerHTML = tf
        .map(function (v, i) {
          return '<button class="pdp-thumb' + (i === 0 ? " active" : "") + '" data-tf="' + v.t + '" aria-label="' + v.label + '">' + S.art(p.art) + "</button>";
        })
        .join("");
      thumbs.addEventListener("click", function (e) {
        var b = e.target.closest(".pdp-thumb");
        if (!b) return;
        $$(".pdp-thumb", thumbs).forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        if (artWrap) artWrap.style.transform = b.getAttribute("data-tf");
      });
    }

    var specs = $("#pdpSpecs");
    if (specs) {
      specs.innerHTML = p.specs
        .map(function (r) { return "<tr><td>" + r[0] + "</td><td>" + r[1] + "</td></tr>"; })
        .join("");
    }

    var specs2 = $("#tabSpecs");
    if (specs2) {
      specs2.innerHTML =
        '<table class="spec-table">' +
        p.specs.map(function (r) { return "<tr><td>" + r[0] + "</td><td>" + r[1] + "</td></tr>"; }).join("") +
        "</table>";
    }

    var addBtn = $("#pdpAdd");
    if (addBtn) {
      addBtn.addEventListener("click", function () {
        var q = $("#pdpQty");
        addToCart(p.id, q ? q.value : 1);
      });
    }

    // tabs
    $$(".tab-btns button").forEach(function (b) {
      b.addEventListener("click", function () {
        $$(".tab-btns button").forEach(function (x) { x.classList.remove("active"); });
        $$(".tab-pane").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        var pane = $("#" + b.getAttribute("data-tab"));
        if (pane) pane.classList.add("active");
      });
    });

    // related
    var rel = $("#relatedGrid");
    if (rel) {
      var list = S.products.filter(function (x) { return x.cat === p.cat && x.id !== p.id; }).slice(0, 4);
      if (list.length < 4) {
        list = list.concat(S.products.filter(function (x) { return x.id !== p.id && list.indexOf(x) === -1; }).slice(0, 4 - list.length));
      }
      rel.innerHTML = list.map(card).join("");
    }
  }

  /* ---------- calculator ---------- */
  function initCalc() {
    var dia = $("#calcDia");
    if (!dia) return;
    var len = $("#calcLen"), qty = $("#calcQty");
    var priceMap = { 8: 239.5, 10: 236, 12: 231, 14: 229, 16: 227.5, 18: 228.5, 20: 229, 25: 232.5, 32: 236.5 };
    var weightEl = $("#calcWeight"), barsEl = $("#calcBars"), priceTonEl = $("#calcTonPrice"), totalEl = $("#calcTotal");

    function update() {
      var d = Number(dia.value);
      var meters = Number(len.value);
      var count = Math.max(1, Number(qty.value) || 1);
      var kgPerM = (d * d) / 162;
      var totalKg = kgPerM * meters * count;
      var tons = totalKg / 1000;
      var perTon = priceMap[d] || 230;
      var price = tons * perTon;
      weightEl.textContent = tons.toFixed(2);
      barsEl.textContent = count + " سيخ × " + meters + " م";
      priceTonEl.textContent = money(perTon);
      totalEl.textContent = money(price) + " (قبل الضريبة)";
    }

    [dia, len, qty].forEach(function (el) {
      el.addEventListener("input", update);
      el.addEventListener("change", update);
    });
    update();
  }

  /* ---------- FAQ ---------- */
  function initFaq() {
    $$(".faq-q").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".faq");
        var answer = $(".faq-a", item);
        var isOpen = item.classList.contains("open");
        $$(".faq").forEach(function (f) {
          f.classList.remove("open");
          var a = $(".faq-a", f);
          if (a) a.style.maxHeight = "0px";
        });
        if (!isOpen) {
          item.classList.add("open");
          if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------- reveal / counters ---------- */
  function initReveal() {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(function (el) { io.observe(el); });

    var counters = $$("[data-count]");
    if (!counters.length) return;
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var el = en.target;
          var target = Number(el.getAttribute("data-count"));
          var suffix = el.getAttribute("data-suffix") || "";
          var start = performance.now();
          var dur = 1500;
          function tick(now) {
            var pr = Math.min(1, (now - start) / dur);
            var eased = 1 - Math.pow(1 - pr, 3);
            el.textContent = Math.round(target * eased).toLocaleString("en-US") + suffix;
            if (pr < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          cio.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- global handlers ---------- */
  function initGlobal() {
    var header = $(".header");
    window.addEventListener("scroll", function () {
      if (header) header.classList.toggle("scrolled", window.scrollY > 16);
    }, { passive: true });

    var burger = $("#burger");
    if (burger) {
      burger.addEventListener("click", function () {
        document.body.classList.toggle("nav-open");
        burger.setAttribute("aria-expanded", document.body.classList.contains("nav-open") ? "true" : "false");
      });
      $$(".mobile-nav a").forEach(function (a) {
        a.addEventListener("click", function () { document.body.classList.remove("nav-open"); });
      });
    }

    // search overlay
    var searchPop = $("#searchPop");
    function openSearch() {
      if (!searchPop) { location.href = "shop.html"; return; }
      searchPop.classList.add("open");
      var i = $("input", searchPop);
      if (i) setTimeout(function () { i.focus(); }, 80);
    }
    $$("[data-open-search]").forEach(function (b) { b.addEventListener("click", openSearch); });
    if (searchPop) {
      searchPop.addEventListener("click", function (e) {
        if (e.target === searchPop) searchPop.classList.remove("open");
      });
      var sf = $("form", searchPop);
      if (sf) {
        sf.addEventListener("submit", function (e) {
          e.preventDefault();
          var q = $("input", sf).value.trim();
          location.href = "shop.html" + (q ? "?q=" + encodeURIComponent(q) : "");
        });
      }
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        if (searchPop) searchPop.classList.remove("open");
        closeDrawer();
      }
    });

    // cart triggers
    $$("[data-open-cart]").forEach(function (b) {
      b.addEventListener("click", function (e) { e.preventDefault(); openDrawer(); });
    });
    $$("[data-quote-open]").forEach(function (b) {
      b.addEventListener("click", function (e) { e.preventDefault(); openDrawer(); });
    });
    var overlay = $("#overlay");
    if (overlay) overlay.addEventListener("click", closeDrawer);
    var closeBtn = $("#drawerClose");
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);

    // delegated cart actions
    document.addEventListener("click", function (e) {
      var add = e.target.closest("[data-add]");
      if (add) {
        e.preventDefault();
        addToCart(add.getAttribute("data-add"), 1);
        return;
      }
      var view = e.target.closest("[data-view]");
      if (view) {
        location.href = "product.html?id=" + view.getAttribute("data-view");
        return;
      }
      var inc = e.target.closest("[data-inc]");
      if (inc) {
        var id = inc.getAttribute("data-inc");
        var c = readCart();
        setQty(id, (c[id] || 0) + 1);
        return;
      }
      var dec = e.target.closest("[data-dec]");
      if (dec) {
        var id2 = dec.getAttribute("data-dec");
        var c2 = readCart();
        setQty(id2, (c2[id2] || 0) - 1);
        return;
      }
      var rem = e.target.closest("[data-remove]");
      if (rem) {
        setQty(rem.getAttribute("data-remove"), 0);
        toast("تم حذف المنتج من طلب العرض");
      }
    });

    // quote flow
    var next = $("#quoteNext");
    if (next) next.addEventListener("click", showQuoteStep);
    var back = $("#quoteBack");
    if (back) back.addEventListener("click", showCartStep);
    var qf = $("#quoteForm");
    if (qf) {
      qf.addEventListener("submit", function (e) {
        e.preventDefault();
        var ref = "AS-" + new Date().toISOString().slice(2, 10).replace(/-/g, "") + "-" + Math.floor(1000 + Math.random() * 9000);
        var refEl = $("#quoteRef");
        if (refEl) refEl.textContent = ref;
        $("#quoteStep").classList.remove("show");
        var ok = $("#quoteSuccess");
        if (ok) ok.classList.add("show");
        localStorage.removeItem(CART_KEY);
        syncCartUI();
      });
    }

    // quantity steppers (global)
    $$("[data-step]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = $(btn.getAttribute("data-step"));
        if (!target) return;
        var v = Math.max(1, (parseInt(target.value, 10) || 1) + Number(btn.getAttribute("data-dir")));
        target.value = v;
      });
    });

    // newsletter + contact forms
    $$("form[data-fake]").forEach(function (f) {
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        toast(f.getAttribute("data-fake") || "تم الإرسال بنجاح");
        f.reset();
      });
    });

    // footer year
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    $$("[data-art]").forEach(function (el) {
      el.innerHTML = S.art(el.getAttribute("data-art"));
    });
    $$(".ticker-track").forEach(function (t) {
      t.innerHTML += t.innerHTML;
    });
    renderFeatured();
    initShop();
    initProduct();
    initCalc();
    initFaq();
    initReveal();
    initGlobal();
    syncCartUI();
  });
})();
