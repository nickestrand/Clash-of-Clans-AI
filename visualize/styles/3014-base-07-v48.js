function setHeroes() {
    for (var t = 0, i = 0, n = 2; n <= 40; n++) statsV.time.herobarbarian[n] = n < 15 ? (n - 1) * 720 : 10080, statsV.time.heroarcher[n] = n < 15 ? (n - 1) * 720 : 10080, n <= 6 ? (t = 10 + (n - 1) * 2.5, i = 20 + (n - 1) * 2.5) : (i = 30 + (n - 6) * 5, t =
        n <= 19 ? 20 + (n - 6) * 5 : 80 + (n - 19) * 10), statsV.cost.herobarbarian[n] = t, statsV.cost.heroarcher[n] = i
}

function gmInit() {
    var i, n, t, r, u, f;
    for (i in defaultQ) defaultQ[i + "U"] = defaultQ[i][thL] + 0, n = document.getElementById(
        "coc-" + i), n && (n.childNodes[0].innerHTML = "&nbsp;" + defaultQ[i][thL], n.className += i == "wall" || !defaultLVL[i] ? "" : " b-l" + defaultLVL[i][thL]);


    setTHL(3);


    n = document.body;
    t = document.getElementById("grid-canvas");
    layoutPreview ? (attachE(n, "mousemove", gMMOVE), attachE(n, "mouseup", gMUP), attachE(n, "touchmove", gMMOVE), attachE(n, "touchend", gMUP), attachE(t, "mousedown", function (n) {
        dragStart(n, t)
    }), attachE(t, "touchstart",
        function (n) {
            dragStart(n, t)
        })) : ("ontouchstart" in document.documentElement || navigator.userAgent.match(/iPhone|iPod|iPad|Android/i) ? (layoutTouch = !0, attachE(t, "touchstart", gMDOWN), attachE(t, "touchmove", gMMOVE),
        attachE(t, "touchend", gMUP), attackMode || (r = document.getElementById("buildings"), attachE(r, "touchstart", gMDOWN), attachE(r, "touchmove", gMMOVE), attachE(r, "touchend", gMUP))) : (attachE(n, "mousedown", gMDOWN),
        attachE(n, "mousemove", gMMOVE), attachE(n, "mouseup", gMUP)), u = document.getElementById("drag-toolkit"), f = document.getElementById("buildings"), attachE(u, "mousedown", function (n) {
        dragStart(n, f)
    }), attachE(u, "touchstart",
        function (n) {
            dragStart(n, f)
        }));
    attachE(t, "mousewheel", function (n) {
        n = n ? n : event;
        var t = Math.max(-1, Math.min(1, n.wheelDelta || -n.detail));
        gmZoomS(n, t, 1)
    });
    document.wallImg || (document.wallImg = document.createElement(
        "IMG"), document.wallImg.src = "//www.clashofclans-tools.com/3014/CDN/coc-wall-grid.jpg")
}

function eventPD(n) {
    try {
        n = n ? n : event
    } catch (t) {
    }
    try {
        n.preventDefault()
    } catch (t) {
        try {
            n.preventDefault = !0
        } catch (t) {
        }
    }
}

function eventSP(
    n) {
    n = n ? n : event;
    n.stopPropagation && n.stopPropagation();
    n.cancelBubble != null && (n.cancelBubble = !0)
}

function gmChangeP(n) {
    var t = n.className.replace(/sel b/, "p");
    n.parentNode.className = n.parentNode.className ==
    t ? "" : t
}

function gmRotate() {
    isRotated = addBodyClass("rotate");
    gmLogEvent("Rotate Button")
}

function gmRotateTouch() {
    eventPD(event);
    gmRotate();
    isRotated && (ccWinS("touch-rotate-win"), controlLoad())
}

function gmFullscreen() {
    eventPD();
    isFS = addBodyClass("fullscreen");
    contentSize() && setTimeout(function () {
        window.scrollTo(0, 1)
    }, 100);
    gmLogEvent("Fullscreen Button");
    obj("layout-image") && gmSetZoom(obj("grid-canvas"), 0, isFS ? 1 : .6)
}

function setWallLevel(n, t) {
    var i, r;
    if (t ? wallLVL = n : wallLVL += n, wallLVL > defaultLVL.wall[thL] && (wallLVL = defaultLVL.wall[thL]), wallLVL < 1 && (wallLVL = 1), i = document.getElementById("wall-lvl"), layoutPreview || !i)
        return !1;
    i.innerHTML = wallLVL;
    r = document.getElementById("coc-wall");
    r.className = r.className.replace(/[\s]*(b-l[\d]+)/gi, "") + " b-l" + wallLVL
}

function setTHL(n) {
    var h = drawMode, e, o, t, c, u, r, i, f, s;
    drawMode = "";
    e = n != thL ? "check" : "";
    o = document.getElementById("layout-thl");
    o && (o.value = n);
    for (t in defaultQ) {
        if (c = defaultQ[t][thL] - defaultQ[t + "U"], u = defaultQ[t][n] - c, defaultQ[t + "U"] = u < 0 ? 0 : u, u < 0 && (e == "check" && (e = confirm(
            "You currently have more buildings\nthan is allowed with Townhall Level " + n + "\n\nDo you wish to remove the extras?")), e)) for (bk = 0; bk < 0 - u; bk++) for (r = document.getElementById("grid").getElementsByTagName(
            "A"), i = 0; i < r.length; i++) (r[i].className + "").indexOf("coc-b coc-" + t) != -1 && (r[i].parentNode.removeChild(r[i]), i = r.length + 1);
        f = document.getElementById("coc-" + t);
        f && (f.childNodes[0].innerHTML = "&nbsp;" + defaultQ[
        t + "U"], f.className = f.className.replace(/[\s]*(coc-bdisable|b-l[\d]+)/gi, "") + (defaultQ[t][n] > 0 ? "" : " coc-bdisable") + (t == "wall" || !defaultLVL[t] ? "" : " b-l" + defaultLVL[t][n]))
    }
    s = document.body.className.replace(
        /[\s]*th[\d]+/gi, "");
    document.body.className = s + (s ? " " : "") + "th" + n;
    thL = n;
    setTroopLevelD();
    wallLVL = thL == 9 ? 8 : thL == 10 ? 10 : defaultLVL.wall[thL];
    setWallLevel(0);
    h && setTimeout("drawMode='" + h + "'", 100)
}

function calcStats() {
    var t, r, o, y, a, n, u, c, i;
    if (layoutPreview) return !1;
    t = {};
    t.time = 0;
    t.htime = 0;
    t.btime = 0;
    t.g = 0;
    t.e = 0;
    t.d = 0;
    r = {};
    r.time = 0;
    r.htime = 0;
    r.btime = 0;
    r.g = 0;
    r.e = 0;
    r.d = 0;
    o = {};
    o.gold = 0;
    o.elixer = 0;
    o.delixer = 0;
    for (n in defaultQ)
        for (y = defaultQ[n + "U"], a = 0; a < y; a++) if (defaultLVL[n] && n != "wall") {
            var v = defaultLVL[n][thL], s = 0, e = 0;
            for (i = 1; i <= v; i++) statsV.cost[n] && statsV.cost[n][i] && (s += statsV.cost[n][i]), statsV.time[n] && statsV.time[n][
                i] && (e += statsV.time[n][i]);
            n.indexOf("hero") != -1 ? t.htime += e : t.btime += e;
            t.time += e;
            statsV.cost[n] && statsV.cost[n][0] && (t[statsV.cost[n][0]] += s)
        }
    var w = document.getElementById("grid"), h = document.getElementsByTagName(
        "DIV"), f = 0;
    for (n = 0; n < h.length; n++) if ((h[n].className + "").indexOf("coc-b ") != -1) {
        if (u = h[n].className.split(" ")[1].split("-")[1], c = h[n].level, u == "builder" && f++, defaultLVL[u] && u != "walls") {
            var v = defaultLVL[
                u][thL], s = 0, e = 0, l = 0, p = 0;
            try {
                for (i = c + 1; i <= v; i++) s += statsV.cost[u][i], e += statsV.time[u][i];
                for (i = 1; i <= c; i++) p += statsV.cost[u][i], l += statsV.time[u][i];
                t.time += e;
                t[statsV.cost[u][0]] += s;
                r.time += l;
                r[statsV.cost[u][0]] += p
            } catch (b) {
            }
            u.indexOf("hero") != -1 ? (t.htime += e, r.htime += l) : (t.btime += e, r.btime += l)
        }
        statsV.res[u] && (o[u] += statsV.res[u][c])
    }
    f < 2 && (f = 2);
    setStat("gold-day", o.gold / 1e3 * 24);
    setStat("elixer-day",
        o.elixer / 1e3 * 24);
    setStat("delixer-day", o.delixer / 1e3 * 24);
    setStat("time-to-max", vTime(t.time / f) + " (" + f + " builders)", "n");
    setStat("time-to-max-b", vTime(t.btime / f), "n");
    setStat("time-to-max-h", vTime(t.htime /
        f), "n");
    setStat("gold-to-max", t.g);
    setStat("elixer-to-max", t.e);
    setStat("delixer-to-max", t.d);
    setStat("time-spent", vTime(r.time / f) + " (" + f + " builders)", "n");
    setStat("time-spent-b", vTime(r.btime / f), "n");
    setStat("time-spent-h", vTime(r.htime / f), "n");
    setStat("gold-spent", r.g);
    setStat("elixer-spent", r.e);
    setStat("delixer-spent", r.d)
}

function setStat(n, t, i) {
    if (!document.getElementById(n)) return !1;
    switch (i) {
        case"n":
            document.getElementById(n).innerHTML = t;
            break;
        case"t":
            document.getElementById(n).innerHTML = vTime(t);
            break;
        case"v":
            document.getElementById(n).innerHTML = vMoney(t);
            break;
        default:
            document.getElementById(
                n).innerHTML = vMoney(t * 1e3)
    }
}

function vMoney(n) {
    n = Math.round(n, 0);
    var t = (n + "").split("").reverse().join("");
    return t = t.replace(/([\d]{3})/g, "$1,"), t = t.split("").reverse().join(""), t.substr(0, 1) == "," && (
        t = t.substr(1)), t
}

function vTime(n) {
    if (!n) return "";
    try {
        var t = 0, i = 0, r = 0, u = "";
        return t = Math.floor(n / 1440), i = Math.floor((n - t * 1440) / 60), r = Math.floor(n - t * 1440 - i * 60), u = t < 1 ? "" : t + " day" + (t > 1 ? "s" : ""), u += (!u || i <
        1 ? "" : ", ") + (i < 1 ? "" : i + " hour" + (i > 1 ? "s" : "")), u + ((!u || r < 1 ? "" : ", ") + (r < 1 ? "" : r + " min" + (r > 1 ? "s" : "")))
    } catch (f) {
        return ""
    }
}

function setHeatmap(n, t) {
    layoutTouch && eventPD(n);
    showDrop = t == "dropzone";
    showDrop && makeDropZones(
    );
    var i = document.getElementById("grid"),
        u = (i.className + "").replace(/[\s]*showheat[\-][\w]+/gi, ""),
        r = ((i.className + " showheat-none").split("showheat-")[1] + " ").split(" ")[0];
    document.getElementById("hl-" +
        r).className = "top-item-sub-a";
    i.className = u + (r == t ? "" : "showheat-" + t);
    r != t ? document.getElementById("hl-" + t).className = "top-item-sub-a menu-sel" : document.getElementById("hl-none").className = "top-item-sub-a menu-sel";
    gmLogEvent("Set Heatmap")
}

function setLevels(n) {
    var i = n.value, u, r, e, t, f;
    if (i == n.ov) return !1;
    if (n.ov = i, addBodyClass("level-set-[a-z]+", 0), i == "troops") return ccWinS("troops-win"), n.ov = "", n.value = "", !1;
    if (
        i == "min" || i == "max") {
        if (n.ov = "", n.value = "", !confirm("Are you sure?\nThis will reset the levels of all your buildings")) return !1;
        for (u = i == "max" ? thL : thL - (thL > 1 ? 1 : 0), document.useLevelMax = i == "max", r = document.getElementsByTagName("DIV"), t = 0; t < r.length; t++) (r[t].className + "").indexOf("coc-b ") != -1 && (e = r[t].className.split(" ")[1].split("-")[1], defaultLVL[e] && setBuildingLevel(r[t], defaultLVL[e][u], !0));
        for (t
            in defaultQ) f = document.getElementById("coc-" + t), f && (f.className = f.className.replace(/[\s]*(b-l[\d]+)/gi, "") + (t == "wall" || !defaultLVL[t] ? "" : " b-l" + defaultLVL[t][u]));
        return setWallLevel(defaultLVL.wall[
            u], !0), !1
    }
    addBodyClass("level-set-" + i, 1);
    gmLogEvent("Set Levels")
}

function setBtn(n, t) {
    if (n) {
        n.btype || (n.btype = n.id.split("-")[1]);
        var i = n.btype != "wall" ? defaultLVL[n.btype] ? defaultLVL[n.btype][thL] ? " b-l" +
            defaultLVL[n.btype][thL] : "" : "" : " b-l" + wallLVL;
        n.className = "coc-bbtn" + (t ? " " + t : "") + (n.gtype ? " coc-grid-" + n.gtype : "") + i
    }
}

function showG() {
    var n = document.getElementById("gpos");
    n.style.display = "block";
    n.className = "dm-" + drawMode
}

function hideG() {
    var n = document.getElementById("gpos");
    n.style.display = "none";
    n.className = ""
}

