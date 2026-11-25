/* =========================================================
   AL-ASAI STEEL — Catalog data + product illustrations
   ========================================================= */
(function (global) {
  "use strict";

  var uidCounter = 0;
  function uid() {
    uidCounter += 1;
    return "a" + uidCounter + Math.random().toString(36).slice(2, 6);
  }

  function wrap(inner) {
    return (
      '<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false">' +
      inner +
      "</svg>"
    );
  }

  function defs(u) {
    return (
      '<defs>' +
      '<linearGradient id="g' + u + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#ffe3ab"/><stop offset=".34" stop-color="#eeb455"/>' +
      '<stop offset=".68" stop-color="#c1842f"/><stop offset="1" stop-color="#7c4c16"/></linearGradient>' +
      '<linearGradient id="s' + u + '" x1="0" y1="0" x2="0.2" y2="1">' +
      '<stop offset="0" stop-color="#dfe6ee"/><stop offset=".3" stop-color="#a9b4c0"/>' +
      '<stop offset=".66" stop-color="#727e8b"/><stop offset="1" stop-color="#3d4650"/></linearGradient>' +
      '<linearGradient id="d' + u + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#39424d"/><stop offset="1" stop-color="#151a20"/></linearGradient>' +
      "</defs>"
    );
  }

  /* ---------- illustrations ---------- */
  function rebar() {
    var u = uid();
    var g = "url(#g" + u + ")";
    var bars = "";
    [96, 156, 216, 276].forEach(function (x) {
      bars += '<g transform="rotate(-11 ' + x + ' 158)">';
      bars +=
        '<rect x="' + (x - 18) + '" y="44" width="36" height="236" rx="18" fill="' + g +
        '" stroke="#6d4415" stroke-width="1.4"/>';
      bars +=
        '<rect x="' + (x - 18) + '" y="44" width="10" height="236" rx="5" fill="#fff" opacity=".18"/>';
      for (var y = 62; y < 276; y += 21) {
        bars +=
          '<path d="M' + (x - 18) + " " + y + " q18 8 36 0" +
          '" fill="none" stroke="#7b4d18" stroke-width="3" opacity=".45"/>';
      }
      bars += '<ellipse cx="' + x + '" cy="44" rx="18" ry="6.5" fill="#eec078" opacity=".92"/>';
      bars += '<ellipse cx="' + x + '" cy="44" rx="8" ry="3" fill="#8a5a1e" opacity=".65"/>';
      bars += "</g>";
    });
    return wrap(
      defs(u) +
        '<ellipse cx="192" cy="296" rx="122" ry="14" fill="#000" opacity=".32"/>' +
        bars
    );
  }

  function coil() {
    var u = uid();
    var g = "url(#g" + u + ")";
    var rings = "";
    for (var r = 100; r >= 26; r -= 9) {
      rings +=
        '<circle cx="196" cy="158" r="' + r + '" fill="none" stroke="' + g +
        '" stroke-width="7" opacity="' + (0.55 + (100 - r) / 400).toFixed(2) + '"/>';
    }
    return wrap(
      defs(u) +
        '<ellipse cx="196" cy="290" rx="118" ry="13" fill="#000" opacity=".3"/>' +
        '<g transform="rotate(-9 196 158)">' +
        '<path d="M96 158 h-52" stroke="#9a6420" stroke-width="9" stroke-linecap="round"/>' +
        '<path d="M296 158 h44 q14 0 14 14 v58" stroke="#9a6420" stroke-width="9" fill="none" stroke-linecap="round"/>' +
        rings +
        '<circle cx="196" cy="158" r="24" fill="#0e1216" stroke="' + g + '" stroke-width="6"/>' +
        '<path d="M120 120 a86 86 0 0 1 118 -14" fill="none" stroke="#fff" stroke-width="4" opacity=".25" stroke-linecap="round"/>' +
        "</g>"
    );
  }

  function pipe() {
    var u = uid();
    var s = "url(#s" + u + ")";
    var out = "";
    [80, 148, 216].forEach(function (y, i) {
      out += '<g transform="rotate(-7 200 ' + (y + 30) + ')">';
      out +=
        '<rect x="72" y="' + y + '" width="252" height="58" rx="29" fill="' + s +
        '" stroke="#2c343d" stroke-width="1.4"/>';
      out +=
        '<rect x="86" y="' + (y + 7) + '" width="222" height="10" rx="5" fill="#fff" opacity="' +
        (0.24 - i * 0.04) + '"/>';
      out +=
        '<ellipse cx="324" cy="' + (y + 29) + '" rx="11" ry="29" fill="#4d5864"/>';
      out +=
        '<ellipse cx="324" cy="' + (y + 29) + '" rx="7.5" ry="21" fill="#0c1013"/>';
      out +=
        '<ellipse cx="72" cy="' + (y + 29) + '" rx="8" ry="29" fill="#5c6773"/>';
      out += "</g>";
    });
    return wrap(
      defs(u) +
        '<ellipse cx="200" cy="298" rx="128" ry="13" fill="#000" opacity=".3"/>' + out
    );
  }

  function sheet() {
    var u = uid();
    var s = "url(#s" + u + ")";
    var d = "url(#d" + u + ")";
    var out = "";
    [0, 1, 2].forEach(function (i) {
      var y = 96 + i * 40;
      out +=
        '<polygon points="200,' + (y - 44) + " 326," + (y + 12) + " 200," + (y + 68) + " 74," + (y + 12) +
        '" fill="' + s + '" stroke="#39424c" stroke-width="1.2"/>';
      out +=
        '<polygon points="74,' + (y + 12) + " 200," + (y + 68) + " 200," + (y + 82) + " 74," + (y + 26) +
        '" fill="#5d6874"/>';
      out +=
        '<polygon points="200,' + (y + 68) + " 326," + (y + 12) + " 326," + (y + 26) + " 200," + (y + 82) +
        '" fill="#414b55"/>';
      out +=
        '<polyline points="92,' + (y + 16) + " 200," + (y + 64) + " 306," + (y + 17) +
        '" fill="none" stroke="#fff" opacity=".22" stroke-width="2"/>';
    });
    return wrap(
      defs(u) +
        '<ellipse cx="200" cy="290" rx="118" ry="12" fill="#000" opacity=".3"/>' + out
    );
  }

  function cement() {
    var u = uid();
    return wrap(
      defs(u) +
        '<ellipse cx="200" cy="284" rx="104" ry="12" fill="#000" opacity=".32"/>' +
        '<g transform="rotate(-2 200 168)">' +
        '<path d="M124 92 h152 a14 14 0 0 1 14 14 v122 a14 14 0 0 1 -14 14 h-152 a14 14 0 0 1 -14 -14 v-122 a14 14 0 0 1 14 -14 z" fill="#d9d2c3"/>' +
        '<path d="M124 92 h152 a14 14 0 0 1 14 14 v10 h-180 v-10 a14 14 0 0 1 14 -14 z" fill="#c3bba9"/>' +
        '<path d="M116 152 h168 v54 h-168 z" fill="#1d232a"/>' +
        '<path d="M116 146 h168 v6 h-168 z" fill="#c99a4b"/>' +
        '<text x="200" y="176" text-anchor="middle" font-family="Cairo, sans-serif" font-size="24" font-weight="700" fill="#f0e6d2">AL-ASAI</text>' +
        '<text x="200" y="196" text-anchor="middle" font-family="Cairo, sans-serif" font-size="11" fill="#c9a25f">CEMENT · 50 KG</text>' +
        '<path d="M140 224 h120 M140 236 h84" stroke="#b1a897" stroke-width="5" stroke-linecap="round"/>' +
        '<path d="M150 92 v-18 M250 92 v-18" stroke="#b6ad9b" stroke-width="4"/>' +
        '<path d="M132 74 h136" stroke="#b6ad9b" stroke-width="6" stroke-linecap="round"/>' +
        "</g>"
    );
  }

  function block() {
    var u = uid();
    function brick(cx, cy, w, h, dph, top, left, right) {
      var x1 = cx - w, x2 = cx + w, y0 = cy, y1 = cy + dph;
      return (
        '<polygon points="' + x1 + "," + y0 + " " + cx + "," + (y0 - dph) + " " + x2 + "," + y0 + " " + cx + "," + (y0 + dph) + '" fill="' + top + '"/>' +
        '<polygon points="' + x1 + "," + y0 + " " + cx + "," + (y0 + dph) + " " + cx + "," + (y0 + dph + h) + " " + x1 + "," + (y0 + h) + '" fill="' + left + '"/>' +
        '<polygon points="' + cx + "," + (y0 + dph) + " " + x2 + "," + y0 + " " + x2 + "," + (y0 + h) + " " + cx + "," + (y0 + dph + h) + '" fill="' + right + '"/>'
      );
    }
    return wrap(
      defs(u) +
        '<ellipse cx="200" cy="296" rx="128" ry="12" fill="#000" opacity=".3"/>' +
        brick(140, 214, 78, 42, 34, "#c4cbd2", "#949ea9", "#77828d") +
        brick(258, 214, 78, 42, 34, "#c4cbd2", "#949ea9", "#77828d") +
        brick(199, 144, 78, 42, 34, "#d2d9e0", "#a3adb8", "#838e99") +
        '<text x="199" y="204" text-anchor="middle" font-family="Cairo, sans-serif" font-size="11" fill="#5c6773">20 CM</text>'
    );
  }

  function mesh() {
    var u = uid();
    var s = "url(#s" + u + ")";
    var inner = "";
    for (var x = 100; x <= 300; x += 20) {
      inner += '<line x1="' + x + '" y1="78" x2="' + x + '" y2="242"/>';
    }
    for (var y = 78; y <= 242; y += 20) {
      inner += '<line x1="100" y1="' + y + '" x2="300" y2="' + y + '"/>';
    }
    return wrap(
      defs(u) +
        '<ellipse cx="200" cy="282" rx="120" ry="12" fill="#000" opacity=".3"/>' +
        '<g transform="rotate(-9 200 160)">' +
        '<rect x="92" y="70" width="216" height="180" rx="4" fill="#10151a" stroke="' + s + '" stroke-width="7"/>' +
        '<g stroke="#9fabb8" stroke-width="4">' + inner + "</g>" +
        '<rect x="92" y="70" width="216" height="180" rx="4" fill="none" stroke="' + s + '" stroke-width="6"/>' +
        "</g>"
    );
  }

  function angle() {
    var u = uid();
    var s = "url(#s" + u + ")";
    return wrap(
      defs(u) +
        '<ellipse cx="200" cy="286" rx="118" ry="12" fill="#000" opacity=".3"/>' +
        '<g transform="rotate(-4 200 160)">' +
        '<polygon points="128,74 172,74 172,166 286,166 286,210 128,210" fill="' + s + '" stroke="#333c46" stroke-width="1.4"/>' +
        '<polygon points="128,74 172,74 172,166 286,166 286,178 160,178 160,74" fill="#fff" opacity=".1"/>' +
        '<polygon points="172,166 286,166 286,178 172,178" fill="#2c353e" opacity=".35"/>' +
        '<circle cx="150" cy="96" r="5" fill="#2b333c"/>' +
        '<circle cx="150" cy="186" r="5" fill="#2b333c"/>' +
        "</g>" +
        '<text x="200" y="262" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-size="13" letter-spacing="3" fill="#8f9aa6">50 × 50 × 5</text>'
    );
  }

  function insulation() {
    var u = uid();
    return wrap(
      defs(u) +
        '<ellipse cx="200" cy="288" rx="124" ry="12" fill="#000" opacity=".3"/>' +
        '<path d="M228 96 q92 62 96 96 t-84 100 l-24 4 q64 -78 12 -104 z" fill="#2f3842"/>' +
        '<ellipse cx="176" cy="158" rx="84" ry="84" fill="#3b4550"/>' +
        '<ellipse cx="176" cy="158" rx="84" ry="84" fill="none" stroke="#59646f" stroke-width="2"/>' +
        '<ellipse cx="176" cy="158" rx="62" ry="62" fill="none" stroke="#7c8792" stroke-width="3"/>' +
        '<ellipse cx="176" cy="158" rx="40" ry="40" fill="none" stroke="#9aa5b1" stroke-width="3"/>' +
        '<ellipse cx="176" cy="158" rx="18" ry="18" fill="#171d24" stroke="#aeb9c4" stroke-width="3"/>' +
        '<path d="M120 108 a84 84 0 0 1 92 -26" fill="none" stroke="#fff" opacity=".22" stroke-width="7" stroke-linecap="round"/>' +
        '<path d="M232 108 q70 44 62 84" fill="none" stroke="#c9a25f" stroke-width="3" opacity=".6"/>'
    );
  }

  function tool() {
    var u = uid();
    var s = "url(#s" + u + ")";
    return wrap(
      defs(u) +
        '<ellipse cx="200" cy="284" rx="100" ry="12" fill="#000" opacity=".3"/>' +
        '<g transform="translate(200 158)">' +
        '<polygon points="0,-88 76,-44 76,44 0,88 -76,44 -76,-44" fill="' + s + '" stroke="#2f3841" stroke-width="1.5"/>' +
        '<polygon points="0,-88 76,-44 76,44 0,88 0,70 58,34 58,-36 0,-70" fill="#fff" opacity=".14"/>' +
        '<circle cx="0" cy="0" r="40" fill="#12171c" stroke="#68737f" stroke-width="4"/>' +
        '<circle cx="0" cy="0" r="40" fill="none" stroke="#000" opacity=".25" stroke-width="10"/>' +
        "</g>"
    );
  }

  var ART = {
    rebar: rebar,
    coil: coil,
    pipe: pipe,
    sheet: sheet,
    cement: cement,
    block: block,
    mesh: mesh,
    angle: angle,
    insulation: insulation,
    tool: tool
  };

  function art(kind) {
    return (ART[kind] || rebar)();
  }

  /* ---------- categories ---------- */
  var CATS = [
    { id: "rebar", name: "حديد التسليح", desc: "أسياخ ولفائف مشغولة بمعايير B500B", art: "rebar" },
    { id: "sheet", name: "الصفائح واللفائف", desc: "صاج مجلفن وأسود بجميع السماكات", art: "sheet" },
    { id: "pipe", name: "الأنابيب والمقاطع", desc: "أنابيب مجلفنة وزوايا ومجاري حديد", art: "pipe" },
    { id: "cement", name: "الأسمنت والخرسانة", desc: "أسمنت بورتلاندي وخرسانة جاهزة", art: "cement" },
    { id: "block", name: "البلوك والطوب", desc: "بلوك إسمنتي وطوب مثقب معزول", art: "block" },
    { id: "mesh", name: "الشبك والعوازل", desc: "شبك ملحوم وعزل مائي وحراري", art: "mesh" }
  ];

  /* ---------- products ---------- */
  var PRODUCTS = [
    {
      id: "rb-8",
      name: "حديد تسليح 8 مم – B500B",
      cat: "rebar",
      art: "rebar",
      price: 239.5,
      unit: "طن",
      badge: "الأكثر مبيعاً",
      badgeType: "",
      rating: 4.9,
      reviews: 128,
      popular: true,
      spec: "أسياخ 12 م · مطابق لـ BS 4449",
      short:
        "أسياخ تسليح عالية المقاومة بقطر 8 مم، مناسبة للكانات والأعمال الدقيقة، مع شهادة مطابقة للمواصفات.",
      specs: [
        ["القطر", "8 مم"],
        ["الطول", "12 متر"],
        ["درجة الفولاذ", "B500B"],
        ["المعيار", "BS 4449 / مواصفة عمانية"],
        ["وزن الطن", "تقريباً 205 سيخ"],
        ["بلد المنشأ", "الإمارات العربية المتحدة"]
      ]
    },
    {
      id: "rb-12",
      name: "حديد تسليح 12 مم – B500B",
      cat: "rebar",
      art: "rebar",
      price: 231.0,
      unit: "طن",
      badge: "الأكثر طلباً",
      badgeType: "",
      rating: 4.9,
      reviews: 96,
      popular: true,
      spec: "أسياخ 12 م · شد عالي",
      short:
        "القطر الأكثر استخداماً في الأعمدة والجسور، مقاومة شد عالية وقابلية لحام ممتازة.",
      specs: [
        ["القطر", "12 مم"],
        ["الطول", "12 متر"],
        ["درجة الفولاذ", "B500B"],
        ["المعيار", "BS 4449 / مواصفة عمانية"],
        ["وزن الطن", "تقريباً 92 سيخ"],
        ["بلد المنشأ", "الإمارات العربية المتحدة"]
      ]
    },
    {
      id: "rb-16",
      name: "حديد تسليح 16 مم – B500B",
      cat: "rebar",
      art: "rebar",
      price: 227.5,
      unit: "طن",
      rating: 4.8,
      reviews: 74,
      spec: "أسياخ 12 م · للمنشآت الثقيلة",
      short:
        "حديد تسليح للعناصر الإنشائية الرئيسية، مرن ومقاوم للصدأ السطحي ومطابق لمعايير الجودة.",
      specs: [
        ["القطر", "16 مم"],
        ["الطول", "12 متر"],
        ["درجة الفولاذ", "B500B"],
        ["المعيار", "BS 4449"],
        ["وزن الطن", "تقريباً 52 سيخ"],
        ["بلد المنشأ", "الإمارات العربية المتحدة"]
      ]
    },
    {
      id: "rb-20",
      name: "حديد تسليح 20 مم – B500B",
      cat: "rebar",
      art: "rebar",
      price: 229.0,
      unit: "طن",
      rating: 4.8,
      reviews: 51,
      spec: "أسياخ 12 م · تحمل عالي",
      short:
        "أسياخ سميكة للأعمدة والقواعد الخرسانية، تم اختبارها ميكانيكياً في مختبرات معتمدة.",
      specs: [
        ["القطر", "20 مم"],
        ["الطول", "12 متر"],
        ["درجة الفولاذ", "B500B"],
        ["المعيار", "BS 4449"],
        ["وزن الطن", "تقريباً 33 سيخ"],
        ["بلد المنشأ", "الإمارات العربية المتحدة"]
      ]
    },
    {
      id: "rb-25",
      name: "حديد تسليح 25 مم – B500B",
      cat: "rebar",
      art: "rebar",
      price: 232.5,
      unit: "طن",
      rating: 4.7,
      reviews: 33,
      spec: "أسياخ 12 م · للمشاريع الكبرى",
      short:
        "للجسور الممتدة والأساسات العميقة، توفر كميات كبيرة مع جدول تسليم للمشاريع.",
      specs: [
        ["القطر", "25 مم"],
        ["الطول", "12 متر"],
        ["درجة الفولاذ", "B500B"],
        ["المعيار", "BS 4449"],
        ["وزن الطن", "تقريباً 21 سيخ"],
        ["بلد المنشأ", "الإمارات العربية المتحدة"]
      ]
    },
    {
      id: "coil-65",
      name: "لفائف حديد مسحوب 6.5 مم",
      cat: "rebar",
      art: "coil",
      price: 246.0,
      unit: "طن",
      badge: "جديد",
      badgeType: "b-new",
      rating: 4.8,
      reviews: 42,
      popular: true,
      spec: "لفة 2 طن · سحب على البارد",
      short:
        "لفائف أسلاك مسحوبة على البارد تُستخدم في الشبك والكانات وأعمال الربط، بمرونة عالية.",
      specs: [
        ["القطر", "6.5 مم"],
        ["وزن اللفة", "2 طن تقريباً"],
        ["التصنيع", "سحب على البارد"],
        ["الاستخدام", "شبك، كانات، ربط"],
        ["المعيار", "EN 10016"],
        ["بلد المنشأ", "عُمان"]
      ]
    },
    {
      id: "sh-galv",
      name: "صاج مجلفن 1 مم – 1×2 م",
      cat: "sheet",
      art: "sheet",
      price: 14.75,
      unit: "لوح",
      badge: "عرض",
      badgeType: "b-sale",
      rating: 4.7,
      reviews: 61,
      spec: "طلاء زنك 120 جم/م²",
      short:
        "ألواح مجلفنة مقاومة للصدأ مناسبة للأسقف والمجاري والتكسيات الخارجية.",
      specs: [
        ["السماكة", "1 مم"],
        ["المقاس", "1 × 2 متر"],
        ["الطلاء", "زنك 120 جم/م²"],
        ["السطح", "أملس مجلفن"],
        ["المعيار", "ASTM A653"],
        ["بلد المنشأ", "الصين"]
      ]
    },
    {
      id: "sh-black",
      name: "صاج أسود 3 مم – 1×2 م",
      cat: "sheet",
      art: "sheet",
      price: 27.3,
      unit: "لوح",
      rating: 4.6,
      reviews: 28,
      spec: "كربوني · قابل للحام والقص",
      short:
        "ألواح فولاذية كربونية للسماكات المتوسطة، مثالية للهياكل المعدنية والتصنيع.",
      specs: [
        ["السماكة", "3 مم"],
        ["المقاس", "1 × 2 متر"],
        ["النوع", "فولاذ كربوني"],
        ["الوزن", "47 كجم تقريباً"],
        ["المعيار", "ASTM A36"],
        ["بلد المنشأ", "الصين"]
      ]
    },
    {
      id: "pipe-galv-2",
      name: "أنابيب مجلفنة 2 إنش – 6 م",
      cat: "pipe",
      art: "pipe",
      price: 9.85,
      unit: "أنبوب",
      rating: 4.7,
      reviews: 39,
      spec: "جدول 40 · ملحوم طولياً",
      short:
        "أنابيب مجلفنة للسوائل والهياكل الخفيفة، مقاومة للتآكل ومطابقة للأبعاد القياسية.",
      specs: [
        ["القطر الاسمي", "2 إنش"],
        ["الطول", "6 متر"],
        ["السماكة", "3.9 مم (Sch 40)"],
        ["النوع", "مجلفن ملحوم"],
        ["المعيار", "ASTM A53"],
        ["بلد المنشأ", "الإمارات العربية المتحدة"]
      ]
    },
    {
      id: "pipe-black-3",
      name: "أنابيب سوداء 3 إنش – 6 م",
      cat: "pipe",
      art: "pipe",
      price: 13.4,
      unit: "أنبوب",
      rating: 4.6,
      reviews: 22,
      spec: "سماكة 4.5 مم · بدون طلاء",
      short:
        "أنابيب فولاذية سوداء للتمديدات الصناعية وأعمال اللحام، مقاومة للضغط العالي.",
      specs: [
        ["القطر الاسمي", "3 إنش"],
        ["الطول", "6 متر"],
        ["السماكة", "4.5 مم"],
        ["النوع", "فولاذ أسود"],
        ["المعيار", "ASTM A53"],
        ["بلد المنشأ", "الإمارات العربية المتحدة"]
      ]
    },
    {
      id: "angle-50",
      name: "زوايا حديد 50×50×5 – 6 م",
      cat: "pipe",
      art: "angle",
      price: 6.9,
      unit: "مقطع",
      rating: 4.8,
      reviews: 47,
      spec: "قطر 50 مم · سماكة 5 مم",
      short:
        "زوايا فولاذية متساوية الأضلاع لأعمال الهياكل والأرفف والدعامات، قصّ حسب الطلب.",
      specs: [
        ["المقاس", "50 × 50 مم"],
        ["السماكة", "5 مم"],
        ["الطول", "6 متر"],
        ["الوزن", "22.3 كجم"],
        ["المعيار", "EN 10056"],
        ["بلد المنشأ", "تركيا"]
      ]
    },
    {
      id: "cem-opc",
      name: "أسمنت بورتلاندي OPC – 50 كجم",
      cat: "cement",
      art: "cement",
      price: 3.15,
      unit: "كيس",
      badge: "الأكثر مبيعاً",
      badgeType: "",
      rating: 4.9,
      reviews: 214,
      popular: true,
      spec: "درجة 42.5 · تخزين جاف",
      short:
        "أسمنت بورتلاندي عادي للاستخدامات الإنشائية العامة، زمن شك مناسب وقوة ضغط عالية.",
      specs: [
        ["الوزن", "50 كجم"],
        ["الدرجة", "CEM I 42.5 N"],
        ["زمن الشك الابتدائي", "45 – 90 دقيقة"],
        ["قوة الضغط 28 يوم", "≥ 42.5 ميجا باسكال"],
        ["المعيار", "EN 197-1 / GSO"],
        ["بلد المنشأ", "عُمان"]
      ]
    },
    {
      id: "cem-src",
      name: "أسمنت مقاوم للكبريتات – 50 كجم",
      cat: "cement",
      art: "cement",
      price: 3.75,
      unit: "كيس",
      rating: 4.8,
      reviews: 58,
      spec: "للأساسات والبيئات المالحة",
      short:
        "أسمنت مقاوم للكبريتات مناسب للأساسات والأعمال البحرية والتربة العدوانية.",
      specs: [
        ["الوزن", "50 كجم"],
        ["الدرجة", "CEM III / SRPC"],
        ["الاستخدام", "أساسات، بيئات مالحة"],
        ["مقاومة الكبريتات", "عالية"],
        ["المعيار", "EN 197-1 / GSO"],
        ["بلد المنشأ", "عُمان"]
      ]
    },
    {
      id: "concrete-c35",
      name: "خرسانة جاهزة C35 – م³",
      cat: "cement",
      art: "cement",
      price: 34.5,
      unit: "متر مكعب",
      badge: "توصيل بالمضخة",
      badgeType: "b-new",
      rating: 4.9,
      reviews: 31,
      spec: "هبوط 120 مم · مضخة متاحة",
      short:
        "خرسانة جاهزة بدرجة C35 تُورّد بموقع المشروع مع مضخة، واختبار مكعبات في مختبر معتمد.",
      specs: [
        ["الدرجة", "C35 / 45"],
        ["الهبوط", "120 ± 20 مم"],
        ["الركام", "20 مم"],
        ["الإضافات", "ملدنات ومواد تقليل ماء"],
        ["الحد الأدنى للطلب", "6 م³"],
        ["زمن التوريد", "24 – 48 ساعة"]
      ]
    },
    {
      id: "blk-20",
      name: "بلوك إسمنتي 20 سم",
      cat: "block",
      art: "block",
      price: 0.34,
      unit: "حبة",
      rating: 4.7,
      reviews: 88,
      spec: "مقاس 40×20×20 · حد أدنى 1000",
      short:
        "بلوك إسمنتي مجوّف عازل للحرارة، مناسب للجدران الخارجية والداخلية.",
      specs: [
        ["المقاس", "40 × 20 × 20 سم"],
        ["النوع", "بلوك مجوّف"],
        ["المقاومة", "≥ 3.5 ميجا باسكال"],
        ["الحد الأدنى للطلب", "1000 حبة"],
        ["المعيار", "مواصفة عمانية"],
        ["بلد المنشأ", "عُمان"]
      ]
    },
    {
      id: "brk-red",
      name: "طوب أحمر مثقب",
      cat: "block",
      art: "block",
      price: 0.19,
      unit: "حبة",
      rating: 4.6,
      reviews: 64,
      spec: "مقاس 24×11×7 · حد أدنى 2000",
      short:
        "طوب طيني مثقب للجدران الداخلية، خفيف الوزن وجيد التماسك مع المونة.",
      specs: [
        ["المقاس", "24 × 11 × 7 سم"],
        ["النوع", "طيني مثقب"],
        ["الاستخدام", "جدران داخلية"],
        ["الحد الأدنى للطلب", "2000 حبة"],
        ["بلد المنشأ", "عُمان"],
        ["التوصيل", "شاحنة كاملة"]
      ]
    },
    {
      id: "mesh-52",
      name: "شبك حديد ملحوم 5×2 م",
      cat: "mesh",
      art: "mesh",
      price: 22.4,
      unit: "لوح",
      rating: 4.8,
      reviews: 36,
      spec: "قطر 4 مم · فتحات 15×15 سم",
      short:
        "شبك ملحوم للأرضيات والسقوف، يقلل وقت التسليح ويزيد التوزيع المنتظم للأحمال.",
      specs: [
        ["المقاس", "5 × 2 متر"],
        ["قطر السلك", "4 مم"],
        ["فتحات الشبك", "15 × 15 سم"],
        ["الوزن", "24 كجم"],
        ["المعيار", "BS 4483"],
        ["بلد المنشأ", "الإمارات العربية المتحدة"]
      ]
    },
    {
      id: "ins-bit",
      name: "عزل مائي بيتوميني 10 م²",
      cat: "mesh",
      art: "insulation",
      price: 16.75,
      unit: "رول",
      rating: 4.7,
      reviews: 44,
      spec: "رول 1×10 م · ذاتي اللصق",
      short:
        "رول عزل بيتوميني مُسَلَّح للمناطق الرطبة والأسطح، مقاوم للماء وذو التصاق قوي.",
      specs: [
        ["المقاس", "1 × 10 متر"],
        ["المساحة", "10 م²"],
        ["النوع", "بيتوميني مقوّى"],
        ["التركيب", "ذاتي اللصق / بالحرارة"],
        ["المعيار", "EN 13707"],
        ["بلد المنشأ", "تركيا"]
      ]
    },
    {
      id: "ins-xps",
      name: "ألواح عزل حراري XPS 5 سم",
      cat: "mesh",
      art: "insulation",
      price: 24.9,
      unit: "لوح",
      rating: 4.8,
      reviews: 19,
      spec: "مقاس 60×125 سم · كثافة 35",
      short:
        "ألواح بوليسترين مبثوقة عالية الكثافة للعزل الحراري للأسطح والجدران.",
      specs: [
        ["السماكة", "5 سم"],
        ["المقاس", "60 × 125 سم"],
        ["الكثافة", "35 كجم/م³"],
        ["التوصيل الحراري", "0.029 W/m·K"],
        ["المعيار", "EN 13164"],
        ["بلد المنشأ", "الإمارات العربية المتحدة"]
      ]
    },
    {
      id: "tool-bolt",
      name: "مسامير وبراغي إنشائية – عبوة",
      cat: "mesh",
      art: "tool",
      price: 4.5,
      unit: "عبوة 100 حبة",
      rating: 4.5,
      reviews: 25,
      spec: "مجلفن · مقاسات متعددة",
      short:
        "عبوة مسامير إنشائية مجلفنة عالية التحمل، متوفرة بمقاسات متعددة للاستخدامات المعدنية.",
      specs: [
        ["العدد", "100 حبة"],
        ["الطلاء", "مجلفن"],
        ["المقاسات", "M8 – M16"],
        ["درجة الصلابة", "8.8"],
        ["الاستخدام", "تثبيت معدني وإنشائي"],
        ["بلد المنشأ", "الصين"]
      ]
    }
  ];

  var featured = PRODUCTS.filter(function (p) { return p.popular; }).slice(0, 4);

  global.STORE = {
    cats: CATS,
    products: PRODUCTS,
    featured: featured,
    art: art,
    catName: function (id) {
      for (var i = 0; i < CATS.length; i++) if (CATS[i].id === id) return CATS[i].name;
      return "";
    },
    byId: function (id) {
      for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i];
      return null;
    }
  };
})(window);