function bbDOWN(n, t) {
    var i, r, f, u;
    if (layoutTouch && !t) return !1;
    if (n = n ? n : event, eventPD(
        n), i = n.target ? n.target : n.srcElement, i.className == "bx" && (i = i.parentNode), drawMode == "building" && cItem && (isDrag = 0, drawMode = "", hideG(), setBtn(cBtn), cItem && (cItem.parentNode.removeChild(cItem), cItem = !1)), cBtn) {
        if (drawMode = "", isDrag = 0, hideG(), setBtn(cBtn), cBtn.id == i.id) return cBtn = !1, !1;
        cBtn = !1
    }
    switch (i.id) {
        case"coc-wall":
            drawMode = i.className.indexOf("coc-bbtns") == -1 ? "wall" : "";
            i.className = (drawMode == "wall" ?
                "coc-bbtn coc-bbtns" : "coc-bbtn") + " b-l" + wallLVL;
            cBtn = i;
            showG();
            break;
        case"coc-select":
            drawMode = i.className == "coc-bbtn coc-bbtns" ? "" : "select";
            r = document.sel;
            r || (r = document.createElement("DIV"), r.className =
                "coc-sel", document.sel = r = document.body.appendChild(r));
            i.className = i.className == "coc-bbtn" ? "coc-bbtn coc-bbtns" : "coc-bbtn";
            cBtn = i;
            document.getElementById("grid").style.cursor = drawMode == "select" ? "crosshair" :
                "default";
            break;
        default:
            cBtn && (drawMode = "", setBtn(cBtn), isDrag = 0, cBtn = 0);
            f = i.id.split("-")[1];
            u = "";
            i.className.indexOf("coc-grid") != -1 && (u = (i.className.split("coc-grid-")[1] + " ").split(" ")[0], i.gtype =
                u);
            defaultQ[f + "U"] > 0 && (lastXY = !1, document.mTouchX = !1, document.mTouchY = !1, drawMode = i.id != "coc-townhall" && i.id != "coc-tesla" && i.id.substr(0, 5) == "coc-t" ? "troop" : "building", cItem = createBuilding(f, -1, -1, u, drawMode ==
                "troop"), cItem.className += " coc-drag" + (n.type.indexOf("touch") != -1 ? " coc-touch" : ""), isDrag = 1, cBtn = i, setBtn(cBtn, "coc-bbtns"), showG(), gmLogWhenK("Add 3 Buildings", 0, 3))
    }
}

function bbPICKUP(n, t) {
    var i, r,
        e, u, f;
    if (attackMode) return !1;
    if (n = n ? n : event, lastXY = !1, i = n.target ? n.target : n.srcElement, (n.type + "").indexOf("touch") != -1) {
        if ((i.className + "").indexOf("level-s level-u") != -1) return setBuildingLevel(i.parentNode,
            1), !1;
        if ((i.className + "").indexOf("level-s level-d") != -1) return setBuildingLevel(i.parentNode, -1), !1
    }
    if (eventPD(n), !t) {
        if (i.className == "bi" && (i = i.parentNode), i.tagName == "SPAN" && i.className != "bi" && (r = gMXY(
            n, 0, "bbPICKUP"), i = getItemAt(r.x, r.y), !i)) return !1;
        t = i.id
    }
    if (document.getElementById(t).stopPickup) return !1;
    if (drawMode == "" && isDrag != 1 && (showG(), cItem = document.getElementById(t), cItem.startxy = clientXY(
        n), cItem.ndX = cItem.x, cItem.ndY = cItem.y, r = {}, r.x = cItem.x + 1, r.y = cItem.y + 1, lastXY.x = r.x, lastXY.y = r.y, checkP(cItem.x, cItem.y, cItem.w, cItem.h, 0), cItem.className += " coc-drag" + (n.type.indexOf("touch") != -1 ? " coc-touch" :
        ""), dettachE(cItem, "mousedown"), drawMode = "building", isDrag = 1, hasDrag = 0, e = document.getElementById("coc-" + cItem.btype), cBtn = e, setBtn(cBtn, "coc-bbtns"), defaultQ[cItem.btype + "U"]++, document.getElementById(
        "coc-" + cItem.btype).childNodes[0].innerHTML = "&nbsp;" + defaultQ[cItem.btype + "U"]), drawMode == "select" && isDrag != 1) {
        for (u = 0; u < document.csel.length; u++) f = document.csel[u], f.id == t && (document.cselMID = u), dettachE(
            cItem, "mousedown"), defaultQ[f.btype + "U"]++, document.getElementById("coc-" + f.btype).childNodes[0].innerHTML = "&nbsp;" + defaultQ[f.btype + "U"];
        isDrag = 1;
        drawMode = "select-move"
    }
    makeDropZones()
}

function isAt(
    n, t, i) {
    var r = wOffset(i.w);
    return n >= i.x - r && t >= i.y - r && n <= i.x + i.w - r && t <= i.y + i.h - r ? !0 : !1
}

function getItemAt(n, t) {
    for (var r = document.getElementsByTagName("DIV"), i = 0; i < r.length; i++) if ((r[i].className + "").indexOf(
        "coc-b ") != -1 && isAt(n, t, r[i])) return r[i];
    return !1
}

function wOffset(n) {
    var t = 1;
    switch (n) {
        case 1:
        case 2:
            t = 0;
            break;
        case 3:
        case 4:
            t = 1;
            break;
        case 5:
            t = 2;
            break;
        default:
            t = Math.floor((n - 1) / 2)
    }
    return t
}

function bbUP() {
}

function srpt(n, t) {
    var i;
    if ((document.location + "").indexOf("test.clash") == -1) return !1;
    if (document.rptK || (document.rptK = 0, document.prpt = {}, i = document.createElement("DIV"), i.id = "rpt-box", i.style.position =
        "absolute", i.style.top = "30px", i.style.left = "0px", i.style.width = "300px", i.style.zIndex = 9e3, i.style.backgroundColor = "white", document.rptb = document.body.appendChild(i)), t && document.prpt[t]) return document.prpt[t].innerHTML = n, !0;
    i = document.createElement("DIV");
    i.innerHTML = n;
    i.id = "srpt-" + document.rptK++;
    i = document.rptb.appendChild(i);
    t && (document.prpt[t] = i)
}

function gMXY(n, t) {
    var f, i, s, o, c, r, u;
    if (n = n ? n : event,
        f = n.target ? n.target : n.srcElement, i = {}, i.x = -99, i.y = -99, n.type.indexOf("touch") != -1 && (t = !0), f.id != "gpos" && !layoutTouch) {
        for (s = 0; s < 5; s++) if (f.parentNode) {
            if (f.parentNode.id == "grid") return lastXY;
            f = f.parentNode
        }
        return !1
    }
    if (t) if (n.touches.length == 0) r = document.mTouchX, u = document.mTouchY; else {
        var h = document.getElementById("grid-canvas"),
            l = document.getElementById("grid"),
            a = document.getElementById("editor"), e = getZoom(
            h);
        i = clientXY(n);
        i.x -= a.offsetLeft + l.offsetLeft + h.offsetLeft;
        i.y -= a.offsetTop + l.offsetTop + h.offsetTop;
        i.x = i.x + 400 * (e - 1);
        i.y = i.y + 400 * (e - 1);
        i.x = i.x / e;
        i.y = i.y / e;
        r = parseInt(i.x / 20) + 1;
        u = parseInt(i.y / 20) + 1;
        document.mTouchX = r;
        document.mTouchY = u
    } else o = n.offsetX, c = n.offsetY, o || (o = n.layerX, c = n.layerY), r = parseInt(o / 20) + 1, u = parseInt(c / 20) + 1;
    return r > mapSize || u > mapSize ? lastXY : (i.x = r, i.y = u, lastXY = {
        x: r,
        y: u
    }, i)
}

function bbTOUCH(n) {
    if (drawMode == "") {
        n = n ? n : event;
        var t = n.target ? n.target : n.srcElement;
        return t.id || (t = t.parentNode), drawMode = "drag", cItem = document.getElementById(t.id), dragStart(n, document.getElementById(
            "grid-canvas")), !1
    }
}

function gMDOWN(n) {
    var r, u, t, i, f;
    if (n = n ? n : event, r = n.target ? n.target : n.srcElement, lastXY = !1, r.id == "grid" && drawMode == "") return drawMode = "", dragStart(n, document.getElementById("grid-canvas")),
        !1;
    if ((r.id == "gpos" || (r.className + "").indexOf("coc-b") != -1) && eventPD(n), u = gMXY(n, 0, "gmDOWN"), !u) return !1;
    t = u.x;
    i = u.y;
    switch (drawMode) {
        case"wall":
            eventPD(n);
            isDrag = 1;
            dragMode = wallA[t][i] ? 0 : 1;
            wallA[t][i] &&
            (dragFX = t, dragFY = i);
            break;
        case"select":
            isDrag = 1;
            f = document.sel;
            f.sx = t;
            f.sy = i;
            eventPD(n);
            break;
        case"troop":
            eventPD;
            eventSP;
            document.tDropTMR && (clearInterval(document.tDropTMR), document.tDropTMR = !1);
            document.tDropTMRF && (clearTimeout(document.tDropTMRF), document.tDropTMRF = !1);
            document.troopX = t;
            document.troopY = i;
            dropTroop() ? document.tDropTMRF = setTimeout(function () {
                    document.tDropTMR = setInterval(dropTroop, 100)
                }
                , 200) : dragStart(n, document.getElementById("grid-canvas"))
    }
}

function clearSel() {
    var t, n;
    if (document.csel) for (t = 0; t < document.csel.length; t++) n = document.csel[t], n.style.border = "0px", n.style.backgroundPosition =
        "0px 0px", n.style.width = parseInt(n.style.width) + 6 + "px", n.style.height = parseInt(n.style.height) + 6 + "px";
    document.csel = new Array(500)
}

function clientXY(n) {
    n = n ? n : event;
    var i = n.type.indexOf("touch") != -1, t =
        {};
    return i ? n.touches.length == 0 ? (t.x = document.pTouchX, t.y = document.pTouchY) : (t.x = n.touches[0].pageX, t.y = n.touches[0].pageY, document.pTouchX = t.x, document.pTouchY = t.y) : (t.x = n.clientX, t.y = n.clientY), t
}

function dragStart(
    n, t) {
    n = n ? n : event;
    var i = clientXY(n);
    document.startX = i.x;
    document.startY = i.y;
    document.dragItem = t;
    t.startX = t.offsetLeft;
    t.startY = t.offsetTop;
    t.oX || (t.oX = t.startX, t.oY = t.startY);
    drawMode = "drag";
    eventPD(n)
}

function dragMove(n) {
    var t = document.dragItem, f, i, r, u;
    return t ? (f = clientXY(n), eventPD(n), cItem && (cItem.stopPickup = !0), n.touches && n.touches.length > 1) ? (drawMode = "zoom", gmZoomTouchS(n, t), !0) : (i = t.startX + (
        f.x - document.startX), r = t.startY + (f.y - document.startY), layoutTouch || Math.abs(i - t.oX) < 15 && Math.abs(r - t.oY) < 15 && (i = t.oX, r = t.oY), t.style.left = i + "px", t.style.top = r + "px", u = obj("layout-image"), u && (u.style.position =
        "relative", u.style.left = i - t.oX + "px", u.style.top = r - t.oY + "px"), !0) : !1
}

function gmLogWhenK(n, t, i) {
    if (document.gmEventLog || (document.gmEventLog = []), document.gmEventLog[n]) return !1;
    document.gmEventLog[n + "k"] ?
        document.gmEventLog[n + "k"]++ : document.gmEventLog[n + "k"] = 1;
    document.gmEventLog[n + "k"] >= i && gmLogEvent(n, t)
}

function gmLogEvent(n, t) {
    if (document.gmEventLog || (document.gmEventLog = []), document.gmEventLog[n])
        return !1;
    gEvent("Layout-Builder", n, t);
    document.gmEventLog[n] = !0
}

function gMUP(n) {
    var e, s, r, u, o, i, t, f;
    if (document.tDropTMR && (clearInterval(document.tDropTMR), document.tDropTMR = !1), document.tDropTMRF && (
        clearTimeout(document.tDropTMRF), document.tDropTMRF = !1), n = n ? n : event, e = n.target ? n.target : n.srcElement, cItem && (drawMode == "drag" || drawMode == "zoom") && (setTimeout("document.getElementById('" + cItem.id + "').stopPickup=false;",
        100), cItem.troop && (document.noTroop ? drawMode = "troop" : dropTroop())), drawMode == "drag") return drawMode = "", !1;
    if (drawMode == "zoom") return gmZoomTouchE(n, document.dragItem), drawMode = "", !1;
    if (s = gMXY(n, 0, "gMUP"),
    (e.className == "bx" || e.className == "bi") && (e = e.parentNode), e.id == "coc-wall") return !1;
    if ((!s || s.x == -99) && drawMode == "building" && (e.className.indexOf("coc-bbtn") == -1 || e.id != cBtn.id) && e.className.indexOf("coc-b coc-") ==
        -1 && hasDrag == 1) return isDrag = 0, drawMode = "", hideG(), setBtn(cBtn), cItem.parentNode.removeChild(cItem), cItem = !1, cBtn = !1, !1;
    if (drawMode == "building" && isDrag == 1 && hasDrag == 0 && !layoutTouch || !s || s.x == -99 || (r = s.x, u = s.y, attackMode && drawMode != "troop")) return !1;
    switch (drawMode) {
        case"wall":
            (defaultQ.wallU > 0 || wallA[r][u]) && isDrag != 2 && (!wallA[r][u] || wallA[r][u] < 2) && (wallA[r][u] = wallA[r][u] ? 0 : 1, wallL[r][u] = wallLVL);
            isDrag = 0;
            dragMode = 0;
            dragFX = 0;
            dragFY = 0;
            document.wX = 0;
            document.wY = 0;
            drawWalls();
            defaultQ.wall[thL] - defaultQ.wallU >= 10 && gmLogEvent("10 Walls Drawn");
            break;
        case"select":
            isDrag = 0;
            var h = document.sel, a = parseInt(
                h.style.top) - 20, v = parseInt(h.style.left) - 20,
                b = v + parseInt(h.style.width),
                k = a + parseInt(h.style.height);
            for (h.style.display = "none", t = document.getElementsByTagName("A"), clearSel(), i = 0; i < t.length; i++) if ((t[
                i].id + "   ").substr(0, 2) == "b-" && t[i].style.display == "block") {
                var y = 0, c = parseInt(t[i].style.top),
                    l = parseInt(t[i].style.left),
                    p = l + parseInt(t[i].offsetWidth),
                    w = c + parseInt(t[i].offsetHeight);
                l >= v && l < b ? c >=
                a && c < k ? y = 1 : c < a && w > a && (y = 1) : l < v && p > v && (y = 1);
                y && (document.csel[document.csel.length] = t[i], t[i].style.border = "3px solid orange", t[i].style.backgroundPosition = "-3px -3px", t[i].style.borderRadius = "10px", t[
                    i].style.width = p - l - 6 + "px", t[i].style.height = w - c - 6 + "px")
            }
            break;
        case"building":
            if (cItem) if (f = wOffset(cItem.w), r = r - f, u = u - f, o = 0, checkP(r, u, cItem.w, cItem.h) ? o = 1 : cItem.ndX && (r = cItem.ndX, u = cItem.ndY, o = 2), o) checkP(
                r, u, cItem.w, cItem.h, cItem.gtype == "traps" ? 3 : 2), cItem.x = r, cItem.y = u, cItem.ontouchstart = bbTOUCH, cItem.ontouchend = function () {
                bbPICKUP(event, cItem.id, !0)
            }, isDrag = 0, setBtn(cBtn), cItem.ndX = 0, cItem.ndY = 0, defaultQ[
            cItem.btype + "U"]--, document.getElementById("coc-" + cItem.btype).childNodes[0].innerHTML = "&nbsp;" + defaultQ[cItem.btype + "U"], cItem.className = cItem.className.replace(/[\s]*coc-(drag|touch|nodrop|yesdrop)/gi,
                ""), cItem.stopPickup = !0, attachE(cItem, "mousedown", bbPICKUP), setTimeout("document.getElementById('" + cItem.id + "').stopPickup=false", 100), (o == 2 || cItem.style.visibility != "visible") && (cItem.style.top = (u - f)
                * 20 + "px", cItem.style.left = (r - f) * 20 + "px"), cItem.style.visibility = "visible", cItem = !1, cBtn = !1, drawMode = "", lastXY = !1; else return r == -1 ? !1 : (isDrag = 0, drawMode = "", hideG(), setBtn(cBtn), cItem.parentNode.removeChild(
                cItem), cItem = !1, cBtn = !1, !1); else isDrag = 0, drawMode = "", setBtn(cBtn), cItem = !1, cBtn = !1;
            hideG();
            makeDropZones();
            break;
        case"select-move":
            for (o = !0, i = 0; i < document.csel.length; i++) t = document.csel[i], f = wOffset(
                t.w), checkP(r - f + t.ox, u - f + t.oy, t.w, t.h) || (o = !1);
            if (o) {
                for (i = 0; i < document.csel.length; i++) t = document.csel[i], f = wOffset(t.w), checkP(r - f + t.ox, u - f + t.oy, t.w, t.h, 2), t.x = r - f, t.y = u - f, defaultQ[t.btype + "U"]--, document.getElementById("coc-" + t.btype).childNodes[0].innerHTML = "&nbsp;" + defaultQ[t.btype + "U"], cItem.stopPickup = !0, attachE(cItem, "mousedown", bbPICKUP), setTimeout("document.getElementById('" + cItem.id + "').stopPickup=false",
                    100);
                isDrag = 0;
                drawMode = "select";
                document.csel[document.cselMID].sh = !1;
                document.cselMID = !1
            }
            makeDropZones()
    }
}

function checkP(n, t, i, r, u) {
    var f, e;
    if (n == -1 || t == -1) return !1;
    for (f = n; f < n + i; f++) for (e = t; e < t + r; e++)
        if (u || u == 0) wallA[f][e] = u; else if (attackMode) {
            if (wallA[f][e] && wallA[f][e] != 3) return !1
        } else if (wallA[f][e]) return !1;
    return !0
}

function gMMOVE(n, t) {
    var l, r, u, s, a, c, o, i, e, f, w;
    if (n = n ? n : event, drawMode == "drag" ||
    drawMode == "zoom") {
        if (document.tDropTMRF && (clearTimeout(document.tDropTMRF), document.tDropTMRF = !1), dragMove(n)) return document.noTroop = !0, !0
    } else if (!cItem && drawMode != "wall") return !1;
    if (l = gMXY(n, t, "gMMOVE"),
        !l) return cItem && isDrag && hasDrag == 1 && (cItem.style.visibility = "hidden", cItem.style.left = "-120px", cItem.childNodes[5] && (cItem.childNodes[5].style.visibility = "hidden")), !1;
    if (l.x == -99) return !1;
    if (r = l.x, u =
        l.y, isDrag) {
        eventPD(n);
        switch (drawMode) {
            case"wall":
                if (dragFX && (r != dragFX || u != dragFY) && (wallA[r][u] || (wallA[dragFX][dragFY] = 1, wallL[dragFX][dragFY] = wallLVL, dragMode = 1), dragFX = 0), (defaultQ.wallU > 0 || wallA[
                    r][u]) && (!wallA[r][u] || wallA[r][u] < 2)) {
                    if (wallA[r][u] = dragMode, wallL[r][u] = wallLVL, updateWall(r, u), s = defaultQ.wallU, document.wX && document.wY) {
                        if (document.wX == r) {
                            if (document.wY < u - 1) for (i = document.wY + 1;
                                                          i < u; i++) dragMode && wallA[r][i] && (s--, s < 0 && (i = 999)), (dragMode || wallA[r][i] != 1) && (!dragMode || wallA[r][i]) || (wallA[r][i] = dragMode, wallL[r][i] = wallLVL, updateWall(r, i));
                            if (document.wY > u + 1) for (i = u + 1; i < document.wY; i++) dragMode && wallA[r][i] && (s--, s < 0 && (i = 999)), (dragMode || wallA[r][i] != 1) && (!dragMode || wallA[r][i]) || (wallA[r][i] = dragMode, wallL[r][i] = wallLVL, updateWall(r, i))
                        }
                        if (document.wY == u) {
                            if (document.wX < r - 1)
                                for (i = document.wX + 1; i < r; i++) dragMode && !wallA[i][u] && (s--, s < 0 && (i = 999)), (dragMode || wallA[i][u] != 1) && (!dragMode || wallA[i][u]) || (wallA[i][u] = dragMode, wallL[i][u] = wallLVL, updateWall(i, u));
                            if (document.wX > r +
                                1) for (i = r + 1; i < document.wX; i++) dragMode && !wallA[i][u] && (s--, s < 0 && (i = 999)), (dragMode || wallA[i][u] != 1) && (!dragMode || wallA[i][u]) || (wallA[i][u] = dragMode, wallL[i][u] = wallLVL, updateWall(i, u))
                        }
                    }
                    document.wX = r;
                    document.wY = u
                }
                isDrag = 2;
                break;
            case"select":
                var h = document.sel, c = h.sx, p = r;
                c > p ? (p = h.sx, c = r) : p++;
                o = h.sy;
                a = u;
                o > a ? (a = h.sy, o = u) : a++;
                h.style.top = o * 20 + "px";
                h.style.left = c * 20 + "px";
                h.style.height = (a - o) * 20 - 3 + "px";
                h.style.width = (p - c) * 20 - 3 + "px";
                h.style.display = "block";
                break;
            case"select-move":
                if (c = parseInt(document.csel[document.cselMID].style.left), o = parseInt(document.csel[document.cselMID].style.top), !document.csel[document.cselMID].sh) {
                    var b = c, k = c, d = o, g = o;
                    for (i = 0; i < document.csel.length; i++) {
                        var e = document.csel[i], v = parseInt(e.style.left),
                            y = parseInt(e.style.top),
                            nt = parseInt(e.style.width),
                            tt = parseInt(e.style.height);
                        e.ox = parseInt((v - c) / 20);
                        e.oy = parseInt((y - o) / 20);
                        v < b && (b = v);
                        v + nt > k && (k = v + nt);
                        y < d && (d = y);
                        y + tt > g && (g = y + tt)
                    }
                    document.csel[document.cselMID].sw = parseInt((k - b) / 20) + 1;
                    document.csel[document.cselMID].sh = parseInt((g - d) / 20) + 1
                }
                for (r = r < 2 ? 2 : r > mapSize - document.csel[document.cselMID].sw + 2 ? mapSize - document.csel[document.cselMID].sw + 2 : r, u = u < 2 ? 2 : u > mapSize - document.csel[document.cselMID].sh + 2 ? mapSize - document.csel[document.cselMID].sh + 2 : u, i = 0; i < document.csel.length; i++) e = document.csel[i], e.style.top = (u - 2 + e.oy) * 20 + "px", e.style.left = (r - 2 + e.ox) * 20 + "px", e.style.display = "block";
                break;
            case"building":
                cItem && (hasDrag =
                    1, f = wOffset(cItem.w) + 1, r = r < f ? f : r > mapSize - cItem.w + f ? mapSize - cItem.w + f : r, u = u < f ? f : u > mapSize - cItem.h + f ? mapSize - cItem.h + f : u, cItem.style.top = (u - f) * 20 + "px", cItem.style.left = (r - f) * 20 + "px", cItem.style.visibility =
                    "visible", cItem.childNodes[5] && (cItem.childNodes[5].style.visibility = ""), w = (cItem.className + "").replace(/[\s]*coc[\-](no|yes)drop/gi, ""), cItem.className.indexOf("drop") == -1 && cItem.ndX - 1 == r - f && cItem.ndY -
                1 == u - f || (w += " coc-" + (checkP(r - f + 1, u - f + 1, cItem.w, cItem.h) ? "yes" : "no") + "drop"), cItem.className != w && (cItem.className = w));
                break;
            case"troop":
                document.troopX = r;
                document.troopY = u
        }
    }
}

function makeDropZones() {
    var
        i, u, t, n, r, f;
    if (!showDrop) return !1;
    for (i = new Array(mapSize + 1), u = 0; u < mapSize + 2; u++) i[u] = new Array(mapSize + 1);
    for (t = 1; t < mapSize + 1; t++) for (n = 1; n < mapSize + 1; n++) (wallA[t][n] == 1 || wallA[t][n] == 2) && (t > 0 && (n > 0 &&
    (i[t - 1][n - 1] = 1), i[t - 1][n + 0] = 1, n < mapSize && (i[t - 1][n + 1] = 1)), n > 0 && (i[t][n - 1] = 1), i[t][n + 0] = 1, n < mapSize && (i[t][n + 1] = 1), t < mapSize && (n > 0 && (i[t + 1][n - 1] = 1), i[t + 1][n + 0] = 1, n < mapSize && (i[t + 1][n + 1] = 1)));
    for (t = 1; t <
    mapSize + 1; t++) for (n = 1; n < mapSize + 1; n++) r = document.getElementById("dz-" + t + "-" + n), i[t][n] != 1 || wallA[t][n] ? r && (r.style.display = "none") : (r || (r = document.createElement("DIV"), r.id = "dz-" + t + "-" + n, r.className = "dropzone d12",
        r.style.left = (t - 1) * 20 + "px", r.style.top = (n - 1) * 20 + "px"), r.style.display = "", r = document.getElementById("dropzones").appendChild(r), f = 12, f = i[t][n - 1] == 1 ? i[t - 1][n] == 1 ? i[t + 1][n] == 1 ? i[t][n + 1] == 1 ? 6 : 10 : i[t][n + 1] ==
    1 ? 7 : 11 : i[t + 1][n] == 1 ? i[t][n + 1] == 1 ? 5 : 9 : i[t][n + 1] == 1 ? 8 : 14 : i[t - 1][n] == 1 ? i[t + 1][n] == 1 ? i[t][n + 1] == 1 ? 2 : 4 : i[t][n + 1] == 1 ? 3 : 16 : i[t + 1][n] == 1 ? i[t][n + 1] == 1 ? 1 : 15 : i[t][n + 1] == 1 ? 13 : 12, r.className = "dropzone d" + f)
}

function updateWall(
    n, t, i) {
    var f, e, o, r, u, h, c, s;
    if (!i) {
        for (document.fDraw && clearTimeout(document.fDraw), document.fDraw = setTimeout("drawWalls()", 300), f = n - 1 < 1 ? 1 : n - 1; f < (n > mapSize ? mapSize + 1 : n + 2); f++) for (e = t - 1 < 1 ? 1 : t - 1; e < (t > mapSize ?
            mapSize + 1 : t + 2); e++) updateWall(f, e, 1);
        return !0
    }
    o = document.getElementById("gpos").getContext("2d");
    wallA[n][t] == 1 ? (r = 0, u = 0, wallA[n][t - 1] == 1 ? wallA[n - 1][t] == 1 ? wallA[n + 1][t] == 1 ? wallA[n][t + 1] == 1 ? (u = 2, r = 2) : (
        u = 3, r = 2) : wallA[n][t + 1] == 1 ? (u = 2, r = 3) : (u = 3, r = 3) : wallA[n + 1][t] == 1 ? wallA[n][t + 1] == 1 ? (u = 2, r = 1) : (u = 3, r = 1) : wallA[n][t + 1] == 1 ? (u = 2, r = 4) : (u = 4, r = 2) : wallA[n - 1][t] == 1 ? wallA[n + 1][t] == 1 ? wallA[n][t + 1] == 1 ? (u = 1, r = 2) : (u =
        1, r = 4) : wallA[n][t + 1] == 1 ? (u = 1, r = 3) : (u = 4, r = 4) : wallA[n + 1][t] == 1 ? wallA[n][t + 1] == 1 ? (u = 1, r = 1) : (u = 4, r = 3) : wallA[n][t + 1] == 1 ? (u = 4, r = 1) : (u = 3, r = 4), h = (wallL[n][t] - 1) % 4 * 80, c = Math.floor((wallL[n][t] - 1) / 4) * 80, o.drawImage(
        document.wallImg, (r - 1) * 20 + h, (u - 1) * 20 + c, 20, 20, (n - 1) * 20, (t - 1) * 20, 20, 20)) : (o.clearRect((n - 1) * 20, (t - 1) * 20, 20, 20), s = document.getElementById("wall-" + n + "-" + t), s && (s.style.display = "none"))
}

function drawWalls() {
    var r, u, f, n, t, e, i;
    for (document.fDraw && clearTimeout(document.fDraw), r = document.getElementById("gpos"), r && r.tagName == "CANVAS" && r.getContext("2d").clearRect(0, 0, 880, 880), u = document.getElementById("walls"),
         u || (u = document.getElementById("grid")), f = defaultQ.wall[thL], n = 1; n < mapSize + 1; n++) for (t = 1; t < mapSize + 1; t++) i = document.getElementById("wall-" + n + "-" + t), wallA[n][t] == 1 ? (i || (i = document.createElement("DIV"), i.id = "wall-" + n + "-" + t, i.className = "wall lvl" + wallL[n][t] + " w12", i.style.left = (n - 1) * 20 + "px", i.style.top = (t - 1) * 20 + "px", i.btype = "wall", i.x = n - 1, i.y = t - 1), i.style.display = "block", i = u.appendChild(i), e = 12, e = wallA[
        n][t - 1] == 1 ? wallA[n - 1][t] == 1 ? wallA[n + 1][t] == 1 ? wallA[n][t + 1] == 1 ? 6 : 10 : wallA[n][t + 1] == 1 ? 7 : 11 : wallA[n + 1][t] == 1 ? wallA[n][t + 1] == 1 ? 5 : 9 : wallA[n][t + 1] == 1 ? 8 : 14 : wallA[n - 1][t] == 1 ? wallA[n + 1][t] == 1 ? wallA[n][t + 1] == 1 ?
        2 : 4 : wallA[n][t + 1] == 1 ? 3 : 16 : wallA[n + 1][t] == 1 ? wallA[n][t + 1] == 1 ? 1 : 15 : wallA[n][t + 1] == 1 ? 13 : 12, i.className = "wall lvl" + wallL[n][t] + " w" + e, i.level = wallL[n][t], f--) : i && (i.style.display = "none");
    makeDropZones();
    i =
        document.getElementById("coc-wall");
    i && (i.childNodes[0].innerHTML = "&nbsp;" + f);
    defaultQ.wallU = f
}

function sCompress(n) {
    return n.replace(/([a-zA-Z])\1{2,}/g, function (n) {
            return n.substr(0, 1) + (n.length - 1)
        }
    )
}

function sExpand(n) {
    return n.replace(/[a-zA-Z][\d]+/g, function (n) {
        var t = n.substr(0, 1), i = parseInt(n.substr(1));
        return Array(i + 2).join(t)
    })
}

function saveLayout(n) {
    for (var e = getBIDX(), l = [], a = [], d = document.getElementById("grid"), u = document.getElementsByTagName("DIV"), f = "", s, v, r, t, y, b, i = 0; i < u.length; i++) if ((u[i].className + "").indexOf("coc-b ") != -1) {
        var o = u[i].className.split(" ")[1],
            r = parseInt(u[i].style.left) / 20,
            t = parseInt(u[i].style.top) / 20;
        l[e[o]] = (l[e[o]] ? l[e[o]] : "") + getC(r) + getC(t);
        a[e[o]] = (a[e[o]] ? a[e[o]] : "") + getC(u[i].level)
    }
    for (f = thL + l.join("_"), s = "", v = "", r = 1; r < mapSize + 1; r++) {
        var p = 0, h = 0, c = 0;
        for (
            t = 1; t < mapSize + 1; t++) wallA[r][t] == 1 ? h || (s += (p ? "" : (s ? "_" : "") + getC(r)) + getC(t), p = 1, h = 1, c = t) : h && (h = 0, c != t - 1 && (s += c == t - 2 ? getC(t - 1) : "." + getC(t - 1)));
        h && (h = 0, c != t - 1 && (s += c == t - 2 ? getC(t - 1) : "." + getC(t - 1)))
    }
    for (r =
             1; r < mapSize + 1; r++) for (t = 1; t < mapSize + 1; t++) wallA[r][t] == 1 && (v += getC(wallL[r][t]));
    var k = document.getElementById("troops"), u = k.getElementsByTagName("A"),
        w = [];
    for (i = 0; i < u.length; i++) (u[i].id + "").indexOf(
        "troop-") != -1 && (y = u[i].id.split("-")[1], b = defaultLVL["t" + y][0], w[e["troop-" + y]] = getC(b));
    if (f = f + "-" + s + "..." + v + "-" + a.join("_") + "-" + w.join(""), f = sCompress(f), f != "-" && !n) {
        if (document.getElementById("layout-name").value == "") return alert("Please enter a name"), !1;
        document.getElementById("save").className = "control-win save-wait";
        xSend("Clash.Save_Layout", "id=" + (layoutID ? layoutID : "") + "&name=" + escape(document.getElementById(
            "layout-name").value) + "&th=" + thL + "&type=" + escape(document.getElementById("layout-type").value) + "&data=" + f + "&desc=" + escape(document.getElementById("layout-desc").value) + "&tags=" + encodeURIComponent(document.getElementsByName("lt-tag-v")[0].value), saveLayoutCB)
    }
    return f
}

function saveLayoutCB(n) {
    var t = n.split("|");
    switch (t[0]) {
        case"S":
            document.getElementById("save").className = "control-win save-start";
            layoutID =
                parseInt(t[1]);
            ccWinH("save-win");
            gmLinkBtn();
            break;
        case"E":
            document.getElementById("save-err").innerHTML = "<b>Error:<\/b> " + t[1];
            document.getElementById("save").className = "control-win save-err";
            controlLoad(
            );
            ccWinS("save-win");
            break;
        case"L":
            alert(t[1]);
            ccWinH("save-win");
            ulLogoutCB("Y");
            ccWinS("login-win");
            controlLoad();
            ulProg(2, 0, "-1");
            break;
        default:
            console.log("Save Error: " + n);
            document.getElementById(
                "save-err").innerHTML = "<b>Error:<\/b> Unable to save, please try again";
            document.getElementById("save").className = "control-win save-err";
            controlLoad();
            ccWinS("save-win")
    }
}

function getBIDX() {
    for (var t =
        "cannon,archer,air,xbow,goldstorage,elixerstorage,delixerstorage,mortar,wizard,herobarbarian,heroarcher,gold,elixer,delixer,tesla,bigbomb,bomb,spring,airbomb,airmine,barracks,dbarracks,spells,townhall,research,army,builder,castle,inferno,skeleton,airsweeper,darkspells,herowarden,eagle".split(","), i = {}, r, n = 0; n < t.length; n++) i["coc-" + t[n]] = n, i["B" + n] = "coc-" + t[n], r = "", ",bigbomb,bomb,spring,airbomb,airmine,".indexOf("," + t[n] + ",") != -1 && (r = "traps"), i["G" + n] = r;
    for (t = "barbarian,archer,goblin,giant,wallbreaker,balloon,wizard,healer,dragon,pekka,minion,hogrider,valkyrie,golem,lightning,healing,rage,jump".split(","), n = 0; n < t.length; n++) i["troop-" + t[n]] = n, i["T" + n] = t[n];
    return i
}

function getC(n) {
    return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".substr(n, 1)
}

function putC(n) {
    var t = n.charCodeAt(0);
    return t > 96 ? t - 97 : t - 39
}

function loadLayout(n) {
    var c, r, e, b, l, nt, o, y, it, k, p, rt, lt, at, v, ut, vt, d, g, ft, w,
        h, u, yt, pt, ot, i, f, t, st;
    if (n || (n = (document.location + "#").split("#")[1]), c = getBIDX(), r = attackMode ? 2 : 0, (n +
        "        ").substr(0, 7).toLowerCase() == "layout-") return e = parseInt(n.split("-")[1]), ccWinS("wait-win"), xSend("Clash.Layout_Data " + e, !1, function (n) {
        var t = (n + "|||||").split("|");
        ccWinH("wait-win");
        t[0] ==
        e ? t[3] == cUser.id || attackMode ? loadLayout(n) : (document.location = (document.location + "#").split("#")[0] + "#" + t[4], loadLayout(t[4])) : alert("Error: Layout Unavailable")
    }), !1;
    if ((n + "        ").substr(0, 7).toLowerCase(
    ) == "replay-") return document.isReplay = !0, e = parseInt(n.split("-")[1]), ccWinS("wait-win"), xSend("Clash.Replay_Data " + e, !1, function (n) {
        var t = (n + "|||||").split("|");
        ccWinH("wait-win");
        t[0] == e ? battleReplay(
            t) : alert("Error: Replay Unavailable")
    }), !1;
    if (b = obj("layout-image"), b && (b.src + "").indexOf("clash-bg-") == -1 && (document.setLayoutType = function (n) {
        var t = obj("layout-preview");
        t && n == "W" && t.className != "layout-preview W" &&
        (t.className = "layout-preview W");
        t && n != "W" && t.className == "layout-preview W" && (t.className = "layout-preview H")
    }, l = document.createElement("IMG"), nt = function (n) {
        return function () {
            var i = "", r, u, t;
            try {
                r = document.createElement("CANVAS");
                u = r.getContext("2d");
                r.height = n.height;
                r.width = n.width;
                u.drawImage(n, 0, 0);
                i = r.toDataURL().substr(79, 1);
                document.setLayoutType(i == "u" ? "W" : "H")
            } catch (e) {
                i = ""
            }
            i || (t = document.createElement(
                "IFRAME"), t.style.position = "absolute", t.style.top = "-10000px", t = document.body.appendChild(t), t.src = "//" + n.src.split("/")[2] + "/cors-checkimg.html#img=" + n.src.split("/")[3] + "&src=" + (document.location + "")
                .split("/")[2])
        }
    }(l), l.crossOrigin = "Anonymous", attachE(l, "load", nt), attachE(l, "error", nt), l.src = b.src), n) {
        layoutData = n;
        n.indexOf("|") != -1 && (o = n.split("|"), layoutID = o[0], layoutName = (o[1] + "").replace(/[\&][\#]124[\;]/gi,
            "|").replace(/[\&][\#]35[\;]/gi, '"'), layoutType = o[2], layoutUID = o[3], n = o[4], layoutDesc = o[5], document.getElementById("layout-name") && (document.getElementById("layout-name").value = layoutName, document.getElementById(
            "layout-type").value = layoutType, document.getElementById("layout-desc").value = layoutDesc));
        n.substr(0, 2) == "10" || n.substr(0, 2) == "11" ? (y = n.substr(0, 2), setTHL(y), n = n.substr(2)) : (y = n.substr(0, 1), setTHL(y),
            n = n.substr(1));
        var s = (n + "----------").split("-"), ht = sExpand(s[0]),
            a = sExpand(s[1]), ct = sExpand(s[2]), tt = sExpand(s[3]);
        if (s[4] && (layoutID = s[4], layoutPass = s[5]), ht) for (it = ht.split("_"), k = !1, ct && (k = ct.split(
            "_")), t = 0; t < it.length; t++) if (p = it[t], rt = 0, p) for (lt = c["B" + t].split("-")[1], at = c["G" + t], v = 0; v < p.length; v = v + 2) {
            if (i = putC(p.substr(v, 1)) + r, f = putC(p.substr(v + 1, 1)) + r, cItem = createBuilding(lt, i + 1, f + 1, at), cItem.style.visibility = "visible", cItem.childNodes[5] && (cItem.childNodes[5].style.visibility = ""), !layoutPreview) {
                try {
                    cItem.ontouchstart = bbTOUCH;
                    cItem.ontouchend = function () {
                        bbPICKUP(event, cItem.id, !0)
                    }
                } catch (kt) {
                }
                attachE(cItem, "mousedown", bbPICKUP)
            }
            defaultQ[cItem.btype + "U"]--;
            checkP(cItem.x, cItem.y, cItem.w, cItem.h, cItem.gtype == "traps" ? 3 : 2);
            ut = document.getElementById("coc-" + cItem.btype);
            ut && (ut.childNodes[0].innerHTML = "&nbsp;" + defaultQ[cItem.btype + "U"]);
            k && (vt = putC(k[t].substr(rt, 1)), setBuildingLevel(cItem, vt, !0));
            rt++
        }
        if (a) {
            for (d = "", a.indexOf("...") != -1 && (d = a.split("...")[1], a = a.split("...")[0]), g = a.split(
                "_"), ft = thL == 9 ? 8 : thL == 10 ? 10 : defaultLVL.wall[thL], w = 0; w < g.length; w++) for (i = putC(g[w].substr(0, 1)), h = g[w].substr(1), u = 0; u < h.length; u++) {
                var et = h.substr(u, 1),
                    wt = u < h.length - 1 ? h.substr(u + 1, 1) : "",
                    bt = u < h.length -
                    2 ? h.substr(u + 2, 1) : "";
                if (wt == ".") {
                    for (yt = putC(et), pt = putC(bt), zk = yt; zk <= pt; zk++) wallA[i + r][zk + r] = 1, wallL[i + r][zk + r] = ft;
                    u = u + 2
                } else wallA[i + r][putC(et) + r] = 1, wallL[i + r][putC(et) + r] = ft
            }
            if (d) for (ot = 0, i = 1; i <
            mapSize + 1; i++) for (f = 1; f < mapSize + 1; f++) wallA[i][f] == 1 && (wallL[i][f] = putC(d.substr(ot, 1)), ot++)
        }
        if (tt && !layoutPreview) for (t = 0; t < tt.length - 1; t++) defaultLVL["t" + c["T" + t]][0] = putC(tt.substr(t, 1)), st = document.getElementById("troop-" + c["T" + t]), st && (st.level = defaultLVL["t" + c["T" + t]][0]);
        drawWalls();
        cItem = !1;
        calcStats();
        layoutLoaded = !0
    }
    setTroopLevelD()
}

function setBuildingLevel(n, t, i) {
    i || (t = parseInt(n.level + t));
    var r = 11;
    n.troop ? r = defaultLVL[n.btype][8] : defaultLVL[n.btype] && (r = defaultLVL[n.btype][thL]);
    n.gtype == "traps" && n.btype != "bigbomb" && t > r && (t = 1);
    n.level = t < 1 ? 1 : t > r ? r : t;
    n.gtype && n.gtype != "traps" || (n.className =
        (n.className + "").replace(/[\s]*b[\-]l[\d]+/gi, "") + " b-l" + n.level);
    defaultDPS[n.btype] && !attackMode && (n.childNodes[1].style.opacity = defaultDPS[n.btype][n.level] * (30 / defaultDPS[n.btype][0]) / 100);
    n.childNodes[
        3] && (n.childNodes[3].innerHTML = n.level)
}

function createBuilding(n, t, i, r, u) {
    var f = document.createElement("DIV"), c, l, e, a, s, o, v, h;
    return f.btype = n, f.gtype = r, f.className = "coc-b coc-" + f.btype + (f.gtype ? " coc-grid-" +
        f.gtype : ""), f.id = "b-" + IDK++, f = document.getElementById("grid").appendChild(f), f.w = f.offsetWidth / 20, f.h = f.offsetHeight / 20, t != -1 ? (t = t < 0 ? 0 : t > mapSize + 1 - f.w ? mapSize + 1 - f.w : t, i = i < 0 ? 0 : i > mapSize + 1 - f.w ? mapSize + 1 -
        f.w : i, f.x = t, f.y = i, f.style.left = (t - 1) * 20 + "px", f.style.top = (i - 1) * 20 + "px", f.style.display = "block") : (f.x = 0, f.y = 0, f.style.left = "-120px", f.style.visibility = "hidden"), u ? (f.troop = u, f.level = defaultLVL[n][defaultLVL.research[thL]]) : (f.level = 5, defaultLVL[n] && (f.level = thL == 1 ? 1 : defaultLVL[n][thL - (document.useLevelMax ? 0 : 1)]), n.indexOf("hero") == -1 && f.level || (f.level = 1)), f.gtype || (f.className += " b-l" + f.level), c = document.createElement("SPAN"), c.className = "bi", f.appendChild(c), attackMode || (l = document.createElement("SPAN"), l.className = "radius level-" + f.level, f.appendChild(l)), layoutPreview || attackMode || (e = document.createElement(
        "SPAN"), e.className = "level-s level-u", e = f.appendChild(e), a = function () {
        setBuildingLevel(f, 1)
    }, attachE(e, "mousedown", a), attachE(e, "ontouchstart", a), s = document.createElement("SPAN"), s.className = "level-s level-n",
        s = f.appendChild(s), s.innerHTML = f.level, o = document.createElement("SPAN"), o.className = "level-s level-d", o = f.appendChild(o), v = function () {
        setBuildingLevel(f, -1)
    }, attachE(o, "mousedown", v), attachE(o, "ontouchstart",
        v), h = document.createElement("SPAN"), h.className = "coc-drag-arr", h.style.visibility = "hidden", h = f.appendChild(h)), setBuildingLevel(f, 0), f
}

function toggleScreen(n, t, i) {
    var r;
    if (n = n ? n : event, r = n.target ? n.target :
        n.srcElement, i || r.className == "screen-overlay" || r.className == "screen-x") {
        var f = document.getElementById(t),
            u = document.getElementById(t + "-link"),
            e = f.style.display == "block";
        f.style.display = e ? "none" : "block";
        u && (u.innerHTML = (e ? "Show" : "Hide") + " " + (u.innerHTML + "").replace(/(Show|Hide)[\s]*/gi, ""))
    }
}

function getLabLevel() {
    for (var t = document.getElementsByTagName("A"), i = 0, r, n = 0; n < t.length; n++) (t[n].className + "")
        .indexOf("coc-b ") != -1 && (r = t[n].className.split(" ")[1], r == "coc-research" && (i = t[n].level, n = 999));
    return i == 0 && (i = defaultLVL.research[thL]), i
}

function setTroopLevelD() {
    var e = document.getElementById("troops"),
        r, f, u, n, i, t;
    if (layoutPreview || !r) return !1;
    for (r = e.getElementsByTagName("A"), f = getLabLevel(), u = 0; u < r.length; u++) n = r[u], (n.id + "-").split("-")[0] == "troop" && (i = n.id.split("-")[1], defaultLVL["t" + i][0] != 0 &&
    n.level ? (t = defaultLVL["t" + i][0], n.level = t) : (t = defaultLVL["t" + i][f], defaultLVL["t" + i][0] = t), n.childNodes[0].className = "troop-star level-" + t, n.childNodes[1].innerHTML = t == 0 ? "" : statsV.tcost["t" + i][t])
}

function setTroopLevel(
    n) {
    var t;
    if (n = n ? n : event, t = n.target ? n.target : n.srcElement, t.tagName == "DIV" && (t = t.parentNode), (t.childNodes[0].className + "").indexOf("level-0") != -1) return alert("This troop/spell is not available at the current townhall level"),
        !1;
    var r = t.id.split("-")[1], i = defaultLVL["t" + r][0], u = getLabLevel();
    i < defaultLVL["t" + r][u] ? i++ : i = 1;
    t.level = i;
    t.childNodes[0].className = "troop-star level-" + i;
    t.childNodes[1].innerHTML = statsV.tcost["t" + r][
        i];
    defaultLVL["t" + r][0] = i
}

function calc_SetLevels(n) {
    for (var u = {}, r = document.getElementsByTagName("DIV"), f, t, i = 0; i < r.length; i++) (r[i].className + "").indexOf("coc-b ") != -1 && (t = r[i].className.split(" ")[
        1].split("-")[1], f = r[i].level, u[t] || (u[t] = 0), calc.cSTLVL[t] || (calc.cSTLVL[t] = new Array(50)), n ? (calc.cMAXLVL[t] || (calc.cMAXLVL[t] = new Array(50)), calc.cMAXLVL[t][u[t]] = f) : calc.cSTLVL[t][u[t]] = f, u[t]++, n &&
    (calc.maxQ[t] = u[t]));
    for (r = "tbarbarian,tarcher,tgoblin,tgiant,twallbreaker,tballoon,twizard,thealer,tdragon,tpekka,tminion,thogrider,tvalkyrie,tgolem,tlightning,thealing,trage,tjump".split(","), i = 0; i <
    r.length; i++) t = r[i], calc.cSTLVL[t] || (calc.cSTLVL[t] = new Array(50)), calc.cMAXLVL[t] || (calc.cMAXLVL[t] = new Array(50)), n ? (calc.cMAXLVL[t][0] = defaultLVL[t][0] == 0 ? 1 : defaultLVL[t][0], calc.cSTLVL[t][0] = 1) : calc.cSTLVL[t][0] = defaultLVL[t][0] == 0 ? 1 : defaultLVL[t][0]
}

function calc_SetMax(n, t) {
    var u = "goldstorage,elixerstorage,cannon,archer,air,mortar,wizard,tesla,elixer,castle,xbow,gold,barracks,dbarracks,spells,research,army,delixerstorage,delixer,herobarbarian,heroarcher".split(","),
        f, e, r, i;
    for (calc.cMAXLVL.townhall = new Array(0), calc.cMAXLVL.townhall[0] = 9, r = 0; r < u.length; r++) for (i = u[r], calc.maxQ[i] = n ? 0 : defaultQ[i][t], f = 0; f < defaultQ[i][10]; f++) calc.cMAXLVL[i] || (calc.cMAXLVL[
        i] = new Array(50)), calc.cMAXLVL[i][f] = n ? 0 : defaultLVL[i][t];
    for (e = defaultLVL.research[t], u = "tbarbarian,tarcher,tgoblin,tgiant,twallbreaker,tballoon,twizard,thealer,tdragon,tpekka,tminion,thogrider,tvalkyrie,tgolem,tlightning,thealing,trage,tjump".split(","), r = 0; r < u.length; r++) i = u[r], calc.cMAXLVL[i] || (calc.cMAXLVL[i] = new Array(50)), calc.cMAXLVL[i][0] = n ? 1 : defaultLVL[i][e]
}

function calc_Gems() {
    var s = parseInt(document.getElementById("stat-sim").value),
        h = document.getElementById("inc-hero").checked,
        l = document.getElementById("inc-wall").checked, t, f, r, i, u, n;
    statReport("CLEAR");
    calc.gems = 0;
    calc.rgems = 0;
    calc.tgems = 0;
    calc.error = !1;
    calc.cMAXLVL = new Array(50);
    calc.cSTLVL = new Array(50);
    calc.cSTLVL.townhall = [1, 1];
    calc.cSTLVL.goldstorage = [1, 0, 0, 0];
    calc.cSTLVL.elixerstorage = [1, 0, 0, 0];
    calc.cSTLVL.delixerstorage = new Array(0);
    calc.cSTMAX = new Array(50);
    calc.cSTMAX.g = 1e3;
    calc.cSTMAX.e = 1e3;
    calc.cSTMAX.d = 1e3;
    calc.maxQ = new Array(50);
    calc.cRSC = {};
    calc.cRSC.g = 0;
    calc.cRSC.e = 0;
    calc.cRSC.d = 0;
    t = 10;
    switch (s) {
        case 1:
            calc_SetMax(!0, 10);
            calc_SetLevels(!0);
            t = thL;
            break;
        case 2:
            calc_SetMax(!1, 10);
            t = 10;
            break;
        case 3:
            calc_SetMax(!1, 10);
            calc_SetLevels();
            t = 10
    }
    for (calc_MaxRSC(), n = 0; calc.cSTLVL.townhall[0] < t - 1 && n < 1e3;) calc_DoUpgrade("townhall", 0, "min"), n++;
    while (calc.cSTLVL.townhall[
        0] < t && n < 1e3) calc_DoUpgrade("townhall", 0, "fill"), n++;
    for (calc_DoMax("goldstorage", t, "fill"), calc_DoMax("elixerstorage", t, "fill"), calc_DoMax("delixerstorage", t, "fill"), r = "cannon,archer,air,mortar,wizard,tesla,elixer,castle,xbow,gold,barracks,dbarracks,spells,research,army,delixerstorage,delixer".split(","), i = 0; i < r.length; i++) for (u = r[i], f = 0; f < calc.maxQ[u]; f++) calc_DoMaxIDX(f, u, 10, "fill");
    for (r = "tbarbarian,tarcher,tgoblin,tgiant,twallbreaker,tballoon,twizard,thealer,tdragon,tpekka,tminion,thogrider,tvalkyrie,tgolem,tlightning,thealing,trage,tjump".split(","), i = 0; i < r.length; i++) u = r[i], calc_DoMaxIDX(0, u, 10, "fill", 1, !0);
    if (h) {
        for (calc_DoMax("herobarbarian", 10, "fill"), calc.cSTLVL.heroarcher || (calc.cSTLVL.heroarcher = new Array(50)), calc.cSTLVL.heroarcher[
            0] || (calc.cSTLVL.heroarcher[0] = 0), n = 0; calc.cSTLVL.heroarcher[0] < calc.cMAXLVL.heroarcher[0] - 1 && n < 1e3;) calc_DoUpgrade("heroarcher", 0, "fill"), n++;
        for (n = 0; calc.cSTLVL.heroarcher[0] < calc.cMAXLVL.heroarcher[
            0] && n < 1e3;) calc_DoUpgrade("heroarcher", 0, "min"), n++
    }
    setStat("gem-cost", vMoney(calc.gems) + " &nbsp; (" + vMoney(calc.rgems) + " on Resources, " + vMoney(calc.tgems) + " on Time)", "n");
    var e = calc_gemCost(calc.gems),
        o = calc_gemCost(calc.rgems), c = e - o;
    setStat("usd-cost", "<b style='color:red;'>$" + vMoney(e) + "<\/b> &nbsp; ($" + vMoney(o) + " on Resources, $" + vMoney(c) + " on Time)", "n");
    statReport("SHOW")
}

function calc_MaxRSC() {
    calc.cSTMAX.g = 0;
    calc.cSTMAX.e = 0;
    calc.cSTMAX.d = 0;
    for (var n = 0; n < 4; n++) calc.cSTMAX.g += statsV.rlvl.g[calc.cSTLVL.goldstorage[n]], calc.cSTMAX.e += statsV.rlvl.e[calc.cSTLVL.elixerstorage[n]];
    statsV.rlvl.d[
        calc.cSTLVL.delixerstorage[0]] && (calc.cSTMAX.d += statsV.rlvl.d[calc.cSTLVL.delixerstorage[0]])
}

function calc_DoMax(n, t, i) {
    for (var r = 0; r < calc.maxQ[n]; r++) calc_DoMaxIDX(r, n, t, i)
}

function calc_DoMaxIDX(n,
                       t, i, r, u) {
    calc.cSTLVL[t] || (calc.cSTLVL[t] = new Array(50));
    calc.cSTLVL[t][n] || (calc.cSTLVL[t][n] = 0);
    for (var f = 0; calc.cSTLVL[t][n] < calc.cMAXLVL[t][n] && f < 1e3;) calc_DoUpgrade(t, n, r, u), f++
}

function calc_DoBuy(
    n, t, i) {
    var r, u;
    switch (t) {
        case"min":
            r = i - calc.cRSC[rType];
            break;
        case"10%":
            r = calc.cSTMAX[rType] * .1;
            calc.cRSC[rType] + r > calc.cSTMAX[rType] && (r = calc.cSTMAX[rType] - calc.cRSC[rType]);
            break;
        case"50%":
            r = calc.cSTMAX[
                rType] * .5;
            calc.cRSC[rType] + r > calc.cSTMAX[rType] && (r = calc.cSTMAX[rType] - calc.cRSC[rType]);
            break;
        case"fill":
            r = calc.cSTMAX[rType] - calc.cRSC[rType]
    }
    u = calc_resCost(r);
    calc.gems += u;
    calc.cRSC[rType] += r
}

function calc_DoUpgrade(
    n, t, i, r) {
    var o, h, l, f;
    t = t ? t : 0;
    i = i ? i : "min";
    calc.cSTLVL[n] || (calc.cSTLVL[n] = new Array(50));
    calc.cSTLVL[n][t] || (calc.cSTLVL[n][t] = 0);
    var e = calc.cSTLVL[n][t] + 1, s = statsV.cost[n][e] * 1e3,
        u = statsV.cost[n][0];
    if (
        calc.cSTMAX[u] < s) {
        var c = (u == "g" ? "gold" : (u == "e" ? "" : "d") + "elixer") + "storage",
            t = 0, v = defaultQ[c][calc.cSTLVL.townhall[0]],
            a = defaultLVL[c][calc.cSTLVL.townhall[0]];
        for (o = 0; o < v; o++) calc.cSTLVL[c][o] < a && (t = o,
            o = 99);
        if (o == 100) calc_DoUpgrade(c, t, i); else return statReport("error", "Unable to upgrade " + c + " to level " + a + " at TH " + calc.cSTLVL.townhall[0]), !1
    } else {
        if (calc.cRSC[u] < s) {
            h = s - calc.cRSC[u];
            switch (i) {
                case"fill":
                    h = calc.cSTMAX[u] - calc.cRSC[u]
            }
            f = calc_resCost(h * (u == "d" ? 100 : 1));
            calc.gems += f;
            calc.rgems += f;
            calc.cRSC[u] += h;
            statReport("buy", h + " " + (u == "g" ? "Gold" : u == "e" ? "Elixer" : "D Elixer") + " for " + f + " Gems")
        }
        calc.cSTLVL[
            n][t] = e;
        calc.cRSC[u] = calc.cRSC[u] - s;
        calc_MaxRSC();
        r ? statReport("train", n.substr(1) + " (L" + (e - 1) + " to L" + e + " for " + statN(s) + " " + (u == "g" ? "G" : u == "e" ? "E" : "DE") + ")") : statReport("build", n + (",townhall,heroarcher,herobarbarian,research,spells,castle,delixerstorage,".indexOf("," + n + ",") != -1 ? "" : " " + (t + 1)) + " (L" + (e - 1) + " to L" + e + " for " + statN(s) + " " + (u == "g" ? "G" : u == "e" ? "E" : "DE") + ")");
        l = statsV.time[n][e];
        l > 0 && (f = calc_gemTime(l * 60), calc.gems += f, calc.tgems += f, r ? statReport(
            "speed", "Train " + n.substr(1) + " (" + vTime(l) + ", " + f + " gems)") : statReport("speed", n + (",townhall,heroarcher,herobarbarian,research,spells,castle,delixerstorage,".indexOf("," + n + ",") != -1 ? "" : " " + (t + 1)) + " (" +
            vTime(l) + ", " + f + " gems)"))
    }
    return !0
}

function statReport(n, t) {
    var i;
    switch (n) {
        case"CLEAR":
            i = document.getElementById("stat-report");
            i.innerHTML = "";
            calc.rep = "";
            break;
        case"SHOW":
            i = document.getElementById(
                "stat-report");
            i.innerHTML = calc.rep;
            break;
        case"error":
            calc.error || (calc.rep += "<div class='rep-row'><div class='rep-g'>" + statN(calc.cRSC.g) + "<\/div><div class='rep-e'>" + statN(calc.cRSC.e) + "<\/div><div class='rep-d'>" +
                statN(calc.cRSC.d) + "<\/div><div class='rep-m'>" + statN(calc.gems) + "<\/div><div class='rep-a'>" + n + "<\/div><div class='rep-txt'>" + t + "<\/div><\/div>");
            calc.error = !0;
            break;
        default:
            calc.rep += "<div class='rep-row'><div class='rep-g'>" +
                statN(calc.cRSC.g) + "<\/div><div class='rep-e'>" + statN(calc.cRSC.e) + "<\/div><div class='rep-d'>" + statN(calc.cRSC.d) + "<\/div><div class='rep-m'>" + statN(calc.gems) + "<\/div><div class='rep-a'>" + n + "<\/div><div class='rep-txt'>" +
                t + "<\/div><\/div>"
    }
}

function statN(n) {
    return n < 1e3 ? n : n < 1e5 ? Math.round(n / 1e3, 2) + "k" : n < 1e6 ? Math.round(n / 1e3, 0) + "k" : Math.round(n / 1e6, 2) + "m"
}

function calc_resCost(n) {
    var r;
    if (!n) return 0;
    var t = [100, 1e3, 1e4,
        1e5, 1e6, 1e7], i = [1, 5, 25, 125, 600, 3e3], u = 8001e3;
    if (n == 0) return 0;
    if (n <= t[0]) return i[0];
    for (r = 1; r < t.length - 1; r++) if (n <= t[r]) return Math.round((n - t[r - 1]) / ((t[r] - t[r - 1]) / (i[r] - i[r - 1])) + i[r - 1]);
    return n <= u ?
        Math.round((n - t[t.length - 2]) / ((t[t.length - 1] - t[t.length - 2]) / (i[i.length - 1] - i[i.length - 2])) + i[i.length - 2]) : calc_resCost(n % u) + Math.floor(n / u) * calc_resCost(u)
}

function calc_gemTime(n) {
    var t = [60, 3600, 86400,
        604800], i = [1, 20, 260, 1e3], r;
    if (n == 0) return 0;
    if (n <= t[0]) return i[0];
    for (r = 1; r < t.length - 1; r++) if (n <= t[r]) return Math.floor((n - t[r - 1]) / ((t[r] - t[r - 1]) / (i[r] - i[r - 1])) + i[r - 1]);
    return Math.floor((n - t[t.length -
    2]) / ((t[t.length - 1] - t[t.length - 2]) / (i[i.length - 1] - i[i.length - 2])) + i[i.length - 2])
}

function calc_gemCost(n) {
    for (var i = [500, 1200, 2500, 6500, 14e3], u = [4.99, 9.99, 19.99, 49.99, 99.99], r = 0, t = i.length - 1; t >= 0; t--)
        while (n >= i[t]) r += u[t], n -= i[t];
    return n > 0 && (r += u[0]), r
}

function xclh(n, t, i) {
    var r = document.createElement("script"), u;
    r.type = "text/javascript";
    r.async = !0;
    top.document.xclhCB = i;
    r.src = ("https:" == document.location.protocol ? "https://" : "http://") + "clash.zuuga.com/xclh-" + n + ".js?opt=" + t + "&tt=" + (new Date).getTime();
    u = document.getElementsByTagName("script")[0];
    u.parentNode.insertBefore(r, u)
}

function gmSaveBtn() {
    (document.body.className + "").indexOf("ul-in") != -1 ? gmShowSave() : (ulTimeout("Login or Sign Up for a free account to save your Base"), document.ulAfter = function () {
        gmShowSave()
    });
    controlLoad();
    gmLogEvent(
        "Save Button")
}

function gmShowSave() {
    ccWinS("save-win");
    setDefaultFields(obj("save"));
    tagSearch(obj("lt-tags"));
    tagSearchCB("21:anti hog;22:anti gowipe;30:anti gowiwi;31:anti loonian;32:anti lavaloonian;38:anti dragon;42:its a trap;43:its so pretty;44:protect the gold;45:protect the elixer;46:protect the de")
}

function gmLinkBtn() {
    document.getElementById("links").className = "control-win" + (layoutID ? "" : " not-saved");
    var n = document.getElementById("layout-link");
    layoutID ? (n.value = "http://www.clashofclans-tools.com/Layout-" +
        layoutID, n.longv = n.value, n.shortv = "", gmLinkImg()) : (n.value = "http://www.clashofclans-tools.com/Layout-Builder#" + saveLayout(!0), n.longv = n.value, n.shortv = "", document.getElementById("layout-link-img").value =
        "Need to Save First");
    document.getElementById("layout-link-img").disabled = !layoutID;
    document.getElementById("img-type").disabled = !layoutID;
    document.getElementById("img-size").disabled = !layoutID;
    gmShortLink(
    );
    ccWinS("links-win");
    controlLoad();
    gmLogEvent("Link Button")
}

function gmShortLink() {
    var n = document.getElementById("layout-link");
    document.getElementById("short-link").checked ? (ccWinS("wait-win"), async(
        "gshort", "apis.google.com/js/client.js", function () {
            setTimeout(gmShortLinkS, 1e3)
        })) : n.value = n.longv
}

function gmShortLinkS() {
    ccWinH("wait-win");
    var n = document.getElementById("layout-link");
    n.shortv ? n.value =
        n.shortv : gapi.client.load("urlshortener", "v1", gmShortLinkCB)
}

function gmShortLinkCB() {
    var n, t, i;
    if ((document.location + "").indexOf("test.clash") != -1) return n = document.getElementById("layout-link"), n.shortv =
        "http://goo.gl/testversion", n.value = n.shortv, !1;
    t = document.getElementById("layout-link").longv;
    i = gapi.client.urlshortener.url.insert({resource: {longUrl: t}});
    i.execute(function (n) {
        var t = document.getElementById(
            "layout-link");
        t.shortv = n.id;
        t.value = t.shortv
    })
}

function gmLinkImg() {
}

function getZoom(n) {
    var i = window.getComputedStyle(n, null), t;
    return !1 && layoutTouch ? (t = i.getPropertyValue("zoom"), parseFloat(t)) : (t =
        i.getPropertyValue("-" + transType + "-transform"), t || (t = i.getPropertyValue("transform"), transType = ""), t || (t = i.getPropertyValue("-moz-transform"), transType = "moz"), t || (t = i.getPropertyValue("-ms-transform"),
        transType = "ms"), parseFloat(t.split("(")[1].split(",")[0]))
}

function gmSetZoom(n, t, i) {
    !1 && layoutTouch ? (n.style[transType ? transType + "Transition" : "transition"] = t == "none" ? "all 0s" : "zoom " + t + "ms ease-in", n.style[transType ? transType + "Transform" : "transform"] = "none", n.style.zoom = i) : (n.style[transType ? transType + "Transition" : "transition"] = t == "none" ? "all 0s" : (transType ? "-" + transType + "-" : "") + "transform " + t + "ms ease-in",
        n.style[transType ? transType + "Transform" : "transform"] = "scale(" + i + ")", n = obj("layout-image"), n && (i = i / .6, n.style[transType ? transType + "Transition" : "transition"] = t == "none" ? "all 0s" : (transType ? "-" + transType +
        "-" : "") + "transform " + t + "ms ease-in", n.style[transType ? transType + "Transform" : "transform"] = "scale(" + i + ")"))
}

function gmZoomS(n, t, i) {
    var r, u;
    if (n = n ? n : event, eventPD(n), r = document.getElementById("grid-canvas"),
        u = (new Date).getTime(), i && r.stime && u - r.stime < 2e3) return r.zd != t && gmZoomE(r.zd), !1;
    r.stime = u;
    r.zd = t;
    var f = getZoom(r), e = t == 1 ? 1.5 - f : f - .32,
        o = Math.round(2e3 * e);
    gmSetZoom(r, o, t == 1 ? 1.5 : .32)
}

function gmZoomE(
    n) {
    var t, i;
    n = n ? n : event;
    t = document.getElementById("grid-canvas");
    t.stime = 0;
    i = getZoom(t);
    gmSetZoom(t, 0, i);
    gmLogEvent("Set Zoom")
}

function gmZoomTouchS(n, t) {
    n = n ? n : event;
    eventPD(n);
    t.z || (t.z = getZoom(t));
    var
        i = Math.round(t.z * 100 * n.scale);
    t.tmpz = (i < 50 ? 50 : i > 150 ? 150 : i) / 100;
    gmSetZoom(t, "none", t.tmpz)
}

function gmZoomTouchE(n, t) {
    n = n ? n : event;
    t.z = !1;
    gmSetZoom(t, "none", t.tmpz)
}

function gmWinHeight(n, t) {
    h = window.innerHeight;
    var i = document.getElementById("grid-box"),
        r = document.getElementById("tools-box"),
        u = document.getElementById("buildings");
    contentSize() ? (i.style.height = h + "px", u.style.height = h - 32 + "px", r.style.top = -h + "px") :
        (i.style.height = "900px", u.style.height = "", r.style.top = "-900px");
    t || (h == 301 || h == 320) && setTimeout(function () {
        window.scrollTo(0, 0);
        isFS = addBodyClass("fullscreen", 1)
    }, 1)
}

function gmWinScroll(n) {
    gmWinHeight(
        n, !0)
}


var thL = 9,


    defaultQ = {}, defaultDPS = {}, defaultLVL = {}, defaultHP = {},
    defaultTS = {},
    statsV = {res: {}, time: {}, cost: {}, rlvl: {}, tcost: {}}, k, calc;
defaultQ.twallbreaker = [0, 5, 5, 5, 5, 5, 10, 10, 15, 20, 30];
defaultQ.tbarbarian =
    [0, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250];
defaultDPS.tbarbarian = [0, 8, 11, 14, 18, 23, 26, 30];
defaultDPS.tarcher = [0, 7, 9, 12, 16, 20, 22, 25];
defaultDPS.tgoblin = [0, 11, 14, 19, 24, 32, 32, 32];
defaultDPS.tgiant = [0, 11,
    14, 19, 24, 31, 40, 40];
defaultDPS.twallbreaker = [0, 12, 16, 24, 32, 46, 60, 60];
defaultDPS.tballoon = [0, 25, 32, 48, 72, 108, 162, 162];
defaultDPS.twizard = [0, 50, 70, 90, 125, 170, 180, 180];
defaultDPS.thealer = [0, 35, 42, 55, 71, 71,
    71, 71];
defaultDPS.tdragon = [0, 140, 160, 180, 190, 190, 190, 190];
defaultDPS.tpekka = [0, 240, 270, 300, 340, 380, 380, 380];
defaultDPS.tminion = [0, 35, 38, 42, 46, 50, 54, 54];
defaultDPS.thogrider = [0, 60, 70, 80, 92, 105, 105, 105];
defaultDPS.tvalkyrie = [0, 88, 99, 111, 124, 124, 124, 124];
defaultDPS.tgolem = [0, 38, 42, 46, 50, 54, 54, 54];
defaultDPS.tgolemite = [0, 7, 8, 9, 10, 11, 11, 11];
defaultDPS.twitch = [0, 25, 30, 30, 30, 30, 30, 30];
defaultDPS.tskeleton =
    [0, 25, 25, 25, 25, 25, 25, 25];
defaultDPS.tlavahound = [0, 10, 12, 14, 14, 14, 14, 14];
defaultDPS.tlavapup = [0, 35, 35, 35, 35, 35, 35, 35];
defaultDPS.tlightning = [0, 50, 55, 60, 65, 70, 75];
defaultDPS.thealing = [0, 600, 800, 1e3, 1200,
    1400, 1600];
defaultDPS.trage = [0, 130, 140, 150, 160, 180, 180];
defaultDPS.tragesp = [0, 20, 22, 24, 26, 28, 28];
defaultDPS.tjump = [0, 30, 60, 60, 60, 60, 60];
defaultDPS.tfreeze = [0, 4, 5, 6, 7, 7, 7];
defaultHP.tbarbarian = [0, 45, 54,
    65, 78, 95, 110, 125];
defaultHP.tarcher = [0, 20, 23, 28, 33, 40, 44, 48];
defaultHP.tgoblin = [0, 11, 14, 19, 24, 32, 32, 32];
defaultHP.tgiant = [0, 300, 360, 430, 520, 670, 880, 880];
defaultHP.twallbreaker = [0, 20, 24, 29, 35, 42, 54, 54];
defaultHP.tballoon = [0, 150, 180, 216, 280, 390, 545, 545];
defaultHP.twizard = [0, 75, 90, 108, 130, 156, 164, 164];
defaultHP.thealer = [0, 500, 600, 840, 1176, 1176, 1176, 1176];
defaultHP.tdragon = [0, 1900, 2100, 2300, 2400, 2400, 2400,
    2400];
defaultHP.tpekka = [0, 2800, 3100, 3500, 4e3, 4500, 4500, 4500];
defaultHP.tminion = [0, 55, 60, 66, 72, 78, 78, 78];
defaultHP.thogrider = [0, 270, 312, 360, 415, 475, 475, 475];
defaultHP.tvalkyrie = [0, 900, 1e3, 1100, 1200, 1200,
    1200, 1200];
defaultHP.tgolem = [0, 4500, 5e3, 5500, 6e3, 6300, 6300, 6300];
defaultHP.tgolemite = [0, 900, 1e3, 1100, 1200, 1300, 1300, 1300];
defaultHP.twitch = [0, 75, 100, 100, 100, 100, 100, 100];
defaultHP.tskeleton = [0, 45, 45, 45,
    45, 45, 45, 45];
defaultHP.tlavahound = [0, 5700, 6200, 6700, 6700, 6700, 6700, 6700];
defaultHP.tlavapup = [0, 55, 55, 55, 55, 55, 55, 55];
defaultHP.wall = [0, 300, 500, 700, 900, 1400, 2e3, 2500, 3e3, 4e3, 5500, 7e3, 0, 0];
defaultHP.mortar =
    [0, 400, 450, 500, 550, 590, 610, 640, 0, 0, 0, 0, 0, 0];
defaultHP.air = [0, 800, 860, 900, 940, 990, 1040, 1100, 1160, 0, 0, 0, 0, 0];
defaultHP.cannon = [0, 400, 450, 500, 550, 590, 610, 630, 660, 690, 750, 900, 1080, 0];
defaultHP.wizard = [0, 620,
    650, 680, 730, 790, 850, 930, 1010, 1150, 0, 0, 0, 0];
defaultHP.archer = [0, 400, 450, 500, 550, 590, 610, 630, 660, 690, 720, 750, 790, 840];
defaultHP.townhall = [0, 1500, 1600, 1850, 2100, 2400, 2800, 3200, 3900, 4600, 5500, 6800, 0, 0];
defaultHP.goldstorage = [0, 400, 600, 800, 1e3, 1200, 1500, 1600, 1700, 1800, 1900, 2100, 2500, 0];
defaultHP.elixerstorage = [0, 400, 600, 800, 1e3, 1200, 1500, 1600, 1700, 1800, 1900, 2100, 2500, 0];
defaultHP.delixerstorage = [0, 2e3, 2200, 2400,
    2600, 2900, 3200, 0, 0, 0, 0, 0, 0, 0];
defaultHP.gold = [0, 400, 450, 500, 550, 590, 610, 630, 660, 680, 710, 750, 0, 0];
defaultHP.elixer = [0, 400, 450, 500, 550, 590, 610, 630, 660, 680, 710, 750, 0, 0];
defaultHP.delixer = [0, 400, 480, 580, 690,
    830, 1e3, 0, 0, 0, 0, 0, 0, 0];
defaultHP.castle = [0, 1e3, 1400, 2e3, 2600, 3e3, 0, 0, 0, 0, 0, 0, 0, 0];
defaultHP.research = [0, 500, 550, 600, 650, 700, 750, 830, 950, 1070, 0, 0, 0, 0];
defaultHP.spells = [0, 200, 300, 400, 500, 600, 0, 0, 0, 0, 0,
    0, 0, 0];
defaultHP.army = [0, 400, 500, 600, 700, 800, 1e3, 1200, 1400, 0, 0, 0, 0, 0];
defaultHP.dbarracks = [0, 250, 300, 350, 400, 450, 500, 0, 0, 0, 0, 0, 0, 0];
defaultHP.barracks = [0, 250, 270, 280, 290, 310, 320, 340, 350, 390, 420, 0, 0, 0];
defaultHP.builder = [0, 250, 250, 250, 250, 250, 0, 0, 0, 0, 0, 0, 0, 0];
defaultHP.tesla = [0, 600, 630, 660, 690, 730, 770, 810, 850, 0, 0, 0, 0, 0];
defaultHP.xbow = [0, 1500, 1900, 2400, 2800, 0, 0, 0, 0, 0, 0, 0, 0, 0];
defaultHP.inferno = [0, 1500,
    1900, 2200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
defaultHP.airsweeper = [0, 750, 800, 850, 900, 950, 1e3, 0, 0, 0, 0, 0, 0, 0];
defaultHP.herobarbarian = [0, 250, 250, 250, 250, 250, 0, 0, 0, 0, 0, 0, 0, 0];
defaultHP.heroarcher = [0, 250, 250, 250, 250, 250,
    0, 0, 0, 0, 0, 0, 0, 0];
defaultHP.darkspell = [0, 615, 615, 615, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
defaultHP.eagle = [0, 4e3, 4400, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
defaultTS.tbarbarian = [16, 1, .4, 1, 1, 10, 1, 1, 20];
defaultTS.tarcher = [24, 1, 3.5, 1, 1,
    10, 3, 1, 25];
defaultTS.tgoblin = [32, 1, .4, 1, 1, 10, 1, 2, 30];
defaultTS.tgiant = [12, 2, 1, 5, 1, 10, 1, 3, 120];
defaultTS.twallbreaker = [24, 1, 1, 2, 2, 20, 1, 4, 120];
defaultTS.tballoon = [10, 4, .5, 5, 2.2, 10, 1, 3, 480];
defaultTS.twizard =
    [16, 1.5, 3, 4, 1.3, 10, 3, 1, 480];
defaultTS.thealer = [16, .7, 5, 14, 3, 10, 1, 5, 900];
defaultTS.tdragon = [16, 1.5, 3, 20, 1.3, 10, 3, 1, 1800];
defaultTS.tpekka = [16, 2.5, .8, 25, 1, 10, 1, 1, 2700];
defaultTS.tminion = [32, 1, 2.75, 2, 1, 10,
    3, 1, 45];
defaultTS.thogrider = [24, 1, .6, 5, 1, 10, 1, 3, 480];
defaultTS.tvalkyrie = [24, 1.8, .5, 8, 2, 10, 1, 1, 900];
defaultTS.tgolem = [12, 2.4, 1, 30, 1, 10, 1, 3, 2700];
defaultTS.twitch = [12, .7, 5, 12, 1.3, 10, 3, 1, 1200];
defaultTS.tskeletons = [24, 1, .4, 1, 1, 10, 1, 1, 0];
defaultTS.tlavahound = [20, 2, 1, 30, 1, 10, 3, 6, 2700];
defaultTS.tlavapup = [32, 1, 2, 1, 1, 10, 3, 1, 0];
defaultTS.herobarbarian = [0, 0, 13, 3, 1, 0, 0];
defaultTS.heroarcher = [0, 0, 13, 3, 1, 0, 0];
defaultTS.mortar = [4, 5, 11, 3, 4, 0, 1];
defaultTS.eagle = [7, 5, 50, 4, 4, 0, 1];
defaultTS.air = [0, 1, 10, 3, 1, 0, 2];
defaultTS.cannon = [0, .8, 9, 3, 1, 0, 1];
defaultTS.wizard = [0, 1.3, 7, 3, 3, 0, 3];
defaultTS.archer = [0, 1, 10, 3, 1, 0, 3];
defaultTS.tesla = [6, .6, 7, 2, 1, 0, 3];
defaultTS.xbow = [11, .128, 14, 3, 1, 0, 3];
defaultTS.inferno = [0, .128, 10, 2, 1, 0, 3];
defaultTS.airsweeper = [0, 5, 15, 2, 1, 0, 3];
defaultTS.castle = [0, 0, 13, 3, 1, 0, 0];
defaultTS.townhall = [0,
    0, 0, 4, 0, 0, 0];
defaultTS.goldstorage = [0, 0, 0, 3, 0, 0, 0];
defaultTS.elixerstorage = [0, 0, 0, 3, 0, 0, 0];
defaultTS.delixerstorage = [0, 0, 0, 3, 0, 0, 0];
defaultTS.gold = [0, 0, 0, 3, 0, 0, 0];
defaultTS.elixer = [0, 0, 0, 3, 0, 0, 0];
defaultTS.delixer = [0, 0, 0, 3, 0, 0, 0];
defaultTS.research = [0, 0, 0, 4, 0, 0, 0];
defaultTS.spells = [0, 0, 0, 3, 0, 0, 0];
defaultTS.army = [0, 0, 0, 5, 0, 0, 0];
defaultTS.dbarracks = [0, 0, 0, 3, 0, 0, 0];
defaultTS.barracks = [0, 0, 0, 3, 0, 0, 0];
defaultTS.builder = [0, 0, 0, 2, 0, 0, 0];
defaultTS.darkspells = [0, 0, 0, 3, 0, 0, 0];
defaultQ.townhall = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
defaultQ.wall = [0, 0, 25, 50, 75, 100, 125, 175, 225, 250, 275, 275];
defaultQ.mortar = [0, 0, 0, 1, 1, 1, 2, 3, 4, 4, 4,
    4];
defaultQ.air = [0, 0, 0, 0, 1, 1, 2, 3, 3, 4, 4, 4];
defaultQ.cannon = [0, 2, 2, 2, 2, 3, 3, 5, 5, 5, 6, 7];
defaultQ.wizard = [0, 0, 0, 0, 0, 1, 2, 2, 3, 4, 4, 5];
defaultQ.archer = [0, 0, 1, 1, 2, 3, 3, 4, 5, 6, 7, 8];
defaultQ.goldstorage = [0, 1, 1, 2, 2,
    2, 2, 2, 3, 4, 4, 4];
defaultQ.elixerstorage = [0, 1, 1, 2, 2, 2, 2, 2, 3, 4, 4, 4];
defaultQ.delixerstorage = [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1];
defaultQ.gold = [0, 1, 2, 3, 4, 5, 6, 6, 6, 6, 7, 7];
defaultQ.elixer = [0, 1, 2, 3, 4, 5, 6, 6, 6, 6, 7, 7];
defaultQ.delixer = [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 3, 3];
defaultQ.castle = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
defaultQ.research = [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
defaultQ.spells = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
defaultQ.army = [0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 4];
defaultQ.dbarracks = [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2];
defaultQ.barracks = [0, 1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 4];
defaultQ.builder = [0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
defaultQ.tesla = [0, 0, 0, 0, 0, 0, 0, 2, 3, 4, 4, 4];
defaultQ.xbow = [0, 0, 0, 0, 0, 0,
    0, 0, 0, 2, 3, 4];
defaultQ.inferno = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2];
defaultQ.airsweeper = [0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2];
defaultQ.herobarbarian = [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1];
defaultQ.heroarcher = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1];
defaultQ.herowarden = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
defaultQ.bomb = [0, 0, 2, 2, 2, 4, 4, 6, 6, 6, 6, 6];
defaultQ.spring = [0, 0, 0, 0, 2, 2, 4, 4, 6, 6, 6, 6];
defaultQ.airbomb = [0, 0, 0, 0, 0, 2, 2, 2, 4, 4, 5, 5];
defaultQ.airmine = [0, 0, 0, 0, 0, 0, 0, 1, 2, 4,
    5, 5];
defaultQ.bigbomb = [0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 5];
defaultQ.skeleton = [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 3];
defaultQ.darkspells = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1];
defaultQ.eagle = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
defaultQ.armysize = [0,
    20, 30, 35, 40, 45, 50, 55, 60];
defaultQ.barrackssize = [0, 20, 25, 30, 35, 40, 45, 50, 55, 60, 75];
defaultQ.dbarrackssize = [0, 40, 50, 60, 70, 80, 90];
defaultDPS.mortar = [20, 4, 5, 6, 7, 8, 9, 11, 13, 13, 13, 13, 13, 13];
defaultDPS.wizard =
    [20, 11, 13, 16, 20, 24, 32, 40, 48, 48, 48, 48, 48, 48, 56];
defaultDPS.air = [100, 80, 110, 140, 160, 190, 230, 280, 280, 280, 280, 280, 280, 280];
defaultDPS.cannon = [100, 9, 11, 15, 19, 25, 31, 40, 48, 56, 65, 75, 86, 86];
defaultDPS.archer = [
    100, 11, 15, 19, 25, 30, 35, 42, 48, 56, 65, 75, 86, 98];
defaultDPS.xbow = [100, 50, 60, 75, 80, 75, 75, 75, 75, 75, 75, 75, 75, 75];
defaultDPS.tesla = [100, 34, 40, 48, 55, 64, 75, 87, 99, 99, 99, 99, 99, 99];
defaultDPS.inferno = [100, 100, 125, 140,
    140, 140, 140, 140, 140, 140, 140, 140, 140, 140];
defaultDPS.airsweeper = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
defaultLVL.townhall = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
defaultLVL.builder = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
defaultLVL.mortar =
    [0, 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 8];
defaultLVL.wizard = [0, 1, 1, 1, 1, 2, 3, 4, 6, 7, 8, 9];
defaultLVL.air = [0, 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 8];
defaultLVL.cannon = [0, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 12];
defaultLVL.archer = [0, 1, 2, 3, 4, 6, 7, 8, 10, 11,
    13, 13];
defaultLVL.xbow = [0, 1, 1, 1, 1, 1, 1, 1, 1, 3, 4, 4];
defaultLVL.inferno = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3];
defaultLVL.airsweeper = [0, 0, 0, 0, 0, 0, 2, 3, 4, 5, 6, 6];
defaultLVL.tesla = [0, 1, 1, 1, 1, 1, 1, 3, 6, 7, 8, 8];
defaultLVL.wall =
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 11];
defaultLVL.gold = [0, 2, 4, 6, 8, 10, 10, 11, 12, 12, 12, 12];
defaultLVL.elixer = [0, 2, 4, 6, 8, 10, 10, 11, 12, 12, 12, 12];
defaultLVL.delixer = [0, 1, 1, 1, 1, 1, 1, 3, 3, 6, 6, 6];
defaultLVL.goldstorage = [0,
    1, 3, 6, 8, 9, 10, 11, 11, 11, 11, 12];
defaultLVL.elixerstorage = [0, 1, 3, 6, 8, 9, 10, 11, 11, 11, 11, 12];
defaultLVL.delixerstorage = [0, 1, 1, 1, 1, 1, 1, 2, 4, 6, 6, 6];
defaultLVL.barracks = [0, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
defaultLVL.dbarracks =
    [0, 1, 1, 1, 1, 1, 1, 2, 4, 6, 6, 6];
defaultLVL.army = [0, 1, 2, 3, 4, 5, 6, 6, 6, 7, 8, 8];
defaultLVL.research = [0, 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9];
defaultLVL.spells = [0, 1, 1, 1, 1, 1, 2, 3, 3, 4, 5, 5];
defaultLVL.castle = [0, 1, 1, 1, 2, 2, 3, 3, 4, 5, 5, 5];
defaultLVL.darkspells = [0, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3];
defaultLVL.eagle = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2];
defaultLVL.bomb = [0, 1, 2, 2, 2, 3, 3, 4, 5, 6, 6, 6];
defaultLVL.spring = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
defaultLVL.airbomb = [0, 1,
    1, 1, 1, 2, 2, 3, 3, 4, 4, 4];
defaultLVL.airmine = [0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3];
defaultLVL.bigbomb = [0, 1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4];
defaultLVL.skeleton = [0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3];
defaultLVL.herobarbarian = [0, 40, 40, 40, 40, 40,
    40, 40, 40, 40, 40, 40];
defaultLVL.heroarcher = [0, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40];
defaultLVL.herowarden = [0, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
defaultLVL.tbarbarian = [0, 2, 2, 3, 3, 4, 5, 6, 7];
defaultLVL.tarcher = [0,
    2, 2, 3, 3, 4, 5, 6, 7];
defaultLVL.tgoblin = [0, 2, 2, 3, 3, 4, 5, 5, 5];
defaultLVL.tgiant = [0, 0, 2, 2, 3, 4, 5, 6, 6];
defaultLVL.twallbreaker = [0, 0, 2, 2, 3, 4, 5, 5, 6];
defaultLVL.tballoon = [0, 0, 2, 2, 3, 4, 5, 6, 6];
defaultLVL.twizard = [0,
    0, 0, 2, 3, 4, 5, 5, 6];
defaultLVL.thealer = [0, 0, 0, 0, 0, 2, 3, 4, 4];
defaultLVL.tdragon = [0, 0, 0, 0, 0, 2, 3, 3, 4];
defaultLVL.tpekka = [0, 0, 0, 0, 0, 0, 3, 3, 5];
defaultLVL.tminion = [0, 0, 0, 0, 0, 2, 4, 5, 6];
defaultLVL.thogrider = [0, 0, 0,
    0, 0, 2, 4, 5, 5];
defaultLVL.tvalkyrie = [0, 0, 0, 0, 0, 0, 2, 4, 4];
defaultLVL.tgolem = [0, 0, 0, 0, 0, 0, 2, 4, 5];
defaultLVL.twitch = [0, 0, 0, 0, 0, 0, 0, 2, 2];
defaultLVL.tlavahound = [0, 0, 0, 0, 0, 0, 0, 2, 3];
defaultLVL.tlightning = [0, 2, 3,
    4, 4, 4, 5, 6, 7];
defaultLVL.thealing = [0, 0, 2, 2, 3, 4, 5, 6, 6];
defaultLVL.trage = [0, 0, 0, 2, 3, 4, 5, 5, 5];
defaultLVL.tjump = [0, 0, 0, 0, 0, 0, 0, 2, 3];
defaultLVL.tfreeze = [0, 0, 0, 0, 0, 0, 0, 0, 4];
statsV.res.gold = [0, 200, 400, 600, 800,
    1e3, 1300, 1600, 1900, 2200, 2500, 3e3];
statsV.res.elixer = [0, 200, 400, 600, 800, 1e3, 1300, 1600, 1900, 2200, 2500, 3e3];
statsV.res.delixer = [0, 20, 30, 45, 60, 80, 100];
statsV.rlvl.th = [0, 0, 1e3, 1e4, 5e4, 1e5, 3e5, 5e5, 75e4, 1e6,
    15e5, 2e6];
statsV.rlvl.g = [0, 1500, 3e3, 6e3, 12e3, 25e3, 5e4, 1e5, 25e4, 5e5, 1e6, 175e4, 2e6];
statsV.rlvl.e = [0, 1500, 3e3, 6e3, 12e3, 25e3, 5e4, 1e5, 25e4, 5e5, 1e6, 175e4, 2e6];
statsV.rlvl.d = [0, 1e4, 2e4, 4e4, 8e4, 15e4, 2e5];
statsV.time.townhall = [0, 0, 5, 180, 1440, 2880, 5760, 8640, 11520, 14400, 17280, 20160];
statsV.time.gold = [0, 1, 5, 15, 60, 120, 360, 720, 1440, 2880, 4320, 5760, 7200];
statsV.time.elixer = [0, 1, 5, 15, 60, 120, 360, 720, 1440, 2880, 4320, 5760,
    7200];
statsV.time.delixer = [0, 1440, 2880, 4320, 5760, 8640, 11520];
statsV.time.goldstorage = [0, 15, 30, 60, 120, 180, 240, 360, 480, 720, 1440, 2880, 10080];
statsV.time.elixerstorage = [0, 15, 30, 60, 120, 180, 240, 360, 480, 720,
    1440, 2880, 10080];
statsV.time.delixerstorage = [0, 1440, 2880, 4320, 5760, 7200, 8640];
statsV.time.cannon = [0, 1, 15, 45, 120, 360, 720, 1440, 2880, 4320, 5760, 7200, 8640];
statsV.time.archer = [0, 15, 30, 45, 240, 720, 1440, 2880,
    4320, 5760, 7200, 8640, 10080, 11520];
statsV.time.mortar = [0, 480, 720, 1440, 2880, 5760, 7200, 10080, 14400];
statsV.time.wizard = [0, 720, 1440, 2880, 4320, 5760, 7200, 10080, 14400, 17280];
statsV.time.air = [0, 300, 1440, 4320, 7200,
    8640, 11520, 14400, 17280];
statsV.time.tesla = [0, 1440, 4320, 7200, 8640, 11520, 14400, 17280, 20160];
statsV.time.xbow = [0, 10080, 14400, 20160, 20160];
statsV.time.inferno = [0, 10080, 14400, 20160];
statsV.time.airsweeper =
    [0, 1440, 4320, 7200, 10080, 11520, 12960];
statsV.time.castle = [0, 0, 360, 1440, 2880, 10080];
statsV.time.army = [0, 5, 60, 180, 480, 1440, 4320, 7200];
statsV.time.barracks = [0, 1, 15, 120, 240, 600, 960, 1440, 2880, 5760, 8640];
statsV.time.dbarracks = [0, 4320, 7200, 8640, 10080, 11520, 12960];
statsV.time.research = [0, 30, 300, 720, 1440, 2880, 5760, 7200, 8640, 10080];
statsV.time.spells = [0, 1440, 2880, 5760, 7200, 8640];
statsV.time.herobarbarian = [0, 0];
statsV.time.heroarcher = [0, 0];
statsV.time.bomb = [0, 0, 15, 120, 480, 1440, 2880];
statsV.time.spring = [0, 0];
statsV.time.airbomb = [0, 0, 240, 720, 1440];
statsV.time.airmine = [0, 0, 1440, 4320];
statsV.time.bigbomb = [0, 0, 360, 1440,
    4320];
statsV.time.skeleton = [0, 0, 360, 1440];
statsV.time.darkspells = [0, 5760, 8640, 11520];
statsV.time.eagle = [0, 14400, 20160];
statsV.cost.townhall = ["g", 0, 1, 4, 25, 150, 750, 1200, 2e3, 3e3, 5e3, 7e3];
statsV.cost.gold =
    ["e", .15, .3, .7, 1.4, 3, 7, 14, 28, 56, 84, 168, 336];
statsV.cost.elixer = ["g", .15, .3, .7, 1.4, 3, 7, 14, 28, 56, 84, 168, 336];
statsV.cost.delixer = ["e", 1e3, 2e3, 3e3, 4e3, 6e3, 8e3];
statsV.cost.goldstorage = ["e", .3, .75, 1.5, 3, 6,
    12, 25, 50, 100, 250, 500, 2500];
statsV.cost.elixerstorage = ["g", .3, .75, 1.5, 3, 6, 12, 25, 50, 100, 250, 500, 2500];
statsV.cost.delixerstorage = ["e", 600, 1200, 1800, 2400, 3e3, 3600];
statsV.cost.cannon = ["g", .25, 1, 4, 16, 50, 100,
    200, 400, 800, 1600, 3200, 6400];
statsV.cost.archer = ["g", 1, 2, 5, 20, 80, 180, 360, 720, 1500, 2500, 4500, 6500, 7500];
statsV.cost.mortar = ["g", 8, 32, 120, 400, 800, 1600, 3200, 6400];
statsV.cost.wizard = ["g", 180, 360, 720, 1280,
    1960, 2680, 5360, 6480, 8560];
statsV.cost.air = ["g", 22.5, 90, 270, 540, 1080, 2160, 4320, 7560];
statsV.cost.tesla = ["g", 1e3, 1250, 1500, 2e3, 2500, 3e3, 3500, 5e3];
statsV.cost.xbow = ["g", 3e3, 5e3, 7e3, 8e3];
statsV.cost.inferno =
    ["g", 5e3, 6500, 8e3];
statsV.cost.airsweeper = ["g", 500, 750, 1250, 2400, 4800, 7200];
statsV.cost.castle = ["g", 40, 100, 800, 1800, 7e3];
statsV.cost.army = ["e", .25, 2.5, 10, 100, 250, 750, 2250, 6750];
statsV.cost.barracks = ["e",
    .2, 1, 2, 5, 10, 80, 240, 700, 1500, 2e3];
statsV.cost.dbarracks = ["e", 750, 1250, 1750, 2250, 2750, 3500];
statsV.cost.research = ["e", 25, 50, 90, 270, 500, 1e3, 2500, 4e3, 6e3];
statsV.cost.spells = ["e", 200, 400, 800, 1600, 3200];
statsV.cost.herobarbarian = ["d", 10];
statsV.cost.heroarcher = ["d", 40];
statsV.cost.warden = ["e", 6e3];
statsV.cost.walls = ["g", .2, 1, 5, 10, 30, 75, 200, 500, 1e3, 3e3];
statsV.cost.bomb = [0, .4, 1, 10, 100, 1e3, 1500];
statsV.cost.spring =
    [0, 2];
statsV.cost.airbomb = [0, 4, 20, 200, 1500];
statsV.cost.airmine = [0, 15, 2e3, 4e3];
statsV.cost.bigbomb = [0, 12.5, 75, 750, 2500];
statsV.cost.skeleton = [0, 6, 600, 1300];
statsV.cost.darkspells = ["e", 1500, 2500, 3500];
statsV.cost.darkspells = ["g", 8e3, 1e4];
statsV.cost.tbarbarian = ["e", 0, 50, 150, 500, 1500, 4500, 6e3];
statsV.cost.tarcher = ["e", 0, 50, 250, 750, 2250, 6e3, 7500];
statsV.cost.tgoblin = ["e", 0, 50, 250, 750, 2250];
statsV.cost.tgiant = ["e", 0, 100, 250, 750, 2250, 6e3];
statsV.cost.twallbreaker = ["e", 0, 100, 250, 750, 2250, 6750];
statsV.cost.tballoon = ["e", 0, 150, 450, 1350, 2500, 6e3];
statsV.cost.twizard = ["e", 0, 150, 450, 1350, 2500, 7500];
statsV.cost.thealer = ["e", 0, 750, 1500, 3e3];
statsV.cost.tdragon = ["e", 0, 2e3, 3e3, 8e3];
statsV.cost.tpekka = ["e", 0, 3e3, 6e3, 8e3];
statsV.cost.tminion = ["d", 0, 10, 20, 30, 40, 100];
statsV.cost.thogrider = ["d", 0, 20, 30, 40, 50];
statsV.cost.tvalkyrie = ["d", 0, 50, 60, 70];
statsV.cost.tgolem = ["d", 0, 60, 70, 80, 90];
statsV.cost.twitch = ["d", 0, 75];
statsV.cost.tlavahound = ["d", 0, 60, 75];
statsV.cost.tlightning = ["e", 0, 200, 500, 1e3, 2e3, 8e3];
statsV.cost.thealing = ["e", 0, 300, 600, 1200, 2400, 4800];
statsV.cost.trage = ["e", 0, 450, 900, 1800, 3e3];
statsV.cost.tjump = ["e", 0, 4e3];
statsV.cost.tfreeze = ["e", 0, 4e3, 6e3, 8e3];
statsV.time.tbarbarian = [0, 0, 360, 1440, 4320, 7200,
    14400, 20160];
statsV.time.tarcher = [0, 0, 720, 2880, 4320, 7200, 14400, 20160];
statsV.time.tgoblin = [0, 0, 720, 2880, 4320, 7200];
statsV.time.tgiant = [0, 0, 1440, 2880, 4320, 7200, 14400];
statsV.time.twallbreaker = [0, 0, 1440,
    2880, 4320, 7200, 14400];
statsV.time.tballoon = [0, 0, 1440, 2880, 4320, 7200, 14400];
statsV.time.twizard = [0, 0, 1440, 2880, 4320, 7200, 20160];
statsV.time.thealer = [0, 0, 4320, 7200, 10080];
statsV.time.tdragon = [0, 0, 10080,
    14400, 17280];
statsV.time.tpekka = [0, 0, 14400, 17280, 20160];
statsV.time.tminion = [0, 0, 7200, 8640, 10080, 14400, 20160];
statsV.time.thogrider = [0, 0, 11520, 14400, 17280, 20160];
statsV.time.tvalkyrie = [0, 0, 14400, 17280,
    20160];
statsV.time.tgolem = [0, 0, 14400, 17280, 20160, 20160];
statsV.time.twitch = [0, 0, 14400];
statsV.time.tlavahound = [0, 0, 14400, 17280];
statsV.time.tlightning = [0, 0, 1440, 2880, 4320, 5760, 20160];
statsV.time.thealing =
    [0, 0, 1440, 2880, 4320, 7200, 10080];
statsV.time.trage = [0, 0, 2880, 4320, 7200, 10080];
statsV.time.tjump = [0, 0, 7200];
statsV.time.tfreeze = [0, 0, 7200, 14400, 20160];
statsV.tcost.tbarbarian = ["e", 25, 40, 60, 80, 100, 150, 200];
statsV.tcost.tarcher = ["e", 50, 80, 120, 160, 200, 300, 400];
statsV.tcost.tgoblin = ["e", 25, 40, 60, 80, 100];
statsV.tcost.tgiant = ["e", 500, 1e3, 1500, 2e3, 2500, 3e3];
statsV.tcost.twallbreaker = ["e", 1e3, 1500, 2e3, 2500, 3e3,
    3500];
statsV.tcost.tballoon = ["e", 2e3, 2500, 3e3, 3500, 4e3, 4500];
statsV.tcost.twizard = ["e", 1500, 2e3, 2500, 3e3, 3500, 4e3];
statsV.tcost.thealer = ["e", 5e3, 6e3, 8e3, 1e4];
statsV.tcost.tdragon = ["e", 25e3, 3e4, 36e3, 42e3];
statsV.tcost.tpekka = ["e", 3e4, 35e3, 42e3, 45e3, 5e4];
statsV.tcost.tminion = ["d", 6, 7, 8, 9, 10, 11];
statsV.tcost.thogrider = ["d", 40, 45, 52, 58, 65];
statsV.tcost.tvalkyrie = ["d", 70, 100, 130, 160];
statsV.tcost.tgolem = ["d",
    450, 525, 650, 675, 750];
statsV.tcost.twitch = ["d", 250, 350];
statsV.tcost.tlavahound = ["d", 390, 450, 510];
statsV.tcost.tlightning = ["g", 15e3, 16500, 18e3, 2e4, 22e3, 24e3];
statsV.tcost.thealing = ["g", 15e3, 16e3, 18e3, 20500,
    22e3, 24e3];
statsV.tcost.trage = ["g", 23e3, 25e3, 27e3, 3e4, 33e3];
statsV.tcost.tjump = ["g", 23e3, 29e3];
statsV.tcost.tfreeze = ["g", 26e3, 29e3, 31e3, 33e3];
var drawMode = "", cItem, cBtn, IDK = 0, isRotated = !1, lastXY = !1,
    attackMode =
        document.attackMode, isDrag = 0, dragMode = 0, dragFX = 0, dragFY = 0,
    hasDrag = 0, mapSize = 44 + (attackMode ? 4 : 0), layoutID = !1,
    layoutPass = !1, layoutName = "", layoutData = "", layoutType = "H",
    layoutUID = 0, layoutPreview = !1, layoutDesc =
        "", layoutTouch = !1, layoutLoaded = !1, showDrop = !1, isFS = !1,
    wallA = new Array(mapSize + 1), wallL = new Array(mapSize + 1),
    wallLVL = 1, transType = "webkit";
for (k = 0; k < mapSize + 2; k++) wallA[k] = new Array(mapSize + 1), wallL[k] =
    new Array(mapSize + 1);
navigator.userAgent.match(/iPhone|iPod|iPad/i) && (layoutTouch = !0, attachE(window, "load", function () {
    addBodyClass("touch")
}));
setHeroes();
calc = {};
