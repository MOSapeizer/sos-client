(function() {
    Array.prototype.indexOf || (Array.prototype.indexOf = function(a, d) {
        var b = this.length >>> 0,
            f = Number(d) || 0,
            f = 0 > f ? Math.ceil(f) : Math.floor(f);
        for (0 > f && (f += b); f < b; f++)
            if (f in this && this[f] === a) return f;
        return -1
    });
    window.console || (window.console = {}, window.console.log = function() {}, window.console.debug = function() {}, window.console.warning = function() {});
    window.getWebProtocal = function() {
        return "https:" == document.location.protocol ? "https://" : "http://"
    };
    window.getAPIPath = function() {
        return "api.tgos.nat.gov.tw/"
    };
    window.getServicePath = function() {
        return "gis.tgos.nat.gov.tw/"
    };
    window.TGOS = {
        RES_PATH: getWebProtocal() + getAPIPath() + "TGOS_API/images/",
        SCRIPT_PATH: getWebProtocal() + getAPIPath() + "TGOS_API/src/"
    };
    TGOS.math = {};
    TGOS.math.toRadian = function(a) {
        return a / 180 * Math.PI
    };
    TGOS.math.toDegree = function(a) {
        return 180 * (a / Math.PI)
    };
    TGOS.RegisterEvent = function(a, d) {
        var b = 0;
        a.prototype.events || (a.prototype.events = []);
        for (b = 0; b < d.length; b++) a.prototype.events.push(d[b])
    };
    TGOS.extend = function(a, d) {
        d.prototype = new a;
        d.prototype.constructor =
            a;
        d.prototype._super_ = a
    };
    window.util = util || {};
    util.removeEventHandler = function(a, d, b) {
        a.removeEventListener && a.removeEventListener(d, b, !1);
        a.detachEvent && a.detachEvent("on" + d, b)
    };
    util.createUUID = function(a, d) {
        return function() {
            return "xxxxTGOSxxxxxxxxxxxxxxxxxxxxxxxx".replace(a, d).toUpperCase()
        }
    }(/[xy]/g, function(a) {
        var d = 16 * Math.random() | 0;
        return ("x" == a ? d : d & 3 | 8).toString(16)
    });
    util.getInternetExplorerVersion = function() {
        var a = -1;
        "Microsoft Internet Explorer" == navigator.appName && null != /MSIE ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) &&
            (a = parseFloat(RegExp.$1));
        return a
    };
    util.eventTarget = function(a) {
        return a.target ? a.target : a.srcElement
    };
    util.disableDefault = function(a) {
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    };
    util.disableSelect = function(a) {
        a.addEventListener ? a.addEventListener("mousedown", util.disabler, "false") : a.attachEvent("onselectstart", util.disabler)
    };
    util.enableSelect = function(a) {
        a.addEventListener ? a.removeEventListener("mousedown", util.disabler, "false") : a.detachEvent("onselectstart", util.disabler)
    };
    util.disabler =
        function(a) {
            util.disableDefault(a);
            return !1
        };
    util.intersectRect = function(a, d) {
        return !(d.left > a.right || d.right < a.left || d.top > a.bottom || d.bottom < a.top)
    };
    util.loadScript = function(a) {
        var d = document.createElement("script");
        d.src = a;
        document.getElementsByTagName("head")[0].appendChild(d)
    }
})();

function DeviceTest() {
    var a = navigator.userAgent.toLowerCase();
    return 0 < a.indexOf("msie") && document.all ? "MSIE" : 0 < a.indexOf("firefox") ? "Firefox" : 0 < a.indexOf("chrome") ? "Chrome" : 0 < a.indexOf("safari") ? "Safari" : 0 < a.indexOf("opera") ? "Opera" : 0 < a.indexOf("camino") ? "Camino" : 0 < a.indexOf("gecko") ? "Gecko" : 0 < a.indexOf("trident") ? "Trident" : 0 < a.indexOf("mozilla") ? "Mozilla" : null
}

function FuncAdapter(a, d) {
    return function(b) {
        return d.call(a, b)
    }
}

function Inherit(a, d) {
    for (var b in d) a[b] = d[b]
}

function AttachEvent(a, d, b, f) {
    a.addEventListener ? ("mousewheel" == d && "Firefox" == DeviceTest() && (d = "DOMMouseScroll"), "keydown" == d && (f = !0), "keyup" == d && (f = !0), f ? a.ownerDocument.addEventListener(d, b, f) : a.addEventListener(d, b, f)) : (a.attachEvent("on" + d, b), f && a.setCapture())
}

function DetachEvent(a, d, b, f) {
    a.removeEventListener ? ("mousewheel" == d && "Firefox" == DeviceTest() && (d = "DOMMouseScroll"), f ? a.ownerDocument.removeEventListener(d, b, f) : a.removeEventListener(d, b, f)) : (a.detachEvent("on" + d, b), f && a.releaseCapture())
};
var bDebug = !0;

function AjaxAgent(a, d, b) {
    var f = this,
        e = null;
    if (window.XMLHttpRequest) e = new XMLHttpRequest, e.overrideMimeType && e.overrideMimeType("text/xml");
    else if (window.ActiveXObject) try {
        e = new ActiveXObject("Msxml2.XMLHTTP")
    } catch (g) {
        try {
            e = new ActiveXObject("Microsoft.XMLHTTP")
        } catch (k) {}
    }
    this.Open = function(a, f) {
        null != e && (e.open(a, f, d), b && e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"))
    };
    this.SendRequest = function(b, a, g, k, p) {
        function s() {
            g && g.call(f, e, e.status);
            200 != e.status ? (k && k.call(f,
                e, e.status), bDebug && window.open("").document.write(e.responseText)) : a && a.call(f, e)
        }
        if (null != e) {
            d && (e.onreadystatechange = function() {
                p && p.call(f, e, e.readyState);
                4 == e.readyState && s()
            });
            try {
                e.send(b)
            } catch (q) {
                return alert(q)
            }
            return d ? null : (d || s(), e)
        }
    };
    a && this.Open("POST", a)
}

function GetXMLChildNode(a, d) {
    var b = FindXMLNodes(a, d);
    return null != b && 0 < b.length ? b.item(0) : null
}

function FindXMLNodes(a, d) {
    return null == a ? null : a.getElementsByTagName(d)
}

function GetXMLNodeText(a) {
    return null == a ? null : a.firstChild ? a.firstChild.nodeValue : ""
}

function GetXMLNodeAttribute(a, d) {
    return a ? a.getAttribute(d) : ""
}
var nResult = 0,
    result = null;

function LoadScript(a, d, b) {
    function f() {
        "loaded" == k.readyState && e()
    }

    function e() {
        var b = eval(g);
        result = b;
        d.call(null, k, b);
        DetachEvent(k, "readystatechange", f, !1);
        DetachEvent(k, "load", e, !1);
        document.body.removeChild(k)
    }
    var g = "_result_" + b + "_" + nResult;
    nResult++;
    var k = document.createElement("script");
    AttachEvent(k, "readystatechange", f, !1);
    AttachEvent(k, "load", e, !1);
    document.body.appendChild(k);
    k.type = "text/javascript";
    k.src = a + "&Result=" + g
};
TGOS.TGLevelTransform = function(a, d, b, f) {
    function e(b) {
        for (var a = 0, a = 0; a < h.length - 1 && !(b < h[a + 1]); a++);
        if (a < h.length - 1) var d = h[a],
            e = h[a + 1],
            a = a + Math.log(b / d) / Math.log(e / d);
        return a
    }

    function g(b) {
        var a = Math.floor(Math.max(0, Math.min(b, h.length - 2))),
            d = h[a];
        return d * Math.pow(h[a + 1] / d, b - a)
    }
    var k = d,
        l = b,
        h = [];
    for (a = 0; a < f.length; a++) h.push(1 / f[a].factor);
    h.reverse();
    var m = 0,
        n = 1;
    this.FitLevel = function() {
        this.putMapLevel(Math.round(m))
    };
    this.getBaseScaleX = function() {
        return k
    };
    this.putBaseScaleX = function(b) {
        k =
            b
    };
    this.getBaseScaleY = function() {
        return l
    };
    this.putBaseScaleY = function(b) {
        l = b
    };
    this.getMapMaxLevel = function() {
        return h.length
    };
    this.getMapLevel = function() {
        return m
    };
    this.putMapLevel = function(b) {
        if (m == b) return !0;
        var a = b > h.length - 1 ? h.length - 1 : 0 > b ? 0 : b;
        if ((b >= h.length || 0 > b) && m == a) return !1;
        m = a;
        n = g(m);
        return !0
    };
    this.getScale = function() {
        return k * n
    };
    this.putScale = function(b) {
        this.putMapLevel(e(b / k))
    };
    this.getScaleX = function() {
        return k * n
    };
    this.getScaleY = function() {
        return l * n
    };
    this.getLevelScale = function(b) {
        return k *
            g(b)
    }
};

function CachedLevelTransformation(a) {
    function d(b) {
        for (var a = 0, a = 0; a < g.length - 1 && !(b < g[a + 1]); a++);
        if (a < g.length - 1) var d = g[a],
            e = g[a + 1],
            a = a + Math.log(b / d) / Math.log(e / d);
        return a
    }

    function b(b) {
        var a = Math.floor(Math.max(0, Math.min(b, g.length - 2))),
            d = g[a];
        return d * Math.pow(g[a + 1] / d, b - a)
    }
    var f = a.getBaseScaleX(),
        e = a.getBaseScaleY(),
        g = [];
    a = a.getScales();
    for (var k = 0; k < a.length; k++) g.push(1 / a[k].factor);
    g.reverse();
    var l = 0,
        h = 1;
    this.FitLevel = function() {
        this.putMapLevel(Math.round(l))
    };
    this.getBaseScaleX = function() {
        return f
    };
    this.putBaseScaleX = function(b) {
        f = b
    };
    this.getBaseScaleY = function() {
        return e
    };
    this.putBaseScaleY = function(b) {
        e = b
    };
    this.getMapMaxLevel = function() {
        return g.length
    };
    this.getMapLevel = function() {
        return l
    };
    this.putMapLevel = function(a) {
        if (l == a) return !0;
        var d = a > g.length - 1 ? g.length - 1 : 0 > a ? 0 : a;
        if ((a >= g.length || 0 > a) && l == d) return !1;
        l = d;
        h = b(l);
        return !0
    };
    this.getScale = function() {
        return f * h
    };
    this.putScale = function(b) {
        this.putMapLevel(d(b / f))
    };
    this.getScaleX = function() {
        return f * h
    };
    this.getScaleY = function() {
        return e *
            h
    };
    this.getLevelScale = function(a) {
        return f * b(a)
    }
}

function MapCachedLayer(a, d, b, f, e, g) {
    function k(b, a) {
        function e(b, h, l, m) {
            for (var n = 0; n < g.length; n++)
                if (g[n].isEqual(b.scale, h, l)) return;
            m = d + "/GetCacheImage?S=" + m + "&X=" + h + "&Y=" + l + "&L=" + a + "&appid=" + TGOS.APPID + "&apikey=" + TGOS.APIKEY;
            null != m && g.push(new MapCachedImage(m, k, b.scale, h, l, B + h * b.factor * x, D + (l + 1) * b.factor * A, B + (h + 1) * b.factor * x, D + l * b.factor * A, f))
        }
        var g = [],
            h = [],
            k = null,
            m = !0,
            n = "",
            u = 0,
            C = "";
        b && (n = b.Name, u = parseInt(b.FeatureType), C = b.SRName);
        var y = n;
        this.getName = function() {
            return n
        };
        this.putName = function(b) {
            n =
                b
        };
        this.getTitle = function() {
            return y
        };
        this.putTitle = function(b) {
            y = b
        };
        this.getVisible = function() {
            return m
        };
        this.putVisible = function(b) {
            m = b;
            k && (k.style.visibility = m ? "" : "hidden")
        };
        this.getFields = function() {
            return null
        };
        this.getFeatureType = function() {
            return u
        };
        this.getSRName = function() {
            return C
        };
        this.Initialize = function(b) {
            this.RemoveSelf();
            k = t.ownerDocument.createElement("div");
            t.appendChild(k);
            k.style.position = "absolute";
            k.style.overflow = "hidden";
            k.style.left = "0px";
            k.style.top = "0px";
            k.style.width = "100%";
            k.style.height = "100%";
            k.style.visibility = m ? "" : "hidden"
        };
        this.RemoveSelf = function() {
            if (g)
                for (; 0 < g.length;) g.pop().RemoveSelf();
            if (h)
                for (; 0 < h.length;) h.pop().RemoveSelf();
            null != k && k.parentNode && (null != l && k.parentNode.removeChild(k), k = null)
        };
        this.MoveTiles = function() {
            if (null != l && this.getVisible())
                for (var b = [g, h], a = 0; a < b.length; a++)
                    for (var d = b[a], e = 0; e < d.length; e++) {
                        var f = l.FromMapPoint(d[e].getLeft(), d[e].getTop()),
                            k = l.FromMapPoint(d[e].getRight(), d[e].getBottom()),
                            m = k.x - f.x,
                            k = k.y - f.y;
                        0 > m && (f.x -= m = -m);
                        0 > k && (f.y -= k = -k);
                        d[e].ReloadStatus(f.x, f.y, m, k)
                    }
        };
        this.getTiles = function(b, e, f, g, h) {
            b = l.ToMapDistX(1);
            l.ToMapDistY(1);
            h = 0;
            if (0 < w.length)
                for (h = 0; h < w.length - 1 && !(b < (w[h + 1].factor + w[h].factor) / 2); h++);
            e = w[h].factor * x;
            f = w[h].factor * A;
            g = l.ToMapPoint(0, 0);
            var k = l.ToMapPoint(l.getClientWidth(), l.getClientHeight());
            b = Math.floor((p - B) / e);
            var m = Math.floor((v - D) / f),
                n = Math.ceil((q - B) / e),
                u = Math.ceil((s - D) / f);
            b = Math.max(Math.floor((g.x - B) / e), b);
            m = Math.max(Math.floor((k.y - D) / f), m);
            n = Math.min(Math.ceil((k.x - B) / e),
                n);
            u = Math.min(Math.ceil((g.y - D) / f), u);
            g.x = b * e + B;
            k.y = m * f + D;
            k.x = n * e + B;
            g.y = u * f + D;
            e = [];
            for (g = m; g < u; g++)
                for (f = b; f < n; f++) e.push({
                    url: d + "/GetCacheImage?S=" + h + "&X=" + f + "&Y=" + g + "&L=" + a + "&appid=" + TGOS.APPID + "&apikey=" + TGOS.APIKEY,
                    leftTop: [B + f * w[h].factor * x, D + (g + 1) * w[h].factor * A]
                });
            return e
        };
        this.UpdateElement = function() {
            this.RebuildElement()
        };
        this.RebuildElement = function() {
            if (null != l && this.getVisible()) {
                var b = l.ToMapDistX(1);
                l.ToMapDistY(1);
                var a = 0;
                if (0 < w.length)
                    for (a = 0; a < w.length - 1 && !(b < (w[a + 1].factor + w[a].factor) /
                            2); a++);
                var d = w[a].factor * x,
                    f = w[a].factor * A,
                    b = l.ToMapPoint(0, 0),
                    k = l.ToMapPoint(l.getClientWidth(), l.getClientHeight()),
                    m = Math.floor((p - B) / d),
                    n = Math.floor((v - D) / f),
                    u = Math.ceil((q - B) / d),
                    t = Math.ceil((s - D) / f),
                    m = Math.max(Math.floor((b.x - B) / d), m),
                    n = Math.max(Math.floor((k.y - D) / f), n),
                    u = Math.min(Math.ceil((k.x - B) / d), u),
                    t = Math.min(Math.ceil((b.y - D) / f), t);
                b.x = m * d + B;
                k.y = n * f + D;
                k.x = u * d + B;
                b.y = t * f + D;
                f = k.y;
                for (f = n; f < t; f++)
                    for (d = m; d < u; d++) e(w[a], d, f, a);
                m = [];
                u = g.length;
                for (d = 0; d < u; d++) {
                    var t = g[d],
                        n = t.getScale(),
                        C = (t.getLeft() +
                            t.getRight()) / 2,
                        f = (t.getTop() + t.getBottom()) / 2;
                    n == w[a].scale && C < b.x != C < k.x && f < b.y != f < k.y ? m.push(t) : t.IsComplete() && t.getStatus() ? h.push(t) : t.RemoveSelf()
                }
                g = m;
                this.MoveTiles();
                var y = function() {
                    for (var b = !0, a = 0; a < g.length; a++)
                        if (g[a].IsComplete()) b = g[a].getStatus();
                        else return setTimeout(y, 100);
                    if (b)
                        for (; 0 < h.length;) h.pop().RemoveSelf()
                };
                setTimeout(y, 100)
            }
        }
    }
    var l = null,
        h = a,
        m = a,
        n = !0,
        p = 0,
        s = 0,
        q = 1,
        v = 1,
        x = 256,
        A = 256,
        B = 0,
        D = 0,
        y = 1,
        z = 1,
        w = [],
        t = null,
        u = [],
        C = null,
        E = this;
    LoadScript(d + "/GetCacheConfig?Format=JSON&appid=" +
        TGOS.APPID + "&apikey=" + TGOS.APIKEY,
        function(b, a) {
            var d = a.Infomation;
            x = parseInt(d.TileWidth);
            isNaN(x) && (x = 256);
            A = parseInt(d.TileHeight);
            isNaN(A) && (A = 256);
            B = parseFloat(d.CornerLeft);
            isNaN(B) && (B = 0);
            D = parseFloat(d.CornerLower);
            isNaN(D) && (D = 0);
            var e = d.Envelope;
            p = parseFloat(e.Left);
            s = parseFloat(e.Top);
            q = parseFloat(e.Right);
            v = parseFloat(e.Bottom);
            isNaN(p) && (p = 0);
            isNaN(s) && (s = 1);
            isNaN(q) && (q = 1);
            isNaN(v) && (v = 0);
            w = [];
            e = d.Scales;
            y = parseFloat(e.ScaleFactorX);
            z = parseFloat(e.ScaleFactorY);
            isNaN(y) && (y = 1);
            isNaN(z) &&
                (z = 1);
            var f = d.Scales.Scale;
            if (f && 0 < f.length) {
                var h = parseFloat(f[f.length - 1]);
                if (isNaN(h))
                    for (e = 0; e < f.length; e++) {
                        var h = f[e],
                            n = parseFloat(h._text),
                            t = parseFloat(h.Factor);
                        w.push({
                            scale: n,
                            factor: t
                        })
                    } else
                        for (e = 0; e < f.length; e++) n = parseFloat(f[e]), t = n / h, w.push({
                            scale: n,
                            factor: t
                        })
            }
            if (d = d.Layers.Layer) {
                if (d.length)
                    for (e = 0; e < d.length; e++) u.push(new k(d[e], e));
                else u.push(new k(d, 0));
                u.reverse();
                if (null != l)
                    for (e = u.length - 1; 0 <= e; e--) u[e].Initialize(l)
            }
            0 == u.length ? u.push(new k(null)) : 1 == u.length && (u[0].putName(""),
                u[0].putTitle(m));
            C = u[u.length - 1];
            E.RebuildElement();
            g && g.call(this, !0)
        }, e);
    this.getName = function() {
        return h
    };
    this.putName = function(b) {
        h = b
    };
    this.getTitle = function() {
        return m
    };
    this.putTitle = function(b) {
        m = b
    };
    this.getVisible = function() {
        return n
    };
    this.putVisible = function(b) {
        n = b;
        t && (t.style.visibility = b ? "" : "hidden")
    };
    this.getResourcePath = function() {
        return d
    };
    this.getLeft = function() {
        return p
    };
    this.getTop = function() {
        return s
    };
    this.getRight = function() {
        return q
    };
    this.getBottom = function() {
        return v
    };
    this.getImageWidth =
        function() {
            return x
        };
    this.getImageHeight = function() {
        return A
    };
    this.getLayers = function() {
        return u
    };
    this.getThematicLayer = function() {
        return C
    };
    this.getScales = function() {
        return w
    };
    this.getBaseScaleX = function() {
        return x / y
    };
    this.getBaseScaleY = function() {
        return A / z
    };
    this.Initialize = function(b) {
        l = b;
        var a = l.getHObject();
        t = a.ownerDocument.createElement("div");
        a.appendChild(t);
        t.style.position = "absolute";
        t.style.overflow = "hidden";
        t.style.left = "0px";
        t.style.top = "0px";
        t.style.width = "100%";
        t.style.height = "100%";
        t.style.visibility = n ? "" : "hidden";
        for (a = u.length - 1; 0 <= a; a--) u[a].Initialize(b)
    };
    this.RemoveSelf = function() {
        for (var b = 0; b < u.length; b++) u[b].RemoveSelf();
        l = null
    };
    this.UpdateElement = function() {
        if (this.getVisible()) {
            var b;
            for (b = 0; b < u.length; b++) u[b].UpdateElement()
        }
    };
    this.getTiles = function(b, a, d, e, f, g) {
        if (u[g]) return u[g].getTiles(b, a, d, e, f)
    };
    this.RebuildElement = function() {
        if (this.getVisible())
            for (var b = 0; b < u.length; b++) u[b].RebuildElement()
    };
    var G = 1;
    this.setZIndex = function(b) {
        t && (t.style.zIndex = b)
    };
    this.setOpacity =
        function(b) {
            t && (G = b, t.style.opacity = G, t.style.filter = "alpha(opacity=" + 100 * G + ")")
        };
    var H = function(b, a) {
        C = a
    };
    this.CreateLegend = function(b) {
        if (1 < u.length)
            for (var a = 0; a < u.length; a++) b.CreateSubLegend(u[a], H)
    };
    this.ExecuteQuery = function(b, a, d, e) {
        null != C && C.ExecuteQuery(b, a, d, e)
    };
    this.getFeatureType = function() {
        if (null != C) return C.getFeatureType()
    };
    this.getFields = function() {
        if (null != C) return C.getFields()
    }
}

function MapCachedImage(a, d, b, f, e, g, k, l, h, m) {
    var n, p = !1;
    n = d.ownerDocument.createElement("img");
    n.onerror = function() {
        n && (n.alt = "\u4e0d\u63d0\u4f9b\u5716\u78da\u670d\u52d9", n.onload = null, n.onerror = null);
        p = !0
    };
    n.onmousedown = function() {
        return !1
    };
    n.onload = function() {
        n && (n.alt = "");
        this.loaded = !0;
        TGOS.TGEvent.trigger(m, "tilesloaded")
    };
    n.galleryImg = !1;
    n.hideFocus = !0;
    n.style.MozUserSelect = "none";
    n.style.border = "0 none";
    n.style.position = "absolute";
    n.src = a;
    d.appendChild(n);
    this.IsComplete = function() {
        return n.loaded ||
            "complete" == n.readyState
    };
    this.getStatus = function() {
        return !p
    };
    this.getHObject = function() {
        return n
    };
    this.getScale = function() {
        return b
    };
    this.getLeft = function() {
        return g
    };
    this.getTop = function() {
        return k
    };
    this.getRight = function() {
        return l
    };
    this.getBottom = function() {
        return h
    };
    this.RemoveSelf = function() {
        n && (n.onmousedown = null, d.removeChild(n));
        n = null
    };
    this.ReloadStatus = function(b, a, d, e) {
        d = b + d;
        b = Math.round(b);
        e = a + e;
        a = Math.round(a);
        n.style.left = b + "px";
        n.style.top = a + "px";
        n.style.width = Math.round(d - b) + "px";
        n.style.height = Math.round(e - a) + "px"
    };
    this.isEqual = function(a, d, g) {
        return b == a && f == d && e == g
    }
};
(function(a) {
    var d = /[\.\/]/,
        b = function() {},
        f = function(b, a) {
            return b - a
        },
        e, g, k = {
            n: {}
        },
        l = function(b, a) {
            b = String(b);
            var d = g,
                k = Array.prototype.slice.call(arguments, 2),
                s = l.listeners(b),
                q = 0,
                v, x = [],
                A = {},
                B = [],
                D = e;
            e = b;
            for (var y = g = 0, z = s.length; y < z; y++) "zIndex" in s[y] && (x.push(s[y].zIndex), 0 > s[y].zIndex && (A[s[y].zIndex] = s[y]));
            for (x.sort(f); 0 > x[q];)
                if (v = A[x[q++]], B.push(v.apply(a, k)), g) return g = d, B;
            for (y = 0; y < z; y++)
                if (v = s[y], "zIndex" in v)
                    if (v.zIndex == x[q]) {
                        B.push(v.apply(a, k));
                        if (g) break;
                        do
                            if (q++, (v = A[x[q]]) &&
                                B.push(v.apply(a, k)), g) break;
                        while (v)
                    } else A[v.zIndex] = v;
            else if (B.push(v.apply(a, k)), g) break;
            g = d;
            e = D;
            return B.length ? B : null
        };
    l._events = k;
    l.listeners = function(b) {
        b = b.split(d);
        var a = k,
            e, f, g, l, v, x, A, B = [a],
            D = [];
        g = 0;
        for (l = b.length; g < l; g++) {
            A = [];
            v = 0;
            for (x = B.length; v < x; v++)
                for (a = B[v].n, e = [a[b[g]], a["*"]], f = 2; f--;)
                    if (a = e[f]) A.push(a), D = D.concat(a.f || []);
            B = A
        }
        return D
    };
    l.on = function(a, e) {
        a = String(a);
        if ("function" != typeof e) return function() {};
        for (var f = a.split(d), g = k, l = 0, q = f.length; l < q; l++) g = g.n, g = g.hasOwnProperty(f[l]) &&
            g[f[l]] || (g[f[l]] = {
                n: {}
            });
        g.f = g.f || [];
        l = 0;
        for (q = g.f.length; l < q; l++)
            if (g.f[l] == e) return b;
        g.f.push(e);
        return function(b) {
            +b == +b && (e.zIndex = +b)
        }
    };
    l.f = function(b) {
        var a = [].slice.call(arguments, 1);
        return function() {
            l.apply(null, [b, null].concat(a).concat([].slice.call(arguments, 0)))
        }
    };
    l.stop = function() {
        g = 1
    };
    l.nt = function(b) {
        return b ? RegExp("(?:\\.|\\/|^)" + b + "(?:\\.|\\/|$)").test(e) : e
    };
    l.nts = function() {
        return e.split(d)
    };
    l.off = l.unbind = function(b, a) {
        if (b) {
            var e = b.split(d),
                f, g, q, v, x, A, B = [k];
            v = 0;
            for (x = e.length; v <
                x; v++)
                for (A = 0; A < B.length; A += q.length - 2) {
                    q = [A, 1];
                    f = B[A].n;
                    if ("*" != e[v]) f[e[v]] && q.push(f[e[v]]);
                    else
                        for (g in f) f.hasOwnProperty(g) && q.push(f[g]);
                    B.splice.apply(B, q)
                }
            v = 0;
            for (x = B.length; v < x; v++)
                for (f = B[v]; f.n;) {
                    if (a) {
                        if (f.f) {
                            A = 0;
                            for (e = f.f.length; A < e; A++)
                                if (f.f[A] == a) {
                                    f.f.splice(A, 1);
                                    break
                                }!f.f.length && delete f.f
                        }
                        for (g in f.n)
                            if (f.n.hasOwnProperty(g) && f.n[g].f) {
                                q = f.n[g].f;
                                A = 0;
                                for (e = q.length; A < e; A++)
                                    if (q[A] == a) {
                                        q.splice(A, 1);
                                        break
                                    }!q.length && delete f.n[g].f
                            }
                    } else
                        for (g in delete f.f, f.n) f.n.hasOwnProperty(g) &&
                            f.n[g].f && delete f.n[g].f;
                    f = f.n
                }
        } else l._events = k = {
            n: {}
        }
    };
    l.once = function(b, a) {
        var d = function() {
            l.unbind(b, d);
            return a.apply(this, arguments)
        };
        return l.on(b, d)
    };
    l.version = "0.4.2";
    l.toString = function() {
        return "You are running Eve 0.4.2"
    };
    "undefined" != typeof module && module.exports ? module.exports = l : "undefined" != typeof define ? define("eve", [], function() {
        return l
    }) : a.eve = l
})(this);
(function(a, d) {
    "function" === typeof define && define.amd ? define(["eve"], function(b) {
        return d(a, b)
    }) : d(a, a.eve || "function" == typeof require && require("eve"))
})(this, function(a, d) {
    function b(a) {
        if (b.is(a, "function")) return A ? a() : d.on("raphael.DOMload", a);
        if (b.is(a, Y)) return b._engine.create[G](b, a.splice(0, 3 + b.is(a[0], U))).add(a);
        var e = Array.prototype.slice.call(arguments, 0);
        if (b.is(e[e.length - 1], "function")) {
            var f = e.pop();
            return A ? f.call(b._engine.create[G](b, e)) : d.on("raphael.DOMload", function() {
                f.call(b._engine.create[G](b,
                    e))
            })
        }
        return b._engine.create[G](b, arguments)
    }

    function f(b) {
        if ("function" == typeof b || Object(b) !== b) return b;
        var a = new b.constructor,
            d;
        for (d in b) b[z](d) && (a[d] = f(b[d]));
        return a
    }

    function e(b, a, d) {
        function e() {
            var f = Array.prototype.slice.call(arguments, 0),
                g = f.join("\u2400"),
                h = e.cache = e.cache || {},
                k = e.count = e.count || [];
            if (h[z](g)) {
                a: for (var f = k, k = g, l = 0, m = f.length; l < m; l++)
                    if (f[l] === k) {
                        f.push(f.splice(l, 1)[0]);
                        break a
                    }return d ? d(h[g]) : h[g]
            }
            1E3 <= k.length && delete h[k.shift()];
            k.push(g);
            h[g] = b[G](a, f);
            return d ?
                d(h[g]) : h[g]
        }
        return e
    }

    function g() {
        return this.hex
    }

    function k(b, a) {
        for (var d = [], e = 0, f = b.length; f - 2 * !a > e; e += 2) {
            var g = [{
                x: +b[e - 2],
                y: +b[e - 1]
            }, {
                x: +b[e],
                y: +b[e + 1]
            }, {
                x: +b[e + 2],
                y: +b[e + 3]
            }, {
                x: +b[e + 4],
                y: +b[e + 5]
            }];
            a ? e ? f - 4 == e ? g[3] = {
                x: +b[0],
                y: +b[1]
            } : f - 2 == e && (g[2] = {
                x: +b[0],
                y: +b[1]
            }, g[3] = {
                x: +b[2],
                y: +b[3]
            }) : g[0] = {
                x: +b[f - 2],
                y: +b[f - 1]
            } : f - 4 == e ? g[3] = g[2] : e || (g[0] = {
                x: +b[e],
                y: +b[e + 1]
            });
            d.push(["C", (-g[0].x + 6 * g[1].x + g[2].x) / 6, (-g[0].y + 6 * g[1].y + g[2].y) / 6, (g[1].x + 6 * g[2].x - g[3].x) / 6, (g[1].y + 6 * g[2].y - g[3].y) / 6, g[2].x, g[2].y])
        }
        return d
    }

    function l(b, a, d, e, f, g, h, k, l) {
        null == l && (l = 1);
        l = (1 < l ? 1 : 0 > l ? 0 : l) / 2;
        for (var m = [-0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699, -0.9041, 0.9041, -0.9816, 0.9816], n = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472], u = 0, t = 0; 12 > t; t++) var p = l * m[t] + l,
            s = p * (p * (-3 * b + 9 * d - 9 * f + 3 * h) + 6 * b - 12 * d + 6 * f) - 3 * b + 3 * d,
            p = p * (p * (-3 * a + 9 * e - 9 * g + 3 * k) + 6 * a - 12 * e + 6 * g) - 3 * a + 3 * e,
            u = u + n[t] * F.sqrt(s * s + p * p);
        return l * u
    }

    function h(b, a, d, e, f, g, h, k, m) {
        if (!(0 > m || l(b, a, d, e, f, g, h, k) < m)) {
            var n = 0.5,
                u = 1 - n,
                t;
            for (t =
                l(b, a, d, e, f, g, h, k, u); 0.01 < X(t - m);) n /= 2, u += (t < m ? 1 : -1) * n, t = l(b, a, d, e, f, g, h, k, u);
            return u
        }
    }

    function m(a, d, e) {
        a = b._path2curve(a);
        d = b._path2curve(d);
        for (var f, g, h, k, m, n, u, t, p, s, q = e ? 0 : [], C = 0, v = a.length; C < v; C++)
            if (p = a[C], "M" == p[0]) f = m = p[1], g = n = p[2];
            else {
                "C" == p[0] ? (p = [f, g].concat(p.slice(1)), f = p[6], g = p[7]) : (p = [f, g, f, g, m, n, m, n], f = m, g = n);
                for (var w = 0, B = d.length; w < B; w++)
                    if (s = d[w], "M" == s[0]) h = u = s[1], k = t = s[2];
                    else {
                        "C" == s[0] ? (s = [h, k].concat(s.slice(1)), h = s[6], k = s[7]) : (s = [h, k, h, k, u, t, u, t], h = u, k = t);
                        var y;
                        var E = p,
                            G = s;
                        y = e;
                        var z = b.bezierBBox(E),
                            x = b.bezierBBox(G);
                        if (b.isBBoxIntersect(z, x)) {
                            for (var z = l.apply(0, E), x = l.apply(0, G), z = L(~~(z / 5), 1), x = L(~~(x / 5), 1), A = [], Sa = [], D = {}, Ta = y ? 0 : [], ea = 0; ea < z + 1; ea++) {
                                var na = b.findDotsAtSegment.apply(b, E.concat(ea / z));
                                A.push({
                                    x: na.x,
                                    y: na.y,
                                    t: ea / z
                                })
                            }
                            for (ea = 0; ea < x + 1; ea++) na = b.findDotsAtSegment.apply(b, G.concat(ea / x)), Sa.push({
                                x: na.x,
                                y: na.y,
                                t: ea / x
                            });
                            for (ea = 0; ea < z; ea++)
                                for (E = 0; E < x; E++) {
                                    var oa = A[ea],
                                        Ka = A[ea + 1],
                                        G = Sa[E],
                                        na = Sa[E + 1],
                                        N = 0.001 > X(Ka.x - oa.x) ? "y" : "x",
                                        Ea = 0.001 > X(na.x - G.x) ? "y" :
                                        "x",
                                        H;
                                    H = oa.x;
                                    var M = oa.y,
                                        F = Ka.x,
                                        J = Ka.y,
                                        K = G.x,
                                        I = G.y,
                                        O = na.x,
                                        qa = na.y;
                                    if (L(H, F) < V(K, O) || V(H, F) > L(K, O) || L(M, J) < V(I, qa) || V(M, J) > L(I, qa)) H = void 0;
                                    else {
                                        var P = (H * J - M * F) * (K - O) - (H - F) * (K * qa - I * O),
                                            aa = (H * J - M * F) * (I - qa) - (M - J) * (K * qa - I * O),
                                            ta = (H - F) * (I - qa) - (M - J) * (K - O);
                                        if (ta) {
                                            var P = P / ta,
                                                aa = aa / ta,
                                                ta = +P.toFixed(2),
                                                Fa = +aa.toFixed(2);
                                            H = ta < +V(H, F).toFixed(2) || ta > +L(H, F).toFixed(2) || ta < +V(K, O).toFixed(2) || ta > +L(K, O).toFixed(2) || Fa < +V(M, J).toFixed(2) || Fa > +L(M, J).toFixed(2) || Fa < +V(I, qa).toFixed(2) || Fa > +L(I, qa).toFixed(2) ? void 0 : {
                                                x: P,
                                                y: aa
                                            }
                                        } else H = void 0
                                    }
                                    H && D[H.x.toFixed(4)] != H.y.toFixed(4) && (D[H.x.toFixed(4)] = H.y.toFixed(4), oa = oa.t + X((H[N] - oa[N]) / (Ka[N] - oa[N])) * (Ka.t - oa.t), G = G.t + X((H[Ea] - G[Ea]) / (na[Ea] - G[Ea])) * (na.t - G.t), 0 <= oa && 1.001 >= oa && 0 <= G && 1.001 >= G && (y ? Ta++ : Ta.push({
                                        x: H.x,
                                        y: H.y,
                                        t1: V(oa, 1),
                                        t2: V(G, 1)
                                    })))
                                }
                            y = Ta
                        } else y = y ? 0 : [];
                        if (e) q += y;
                        else {
                            z = 0;
                            for (x = y.length; z < x; z++) y[z].segment1 = C, y[z].segment2 = w, y[z].bez1 = p, y[z].bez2 = s;
                            q = q.concat(y)
                        }
                    }
            }
        return q
    }

    function n(b, a, d, e, f, g) {
        null != b ? (this.a = +b, this.b = +a, this.c = +d, this.d = +e, this.e = +f, this.f = +g) : (this.a = 1, this.c = this.b = 0, this.d = 1, this.f = this.e = 0)
    }

    function p() {
        return this.x + M + this.y + M + this.width + " \u00d7 " + this.height
    }

    function s(b, a, d, e, f, g) {
        function h(b, a) {
            var d, e, f, g;
            f = b;
            for (e = 0; 8 > e; e++) {
                g = ((m * f + l) * f + k) * f - b;
                if (X(g) < a) return f;
                d = (3 * m * f + 2 * l) * f + k;
                if (1E-6 > X(d)) break;
                f -= g / d
            }
            d = 0;
            e = 1;
            f = b;
            if (f < d) return d;
            if (f > e) return e;
            for (; d < e;) {
                g = ((m * f + l) * f + k) * f;
                if (X(g - b) < a) break;
                b > g ? d = f : e = f;
                f = (e - d) / 2 + d
            }
            return f
        }
        var k = 3 * a,
            l = 3 * (e - a) - k,
            m = 1 - k - l,
            n = 3 * d,
            u = 3 * (f - d) - n,
            t = 1 - n - u;
        return function(b, a) {
            var d =
                h(b, a);
            return ((t * d + u) * d + n) * d
        }(b, 1 / (200 * g))
    }

    function q(b, a) {
        var d = [],
            e = {};
        this.ms = a;
        this.times = 1;
        if (b) {
            for (var f in b) b[z](f) && (e[R(f)] = b[f], d.push(R(f)));
            d.sort(ra)
        }
        this.anim = e;
        this.top = d[d.length - 1];
        this.percents = d
    }

    function v(a, e, f, g, h, k) {
        f = R(f);
        var l, m, u, t, p, q, C = a.ms,
            v = {},
            w = {},
            y = {};
        if (g)
            for (q = 0, G = T.length; q < G; q++) {
                var E = T[q];
                if (E.el.id == e.id && E.anim == a) {
                    E.percent != f ? (T.splice(q, 1), u = 1) : m = E;
                    e.attr(E.totalOrigin);
                    break
                }
            } else g = +w;
        q = 0;
        for (var G = a.percents.length; q < G; q++)
            if (a.percents[q] == f || a.percents[q] >
                g * a.top) {
                f = a.percents[q];
                p = a.percents[q - 1] || 0;
                C = C / a.top * (f - p);
                t = a.percents[q + 1];
                l = a.anim[f];
                break
            } else g && e.attr(a.anim[a.percents[q]]);
        if (l) {
            if (m) m.initstatus = g, m.start = new Date - m.ms * g;
            else {
                for (var x in l)
                    if (l[z](x) && (sa[z](x) || e.paper.customAttributes[z](x))) switch (v[x] = e.attr(x), null == v[x] && (v[x] = ha[x]), w[x] = l[x], sa[x]) {
                        case U:
                            y[x] = (w[x] - v[x]) / C;
                            break;
                        case "colour":
                            v[x] = b.getRGB(v[x]);
                            q = b.getRGB(w[x]);
                            y[x] = {
                                r: (q.r - v[x].r) / C,
                                g: (q.g - v[x].g) / C,
                                b: (q.b - v[x].b) / C
                            };
                            break;
                        case "path":
                            q = La(v[x], w[x]);
                            E =
                                q[1];
                            v[x] = q[0];
                            y[x] = [];
                            q = 0;
                            for (G = v[x].length; q < G; q++) {
                                y[x][q] = [0];
                                for (var A = 1, D = v[x][q].length; A < D; A++) y[x][q][A] = (E[q][A] - v[x][q][A]) / C
                            }
                            break;
                        case "transform":
                            q = e._;
                            if (G = lb(q[x], w[x]))
                                for (v[x] = G.from, w[x] = G.to, y[x] = [], y[x].real = !0, q = 0, G = v[x].length; q < G; q++)
                                    for (y[x][q] = [v[x][q][0]], A = 1, D = v[x][q].length; A < D; A++) y[x][q][A] = (w[x][q][A] - v[x][q][A]) / C;
                            else G = e.matrix || new n, q = {
                                    _: {
                                        transform: q.transform
                                    },
                                    getBBox: function() {
                                        return e.getBBox(1)
                                    }
                                }, v[x] = [G.a, G.b, G.c, G.d, G.e, G.f], bb(q, w[x]), w[x] = q._.transform,
                                y[x] = [(q.matrix.a - G.a) / C, (q.matrix.b - G.b) / C, (q.matrix.c - G.c) / C, (q.matrix.d - G.d) / C, (q.matrix.e - G.e) / C, (q.matrix.f - G.f) / C];
                            break;
                        case "csv":
                            G = P(l[x])[Q](B);
                            E = P(v[x])[Q](B);
                            if ("clip-rect" == x)
                                for (v[x] = E, y[x] = [], q = E.length; q--;) y[x][q] = (G[q] - v[x][q]) / C;
                            w[x] = G;
                            break;
                        default:
                            for (G = [][H](l[x]), E = [][H](v[x]), y[x] = [], q = e.paper.customAttributes[x].length; q--;) y[x][q] = ((G[q] || 0) - (E[q] || 0)) / C
                    }
                    q = l.easing;
                x = b.easing_formulas[q];
                if (!x)
                    if ((x = P(q).match(ma)) && 5 == x.length) {
                        var N = x;
                        x = function(b) {
                            return s(b, +N[1], +N[2], +N[3], +N[4], C)
                        }
                    } else x = Da;
                q = l.start || a.start || +new Date;
                E = {
                    anim: a,
                    percent: f,
                    timestamp: q,
                    start: q + (a.del || 0),
                    status: 0,
                    initstatus: g || 0,
                    stop: !1,
                    ms: C,
                    easing: x,
                    from: v,
                    diff: y,
                    to: w,
                    el: e,
                    callback: l.callback,
                    prev: p,
                    next: t,
                    repeat: k || a.times,
                    origin: e.attr(),
                    totalOrigin: h
                };
                T.push(E);
                if (g && !m && !u && (E.stop = !0, E.start = new Date - C * g, 1 == T.length)) return Ua();
                u && (E.start = new Date - E.ms * g);
                1 == T.length && cb(Ua)
            }
            d("raphael.anim.start." + e.id, e, a)
        }
    }

    function x(b) {
        for (var a = 0; a < T.length; a++) T[a].el.paper == b && T.splice(a--, 1)
    }
    b.version = "2.1.2";
    b.eve = d;
    var A, B = /[, ]+/,
        D = {
            circle: 1,
            rect: 1,
            path: 1,
            ellipse: 1,
            text: 1,
            image: 1
        },
        y = /\{(\d+)\}/g,
        z = "hasOwnProperty",
        w = {
            doc: document,
            win: a
        },
        t = Object.prototype[z].call(w.win, "Raphael"),
        u = w.win.Raphael,
        C = function() {
            this.ca = this.customAttributes = {}
        },
        E, G = "apply",
        H = "concat",
        O = "ontouchstart" in w.win || w.win.DocumentTouch && w.doc instanceof DocumentTouch,
        M = " ",
        P = String,
        Q = "split",
        N = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel" [Q](M),
        J = {
            mousedown: "touchstart",
            mousemove: "touchmove",
            mouseup: "touchend"
        },
        K = P.prototype.toLowerCase,
        F = Math,
        L = F.max,
        V = F.min,
        X = F.abs,
        Z = F.pow,
        I = F.PI,
        U = "number",
        Y = "array",
        fa = Object.prototype.toString;
    b._ISURL = /^url\(['"]?(.+?)['"]?\)$/i;
    var ga = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
        la = {
            NaN: 1,
            Infinity: 1,
            "-Infinity": 1
        },
        ma = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
        S = F.round,
        R = parseFloat,
        da = parseInt,
        ba = P.prototype.toUpperCase,
        ha = b._availableAttrs = {
            "arrow-end": "none",
            "arrow-start": "none",
            blur: 0,
            "clip-rect": "0 0 1e9 1e9",
            cursor: "default",
            cx: 0,
            cy: 0,
            fill: "#fff",
            "fill-opacity": 1,
            font: '10px "Arial"',
            "font-family": '"Arial"',
            "font-size": "10",
            "font-style": "normal",
            "font-weight": 400,
            gradient: 0,
            height: 0,
            href: "http://raphaeljs.com/",
            "letter-spacing": 0,
            opacity: 1,
            path: "M0,0",
            r: 0,
            rx: 0,
            ry: 0,
            src: "",
            stroke: "#000",
            "stroke-dasharray": "",
            "stroke-linecap": "butt",
            "stroke-linejoin": "butt",
            "stroke-miterlimit": 0,
            "stroke-opacity": 1,
            "stroke-width": 1,
            target: "_blank",
            "text-anchor": "middle",
            title: "Raphael",
            transform: "",
            width: 0,
            x: 0,
            y: 0
        },
        sa = b._availableAnimAttrs = {
            blur: U,
            "clip-rect": "csv",
            cx: U,
            cy: U,
            fill: "colour",
            "fill-opacity": U,
            "font-size": U,
            height: U,
            opacity: U,
            path: "path",
            r: U,
            rx: U,
            ry: U,
            stroke: "colour",
            "stroke-opacity": U,
            "stroke-width": U,
            transform: "transform",
            width: U,
            x: U,
            y: U
        },
        aa = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
        Ea = {
            hs: 1,
            rg: 1
        },
        Fa = /,?([achlmqrstvxz]),?/gi,
        ta = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
        mb = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
        db = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig;
    b._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/;
    var pa = {},
        ra = function(b, a) {
            return R(b) - R(a)
        },
        Da = function(b) {
            return b
        },
        Aa = b._rectPath = function(b, a, d, e, f) {
            return f ? [
                ["M", b + f, a],
                ["l", d - 2 * f, 0],
                ["a", f, f, 0, 0, 1, f, f],
                ["l", 0, e - 2 *
                    f
                ],
                ["a", f, f, 0, 0, 1, -f, f],
                ["l", 2 * f - d, 0],
                ["a", f, f, 0, 0, 1, -f, -f],
                ["l", 0, 2 * f - e],
                ["a", f, f, 0, 0, 1, f, -f],
                ["z"]
            ] : [
                ["M", b, a],
                ["l", d, 0],
                ["l", 0, e],
                ["l", -d, 0],
                ["z"]
            ]
        },
        Ma = function(b, a, d, e) {
            null == e && (e = d);
            return [
                ["M", b, a],
                ["m", 0, -e],
                ["a", d, e, 0, 1, 1, 0, 2 * e],
                ["a", d, e, 0, 1, 1, 0, -2 * e],
                ["z"]
            ]
        },
        ia = b._getPath = {
            path: function(b) {
                return b.attr("path")
            },
            circle: function(b) {
                b = b.attrs;
                return Ma(b.cx, b.cy, b.r)
            },
            ellipse: function(b) {
                b = b.attrs;
                return Ma(b.cx, b.cy, b.rx, b.ry)
            },
            rect: function(b) {
                b = b.attrs;
                return Aa(b.x, b.y, b.width, b.height,
                    b.r)
            },
            image: function(b) {
                b = b.attrs;
                return Aa(b.x, b.y, b.width, b.height)
            },
            text: function(b) {
                b = b._getBBox();
                return Aa(b.x, b.y, b.width, b.height)
            },
            set: function(b) {
                b = b._getBBox();
                return Aa(b.x, b.y, b.width, b.height)
            }
        },
        ua = b.mapPath = function(b, a) {
            if (!a) return b;
            var d, e, f, g, h, k, l;
            b = La(b);
            f = 0;
            for (h = b.length; f < h; f++)
                for (l = b[f], g = 1, k = l.length; g < k; g += 2) d = a.x(l[g], l[g + 1]), e = a.y(l[g], l[g + 1]), l[g] = d, l[g + 1] = e;
            return b
        };
    b._g = w;
    b.type = w.win.SVGAngle || w.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure",
        "1.1") ? "SVG" : "VML";
    if ("VML" == b.type) {
        var Ga = w.doc.createElement("div"),
            Ba;
        Ga.innerHTML = '<v:shape adj="1"/>';
        Ba = Ga.firstChild;
        Ba.style.behavior = "url(#default#VML)";
        if (!Ba || "object" != typeof Ba.adj) return b.type = "";
        Ga = null
    }
    b.svg = !(b.vml = "VML" == b.type);
    b._Paper = C;
    b.fn = E = C.prototype = b.prototype;
    b._id = 0;
    b._oid = 0;
    b.is = function(b, a) {
        a = K.call(a);
        return "finite" == a ? !la[z](+b) : "array" == a ? b instanceof Array : "null" == a && null === b || a == typeof b && null !== b || "object" == a && b === Object(b) || "array" == a && Array.isArray && Array.isArray(b) ||
            fa.call(b).slice(8, -1).toLowerCase() == a
    };
    b.angle = function(a, d, e, f, g, h) {
        return null == g ? (a -= e, d -= f, a || d ? (180 * F.atan2(-d, -a) / I + 540) % 360 : 0) : b.angle(a, d, g, h) - b.angle(e, f, g, h)
    };
    b.rad = function(b) {
        return b % 360 * I / 180
    };
    b.deg = function(b) {
        return Math.round(1E3 * (180 * b / I % 360)) / 1E3
    };
    b.snapTo = function(a, d, e) {
        e = b.is(e, "finite") ? e : 10;
        if (b.is(a, Y))
            for (var f = a.length; f--;) {
                if (X(a[f] - d) <= e) return a[f]
            } else {
                a = +a;
                f = d % a;
                if (f < e) return d - f;
                if (f > a - e) return d - f + a
            }
        return d
    };
    b.createUUID = function(b, a) {
        return function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(b,
                a).toUpperCase()
        }
    }(/[xy]/g, function(b) {
        var a = 16 * F.random() | 0;
        return ("x" == b ? a : a & 3 | 8).toString(16)
    });
    b.setWindow = function(a) {
        d("raphael.setWindow", b, w.win, a);
        w.win = a;
        w.doc = w.win.document;
        b._engine.initWin && b._engine.initWin(w.win)
    };
    var wa = function(a) {
            if (b.vml) {
                var d = /^\s+|\s+$/g,
                    f;
                try {
                    var g = new ActiveXObject("htmlfile");
                    g.write("<body>");
                    g.close();
                    f = g.body
                } catch (h) {
                    f = createPopup().document.body
                }
                var l = f.createTextRange();
                wa = e(function(b) {
                    try {
                        f.style.color = P(b).replace(d, "");
                        var a = l.queryCommandValue("ForeColor");
                        return "#" + ("000000" + ((a & 255) << 16 | a & 65280 | (a & 16711680) >>> 16).toString(16)).slice(-6)
                    } catch (e) {
                        return "none"
                    }
                })
            } else {
                var k = w.doc.createElement("i");
                k.title = "Rapha\u00ebl Colour Picker";
                k.style.display = "none";
                w.doc.body.appendChild(k);
                wa = e(function(b) {
                    k.style.color = b;
                    return w.doc.defaultView.getComputedStyle(k, "").getPropertyValue("color")
                })
            }
            return wa(a)
        },
        Ha = function() {
            return "hsb(" + [this.h, this.s, this.b] + ")"
        },
        xa = function() {
            return "hsl(" + [this.h, this.s, this.l] + ")"
        },
        va = function() {
            return this.hex
        },
        Ca = function(a,
            d, e) {
            null == d && b.is(a, "object") && "r" in a && "g" in a && "b" in a && (e = a.b, d = a.g, a = a.r);
            null == d && b.is(a, "string") && (e = b.getRGB(a), a = e.r, d = e.g, e = e.b);
            if (1 < a || 1 < d || 1 < e) a /= 255, d /= 255, e /= 255;
            return [a, d, e]
        },
        Na = function(a, d, e, f) {
            a *= 255;
            d *= 255;
            e *= 255;
            a = {
                r: a,
                g: d,
                b: e,
                hex: b.rgb(a, d, e),
                toString: va
            };
            b.is(f, "finite") && (a.opacity = f);
            return a
        };
    b.color = function(a) {
        var d;
        b.is(a, "object") && "h" in a && "s" in a && "b" in a ? (d = b.hsb2rgb(a), a.r = d.r, a.g = d.g, a.b = d.b, a.hex = d.hex) : b.is(a, "object") && "h" in a && "s" in a && "l" in a ? (d = b.hsl2rgb(a),
            a.r = d.r, a.g = d.g, a.b = d.b, a.hex = d.hex) : (b.is(a, "string") && (a = b.getRGB(a)), b.is(a, "object") && "r" in a && "g" in a && "b" in a ? (d = b.rgb2hsl(a), a.h = d.h, a.s = d.s, a.l = d.l, d = b.rgb2hsb(a), a.v = d.b) : (a = {
            hex: "none"
        }, a.r = a.g = a.b = a.h = a.s = a.v = a.l = -1));
        a.toString = va;
        return a
    };
    b.hsb2rgb = function(b, a, d, e) {
        this.is(b, "object") && "h" in b && "s" in b && "b" in b && (d = b.b, a = b.s, e = b.o, b = b.h);
        var f, g, h;
        b = 360 * b % 360 / 60;
        h = d * a;
        a = h * (1 - X(b % 2 - 1));
        d = f = g = d - h;
        b = ~~b;
        d += [h, a, 0, 0, a, h][b];
        f += [a, h, h, a, 0, 0][b];
        g += [0, 0, a, h, h, a][b];
        return Na(d, f, g, e)
    };
    b.hsl2rgb =
        function(b, a, d, e) {
            this.is(b, "object") && "h" in b && "s" in b && "l" in b && (d = b.l, a = b.s, b = b.h);
            if (1 < b || 1 < a || 1 < d) b /= 360, a /= 100, d /= 100;
            var f, g, h;
            b = 360 * b % 360 / 60;
            h = 2 * a * (0.5 > d ? d : 1 - d);
            a = h * (1 - X(b % 2 - 1));
            d = f = g = d - h / 2;
            b = ~~b;
            d += [h, a, 0, 0, a, h][b];
            f += [a, h, h, a, 0, 0][b];
            g += [0, 0, a, h, h, a][b];
            return Na(d, f, g, e)
        };
    b.rgb2hsb = function(b, a, d) {
        d = Ca(b, a, d);
        b = d[0];
        a = d[1];
        d = d[2];
        var e, f;
        e = L(b, a, d);
        f = e - V(b, a, d);
        b = 60 * (((0 == f ? 0 : e == b ? (a - d) / f : e == a ? (d - b) / f + 2 : (b - a) / f + 4) + 360) % 6) / 360;
        return {
            h: b,
            s: 0 == f ? 0 : f / e,
            b: e,
            toString: Ha
        }
    };
    b.rgb2hsl = function(b,
        a, d) {
        d = Ca(b, a, d);
        b = d[0];
        a = d[1];
        d = d[2];
        var e, f, g;
        e = L(b, a, d);
        f = V(b, a, d);
        g = e - f;
        b = 60 * (((0 == g ? 0 : e == b ? (a - d) / g : e == a ? (d - b) / g + 2 : (b - a) / g + 4) + 360) % 6) / 360;
        e = (e + f) / 2;
        return {
            h: b,
            s: 0 == g ? 0 : 0.5 > e ? g / (2 * e) : g / (2 - 2 * e),
            l: e,
            toString: xa
        }
    };
    b._path2string = function() {
        return this.join(",").replace(Fa, "$1")
    };
    b._preload = function(b, a) {
        var d = w.doc.createElement("img");
        d.style.cssText = "position:absolute;left:-9999em;top:-9999em";
        d.onload = function() {
            a.call(this);
            this.onload = null;
            w.doc.body.removeChild(this)
        };
        d.onerror = function() {
            w.doc.body.removeChild(this)
        };
        w.doc.body.appendChild(d);
        d.src = b
    };
    b.getRGB = e(function(a) {
        if (!a || (a = P(a)).indexOf("-") + 1) return {
            r: -1,
            g: -1,
            b: -1,
            hex: "none",
            error: 1,
            toString: g
        };
        if ("none" == a) return {
            r: -1,
            g: -1,
            b: -1,
            hex: "none",
            toString: g
        };
        !Ea[z](a.toLowerCase().substring(0, 2)) && "#" != a.charAt() && (a = wa(a));
        var d, e, f, h, l;
        if (a = a.match(ga)) {
            a[2] && (f = da(a[2].substring(5), 16), e = da(a[2].substring(3, 5), 16), d = da(a[2].substring(1, 3), 16));
            a[3] && (f = da((l = a[3].charAt(3)) + l, 16), e = da((l = a[3].charAt(2)) + l, 16), d = da((l = a[3].charAt(1)) + l, 16));
            a[4] && (l = a[4][Q](aa),
                d = R(l[0]), "%" == l[0].slice(-1) && (d *= 2.55), e = R(l[1]), "%" == l[1].slice(-1) && (e *= 2.55), f = R(l[2]), "%" == l[2].slice(-1) && (f *= 2.55), "rgba" == a[1].toLowerCase().slice(0, 4) && (h = R(l[3])), l[3] && "%" == l[3].slice(-1) && (h /= 100));
            if (a[5]) return l = a[5][Q](aa), d = R(l[0]), "%" == l[0].slice(-1) && (d *= 2.55), e = R(l[1]), "%" == l[1].slice(-1) && (e *= 2.55), f = R(l[2]), "%" == l[2].slice(-1) && (f *= 2.55), "deg" != l[0].slice(-3) && "\u00b0" != l[0].slice(-1) || (d /= 360), "hsba" == a[1].toLowerCase().slice(0, 4) && (h = R(l[3])), l[3] && "%" == l[3].slice(-1) && (h /=
                100), b.hsb2rgb(d, e, f, h);
            if (a[6]) return l = a[6][Q](aa), d = R(l[0]), "%" == l[0].slice(-1) && (d *= 2.55), e = R(l[1]), "%" == l[1].slice(-1) && (e *= 2.55), f = R(l[2]), "%" == l[2].slice(-1) && (f *= 2.55), "deg" != l[0].slice(-3) && "\u00b0" != l[0].slice(-1) || (d /= 360), "hsla" == a[1].toLowerCase().slice(0, 4) && (h = R(l[3])), l[3] && "%" == l[3].slice(-1) && (h /= 100), b.hsl2rgb(d, e, f, h);
            a = {
                r: d,
                g: e,
                b: f,
                toString: g
            };
            a.hex = "#" + (16777216 | f | e << 8 | d << 16).toString(16).slice(1);
            b.is(h, "finite") && (a.opacity = h);
            return a
        }
        return {
            r: -1,
            g: -1,
            b: -1,
            hex: "none",
            error: 1,
            toString: g
        }
    }, b);
    b.hsb = e(function(a, d, e) {
        return b.hsb2rgb(a, d, e).hex
    });
    b.hsl = e(function(a, d, e) {
        return b.hsl2rgb(a, d, e).hex
    });
    b.rgb = e(function(a, b, d) {
        return "#" + (16777216 | d | b << 8 | a << 16).toString(16).slice(1)
    });
    b.getColor = function(a) {
        a = this.getColor.start = this.getColor.start || {
            h: 0,
            s: 1,
            b: a || 0.75
        };
        var b = this.hsb2rgb(a.h, a.s, a.b);
        a.h += 0.075;
        1 < a.h && (a.h = 0, a.s -= 0.2, 0 >= a.s && (this.getColor.start = {
            h: 0,
            s: 1,
            b: a.b
        }));
        return b.hex
    };
    b.getColor.reset = function() {
        delete this.start
    };
    b.parsePathString = function(a) {
        if (!a) return null;
        var d = ja(a);
        if (d.arr) return $(d.arr);
        var e = {
                a: 7,
                c: 6,
                h: 1,
                l: 2,
                m: 2,
                r: 4,
                q: 4,
                s: 4,
                t: 2,
                v: 1,
                z: 0
            },
            f = [];
        b.is(a, Y) && b.is(a[0], Y) && (f = $(a));
        f.length || P(a).replace(ta, function(a, b, d) {
            var g = [];
            a = b.toLowerCase();
            d.replace(db, function(a, b) {
                b && g.push(+b)
            });
            "m" == a && 2 < g.length && (f.push([b][H](g.splice(0, 2))), a = "l", b = "m" == b ? "l" : "L");
            if ("r" == a) f.push([b][H](g));
            else
                for (; g.length >= e[a] && (f.push([b][H](g.splice(0, e[a]))), e[a]););
        });
        f.toString = b._path2string;
        d.arr = $(f);
        return f
    };
    b.parseTransformString = e(function(a) {
        if (!a) return null;
        var d = [];
        b.is(a, Y) && b.is(a[0], Y) && (d = $(a));
        d.length || P(a).replace(mb, function(a, b, e) {
            var f = [];
            K.call(b);
            e.replace(db, function(a, b) {
                b && f.push(+b)
            });
            d.push([b][H](f))
        });
        d.toString = b._path2string;
        return d
    });
    var ja = function(a) {
        var b = ja.ps = ja.ps || {};
        b[a] ? b[a].sleep = 100 : b[a] = {
            sleep: 100
        };
        setTimeout(function() {
            for (var d in b) b[z](d) && d != a && (b[d].sleep--, !b[d].sleep && delete b[d])
        });
        return b[a]
    };
    b.findDotsAtSegment = function(a, b, d, e, f, g, h, l, k) {
        var m = 1 - k,
            n = Z(m, 3),
            u = Z(m, 2),
            t = k * k,
            p = t * k,
            s = n * a + 3 * u * k * d + 3 * m * k * k * f +
            p * h,
            n = n * b + 3 * u * k * e + 3 * m * k * k * g + p * l,
            u = a + 2 * k * (d - a) + t * (f - 2 * d + a),
            p = b + 2 * k * (e - b) + t * (g - 2 * e + b),
            q = d + 2 * k * (f - d) + t * (h - 2 * f + d),
            t = e + 2 * k * (g - e) + t * (l - 2 * g + e);
        a = m * a + k * d;
        b = m * b + k * e;
        f = m * f + k * h;
        g = m * g + k * l;
        l = 90 - 180 * F.atan2(u - q, p - t) / I;
        (u > q || p < t) && (l += 180);
        return {
            x: s,
            y: n,
            m: {
                x: u,
                y: p
            },
            n: {
                x: q,
                y: t
            },
            start: {
                x: a,
                y: b
            },
            end: {
                x: f,
                y: g
            },
            alpha: l
        }
    };
    b.bezierBBox = function(a, d, e, f, g, h, l, k) {
        b.is(a, "array") || (a = [a, d, e, f, g, h, l, k]);
        a = eb.apply(null, a);
        return {
            x: a.min.x,
            y: a.min.y,
            x2: a.max.x,
            y2: a.max.y,
            width: a.max.x - a.min.x,
            height: a.max.y - a.min.y
        }
    };
    b.isPointInsideBBox =
        function(a, b, d) {
            return b >= a.x && b <= a.x2 && d >= a.y && d <= a.y2
        };
    b.isBBoxIntersect = function(a, d) {
        var e = b.isPointInsideBBox;
        return e(d, a.x, a.y) || e(d, a.x2, a.y) || e(d, a.x, a.y2) || e(d, a.x2, a.y2) || e(a, d.x, d.y) || e(a, d.x2, d.y) || e(a, d.x, d.y2) || e(a, d.x2, d.y2) || (a.x < d.x2 && a.x > d.x || d.x < a.x2 && d.x > a.x) && (a.y < d.y2 && a.y > d.y || d.y < a.y2 && d.y > a.y)
    };
    b.pathIntersection = function(a, b) {
        return m(a, b)
    };
    b.pathIntersectionNumber = function(a, b) {
        return m(a, b, 1)
    };
    b.isPointInsidePath = function(a, d, e) {
        var f = b.pathBBox(a);
        return b.isPointInsideBBox(f,
            d, e) && 1 == m(a, [
            ["M", d, e],
            ["H", f.x2 + 10]
        ], 1) % 2
    };
    b._removedFactory = function(a) {
        return function() {
            d("raphael.log", null, "Rapha\u00ebl: you are calling to method \u201c" + a + "\u201d of removed object", a)
        }
    };
    var ya = b.pathBBox = function(a) {
            var b = ja(a);
            if (b.bbox) return f(b.bbox);
            if (!a) return {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                x2: 0,
                y2: 0
            };
            a = La(a);
            for (var d = 0, e = 0, g = [], h = [], l, k = 0, m = a.length; k < m; k++) l = a[k], "M" == l[0] ? (d = l[1], e = l[2], g.push(d), h.push(e)) : (d = eb(d, e, l[1], l[2], l[3], l[4], l[5], l[6]), g = g[H](d.min.x, d.max.x), h = h[H](d.min.y,
                d.max.y), d = l[5], e = l[6]);
            a = V[G](0, g);
            l = V[G](0, h);
            g = L[G](0, g);
            h = L[G](0, h);
            k = g - a;
            m = h - l;
            h = {
                x: a,
                y: l,
                x2: g,
                y2: h,
                width: k,
                height: m,
                cx: a + k / 2,
                cy: l + m / 2
            };
            b.bbox = f(h);
            return h
        },
        $ = function(a) {
            a = f(a);
            a.toString = b._path2string;
            return a
        },
        Oa = b._pathToRelative = function(a) {
            var d = ja(a);
            if (d.rel) return $(d.rel);
            b.is(a, Y) && b.is(a && a[0], Y) || (a = b.parsePathString(a));
            var e = [],
                f = 0,
                g = 0,
                h = 0,
                l = 0,
                k = 0;
            "M" == a[0][0] && (f = a[0][1], g = a[0][2], h = f, l = g, k++, e.push(["M", f, g]));
            for (var m = a.length; k < m; k++) {
                var n = e[k] = [],
                    u = a[k];
                if (u[0] != K.call(u[0])) switch (n[0] =
                    K.call(u[0]), n[0]) {
                    case "a":
                        n[1] = u[1];
                        n[2] = u[2];
                        n[3] = u[3];
                        n[4] = u[4];
                        n[5] = u[5];
                        n[6] = +(u[6] - f).toFixed(3);
                        n[7] = +(u[7] - g).toFixed(3);
                        break;
                    case "v":
                        n[1] = +(u[1] - g).toFixed(3);
                        break;
                    case "m":
                        h = u[1], l = u[2];
                    default:
                        for (var t = 1, p = u.length; t < p; t++) n[t] = +(u[t] - (t % 2 ? f : g)).toFixed(3)
                } else
                    for (e[k] = [], "m" == u[0] && (h = u[1] + f, l = u[2] + g), n = 0, t = u.length; n < t; n++) e[k][n] = u[n];
                u = e[k].length;
                switch (e[k][0]) {
                    case "z":
                        f = h;
                        g = l;
                        break;
                    case "h":
                        f += +e[k][u - 1];
                        break;
                    case "v":
                        g += +e[k][u - 1];
                        break;
                    default:
                        f += +e[k][u - 2], g += +e[k][u -
                            1
                        ]
                }
            }
            e.toString = b._path2string;
            d.rel = $(e);
            return e
        },
        Ia = b._pathToAbsolute = function(a) {
            var d = ja(a);
            if (d.abs) return $(d.abs);
            b.is(a, Y) && b.is(a && a[0], Y) || (a = b.parsePathString(a));
            if (!a || !a.length) return [
                ["M", 0, 0]
            ];
            var e = [],
                f = 0,
                g = 0,
                h = 0,
                l = 0,
                m = 0;
            "M" == a[0][0] && (f = +a[0][1], g = +a[0][2], h = f, l = g, m++, e[0] = ["M", f, g]);
            for (var n = 3 == a.length && "M" == a[0][0] && "R" == a[1][0].toUpperCase() && "Z" == a[2][0].toUpperCase(), u, t = m, p = a.length; t < p; t++) {
                e.push(m = []);
                u = a[t];
                if (u[0] != ba.call(u[0])) switch (m[0] = ba.call(u[0]), m[0]) {
                        case "A":
                            m[1] =
                                u[1];
                            m[2] = u[2];
                            m[3] = u[3];
                            m[4] = u[4];
                            m[5] = u[5];
                            m[6] = +(u[6] + f);
                            m[7] = +(u[7] + g);
                            break;
                        case "V":
                            m[1] = +u[1] + g;
                            break;
                        case "H":
                            m[1] = +u[1] + f;
                            break;
                        case "R":
                            for (var s = [f, g][H](u.slice(1)), q = 2, v = s.length; q < v; q++) s[q] = +s[q] + f, s[++q] = +s[q] + g;
                            e.pop();
                            e = e[H](k(s, n));
                            break;
                        case "M":
                            h = +u[1] + f, l = +u[2] + g;
                        default:
                            for (q = 1, v = u.length; q < v; q++) m[q] = +u[q] + (q % 2 ? f : g)
                    } else if ("R" == u[0]) s = [f, g][H](u.slice(1)), e.pop(), e = e[H](k(s, n)), m = ["R"][H](u.slice(-2));
                    else
                        for (s = 0, q = u.length; s < q; s++) m[s] = u[s];
                switch (m[0]) {
                    case "Z":
                        f = h;
                        g = l;
                        break;
                    case "H":
                        f = m[1];
                        break;
                    case "V":
                        g = m[1];
                        break;
                    case "M":
                        h = m[m.length - 2], l = m[m.length - 1];
                    default:
                        f = m[m.length - 2], g = m[m.length - 1]
                }
            }
            e.toString = b._path2string;
            d.abs = $(e);
            return e
        },
        qa = function(a, b, d, e, f, g) {
            var h = 1 / 3,
                l = 2 / 3;
            return [h * a + l * d, h * b + l * e, h * f + l * d, h * g + l * e, f, g]
        },
        fb = function(a, b, d, f, g, h, l, k, m, n) {
            var u = 120 * I / 180,
                t = I / 180 * (+g || 0),
                p = [],
                s, q = e(function(a, b, d) {
                    var e = a * F.cos(d) - b * F.sin(d);
                    a = a * F.sin(d) + b * F.cos(d);
                    return {
                        x: e,
                        y: a
                    }
                });
            if (n) w = n[0], s = n[1], h = n[2], v = n[3];
            else {
                s = q(a, b, -t);
                a = s.x;
                b = s.y;
                s = q(k, m, -t);
                k = s.x;
                m = s.y;
                F.cos(I / 180 * g);
                F.sin(I / 180 * g);
                s = (a - k) / 2;
                w = (b - m) / 2;
                v = s * s / (d * d) + w * w / (f * f);
                1 < v && (v = F.sqrt(v), d *= v, f *= v);
                var v = d * d,
                    C = f * f,
                    v = (h == l ? -1 : 1) * F.sqrt(X((v * C - v * w * w - C * s * s) / (v * w * w + C * s * s)));
                h = v * d * w / f + (a + k) / 2;
                var v = v * -f * s / d + (b + m) / 2,
                    w = F.asin(((b - v) / f).toFixed(9));
                s = F.asin(((m - v) / f).toFixed(9));
                w = a < h ? I - w : w;
                s = k < h ? I - s : s;
                0 > w && (w = 2 * I + w);
                0 > s && (s = 2 * I + s);
                l && w > s && (w -= 2 * I);
                !l && s > w && (s -= 2 * I)
            }
            if (X(s - w) > u) {
                var p = s,
                    C = k,
                    y = m;
                s = w + u * (l && s > w ? 1 : -1);
                k = h + d * F.cos(s);
                m = v + f * F.sin(s);
                p = fb(k, m, d, f, g, 0, l, C, y, [s, p, h, v])
            }
            h = s - w;
            g = F.cos(w);
            u = F.sin(w);
            l = F.cos(s);
            s = F.sin(s);
            h = F.tan(h / 4);
            d = 4 / 3 * d * h;
            h *= 4 / 3 * f;
            f = [a, b];
            a = [a + d * u, b - h * g];
            b = [k + d * s, m - h * l];
            k = [k, m];
            a[0] = 2 * f[0] - a[0];
            a[1] = 2 * f[1] - a[1];
            if (n) return [a, b, k][H](p);
            p = [a, b, k][H](p).join()[Q](",");
            n = [];
            k = 0;
            for (m = p.length; k < m; k++) n[k] = k % 2 ? q(p[k - 1], p[k], t).y : q(p[k], p[k + 1], t).x;
            return n
        },
        Qa = function(a, b, d, e, f, g, h, l, k) {
            var m = 1 - k;
            return {
                x: Z(m, 3) * a + 3 * Z(m, 2) * k * d + 3 * m * k * k * f + Z(k, 3) * h,
                y: Z(m, 3) * b + 3 * Z(m, 2) * k * e + 3 * m * k * k * g + Z(k, 3) * l
            }
        },
        eb = e(function(a, b, d, e, f, g, h, l) {
            var k = f - 2 * d + a - (h - 2 * f + d),
                m = 2 * (d - a) - 2 * (f - d),
                n = a - d,
                u = (-m + F.sqrt(m * m - 4 * k * n)) / 2 / k,
                k = (-m - F.sqrt(m * m - 4 * k * n)) / 2 / k,
                t = [b, l],
                s = [a, h];
            "1e12" < X(u) && (u = 0.5);
            "1e12" < X(k) && (k = 0.5);
            0 < u && 1 > u && (u = Qa(a, b, d, e, f, g, h, l, u), s.push(u.x), t.push(u.y));
            0 < k && 1 > k && (u = Qa(a, b, d, e, f, g, h, l, k), s.push(u.x), t.push(u.y));
            k = g - 2 * e + b - (l - 2 * g + e);
            m = 2 * (e - b) - 2 * (g - e);
            n = b - e;
            u = (-m + F.sqrt(m * m - 4 * k * n)) / 2 / k;
            k = (-m - F.sqrt(m * m - 4 * k * n)) / 2 / k;
            "1e12" < X(u) && (u = 0.5);
            "1e12" < X(k) && (k = 0.5);
            0 < u && 1 > u && (u = Qa(a, b, d, e, f, g, h, l, u), s.push(u.x), t.push(u.y));
            0 < k && 1 > k && (u = Qa(a, b, d, e, f, g, h, l, k), s.push(u.x), t.push(u.y));
            return {
                min: {
                    x: V[G](0, s),
                    y: V[G](0, t)
                },
                max: {
                    x: L[G](0, s),
                    y: L[G](0, t)
                }
            }
        }),
        La = b._path2curve = e(function(a, b) {
            var d = !b && ja(a);
            if (!b && d.curve) return $(d.curve);
            var e = Ia(a),
                f = b && Ia(b),
                g = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null,
                    qy: null
                },
                h = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null,
                    qy: null
                },
                l = function(a, b, d) {
                    if (!a) return ["C", b.x, b.y, b.x, b.y, b.x, b.y];
                    a[0] in {
                        T: 1,
                        Q: 1
                    } || (b.qx = b.qy = null);
                    switch (a[0]) {
                        case "M":
                            b.X = a[1];
                            b.Y = a[2];
                            break;
                        case "A":
                            a = ["C"][H](fb[G](0, [b.x, b.y][H](a.slice(1))));
                            break;
                        case "S":
                            "C" == d || "S" == d ? (d = 2 * b.x -
                                b.bx, b = 2 * b.y - b.by) : (d = b.x, b = b.y);
                            a = ["C", d, b][H](a.slice(1));
                            break;
                        case "T":
                            "Q" == d || "T" == d ? (b.qx = 2 * b.x - b.qx, b.qy = 2 * b.y - b.qy) : (b.qx = b.x, b.qy = b.y);
                            a = ["C"][H](qa(b.x, b.y, b.qx, b.qy, a[1], a[2]));
                            break;
                        case "Q":
                            b.qx = a[1];
                            b.qy = a[2];
                            a = ["C"][H](qa(b.x, b.y, a[1], a[2], a[3], a[4]));
                            break;
                        case "L":
                            a = ["C"][H]([b.x, b.y, a[1], a[2], a[1], a[2]]);
                            break;
                        case "H":
                            a = ["C"][H]([b.x, b.y, a[1], b.y, a[1], b.y]);
                            break;
                        case "V":
                            a = ["C"][H]([b.x, b.y, b.x, a[1], b.x, a[1]]);
                            break;
                        case "Z":
                            a = ["C"][H]([b.x, b.y, b.X, b.Y, b.X, b.Y])
                    }
                    return a
                },
                k = function(a,
                    b) {
                    if (7 < a[b].length) {
                        a[b].shift();
                        for (var d = a[b]; d.length;) u[b] = "A", f && (n[b] = "A"), a.splice(b++, 0, ["C"][H](d.splice(0, 6)));
                        a.splice(b, 1);
                        q = L(e.length, f && f.length || 0)
                    }
                },
                m = function(a, b, d, g, h) {
                    a && b && "M" == a[h][0] && "M" != b[h][0] && (b.splice(h, 0, ["M", g.x, g.y]), d.bx = 0, d.by = 0, d.x = a[h][1], d.y = a[h][2], q = L(e.length, f && f.length || 0))
                },
                u = [],
                n = [],
                t = "",
                s = "",
                p = 0,
                q = L(e.length, f && f.length || 0);
            for (; p < q; p++) {
                e[p] && (t = e[p][0]);
                "C" != t && (u[p] = t, p && (s = u[p - 1]));
                e[p] = l(e[p], g, s);
                "A" != u[p] && "C" == t && (u[p] = "C");
                k(e, p);
                f && (f[p] &&
                    (t = f[p][0]), "C" != t && (n[p] = t, p && (s = n[p - 1])), f[p] = l(f[p], h, s), "A" != n[p] && "C" == t && (n[p] = "C"), k(f, p));
                m(e, f, g, h, p);
                m(f, e, h, g, p);
                var v = e[p],
                    C = f && f[p],
                    w = v.length,
                    y = f && C.length;
                g.x = v[w - 2];
                g.y = v[w - 1];
                g.bx = R(v[w - 4]) || g.x;
                g.by = R(v[w - 3]) || g.y;
                h.bx = f && (R(C[y - 4]) || h.x);
                h.by = f && (R(C[y - 3]) || h.y);
                h.x = f && C[y - 2];
                h.y = f && C[y - 1]
            }
            f || (d.curve = $(e));
            return f ? [e, f] : e
        }, null, $);
    b._parseDots = e(function(a) {
        for (var d = [], e = 0, f = a.length; e < f; e++) {
            var g = {},
                h = a[e].match(/^([^:]*):?([\d\.]*)/);
            g.color = b.getRGB(h[1]);
            if (g.color.error) return null;
            g.color = g.color.hex;
            h[2] && (g.offset = h[2] + "%");
            d.push(g)
        }
        e = 1;
        for (f = d.length - 1; e < f; e++)
            if (!d[e].offset) {
                a = R(d[e - 1].offset || 0);
                h = 0;
                for (g = e + 1; g < f; g++)
                    if (d[g].offset) {
                        h = d[g].offset;
                        break
                    }
                h || (h = 100, g = f);
                h = R(h);
                for (h = (h - a) / (g - e + 1); e < g; e++) a += h, d[e].offset = a + "%"
            }
        return d
    });
    var Ra = b._tear = function(a, b) {
        a == b.top && (b.top = a.prev);
        a == b.bottom && (b.bottom = a.next);
        a.next && (a.next.prev = a.prev);
        a.prev && (a.prev.next = a.next)
    };
    b._tofront = function(a, b) {
        b.top !== a && (Ra(a, b), a.next = null, a.prev = b.top, b.top.next = a, b.top = a)
    };
    b._toback = function(a, b) {
        b.bottom !== a && (Ra(a, b), a.next = b.bottom, a.prev = null, b.bottom.prev = a, b.bottom = a)
    };
    b._insertafter = function(a, b, d) {
        Ra(a, d);
        b == d.top && (d.top = a);
        b.next && (b.next.prev = a);
        a.next = b.next;
        a.prev = b;
        b.next = a
    };
    b._insertbefore = function(a, b, d) {
        Ra(a, d);
        b == d.bottom && (d.bottom = a);
        b.prev && (b.prev.next = a);
        a.prev = b.prev;
        b.prev = a;
        a.next = b
    };
    var nb = b.toMatrix = function(a, b) {
        var d = ya(a),
            e = {
                _: {
                    transform: ""
                },
                getBBox: function() {
                    return d
                }
            };
        bb(e, b);
        return e.matrix
    };
    b.transformPath = function(a, b) {
        return ua(a,
            nb(a, b))
    };
    var bb = b._extractTransform = function(a, d) {
            if (null == d) return a._.transform;
            d = P(d).replace(/\.{3}|\u2026/g, a._.transform || "");
            var e = b.parseTransformString(d),
                f = 0,
                g = 0,
                h = 0,
                l = 1,
                k = 1,
                m = a._,
                h = new n;
            m.transform = e || [];
            if (e)
                for (var g = 0, u = e.length; g < u; g++) {
                    var t = e[g],
                        p = t.length,
                        s = P(t[0]).toLowerCase(),
                        q = t[0] != s,
                        v = q ? h.invert() : 0,
                        C;
                    "t" == s && 3 == p ? q ? (p = v.x(0, 0), s = v.y(0, 0), q = v.x(t[1], t[2]), v = v.y(t[1], t[2]), h.translate(q - p, v - s)) : h.translate(t[1], t[2]) : "r" == s ? 2 == p ? (C = C || a.getBBox(1), h.rotate(t[1], C.x + C.width /
                        2, C.y + C.height / 2), f += t[1]) : 4 == p && (q ? (q = v.x(t[2], t[3]), v = v.y(t[2], t[3]), h.rotate(t[1], q, v)) : h.rotate(t[1], t[2], t[3]), f += t[1]) : "s" == s ? 2 == p || 3 == p ? (C = C || a.getBBox(1), h.scale(t[1], t[p - 1], C.x + C.width / 2, C.y + C.height / 2), l *= t[1], k *= t[p - 1]) : 5 == p && (q ? (q = v.x(t[3], t[4]), v = v.y(t[3], t[4]), h.scale(t[1], t[2], q, v)) : h.scale(t[1], t[2], t[3], t[4]), l *= t[1], k *= t[2]) : "m" == s && 7 == p && h.add(t[1], t[2], t[3], t[4], t[5], t[6]);
                    m.dirtyT = 1;
                    a.matrix = h
                }
            a.matrix = h;
            m.sx = l;
            m.sy = k;
            m.deg = f;
            m.dx = g = h.e;
            m.dy = h = h.f;
            1 == l && 1 == k && !f && m.bbox ? (m.bbox.x +=
                +g, m.bbox.y += +h) : m.dirtyT = 1
        },
        gb = function(a) {
            var b = a[0];
            switch (b.toLowerCase()) {
                case "t":
                    return [b, 0, 0];
                case "m":
                    return [b, 1, 0, 0, 1, 0, 0];
                case "r":
                    return 4 == a.length ? [b, 0, a[2], a[3]] : [b, 0];
                case "s":
                    return 5 == a.length ? [b, 1, 1, a[3], a[4]] : 3 == a.length ? [b, 1, 1] : [b, 1]
            }
        },
        lb = b._equaliseTransform = function(a, d) {
            d = P(d).replace(/\.{3}|\u2026/g, a);
            a = b.parseTransformString(a) || [];
            d = b.parseTransformString(d) || [];
            for (var e = L(a.length, d.length), f = [], g = [], h = 0, l, k, m, u; h < e; h++) {
                m = a[h] || gb(d[h]);
                u = d[h] || gb(m);
                if (m[0] != u[0] ||
                    "r" == m[0].toLowerCase() && (m[2] != u[2] || m[3] != u[3]) || "s" == m[0].toLowerCase() && (m[3] != u[3] || m[4] != u[4])) return;
                f[h] = [];
                g[h] = [];
                l = 0;
                for (k = L(m.length, u.length); l < k; l++) l in m && (f[h][l] = m[l]), l in u && (g[h][l] = u[l])
            }
            return {
                from: f,
                to: g
            }
        };
    b._getContainer = function(a, d, e, f) {
        var g;
        g = null != f || b.is(a, "object") ? a : w.doc.getElementById(a);
        if (null != g) return g.tagName ? null == d ? {
            container: g,
            width: g.style.pixelWidth || g.offsetWidth,
            height: g.style.pixelHeight || g.offsetHeight
        } : {
            container: g,
            width: d,
            height: e
        } : {
            container: 1,
            x: a,
            y: d,
            width: e,
            height: f
        }
    };
    b.pathToRelative = Oa;
    b._engine = {};
    b.path2curve = La;
    b.matrix = function(a, b, d, e, f, g) {
        return new n(a, b, d, e, f, g)
    };
    (function(a) {
        function d(a) {
            return a[0] * a[0] + a[1] * a[1]
        }

        function e(a) {
            var b = F.sqrt(d(a));
            a[0] && (a[0] /= b);
            a[1] && (a[1] /= b)
        }
        a.add = function(a, b, d, e, f, g) {
            var h = [
                    [],
                    [],
                    []
                ],
                l = [
                    [this.a, this.c, this.e],
                    [this.b, this.d, this.f],
                    [0, 0, 1]
                ];
            b = [
                [a, d, f],
                [b, e, g],
                [0, 0, 1]
            ];
            a && a instanceof n && (b = [
                [a.a, a.c, a.e],
                [a.b, a.d, a.f],
                [0, 0, 1]
            ]);
            for (a = 0; 3 > a; a++)
                for (d = 0; 3 > d; d++) {
                    for (e = f = 0; 3 > e; e++) f += l[a][e] *
                        b[e][d];
                    h[a][d] = f
                }
            this.a = h[0][0];
            this.b = h[1][0];
            this.c = h[0][1];
            this.d = h[1][1];
            this.e = h[0][2];
            this.f = h[1][2]
        };
        a.invert = function() {
            var a = this.a * this.d - this.b * this.c;
            return new n(this.d / a, -this.b / a, -this.c / a, this.a / a, (this.c * this.f - this.d * this.e) / a, (this.b * this.e - this.a * this.f) / a)
        };
        a.clone = function() {
            return new n(this.a, this.b, this.c, this.d, this.e, this.f)
        };
        a.translate = function(a, b) {
            this.add(1, 0, 0, 1, a, b)
        };
        a.scale = function(a, b, d, e) {
            null == b && (b = a);
            (d || e) && this.add(1, 0, 0, 1, d, e);
            this.add(a, 0, 0, b, 0, 0);
            (d ||
                e) && this.add(1, 0, 0, 1, -d, -e)
        };
        a.rotate = function(a, d, e) {
            a = b.rad(a);
            d = d || 0;
            e = e || 0;
            var f = +F.cos(a).toFixed(9);
            a = +F.sin(a).toFixed(9);
            this.add(f, a, -a, f, d, e);
            this.add(1, 0, 0, 1, -d, -e)
        };
        a.x = function(a, b) {
            return a * this.a + b * this.c + this.e
        };
        a.y = function(a, b) {
            return a * this.b + b * this.d + this.f
        };
        a.get = function(a) {
            return +this[P.fromCharCode(97 + a)].toFixed(4)
        };
        a.toString = function() {
            return b.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1),
                this.get(3), 0, 0
            ].join()
        };
        a.toFilter = function() {
            return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')"
        };
        a.offset = function() {
            return [this.e.toFixed(4), this.f.toFixed(4)]
        };
        a.split = function() {
            var a = {};
            a.dx = this.e;
            a.dy = this.f;
            var f = [
                [this.a, this.c],
                [this.b, this.d]
            ];
            a.scalex = F.sqrt(d(f[0]));
            e(f[0]);
            a.shear = f[0][0] * f[1][0] + f[0][1] * f[1][1];
            f[1] = [f[1][0] - f[0][0] *
                a.shear, f[1][1] - f[0][1] * a.shear
            ];
            a.scaley = F.sqrt(d(f[1]));
            e(f[1]);
            a.shear /= a.scaley;
            var g = -f[0][1],
                f = f[1][1];
            0 > f ? (a.rotate = b.deg(F.acos(f)), 0 > g && (a.rotate = 360 - a.rotate)) : a.rotate = b.deg(F.asin(g));
            a.isSimple = !+a.shear.toFixed(9) && (a.scalex.toFixed(9) == a.scaley.toFixed(9) || !a.rotate);
            a.isSuperSimple = !+a.shear.toFixed(9) && a.scalex.toFixed(9) == a.scaley.toFixed(9) && !a.rotate;
            a.noRotation = !+a.shear.toFixed(9) && !a.rotate;
            return a
        };
        a.toTransformString = function(a) {
            a = a || this[Q]();
            return a.isSimple ? (a.scalex = +a.scalex.toFixed(4), a.scaley = +a.scaley.toFixed(4), a.rotate = +a.rotate.toFixed(4), (a.dx || a.dy ? "t" + [a.dx, a.dy] : "") + (1 != a.scalex || 1 != a.scaley ? "s" + [a.scalex, a.scaley, 0, 0] : "") + (a.rotate ? "r" + [a.rotate, 0, 0] : "")) : "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
        }
    })(n.prototype);
    for (var ob = function() {
            this.returnValue = !1
        }, pb = function() {
            return this.originalEvent.preventDefault()
        }, qb = function() {
            this.cancelBubble = !0
        }, rb = function() {
            return this.originalEvent.stopPropagation()
        }, hb = function(a) {
            return {
                x: a.clientX +
                    (w.doc.documentElement.scrollLeft || w.doc.body.scrollLeft),
                y: a.clientY + (w.doc.documentElement.scrollTop || w.doc.body.scrollTop)
            }
        }, sb = function() {
            if (w.doc.addEventListener) return function(a, b, d, e) {
                var f = function(a) {
                    var b = hb(a);
                    return d.call(e, a, b.x, b.y)
                };
                a.addEventListener(b, f, !1);
                if (O && J[b]) {
                    var g = function(b) {
                        for (var f = hb(b), g = b, h = 0, l = b.targetTouches && b.targetTouches.length; h < l; h++)
                            if (b.targetTouches[h].target == a) {
                                b = b.targetTouches[h];
                                b.originalEvent = g;
                                b.preventDefault = pb;
                                b.stopPropagation = rb;
                                break
                            }
                        return d.call(e,
                            b, f.x, f.y)
                    };
                    a.addEventListener(J[b], g, !1)
                }
                return function() {
                    a.removeEventListener(b, f, !1);
                    O && J[b] && a.removeEventListener(J[b], g, !1);
                    return !0
                }
            };
            if (w.doc.attachEvent) return function(a, b, d, e) {
                var f = function(a) {
                    a = a || w.win.event;
                    var b = a.clientX + (w.doc.documentElement.scrollLeft || w.doc.body.scrollLeft),
                        f = a.clientY + (w.doc.documentElement.scrollTop || w.doc.body.scrollTop);
                    a.preventDefault = a.preventDefault || ob;
                    a.stopPropagation = a.stopPropagation || qb;
                    return d.call(e, a, b, f)
                };
                a.attachEvent("on" + b, f);
                return function() {
                    a.detachEvent("on" +
                        b, f);
                    return !0
                }
            }
        }(), za = [], Va = function(a) {
            for (var b = a.clientX, e = a.clientY, f = w.doc.documentElement.scrollTop || w.doc.body.scrollTop, g = w.doc.documentElement.scrollLeft || w.doc.body.scrollLeft, h, l = za.length; l--;) {
                h = za[l];
                if (O && a.touches)
                    for (var k = a.touches.length, m; k--;) {
                        if (m = a.touches[k], m.identifier == h.el._drag.id) {
                            b = m.clientX;
                            e = m.clientY;
                            (a.originalEvent ? a.originalEvent : a).preventDefault();
                            break
                        }
                    } else a.preventDefault();
                var k = h.el.node,
                    u = k.nextSibling,
                    n = k.parentNode,
                    t = k.style.display;
                w.win.opera && n.removeChild(k);
                k.style.display = "none";
                m = h.el.paper.getElementByPoint(b, e);
                k.style.display = t;
                w.win.opera && (u ? n.insertBefore(k, u) : n.appendChild(k));
                m && d("raphael.drag.over." + h.el.id, h.el, m);
                b += g;
                e += f;
                d("raphael.drag.move." + h.el.id, h.move_scope || h.el, b - h.el._drag.x, e - h.el._drag.y, b, e, a)
            }
        }, Wa = function(a) {
            b.unmousemove(Va).unmouseup(Wa);
            for (var e = za.length, f; e--;) f = za[e], f.el._drag = {}, d("raphael.drag.end." + f.el.id, f.end_scope || f.start_scope || f.move_scope || f.el, a);
            za = []
        }, W = b.el = {}, ib = N.length; ib--;)(function(a) {
        b[a] =
            W[a] = function(d, e) {
                b.is(d, "function") && (this.events = this.events || [], this.events.push({
                    name: a,
                    f: d,
                    unbind: sb(this.shape || this.node || w.doc, a, d, e || this)
                }));
                return this
            };
        b["un" + a] = W["un" + a] = function(d) {
            for (var e = this.events || [], f = e.length; f--;) e[f].name != a || !b.is(d, "undefined") && e[f].f != d || (e[f].unbind(), e.splice(f, 1), !e.length && delete this.events);
            return this
        }
    })(N[ib]);
    W.data = function(a, e) {
        var f = pa[this.id] = pa[this.id] || {};
        if (0 == arguments.length) return f;
        if (1 == arguments.length) {
            if (b.is(a, "object")) {
                for (var g in a) a[z](g) &&
                    this.data(g, a[g]);
                return this
            }
            d("raphael.data.get." + this.id, this, f[a], a);
            return f[a]
        }
        f[a] = e;
        d("raphael.data.set." + this.id, this, e, a);
        return this
    };
    W.removeData = function(a) {
        null == a ? pa[this.id] = {} : pa[this.id] && delete pa[this.id][a];
        return this
    };
    W.getData = function() {
        return f(pa[this.id] || {})
    };
    W.hover = function(a, b, d, e) {
        return this.mouseover(a, d).mouseout(b, e || d)
    };
    W.unhover = function(a, b) {
        return this.unmouseover(a).unmouseout(b)
    };
    var Ja = [];
    W.drag = function(a, e, f, g, h, l) {
        function k(m) {
            (m.originalEvent || m).preventDefault();
            var u = m.clientX,
                n = m.clientY,
                t = w.doc.documentElement.scrollTop || w.doc.body.scrollTop,
                p = w.doc.documentElement.scrollLeft || w.doc.body.scrollLeft;
            this._drag.id = m.identifier;
            if (O && m.touches)
                for (var s = m.touches.length, q; s--;)
                    if (q = m.touches[s], this._drag.id = q.identifier, q.identifier == this._drag.id) {
                        u = q.clientX;
                        n = q.clientY;
                        break
                    }
            this._drag.x = u + p;
            this._drag.y = n + t;
            !za.length && b.mousemove(Va).mouseup(Wa);
            za.push({
                el: this,
                move_scope: g,
                start_scope: h,
                end_scope: l
            });
            e && d.on("raphael.drag.start." + this.id, e);
            a && d.on("raphael.drag.move." +
                this.id, a);
            f && d.on("raphael.drag.end." + this.id, f);
            d("raphael.drag.start." + this.id, h || g || this, m.clientX + p, m.clientY + t, m)
        }
        this._drag = {};
        Ja.push({
            el: this,
            start: k
        });
        this.mousedown(k);
        return this
    };
    W.onDragOver = function(a) {
        a ? d.on("raphael.drag.over." + this.id, a) : d.unbind("raphael.drag.over." + this.id)
    };
    W.undrag = function() {
        for (var a = Ja.length; a--;) Ja[a].el == this && (this.unmousedown(Ja[a].start), Ja.splice(a, 1), d.unbind("raphael.drag.*." + this.id));
        !Ja.length && b.unmousemove(Va).unmouseup(Wa);
        za = []
    };
    E.circle = function(a,
        d, e) {
        a = b._engine.circle(this, a || 0, d || 0, e || 0);
        this.__set__ && this.__set__.push(a);
        return a
    };
    E.rect = function(a, d, e, f, g) {
        a = b._engine.rect(this, a || 0, d || 0, e || 0, f || 0, g || 0);
        this.__set__ && this.__set__.push(a);
        return a
    };
    E.ellipse = function(a, d, e, f) {
        a = b._engine.ellipse(this, a || 0, d || 0, e || 0, f || 0);
        this.__set__ && this.__set__.push(a);
        return a
    };
    E.path = function(a) {
        a && !b.is(a, "string") && !b.is(a[0], Y) && (a += "");
        var d = b._engine.path(b.format[G](b, arguments), this);
        this.__set__ && this.__set__.push(d);
        return d
    };
    E.image = function(a,
        d, e, f, g) {
        a = b._engine.image(this, a || "about:blank", d || 0, e || 0, f || 0, g || 0);
        this.__set__ && this.__set__.push(a);
        return a
    };
    E.text = function(a, d, e) {
        a = b._engine.text(this, a || 0, d || 0, P(e));
        this.__set__ && this.__set__.push(a);
        return a
    };
    E.set = function(a) {
        !b.is(a, "array") && (a = Array.prototype.splice.call(arguments, 0, arguments.length));
        var d = new Pa(a);
        this.__set__ && this.__set__.push(d);
        d.paper = this;
        d.type = "set";
        return d
    };
    E.setStart = function(a) {
        this.__set__ = a || this.set()
    };
    E.setFinish = function(a) {
        a = this.__set__;
        delete this.__set__;
        return a
    };
    E.getSize = function() {
        var a = this.canvas.parentNode;
        return {
            width: a.offsetWidth,
            height: a.offsetHeight
        }
    };
    E.setSize = function(a, d) {
        return b._engine.setSize.call(this, a, d)
    };
    E.setViewBox = function(a, d, e, f, g) {
        return b._engine.setViewBox.call(this, a, d, e, f, g)
    };
    E.top = E.bottom = null;
    E.raphael = b;
    E.getElementByPoint = function(a, b) {
        var d, e, f = this.canvas,
            g = w.doc.elementFromPoint(a, b);
        if (w.win.opera && "svg" == g.tagName) {
            e = f.getBoundingClientRect();
            d = f.ownerDocument;
            var h = d.body,
                l = d.documentElement;
            d = e.top + (w.win.pageYOffset ||
                l.scrollTop || h.scrollTop) - (l.clientTop || h.clientTop || 0);
            e = e.left + (w.win.pageXOffset || l.scrollLeft || h.scrollLeft) - (l.clientLeft || h.clientLeft || 0);
            h = f.createSVGRect();
            h.x = a - e;
            h.y = b - d;
            h.width = h.height = 1;
            d = f.getIntersectionList(h, null);
            d.length && (g = d[d.length - 1])
        }
        if (!g) return null;
        for (; g.parentNode && g != f.parentNode && !g.raphael;) g = g.parentNode;
        g == this.canvas.parentNode && (g = f);
        return g = g && g.raphael ? this.getById(g.raphaelid) : null
    };
    E.getElementsByBBox = function(a) {
        var d = this.set();
        this.forEach(function(e) {
            b.isBBoxIntersect(e.getBBox(),
                a) && d.push(e)
        });
        return d
    };
    E.getById = function(a) {
        for (var b = this.bottom; b;) {
            if (b.id == a) return b;
            b = b.next
        }
        return null
    };
    E.forEach = function(a, b) {
        for (var d = this.bottom; d && !1 !== a.call(b, d);) d = d.next;
        return this
    };
    E.getElementsByPoint = function(a, b) {
        var d = this.set();
        this.forEach(function(e) {
            e.isPointInside(a, b) && d.push(e)
        });
        return d
    };
    W.isPointInside = function(a, d) {
        var e = this.realPath = ia[this.type](this);
        this.attr("transform") && this.attr("transform").length && (e = b.transformPath(e, this.attr("transform")));
        return b.isPointInsidePath(e,
            a, d)
    };
    W.getBBox = function(a) {
        if (this.removed) return {};
        var b = this._;
        if (a) {
            if (b.dirty || !b.bboxwt) this.realPath = ia[this.type](this), b.bboxwt = ya(this.realPath), b.bboxwt.toString = p, b.dirty = 0;
            return b.bboxwt
        }
        if (b.dirty || b.dirtyT || !b.bbox) {
            if (b.dirty || !this.realPath) b.bboxwt = 0, this.realPath = ia[this.type](this);
            b.bbox = ya(ua(this.realPath, this.matrix));
            b.bbox.toString = p;
            b.dirty = b.dirtyT = 0
        }
        return b.bbox
    };
    W.clone = function() {
        if (this.removed) return null;
        var a = this.paper[this.type]().attr(this.attr());
        this.__set__ &&
            this.__set__.push(a);
        return a
    };
    W.glow = function(a) {
        if ("text" == this.type) return null;
        a = a || {};
        var b = (a.width || 10) + (+this.attr("stroke-width") || 1),
            d = a.fill || !1,
            e = a.opacity || 0.5,
            f = a.offsetx || 0,
            g = a.offsety || 0;
        a = a.color || "#000";
        for (var h = b / 2, l = this.paper, k = l.set(), m = this.realPath || ia[this.type](this), m = this.matrix ? ua(m, this.matrix) : m, u = 1; u < h + 1; u++) k.push(l.path(m).attr({
            stroke: a,
            fill: d ? a : "none",
            "stroke-linejoin": "round",
            "stroke-linecap": "round",
            "stroke-width": +(b / h * u).toFixed(3),
            opacity: +(e / h).toFixed(3)
        }));
        return k.insertBefore(this).translate(f, g)
    };
    var Xa = function(a, d, e, f, g, k, m, u, n) {
            return null == n ? l(a, d, e, f, g, k, m, u) : b.findDotsAtSegment(a, d, e, f, g, k, m, u, h(a, d, e, f, g, k, m, u, n))
        },
        Ya = function(a, d) {
            return function(e, f, g) {
                e = La(e);
                for (var h, l, k, m, u = "", n = {}, t = 0, p = 0, s = e.length; p < s; p++) {
                    k = e[p];
                    if ("M" == k[0]) h = +k[1], l = +k[2];
                    else {
                        m = Xa(h, l, k[1], k[2], k[3], k[4], k[5], k[6]);
                        if (t + m > f) {
                            if (d && !n.start) {
                                h = Xa(h, l, k[1], k[2], k[3], k[4], k[5], k[6], f - t);
                                u += ["C" + h.start.x, h.start.y, h.m.x, h.m.y, h.x, h.y];
                                if (g) return u;
                                n.start = u;
                                u = ["M" +
                                    h.x, h.y + "C" + h.n.x, h.n.y, h.end.x, h.end.y, k[5], k[6]
                                ].join();
                                t += m;
                                h = +k[5];
                                l = +k[6];
                                continue
                            }
                            if (!a && !d) return h = Xa(h, l, k[1], k[2], k[3], k[4], k[5], k[6], f - t), {
                                x: h.x,
                                y: h.y,
                                alpha: h.alpha
                            }
                        }
                        t += m;
                        h = +k[5];
                        l = +k[6]
                    }
                    u += k.shift() + k
                }
                n.end = u;
                h = a ? t : d ? n : b.findDotsAtSegment(h, l, k[0], k[1], k[2], k[3], k[4], k[5], 1);
                h.alpha && (h = {
                    x: h.x,
                    y: h.y,
                    alpha: h.alpha
                });
                return h
            }
        },
        jb = Ya(1),
        kb = Ya(),
        Za = Ya(0, 1);
    b.getTotalLength = jb;
    b.getPointAtLength = kb;
    b.getSubpath = function(a, b, d) {
        if (1E-6 > this.getTotalLength(a) - d) return Za(a, b).end;
        a = Za(a, d, 1);
        return b ? Za(a, b).end : a
    };
    W.getTotalLength = function() {
        var a = this.getPath();
        if (a) return this.node.getTotalLength ? this.node.getTotalLength() : jb(a)
    };
    W.getPointAtLength = function(a) {
        var b = this.getPath();
        if (b) return kb(b, a)
    };
    W.getPath = function() {
        var a, d = b._getPath[this.type];
        if ("text" != this.type && "set" != this.type) return d && (a = d(this)), a
    };
    W.getSubpath = function(a, d) {
        var e = this.getPath();
        if (e) return b.getSubpath(e, a, d)
    };
    var ka = b.easing_formulas = {
        linear: function(a) {
            return a
        },
        "<": function(a) {
            return Z(a, 1.7)
        },
        ">": function(a) {
            return Z(a, 0.48)
        },
        "<>": function(a) {
            var b = 0.48 - a / 1.04,
                d = F.sqrt(0.1734 + b * b);
            a = d - b;
            a = Z(X(a), 1 / 3) * (0 > a ? -1 : 1);
            b = -d - b;
            b = Z(X(b), 1 / 3) * (0 > b ? -1 : 1);
            a = a + b + 0.5;
            return 3 * (1 - a) * a * a + a * a * a
        },
        backIn: function(a) {
            return a * a * (2.70158 * a - 1.70158)
        },
        backOut: function(a) {
            a -= 1;
            return a * a * (2.70158 * a + 1.70158) + 1
        },
        elastic: function(a) {
            return a == !!a ? a : Z(2, -10 * a) * F.sin(2 * (a - 0.075) * I / 0.3) + 1
        },
        bounce: function(a) {
            a < 1 / 2.75 ? a *= 7.5625 * a : a < 2 / 2.75 ? (a -= 1.5 / 2.75, a = 7.5625 * a * a + 0.75) : a < 2.5 / 2.75 ? (a -= 2.25 / 2.75, a = 7.5625 * a * a + 0.9375) :
                (a -= 2.625 / 2.75, a = 7.5625 * a * a + 0.984375);
            return a
        }
    };
    ka.easeIn = ka["ease-in"] = ka["<"];
    ka.easeOut = ka["ease-out"] = ka[">"];
    ka.easeInOut = ka["ease-in-out"] = ka["<>"];
    ka["back-in"] = ka.backIn;
    ka["back-out"] = ka.backOut;
    var T = [],
        cb = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame || function(a) {
            setTimeout(a, 16)
        },
        Ua = function() {
            for (var a = +new Date, e = 0; e < T.length; e++) {
                var f = T[e];
                if (!f.el.removed && !f.paused) {
                    var g = a - f.start,
                        h = f.ms,
                        k = f.easing,
                        l = f.from,
                        m = f.diff,
                        u = f.to,
                        n = f.el,
                        t = {},
                        p, s = {},
                        q;
                    f.initstatus ? (g = (f.initstatus * f.anim.top - f.prev) / (f.percent - f.prev) * h, f.status = f.initstatus, delete f.initstatus, f.stop && T.splice(e--, 1)) : f.status = (f.prev + (f.percent - f.prev) * (g / h)) / f.anim.top;
                    if (!(0 > g))
                        if (g < h) {
                            var C = k(g / h),
                                w;
                            for (w in l)
                                if (l[z](w)) {
                                    switch (sa[w]) {
                                        case U:
                                            p = +l[w] + C * h * m[w];
                                            break;
                                        case "colour":
                                            p = "rgb(" + [$a(S(l[w].r + C * h * m[w].r)), $a(S(l[w].g + C * h * m[w].g)), $a(S(l[w].b + C * h * m[w].b))].join() + ")";
                                            break;
                                        case "path":
                                            p = [];
                                            g = 0;
                                            for (k = l[w].length; g <
                                                k; g++) {
                                                p[g] = [l[w][g][0]];
                                                u = 1;
                                                for (s = l[w][g].length; u < s; u++) p[g][u] = +l[w][g][u] + C * h * m[w][g][u];
                                                p[g] = p[g].join(M)
                                            }
                                            p = p.join(M);
                                            break;
                                        case "transform":
                                            if (m[w].real)
                                                for (p = [], g = 0, k = l[w].length; g < k; g++)
                                                    for (p[g] = [l[w][g][0]], u = 1, s = l[w][g].length; u < s; u++) p[g][u] = l[w][g][u] + C * h * m[w][g][u];
                                            else p = function(a) {
                                                return +l[w][a] + C * h * m[w][a]
                                            }, p = [
                                                ["m", p(0), p(1), p(2), p(3), p(4), p(5)]
                                            ];
                                            break;
                                        case "csv":
                                            if ("clip-rect" == w)
                                                for (p = [], g = 4; g--;) p[g] = +l[w][g] + C * h * m[w][g];
                                            break;
                                        default:
                                            for (k = [][H](l[w]), p = [], g = n.paper.customAttributes[w].length; g--;) p[g] = +k[g] + C * h * m[w][g]
                                    }
                                    t[w] = p
                                }
                            n.attr(t);
                            (function(a, b, e) {
                                setTimeout(function() {
                                    d("raphael.anim.frame." + a, b, e)
                                })
                            })(n.id, n, f.anim)
                        } else {
                            (function(a, e, f) {
                                setTimeout(function() {
                                    d("raphael.anim.frame." + e.id, e, f);
                                    d("raphael.anim.finish." + e.id, e, f);
                                    b.is(a, "function") && a.call(e)
                                })
                            })(f.callback, n, f.anim);
                            n.attr(u);
                            T.splice(e--, 1);
                            if (1 < f.repeat && !f.next) {
                                for (q in u) u[z](q) && (s[q] = f.totalOrigin[q]);
                                f.el.attr(s);
                                v(f.anim, f.el, f.anim.percents[0], null, f.totalOrigin, f.repeat - 1)
                            }
                            f.next && !f.stop && v(f.anim, f.el, f.next,
                                null, f.totalOrigin, f.repeat)
                        }
                }
            }
            T.length && cb(Ua)
        },
        $a = function(a) {
            return 255 < a ? 255 : 0 > a ? 0 : a
        };
    W.animateWith = function(a, d, e, f, g, h) {
        if (this.removed) return h && h.call(this), this;
        e = e instanceof q ? e : b.animation(e, f, g, h);
        v(e, this, e.percents[0], null, this.attr());
        e = 0;
        for (f = T.length; e < f; e++)
            if (T[e].anim == d && T[e].el == a) {
                T[f - 1].start = T[e].start;
                break
            }
        return this
    };
    W.onAnimation = function(a) {
        a ? d.on("raphael.anim.frame." + this.id, a) : d.unbind("raphael.anim.frame." + this.id);
        return this
    };
    q.prototype.delay = function(a) {
        var b =
            new q(this.anim, this.ms);
        b.times = this.times;
        b.del = +a || 0;
        return b
    };
    q.prototype.repeat = function(a) {
        var b = new q(this.anim, this.ms);
        b.del = this.del;
        b.times = F.floor(L(a, 0)) || 1;
        return b
    };
    b.animation = function(a, d, e, f) {
        if (a instanceof q) return a;
        if (b.is(e, "function") || !e) f = f || e || null, e = null;
        a = Object(a);
        d = +d || 0;
        var g = {},
            h, k;
        for (k in a) a[z](k) && R(k) != k && R(k) + "%" != k && (h = !0, g[k] = a[k]);
        if (h) return e && (g.easing = e), f && (g.callback = f), new q({
            100: g
        }, d);
        if (f) {
            e = 0;
            for (var l in a) g = da(l), a[z](l) && g > e && (e = g);
            e += "%";
            !a[e].callback &&
                (a[e].callback = f)
        }
        return new q(a, d)
    };
    W.animate = function(a, d, e, f) {
        if (this.removed) return f && f.call(this), this;
        a = a instanceof q ? a : b.animation(a, d, e, f);
        v(a, this, a.percents[0], null, this.attr());
        return this
    };
    W.setTime = function(a, b) {
        a && null != b && this.status(a, V(b, a.ms) / a.ms);
        return this
    };
    W.status = function(a, b) {
        var d = [],
            e = 0,
            f, g;
        if (null != b) return v(a, this, -1, V(b, 1)), this;
        for (f = T.length; e < f; e++)
            if (g = T[e], g.el.id == this.id && (!a || g.anim == a)) {
                if (a) return g.status;
                d.push({
                    anim: g.anim,
                    status: g.status
                })
            }
        return a ?
            0 : d
    };
    W.pause = function(a) {
        for (var b = 0; b < T.length; b++) T[b].el.id != this.id || a && T[b].anim != a || !1 === d("raphael.anim.pause." + this.id, this, T[b].anim) || (T[b].paused = !0);
        return this
    };
    W.resume = function(a) {
        for (var b = 0; b < T.length; b++)
            if (T[b].el.id == this.id && (!a || T[b].anim == a)) {
                var e = T[b];
                !1 !== d("raphael.anim.resume." + this.id, this, e.anim) && (delete e.paused, this.status(e.anim, e.status))
            }
        return this
    };
    W.stop = function(a) {
        for (var b = 0; b < T.length; b++) T[b].el.id != this.id || a && T[b].anim != a || !1 !== d("raphael.anim.stop." +
            this.id, this, T[b].anim) && T.splice(b--, 1);
        return this
    };
    d.on("raphael.remove", x);
    d.on("raphael.clear", x);
    W.toString = function() {
        return "Rapha\u00ebl\u2019s object"
    };
    var Pa = function(a) {
            this.items = [];
            this.length = 0;
            this.type = "set";
            if (a)
                for (var b = 0, d = a.length; b < d; b++) !a[b] || a[b].constructor != W.constructor && a[b].constructor != Pa || (this[this.items.length] = this.items[this.items.length] = a[b], this.length++)
        },
        ca = Pa.prototype;
    ca.push = function() {
        for (var a, b, d = 0, e = arguments.length; d < e; d++) !(a = arguments[d]) || a.constructor !=
            W.constructor && a.constructor != Pa || (b = this.items.length, this[b] = this.items[b] = a, this.length++);
        return this
    };
    ca.pop = function() {
        this.length && delete this[this.length--];
        return this.items.pop()
    };
    ca.forEach = function(a, b) {
        for (var d = 0, e = this.items.length; d < e && !1 !== a.call(b, this.items[d], d); d++);
        return this
    };
    for (var ab in W) W[z](ab) && (ca[ab] = function(a) {
        return function() {
            var b = arguments;
            return this.forEach(function(d) {
                d[a][G](d, b)
            })
        }
    }(ab));
    ca.attr = function(a, d) {
        if (a && b.is(a, Y) && b.is(a[0], "object"))
            for (var e =
                    0, f = a.length; e < f; e++) this.items[e].attr(a[e]);
        else
            for (e = 0, f = this.items.length; e < f; e++) this.items[e].attr(a, d);
        return this
    };
    ca.clear = function() {
        for (; this.length;) this.pop()
    };
    ca.splice = function(a, b, d) {
        a = 0 > a ? L(this.length + a, 0) : a;
        b = L(0, V(this.length - a, b));
        var e = [],
            f = [],
            g = [],
            h;
        for (h = 2; h < arguments.length; h++) g.push(arguments[h]);
        for (h = 0; h < b; h++) f.push(this[a + h]);
        for (; h < this.length - a; h++) e.push(this[a + h]);
        var k = g.length;
        for (h = 0; h < k + e.length; h++) this.items[a + h] = this[a + h] = h < k ? g[h] : e[h - k];
        for (h = this.items.length =
            this.length -= b - k; this[h];) delete this[h++];
        return new Pa(f)
    };
    ca.exclude = function(a) {
        for (var b = 0, d = this.length; b < d; b++)
            if (this[b] == a) return this.splice(b, 1), !0
    };
    ca.animate = function(a, d, e, f) {
        !b.is(e, "function") && e || (f = e || null);
        var g = this.items.length,
            h = g,
            k = this,
            l;
        if (!g) return this;
        f && (l = function() {
            !--g && f.call(k)
        });
        e = b.is(e, "string") ? e : l;
        d = b.animation(a, d, e, l);
        for (a = this.items[--h].animate(d); h--;) this.items[h] && !this.items[h].removed && this.items[h].animateWith(a, d, d), this.items[h] && !this.items[h].removed ||
            g--;
        return this
    };
    ca.insertAfter = function(a) {
        for (var b = this.items.length; b--;) this.items[b].insertAfter(a);
        return this
    };
    ca.getBBox = function() {
        for (var a = [], b = [], d = [], e = [], f = this.items.length; f--;)
            if (!this.items[f].removed) {
                var g = this.items[f].getBBox();
                a.push(g.x);
                b.push(g.y);
                d.push(g.x + g.width);
                e.push(g.y + g.height)
            }
        a = V[G](0, a);
        b = V[G](0, b);
        d = L[G](0, d);
        e = L[G](0, e);
        return {
            x: a,
            y: b,
            x2: d,
            y2: e,
            width: d - a,
            height: e - b
        }
    };
    ca.clone = function(a) {
        a = this.paper.set();
        for (var b = 0, d = this.items.length; b < d; b++) a.push(this.items[b].clone());
        return a
    };
    ca.toString = function() {
        return "Rapha\u00ebl\u2018s set"
    };
    ca.glow = function(a) {
        var b = this.paper.set();
        this.forEach(function(d, e) {
            var f = d.glow(a);
            null != f && f.forEach(function(a, d) {
                b.push(a)
            })
        });
        return b
    };
    ca.isPointInside = function(a, b) {
        var d = !1;
        this.forEach(function(e) {
            if (e.isPointInside(a, b)) return d = !0, !1
        });
        return d
    };
    b.registerFont = function(a) {
        if (!a.face) return a;
        this.fonts = this.fonts || {};
        var b = {
                w: a.w,
                face: {},
                glyphs: {}
            },
            d = a.face["font-family"],
            e;
        for (e in a.face) a.face[z](e) && (b.face[e] = a.face[e]);
        this.fonts[d] ? this.fonts[d].push(b) : this.fonts[d] = [b];
        if (!a.svg) {
            b.face["units-per-em"] = da(a.face["units-per-em"], 10);
            for (var f in a.glyphs)
                if (a.glyphs[z](f) && (d = a.glyphs[f], b.glyphs[f] = {
                        w: d.w,
                        k: {},
                        d: d.d && "M" + d.d.replace(/[mlcxtrv]/g, function(a) {
                            return {
                                l: "L",
                                c: "C",
                                x: "z",
                                t: "m",
                                r: "l",
                                v: "c"
                            }[a] || "M"
                        }) + "z"
                    }, d.k))
                    for (var g in d.k) d[z](g) && (b.glyphs[f].k[g] = d.k[g])
        }
        return a
    };
    E.getFont = function(a, d, e, f) {
        f = f || "normal";
        e = e || "normal";
        d = +d || {
            normal: 400,
            bold: 700,
            lighter: 300,
            bolder: 800
        }[d] || 400;
        if (b.fonts) {
            var g =
                b.fonts[a];
            if (!g) {
                a = RegExp("(^|\\s)" + a.replace(/[^\w\d\s+!~.:_-]/g, "") + "(\\s|$)", "i");
                for (var h in b.fonts)
                    if (b.fonts[z](h) && a.test(h)) {
                        g = b.fonts[h];
                        break
                    }
            }
            var k;
            if (g)
                for (h = 0, a = g.length; h < a && (k = g[h], k.face["font-weight"] != d || k.face["font-style"] != e && k.face["font-style"] || k.face["font-stretch"] != f); h++);
            return k
        }
    };
    E.print = function(a, d, e, f, g, h, k, l) {
        h = h || "middle";
        k = L(V(k || 0, 1), -1);
        l = L(V(l || 1, 3), 1);
        e = P(e)[Q]("");
        var m = 0,
            u = 0,
            n = "";
        b.is(f, "string") && (f = this.getFont(f));
        if (f) {
            g = (g || 16) / f.face["units-per-em"];
            var t = f.face.bbox[Q](B),
                p = +t[0],
                s = t[3] - t[1],
                q = 0;
            h = +t[1] + ("baseline" == h ? s + +f.face.descent : s / 2);
            for (var t = 0, v = e.length; t < v; t++) {
                if ("\n" == e[t]) u = w = m = 0, q += s * l;
                else var C = u && f.glyphs[e[t - 1]] || {},
                    w = f.glyphs[e[t]],
                    m = m + (u ? (C.w || f.w) + (C.k && C.k[e[t]] || 0) + f.w * k : 0),
                    u = 1;
                w && w.d && (n += b.transformPath(w.d, ["t", m * g, q * g, "s", g, g, p, h, "t", (a - p) / g, (d - h) / g]))
            }
        }
        return this.path(n).attr({
            fill: "#000",
            stroke: "none"
        })
    };
    E.add = function(a) {
        if (b.is(a, "array"))
            for (var d = this.set(), e = 0, f = a.length, g; e < f; e++) g = a[e] || {}, D[z](g.type) &&
                d.push(this[g.type]().attr(g));
        return d
    };
    b.format = function(a, d) {
        var e = b.is(d, Y) ? [0][H](d) : arguments;
        a && b.is(a, "string") && e.length - 1 && (a = a.replace(y, function(a, b) {
            return null == e[++b] ? "" : e[b]
        }));
        return a || ""
    };
    b.fullfill = function() {
        var a = /\{([^\}]+)\}/g,
            b = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
            d = function(a, d, e) {
                var f = e;
                d.replace(b, function(a, b, d, e, g) {
                    b = b || e;
                    f && (b in f && (f = f[b]), "function" == typeof f && g && (f = f()))
                });
                return f = (null == f || f == e ? a : f) + ""
            };
        return function(b, e) {
            return String(b).replace(a,
                function(a, b) {
                    return d(a, b, e)
                })
        }
    }();
    b.ninja = function() {
        t ? w.win.Raphael = u : delete Raphael;
        return b
    };
    b.st = ca;
    d.on("raphael.DOMload", function() {
        A = !0
    });
    (function(a, d, e) {
        function f() {
            /in/.test(a.readyState) ? setTimeout(f, 9) : b.eve("raphael.DOMload")
        }
        null == a.readyState && a.addEventListener && (a.addEventListener(d, e = function() {
            a.removeEventListener(d, e, !1);
            a.readyState = "complete"
        }, !1), a.readyState = "loading");
        f()
    })(document, "DOMContentLoaded");
    (function() {
        if (b.svg) {
            var a = String,
                d = parseFloat,
                e = parseInt,
                f = Math,
                g = f.max,
                h = f.abs,
                k = f.pow,
                l = /[, ]+/,
                m = b.eve,
                u = {
                    block: "M5,0 0,2.5 5,5z",
                    classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
                    diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
                    open: "M6,1 1,3.5 6,6",
                    oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
                },
                n = {};
            b.toString = function() {
                return "Your browser supports SVG.\nYou are running Rapha\u00ebl " + this.version
            };
            var t = function(d, e) {
                    if (e) {
                        "string" == typeof d && (d = t(d));
                        for (var f in e) e.hasOwnProperty(f) && ("xlink:" == f.substring(0, 6) ? d.setAttributeNS("http://www.w3.org/1999/xlink", f.substring(6),
                            a(e[f])) : d.setAttribute(f, a(e[f])))
                    } else d = b._g.doc.createElementNS("http://www.w3.org/2000/svg", d), d.style && (d.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
                    return d
                },
                p = function(e, l) {
                    var m = "linear",
                        u = e.id + l,
                        n = 0.5,
                        p = 0.5,
                        s = e.node,
                        q = e.paper,
                        v = s.style,
                        C = b._g.doc.getElementById(u);
                    if (!C) {
                        l = a(l).replace(b._radial_gradient, function(a, b, e) {
                            m = "radial";
                            b && e && (n = d(b), p = d(e), a = 2 * (0.5 < p) - 1, 0.25 < k(n - 0.5, 2) + k(p - 0.5, 2) && (p = f.sqrt(0.25 - k(n - 0.5, 2)) * a + 0.5) && 0.5 != p && (p = p.toFixed(5) - 1E-5 * a));
                            return ""
                        });
                        l = l.split(/\s*\-\s*/);
                        if ("linear" == m) {
                            C = l.shift();
                            C = -d(C);
                            if (isNaN(C)) return null;
                            var w = [0, 0, f.cos(b.rad(C)), f.sin(b.rad(C))],
                                C = 1 / (g(h(w[2]), h(w[3])) || 1);
                            w[2] *= C;
                            w[3] *= C;
                            0 > w[2] && (w[0] = -w[2], w[2] = 0);
                            0 > w[3] && (w[1] = -w[3], w[3] = 0)
                        }
                        var y = b._parseDots(l);
                        if (!y) return null;
                        u = u.replace(/[\(\)\s,\xb0#]/g, "_");
                        e.gradient && u != e.gradient.id && (q.defs.removeChild(e.gradient), delete e.gradient);
                        if (!e.gradient)
                            for (C = t(m + "Gradient", {
                                    id: u
                                }), e.gradient = C, t(C, "radial" == m ? {
                                    fx: n,
                                    fy: p
                                } : {
                                    x1: w[0],
                                    y1: w[1],
                                    x2: w[2],
                                    y2: w[3],
                                    gradientTransform: e.matrix.invert()
                                }),
                                q.defs.appendChild(C), q = 0, w = y.length; q < w; q++) C.appendChild(t("stop", {
                                offset: y[q].offset ? y[q].offset : q ? "100%" : "0%",
                                "stop-color": y[q].color || "#fff"
                            }))
                    }
                    t(s, {
                        fill: "url('" + document.location + "#" + u + "')",
                        opacity: 1,
                        "fill-opacity": 1
                    });
                    v.fill = "";
                    v.opacity = 1;
                    return v.fillOpacity = 1
                },
                s = function(a) {
                    var b = a.getBBox(1);
                    t(a.pattern, {
                        patternTransform: a.matrix.invert() + " translate(" + b.x + "," + b.y + ")"
                    })
                },
                q = function(d, e, f) {
                    if ("path" == d.type) {
                        for (var g = a(e).toLowerCase().split("-"), h = d.paper, k = f ? "end" : "start", l = d.node, m =
                                d.attrs, p = m["stroke-width"], s = g.length, q = "classic", C, v, w = 3, y = 3, E = 5; s--;) switch (g[s]) {
                            case "block":
                            case "classic":
                            case "oval":
                            case "diamond":
                            case "open":
                            case "none":
                                q = g[s];
                                break;
                            case "wide":
                                y = 5;
                                break;
                            case "narrow":
                                y = 2;
                                break;
                            case "long":
                                w = 5;
                                break;
                            case "short":
                                w = 2
                        }
                        "open" == q ? (w += 2, y += 2, E += 2, C = 1, v = f ? 4 : 1, g = {
                            fill: "none",
                            stroke: m.stroke
                        }) : (v = C = w / 2, g = {
                            fill: m.stroke,
                            stroke: "none"
                        });
                        d._.arrows ? f ? (d._.arrows.endPath && n[d._.arrows.endPath]--, d._.arrows.endMarker && n[d._.arrows.endMarker]--) : (d._.arrows.startPath &&
                            n[d._.arrows.startPath]--, d._.arrows.startMarker && n[d._.arrows.startMarker]--) : d._.arrows = {};
                        if ("none" != q) {
                            var s = "raphael-marker-" + q,
                                B = "raphael-marker-" + k + q + w + y + "-obj" + d.id;
                            b._g.doc.getElementById(s) ? n[s]++ : (h.defs.appendChild(t(t("path"), {
                                "stroke-linecap": "round",
                                d: u[q],
                                id: s
                            })), n[s] = 1);
                            var G = b._g.doc.getElementById(B);
                            G ? (n[B]++, w = G.getElementsByTagName("use")[0]) : (G = t(t("marker"), {
                                id: B,
                                markerHeight: y,
                                markerWidth: w,
                                orient: "auto",
                                refX: v,
                                refY: y / 2
                            }), w = t(t("use"), {
                                "xlink:href": "#" + s,
                                transform: (f ? "rotate(180 " +
                                    w / 2 + " " + y / 2 + ") " : "") + "scale(" + w / E + "," + y / E + ")",
                                "stroke-width": (1 / ((w / E + y / E) / 2)).toFixed(4)
                            }), G.appendChild(w), h.defs.appendChild(G), n[B] = 1);
                            t(w, g);
                            h = C * ("diamond" != q && "oval" != q);
                            f ? (f = d._.arrows.startdx * p || 0, p = b.getTotalLength(m.path) - h * p) : (f = h * p, p = b.getTotalLength(m.path) - (d._.arrows.enddx * p || 0));
                            g = {};
                            g["marker-" + k] = "url(#" + ("undefined" == B ? null : B) + ")";
                            if (p || f) g.d = b.getSubpath(m.path, f, p);
                            t(l, g);
                            d._.arrows[k + "Path"] = s;
                            d._.arrows[k + "Marker"] = B;
                            d._.arrows[k + "dx"] = h;
                            d._.arrows[k + "Type"] = q;
                            d._.arrows[k +
                                "String"] = e
                        } else f ? (f = d._.arrows.startdx * p || 0, p = b.getTotalLength(m.path) - f) : (f = 0, p = b.getTotalLength(m.path) - (d._.arrows.enddx * p || 0)), d._.arrows[k + "Path"] && t(l, {
                            d: b.getSubpath(m.path, f, p)
                        }), delete d._.arrows[k + "Path"], delete d._.arrows[k + "Marker"], delete d._.arrows[k + "dx"], delete d._.arrows[k + "Type"], delete d._.arrows[k + "String"];
                        for (g in n) n.hasOwnProperty(g) && !n[g] && (d = b._g.doc.getElementById(g)) && d.parentNode.removeChild(d)
                    }
                },
                v = {
                    "-": [3, 1],
                    ".": [1, 1],
                    "-.": [3, 1, 1, 1],
                    "-..": [3, 1, 1, 1, 1, 1],
                    ". ": [1, 3],
                    "- ": [4, 3],
                    "--": [8, 3],
                    "- .": [4, 3, 1, 3],
                    "--.": [8, 3, 1, 3],
                    "--..": [8, 3, 1, 3, 1, 3]
                },
                C = function(b, d, e) {
                    if (d = v[a(d).toLowerCase()]) {
                        var f = b.attrs["stroke-width"] || "1";
                        e = {
                            round: f,
                            square: f,
                            butt: 0
                        }[b.attrs["stroke-linecap"] || e["stroke-linecap"]] || 0;
                        for (var g = [], h = d.length; h--;) g[h] = d[h] * f + (h % 2 ? 1 : -1) * e;
                        t(b.node, {
                            "stroke-dasharray": g.join(",")
                        })
                    } else t(b.node, {
                        "stroke-dasharray": "none"
                    })
                },
                w = function(d, f) {
                    var k = d.node,
                        m = d.attrs,
                        u = k.style.visibility;
                    k.style.visibility = "hidden";
                    for (var n in f)
                        if (f.hasOwnProperty(n) &&
                            b._availableAttrs.hasOwnProperty(n)) {
                            var v = f[n];
                            m[n] = v;
                            switch (n) {
                                case "blur":
                                    d.blur(v);
                                    break;
                                case "title":
                                    var w = k.getElementsByTagName("title");
                                    w.length && (w = w[0]) ? w.firstChild.nodeValue = v : (w = t("title"), v = b._g.doc.createTextNode(v), w.appendChild(v), k.appendChild(w));
                                    break;
                                case "href":
                                case "target":
                                    w = k.parentNode;
                                    if ("a" != w.tagName.toLowerCase()) {
                                        var E = t("a");
                                        w.insertBefore(E, k);
                                        E.appendChild(k);
                                        w = E
                                    }
                                    "target" == n ? w.setAttributeNS("http://www.w3.org/1999/xlink", "show", "blank" == v ? "new" : v) : w.setAttributeNS("http://www.w3.org/1999/xlink",
                                        n, v);
                                    break;
                                case "cursor":
                                    k.style.cursor = v;
                                    break;
                                case "transform":
                                    d.transform(v);
                                    break;
                                case "arrow-start":
                                    q(d, v);
                                    break;
                                case "arrow-end":
                                    q(d, v, 1);
                                    break;
                                case "clip-rect":
                                    w = a(v).split(l);
                                    if (4 == w.length) {
                                        d.clip && d.clip.parentNode.parentNode.removeChild(d.clip.parentNode);
                                        var E = t("clipPath"),
                                            B = t("rect");
                                        E.id = b.createUUID();
                                        t(B, {
                                            x: w[0],
                                            y: w[1],
                                            width: w[2],
                                            height: w[3]
                                        });
                                        E.appendChild(B);
                                        d.paper.defs.appendChild(E);
                                        t(k, {
                                            "clip-path": "url(#" + E.id + ")"
                                        });
                                        d.clip = B
                                    }!v && (v = k.getAttribute("clip-path")) && ((v = b._g.doc.getElementById(v.replace(/(^url\(#|\)$)/g,
                                        ""))) && v.parentNode.removeChild(v), t(k, {
                                        "clip-path": ""
                                    }), delete d.clip);
                                    break;
                                case "path":
                                    "path" == d.type && (t(k, {
                                        d: v ? m.path = b._pathToAbsolute(v) : "M0,0"
                                    }), d._.dirty = 1, d._.arrows && ("startString" in d._.arrows && q(d, d._.arrows.startString), "endString" in d._.arrows && q(d, d._.arrows.endString, 1)));
                                    break;
                                case "width":
                                    if (k.setAttribute(n, v), d._.dirty = 1, m.fx) n = "x", v = m.x;
                                    else break;
                                case "x":
                                    m.fx && (v = -m.x - (m.width || 0));
                                case "rx":
                                    if ("rx" == n && "rect" == d.type) break;
                                case "cx":
                                    k.setAttribute(n, v);
                                    d.pattern && s(d);
                                    d._.dirty =
                                        1;
                                    break;
                                case "height":
                                    if (k.setAttribute(n, v), d._.dirty = 1, m.fy) n = "y", v = m.y;
                                    else break;
                                case "y":
                                    m.fy && (v = -m.y - (m.height || 0));
                                case "ry":
                                    if ("ry" == n && "rect" == d.type) break;
                                case "cy":
                                    k.setAttribute(n, v);
                                    d.pattern && s(d);
                                    d._.dirty = 1;
                                    break;
                                case "r":
                                    "rect" == d.type ? t(k, {
                                        rx: v,
                                        ry: v
                                    }) : k.setAttribute(n, v);
                                    d._.dirty = 1;
                                    break;
                                case "src":
                                    "image" == d.type && k.setAttributeNS("http://www.w3.org/1999/xlink", "href", v);
                                    break;
                                case "stroke-width":
                                    if (1 != d._.sx || 1 != d._.sy) v /= g(h(d._.sx), h(d._.sy)) || 1;
                                    k.setAttribute(n, v);
                                    m["stroke-dasharray"] &&
                                        C(d, m["stroke-dasharray"], f);
                                    d._.arrows && ("startString" in d._.arrows && q(d, d._.arrows.startString), "endString" in d._.arrows && q(d, d._.arrows.endString, 1));
                                    break;
                                case "stroke-dasharray":
                                    C(d, v, f);
                                    break;
                                case "fill":
                                    var G = a(v).match(b._ISURL);
                                    if (G) {
                                        var E = t("pattern"),
                                            x = t("image");
                                        E.id = b.createUUID();
                                        t(E, {
                                            x: 0,
                                            y: 0,
                                            patternUnits: "userSpaceOnUse",
                                            height: 1,
                                            width: 1
                                        });
                                        t(x, {
                                            x: 0,
                                            y: 0,
                                            "xlink:href": G[1]
                                        });
                                        E.appendChild(x);
                                        (function(a) {
                                            b._preload(G[1], function() {
                                                var b = this.offsetWidth,
                                                    d = this.offsetHeight;
                                                t(a, {
                                                    width: b,
                                                    height: d
                                                });
                                                t(x, {
                                                    width: b,
                                                    height: d
                                                })
                                            })
                                        })(E);
                                        d.paper.defs.appendChild(E);
                                        t(k, {
                                            fill: "url(#" + E.id + ")"
                                        });
                                        d.pattern = E;
                                        d.pattern && s(d);
                                        break
                                    }
                                    w = b.getRGB(v);
                                    if (!w.error) delete f.gradient, delete m.gradient, !b.is(m.opacity, "undefined") && b.is(f.opacity, "undefined") && t(k, {
                                        opacity: m.opacity
                                    }), !b.is(m["fill-opacity"], "undefined") && b.is(f["fill-opacity"], "undefined") && t(k, {
                                        "fill-opacity": m["fill-opacity"]
                                    });
                                    else if (("circle" == d.type || "ellipse" == d.type || "r" != a(v).charAt()) && p(d, v)) {
                                        if ("opacity" in m || "fill-opacity" in
                                            m)
                                            if (w = b._g.doc.getElementById(k.getAttribute("fill").replace(/^url\(#|\)$/g, ""))) w = w.getElementsByTagName("stop"), t(w[w.length - 1], {
                                                "stop-opacity": ("opacity" in m ? m.opacity : 1) * ("fill-opacity" in m ? m["fill-opacity"] : 1)
                                            });
                                        m.gradient = v;
                                        m.fill = "none";
                                        break
                                    }
                                    w.hasOwnProperty("opacity") && t(k, {
                                        "fill-opacity": 1 < w.opacity ? w.opacity / 100 : w.opacity
                                    });
                                case "stroke":
                                    w = b.getRGB(v);
                                    k.setAttribute(n, w.hex);
                                    "stroke" == n && w.hasOwnProperty("opacity") && t(k, {
                                        "stroke-opacity": 1 < w.opacity ? w.opacity / 100 : w.opacity
                                    });
                                    "stroke" ==
                                    n && d._.arrows && ("startString" in d._.arrows && q(d, d._.arrows.startString), "endString" in d._.arrows && q(d, d._.arrows.endString, 1));
                                    break;
                                case "gradient":
                                    "circle" != d.type && "ellipse" != d.type && "r" == a(v).charAt() || p(d, v);
                                    break;
                                case "opacity":
                                    m.gradient && !m.hasOwnProperty("stroke-opacity") && t(k, {
                                        "stroke-opacity": 1 < v ? v / 100 : v
                                    });
                                case "fill-opacity":
                                    if (m.gradient) {
                                        if (w = b._g.doc.getElementById(k.getAttribute("fill").replace(/^url\(#|\)$/g, ""))) w = w.getElementsByTagName("stop"), t(w[w.length - 1], {
                                            "stop-opacity": v
                                        });
                                        break
                                    }
                                default:
                                    "font-size" == n && (v = e(v, 10) + "px"), w = n.replace(/(\-.)/g, function(a) {
                                        return a.substring(1).toUpperCase()
                                    }), k.style[w] = v, d._.dirty = 1, k.setAttribute(n, v)
                            }
                        }
                    y(d, f);
                    k.style.visibility = u
                },
                y = function(d, f) {
                    if ("text" == d.type && (f.hasOwnProperty("text") || f.hasOwnProperty("font") || f.hasOwnProperty("font-size") || f.hasOwnProperty("x") || f.hasOwnProperty("y"))) {
                        var g = d.attrs,
                            h = d.node,
                            k = h.firstChild ? e(b._g.doc.defaultView.getComputedStyle(h.firstChild, "").getPropertyValue("font-size"), 10) : 10;
                        if (f.hasOwnProperty("text")) {
                            for (g.text =
                                f.text; h.firstChild;) h.removeChild(h.firstChild);
                            for (var l = a(f.text).split("\n"), m = [], u, n = 0, p = l.length; n < p; n++) u = t("tspan"), n && t(u, {
                                dy: 1.2 * k,
                                x: g.x
                            }), u.appendChild(b._g.doc.createTextNode(l[n])), h.appendChild(u), m[n] = u
                        } else
                            for (m = h.getElementsByTagName("tspan"), n = 0, p = m.length; n < p; n++) n ? t(m[n], {
                                dy: 1.2 * k,
                                x: g.x
                            }) : t(m[0], {
                                dy: 0
                            });
                        t(h, {
                            x: g.x,
                            y: g.y
                        });
                        d._.dirty = 1;
                        h = d._getBBox();
                        (g = g.y - (h.y + h.height / 2)) && b.is(g, "finite") && t(m[0], {
                            dy: g
                        })
                    }
                },
                E = function(a) {
                    return a.parentNode && "a" === a.parentNode.tagName.toLowerCase() ?
                        a.parentNode : a
                },
                G = function(a, d) {
                    this[0] = this.node = a;
                    a.raphael = !0;
                    this.id = b._oid++;
                    a.raphaelid = this.id;
                    this.matrix = b.matrix();
                    this.realPath = null;
                    this.paper = d;
                    this.attrs = this.attrs || {};
                    this._ = {
                        transform: [],
                        sx: 1,
                        sy: 1,
                        deg: 0,
                        dx: 0,
                        dy: 0,
                        dirty: 1
                    };
                    !d.bottom && (d.bottom = this);
                    (this.prev = d.top) && (d.top.next = this);
                    d.top = this;
                    this.next = null
                },
                B = b.el;
            G.prototype = B;
            B.constructor = G;
            b._engine.path = function(a, b) {
                var d = t("path");
                b.canvas && b.canvas.appendChild(d);
                d = new G(d, b);
                d.type = "path";
                w(d, {
                    fill: "none",
                    stroke: "#000",
                    path: a
                });
                return d
            };
            B.rotate = function(b, e, f) {
                if (this.removed) return this;
                b = a(b).split(l);
                b.length - 1 && (e = d(b[1]), f = d(b[2]));
                b = d(b[0]);
                null == f && (e = f);
                if (null == e || null == f) f = this.getBBox(1), e = f.x + f.width / 2, f = f.y + f.height / 2;
                this.transform(this._.transform.concat([
                    ["r", b, e, f]
                ]));
                return this
            };
            B.scale = function(b, e, f, g) {
                if (this.removed) return this;
                b = a(b).split(l);
                b.length - 1 && (e = d(b[1]), f = d(b[2]), g = d(b[3]));
                b = d(b[0]);
                null == e && (e = b);
                null == g && (f = g);
                if (null == f || null == g) var h = this.getBBox(1);
                f = null == f ? h.x + h.width /
                    2 : f;
                g = null == g ? h.y + h.height / 2 : g;
                this.transform(this._.transform.concat([
                    ["s", b, e, f, g]
                ]));
                return this
            };
            B.translate = function(b, e) {
                if (this.removed) return this;
                b = a(b).split(l);
                b.length - 1 && (e = d(b[1]));
                b = d(b[0]) || 0;
                this.transform(this._.transform.concat([
                    ["t", b, +e || 0]
                ]));
                return this
            };
            B.transform = function(a) {
                var d = this._;
                if (null == a) return d.transform;
                b._extractTransform(this, a);
                this.clip && t(this.clip, {
                    transform: this.matrix.invert()
                });
                this.pattern && s(this);
                this.node && t(this.node, {
                    transform: this.matrix
                });
                if (1 !=
                    d.sx || 1 != d.sy) a = this.attrs.hasOwnProperty("stroke-width") ? this.attrs["stroke-width"] : 1, this.attr({
                    "stroke-width": a
                });
                return this
            };
            B.hide = function() {
                this.removed || (this.node.style.display = "none");
                return this
            };
            B.show = function() {
                this.removed || (this.node.style.display = "");
                return this
            };
            B.remove = function() {
                var a = E(this.node);
                if (!this.removed && a.parentNode) {
                    var d = this.paper;
                    d.__set__ && d.__set__.exclude(this);
                    m.unbind("raphael.*.*." + this.id);
                    this.gradient && d.defs.removeChild(this.gradient);
                    b._tear(this, d);
                    a.parentNode.removeChild(a);
                    this.removeData();
                    for (var e in this) this[e] = "function" == typeof this[e] ? b._removedFactory(e) : null;
                    this.removed = !0
                }
            };
            B._getBBox = function() {
                if ("none" == this.node.style.display) {
                    this.show();
                    var a = !0
                }
                var b = !1,
                    d;
                this.paper.canvas.parentElement ? d = this.paper.canvas.parentElement.style : this.paper.canvas.parentNode && (d = this.paper.canvas.parentNode.style);
                d && "none" == d.display && (b = !0, d.display = "");
                var e = {};
                try {
                    e = this.node.getBBox()
                } catch (f) {
                    e = {
                        x: this.node.clientLeft,
                        y: this.node.clientTop,
                        width: this.node.clientWidth,
                        height: this.node.clientHeight
                    }
                } finally {
                    e = e || {}, b && (d.display = "none")
                }
                a && this.hide();
                return e
            };
            B.attr = function(a, d) {
                if (this.removed) return this;
                if (null == a) {
                    var e = {},
                        f;
                    for (f in this.attrs) this.attrs.hasOwnProperty(f) && (e[f] = this.attrs[f]);
                    e.gradient && "none" == e.fill && (e.fill = e.gradient) && delete e.gradient;
                    e.transform = this._.transform;
                    return e
                }
                if (null == d && b.is(a, "string")) {
                    if ("fill" == a && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;
                    if ("transform" ==
                        a) return this._.transform;
                    f = a.split(l);
                    for (var e = {}, g = 0, h = f.length; g < h; g++) a = f[g], a in this.attrs ? e[a] = this.attrs[a] : b.is(this.paper.customAttributes[a], "function") ? e[a] = this.paper.customAttributes[a].def : e[a] = b._availableAttrs[a];
                    return h - 1 ? e : e[f[0]]
                }
                if (null == d && b.is(a, "array")) {
                    e = {};
                    g = 0;
                    for (h = a.length; g < h; g++) e[a[g]] = this.attr(a[g]);
                    return e
                }
                null != d ? (e = {}, e[a] = d) : null != a && b.is(a, "object") && (e = a);
                for (g in e) m("raphael.attr." + g + "." + this.id, this, e[g]);
                for (g in this.paper.customAttributes)
                    if (this.paper.customAttributes.hasOwnProperty(g) &&
                        e.hasOwnProperty(g) && b.is(this.paper.customAttributes[g], "function"))
                        for (h in f = this.paper.customAttributes[g].apply(this, [].concat(e[g])), this.attrs[g] = e[g], f) f.hasOwnProperty(h) && (e[h] = f[h]);
                w(this, e);
                return this
            };
            B.toFront = function() {
                if (this.removed) return this;
                var a = E(this.node);
                a.parentNode.appendChild(a);
                a = this.paper;
                a.top != this && b._tofront(this, a);
                return this
            };
            B.toBack = function() {
                if (this.removed) return this;
                var a = E(this.node),
                    d = a.parentNode;
                d.insertBefore(a, d.firstChild);
                b._toback(this, this.paper);
                return this
            };
            B.insertAfter = function(a) {
                if (this.removed || !a) return this;
                var d = E(this.node),
                    e = E(a.node || a[a.length - 1].node);
                e.nextSibling ? e.parentNode.insertBefore(d, e.nextSibling) : e.parentNode.appendChild(d);
                b._insertafter(this, a, this.paper);
                return this
            };
            B.insertBefore = function(a) {
                if (this.removed || !a) return this;
                var d = E(this.node),
                    e = E(a.node || a[0].node);
                e.parentNode.insertBefore(d, e);
                b._insertbefore(this, a, this.paper);
                return this
            };
            B.blur = function(a) {
                if (0 !== +a) {
                    var d = t("filter"),
                        e = t("feGaussianBlur");
                    this.attrs.blur = a;
                    d.id = b.createUUID();
                    t(e, {
                        stdDeviation: +a || 1.5
                    });
                    d.appendChild(e);
                    this.paper.defs.appendChild(d);
                    this._blur = d;
                    t(this.node, {
                        filter: "url(#" + d.id + ")"
                    })
                } else this._blur && (this._blur.parentNode.removeChild(this._blur), delete this._blur, delete this.attrs.blur), this.node.removeAttribute("filter");
                return this
            };
            b._engine.circle = function(a, b, d, e) {
                var f = t("circle");
                a.canvas && a.canvas.appendChild(f);
                a = new G(f, a);
                a.attrs = {
                    cx: b,
                    cy: d,
                    r: e,
                    fill: "none",
                    stroke: "#000"
                };
                a.type = "circle";
                t(f, a.attrs);
                return a
            };
            b._engine.rect = function(a, b, d, e, f, g) {
                var h = t("rect");
                a.canvas && a.canvas.appendChild(h);
                a = new G(h, a);
                a.attrs = {
                    x: b,
                    y: d,
                    width: e,
                    height: f,
                    rx: g || 0,
                    ry: g || 0,
                    fill: "none",
                    stroke: "#000"
                };
                a.type = "rect";
                t(h, a.attrs);
                return a
            };
            b._engine.ellipse = function(a, b, d, e, f) {
                var g = t("ellipse");
                a.canvas && a.canvas.appendChild(g);
                a = new G(g, a);
                a.attrs = {
                    cx: b,
                    cy: d,
                    rx: e,
                    ry: f,
                    fill: "none",
                    stroke: "#000"
                };
                a.type = "ellipse";
                t(g, a.attrs);
                return a
            };
            b._engine.image = function(a, b, d, e, f, g) {
                var h = t("image");
                t(h, {
                    x: d,
                    y: e,
                    width: f,
                    height: g,
                    preserveAspectRatio: "none"
                });
                h.setAttributeNS("http://www.w3.org/1999/xlink", "href", b);
                a.canvas && a.canvas.appendChild(h);
                a = new G(h, a);
                a.attrs = {
                    x: d,
                    y: e,
                    width: f,
                    height: g,
                    src: b
                };
                a.type = "image";
                return a
            };
            b._engine.text = function(a, d, e, f) {
                var g = t("text");
                a.canvas && a.canvas.appendChild(g);
                a = new G(g, a);
                a.attrs = {
                    x: d,
                    y: e,
                    "text-anchor": "middle",
                    text: f,
                    "font-family": b._availableAttrs["font-family"],
                    "font-size": b._availableAttrs["font-size"],
                    stroke: "none",
                    fill: "#000"
                };
                a.type = "text";
                w(a, a.attrs);
                return a
            };
            b._engine.setSize = function(a, b) {
                this.width =
                    a || this.width;
                this.height = b || this.height;
                this.canvas.setAttribute("width", this.width);
                this.canvas.setAttribute("height", this.height);
                this._viewBox && this.setViewBox.apply(this, this._viewBox);
                return this
            };
            b._engine.create = function() {
                var a = b._getContainer.apply(0, arguments),
                    d = a && a.container,
                    e = a.x,
                    f = a.y,
                    g = a.width,
                    a = a.height;
                if (!d) throw Error("SVG container not found.");
                var h = t("svg"),
                    k, e = e || 0,
                    f = f || 0,
                    g = g || 512,
                    a = a || 342;
                t(h, {
                    height: a,
                    version: 1.1,
                    width: g,
                    xmlns: "http://www.w3.org/2000/svg",
                    "xmlns:xlink": "http://www.w3.org/1999/xlink"
                });
                1 == d ? (h.style.cssText = "overflow:hidden;position:absolute;left:" + e + "px;top:" + f + "px", b._g.doc.body.appendChild(h), k = 1) : (h.style.cssText = "overflow:hidden;position:relative", d.firstChild ? d.insertBefore(h, d.firstChild) : d.appendChild(h));
                d = new b._Paper;
                d.width = g;
                d.height = a;
                d.canvas = h;
                d.clear();
                d._left = d._top = 0;
                k && (d.renderfix = function() {});
                d.renderfix();
                return d
            };
            b._engine.setViewBox = function(a, b, d, e, f) {
                m("raphael.setViewBox", this, this._viewBox, [a, b, d, e, f]);
                var h = this.getSize(),
                    h = g(d / h.width, e / h.height),
                    k = this.top,
                    l = f ? "xMidYMid meet" : "xMinYMin",
                    u;
                null == a ? (this._vbSize && (h = 1), delete this._vbSize, u = "0 0 " + this.width + " " + this.height) : (this._vbSize = h, u = a + " " + b + " " + d + " " + e);
                for (t(this.canvas, {
                        viewBox: u,
                        preserveAspectRatio: l
                    }); h && k;) l = "stroke-width" in k.attrs ? k.attrs["stroke-width"] : 1, k.attr({
                    "stroke-width": l
                }), k._.dirty = 1, k._.dirtyT = 1, k = k.prev;
                this._viewBox = [a, b, d, e, !!f];
                return this
            };
            b.prototype.renderfix = function() {
                var a = this.canvas,
                    b = a.style,
                    d;
                try {
                    d = a.getScreenCTM() || a.createSVGMatrix()
                } catch (e) {
                    d =
                        a.createSVGMatrix()
                }
                a = -d.e % 1;
                d = -d.f % 1;
                if (a || d) a && (this._left = (this._left + a) % 1, b.left = this._left + "px"), d && (this._top = (this._top + d) % 1, b.top = this._top + "px")
            };
            b.prototype.clear = function() {
                b.eve("raphael.clear", this);
                for (var a = this.canvas; a.firstChild;) a.removeChild(a.firstChild);
                this.bottom = this.top = null;
                (this.desc = t("desc")).appendChild(b._g.doc.createTextNode("Created with Rapha\u00ebl " + b.version));
                a.appendChild(this.desc);
                a.appendChild(this.defs = t("defs"))
            };
            b.prototype.remove = function() {
                m("raphael.remove",
                    this);
                this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
                for (var a in this) this[a] = "function" == typeof this[a] ? b._removedFactory(a) : null
            };
            var x = b.st,
                z;
            for (z in B) B.hasOwnProperty(z) && !x.hasOwnProperty(z) && (x[z] = function(a) {
                return function() {
                    var b = arguments;
                    return this.forEach(function(d) {
                        d[a].apply(d, b)
                    })
                }
            }(z))
        }
    })();
    (function() {
        if (b.vml) {
            var a = String,
                d = parseFloat,
                e = Math,
                f = e.round,
                g = e.max,
                h = e.min,
                k = e.abs,
                l = /[, ]+/,
                m = b.eve,
                u = {
                    M: "m",
                    L: "l",
                    C: "c",
                    Z: "x",
                    m: "t",
                    l: "r",
                    c: "v",
                    z: "x"
                },
                n = /([clmz]),?([^clmz]*)/gi,
                t = / progid:\S+Blur\([^\)]+\)/g,
                p = /-?[^,\s-]+/g,
                s = {
                    path: 1,
                    rect: 1,
                    image: 1
                },
                q = {
                    circle: 1,
                    ellipse: 1
                },
                v = function(d) {
                    var e = /[ahqstv]/ig,
                        g = b._pathToAbsolute;
                    a(d).match(e) && (g = b._path2curve);
                    e = /[clmz]/g;
                    if (g == b._pathToAbsolute && !a(d).match(e)) return d = a(d).replace(n, function(a, b, d) {
                        var e = [],
                            g = "m" == b.toLowerCase(),
                            h = u[b];
                        d.replace(p, function(a) {
                            g && 2 == e.length && (h += e + u["m" == b ? "l" : "L"], e = []);
                            e.push(f(21600 * a))
                        });
                        return h + e
                    });
                    var e = g(d),
                        h;
                    d = [];
                    for (var k = 0, l = e.length; k < l; k++) {
                        g = e[k];
                        h = e[k][0].toLowerCase();
                        "z" ==
                        h && (h = "x");
                        for (var m = 1, t = g.length; m < t; m++) h += f(21600 * g[m]) + (m != t - 1 ? "," : "");
                        d.push(h)
                    }
                    return d.join(" ")
                },
                w = function(a, d, e) {
                    var f = b.matrix();
                    f.rotate(-a, 0.5, 0.5);
                    return {
                        dx: f.x(d, e),
                        dy: f.y(d, e)
                    }
                },
                C = function(a, b, d, e, f, g) {
                    var h = a._,
                        l = a.matrix,
                        m = h.fillpos;
                    a = a.node;
                    var u = a.style,
                        n = 1,
                        t = "",
                        p = 21600 / b,
                        s = 21600 / d;
                    u.visibility = "hidden";
                    if (b && d) {
                        a.coordsize = k(p) + " " + k(s);
                        u.rotation = g * (0 > b * d ? -1 : 1);
                        g && (f = w(g, e, f), e = f.dx, f = f.dy);
                        0 > b && (t += "x");
                        0 > d && (t += " y") && (n = -1);
                        u.flip = t;
                        a.coordorigin = e * -p + " " + f * -s;
                        if (m || h.fillsize) e =
                            (e = a.getElementsByTagName("fill")) && e[0], a.removeChild(e), m && (f = w(g, l.x(m[0], m[1]), l.y(m[0], m[1])), e.position = f.dx * n + " " + f.dy * n), h.fillsize && (e.size = h.fillsize[0] * k(b) + " " + h.fillsize[1] * k(d)), a.appendChild(e);
                        u.visibility = "visible"
                    }
                };
            b.toString = function() {
                return "Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\u00ebl " + this.version
            };
            var y = function(b, d, e) {
                    d = a(d).toLowerCase().split("-");
                    e = e ? "end" : "start";
                    for (var f = d.length, g = "classic", h = "medium", k = "medium"; f--;) switch (d[f]) {
                        case "block":
                        case "classic":
                        case "oval":
                        case "diamond":
                        case "open":
                        case "none":
                            g =
                                d[f];
                            break;
                        case "wide":
                        case "narrow":
                            k = d[f];
                            break;
                        case "long":
                        case "short":
                            h = d[f]
                    }
                    b = b.node.getElementsByTagName("stroke")[0];
                    b[e + "arrow"] = g;
                    b[e + "arrowlength"] = h;
                    b[e + "arrowwidth"] = k
                },
                E = function(e, k) {
                    e.attrs = e.attrs || {};
                    var m = e.node,
                        u = e.attrs,
                        n = m.style,
                        t = s[e.type] && (k.x != u.x || k.y != u.y || k.width != u.width || k.height != u.height || k.cx != u.cx || k.cy != u.cy || k.rx != u.rx || k.ry != u.ry || k.r != u.r),
                        p = q[e.type] && (u.cx != k.cx || u.cy != k.cy || u.r != k.r || u.rx != k.rx || u.ry != k.ry),
                        w;
                    for (w in k) k.hasOwnProperty(w) && (u[w] = k[w]);
                    t &&
                        (u.path = b._getPath[e.type](e), e._.dirty = 1);
                    k.href && (m.href = k.href);
                    k.title && (m.title = k.title);
                    k.target && (m.target = k.target);
                    k.cursor && (n.cursor = k.cursor);
                    "blur" in k && e.blur(k.blur);
                    if (k.path && "path" == e.type || t) m.path = v(~a(u.path).toLowerCase().indexOf("r") ? b._pathToAbsolute(u.path) : u.path), e._.dirty = 1, "image" == e.type && (e._.fillpos = [u.x, u.y], e._.fillsize = [u.width, u.height], C(e, 1, 1, 0, 0, 0));
                    "transform" in k && e.transform(k.transform);
                    p && (n = +u.cx, t = +u.cy, p = +u.rx || +u.r || 0, w = +u.ry || +u.r || 0, m.path = b.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x",
                        f(21600 * (n - p)), f(21600 * (t - w)), f(21600 * (n + p)), f(21600 * (t + w)), f(21600 * n)), e._.dirty = 1);
                    "clip-rect" in k && (n = a(k["clip-rect"]).split(l), 4 == n.length && (n[2] = +n[2] + +n[0], n[3] = +n[3] + +n[1], t = m.clipRect || b._g.doc.createElement("div"), p = t.style, p.clip = b.format("rect({1}px {2}px {3}px {0}px)", n), m.clipRect || (p.position = "absolute", p.top = 0, p.left = 0, p.width = e.paper.width + "px", p.height = e.paper.height + "px", m.parentNode.insertBefore(t, m), t.appendChild(m), m.clipRect = t)), k["clip-rect"] || m.clipRect && (m.clipRect.style.clip =
                        "auto"));
                    e.textpath && (n = e.textpath.style, k.font && (n.font = k.font), k["font-family"] && (n.fontFamily = '"' + k["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, "") + '"'), k["font-size"] && (n.fontSize = k["font-size"]), k["font-weight"] && (n.fontWeight = k["font-weight"]), k["font-style"] && (n.fontStyle = k["font-style"]));
                    "arrow-start" in k && y(e, k["arrow-start"]);
                    "arrow-end" in k && y(e, k["arrow-end"], 1);
                    if (null != k.opacity || null != k["stroke-width"] || null != k.fill || null != k.src || null != k.stroke || null != k["stroke-width"] ||
                        null != k["stroke-opacity"] || null != k["fill-opacity"] || null != k["stroke-dasharray"] || null != k["stroke-miterlimit"] || null != k["stroke-linejoin"] || null != k["stroke-linecap"]) {
                        n = (n = m.getElementsByTagName("fill")) && n[0];
                        !n && (n = z("fill"));
                        "image" == e.type && k.src && (n.src = k.src);
                        k.fill && (n.on = !0);
                        if (null == n.on || "none" == k.fill || null === k.fill) n.on = !1;
                        n.on && k.fill && ((t = a(k.fill).match(b._ISURL)) ? (n.parentNode == m && m.removeChild(n), n.rotate = !0, n.src = t[1], n.type = "tile", p = e.getBBox(1), n.position = p.x + " " + p.y, e._.fillpos = [p.x, p.y], b._preload(t[1], function() {
                            e._.fillsize = [this.offsetWidth, this.offsetHeight]
                        })) : (n.color = b.getRGB(k.fill).hex, n.src = "", n.type = "solid", b.getRGB(k.fill).error && (e.type in {
                            circle: 1,
                            ellipse: 1
                        } || "r" != a(k.fill).charAt()) && B(e, k.fill, n) && (u.fill = "none", u.gradient = k.fill, n.rotate = !1)));
                        if ("fill-opacity" in k || "opacity" in k) p = ((+u["fill-opacity"] + 1 || 2) - 1) * ((+u.opacity + 1 || 2) - 1) * ((+b.getRGB(k.fill).o + 1 || 2) - 1), p = h(g(p, 0), 1), n.opacity = p, n.src && (n.color = "none");
                        m.appendChild(n);
                        n = m.getElementsByTagName("stroke") &&
                            m.getElementsByTagName("stroke")[0];
                        t = !1;
                        !n && (t = n = z("stroke"));
                        if (k.stroke && "none" != k.stroke || k["stroke-width"] || null != k["stroke-opacity"] || k["stroke-dasharray"] || k["stroke-miterlimit"] || k["stroke-linejoin"] || k["stroke-linecap"]) n.on = !0;
                        "none" != k.stroke && null !== k.stroke && null != n.on && 0 != k.stroke && 0 != k["stroke-width"] || (n.on = !1);
                        p = b.getRGB(k.stroke);
                        n.on && k.stroke && (n.color = p.hex);
                        p = ((+u["stroke-opacity"] + 1 || 2) - 1) * ((+u.opacity + 1 || 2) - 1) * ((+p.o + 1 || 2) - 1);
                        w = 0.75 * (d(k["stroke-width"]) || 1);
                        p = h(g(p, 0), 1);
                        null == k["stroke-width"] && (w = u["stroke-width"]);
                        k["stroke-width"] && (n.weight = w);
                        w && 1 > w && (p *= w) && (n.weight = 1);
                        n.opacity = p;
                        k["stroke-linejoin"] && (n.joinstyle = k["stroke-linejoin"] || "miter");
                        n.miterlimit = k["stroke-miterlimit"] || 8;
                        k["stroke-linecap"] && (n.endcap = "butt" == k["stroke-linecap"] ? "flat" : "square" == k["stroke-linecap"] ? "square" : "round");
                        "stroke-dasharray" in k && (p = {
                            "-": "shortdash",
                            ".": "shortdot",
                            "-.": "shortdashdot",
                            "-..": "shortdashdotdot",
                            ". ": "dot",
                            "- ": "dash",
                            "--": "longdash",
                            "- .": "dashdot",
                            "--.": "longdashdot",
                            "--..": "longdashdotdot"
                        }, n.dashstyle = p.hasOwnProperty(k["stroke-dasharray"]) ? p[k["stroke-dasharray"]] : "");
                        t && m.appendChild(n)
                    }
                    if ("text" == e.type) {
                        e.paper.canvas.style.display = "";
                        m = e.paper.span;
                        t = u.font && u.font.match(/\d+(?:\.\d*)?(?=px)/);
                        n = m.style;
                        u.font && (n.font = u.font);
                        u["font-family"] && (n.fontFamily = u["font-family"]);
                        u["font-weight"] && (n.fontWeight = u["font-weight"]);
                        u["font-style"] && (n.fontStyle = u["font-style"]);
                        t = d(u["font-size"] || t && t[0]) || 10;
                        n.fontSize = 100 * t + "px";
                        e.textpath.string && (m.innerHTML =
                            a(e.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                        m = m.getBoundingClientRect();
                        e.W = u.w = (m.right - m.left) / 100;
                        e.H = u.h = (m.bottom - m.top) / 100;
                        e.X = u.x;
                        e.Y = u.y + e.H / 2;
                        ("x" in k || "y" in k) && (e.path.v = b.format("m{0},{1}l{2},{1}", f(21600 * u.x), f(21600 * u.y), f(21600 * u.x) + 1));
                        m = "x y text font font-family font-weight font-style font-size".split(" ");
                        n = 0;
                        for (t = m.length; n < t; n++)
                            if (m[n] in k) {
                                e._.dirty = 1;
                                break
                            }
                        switch (u["text-anchor"]) {
                            case "start":
                                e.textpath.style["v-text-align"] = "left";
                                e.bbx = e.W / 2;
                                break;
                            case "end":
                                e.textpath.style["v-text-align"] = "right";
                                e.bbx = -e.W / 2;
                                break;
                            default:
                                e.textpath.style["v-text-align"] = "center", e.bbx = 0
                        }
                        e.textpath.style["v-text-kern"] = !0
                    }
                },
                B = function(f, g, h) {
                    f.attrs = f.attrs || {};
                    var k = Math.pow,
                        l = "linear",
                        m = ".5 .5";
                    f.attrs.gradient = g;
                    g = a(g).replace(b._radial_gradient, function(a, b, f) {
                        l = "radial";
                        b && f && (b = d(b), f = d(f), 0.25 < k(b - 0.5, 2) + k(f - 0.5, 2) && (f = e.sqrt(0.25 - k(b - 0.5, 2)) * (2 * (0.5 < f) - 1) + 0.5), m = b + " " + f);
                        return ""
                    });
                    g = g.split(/\s*\-\s*/);
                    if ("linear" == l) {
                        var n = g.shift(),
                            n = -d(n);
                        if (isNaN(n)) return null
                    }
                    g = b._parseDots(g);
                    if (!g) return null;
                    f = f.shape || f.node;
                    if (g.length) {
                        f.removeChild(h);
                        h.on = !0;
                        h.method = "none";
                        h.color = g[0].color;
                        h.color2 = g[g.length - 1].color;
                        for (var u = [], t = 0, p = g.length; t < p; t++) g[t].offset && u.push(g[t].offset + " " + g[t].color);
                        h.colors = u.length ? u.join() : "0% " + h.color;
                        "radial" == l ? (h.type = "gradientTitle", h.focus = "100%", h.focussize = "0 0", h.focusposition = m, h.angle = 0) : (h.type = "gradient", h.angle = (270 - n) % 360);
                        f.appendChild(h)
                    }
                    return 1
                },
                G = function(a, d) {
                    this[0] =
                        this.node = a;
                    a.raphael = !0;
                    this.id = b._oid++;
                    a.raphaelid = this.id;
                    this.Y = this.X = 0;
                    this.attrs = {};
                    this.paper = d;
                    this.matrix = b.matrix();
                    this._ = {
                        transform: [],
                        sx: 1,
                        sy: 1,
                        dx: 0,
                        dy: 0,
                        deg: 0,
                        dirty: 1,
                        dirtyT: 1
                    };
                    !d.bottom && (d.bottom = this);
                    (this.prev = d.top) && (d.top.next = this);
                    d.top = this;
                    this.next = null
                },
                x = b.el;
            G.prototype = x;
            x.constructor = G;
            x.transform = function(d) {
                if (null == d) return this._.transform;
                var e = this.paper._viewBoxShift,
                    f = e ? "s" + [e.scale, e.scale] + "-1-1t" + [e.dx, e.dy] : "",
                    g;
                e && (g = d = a(d).replace(/\.{3}|\u2026/g, this._.transform ||
                    ""));
                b._extractTransform(this, f + d);
                var e = this.matrix.clone(),
                    h = this.skew;
                d = this.node;
                var f = ~a(this.attrs.fill).indexOf("-"),
                    k = !a(this.attrs.fill).indexOf("url(");
                e.translate(1, 1);
                k || f || "image" == this.type ? (h.matrix = "1 0 0 1", h.offset = "0 0", h = e.split(), f && h.noRotation || !h.isSimple ? (d.style.filter = e.toFilter(), f = this.getBBox(), h = this.getBBox(1), e = f.x - h.x, f = f.y - h.y, d.coordorigin = -21600 * e + " " + -21600 * f, C(this, 1, 1, e, f, 0)) : (d.style.filter = "", C(this, h.scalex, h.scaley, h.dx, h.dy, h.rotate))) : (d.style.filter =
                    "", h.matrix = a(e), h.offset = e.offset());
                null !== g && (this._.transform = g, b._extractTransform(this, g));
                return this
            };
            x.rotate = function(b, e, f) {
                if (this.removed) return this;
                if (null != b) {
                    b = a(b).split(l);
                    b.length - 1 && (e = d(b[1]), f = d(b[2]));
                    b = d(b[0]);
                    null == f && (e = f);
                    if (null == e || null == f) f = this.getBBox(1), e = f.x + f.width / 2, f = f.y + f.height / 2;
                    this._.dirtyT = 1;
                    this.transform(this._.transform.concat([
                        ["r", b, e, f]
                    ]));
                    return this
                }
            };
            x.translate = function(b, e) {
                if (this.removed) return this;
                b = a(b).split(l);
                b.length - 1 && (e = d(b[1]));
                b =
                    d(b[0]) || 0;
                e = +e || 0;
                this._.bbox && (this._.bbox.x += b, this._.bbox.y += e);
                this.transform(this._.transform.concat([
                    ["t", b, e]
                ]));
                return this
            };
            x.scale = function(b, e, f, g) {
                if (this.removed) return this;
                b = a(b).split(l);
                b.length - 1 && (e = d(b[1]), f = d(b[2]), g = d(b[3]), isNaN(f) && (f = null), isNaN(g) && (g = null));
                b = d(b[0]);
                null == e && (e = b);
                null == g && (f = g);
                if (null == f || null == g) var h = this.getBBox(1);
                f = null == f ? h.x + h.width / 2 : f;
                g = null == g ? h.y + h.height / 2 : g;
                this.transform(this._.transform.concat([
                    ["s", b, e, f, g]
                ]));
                this._.dirtyT = 1;
                return this
            };
            x.hide = function() {
                !this.removed && (this.node.style.display = "none");
                return this
            };
            x.show = function() {
                !this.removed && (this.node.style.display = "");
                return this
            };
            x.auxGetBBox = b.el.getBBox;
            x.getBBox = function() {
                var a = this.auxGetBBox();
                if (this.paper && this.paper._viewBoxShift) {
                    var b = {},
                        d = 1 / this.paper._viewBoxShift.scale;
                    b.x = a.x - this.paper._viewBoxShift.dx;
                    b.x *= d;
                    b.y = a.y - this.paper._viewBoxShift.dy;
                    b.y *= d;
                    b.width = a.width * d;
                    b.height = a.height * d;
                    b.x2 = b.x + b.width;
                    b.y2 = b.y + b.height;
                    return b
                }
                return a
            };
            x._getBBox = function() {
                return this.removed ? {} : {
                    x: this.X + (this.bbx || 0) - this.W / 2,
                    y: this.Y - this.H,
                    width: this.W,
                    height: this.H
                }
            };
            x.remove = function() {
                if (!this.removed && this.node.parentNode) {
                    this.paper.__set__ && this.paper.__set__.exclude(this);
                    b.eve.unbind("raphael.*.*." + this.id);
                    b._tear(this, this.paper);
                    this.node.parentNode.removeChild(this.node);
                    this.shape && this.shape.parentNode.removeChild(this.shape);
                    for (var a in this) this[a] = "function" == typeof this[a] ? b._removedFactory(a) : null;
                    this.removed = !0
                }
            };
            x.attr = function(a, d) {
                if (this.removed) return this;
                if (null == a) {
                    var e = {},
                        f;
                    for (f in this.attrs) this.attrs.hasOwnProperty(f) && (e[f] = this.attrs[f]);
                    e.gradient && "none" == e.fill && (e.fill = e.gradient) && delete e.gradient;
                    e.transform = this._.transform;
                    return e
                }
                if (null == d && b.is(a, "string")) {
                    if ("fill" == a && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;
                    f = a.split(l);
                    for (var e = {}, g = 0, h = f.length; g < h; g++) a = f[g], a in this.attrs ? e[a] = this.attrs[a] : b.is(this.paper.customAttributes[a], "function") ? e[a] = this.paper.customAttributes[a].def : e[a] = b._availableAttrs[a];
                    return h - 1 ? e : e[f[0]]
                }
                if (this.attrs && null == d && b.is(a, "array")) {
                    e = {};
                    g = 0;
                    for (h = a.length; g < h; g++) e[a[g]] = this.attr(a[g]);
                    return e
                }
                null != d && (e = {}, e[a] = d);
                null == d && b.is(a, "object") && (e = a);
                for (g in e) m("raphael.attr." + g + "." + this.id, this, e[g]);
                if (e) {
                    for (g in this.paper.customAttributes)
                        if (this.paper.customAttributes.hasOwnProperty(g) && e.hasOwnProperty(g) && b.is(this.paper.customAttributes[g], "function"))
                            for (h in f = this.paper.customAttributes[g].apply(this, [].concat(e[g])), this.attrs[g] = e[g], f) f.hasOwnProperty(h) &&
                                (e[h] = f[h]);
                    e.text && "text" == this.type && (this.textpath.string = e.text);
                    E(this, e)
                }
                return this
            };
            x.toFront = function() {
                !this.removed && this.node.parentNode.appendChild(this.node);
                this.paper && this.paper.top != this && b._tofront(this, this.paper);
                return this
            };
            x.toBack = function() {
                if (this.removed) return this;
                this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), b._toback(this, this.paper));
                return this
            };
            x.insertAfter = function(a) {
                if (this.removed) return this;
                a.constructor == b.st.constructor && (a = a[a.length - 1]);
                a.node.nextSibling ? a.node.parentNode.insertBefore(this.node, a.node.nextSibling) : a.node.parentNode.appendChild(this.node);
                b._insertafter(this, a, this.paper);
                return this
            };
            x.insertBefore = function(a) {
                if (this.removed) return this;
                a.constructor == b.st.constructor && (a = a[0]);
                a.node.parentNode.insertBefore(this.node, a.node);
                b._insertbefore(this, a, this.paper);
                return this
            };
            x.blur = function(a) {
                var d = this.node.runtimeStyle,
                    e = d.filter,
                    e = e.replace(t, "");
                0 !== +a ? (this.attrs.blur =
                    a, d.filter = e + "  progid:DXImageTransform.Microsoft.Blur(pixelradius=" + (+a || 1.5) + ")", d.margin = b.format("-{0}px 0 0 -{0}px", f(+a || 1.5))) : (d.filter = e, d.margin = 0, delete this.attrs.blur);
                return this
            };
            b._engine.path = function(a, b) {
                var d = z("shape");
                d.style.cssText = "position:absolute;left:0;top:0;width:1px;height:1px;behavior:url(#default#VML)";
                d.coordsize = "21600 21600";
                d.coordorigin = b.coordorigin;
                var e = new G(d, b),
                    f = {
                        fill: "none",
                        stroke: "#000"
                    };
                a && (f.path = a);
                e.type = "path";
                e.path = [];
                e.Path = "";
                E(e, f);
                b.canvas.appendChild(d);
                f = z("skew");
                f.on = !0;
                d.appendChild(f);
                e.skew = f;
                e.transform("");
                return e
            };
            b._engine.rect = function(a, d, e, f, g, h) {
                var k = b._rectPath(d, e, f, g, h);
                a = a.path(k);
                var l = a.attrs;
                a.X = l.x = d;
                a.Y = l.y = e;
                a.W = l.width = f;
                a.H = l.height = g;
                l.r = h;
                l.path = k;
                a.type = "rect";
                return a
            };
            b._engine.ellipse = function(a, b, d, e, f) {
                a = a.path();
                a.X = b - e;
                a.Y = d - f;
                a.W = 2 * e;
                a.H = 2 * f;
                a.type = "ellipse";
                E(a, {
                    cx: b,
                    cy: d,
                    rx: e,
                    ry: f
                });
                return a
            };
            b._engine.circle = function(a, b, d, e) {
                a = a.path();
                a.X = b - e;
                a.Y = d - e;
                a.W = a.H = 2 * e;
                a.type = "circle";
                E(a, {
                    cx: b,
                    cy: d,
                    r: e
                });
                return a
            };
            b._engine.image = function(a, d, e, f, g, h) {
                var k = b._rectPath(e, f, g, h);
                a = a.path(k).attr({
                    stroke: "none"
                });
                var l = a.attrs,
                    m = a.node,
                    n = m.getElementsByTagName("fill")[0];
                l.src = d;
                a.X = l.x = e;
                a.Y = l.y = f;
                a.W = l.width = g;
                a.H = l.height = h;
                l.path = k;
                a.type = "image";
                n.parentNode == m && m.removeChild(n);
                n.rotate = !0;
                n.src = d;
                n.type = "tile";
                a._.fillpos = [e, f];
                a._.fillsize = [g, h];
                m.appendChild(n);
                C(a, 1, 1, 0, 0, 0);
                return a
            };
            b._engine.text = function(d, e, g, h) {
                var k = z("shape"),
                    l = z("path"),
                    m = z("textpath");
                e = e || 0;
                g = g || 0;
                h = h || "";
                l.v = b.format("m{0},{1}l{2},{1}",
                    f(21600 * e), f(21600 * g), f(21600 * e) + 1);
                l.textpathok = !0;
                m.string = a(h);
                m.on = !0;
                k.style.cssText = "position:absolute;left:0;top:0;width:1px;height:1px;behavior:url(#default#VML)";
                k.coordsize = "21600 21600";
                k.coordorigin = "0 0";
                var n = new G(k, d),
                    u = {
                        fill: "#000",
                        stroke: "none",
                        font: b._availableAttrs.font,
                        text: h
                    };
                n.shape = k;
                n.path = l;
                n.textpath = m;
                n.type = "text";
                n.attrs.text = a(h);
                n.attrs.x = e;
                n.attrs.y = g;
                n.attrs.w = 1;
                n.attrs.h = 1;
                E(n, u);
                k.appendChild(m);
                k.appendChild(l);
                d.canvas.appendChild(k);
                d = z("skew");
                d.on = !0;
                k.appendChild(d);
                n.skew = d;
                n.transform("");
                return n
            };
            b._engine.setSize = function(a, d) {
                var e = this.canvas.style;
                this.width = a;
                this.height = d;
                a == +a && (a += "px");
                d == +d && (d += "px");
                e.width = a;
                e.height = d;
                e.clip = "rect(0 " + a + " " + d + " 0)";
                this._viewBox && b._engine.setViewBox.apply(this, this._viewBox);
                return this
            };
            b._engine.setViewBox = function(a, d, e, f, g) {
                b.eve("raphael.setViewBox", this, this._viewBox, [a, d, e, f, g]);
                var h = this.getSize(),
                    k = h.width,
                    l = h.height,
                    m, n;
                g && (m = l / f, n = k / e, e * m < k && (a -= (k - e * m) / 2 / m), f * n < l && (d -= (l - f * n) / 2 / n));
                this._viewBox = [a, d, e, f, !!g];
                this._viewBoxShift = {
                    dx: -a,
                    dy: -d,
                    scale: h
                };
                this.forEach(function(a) {
                    a.transform("...")
                });
                return this
            };
            var z;
            b._engine.initWin = function(a) {
                var b = a.document;
                31 > b.styleSheets.length ? b.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)") : b.styleSheets[0].addRule(".rvml", "behavior:url(#default#VML)");
                try {
                    !b.namespaces.rvml && b.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), z = function(a) {
                        return b.createElement("<rvml:" + a + ' class="rvml">')
                    }
                } catch (d) {
                    z = function(a) {
                        return b.createElement("<" +
                            a + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
                    }
                }
            };
            b._engine.initWin(b._g.win);
            b._engine.create = function() {
                var a = b._getContainer.apply(0, arguments),
                    d = a.container,
                    e = a.height,
                    f = a.width,
                    g = a.x,
                    a = a.y;
                if (!d) throw Error("VML container not found.");
                var h = new b._Paper,
                    k = h.canvas = b._g.doc.createElement("div"),
                    l = k.style,
                    g = g || 0,
                    a = a || 0,
                    f = f || 512,
                    e = e || 342;
                h.width = f;
                h.height = e;
                f == +f && (f += "px");
                e == +e && (e += "px");
                h.coordsize = "21600000 21600000";
                h.coordorigin = "0 0";
                h.span = b._g.doc.createElement("span");
                h.span.style.cssText =
                    "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;";
                k.appendChild(h.span);
                l.cssText = b.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", f, e);
                1 == d ? (b._g.doc.body.appendChild(k), l.left = g + "px", l.top = a + "px", l.position = "absolute") : d.firstChild ? d.insertBefore(k, d.firstChild) : d.appendChild(k);
                h.renderfix = function() {};
                return h
            };
            b.prototype.clear = function() {
                b.eve("raphael.clear", this);
                this.canvas.innerHTML = "";
                this.span = b._g.doc.createElement("span");
                this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
                this.canvas.appendChild(this.span);
                this.bottom = this.top = null
            };
            b.prototype.remove = function() {
                b.eve("raphael.remove", this);
                this.canvas.parentNode.removeChild(this.canvas);
                for (var a in this) this[a] = "function" == typeof this[a] ? b._removedFactory(a) : null;
                return !0
            };
            var A = b.st,
                D;
            for (D in x) x.hasOwnProperty(D) && !A.hasOwnProperty(D) && (A[D] = function(a) {
                return function() {
                    var b =
                        arguments;
                    return this.forEach(function(d) {
                        d[a].apply(d, b)
                    })
                }
            }(D))
        }
    })();
    t ? w.win.Raphael = b : Raphael = b;
    "object" == typeof exports && (module.exports = b);
    return b
});
var TGOS = TGOS || {};
TGOS.MVCObject = function() {
    this.binds_ = [];
    this.events_ = []
};
TGOS.MVCObject.prototype.addListener = function(a, d) {};
TGOS.MVCObject.prototype.bindTo = function(a, d, b, f) {
    f = {
        key: a,
        target: d,
        targetKey: b ? b : a,
        noNotify: f ? !0 : !1,
        eventName: a + "_changed"
    };
    this.binds_.push(f);
    this[a] !== f.target[f.targetKey] && (f.target[f.targetKey] = this[a], this.notify_(d, b))
};
TGOS.MVCObject.prototype.changed = function(a) {};
TGOS.MVCObject.prototype.get = function(a) {
    return this[a]
};
TGOS.MVCObject.prototype.notifyAll = function(a) {
    this.notify_(this, a);
    for (var d = 0; d < this.binds_.length; d++) this.binds_[d].key === a && this.notify_(this.binds_[d].target, this.binds_[d].targetKey)
};
TGOS.MVCObject.prototype.notify_ = function(a, d) {
    if ("function" == typeof a[d + "_changed"]) a[d + "_changed"]();
    "function" == typeof a.changed && a.changed(d)
};
TGOS.MVCObject.prototype.set = function(a, d) {
    if (this[a] !== d) {
        this[a] = d;
        for (var b = 0; b < this.binds_.length; b++) {
            var f = this.binds_[b],
                e = f.target,
                g = f.targetKey,
                f = f.noNotify;
            g == a && (e[a] = d);
            f || this.notify_(e, g)
        }
        this.notify_(this, a)
    }
};
TGOS.MVCObject.prototype.setValues = function(a) {
    for (var d in a) this.set(d, a[d])
};
TGOS.MVCObject.prototype.unbind = function(a) {
    for (var d = this.binds_[d].length; d--;) this.binds_[d].key === a && this.binds_.splice(d, 1)
};
TGOS.MVCObject.prototype.unbindAll = function() {
    this.binds_ = []
};
TGOS.fx = TGOS.fx || function() {
    var a = {},
        d = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = d;
    var b = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    window.cancelAnimationFrame = b;
    a.easing = {
        linear: function(a) {
            return a
        },
        quadIn: function(a) {
            return a * a
        },
        quadOut: function(a) {
            return a * (2 - a)
        },
        quadInOut: function(a) {
            return 0.5 > a ? 2 * a * a : -1 + (4 - 2 * a) * a
        },
        cubicIn: function(a) {
            return a * a * a
        },
        cubicOut: function(a) {
            return --a *
                a * a + 1
        },
        cubicInOut: function(a) {
            return 0.5 > a ? 4 * a * a * a : (a - 1) * (2 * a - 2) * (2 * a - 2) + 1
        },
        quartIn: function(a) {
            return a * a * a * a
        },
        quartOut: function(a) {
            return 1 - --a * a * a * a
        },
        quartInOut: function(a) {
            return 0.5 > a ? 8 * a * a * a * a : 1 - 8 * --a * a * a * a
        },
        quintIn: function(a) {
            return a * a * a * a * a
        },
        quintOut: function(a) {
            return 1 + --a * a * a * a * a
        },
        quintInOut: function(a) {
            return 0.5 > a ? 16 * a * a * a * a * a : 1 + 16 * --a * a * a * a * a
        }
    };
    a.createAnimation = function(f) {
        var e = f.easing ? f.easing : a.easing.linear,
            g = "number" == typeof f.duration ? f.duration : 350,
            k = "function" == typeof f.onAnimation ?
            f.onAnimation : null,
            l = "function" == typeof f.onEnd ? f.onEnd : null,
            h = "function" == typeof f.onStart ? f.onStart : null,
            m = f.type ? f.type : "setTimeout",
            n = "boolean" == typeof f.repeat ? f.repeat : !1,
            p = f.rate ? f.rate : 20,
            s = f.delay ? f.delay : 0,
            q, v = null,
            x, A = !1,
            B = function(a) {
                if (!A) {
                    null === v && (h && h.call(this), v = "setTimeout" == m ? new Date : a);
                    x = "setTimeout" == m ? new Date : a;
                    var b = "setTimeout" == m ? Math.abs(x.getTime() - v.getTime()) : Math.abs(a - v);
                    percent = e(b / g);
                    k && k.call(this, percent);
                    1 > percent && b < g ? q = "setTimeout" == m ? setTimeout(B, p) : d(B) :
                        n ? (percent %= 1, v = "setTimeout" == m ? new Date : a, q = "setTimeout" == m ? setTimeout(B, p) : d(B)) : l && l.call(this)
                }
            };
        return {
            play: function() {
                v = null;
                "setTimeout" != m && d ? s ? setTimeout(function() {
                    d(B)
                }, s) : d(B) : s ? setTimeout(B, s) : B()
            },
            stop: function() {
                A = !0;
                q && ("setTimeout" == m ? clearTimeout(q) : b(q))
            }
        }
    };
    return a
}();
/*

  proj4js.js -- Javascript reprojection library. 

  Authors:      Mike Adair madairATdmsolutions.ca
                Richard Greenwood richATgreenwoodmap.com
                Didier Richard didier.richardATign.fr
                Stephen Irons stephen.ironsATclear.net.nz
                Olivier Terral oterralATgmail.com

  License:      
 Copyright (c) 2012, Mike Adair, Richard Greenwood, Didier Richard, 
                     Stephen Irons and Olivier Terral

 Permission is hereby granted, free of charge, to any person obtaining a
 copy of this software and associated documentation files (the "Software"),
 to deal in the Software without restriction, including without limitation
 the rights to use, copy, modify, merge, publish, distribute, sublicense,
 and/or sell copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included
 in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 DEALINGS IN THE SOFTWARE.

 Note: This program is an almost direct port of the C library PROJ.4.
*/
var Proj4js = {
    defaultDatum: "WGS84",
    transform: function(a, d, b) {
        if (!a.readyToUse) return this.reportError("Proj4js initialization for:" + a.srsCode + " not yet complete"), b;
        if (!d.readyToUse) return this.reportError("Proj4js initialization for:" + d.srsCode + " not yet complete"), b;
        if (a.datum && d.datum && ((a.datum.datum_type == Proj4js.common.PJD_3PARAM || a.datum.datum_type == Proj4js.common.PJD_7PARAM) && "WGS84" != d.datumCode || (d.datum.datum_type == Proj4js.common.PJD_3PARAM || d.datum.datum_type == Proj4js.common.PJD_7PARAM) &&
                "WGS84" != a.datumCode)) {
            var f = Proj4js.WGS84;
            this.transform(a, f, b);
            a = f
        }
        "enu" != a.axis && this.adjust_axis(a, !1, b);
        "longlat" == a.projName ? (b.x *= Proj4js.common.D2R, b.y *= Proj4js.common.D2R) : (a.to_meter && (b.x *= a.to_meter, b.y *= a.to_meter), a.inverse(b));
        a.from_greenwich && (b.x += a.from_greenwich);
        b = this.datum_transform(a.datum, d.datum, b);
        d.from_greenwich && (b.x -= d.from_greenwich);
        "longlat" == d.projName ? (b.x *= Proj4js.common.R2D, b.y *= Proj4js.common.R2D) : (d.forward(b), d.to_meter && (b.x /= d.to_meter, b.y /= d.to_meter));
        "enu" != d.axis && this.adjust_axis(d, !0, b);
        return b
    },
    datum_transform: function(a, d, b) {
        if (a.compare_datums(d) || a.datum_type == Proj4js.common.PJD_NODATUM || d.datum_type == Proj4js.common.PJD_NODATUM) return b;
        if (a.es != d.es || a.a != d.a || a.datum_type == Proj4js.common.PJD_3PARAM || a.datum_type == Proj4js.common.PJD_7PARAM || d.datum_type == Proj4js.common.PJD_3PARAM || d.datum_type == Proj4js.common.PJD_7PARAM) a.geodetic_to_geocentric(b), a.datum_type != Proj4js.common.PJD_3PARAM && a.datum_type != Proj4js.common.PJD_7PARAM || a.geocentric_to_wgs84(b),
            d.datum_type != Proj4js.common.PJD_3PARAM && d.datum_type != Proj4js.common.PJD_7PARAM || d.geocentric_from_wgs84(b), d.geocentric_to_geodetic(b);
        return b
    },
    adjust_axis: function(a, d, b) {
        for (var f = b.x, e = b.y, g = b.z || 0, k, l, h = 0; 3 > h; h++)
            if (!d || 2 != h || void 0 !== b.z) switch (0 == h ? (k = f, l = "x") : 1 == h ? (k = e, l = "y") : (k = g, l = "z"), a.axis[h]) {
                case "e":
                    b[l] = k;
                    break;
                case "w":
                    b[l] = -k;
                    break;
                case "n":
                    b[l] = k;
                    break;
                case "s":
                    b[l] = -k;
                    break;
                case "u":
                    void 0 !== b[l] && (b.z = k);
                    break;
                case "d":
                    void 0 !== b[l] && (b.z = -k);
                    break;
                default:
                    return alert("ERROR: unknow axis (" +
                        a.axis[h] + ") - check definition of " + a.projName), null
            }
            return b
    },
    reportError: function() {},
    extend: function(a, d) {
        a = a || {};
        if (d)
            for (var b in d) {
                var f = d[b];
                void 0 !== f && (a[b] = f)
            }
        return a
    },
    Class: function() {
        for (var a = function() {
                this.initialize.apply(this, arguments)
            }, d = {}, b, f = 0; f < arguments.length; ++f) b = "function" == typeof arguments[f] ? arguments[f].prototype : arguments[f], Proj4js.extend(d, b);
        a.prototype = d;
        return a
    },
    bind: function(a, d) {
        var b = Array.prototype.slice.apply(arguments, [2]);
        return function() {
            var f = b.concat(Array.prototype.slice.apply(arguments, [0]));
            return a.apply(d, f)
        }
    },
    scriptName: "proj4js-compressed.js",
    defsLookupService: "http://spatialreference.org/ref",
    libPath: null,
    getScriptLocation: function() {
        if (this.libPath) return this.libPath;
        for (var a = this.scriptName, d = a.length, b = document.getElementsByTagName("script"), f = 0; f < b.length; f++) {
            var e = b[f].getAttribute("src");
            if (e) {
                var g = e.lastIndexOf(a);
                if (-1 < g && g + d == e.length) {
                    this.libPath = e.slice(0, -d);
                    break
                }
            }
        }
        return this.libPath || ""
    },
    loadScript: function(a, d, b, f) {
        var e = document.createElement("script");
        e.defer = !1;
        e.type = "text/javascript";
        e.id = a;
        e.src = a;
        e.onload = d;
        e.onerror = b;
        e.loadCheck = f;
        /MSIE/.test(navigator.userAgent) && (e.onreadystatechange = this.checkReadyState);
        document.getElementsByTagName("head")[0].appendChild(e)
    },
    checkReadyState: function() {
        if ("loaded" == this.readyState)
            if (this.loadCheck()) this.onload();
            else this.onerror()
    }
};
Proj4js.Proj = Proj4js.Class({
    readyToUse: !1,
    title: null,
    projName: null,
    units: null,
    datum: null,
    x0: 0,
    y0: 0,
    localCS: !1,
    queue: null,
    initialize: function(a, d) {
        this.srsCodeInput = a;
        this.queue = [];
        d && this.queue.push(d);
        if (0 <= a.indexOf("GEOGCS") || 0 <= a.indexOf("GEOCCS") || 0 <= a.indexOf("PROJCS") || 0 <= a.indexOf("LOCAL_CS")) this.parseWKT(a), this.deriveConstants(), this.loadProjCode(this.projName);
        else {
            if (0 == a.indexOf("urn:")) {
                var b = a.split(":");
                "ogc" != b[1] && "x-ogc" != b[1] || "def" != b[2] || "crs" != b[3] || (a = b[4] + ":" + b[b.length -
                    1])
            } else 0 == a.indexOf("http://") && (b = a.split("#"), b[0].match(/epsg.org/) ? a = "EPSG:" + b[1] : b[0].match(/RIG.xml/) && (a = "IGNF:" + b[1]));
            this.srsCode = a.toUpperCase();
            0 == this.srsCode.indexOf("EPSG") ? (this.srsCode = this.srsCode, this.srsAuth = "epsg", this.srsProjNumber = this.srsCode.substring(5)) : 0 == this.srsCode.indexOf("IGNF") ? (this.srsCode = this.srsCode, this.srsAuth = "IGNF", this.srsProjNumber = this.srsCode.substring(5)) : 0 == this.srsCode.indexOf("CRS") ? (this.srsCode = this.srsCode, this.srsAuth = "CRS", this.srsProjNumber =
                this.srsCode.substring(4)) : (this.srsAuth = "", this.srsProjNumber = this.srsCode);
            this.loadProjDefinition()
        }
    },
    loadProjDefinition: function() {
        if (Proj4js.defs[this.srsCode]) this.defsLoaded();
        else {
            var a = Proj4js.getScriptLocation() + "defs/" + this.srsAuth.toUpperCase() + this.srsProjNumber + ".js";
            Proj4js.loadScript(a, Proj4js.bind(this.defsLoaded, this), Proj4js.bind(this.loadFromService, this), Proj4js.bind(this.checkDefsLoaded, this))
        }
    },
    loadFromService: function() {
        Proj4js.loadScript(Proj4js.defsLookupService + "/" + this.srsAuth +
            "/" + this.srsProjNumber + "/proj4js/", Proj4js.bind(this.defsLoaded, this), Proj4js.bind(this.defsFailed, this), Proj4js.bind(this.checkDefsLoaded, this))
    },
    defsLoaded: function() {
        this.parseDefs();
        this.loadProjCode(this.projName)
    },
    checkDefsLoaded: function() {
        return Proj4js.defs[this.srsCode] ? !0 : !1
    },
    defsFailed: function() {
        Proj4js.reportError("failed to load projection definition for: " + this.srsCode);
        Proj4js.defs[this.srsCode] = Proj4js.defs.WGS84;
        this.defsLoaded()
    },
    loadProjCode: function(a) {
        if (Proj4js.Proj[a]) this.initTransforms();
        else {
            var d = Proj4js.getScriptLocation() + "projCode/" + a + ".js";
            Proj4js.loadScript(d, Proj4js.bind(this.loadProjCodeSuccess, this, a), Proj4js.bind(this.loadProjCodeFailure, this, a), Proj4js.bind(this.checkCodeLoaded, this, a))
        }
    },
    loadProjCodeSuccess: function(a) {
        Proj4js.Proj[a].dependsOn ? this.loadProjCode(Proj4js.Proj[a].dependsOn) : this.initTransforms()
    },
    loadProjCodeFailure: function(a) {
        Proj4js.reportError("failed to find projection file for: " + a)
    },
    checkCodeLoaded: function(a) {
        return Proj4js.Proj[a] ? !0 : !1
    },
    initTransforms: function() {
        Proj4js.extend(this,
            Proj4js.Proj[this.projName]);
        this.init();
        this.readyToUse = !0;
        if (this.queue)
            for (var a; a = this.queue.shift();) a.call(this, this)
    },
    wktRE: /^(\w+)\[(.*)\]$/,
    parseWKT: function(a) {
        if (a = a.match(this.wktRE)) {
            var d = a[1],
                b = a[2].split(","),
                f;
            f = "TOWGS84" == d.toUpperCase() ? d : b.shift();
            f = f.replace(/^\"/, "");
            f = f.replace(/\"$/, "");
            a = [];
            for (var e = 0, g = "", k = 0; k < b.length; ++k) {
                for (var l = b[k], h = 0; h < l.length; ++h) "[" == l.charAt(h) && ++e, "]" == l.charAt(h) && --e;
                g += l;
                0 === e ? (a.push(g), g = "") : g += ","
            }
            switch (d) {
                case "LOCAL_CS":
                    this.projName =
                        "identity";
                    this.localCS = !0;
                    this.srsCode = f;
                    break;
                case "GEOGCS":
                    this.projName = "longlat";
                    this.geocsCode = f;
                    this.srsCode || (this.srsCode = f);
                    break;
                case "PROJCS":
                    this.srsCode = f;
                    break;
                case "PROJECTION":
                    this.projName = Proj4js.wktProjections[f];
                    break;
                case "DATUM":
                    this.datumName = f;
                    break;
                case "LOCAL_DATUM":
                    this.datumCode = "none";
                    break;
                case "SPHEROID":
                    this.ellps = f;
                    this.a = parseFloat(a.shift());
                    this.rf = parseFloat(a.shift());
                    break;
                case "PRIMEM":
                    this.from_greenwich = parseFloat(a.shift());
                    break;
                case "UNIT":
                    this.units =
                        f;
                    this.unitsPerMeter = parseFloat(a.shift());
                    break;
                case "PARAMETER":
                    d = f.toLowerCase();
                    b = parseFloat(a.shift());
                    switch (d) {
                        case "false_easting":
                            this.x0 = b;
                            break;
                        case "false_northing":
                            this.y0 = b;
                            break;
                        case "scale_factor":
                            this.k0 = b;
                            break;
                        case "central_meridian":
                            this.long0 = b * Proj4js.common.D2R;
                            break;
                        case "latitude_of_origin":
                            this.lat0 = b * Proj4js.common.D2R
                    }
                    break;
                case "TOWGS84":
                    this.datum_params = a;
                    break;
                case "AXIS":
                    d = f.toLowerCase();
                    b = a.shift();
                    switch (b) {
                        case "EAST":
                            b = "e";
                            break;
                        case "WEST":
                            b = "w";
                            break;
                        case "NORTH":
                            b =
                                "n";
                            break;
                        case "SOUTH":
                            b = "s";
                            break;
                        case "UP":
                            b = "u";
                            break;
                        case "DOWN":
                            b = "d";
                            break;
                        default:
                            b = " "
                    }
                    this.axis || (this.axis = "enu");
                    switch (d) {
                        case "x":
                            this.axis = b + this.axis.substr(1, 2);
                            break;
                        case "y":
                            this.axis = this.axis.substr(0, 1) + b + this.axis.substr(2, 1);
                            break;
                        case "z":
                            this.axis = this.axis.substr(0, 2) + b
                    }
            }
            for (k = 0; k < a.length; ++k) this.parseWKT(a[k])
        }
    },
    parseDefs: function() {
        this.defData = Proj4js.defs[this.srsCode];
        var a, d;
        if (this.defData) {
            for (var b = this.defData.split("+"), f = 0; f < b.length; f++) switch (d = b[f].split("="),
                a = d[0].toLowerCase(), d = d[1], a.replace(/\s/gi, "")) {
                case "title":
                    this.title = d;
                    break;
                case "proj":
                    this.projName = d.replace(/\s/gi, "");
                    break;
                case "units":
                    this.units = d.replace(/\s/gi, "");
                    break;
                case "datum":
                    this.datumCode = d.replace(/\s/gi, "");
                    break;
                case "nadgrids":
                    this.nagrids = d.replace(/\s/gi, "");
                    break;
                case "ellps":
                    this.ellps = d.replace(/\s/gi, "");
                    break;
                case "a":
                    this.a = parseFloat(d);
                    break;
                case "b":
                    this.b = parseFloat(d);
                    break;
                case "rf":
                    this.rf = parseFloat(d);
                    break;
                case "lat_0":
                    this.lat0 = d * Proj4js.common.D2R;
                    break;
                case "lat_1":
                    this.lat1 = d * Proj4js.common.D2R;
                    break;
                case "lat_2":
                    this.lat2 = d * Proj4js.common.D2R;
                    break;
                case "lat_ts":
                    this.lat_ts = d * Proj4js.common.D2R;
                    break;
                case "lon_0":
                    this.long0 = d * Proj4js.common.D2R;
                    break;
                case "alpha":
                    this.alpha = parseFloat(d) * Proj4js.common.D2R;
                    break;
                case "lonc":
                    this.longc = d * Proj4js.common.D2R;
                    break;
                case "x_0":
                    this.x0 = parseFloat(d);
                    break;
                case "y_0":
                    this.y0 = parseFloat(d);
                    break;
                case "k_0":
                    this.k0 = parseFloat(d);
                    break;
                case "k":
                    this.k0 = parseFloat(d);
                    break;
                case "r_a":
                    this.R_A = !0;
                    break;
                case "zone":
                    this.zone = parseInt(d, 10);
                    break;
                case "south":
                    this.utmSouth = !0;
                    break;
                case "towgs84":
                    this.datum_params = d.split(",");
                    break;
                case "to_meter":
                    this.to_meter = parseFloat(d);
                    break;
                case "from_greenwich":
                    this.from_greenwich = d * Proj4js.common.D2R;
                    break;
                case "pm":
                    d = d.replace(/\s/gi, "");
                    this.from_greenwich = Proj4js.PrimeMeridian[d] ? Proj4js.PrimeMeridian[d] : parseFloat(d);
                    this.from_greenwich *= Proj4js.common.D2R;
                    break;
                case "axis":
                    d = d.replace(/\s/gi, ""), 3 == d.length && -1 != "ewnsud".indexOf(d.substr(0, 1)) && -1 !=
                        "ewnsud".indexOf(d.substr(1, 1)) && -1 != "ewnsud".indexOf(d.substr(2, 1)) && (this.axis = d)
            }
            this.deriveConstants()
        }
    },
    deriveConstants: function() {
        "@null" == this.nagrids && (this.datumCode = "none");
        if (this.datumCode && "none" != this.datumCode) {
            var a = Proj4js.Datum[this.datumCode];
            a && (this.datum_params = a.towgs84 ? a.towgs84.split(",") : null, this.ellps = a.ellipse, this.datumName = a.datumName ? a.datumName : this.datumCode)
        }
        this.a || Proj4js.extend(this, Proj4js.Ellipsoid[this.ellps] ? Proj4js.Ellipsoid[this.ellps] : Proj4js.Ellipsoid.WGS84);
        this.rf && !this.b && (this.b = (1 - 1 / this.rf) * this.a);
        if (0 === this.rf || Math.abs(this.a - this.b) < Proj4js.common.EPSLN) this.sphere = !0, this.b = this.a;
        this.a2 = this.a * this.a;
        this.b2 = this.b * this.b;
        this.es = (this.a2 - this.b2) / this.a2;
        this.e = Math.sqrt(this.es);
        this.R_A && (this.a *= 1 - this.es * (Proj4js.common.SIXTH + this.es * (Proj4js.common.RA4 + this.es * Proj4js.common.RA6)), this.a2 = this.a * this.a, this.b2 = this.b * this.b, this.es = 0);
        this.ep2 = (this.a2 - this.b2) / this.b2;
        this.k0 || (this.k0 = 1);
        this.axis || (this.axis = "enu");
        this.datum =
            new Proj4js.datum(this)
    }
});
Proj4js.Proj.longlat = {
    init: function() {},
    forward: function(a) {
        return a
    },
    inverse: function(a) {
        return a
    }
};
Proj4js.Proj.identity = Proj4js.Proj.longlat;
Proj4js.defs = {
    WGS84: "+title=long/lat:WGS84 +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees",
    "EPSG:4326": "+title=long/lat:WGS84 +proj=longlat +a=6378137.0 +b=6356752.31424518 +ellps=WGS84 +datum=WGS84 +units=degrees",
    "EPSG:4269": "+title=long/lat:NAD83 +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees",
    "EPSG:3875": "+title= Google Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"
};
Proj4js.defs["EPSG:3785"] = Proj4js.defs["EPSG:3875"];
Proj4js.defs.GOOGLE = Proj4js.defs["EPSG:3875"];
Proj4js.defs["EPSG:900913"] = Proj4js.defs["EPSG:3875"];
Proj4js.defs["EPSG:102113"] = Proj4js.defs["EPSG:3875"];
Proj4js.common = {
    PI: 3.141592653589793,
    HALF_PI: 1.5707963267948966,
    TWO_PI: 6.283185307179586,
    FORTPI: 0.7853981633974483,
    R2D: 57.29577951308232,
    D2R: 0.017453292519943295,
    SEC_TO_RAD: 4.84813681109536E-6,
    EPSLN: 1E-10,
    MAX_ITER: 20,
    COS_67P5: 0.3826834323650898,
    AD_C: 1.0026,
    PJD_UNKNOWN: 0,
    PJD_3PARAM: 1,
    PJD_7PARAM: 2,
    PJD_GRIDSHIFT: 3,
    PJD_WGS84: 4,
    PJD_NODATUM: 5,
    SRS_WGS84_SEMIMAJOR: 6378137,
    SIXTH: 0.16666666666666666,
    RA4: 0.04722222222222222,
    RA6: 0.022156084656084655,
    RV4: 0.06944444444444445,
    RV6: 0.04243827160493827,
    msfnz: function(a,
        d, b) {
        a *= d;
        return b / Math.sqrt(1 - a * a)
    },
    tsfnz: function(a, d, b) {
        b *= a;
        b = Math.pow((1 - b) / (1 + b), 0.5 * a);
        return Math.tan(0.5 * (this.HALF_PI - d)) / b
    },
    phi2z: function(a, d) {
        for (var b = 0.5 * a, f, e = this.HALF_PI - 2 * Math.atan(d), g = 0; 15 >= g; g++)
            if (f = a * Math.sin(e), f = this.HALF_PI - 2 * Math.atan(d * Math.pow((1 - f) / (1 + f), b)) - e, e += f, 1E-10 >= Math.abs(f)) return e;
        alert("phi2z has NoConvergence");
        return -9999
    },
    qsfnz: function(a, d) {
        var b;
        return 1E-7 < a ? (b = a * d, (1 - a * a) * (d / (1 - b * b) - 0.5 / a * Math.log((1 - b) / (1 + b)))) : 2 * d
    },
    asinz: function(a) {
        1 < Math.abs(a) &&
            (a = 1 < a ? 1 : -1);
        return Math.asin(a)
    },
    e0fn: function(a) {
        return 1 - 0.25 * a * (1 + a / 16 * (3 + 1.25 * a))
    },
    e1fn: function(a) {
        return 0.375 * a * (1 + 0.25 * a * (1 + 0.46875 * a))
    },
    e2fn: function(a) {
        return 0.05859375 * a * a * (1 + 0.75 * a)
    },
    e3fn: function(a) {
        return a * a * a * (35 / 3072)
    },
    mlfn: function(a, d, b, f, e) {
        return a * e - d * Math.sin(2 * e) + b * Math.sin(4 * e) - f * Math.sin(6 * e)
    },
    srat: function(a, d) {
        return Math.pow((1 - a) / (1 + a), d)
    },
    sign: function(a) {
        return 0 > a ? -1 : 1
    },
    adjust_lon: function(a) {
        return Math.abs(a) < this.PI ? a : a - this.sign(a) * this.TWO_PI
    },
    adjust_lat: function(a) {
        return Math.abs(a) <
            this.HALF_PI ? a : a - this.sign(a) * this.PI
    },
    latiso: function(a, d, b) {
        if (Math.abs(d) > this.HALF_PI) return +Number.NaN;
        if (d == this.HALF_PI) return Number.POSITIVE_INFINITY;
        if (d == -1 * this.HALF_PI) return -1 * Number.POSITIVE_INFINITY;
        b *= a;
        return Math.log(Math.tan((this.HALF_PI + d) / 2)) + a * Math.log((1 - b) / (1 + b)) / 2
    },
    fL: function(a, d) {
        return 2 * Math.atan(a * Math.exp(d)) - this.HALF_PI
    },
    invlatiso: function(a, d) {
        var b = this.fL(1, d),
            f = 0,
            e = 0;
        do f = b, e = a * Math.sin(f), b = this.fL(Math.exp(a * Math.log((1 + e) / (1 - e)) / 2), d); while (1E-12 < Math.abs(b -
                f));
        return b
    },
    sinh: function(a) {
        a = Math.exp(a);
        return (a - 1 / a) / 2
    },
    cosh: function(a) {
        a = Math.exp(a);
        return (a + 1 / a) / 2
    },
    tanh: function(a) {
        a = Math.exp(a);
        return (a - 1 / a) / (a + 1 / a)
    },
    asinh: function(a) {
        return (0 <= a ? 1 : -1) * Math.log(Math.abs(a) + Math.sqrt(a * a + 1))
    },
    acosh: function(a) {
        return 2 * Math.log(Math.sqrt((a + 1) / 2) + Math.sqrt((a - 1) / 2))
    },
    atanh: function(a) {
        return Math.log((a - 1) / (a + 1)) / 2
    },
    gN: function(a, d, b) {
        d *= b;
        return a / Math.sqrt(1 - d * d)
    },
    pj_enfn: function(a) {
        var d = [];
        d[0] = this.C00 - a * (this.C02 + a * (this.C04 + a * (this.C06 + a * this.C08)));
        d[1] = a * (this.C22 - a * (this.C04 + a * (this.C06 + a * this.C08)));
        var b = a * a;
        d[2] = b * (this.C44 - a * (this.C46 + a * this.C48));
        b *= a;
        d[3] = b * (this.C66 - a * this.C68);
        d[4] = b * a * this.C88;
        return d
    },
    pj_mlfn: function(a, d, b, f) {
        b *= d;
        d *= d;
        return f[0] * a - b * (f[1] + d * (f[2] + d * (f[3] + d * f[4])))
    },
    pj_inv_mlfn: function(a, d, b) {
        for (var f = 1 / (1 - d), e = a, g = Proj4js.common.MAX_ITER; g; --g) {
            var k = Math.sin(e),
                l = 1 - d * k * k,
                l = (this.pj_mlfn(e, k, Math.cos(e), b) - a) * l * Math.sqrt(l) * f,
                e = e - l;
            if (Math.abs(l) < Proj4js.common.EPSLN) return e
        }
        Proj4js.reportError("cass:pj_inv_mlfn: Convergence error");
        return e
    },
    C00: 1,
    C02: 0.25,
    C04: 0.046875,
    C06: 0.01953125,
    C08: 0.01068115234375,
    C22: 0.75,
    C44: 0.46875,
    C46: 0.013020833333333334,
    C48: 0.007120768229166667,
    C66: 0.3645833333333333,
    C68: 0.005696614583333333,
    C88: 0.3076171875
};
Proj4js.datum = Proj4js.Class({
    initialize: function(a) {
        this.datum_type = Proj4js.common.PJD_WGS84;
        a.datumCode && "none" == a.datumCode && (this.datum_type = Proj4js.common.PJD_NODATUM);
        if (a && a.datum_params) {
            for (var d = 0; d < a.datum_params.length; d++) a.datum_params[d] = parseFloat(a.datum_params[d]);
            if (0 != a.datum_params[0] || 0 != a.datum_params[1] || 0 != a.datum_params[2]) this.datum_type = Proj4js.common.PJD_3PARAM;
            3 < a.datum_params.length && (0 != a.datum_params[3] || 0 != a.datum_params[4] || 0 != a.datum_params[5] || 0 != a.datum_params[6]) &&
                (this.datum_type = Proj4js.common.PJD_7PARAM, a.datum_params[3] *= Proj4js.common.SEC_TO_RAD, a.datum_params[4] *= Proj4js.common.SEC_TO_RAD, a.datum_params[5] *= Proj4js.common.SEC_TO_RAD, a.datum_params[6] = a.datum_params[6] / 1E6 + 1)
        }
        a && (this.a = a.a, this.b = a.b, this.es = a.es, this.ep2 = a.ep2, this.datum_params = a.datum_params)
    },
    compare_datums: function(a) {
        return this.datum_type != a.datum_type || this.a != a.a || 5E-11 < Math.abs(this.es - a.es) ? !1 : this.datum_type == Proj4js.common.PJD_3PARAM ? this.datum_params[0] == a.datum_params[0] &&
            this.datum_params[1] == a.datum_params[1] && this.datum_params[2] == a.datum_params[2] : this.datum_type == Proj4js.common.PJD_7PARAM ? this.datum_params[0] == a.datum_params[0] && this.datum_params[1] == a.datum_params[1] && this.datum_params[2] == a.datum_params[2] && this.datum_params[3] == a.datum_params[3] && this.datum_params[4] == a.datum_params[4] && this.datum_params[5] == a.datum_params[5] && this.datum_params[6] == a.datum_params[6] : this.datum_type == Proj4js.common.PJD_GRIDSHIFT || a.datum_type == Proj4js.common.PJD_GRIDSHIFT ? (alert("ERROR: Grid shift transformations are not implemented."), !1) : !0
    },
    geodetic_to_geocentric: function(a) {
        var d = a.x,
            b = a.y,
            f = a.z ? a.z : 0,
            e, g, k;
        if (b < -Proj4js.common.HALF_PI && b > -1.001 * Proj4js.common.HALF_PI) b = -Proj4js.common.HALF_PI;
        else if (b > Proj4js.common.HALF_PI && b < 1.001 * Proj4js.common.HALF_PI) b = Proj4js.common.HALF_PI;
        else if (b < -Proj4js.common.HALF_PI || b > Proj4js.common.HALF_PI) return Proj4js.reportError("geocent:lat out of range:" + b), null;
        d > Proj4js.common.PI && (d -= 2 * Proj4js.common.PI);
        g = Math.sin(b);
        k = Math.cos(b);
        e = this.a / Math.sqrt(1 - this.es * g * g);
        b = (e + f) * k * Math.cos(d);
        d = (e + f) * k * Math.sin(d);
        f = (e * (1 - this.es) + f) * g;
        a.x = b;
        a.y = d;
        a.z = f;
        return 0
    },
    geocentric_to_geodetic: function(a) {
        var d, b, f, e, g, k, l, h, m, n, p = a.x;
        f = a.y;
        var s = a.z ? a.z : 0;
        d = Math.sqrt(p * p + f * f);
        b = Math.sqrt(p * p + f * f + s * s);
        if (1E-12 > d / this.a) {
            if (p = 0, 1E-12 > b / this.a) return
        } else p = Math.atan2(f, p);
        f = s / b;
        e = d / b;
        g = 1 / Math.sqrt(1 - this.es * (2 - this.es) * e * e);
        l = e * (1 - this.es) * g;
        h = f * g;
        n = 0;
        do n++, k = this.a / Math.sqrt(1 - this.es * h * h), b = d * l + s * h - k * (1 - this.es * h * h), k = this.es * k / (k + b), g = 1 / Math.sqrt(1 - k * (2 - k) * e * e), k = e * (1 - k) * g, g *= f, m = g * l - k * h, l =
            k, h = g; while (1E-24 < m * m && 30 > n);
        d = Math.atan(g / Math.abs(k));
        a.x = p;
        a.y = d;
        a.z = b;
        return a
    },
    geocentric_to_geodetic_noniter: function(a) {
        var d = a.x,
            b = a.y,
            f = a.z ? a.z : 0,
            e, g, k, l, h, d = parseFloat(d),
            b = parseFloat(b),
            f = parseFloat(f);
        h = !1;
        if (0 != d) e = Math.atan2(b, d);
        else if (0 < b) e = Proj4js.common.HALF_PI;
        else if (0 > b) e = -Proj4js.common.HALF_PI;
        else if (h = !0, e = 0, 0 < f) g = Proj4js.common.HALF_PI;
        else if (0 > f) g = -Proj4js.common.HALF_PI;
        else return;
        k = d * d + b * b;
        d = Math.sqrt(k);
        b = f * Proj4js.common.AD_C;
        k = Math.sqrt(b * b + k);
        b /= k;
        k = d / k;
        b = f + this.b *
            this.ep2 * b * b * b;
        l = d - this.a * this.es * k * k * k;
        k = Math.sqrt(b * b + l * l);
        b /= k;
        k = l / k;
        l = this.a / Math.sqrt(1 - this.es * b * b);
        f = k >= Proj4js.common.COS_67P5 ? d / k - l : k <= -Proj4js.common.COS_67P5 ? d / -k - l : f / b + l * (this.es - 1);
        !1 == h && (g = Math.atan(b / k));
        a.x = e;
        a.y = g;
        a.z = f;
        return a
    },
    geocentric_to_wgs84: function(a) {
        if (this.datum_type == Proj4js.common.PJD_3PARAM) a.x += this.datum_params[0], a.y += this.datum_params[1], a.z += this.datum_params[2];
        else if (this.datum_type == Proj4js.common.PJD_7PARAM) {
            var d = this.datum_params[3],
                b = this.datum_params[4],
                f = this.datum_params[5],
                e = this.datum_params[6],
                g = e * (f * a.x + a.y - d * a.z) + this.datum_params[1],
                d = e * (-b * a.x + d * a.y + a.z) + this.datum_params[2];
            a.x = e * (a.x - f * a.y + b * a.z) + this.datum_params[0];
            a.y = g;
            a.z = d
        }
    },
    geocentric_from_wgs84: function(a) {
        if (this.datum_type == Proj4js.common.PJD_3PARAM) a.x -= this.datum_params[0], a.y -= this.datum_params[1], a.z -= this.datum_params[2];
        else if (this.datum_type == Proj4js.common.PJD_7PARAM) {
            var d = this.datum_params[3],
                b = this.datum_params[4],
                f = this.datum_params[5],
                e = this.datum_params[6],
                g = (a.x -
                    this.datum_params[0]) / e,
                k = (a.y - this.datum_params[1]) / e,
                e = (a.z - this.datum_params[2]) / e;
            a.x = g + f * k - b * e;
            a.y = -f * g + k + d * e;
            a.z = b * g - d * k + e
        }
    }
});
Proj4js.Point = Proj4js.Class({
    initialize: function(a, d, b) {
        "object" == typeof a ? (this.x = a[0], this.y = a[1], this.z = a[2] || 0) : "string" == typeof a && "undefined" == typeof d ? (a = a.split(","), this.x = parseFloat(a[0]), this.y = parseFloat(a[1]), this.z = parseFloat(a[2]) || 0) : (this.x = a, this.y = d, this.z = b || 0)
    },
    clone: function() {
        return new Proj4js.Point(this.x, this.y, this.z)
    },
    toString: function() {
        return "x=" + this.x + ",y=" + this.y
    },
    toShortString: function() {
        return this.x + ", " + this.y
    }
});
Proj4js.PrimeMeridian = {
    greenwich: 0,
    lisbon: -9.131906111111,
    paris: 2.337229166667,
    bogota: -74.080916666667,
    madrid: -3.687938888889,
    rome: 12.452333333333,
    bern: 7.439583333333,
    jakarta: 106.807719444444,
    ferro: -17.666666666667,
    brussels: 4.367975,
    stockholm: 18.058277777778,
    athens: 23.7163375,
    oslo: 10.722916666667
};
Proj4js.Ellipsoid = {
    MERIT: {
        a: 6378137,
        rf: 298.257,
        ellipseName: "MERIT 1983"
    },
    SGS85: {
        a: 6378136,
        rf: 298.257,
        ellipseName: "Soviet Geodetic System 85"
    },
    GRS80: {
        a: 6378137,
        rf: 298.257222101,
        ellipseName: "GRS 1980(IUGG, 1980)"
    },
    IAU76: {
        a: 6378140,
        rf: 298.257,
        ellipseName: "IAU 1976"
    },
    airy: {
        a: 6377563.396,
        b: 6356256.91,
        ellipseName: "Airy 1830"
    },
    "APL4.": {
        a: 6378137,
        rf: 298.25,
        ellipseName: "Appl. Physics. 1965"
    },
    NWL9D: {
        a: 6378145,
        rf: 298.25,
        ellipseName: "Naval Weapons Lab., 1965"
    },
    mod_airy: {
        a: 6377340.189,
        b: 6356034.446,
        ellipseName: "Modified Airy"
    },
    andrae: {
        a: 6377104.43,
        rf: 300,
        ellipseName: "Andrae 1876 (Den., Iclnd.)"
    },
    aust_SA: {
        a: 6378160,
        rf: 298.25,
        ellipseName: "Australian Natl & S. Amer. 1969"
    },
    GRS67: {
        a: 6378160,
        rf: 298.247167427,
        ellipseName: "GRS 67(IUGG 1967)"
    },
    bessel: {
        a: 6377397.155,
        rf: 299.1528128,
        ellipseName: "Bessel 1841"
    },
    bess_nam: {
        a: 6377483.865,
        rf: 299.1528128,
        ellipseName: "Bessel 1841 (Namibia)"
    },
    clrk66: {
        a: 6378206.4,
        b: 6356583.8,
        ellipseName: "Clarke 1866"
    },
    clrk80: {
        a: 6378249.145,
        rf: 293.4663,
        ellipseName: "Clarke 1880 mod."
    },
    CPM: {
        a: 6375738.7,
        rf: 334.29,
        ellipseName: "Comm. des Poids et Mesures 1799"
    },
    delmbr: {
        a: 6376428,
        rf: 311.5,
        ellipseName: "Delambre 1810 (Belgium)"
    },
    engelis: {
        a: 6378136.05,
        rf: 298.2566,
        ellipseName: "Engelis 1985"
    },
    evrst30: {
        a: 6377276.345,
        rf: 300.8017,
        ellipseName: "Everest 1830"
    },
    evrst48: {
        a: 6377304.063,
        rf: 300.8017,
        ellipseName: "Everest 1948"
    },
    evrst56: {
        a: 6377301.243,
        rf: 300.8017,
        ellipseName: "Everest 1956"
    },
    evrst69: {
        a: 6377295.664,
        rf: 300.8017,
        ellipseName: "Everest 1969"
    },
    evrstSS: {
        a: 6377298.556,
        rf: 300.8017,
        ellipseName: "Everest (Sabah & Sarawak)"
    },
    fschr60: {
        a: 6378166,
        rf: 298.3,
        ellipseName: "Fischer (Mercury Datum) 1960"
    },
    fschr60m: {
        a: 6378155,
        rf: 298.3,
        ellipseName: "Fischer 1960"
    },
    fschr68: {
        a: 6378150,
        rf: 298.3,
        ellipseName: "Fischer 1968"
    },
    helmert: {
        a: 6378200,
        rf: 298.3,
        ellipseName: "Helmert 1906"
    },
    hough: {
        a: 6378270,
        rf: 297,
        ellipseName: "Hough"
    },
    intl: {
        a: 6378388,
        rf: 297,
        ellipseName: "International 1909 (Hayford)"
    },
    kaula: {
        a: 6378163,
        rf: 298.24,
        ellipseName: "Kaula 1961"
    },
    lerch: {
        a: 6378139,
        rf: 298.257,
        ellipseName: "Lerch 1979"
    },
    mprts: {
        a: 6397300,
        rf: 191,
        ellipseName: "Maupertius 1738"
    },
    new_intl: {
        a: 6378157.5,
        b: 6356772.2,
        ellipseName: "New International 1967"
    },
    plessis: {
        a: 6376523,
        rf: 6355863,
        ellipseName: "Plessis 1817 (France)"
    },
    krass: {
        a: 6378245,
        rf: 298.3,
        ellipseName: "Krassovsky, 1942"
    },
    SEasia: {
        a: 6378155,
        b: 6356773.3205,
        ellipseName: "Southeast Asia"
    },
    walbeck: {
        a: 6376896,
        b: 6355834.8467,
        ellipseName: "Walbeck"
    },
    WGS60: {
        a: 6378165,
        rf: 298.3,
        ellipseName: "WGS 60"
    },
    WGS66: {
        a: 6378145,
        rf: 298.25,
        ellipseName: "WGS 66"
    },
    WGS72: {
        a: 6378135,
        rf: 298.26,
        ellipseName: "WGS 72"
    },
    WGS84: {
        a: 6378137,
        rf: 298.257223563,
        ellipseName: "WGS 84"
    },
    sphere: {
        a: 6370997,
        b: 6370997,
        ellipseName: "Normal Sphere (r=6370997)"
    }
};
Proj4js.Datum = {
    WGS84: {
        towgs84: "0,0,0",
        ellipse: "WGS84",
        datumName: "WGS84"
    },
    GGRS87: {
        towgs84: "-199.87,74.79,246.62",
        ellipse: "GRS80",
        datumName: "Greek_Geodetic_Reference_System_1987"
    },
    NAD83: {
        towgs84: "0,0,0",
        ellipse: "GRS80",
        datumName: "North_American_Datum_1983"
    },
    NAD27: {
        nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
        ellipse: "clrk66",
        datumName: "North_American_Datum_1927"
    },
    potsdam: {
        towgs84: "606.0,23.0,413.0",
        ellipse: "bessel",
        datumName: "Potsdam Rauenberg 1950 DHDN"
    },
    carthage: {
        towgs84: "-263.0,6.0,431.0",
        ellipse: "clark80",
        datumName: "Carthage 1934 Tunisia"
    },
    hermannskogel: {
        towgs84: "653.0,-212.0,449.0",
        ellipse: "bessel",
        datumName: "Hermannskogel"
    },
    ire65: {
        towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
        ellipse: "mod_airy",
        datumName: "Ireland 1965"
    },
    nzgd49: {
        towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
        ellipse: "intl",
        datumName: "New Zealand Geodetic Datum 1949"
    },
    OSGB36: {
        towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
        ellipse: "airy",
        datumName: "Airy 1830"
    }
};
Proj4js.WGS84 = new Proj4js.Proj("WGS84");
Proj4js.Datum.OSB36 = Proj4js.Datum.OSGB36;
Proj4js.wktProjections = {
    "Lambert Tangential Conformal Conic Projection": "lcc",
    Mercator: "merc",
    "Popular Visualisation Pseudo Mercator": "merc",
    Mercator_1SP: "merc",
    Transverse_Mercator: "tmerc",
    "Transverse Mercator": "tmerc",
    "Lambert Azimuthal Equal Area": "laea",
    "Universal Transverse Mercator System": "utm"
};
Proj4js.Proj.aea = {
    init: function() {
        Math.abs(this.lat1 + this.lat2) < Proj4js.common.EPSLN ? Proj4js.reportError("aeaInitEqualLatitudes") : (this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e3 = Math.sqrt(this.es), this.sin_po = Math.sin(this.lat1), this.cos_po = Math.cos(this.lat1), this.con = this.t1 = this.sin_po, this.ms1 = Proj4js.common.msfnz(this.e3, this.sin_po, this.cos_po), this.qs1 = Proj4js.common.qsfnz(this.e3, this.sin_po, this.cos_po), this.sin_po = Math.sin(this.lat2), this.cos_po = Math.cos(this.lat2), this.t2 =
            this.sin_po, this.ms2 = Proj4js.common.msfnz(this.e3, this.sin_po, this.cos_po), this.qs2 = Proj4js.common.qsfnz(this.e3, this.sin_po, this.cos_po), this.sin_po = Math.sin(this.lat0), this.cos_po = Math.cos(this.lat0), this.t3 = this.sin_po, this.qs0 = Proj4js.common.qsfnz(this.e3, this.sin_po, this.cos_po), this.ns0 = Math.abs(this.lat1 - this.lat2) > Proj4js.common.EPSLN ? (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1) : this.con, this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1, this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) /
            this.ns0)
    },
    forward: function(a) {
        var d = a.x,
            b = a.y;
        this.sin_phi = Math.sin(b);
        this.cos_phi = Math.cos(b);
        var b = Proj4js.common.qsfnz(this.e3, this.sin_phi, this.cos_phi),
            b = this.a * Math.sqrt(this.c - this.ns0 * b) / this.ns0,
            f = this.ns0 * Proj4js.common.adjust_lon(d - this.long0),
            d = b * Math.sin(f) + this.x0,
            b = this.rh - b * Math.cos(f) + this.y0;
        a.x = d;
        a.y = b;
        return a
    },
    inverse: function(a) {
        var d, b, f;
        a.x -= this.x0;
        a.y = this.rh - a.y + this.y0;
        0 <= this.ns0 ? (d = Math.sqrt(a.x * a.x + a.y * a.y), b = 1) : (d = -Math.sqrt(a.x * a.x + a.y * a.y), b = -1);
        f = 0;
        0 != d && (f = Math.atan2(b *
            a.x, b * a.y));
        b = d * this.ns0 / this.a;
        d = (this.c - b * b) / this.ns0;
        1E-10 <= this.e3 ? (b = 1 - 0.5 * (1 - this.es) * Math.log((1 - this.e3) / (1 + this.e3)) / this.e3, b = 1E-10 < Math.abs(Math.abs(b) - Math.abs(d)) ? this.phi1z(this.e3, d) : 0 <= d ? 0.5 * Proj4js.common.PI : -0.5 * Proj4js.common.PI) : b = this.phi1z(this.e3, d);
        f = Proj4js.common.adjust_lon(f / this.ns0 + this.long0);
        a.x = f;
        a.y = b;
        return a
    },
    phi1z: function(a, d) {
        var b, f, e, g, k = Proj4js.common.asinz(0.5 * d);
        if (a < Proj4js.common.EPSLN) return k;
        for (var l = a * a, h = 1; 25 >= h; h++)
            if (b = Math.sin(k), f = Math.cos(k),
                e = a * b, g = 1 - e * e, b = 0.5 * g * g / f * (d / (1 - l) - b / g + 0.5 / a * Math.log((1 - e) / (1 + e))), k += b, 1E-7 >= Math.abs(b)) return k;
        Proj4js.reportError("aea:phi1z:Convergence error");
        return null
    }
};
Proj4js.Proj.sterea = {
    dependsOn: "gauss",
    init: function() {
        Proj4js.Proj.gauss.init.apply(this);
        this.rc ? (this.sinc0 = Math.sin(this.phic0), this.cosc0 = Math.cos(this.phic0), this.R2 = 2 * this.rc, this.title || (this.title = "Oblique Stereographic Alternative")) : Proj4js.reportError("sterea:init:E_ERROR_0")
    },
    forward: function(a) {
        var d, b, f, e;
        a.x = Proj4js.common.adjust_lon(a.x - this.long0);
        Proj4js.Proj.gauss.forward.apply(this, [a]);
        d = Math.sin(a.y);
        b = Math.cos(a.y);
        f = Math.cos(a.x);
        e = this.k0 * this.R2 / (1 + this.sinc0 * d + this.cosc0 *
            b * f);
        a.x = e * b * Math.sin(a.x);
        a.y = e * (this.cosc0 * d - this.sinc0 * b * f);
        a.x = this.a * a.x + this.x0;
        a.y = this.a * a.y + this.y0;
        return a
    },
    inverse: function(a) {
        var d, b, f, e;
        a.x = (a.x - this.x0) / this.a;
        a.y = (a.y - this.y0) / this.a;
        a.x /= this.k0;
        a.y /= this.k0;
        (e = Math.sqrt(a.x * a.x + a.y * a.y)) ? (f = 2 * Math.atan2(e, this.R2), d = Math.sin(f), b = Math.cos(f), f = Math.asin(b * this.sinc0 + a.y * d * this.cosc0 / e), d = Math.atan2(a.x * d, e * this.cosc0 * b - a.y * this.sinc0 * d)) : (f = this.phic0, d = 0);
        a.x = d;
        a.y = f;
        Proj4js.Proj.gauss.inverse.apply(this, [a]);
        a.x = Proj4js.common.adjust_lon(a.x +
            this.long0);
        return a
    }
};

function phi4z(a, d, b, f, e, g, k, l, h) {
    var m, n, p, s, q, v;
    h = g;
    for (v = 1; 15 >= v; v++)
        if (m = Math.sin(h), p = Math.tan(h), l = p * Math.sqrt(1 - a * m * m), n = Math.sin(2 * h), s = d * h - b * n + f * Math.sin(4 * h) - e * Math.sin(6 * h), q = d - 2 * b * Math.cos(2 * h) + 4 * f * Math.cos(4 * h) - 6 * e * Math.cos(6 * h), m = 2 * s + l * (s * s + k) - 2 * g * (l * s + 1), p = a * n * (s * s + k - 2 * g * s) / (2 * l), l = 2 * (g - s) * (l * q - 2 / n) - 2 * q, m /= p + l, h += m, 1E-10 >= Math.abs(m)) return h;
    Proj4js.reportError("phi4z: No convergence");
    return null
}

function e4fn(a) {
    var d;
    d = 1 + a;
    a = 1 - a;
    return Math.sqrt(Math.pow(d, d) * Math.pow(a, a))
}
Proj4js.Proj.poly = {
    init: function() {
        0 == this.lat0 && (this.lat0 = 90);
        this.temp = this.b / this.a;
        this.es = 1 - Math.pow(this.temp, 2);
        this.e = Math.sqrt(this.es);
        this.e0 = Proj4js.common.e0fn(this.es);
        this.e1 = Proj4js.common.e1fn(this.es);
        this.e2 = Proj4js.common.e2fn(this.es);
        this.e3 = Proj4js.common.e3fn(this.es);
        this.ml0 = Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0)
    },
    forward: function(a) {
        var d, b, f, e, g;
        f = a.y;
        b = Proj4js.common.adjust_lon(a.x - this.long0);
        1E-7 >= Math.abs(f) ? (g = this.x0 + this.a * b, d = this.y0 - this.a *
            this.ml0) : (d = Math.sin(f), b = Math.cos(f), f = Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, f), e = Proj4js.common.msfnz(this.e, d, b), b = d, g = this.x0 + this.a * e * Math.sin(b) / d, d = this.y0 + this.a * (f - this.ml0 + e * (1 - Math.cos(b)) / d));
        a.x = g;
        a.y = d;
        return a
    },
    inverse: function(a) {
        var d, b;
        a.x -= this.x0;
        a.y -= this.y0;
        d = this.ml0 + a.y / this.a;
        if (1E-7 >= Math.abs(d)) d = a.x / this.a + this.long0, b = 0;
        else {
            d = d * d + a.x / this.a * (a.x / this.a);
            d = phi4z(this.es, this.e0, this.e1, this.e2, this.e3, this.al, d, void 0, b);
            if (1 != d) return d;
            d = Proj4js.common.adjust_lon(Proj4js.common.asinz(NaN *
                a.x / this.a) / Math.sin(b) + this.long0)
        }
        a.x = d;
        a.y = b;
        return a
    }
};
Proj4js.Proj.equi = {
    init: function() {
        this.x0 || (this.x0 = 0);
        this.y0 || (this.y0 = 0);
        this.lat0 || (this.lat0 = 0);
        this.long0 || (this.long0 = 0)
    },
    forward: function(a) {
        var d = a.y,
            b = this.x0 + this.a * Proj4js.common.adjust_lon(a.x - this.long0) * Math.cos(this.lat0),
            d = this.y0 + this.a * d;
        this.t1 = b;
        this.t2 = Math.cos(this.lat0);
        a.x = b;
        a.y = d;
        return a
    },
    inverse: function(a) {
        a.x -= this.x0;
        a.y -= this.y0;
        var d = a.y / this.a;
        Math.abs(d) > Proj4js.common.HALF_PI && Proj4js.reportError("equi:Inv:DataError");
        var b = Proj4js.common.adjust_lon(this.long0 +
            a.x / (this.a * Math.cos(this.lat0)));
        a.x = b;
        a.y = d
    }
};
Proj4js.Proj.merc = {
    init: function() {
        this.lat_ts && (this.k0 = this.sphere ? Math.cos(this.lat_ts) : Proj4js.common.msfnz(this.es, Math.sin(this.lat_ts), Math.cos(this.lat_ts)))
    },
    forward: function(a) {
        var d = a.x,
            b = a.y;
        if (90 < b * Proj4js.common.R2D && -90 > b * Proj4js.common.R2D && 180 < d * Proj4js.common.R2D && -180 > d * Proj4js.common.R2D) return Proj4js.reportError("merc:forward: llInputOutOfRange: " + d + " : " + b), null;
        if (Math.abs(Math.abs(b) - Proj4js.common.HALF_PI) <= Proj4js.common.EPSLN) return Proj4js.reportError("merc:forward: ll2mAtPoles"), null;
        if (this.sphere) d = this.x0 + this.a * this.k0 * Proj4js.common.adjust_lon(d - this.long0), b = this.y0 + this.a * this.k0 * Math.log(Math.tan(Proj4js.common.FORTPI + 0.5 * b));
        else var f = Math.sin(b),
            b = Proj4js.common.tsfnz(this.e, b, f),
            d = this.x0 + this.a * this.k0 * Proj4js.common.adjust_lon(d - this.long0),
            b = this.y0 - this.a * this.k0 * Math.log(b);
        a.x = d;
        a.y = b;
        return a
    },
    inverse: function(a) {
        var d = a.x - this.x0,
            b = a.y - this.y0;
        if (this.sphere) b = Proj4js.common.HALF_PI - 2 * Math.atan(Math.exp(-b / this.a * this.k0));
        else if (b = Math.exp(-b / (this.a * this.k0)),
            b = Proj4js.common.phi2z(this.e, b), -9999 == b) return Proj4js.reportError("merc:inverse: lat = -9999"), null;
        d = Proj4js.common.adjust_lon(this.long0 + d / (this.a * this.k0));
        a.x = d;
        a.y = b;
        return a
    }
};
Proj4js.Proj.utm = {
    dependsOn: "tmerc",
    init: function() {
        this.zone ? (this.lat0 = 0, this.long0 = (6 * Math.abs(this.zone) - 183) * Proj4js.common.D2R, this.x0 = 5E5, this.y0 = this.utmSouth ? 1E7 : 0, this.k0 = 0.9996, Proj4js.Proj.tmerc.init.apply(this), this.forward = Proj4js.Proj.tmerc.forward, this.inverse = Proj4js.Proj.tmerc.inverse) : Proj4js.reportError("utm:init: zone must be specified for UTM")
    }
};
Proj4js.Proj.eqdc = {
    init: function() {
        this.mode || (this.mode = 0);
        this.temp = this.b / this.a;
        this.es = 1 - Math.pow(this.temp, 2);
        this.e = Math.sqrt(this.es);
        this.e0 = Proj4js.common.e0fn(this.es);
        this.e1 = Proj4js.common.e1fn(this.es);
        this.e2 = Proj4js.common.e2fn(this.es);
        this.e3 = Proj4js.common.e3fn(this.es);
        this.sinphi = Math.sin(this.lat1);
        this.cosphi = Math.cos(this.lat1);
        this.ms1 = Proj4js.common.msfnz(this.e, this.sinphi, this.cosphi);
        this.ml1 = Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, this.lat1);
        0 != this.mode ?
            (Math.abs(this.lat1 + this.lat2) < Proj4js.common.EPSLN && Proj4js.reportError("eqdc:Init:EqualLatitudes"), this.sinphi = Math.sin(this.lat2), this.cosphi = Math.cos(this.lat2), this.ms2 = Proj4js.common.msfnz(this.e, this.sinphi, this.cosphi), this.ml2 = Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, this.lat2), this.ns = Math.abs(this.lat1 - this.lat2) >= Proj4js.common.EPSLN ? (this.ms1 - this.ms2) / (this.ml2 - this.ml1) : this.sinphi) : this.ns = this.sinphi;
        this.g = this.ml1 + this.ms1 / this.ns;
        this.ml0 = Proj4js.common.mlfn(this.e0,
            this.e1, this.e2, this.e3, this.lat0);
        this.rh = this.a * (this.g - this.ml0)
    },
    forward: function(a) {
        var d = a.x,
            b = this.a * (this.g - Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, a.y)),
            f = this.ns * Proj4js.common.adjust_lon(d - this.long0),
            d = this.x0 + b * Math.sin(f),
            b = this.y0 + this.rh - b * Math.cos(f);
        a.x = d;
        a.y = b;
        return a
    },
    inverse: function(a) {
        a.x -= this.x0;
        a.y = this.rh - a.y + this.y0;
        var d, b;
        0 <= this.ns ? (b = Math.sqrt(a.x * a.x + a.y * a.y), d = 1) : (b = -Math.sqrt(a.x * a.x + a.y * a.y), d = -1);
        var f = 0;
        0 != b && (f = Math.atan2(d * a.x, d * a.y));
        d = this.phi3z(this.g -
            b / this.a, this.e0, this.e1, this.e2, this.e3);
        f = Proj4js.common.adjust_lon(this.long0 + f / this.ns);
        a.x = f;
        a.y = d;
        return a
    },
    phi3z: function(a, d, b, f, e) {
        var g, k;
        g = a;
        for (var l = 0; 15 > l; l++)
            if (k = (a + b * Math.sin(2 * g) - f * Math.sin(4 * g) + e * Math.sin(6 * g)) / d - g, g += k, 1E-10 >= Math.abs(k)) return g;
        Proj4js.reportError("PHI3Z-CONV:Latitude failed to converge after 15 iterations");
        return null
    }
};
Proj4js.Proj.tmerc = {
    init: function() {
        this.e0 = Proj4js.common.e0fn(this.es);
        this.e1 = Proj4js.common.e1fn(this.es);
        this.e2 = Proj4js.common.e2fn(this.es);
        this.e3 = Proj4js.common.e3fn(this.es);
        this.ml0 = this.a * Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0)
    },
    forward: function(a) {
        var d = a.y,
            b = Proj4js.common.adjust_lon(a.x - this.long0),
            f, e;
        f = Math.sin(d);
        var g = Math.cos(d);
        if (this.sphere) {
            var k = g * Math.sin(b);
            if (1E-10 > Math.abs(Math.abs(k) - 1)) return Proj4js.reportError("tmerc:forward: Point projects into infinity"),
                93;
            e = 0.5 * this.a * this.k0 * Math.log((1 + k) / (1 - k));
            f = Math.acos(g * Math.cos(b) / Math.sqrt(1 - k * k));
            0 > d && (f = -f);
            d = this.a * this.k0 * (f - this.lat0)
        } else {
            e = g * b;
            var b = Math.pow(e, 2),
                g = this.ep2 * Math.pow(g, 2),
                k = Math.tan(d),
                l = Math.pow(k, 2);
            f = 1 - this.es * Math.pow(f, 2);
            f = this.a / Math.sqrt(f);
            d = this.a * Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, d);
            e = this.k0 * f * e * (1 + b / 6 * (1 - l + g + b / 20 * (5 - 18 * l + Math.pow(l, 2) + 72 * g - 58 * this.ep2))) + this.x0;
            d = this.k0 * (d - this.ml0 + f * k * b * (0.5 + b / 24 * (5 - l + 9 * g + 4 * Math.pow(g, 2) + b / 30 * (61 - 58 * l + Math.pow(l,
                2) + 600 * g - 330 * this.ep2)))) + this.y0
        }
        a.x = e;
        a.y = d;
        return a
    },
    inverse: function(a) {
        var d, b, f, e;
        if (this.sphere) {
            b = Math.exp(a.x / (this.a * this.k0));
            var g = 0.5 * (b - 1 / b);
            f = this.lat0 + a.y / (this.a * this.k0);
            e = Math.cos(f);
            d = Math.sqrt((1 - e * e) / (1 + g * g));
            b = Proj4js.common.asinz(d);
            0 > f && (b = -b);
            d = 0 == g && 0 == e ? this.long0 : Proj4js.common.adjust_lon(Math.atan2(g, e) + this.long0)
        } else {
            var g = a.x - this.x0,
                k = a.y - this.y0;
            b = d = (this.ml0 + k / this.k0) / this.a;
            for (e = 0;; e++) {
                f = (d + this.e1 * Math.sin(2 * b) - this.e2 * Math.sin(4 * b) + this.e3 * Math.sin(6 * b)) /
                    this.e0 - b;
                b += f;
                if (Math.abs(f) <= Proj4js.common.EPSLN) break;
                if (6 <= e) return Proj4js.reportError("tmerc:inverse: Latitude failed to converge"), 95
            }
            if (Math.abs(b) < Proj4js.common.HALF_PI) {
                d = Math.sin(b);
                f = Math.cos(b);
                var l = Math.tan(b);
                e = this.ep2 * Math.pow(f, 2);
                var k = Math.pow(e, 2),
                    h = Math.pow(l, 2),
                    m = Math.pow(h, 2);
                d = 1 - this.es * Math.pow(d, 2);
                var n = this.a / Math.sqrt(d);
                d = n * (1 - this.es) / d;
                var g = g / (n * this.k0),
                    p = Math.pow(g, 2);
                b -= n * l * p / d * (0.5 - p / 24 * (5 + 3 * h + 10 * e - 4 * k - 9 * this.ep2 - p / 30 * (61 + 90 * h + 298 * e + 45 * m - 252 * this.ep2 - 3 * k)));
                d = Proj4js.common.adjust_lon(this.long0 + g * (1 - p / 6 * (1 + 2 * h + e - p / 20 * (5 - 2 * e + 28 * h - 3 * k + 8 * this.ep2 + 24 * m))) / f)
            } else b = Proj4js.common.HALF_PI * Proj4js.common.sign(k), d = this.long0
        }
        a.x = d;
        a.y = b;
        return a
    }
};
Proj4js.defs.GOOGLE = "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs";
Proj4js.defs["EPSG:900913"] = Proj4js.defs.GOOGLE;
Proj4js.Proj.gstmerc = {
    init: function() {
        var a = this.b / this.a;
        this.e = Math.sqrt(1 - a * a);
        this.lc = this.long0;
        this.rs = Math.sqrt(1 + this.e * this.e * Math.pow(Math.cos(this.lat0), 4) / (1 - this.e * this.e));
        var a = Math.sin(this.lat0),
            d = Math.asin(a / this.rs),
            b = Math.sin(d);
        this.cp = Proj4js.common.latiso(0, d, b) - this.rs * Proj4js.common.latiso(this.e, this.lat0, a);
        this.n2 = this.k0 * this.a * Math.sqrt(1 - this.e * this.e) / (1 - this.e * this.e * a * a);
        this.xs = this.x0;
        this.ys = this.y0 - this.n2 * d;
        this.title || (this.title = "Gauss Schreiber transverse mercator")
    },
    forward: function(a) {
        var d = a.y,
            b = this.rs * (a.x - this.lc),
            d = this.cp + this.rs * Proj4js.common.latiso(this.e, d, Math.sin(d)),
            f = Math.asin(Math.sin(b) / Proj4js.common.cosh(d)),
            f = Proj4js.common.latiso(0, f, Math.sin(f));
        a.x = this.xs + this.n2 * f;
        a.y = this.ys + this.n2 * Math.atan(Proj4js.common.sinh(d) / Math.cos(b));
        return a
    },
    inverse: function(a) {
        var d = a.x,
            b = a.y,
            f = Math.atan(Proj4js.common.sinh((d - this.xs) / this.n2) / Math.cos((b - this.ys) / this.n2)),
            d = Math.asin(Math.sin((b - this.ys) / this.n2) / Proj4js.common.cosh((d - this.xs) / this.n2)),
            d = Proj4js.common.latiso(0, d, Math.sin(d));
        a.x = this.lc + f / this.rs;
        a.y = Proj4js.common.invlatiso(this.e, (d - this.cp) / this.rs);
        return a
    }
};
Proj4js.Proj.ortho = {
    init: function() {
        this.sin_p14 = Math.sin(this.lat0);
        this.cos_p14 = Math.cos(this.lat0)
    },
    forward: function(a) {
        var d, b, f, e, g;
        b = a.y;
        f = Proj4js.common.adjust_lon(a.x - this.long0);
        d = Math.sin(b);
        b = Math.cos(b);
        e = Math.cos(f);
        g = this.sin_p14 * d + this.cos_p14 * b * e;
        if (0 < g || Math.abs(g) <= Proj4js.common.EPSLN) var k = 1 * this.a * b * Math.sin(f),
            l = this.y0 + 1 * this.a * (this.cos_p14 * d - this.sin_p14 * b * e);
        else Proj4js.reportError("orthoFwdPointError");
        a.x = k;
        a.y = l;
        return a
    },
    inverse: function(a) {
        var d, b, f, e;
        a.x -= this.x0;
        a.y -= this.y0;
        d = Math.sqrt(a.x * a.x + a.y * a.y);
        d > this.a + 1E-7 && Proj4js.reportError("orthoInvDataError");
        b = Proj4js.common.asinz(d / this.a);
        f = Math.sin(b);
        e = Math.cos(b);
        b = this.long0;
        Math.abs(d);
        f = Proj4js.common.asinz(e * this.sin_p14 + a.y * f * this.cos_p14 / d);
        d = Math.abs(this.lat0) - Proj4js.common.HALF_PI;
        Math.abs(d) <= Proj4js.common.EPSLN && (b = 0 <= this.lat0 ? Proj4js.common.adjust_lon(this.long0 + Math.atan2(a.x, -a.y)) : Proj4js.common.adjust_lon(this.long0 - Math.atan2(-a.x, a.y)));
        Math.sin(f);
        a.x = b;
        a.y = f;
        return a
    }
};
Proj4js.Proj.krovak = {
    init: function() {
        this.a = 6377397.155;
        this.es = 0.006674372230614;
        this.e = Math.sqrt(this.es);
        this.lat0 || (this.lat0 = 0.863937979737193);
        this.long0 || (this.long0 = 0.4334234309119251);
        this.k0 || (this.k0 = 0.9999);
        this.s45 = 0.785398163397448;
        this.s90 = 2 * this.s45;
        this.fi0 = this.lat0;
        this.e2 = this.es;
        this.e = Math.sqrt(this.e2);
        this.alfa = Math.sqrt(1 + this.e2 * Math.pow(Math.cos(this.fi0), 4) / (1 - this.e2));
        this.uq = 1.04216856380474;
        this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa);
        this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) /
            (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2);
        this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g;
        this.k1 = this.k0;
        this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2));
        this.s0 = 1.37008346281555;
        this.n = Math.sin(this.s0);
        this.ro0 = this.k1 * this.n0 / Math.tan(this.s0);
        this.ad = this.s90 - this.uq
    },
    forward: function(a) {
        var d, b, f;
        b = a.y;
        f = Proj4js.common.adjust_lon(a.x - this.long0);
        d = Math.pow((1 + this.e * Math.sin(b)) / (1 - this.e * Math.sin(b)), this.alfa *
            this.e / 2);
        d = 2 * (Math.atan(this.k * Math.pow(Math.tan(b / 2 + this.s45), this.alfa) / d) - this.s45);
        b = -f * this.alfa;
        f = Math.asin(Math.cos(this.ad) * Math.sin(d) + Math.sin(this.ad) * Math.cos(d) * Math.cos(b));
        d = this.n * Math.asin(Math.cos(d) * Math.sin(b) / Math.cos(f));
        f = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(f / 2 + this.s45), this.n);
        a.y = f * Math.cos(d) / 1;
        a.x = f * Math.sin(d) / 1;
        this.czech && (a.y *= -1, a.x *= -1);
        return a
    },
    inverse: function(a) {
        var d, b, f;
        d = a.x;
        a.x = a.y;
        a.y = d;
        this.czech && (a.y *= -1, a.x *= -1);
        d = Math.sqrt(a.x * a.x + a.y * a.y);
        b = Math.atan2(a.y, a.x) / Math.sin(this.s0);
        f = 2 * (Math.atan(Math.pow(this.ro0 / d, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45);
        d = Math.asin(Math.cos(this.ad) * Math.sin(f) - Math.sin(this.ad) * Math.cos(f) * Math.cos(b));
        b = Math.asin(Math.cos(f) * Math.sin(b) / Math.cos(d));
        a.x = this.long0 - b / this.alfa;
        b = d;
        var e = f = 0;
        do a.y = 2 * (Math.atan(Math.pow(this.k, -1 / this.alfa) * Math.pow(Math.tan(d / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(b)) / (1 - this.e * Math.sin(b)), this.e / 2)) - this.s45), 1E-10 >
            Math.abs(b - a.y) && (f = 1), b = a.y, e += 1; while (0 == f && 15 > e);
        return 15 <= e ? (Proj4js.reportError("PHI3Z-CONV:Latitude failed to converge after 15 iterations"), null) : a
    }
};
Proj4js.Proj.somerc = {
    init: function() {
        var a = this.lat0;
        this.lambda0 = this.long0;
        var d = Math.sin(a),
            b = this.a,
            f = 1 / this.rf,
            f = 2 * f - Math.pow(f, 2),
            e = this.e = Math.sqrt(f);
        this.R = this.k0 * b * Math.sqrt(1 - f) / (1 - f * Math.pow(d, 2));
        this.alpha = Math.sqrt(1 + f / (1 - f) * Math.pow(Math.cos(a), 4));
        this.b0 = Math.asin(d / this.alpha);
        this.K = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2)) - this.alpha * Math.log(Math.tan(Math.PI / 4 + a / 2)) + this.alpha * e / 2 * Math.log((1 + e * d) / (1 - e * d))
    },
    forward: function(a) {
        var d = Math.log(Math.tan(Math.PI / 4 - a.y / 2)),
            b = this.e /
            2 * Math.log((1 + this.e * Math.sin(a.y)) / (1 - this.e * Math.sin(a.y))),
            b = 2 * (Math.atan(Math.exp(-this.alpha * (d + b) + this.K)) - Math.PI / 4),
            f = this.alpha * (a.x - this.lambda0),
            d = Math.atan(Math.sin(f) / (Math.sin(this.b0) * Math.tan(b) + Math.cos(this.b0) * Math.cos(f))),
            b = Math.asin(Math.cos(this.b0) * Math.sin(b) - Math.sin(this.b0) * Math.cos(b) * Math.cos(f));
        a.y = this.R / 2 * Math.log((1 + Math.sin(b)) / (1 - Math.sin(b))) + this.y0;
        a.x = this.R * d + this.x0;
        return a
    },
    inverse: function(a) {
        for (var d = (a.x - this.x0) / this.R, b = 2 * (Math.atan(Math.exp((a.y -
                this.y0) / this.R)) - Math.PI / 4), f = Math.asin(Math.cos(this.b0) * Math.sin(b) + Math.sin(this.b0) * Math.cos(b) * Math.cos(d)), d = this.lambda0 + Math.atan(Math.sin(d) / (Math.cos(this.b0) * Math.cos(d) - Math.sin(this.b0) * Math.tan(b))) / this.alpha, e = f, g = -1E3, k = 0; 1E-7 < Math.abs(e - g);) {
            if (20 < ++k) {
                Proj4js.reportError("omercFwdInfinity");
                return
            }
            b = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + f / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(e)) / 2));
            g = e;
            e = 2 * Math.atan(Math.exp(b)) - Math.PI / 2
        }
        a.x = d;
        a.y = e;
        return a
    }
};
Proj4js.Proj.stere = {
    ssfn_: function(a, d, b) {
        d *= b;
        return Math.tan(0.5 * (Proj4js.common.HALF_PI + a)) * Math.pow((1 - d) / (1 + d), 0.5 * b)
    },
    TOL: 1E-8,
    NITER: 8,
    CONV: 1E-10,
    S_POLE: 0,
    N_POLE: 1,
    OBLIQ: 2,
    EQUIT: 3,
    init: function() {
        this.phits = this.lat_ts ? this.lat_ts : Proj4js.common.HALF_PI;
        var a = Math.abs(this.lat0);
        this.mode = Math.abs(a) - Proj4js.common.HALF_PI < Proj4js.common.EPSLN ? 0 > this.lat0 ? this.S_POLE : this.N_POLE : a > Proj4js.common.EPSLN ? this.OBLIQ : this.EQUIT;
        this.phits = Math.abs(this.phits);
        if (this.es) {
            var d;
            switch (this.mode) {
                case this.N_POLE:
                case this.S_POLE:
                    Math.abs(this.phits -
                        Proj4js.common.HALF_PI) < Proj4js.common.EPSLN ? this.akm1 = 2 * this.k0 / Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e)) : (a = Math.sin(this.phits), this.akm1 = Math.cos(this.phits) / Proj4js.common.tsfnz(this.e, this.phits, a), a *= this.e, this.akm1 /= Math.sqrt(1 - a * a));
                    break;
                case this.EQUIT:
                    this.akm1 = 2 * this.k0;
                    break;
                case this.OBLIQ:
                    a = Math.sin(this.lat0), d = 2 * Math.atan(this.ssfn_(this.lat0, a, this.e)) - Proj4js.common.HALF_PI, a *= this.e, this.akm1 = 2 * this.k0 * Math.cos(this.lat0) / Math.sqrt(1 - a * a), this.sinX1 =
                        Math.sin(d), this.cosX1 = Math.cos(d)
            }
        } else switch (this.mode) {
            case this.OBLIQ:
                this.sinph0 = Math.sin(this.lat0), this.cosph0 = Math.cos(this.lat0);
            case this.EQUIT:
                this.akm1 = 2 * this.k0;
                break;
            case this.S_POLE:
            case this.N_POLE:
                this.akm1 = Math.abs(this.phits - Proj4js.common.HALF_PI) >= Proj4js.common.EPSLN ? Math.cos(this.phits) / Math.tan(Proj4js.common.FORTPI - 0.5 * this.phits) : 2 * this.k0
        }
    },
    forward: function(a) {
        var d = a.x,
            d = Proj4js.common.adjust_lon(d - this.long0),
            b = a.y,
            f, e;
        if (this.sphere) {
            var g, k, l;
            g = Math.sin(b);
            k = Math.cos(b);
            l = Math.cos(d);
            d = Math.sin(d);
            switch (this.mode) {
                case this.EQUIT:
                    e = 1 + k * l;
                    e <= Proj4js.common.EPSLN && Proj4js.reportError("stere:forward:Equit");
                    e = this.akm1 / e;
                    f = e * k * d;
                    e *= g;
                    break;
                case this.OBLIQ:
                    e = 1 + this.sinph0 * g + this.cosph0 * k * l;
                    e <= Proj4js.common.EPSLN && Proj4js.reportError("stere:forward:Obliq");
                    e = this.akm1 / e;
                    f = e * k * d;
                    e *= this.cosph0 * g - this.sinph0 * k * l;
                    break;
                case this.N_POLE:
                    l = -l, b = -b;
                case this.S_POLE:
                    Math.abs(b - Proj4js.common.HALF_PI) < this.TOL && Proj4js.reportError("stere:forward:S_POLE"), e = this.akm1 * Math.tan(Proj4js.common.FORTPI +
                        0.5 * b), f = d * e, e *= l
            }
        } else {
            l = Math.cos(d);
            d = Math.sin(d);
            g = Math.sin(b);
            var h;
            if (this.mode == this.OBLIQ || this.mode == this.EQUIT) h = 2 * Math.atan(this.ssfn_(b, g, this.e)), k = Math.sin(h - Proj4js.common.HALF_PI), h = Math.cos(h);
            switch (this.mode) {
                case this.OBLIQ:
                    b = this.akm1 / (this.cosX1 * (1 + this.sinX1 * k + this.cosX1 * h * l));
                    e = b * (this.cosX1 * k - this.sinX1 * h * l);
                    f = b * h;
                    break;
                case this.EQUIT:
                    b = 2 * this.akm1 / (1 + h * l);
                    e = b * k;
                    f = b * h;
                    break;
                case this.S_POLE:
                    b = -b, l = -l, g = -g;
                case this.N_POLE:
                    f = this.akm1 * Proj4js.common.tsfnz(this.e, b, g), e = -f *
                        l
            }
            f *= d
        }
        a.x = f * this.a + this.x0;
        a.y = e * this.a + this.y0;
        return a
    },
    inverse: function(a) {
        var d = (a.x - this.x0) / this.a,
            b = (a.y - this.y0) / this.a,
            f, e, g, k = f = 0,
            l, h = g = 0;
        if (this.sphere) {
            k = Math.sqrt(d * d + b * b);
            h = 2 * Math.atan(k / this.akm1);
            g = Math.sin(h);
            h = Math.cos(h);
            f = 0;
            switch (this.mode) {
                case this.EQUIT:
                    e = Math.abs(k) <= Proj4js.common.EPSLN ? 0 : Math.asin(b * g / k);
                    if (0 != h || 0 != d) f = Math.atan2(d * g, h * k);
                    break;
                case this.OBLIQ:
                    e = Math.abs(k) <= Proj4js.common.EPSLN ? this.phi0 : Math.asin(h * this.sinph0 + b * g * this.cosph0 / k);
                    h -= this.sinph0 * Math.sin(e);
                    if (0 != h || 0 != d) f = Math.atan2(d * g * this.cosph0, h * k);
                    break;
                case this.N_POLE:
                    b = -b;
                case this.S_POLE:
                    e = Math.abs(k) <= Proj4js.common.EPSLN ? this.phi0 : Math.asin(this.mode == this.S_POLE ? -h : h), f = 0 == d && 0 == b ? 0 : Math.atan2(d, b)
            }
            a.x = Proj4js.common.adjust_lon(f + this.long0);
            a.y = e
        } else {
            l = Math.sqrt(d * d + b * b);
            switch (this.mode) {
                case this.OBLIQ:
                case this.EQUIT:
                    f = 2 * Math.atan2(l * this.cosX1, this.akm1);
                    g = Math.cos(f);
                    e = Math.sin(f);
                    k = 0 == l ? Math.asin(g * this.sinX1) : Math.asin(g * this.sinX1 + b * e * this.cosX1 / l);
                    f = Math.tan(0.5 * (Proj4js.common.HALF_PI +
                        k));
                    d *= e;
                    b = l * this.cosX1 * g - b * this.sinX1 * e;
                    h = Proj4js.common.HALF_PI;
                    g = 0.5 * this.e;
                    break;
                case this.N_POLE:
                    b = -b;
                case this.S_POLE:
                    f = -l / this.akm1, k = Proj4js.common.HALF_PI - 2 * Math.atan(f), h = -Proj4js.common.HALF_PI, g = -0.5 * this.e
            }
            for (l = this.NITER; l--; k = e)
                if (e = this.e * Math.sin(k), e = 2 * Math.atan(f * Math.pow((1 + e) / (1 - e), g)) - h, Math.abs(k - e) < this.CONV) return this.mode == this.S_POLE && (e = -e), f = 0 == d && 0 == b ? 0 : Math.atan2(d, b), a.x = Proj4js.common.adjust_lon(f + this.long0), a.y = e, a
        }
    }
};
Proj4js.Proj.nzmg = {
    iterations: 1,
    init: function() {
        this.A = [];
        this.A[1] = 0.6399175073;
        this.A[2] = -0.1358797613;
        this.A[3] = 0.063294409;
        this.A[4] = -0.02526853;
        this.A[5] = 0.0117879;
        this.A[6] = -0.0055161;
        this.A[7] = 0.0026906;
        this.A[8] = -0.001333;
        this.A[9] = 6.7E-4;
        this.A[10] = -3.4E-4;
        this.B_re = [];
        this.B_im = [];
        this.B_re[1] = 0.7557853228;
        this.B_im[1] = 0;
        this.B_re[2] = 0.249204646;
        this.B_im[2] = 0.003371507;
        this.B_re[3] = -0.001541739;
        this.B_im[3] = 0.04105856;
        this.B_re[4] = -0.10162907;
        this.B_im[4] = 0.01727609;
        this.B_re[5] = -0.26623489;
        this.B_im[5] = -0.36249218;
        this.B_re[6] = -0.6870983;
        this.B_im[6] = -1.1651967;
        this.C_re = [];
        this.C_im = [];
        this.C_re[1] = 1.3231270439;
        this.C_im[1] = 0;
        this.C_re[2] = -0.577245789;
        this.C_im[2] = -0.007809598;
        this.C_re[3] = 0.508307513;
        this.C_im[3] = -0.112208952;
        this.C_re[4] = -0.15094762;
        this.C_im[4] = 0.18200602;
        this.C_re[5] = 1.01418179;
        this.C_im[5] = 1.64497696;
        this.C_re[6] = 1.9660549;
        this.C_im[6] = 2.5127645;
        this.D = [];
        this.D[1] = 1.5627014243;
        this.D[2] = 0.5185406398;
        this.D[3] = -0.03333098;
        this.D[4] = -0.1052906;
        this.D[5] = -0.0368594;
        this.D[6] = 0.007317;
        this.D[7] = 0.0122;
        this.D[8] = 0.00394;
        this.D[9] = -0.0013
    },
    forward: function(a) {
        for (var d = 1E-5 * ((a.y - this.lat0) / Proj4js.common.SEC_TO_RAD), b = a.x - this.long0, f = 1, e = 0, g = 1; 10 >= g; g++) f *= d, e += this.A[g] * f;
        for (var d = e, f = 1, k = 0, l = 0, h = 0, g = 1; 6 >= g; g++) e = f * d - k * b, k = k * d + f * b, f = e, l = l + this.B_re[g] * f - this.B_im[g] * k, h = h + this.B_im[g] * f + this.B_re[g] * k;
        a.x = h * this.a + this.x0;
        a.y = l * this.a + this.y0;
        return a
    },
    inverse: function(a) {
        for (var d = (a.y - this.y0) / this.a, b = (a.x - this.x0) / this.a, f = 1, e = 0, g, k = 0, l = 0, h = 1; 6 >= h; h++) g =
            f * d - e * b, e = e * d + f * b, f = g, k = k + this.C_re[h] * f - this.C_im[h] * e, l = l + this.C_im[h] * f + this.C_re[h] * e;
        for (f = 0; f < this.iterations; f++) {
            var m = k,
                n = l,
                p;
            g = d;
            e = b;
            for (h = 2; 6 >= h; h++) p = m * k - n * l, n = n * k + m * l, m = p, g += (h - 1) * (this.B_re[h] * m - this.B_im[h] * n), e += (h - 1) * (this.B_im[h] * m + this.B_re[h] * n);
            for (var m = 1, n = 0, s = this.B_re[1], q = this.B_im[1], h = 2; 6 >= h; h++) p = m * k - n * l, n = n * k + m * l, m = p, s += h * (this.B_re[h] * m - this.B_im[h] * n), q += h * (this.B_im[h] * m + this.B_re[h] * n);
            l = s * s + q * q;
            k = (g * s + e * q) / l;
            l = (e * s - g * q) / l
        }
        d = k;
        b = 1;
        k = 0;
        for (h = 1; 9 >= h; h++) b *= d, k += this.D[h] *
            b;
        h = this.lat0 + 1E5 * k * Proj4js.common.SEC_TO_RAD;
        a.x = this.long0 + l;
        a.y = h;
        return a
    }
};
Proj4js.Proj.mill = {
    init: function() {},
    forward: function(a) {
        var d = a.y,
            b = this.x0 + this.a * Proj4js.common.adjust_lon(a.x - this.long0),
            d = this.y0 + 1.25 * this.a * Math.log(Math.tan(Proj4js.common.PI / 4 + d / 2.5));
        a.x = b;
        a.y = d;
        return a
    },
    inverse: function(a) {
        a.x -= this.x0;
        a.y -= this.y0;
        var d = Proj4js.common.adjust_lon(this.long0 + a.x / this.a),
            b = 2.5 * (Math.atan(Math.exp(0.8 * a.y / this.a)) - Proj4js.common.PI / 4);
        a.x = d;
        a.y = b;
        return a
    }
};
Proj4js.Proj.gnom = {
    init: function() {
        this.sin_p14 = Math.sin(this.lat0);
        this.cos_p14 = Math.cos(this.lat0);
        this.infinity_dist = 1E3 * this.a;
        this.rc = 1
    },
    forward: function(a) {
        var d, b, f, e, g;
        b = a.y;
        f = Proj4js.common.adjust_lon(a.x - this.long0);
        d = Math.sin(b);
        b = Math.cos(b);
        e = Math.cos(f);
        g = this.sin_p14 * d + this.cos_p14 * b * e;
        0 < g || Math.abs(g) <= Proj4js.common.EPSLN ? (f = this.x0 + 1 * this.a * b * Math.sin(f) / g, d = this.y0 + 1 * this.a * (this.cos_p14 * d - this.sin_p14 * b * e) / g) : (Proj4js.reportError("orthoFwdPointError"), f = this.x0 + this.infinity_dist *
            b * Math.sin(f), d = this.y0 + this.infinity_dist * (this.cos_p14 * d - this.sin_p14 * b * e));
        a.x = f;
        a.y = d;
        return a
    },
    inverse: function(a) {
        var d, b, f, e;
        a.x = (a.x - this.x0) / this.a;
        a.y = (a.y - this.y0) / this.a;
        a.x /= this.k0;
        a.y /= this.k0;
        (d = Math.sqrt(a.x * a.x + a.y * a.y)) ? (e = Math.atan2(d, this.rc), b = Math.sin(e), f = Math.cos(e), e = Proj4js.common.asinz(f * this.sin_p14 + a.y * b * this.cos_p14 / d), d = Math.atan2(a.x * b, d * this.cos_p14 * f - a.y * this.sin_p14 * b), d = Proj4js.common.adjust_lon(this.long0 + d)) : (e = this.phic0, d = 0);
        a.x = d;
        a.y = e;
        return a
    }
};
Proj4js.Proj.sinu = {
    init: function() {
        this.sphere ? (this.n = 1, this.es = this.m = 0, this.C_y = Math.sqrt((this.m + 1) / this.n), this.C_x = this.C_y / (this.m + 1)) : this.en = Proj4js.common.pj_enfn(this.es)
    },
    forward: function(a) {
        var d, b;
        d = a.x;
        b = a.y;
        d = Proj4js.common.adjust_lon(d - this.long0);
        if (this.sphere) {
            if (this.m)
                for (var f = this.n * Math.sin(b), e = Proj4js.common.MAX_ITER; e; --e) {
                    var g = (this.m * b + Math.sin(b) - f) / (this.m + Math.cos(b));
                    b -= g;
                    if (Math.abs(g) < Proj4js.common.EPSLN) break
                } else b = 1 != this.n ? Math.asin(this.n * Math.sin(b)) : b;
            d = this.a * this.C_x * d * (this.m + Math.cos(b));
            b = b * this.a * this.C_y
        } else f = Math.sin(b), e = Math.cos(b), b = this.a * Proj4js.common.pj_mlfn(b, f, e, this.en), d = this.a * d * e / Math.sqrt(1 - this.es * f * f);
        a.x = d;
        a.y = b;
        return a
    },
    inverse: function(a) {
        var d, b;
        a.x -= this.x0;
        a.y -= this.y0;
        if (this.sphere) a.y /= this.C_y, d = this.m ? Math.asin((this.m * a.y + Math.sin(a.y)) / this.n) : 1 != this.n ? Math.asin(Math.sin(a.y) / this.n) : a.y, b = a.x / (this.C_x * (this.m + Math.cos(a.y)));
        else {
            d = Proj4js.common.pj_inv_mlfn(a.y / this.a, this.es, this.en);
            var f = Math.abs(d);
            f < Proj4js.common.HALF_PI ? (f = Math.sin(d), b = this.long0 + a.x * Math.sqrt(1 - this.es * f * f) / (this.a * Math.cos(d)), b = Proj4js.common.adjust_lon(b)) : f - Proj4js.common.EPSLN < Proj4js.common.HALF_PI && (b = this.long0)
        }
        a.x = b;
        a.y = d;
        return a
    }
};
Proj4js.Proj.vandg = {
    init: function() {
        this.R = 6370997
    },
    forward: function(a) {
        var d = a.y,
            b = Proj4js.common.adjust_lon(a.x - this.long0);
        Math.abs(d);
        var f = Proj4js.common.asinz(2 * Math.abs(d / Proj4js.common.PI));
        (Math.abs(b) <= Proj4js.common.EPSLN || Math.abs(Math.abs(d) - Proj4js.common.HALF_PI) <= Proj4js.common.EPSLN) && Math.tan(0.5 * f);
        var e = 0.5 * Math.abs(Proj4js.common.PI / b - b / Proj4js.common.PI),
            g = e * e,
            k = Math.sin(f),
            f = Math.cos(f),
            f = f / (k + f - 1),
            k = f * (2 / k - 1),
            k = k * k,
            g = Proj4js.common.PI * this.R * (e * (f - k) + Math.sqrt(g * (f - k) * (f - k) -
                (k + g) * (f * f - k))) / (k + g);
        0 > b && (g = -g);
        b = this.x0 + g;
        g = Math.abs(g / (Proj4js.common.PI * this.R));
        d = 0 <= d ? this.y0 + Proj4js.common.PI * this.R * Math.sqrt(1 - g * g - 2 * e * g) : this.y0 - Proj4js.common.PI * this.R * Math.sqrt(1 - g * g - 2 * e * g);
        a.x = b;
        a.y = d;
        return a
    },
    inverse: function(a) {
        var d, b, f, e, g, k, l, h;
        a.x -= this.x0;
        a.y -= this.y0;
        h = Proj4js.common.PI * this.R;
        d = a.x / h;
        f = a.y / h;
        e = d * d + f * f;
        g = -Math.abs(f) * (1 + e);
        b = g - 2 * f * f + d * d;
        k = -2 * g + 1 + 2 * f * f + e * e;
        h = f * f / k + (2 * b * b * b / k / k / k - 9 * g * b / k / k) / 27;
        l = (g - b * b / 3 / k) / k;
        g = 2 * Math.sqrt(-l / 3);
        h = 3 * h / l / g;
        1 < Math.abs(h) && (h =
            0 <= h ? 1 : -1);
        h = Math.acos(h) / 3;
        b = 0 <= a.y ? (-g * Math.cos(h + Proj4js.common.PI / 3) - b / 3 / k) * Proj4js.common.PI : -(-g * Math.cos(h + Proj4js.common.PI / 3) - b / 3 / k) * Proj4js.common.PI;
        Math.abs(d);
        d = Proj4js.common.adjust_lon(this.long0 + Proj4js.common.PI * (e - 1 + Math.sqrt(1 + 2 * (d * d - f * f) + e * e)) / 2 / d);
        a.x = d;
        a.y = b;
        return a
    }
};
Proj4js.Proj.cea = {
    init: function() {},
    forward: function(a) {
        var d = a.y,
            b = this.x0 + this.a * Proj4js.common.adjust_lon(a.x - this.long0) * Math.cos(this.lat_ts),
            d = this.y0 + this.a * Math.sin(d) / Math.cos(this.lat_ts);
        a.x = b;
        a.y = d;
        return a
    },
    inverse: function(a) {
        a.x -= this.x0;
        a.y -= this.y0;
        var d = Proj4js.common.adjust_lon(this.long0 + a.x / this.a / Math.cos(this.lat_ts)),
            b = Math.asin(a.y / this.a * Math.cos(this.lat_ts));
        a.x = d;
        a.y = b;
        return a
    }
};
Proj4js.Proj.eqc = {
    init: function() {
        this.x0 || (this.x0 = 0);
        this.y0 || (this.y0 = 0);
        this.lat0 || (this.lat0 = 0);
        this.long0 || (this.long0 = 0);
        this.lat_ts || (this.lat_ts = 0);
        this.title || (this.title = "Equidistant Cylindrical (Plate Carre)");
        this.rc = Math.cos(this.lat_ts)
    },
    forward: function(a) {
        var d = a.y,
            b = Proj4js.common.adjust_lon(a.x - this.long0),
            d = Proj4js.common.adjust_lat(d - this.lat0);
        a.x = this.x0 + this.a * b * this.rc;
        a.y = this.y0 + this.a * d;
        return a
    },
    inverse: function(a) {
        var d = a.y;
        a.x = Proj4js.common.adjust_lon(this.long0 + (a.x -
            this.x0) / (this.a * this.rc));
        a.y = Proj4js.common.adjust_lat(this.lat0 + (d - this.y0) / this.a);
        return a
    }
};
Proj4js.Proj.cass = {
    init: function() {
        this.sphere || (this.en = Proj4js.common.pj_enfn(this.es), this.m0 = Proj4js.common.pj_mlfn(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en))
    },
    C1: 0.16666666666666666,
    C2: 0.008333333333333333,
    C3: 0.041666666666666664,
    C4: 0.3333333333333333,
    C5: 0.06666666666666667,
    forward: function(a) {
        var d, b, f = a.x,
            e = a.y,
            f = Proj4js.common.adjust_lon(f - this.long0);
        this.sphere ? (d = Math.asin(Math.cos(e) * Math.sin(f)), b = Math.atan2(Math.tan(e), Math.cos(f)) - this.phi0) : (this.n = Math.sin(e), this.c =
            Math.cos(e), b = Proj4js.common.pj_mlfn(e, this.n, this.c, this.en), this.n = 1 / Math.sqrt(1 - this.es * this.n * this.n), this.tn = Math.tan(e), this.t = this.tn * this.tn, this.a1 = f * this.c, this.c *= this.es * this.c / (1 - this.es), this.a2 = this.a1 * this.a1, d = this.n * this.a1 * (1 - this.a2 * this.t * (this.C1 - (8 - this.t + 8 * this.c) * this.a2 * this.C2)), b -= this.m0 - this.n * this.tn * this.a2 * (0.5 + (5 - this.t + 6 * this.c) * this.a2 * this.C3));
        a.x = this.a * d + this.x0;
        a.y = this.a * b + this.y0;
        return a
    },
    inverse: function(a) {
        a.x -= this.x0;
        a.y -= this.y0;
        var d = a.x / this.a,
            b =
            a.y / this.a;
        if (this.sphere) this.dd = b + this.lat0, b = Math.asin(Math.sin(this.dd) * Math.cos(d)), d = Math.atan2(Math.tan(d), Math.cos(this.dd));
        else {
            var f = Proj4js.common.pj_inv_mlfn(this.m0 + b, this.es, this.en);
            this.tn = Math.tan(f);
            this.t = this.tn * this.tn;
            this.n = Math.sin(f);
            this.r = 1 / (1 - this.es * this.n * this.n);
            this.n = Math.sqrt(this.r);
            this.r = this.r * (1 - this.es) * this.n;
            this.dd = d / this.n;
            this.d2 = this.dd * this.dd;
            b = f - this.n * this.tn / this.r * this.d2 * (0.5 - (1 + 3 * this.t) * this.d2 * this.C3);
            d = this.dd * (1 + this.t * this.d2 * (-this.C4 +
                (1 + 3 * this.t) * this.d2 * this.C5)) / Math.cos(f)
        }
        a.x = Proj4js.common.adjust_lon(this.long0 + d);
        a.y = b;
        return a
    }
};
Proj4js.Proj.gauss = {
    init: function() {
        var a = Math.sin(this.lat0),
            d = Math.cos(this.lat0),
            d = d * d;
        this.rc = Math.sqrt(1 - this.es) / (1 - this.es * a * a);
        this.C = Math.sqrt(1 + this.es * d * d / (1 - this.es));
        this.phic0 = Math.asin(a / this.C);
        this.ratexp = 0.5 * this.C * this.e;
        this.K = Math.tan(0.5 * this.phic0 + Proj4js.common.FORTPI) / (Math.pow(Math.tan(0.5 * this.lat0 + Proj4js.common.FORTPI), this.C) * Proj4js.common.srat(this.e * a, this.ratexp))
    },
    forward: function(a) {
        var d = a.x,
            b = a.y;
        a.y = 2 * Math.atan(this.K * Math.pow(Math.tan(0.5 * b + Proj4js.common.FORTPI),
            this.C) * Proj4js.common.srat(this.e * Math.sin(b), this.ratexp)) - Proj4js.common.HALF_PI;
        a.x = this.C * d;
        return a
    },
    inverse: function(a) {
        for (var d = a.x / this.C, b = a.y, f = Math.pow(Math.tan(0.5 * b + Proj4js.common.FORTPI) / this.K, 1 / this.C), e = Proj4js.common.MAX_ITER; 0 < e; --e) {
            b = 2 * Math.atan(f * Proj4js.common.srat(this.e * Math.sin(a.y), -0.5 * this.e)) - Proj4js.common.HALF_PI;
            if (1E-14 > Math.abs(b - a.y)) break;
            a.y = b
        }
        if (!e) return Proj4js.reportError("gauss:inverse:convergence failed"), null;
        a.x = d;
        a.y = b;
        return a
    }
};
Proj4js.Proj.omerc = {
    init: function() {
        this.mode || (this.mode = 0);
        this.lon1 || (this.lon1 = 0, this.mode = 1);
        this.lon2 || (this.lon2 = 0);
        this.lat2 || (this.lat2 = 0);
        var a = 1 - Math.pow(this.b / this.a, 2);
        Math.sqrt(a);
        this.sin_p20 = Math.sin(this.lat0);
        this.cos_p20 = Math.cos(this.lat0);
        this.con = 1 - this.es * this.sin_p20 * this.sin_p20;
        this.com = Math.sqrt(1 - a);
        this.bl = Math.sqrt(1 + this.es * Math.pow(this.cos_p20, 4) / (1 - a));
        this.al = this.a * this.bl * this.k0 * this.com / this.con;
        Math.abs(this.lat0) < Proj4js.common.EPSLN ? this.el = this.d = this.ts =
            1 : (this.ts = Proj4js.common.tsfnz(this.e, this.lat0, this.sin_p20), this.con = Math.sqrt(this.con), this.d = this.bl * this.com / (this.cos_p20 * this.con), this.f = 0 < this.d * this.d - 1 ? 0 <= this.lat0 ? this.d + Math.sqrt(this.d * this.d - 1) : this.d - Math.sqrt(this.d * this.d - 1) : this.d, this.el = this.f * Math.pow(this.ts, this.bl));
        0 != this.mode ? (this.g = 0.5 * (this.f - 1 / this.f), this.gama = Proj4js.common.asinz(Math.sin(this.alpha) / this.d), this.longc -= Proj4js.common.asinz(this.g * Math.tan(this.gama)) / this.bl, this.con = Math.abs(this.lat0), this.con >
            Proj4js.common.EPSLN && Math.abs(this.con - Proj4js.common.HALF_PI) > Proj4js.common.EPSLN ? (this.singam = Math.sin(this.gama), this.cosgam = Math.cos(this.gama), this.sinaz = Math.sin(this.alpha), this.cosaz = Math.cos(this.alpha), this.u = 0 <= this.lat0 ? this.al / this.bl * Math.atan(Math.sqrt(this.d * this.d - 1) / this.cosaz) : -(this.al / this.bl) * Math.atan(Math.sqrt(this.d * this.d - 1) / this.cosaz)) : Proj4js.reportError("omerc:Init:DataError")) : (this.sinphi = Math.sin(this.at1), this.ts1 = Proj4js.common.tsfnz(this.e, this.lat1, this.sinphi),
            this.sinphi = Math.sin(this.lat2), this.ts2 = Proj4js.common.tsfnz(this.e, this.lat2, this.sinphi), this.h = Math.pow(this.ts1, this.bl), this.l = Math.pow(this.ts2, this.bl), this.f = this.el / this.h, this.g = 0.5 * (this.f - 1 / this.f), this.j = (this.el * this.el - this.l * this.h) / (this.el * this.el + this.l * this.h), this.p = (this.l - this.h) / (this.l + this.h), this.dlon = this.lon1 - this.lon2, this.dlon < -Proj4js.common.PI && (this.lon2 -= 2 * Proj4js.common.PI), this.dlon > Proj4js.common.PI && (this.lon2 += 2 * Proj4js.common.PI), this.dlon = this.lon1 - this.lon2,
            this.longc = 0.5 * (this.lon1 + this.lon2) - Math.atan(this.j * Math.tan(0.5 * this.bl * this.dlon) / this.p) / this.bl, this.dlon = Proj4js.common.adjust_lon(this.lon1 - this.longc), this.gama = Math.atan(Math.sin(this.bl * this.dlon) / this.g), this.alpha = Proj4js.common.asinz(this.d * Math.sin(this.gama)), Math.abs(this.lat1 - this.lat2) <= Proj4js.common.EPSLN ? Proj4js.reportError("omercInitDataError") : this.con = Math.abs(this.lat1), this.con <= Proj4js.common.EPSLN || Math.abs(this.con - Proj4js.common.HALF_PI) <= Proj4js.common.EPSLN ? Proj4js.reportError("omercInitDataError") :
            Math.abs(Math.abs(this.lat0) - Proj4js.common.HALF_PI) <= Proj4js.common.EPSLN && Proj4js.reportError("omercInitDataError"), this.singam = Math.sin(this.gam), this.cosgam = Math.cos(this.gam), this.sinaz = Math.sin(this.alpha), this.cosaz = Math.cos(this.alpha), this.u = 0 <= this.lat0 ? this.al / this.bl * Math.atan(Math.sqrt(this.d * this.d - 1) / this.cosaz) : -(this.al / this.bl) * Math.atan(Math.sqrt(this.d * this.d - 1) / this.cosaz))
    },
    forward: function(a) {
        var d, b, f, e, g;
        f = a.x;
        b = a.y;
        d = Math.sin(b);
        e = Proj4js.common.adjust_lon(f - this.longc);
        f = Math.sin(this.bl * e);
        Math.abs(Math.abs(b) - Proj4js.common.HALF_PI) > Proj4js.common.EPSLN ? (d = Proj4js.common.tsfnz(this.e, b, d), d = this.el / Math.pow(d, this.bl), g = 0.5 * (d - 1 / d), d = (g * this.singam - f * this.cosgam) / (0.5 * (d + 1 / d)), b = Math.cos(this.bl * e), 1E-7 > Math.abs(b) ? f = this.al * this.bl * e : (f = this.al * Math.atan((g * this.cosgam + f * this.singam) / b) / this.bl, 0 > b && (f += Proj4js.common.PI * this.al / this.bl))) : (d = 0 <= b ? this.singam : -this.singam, f = this.al * b / this.bl);
        Math.abs(Math.abs(d) - 1) <= Proj4js.common.EPSLN && Proj4js.reportError("omercFwdInfinity");
        e = 0.5 * this.al * Math.log((1 - d) / (1 + d)) / this.bl;
        f -= this.u;
        d = this.y0 + f * this.cosaz - e * this.sinaz;
        a.x = this.x0 + e * this.cosaz + f * this.sinaz;
        a.y = d;
        return a
    },
    inverse: function(a) {
        var d, b, f, e;
        a.x -= this.x0;
        a.y -= this.y0;
        d = a.x * this.cosaz - a.y * this.sinaz;
        f = a.y * this.cosaz + a.x * this.sinaz;
        f += this.u;
        b = Math.exp(-this.bl * d / this.al);
        d = 0.5 * (b - 1 / b);
        b = 0.5 * (b + 1 / b);
        f = Math.sin(this.bl * f / this.al);
        e = (f * this.cosgam + d * this.singam) / b;
        Math.abs(Math.abs(e) - 1) <= Proj4js.common.EPSLN ? (d = this.longc, e = 0 <= e ? Proj4js.common.HALF_PI : -Proj4js.common.HALF_PI) :
            (b = 1 / this.bl, e = Math.pow(this.el / Math.sqrt((1 + e) / (1 - e)), b), e = Proj4js.common.phi2z(this.e, e), d = this.longc - Math.atan2(d * this.cosgam - f * this.singam, b) / this.bl, d = Proj4js.common.adjust_lon(d));
        a.x = d;
        a.y = e;
        return a
    }
};
Proj4js.Proj.lcc = {
    init: function() {
        this.lat2 || (this.lat2 = this.lat0);
        this.k0 || (this.k0 = 1);
        if (Math.abs(this.lat1 + this.lat2) < Proj4js.common.EPSLN) Proj4js.reportError("lcc:init: Equal Latitudes");
        else {
            var a = this.b / this.a;
            this.e = Math.sqrt(1 - a * a);
            var a = Math.sin(this.lat1),
                d = Math.cos(this.lat1),
                d = Proj4js.common.msfnz(this.e, a, d),
                b = Proj4js.common.tsfnz(this.e, this.lat1, a),
                f = Math.sin(this.lat2),
                e = Math.cos(this.lat2),
                e = Proj4js.common.msfnz(this.e, f, e),
                f = Proj4js.common.tsfnz(this.e, this.lat2, f),
                g = Proj4js.common.tsfnz(this.e,
                    this.lat0, Math.sin(this.lat0));
            this.ns = Math.abs(this.lat1 - this.lat2) > Proj4js.common.EPSLN ? Math.log(d / e) / Math.log(b / f) : a;
            this.f0 = d / (this.ns * Math.pow(b, this.ns));
            this.rh = this.a * this.f0 * Math.pow(g, this.ns);
            this.title || (this.title = "Lambert Conformal Conic")
        }
    },
    forward: function(a) {
        var d = a.x,
            b = a.y;
        if (!(90 >= b && -90 <= b && 180 >= d && -180 <= d)) return Proj4js.reportError("lcc:forward: llInputOutOfRange: " + d + " : " + b), null;
        var f = Math.abs(Math.abs(b) - Proj4js.common.HALF_PI);
        if (f > Proj4js.common.EPSLN) b = Proj4js.common.tsfnz(this.e,
            b, Math.sin(b)), b = this.a * this.f0 * Math.pow(b, this.ns);
        else {
            f = b * this.ns;
            if (0 >= f) return Proj4js.reportError("lcc:forward: No Projection"), null;
            b = 0
        }
        d = this.ns * Proj4js.common.adjust_lon(d - this.long0);
        a.x = this.k0 * b * Math.sin(d) + this.x0;
        a.y = this.k0 * (this.rh - b * Math.cos(d)) + this.y0;
        return a
    },
    inverse: function(a) {
        var d, b, f, e = (a.x - this.x0) / this.k0,
            g = this.rh - (a.y - this.y0) / this.k0;
        0 < this.ns ? (d = Math.sqrt(e * e + g * g), b = 1) : (d = -Math.sqrt(e * e + g * g), b = -1);
        f = 0;
        0 != d && (f = Math.atan2(b * e, b * g));
        if (0 != d || 0 < this.ns) {
            if (b = 1 / this.ns,
                d = Math.pow(d / (this.a * this.f0), b), d = Proj4js.common.phi2z(this.e, d), -9999 == d) return null
        } else d = -Proj4js.common.HALF_PI;
        f = Proj4js.common.adjust_lon(f / this.ns + this.long0);
        a.x = f;
        a.y = d;
        return a
    }
};
Proj4js.Proj.laea = {
    S_POLE: 1,
    N_POLE: 2,
    EQUIT: 3,
    OBLIQ: 4,
    init: function() {
        var a = Math.abs(this.lat0);
        this.mode = Math.abs(a - Proj4js.common.HALF_PI) < Proj4js.common.EPSLN ? 0 > this.lat0 ? this.S_POLE : this.N_POLE : Math.abs(a) < Proj4js.common.EPSLN ? this.EQUIT : this.OBLIQ;
        if (0 < this.es) switch (this.qp = Proj4js.common.qsfnz(this.e, 1), this.mmf = 0.5 / (1 - this.es), this.apa = this.authset(this.es), this.mode) {
            case this.N_POLE:
            case this.S_POLE:
                this.dd = 1;
                break;
            case this.EQUIT:
                this.rq = Math.sqrt(0.5 * this.qp);
                this.dd = 1 / this.rq;
                this.xmf =
                    1;
                this.ymf = 0.5 * this.qp;
                break;
            case this.OBLIQ:
                this.rq = Math.sqrt(0.5 * this.qp), a = Math.sin(this.lat0), this.sinb1 = Proj4js.common.qsfnz(this.e, a) / this.qp, this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1), this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * a * a) * this.rq * this.cosb1), this.ymf = (this.xmf = this.rq) / this.dd, this.xmf *= this.dd
        } else this.mode == this.OBLIQ && (this.sinph0 = Math.sin(this.lat0), this.cosph0 = Math.cos(this.lat0))
    },
    forward: function(a) {
        var d, b, f = a.x,
            e = a.y,
            f = Proj4js.common.adjust_lon(f - this.long0);
        if (this.sphere) {
            var g,
                k, l;
            l = Math.sin(e);
            k = Math.cos(e);
            g = Math.cos(f);
            switch (this.mode) {
                case this.OBLIQ:
                case this.EQUIT:
                    b = this.mode == this.EQUIT ? 1 + k * g : 1 + this.sinph0 * l + this.cosph0 * k * g;
                    if (b <= Proj4js.common.EPSLN) return Proj4js.reportError("laea:fwd:y less than eps"), null;
                    b = Math.sqrt(2 / b);
                    d = b * k * Math.sin(f);
                    b *= this.mode == this.EQUIT ? l : this.cosph0 * l - this.sinph0 * k * g;
                    break;
                case this.N_POLE:
                    g = -g;
                case this.S_POLE:
                    if (Math.abs(e + this.phi0) < Proj4js.common.EPSLN) return Proj4js.reportError("laea:fwd:phi < eps"), null;
                    b = Proj4js.common.FORTPI -
                        0.5 * e;
                    b = 2 * (this.mode == this.S_POLE ? Math.cos(b) : Math.sin(b));
                    d = b * Math.sin(f);
                    b *= g
            }
        } else {
            var h = k = 0,
                m = 0;
            g = Math.cos(f);
            f = Math.sin(f);
            l = Math.sin(e);
            l = Proj4js.common.qsfnz(this.e, l);
            if (this.mode == this.OBLIQ || this.mode == this.EQUIT) k = l / this.qp, h = Math.sqrt(1 - k * k);
            switch (this.mode) {
                case this.OBLIQ:
                    m = 1 + this.sinb1 * k + this.cosb1 * h * g;
                    break;
                case this.EQUIT:
                    m = 1 + h * g;
                    break;
                case this.N_POLE:
                    m = Proj4js.common.HALF_PI + e;
                    l = this.qp - l;
                    break;
                case this.S_POLE:
                    m = e - Proj4js.common.HALF_PI, l = this.qp + l
            }
            if (Math.abs(m) < Proj4js.common.EPSLN) return Proj4js.reportError("laea:fwd:b < eps"),
                null;
            switch (this.mode) {
                case this.OBLIQ:
                case this.EQUIT:
                    m = Math.sqrt(2 / m);
                    b = this.mode == this.OBLIQ ? this.ymf * m * (this.cosb1 * k - this.sinb1 * h * g) : (m = Math.sqrt(2 / (1 + h * g))) * k * this.ymf;
                    d = this.xmf * m * h * f;
                    break;
                case this.N_POLE:
                case this.S_POLE:
                    0 <= l ? (d = (m = Math.sqrt(l)) * f, b = g * (this.mode == this.S_POLE ? m : -m)) : d = b = 0
            }
        }
        a.x = this.a * d + this.x0;
        a.y = this.a * b + this.y0;
        return a
    },
    inverse: function(a) {
        a.x -= this.x0;
        a.y -= this.y0;
        var d = a.x / this.a,
            b = a.y / this.a,
            f;
        if (this.sphere) {
            var e = 0,
                g, k = 0;
            g = Math.sqrt(d * d + b * b);
            f = 0.5 * g;
            if (1 < f) return Proj4js.reportError("laea:Inv:DataError"),
                null;
            f = 2 * Math.asin(f);
            if (this.mode == this.OBLIQ || this.mode == this.EQUIT) k = Math.sin(f), e = Math.cos(f);
            switch (this.mode) {
                case this.EQUIT:
                    f = Math.abs(g) <= Proj4js.common.EPSLN ? 0 : Math.asin(b * k / g);
                    d *= k;
                    b = e * g;
                    break;
                case this.OBLIQ:
                    f = Math.abs(g) <= Proj4js.common.EPSLN ? this.phi0 : Math.asin(e * this.sinph0 + b * k * this.cosph0 / g);
                    d = d * k * this.cosph0;
                    b = (e - Math.sin(f) * this.sinph0) * g;
                    break;
                case this.N_POLE:
                    b = -b;
                    f = Proj4js.common.HALF_PI - f;
                    break;
                case this.S_POLE:
                    f -= Proj4js.common.HALF_PI
            }
            d = 0 != b || this.mode != this.EQUIT && this.mode !=
                this.OBLIQ ? Math.atan2(d, b) : 0
        } else {
            f = 0;
            switch (this.mode) {
                case this.EQUIT:
                case this.OBLIQ:
                    d /= this.dd;
                    b *= this.dd;
                    k = Math.sqrt(d * d + b * b);
                    if (k < Proj4js.common.EPSLN) return a.x = 0, a.y = this.phi0, a;
                    g = 2 * Math.asin(0.5 * k / this.rq);
                    e = Math.cos(g);
                    d *= g = Math.sin(g);
                    this.mode == this.OBLIQ ? (f = e * this.sinb1 + b * g * this.cosb1 / k, b = k * this.cosb1 * e - b * this.sinb1 * g) : (f = b * g / k, b = k * e);
                    break;
                case this.N_POLE:
                    b = -b;
                case this.S_POLE:
                    f = d * d + b * b;
                    if (!f) return a.x = 0, a.y = this.phi0, a;
                    f = 1 - f / this.qp;
                    this.mode == this.S_POLE && (f = -f)
            }
            d = Math.atan2(d, b);
            f = this.authlat(Math.asin(f), this.apa)
        }
        a.x = Proj4js.common.adjust_lon(this.long0 + d);
        a.y = f;
        return a
    },
    P00: 0.3333333333333333,
    P01: 0.17222222222222222,
    P02: 0.10257936507936508,
    P10: 0.06388888888888888,
    P11: 0.0664021164021164,
    P20: 0.016415012942191543,
    authset: function(a) {
        var d, b = [];
        b[0] = a * this.P00;
        d = a * a;
        b[0] += d * this.P01;
        b[1] = d * this.P10;
        d *= a;
        b[0] += d * this.P02;
        b[1] += d * this.P11;
        b[2] = d * this.P20;
        return b
    },
    authlat: function(a, d) {
        var b = a + a;
        return a + d[0] * Math.sin(b) + d[1] * Math.sin(b + b) + d[2] * Math.sin(b + b + b)
    }
};
Proj4js.Proj.aeqd = {
    init: function() {
        this.sin_p12 = Math.sin(this.lat0);
        this.cos_p12 = Math.cos(this.lat0)
    },
    forward: function(a) {
        var d = a.x,
            b, f = Math.sin(a.y),
            e = Math.cos(a.y),
            d = Proj4js.common.adjust_lon(d - this.long0),
            g = Math.cos(d),
            k = this.sin_p12 * f + this.cos_p12 * e * g;
        if (Math.abs(Math.abs(k) - 1) < Proj4js.common.EPSLN) {
            if (b = 1, 0 > k) {
                Proj4js.reportError("aeqd:Fwd:PointError");
                return
            }
        } else b = Math.acos(k), b /= Math.sin(b);
        a.x = this.x0 + this.a * b * e * Math.sin(d);
        a.y = this.y0 + this.a * b * (this.cos_p12 * f - this.sin_p12 * e * g);
        return a
    },
    inverse: function(a) {
        a.x -= this.x0;
        a.y -= this.y0;
        var d = Math.sqrt(a.x * a.x + a.y * a.y);
        if (d > 2 * Proj4js.common.HALF_PI * this.a) Proj4js.reportError("aeqdInvDataError");
        else {
            var b = d / this.a,
                f = Math.sin(b),
                b = Math.cos(b),
                e = this.long0,
                g;
            if (Math.abs(d) <= Proj4js.common.EPSLN) g = this.lat0;
            else {
                g = Proj4js.common.asinz(b * this.sin_p12 + a.y * f * this.cos_p12 / d);
                var k = Math.abs(this.lat0) - Proj4js.common.HALF_PI;
                Math.abs(k) <= Proj4js.common.EPSLN ? e = 0 <= this.lat0 ? Proj4js.common.adjust_lon(this.long0 + Math.atan2(a.x, -a.y)) : Proj4js.common.adjust_lon(this.long0 -
                    Math.atan2(-a.x, a.y)) : (k = b - this.sin_p12 * Math.sin(g), Math.abs(k) < Proj4js.common.EPSLN && Math.abs(a.x) < Proj4js.common.EPSLN || (Math.atan2(a.x * f * this.cos_p12, k * d), e = Proj4js.common.adjust_lon(this.long0 + Math.atan2(a.x * f * this.cos_p12, k * d))))
            }
            a.x = e;
            a.y = g;
            return a
        }
    }
};
Proj4js.Proj.moll = {
    init: function() {},
    forward: function(a) {
        for (var d = a.y, b = Proj4js.common.adjust_lon(a.x - this.long0), f = d, e = Proj4js.common.PI * Math.sin(d), g = 0;; g++) {
            var k = -(f + Math.sin(f) - e) / (1 + Math.cos(f)),
                f = f + k;
            if (Math.abs(k) < Proj4js.common.EPSLN) break;
            50 <= g && Proj4js.reportError("moll:Fwd:IterationError")
        }
        f /= 2;
        Proj4js.common.PI / 2 - Math.abs(d) < Proj4js.common.EPSLN && (b = 0);
        d = 0.900316316158 * this.a * b * Math.cos(f) + this.x0;
        f = 1.4142135623731 * this.a * Math.sin(f) + this.y0;
        a.x = d;
        a.y = f;
        return a
    },
    inverse: function(a) {
        var d;
        a.x -= this.x0;
        d = a.y / (1.4142135623731 * this.a);
        0.999999999999 < Math.abs(d) && (d = 0.999999999999);
        d = Math.asin(d);
        var b = Proj4js.common.adjust_lon(this.long0 + a.x / (0.900316316158 * this.a * Math.cos(d)));
        b < -Proj4js.common.PI && (b = -Proj4js.common.PI);
        b > Proj4js.common.PI && (b = Proj4js.common.PI);
        d = (2 * d + Math.sin(2 * d)) / Proj4js.common.PI;
        1 < Math.abs(d) && (d = 1);
        d = Math.asin(d);
        a.x = b;
        a.y = d;
        return a
    }
};

function WMTSLayer(a, d, b, f) {
    function e(a) {
        a = a.Contents.TileMatrixSet;
        if ("undefined" != typeof a.length)
            for (var d = 0; d < a.length; d++) {
                var e = a[d]["ows:Identifier"];
                if (e && e == b.matrixSet) {
                    w = a[d];
                    break
                }
                w = a[0]
            } else w = a;
        return w
    }
    var g = f.left,
        k = f.top,
        l = f.right,
        h = f.bottom,
        m = "auto",
        n = [],
        p = document.createElement("div"),
        s, q = !1,
        v = this,
        x = 0,
        A = 0,
        B = 0,
        D = 0,
        y = 1;
    f.opacity && (y = f.opacity);
    var z = 0,
        w = null;
    p.style.position = "absolute";
    p.style.left = "0px";
    p.style.top = "0px";
    p.style.width = "100%";
    p.style.height = "100%";
    document.createElement("img");
    var t;
    this.getMatrixSetId = function() {
        return w["ows:Identifier"]
    };
    this.getThemeTile = function() {};
    this.setTileOpacity = function(a) {
        if ("number" == typeof a)
            for (y = a, a = 0; a < n.length; a++)
                for (var b = 0; b < n[a].length; b++) null != n[a][b] && (n[a][b].style.opacity = y, n[a][b].style.filter = "alpha(opacity=" + 100 * y + ")")
    };
    this.setZIndex = function(a) {
        m = a;
        p && (p.style.zIndex = m)
    };
    this.getZIndex = function() {
        return m
    };
    this.RemoveSelf = function() {
        s.getHObject().removeChild(p)
    };
    this.getTiles = function(d, f, g, h, k, l) {
        TGOS.getJSON(a, function(m) {
            var n =
                m.Capabilities,
                t = m = 0,
                p = [],
                s = [];
            if (!n) throw "Service Error";
            var n = e(n),
                q = n.TileMatrix[k].TopLeftCorner,
                v = parseFloat(q.split(" ")[0]),
                w = parseFloat(q.split(" ")[1]),
                q = parseFloat(n.TileMatrix[k].ScaleDenominator),
                y = 0.07168 * q,
                B, v = d < v ? 0 : Math.floor((d - v) / y);
            B = v + Math.ceil(Math.abs(d - g) / y);
            w = f > w ? 0 : Math.floor((w - f) / y) - 1;
            y = w + Math.ceil(Math.abs(h - f) / y);
            idxRange = {
                lowerX: v,
                upperX: B,
                lowerY: w,
                upperY: y
            };
            for (y = idxRange.lowerY; y < idxRange.upperY; y++)
                for (v = idxRange.lowerX; v < idxRange.upperX; v++) m += v * q, t += y * q, s.push(m + "," +
                    t), p.push(a + "?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&Layer=" + b.layer + "&Style=default&Format=image/png&TileMatrixSet=" + b.matrixSet + "&TileMatrix=" + n.TileMatrix[k]["ows:Identifier"] + "&TileRow=" + y + "&TileCol=" + v);
            l.call(this, {
                leftTopAnchor: s,
                imageUrl: p
            })
        }, TGOS.PROXY_SERVICE2)
    };
    this.Initialize = function(b) {
        s = b;
        p.style.zIndex = this.getZIndex();
        s.getHObject().appendChild(p);
        TGOS.getJSON(a, function(a) {
                t = a.Capabilities;
                if (!t) throw "Service Error";
                e(t);
                f && (g = f.left, l = f.right, k = f.top, h = f.bottom);
                q = !0;
                v.RebuildElement()
            },
            TGOS.PROXY_SERVICE2)
    };
    this.UpdateElement = function() {
        if (q && w)
            for (var a = w.TileMatrix[z].TopLeftCorner, b = parseFloat(a.split(" ")[0]), a = parseFloat(a.split(" ")[1]), b = s.FromMapPoint(b, a), a = 0; a < n.length; a++)
                for (var d = 0; d < n[a].length; d++) {
                    var e = 256 * n[a][d].yIdx;
                    n[a][d].style.left = b.x + 256 * n[a][d].xIdx + "px";
                    n[a][d].style.top = b.y + e + "px"
                }
    };
    this.putVisible = function(a) {
        p.style.display = a ? "inline" : "none"
    };
    this.RebuildElement = function() {
        if (q && w) {
            for (var d = s.ToMapDistX(256), e = 0, f = Infinity, m = 0; m < w.TileMatrix.length; m++) {
                var t =
                    0.07168 * parseFloat(w.TileMatrix[m].ScaleDenominator),
                    t = Math.abs(t - d);
                t < f && (f = t, e = m)
            }
            if (!(f > d / 2)) {
                var f = w.TileMatrix[e].TopLeftCorner,
                    t = parseFloat(f.split(" ")[0]),
                    m = parseFloat(f.split(" ")[1]),
                    f = s.FromMapPoint(t, m),
                    v = s.ToMapPoint(0, 0),
                    M = s.ToMapPoint(s.getClientWidth(), s.getClientHeight()),
                    P, Q, N, J, K;
                P = v.x < t ? 0 : Math.floor((g - t) / d);
                Q = P + Math.ceil(Math.abs(g - l) / d);
                N = v.y > m ? 0 : Math.floor((m - k) / d);
                J = N + Math.ceil(Math.abs(h - k) / d);
                K = v.x < t ? 0 : Math.floor((v.x - t) / d);
                t = K + Math.ceil(Math.abs(v.x - M.x) / d);
                m = v.y > m ? 0 : Math.floor((m -
                    v.y) / d);
                v = m + Math.ceil(Math.abs(M.y - v.y) / d);
                d = Math.max(K, P);
                Q = Math.min(t, Q);
                m = Math.max(m, N);
                J = Math.min(v, J);
                if (x != d || A != Q || B != m || D != J || e != z) {
                    x = d;
                    A = Q;
                    B = m;
                    D = J;
                    z = e;
                    parseFloat(w.TileMatrix[e].MatrixWidth);
                    parseFloat(w.TileMatrix[e].MatrixHeight);
                    var F;
                    N = [];
                    v = P = 0;
                    for (M = m; M <= J; M++) {
                        N.push([]);
                        for (K = d; K <= Q; K++) t = f.x + 256 * K, m = f.y + 256 * M, F = document.createElement("img"), F.style.display = "none", F.onload = function() {
                                var a = this,
                                    b = 0;
                                a.style.opacity = b;
                                var d = y / 7,
                                    e = setInterval(function() {
                                        b >= y ? (F.style.filter = "alpha(opacity=" +
                                            100 * y + ")", a.style.opacity = y, clearInterval(e)) : (a.style.opacity = b, a.style.filter = "alpha(opacity=" + 100 * b + ")", b += d)
                                    }, 33);
                                a.style.filter = "alpha(opacity=0)";
                                this.style.display = "block"
                            }, F.xIdx = K, F.yIdx = M, F.style.position = "absolute", F.style.left = t + "px", F.style.top = m + "px", F.galleryImg = !1, F.hideFocus = !0, F.style.MozUserSelect = "none", F.border = "0px", N[v].push(F), F.src = a + "?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&Layer=" + b.layer + "&Style=default&Format=image/png&TileMatrixSet=" + b.matrixSet + "&TileMatrix=" + w.TileMatrix[e]["ows:Identifier"] +
                            "&TileRow=" + M + "&TileCol=" + K, p.appendChild(F), F.style.opacity = y, F.style.filter = "alpha(opacity=" + 100 * y + ")", P++;
                        v++
                    }
                    if (0 < n.length) {
                        for (M = 0; M < n.length; M++) {
                            for (K = 0; K < n[M].length; K++) p.removeChild(n[M][K]);
                            n[M][K] = null
                        }
                        n = []
                    }
                    n = N
                }
            }
        }
    }
};
(function() {
    var a = function(a) {
        this.left = a.left;
        this.top = a.top;
        this.right = a.right;
        this.bottom = a.bottom;
        this.src = a.src;
        this.width = a.width;
        this.height = a.height;
        this.layer = a.layer;
        this.cancel = this.loaded = !1;
        this.node = document.createElement("img");
        this.node.style.position = "absolute";
        this.setSource = function(a) {
            this.loaded = !1;
            this.node.src = a
        };
        var b = this;
        this.node.onload = function() {
            b.cancel ? b.loaded = !1 : (b.loaded = !0, a.onload && a.onload.call(b))
        };
        this.src && (this.node.src = this.src);
        "number" == typeof this.width &&
            (this.node.width = this.width);
        "number" == typeof this.height && (this.node.height = this.height);
        this.destroy = function() {
            this.node && this.node.parentNode && this.node.parentNode.removeChild(this.node)
        }
    };
    TGOS.TGWmsLayer = function(d, b, f) {
        function e() {
            if (h) {
                var a = l.getClientWidth(),
                    b = l.getClientHeight(),
                    d = l.ToMapPoint(0, 0),
                    e = l.ToMapPoint(a, b);
                g();
                var f = d.x,
                    m = d.y,
                    n = e.x,
                    p = e.y;
                switch (h.getCoordSys()) {
                    case TGOS.TGCoordSys.EPSG3857:
                        d = TGOS.GooToWGS84(d.x, d.y);
                        e = TGOS.GooToWGS84(e.x, e.y);
                        f = d.x;
                        m = d.y;
                        n = e.x;
                        p = e.y;
                        break;
                    default:
                        f = d.x, m = d.y, n = e.x, p = e.y
                }
                a = k + "?BBOX=" + ("VERSION=1.3.0" == q && "CRS:84" == v ? p + "," + f + "," + m + "," + n : f + "," + p + "," + n + "," + m) + "&WIDTH=" + a + "&HEIGHT=" + b;
                return a += "&" + x.join("&")
            }
        }

        function g() {
            if (h) {
                var a = l.getClientWidth(),
                    b = l.getClientHeight(),
                    d = l.ToMapPoint(0, 0),
                    e = l.ToMapPoint(a, b);
                return {
                    left: d.x,
                    top: d.y,
                    right: e.x,
                    bottom: e.y,
                    width: a,
                    height: b
                }
            }
        }
        var k, l, h = null,
            m = !0,
            n = "auto",
            p, s = 1,
            q = "VERSION=1.3.0",
            v, x = [];
        f = d;
        if (-1 < f.indexOf("?")) {
            var A = f.indexOf("?");
            d = f.substring(0, A);
            A = f.substr(A + 1, f.length - A);
            f = d;
            f = A.split("&");
            for (A = 0; A < f.length; A++) 0 <= f[A].toUpperCase().indexOf("BBOX") || 0 <= f[A].toUpperCase().indexOf("WIDTH") || 0 <= f[A].toUpperCase().indexOf("HEIGHT") || (0 <= f[A].toUpperCase().indexOf("VERSION") && (q = f[A].toUpperCase()), 0 <= f[A].toUpperCase().indexOf("CRS") && (v = f[A].toUpperCase()), x.push(f[A]))
        }
        var B;
        this.getDefaultViewport = function() {};
        this.getUrl = function() {
            return k
        };
        this.removeWmsLayer = function() {
            B && B.parentNode && B.parentNode.removeChild(B);
            h.removeLayer(this)
        };
        this.getZIndex = function() {
            return n
        };
        this.setZIndex =
            function(a) {
                n = a;
                B && (B.style.zIndex = n)
            };
        this.getWmsVisible = function() {
            return this.getVisible()
        };
        this.getVisible = function() {
            return m
        };
        this.setWmsVisible = function(a) {
            this.setVisible(a)
        };
        this.setVisible = function(a) {
            m = a;
            B && (B.style.display = m ? "block" : "none")
        };
        this.putVisible = function(a) {
            this.setVisible(a)
        };
        var D = function(a) {
            if (a) {
                var b = l.FromMapPoint(a.left, a.top);
                a.node.style.left = b.x + "px";
                a.node.style.top = b.y + "px"
            }
        };
        this.setOpacity = function(a) {
            if (B) {
                var b = parseInt(100 * a);
                B.style.filter = "alpha(opacity=" +
                    b + ")";
                B.style.opacity = a
            }
            s = a
        };
        this.getOpacity = function() {
            return s
        };
        var y, z;
        this.UpdateElement = function() {
            var a = l.getScale(),
                b = p / a;
            z && (z.node.width /= b, z.node.height /= b);
            D(y);
            D(z);
            p = a
        };
        this.RebuildElement = function() {
            var b = this;
            this.temp && !this.temp.loaded && (this.temp.cancel = !0);
            var d = g();
            this.temp = new a({
                left: d.left,
                right: d.right,
                top: d.top,
                bottom: d.bottom,
                width: d.width,
                height: d.height,
                src: e(),
                onload: function() {
                    y = z;
                    B.appendChild(b.temp.node);
                    z = b.temp;
                    y && y.destroy();
                    b.temp = null
                }
            })
        };
        h = b.map;
        m = !1 == b.wmsVisible ?
            !1 : !0;
        n = b.zIndex;
        B = document.createElement("div");
        B.style.position = "absolute";
        B.style.left = "0px";
        B.style.top = "0px";
        B.style.width = "100%";
        B.style.height = "100%";
        "number" == typeof b.opacity && (s = b.opacity);
        B.style.opacity = s;
        parseInt(100 * s);
        l = b.map.getMapBase();
        k = 0 < d.indexOf("?") ? d.slice(0, d.indexOf("?")) : d;
        l.getHObject().appendChild(B);
        h.addLayer(this, !0)
    }
})();
TGOS.TGWmsLayer_bak = function(a, d, b) {
    var f = this,
        e, g, k, l, h = null,
        m = !0,
        n = "auto",
        p, s = 1,
        q = [];
    b = a;
    if (-1 < b.indexOf("?")) {
        var v = b.indexOf("?");
        a = b.substring(0, v);
        v = b.substr(v + 1, b.length - v);
        b = a;
        b = v.split("&");
        for (v = 0; v < b.length; v++) 0 != b[v].toUpperCase().indexOf("BBOX") && 0 != b[v].toUpperCase().indexOf("WIDTH") && 0 != b[v].toUpperCase().indexOf("HEIGHT") && q.push(b[v])
    }
    var x = new MercatorProjection(0, 0, 0, 1),
        A = new HorizontalDatum(6378137, 0);
    this.getDefaultViewport = function() {};
    this.getUrl = function() {
        return g
    };
    this.removeWmsLayer =
        function() {
            h.removeLayer(this)
        };
    this.getZIndex = function() {
        return n
    };
    this.setZIndex = function(a) {
        n = a;
        e && (e.style.zIndex = n)
    };
    this.getWmsVisible = function() {
        return this.getVisible()
    };
    this.getVisible = function() {
        return m
    };
    this.setWmsVisible = function(a) {
        this.setVisible(a)
    };
    this.setVisible = function(a) {
        m = a;
        e && (e.style.display = m ? "block" : "none")
    };
    this.putVisible = function(a) {
        this.setVisible(a)
    };
    this.setOpacity = function(a) {
        if (e) {
            var b = parseInt(100 * a);
            e.style.filter = "alpha(opacity=" + b + ")";
            e.style.opacity = a
        }
        s = a
    };
    this.getOpacity = function() {
        return s
    };
    this.UpdateElement = function() {
        var a = l.getScale(),
            b = p / a,
            d = e,
            f;
        if (h) {
            f = l.getClientWidth();
            var m = l.getClientHeight(),
                n = l.ToMapPoint(0, 0),
                s = l.ToMapPoint(f, m);
            h && (l.ToMapPoint(0, 0), l.ToMapPoint(l.getClientWidth(), l.getClientHeight()));
            var v = n.x,
                B = n.y,
                H = s.x,
                O = s.y;
            switch (h.getCoordSys()) {
                case TGOS.TGCoordSys.EPSG3857:
                    B = x.Inverse(A, new CPoint3(n.x, n.y, 0));
                    s = x.Inverse(A, new CPoint3(s.x, s.y, 0));
                    v = B.X;
                    B = B.Y;
                    H = s.X;
                    O = s.Y;
                    break;
                default:
                    v = n.x, B = n.y, H = s.x, O = s.y
            }
            f = g + "?BBOX=" + v +
                "," + O + "," + H + "," + B + "&WIDTH=" + f + "&HEIGHT=" + m;
            f += "&" + q.join("&")
        } else f = void 0;
        d.src = f;
        e.width /= b;
        e.height /= b;
        k && (b = l.FromMapPoint(k.x, k.y), e.style.left = b.x + "px", e.style.top = b.y + "px");
        p = a
    };
    var B = function() {
        k = l.ToMapPoint(0, 0);
        e.style.left = "0px";
        e.style.top = "0px";
        e.width = l.getClientWidth();
        e.height = l.getClientHeight();
        e.style.display = f.getVisible() ? "block" : "none"
    };
    this.RebuildElement = function() {};
    (function() {
        h = d.map;
        m = !1 == d.wmsVisible ? !1 : !0;
        n = d.zIndex;
        e = document.createElement("img");
        e.style.position =
            "absolute";
        e.style.opacity = s;
        var b = parseInt(100 * s);
        e.style.filter = "alpha(opacity=" + b + ")";
        l = d.map.getMapBase();
        g = 0 < a.indexOf("?") ? a.slice(0, a.indexOf("?")) : a;
        l.getHObject().appendChild(e);
        h.addLayer(f, !0);
        e.onload = B
    })()
};
TGOS.WMSLayer = function(a, d, b, f, e, g, k) {
    function l(a) {
        var b = null,
            e = "",
            f = "",
            g = 0;
        a && (e = GetXMLNodeAttribute(a, "Name"), g = parseInt(GetXMLNodeAttribute(a, "FeatureType")), f = GetXMLNodeAttribute(a, "SRName"));
        var h = e;
        if (a = FindXMLNodes(GetXMLChildNode(a, "Fields"), "Field"))
            for (var b = [], k = 0; k < a.length; k++) b.push(GetXMLNodeAttribute(a.item(k), "Name"));
        this.getName = function() {
            return e
        };
        this.putName = function(a) {
            e = a
        };
        this.getTitle = function() {
            return h
        };
        this.putTitle = function(a) {
            h = a
        };
        this.getFields = function() {
            return b
        };
        this.getFeatureType = function() {
            return g
        };
        this.getSRName = function() {
            return f
        };
        this.ExecuteQuery = function(a, b, e, f) {
            window.open(d + "/Query?V=" + N + "&S=" + J.valueOf() + "&Layer=" + escape(this.getName()) + (b ? "&GEOM=" : "&EXPR=") + escape(a));
            pAgent = new AjaxAgent(d + "/Query", !0, !0);
            pAgent.SendRequest("V=" + N + "&S=" + J.valueOf() + "&Layer=" + escape(this.getName()) + (b ? "&GEOM=" : "&EXPR=") + escape(a), e, null, f)
        };
        this.ExecuteUpdate = function(a, b, e, f, g) {
            window.open(d + "/Update?V=" + N + "&S=" + J.valueOf() + "&Layer=" + escape(this.getName()) +
                "&ID=" + a + "&GEOM=" + b + "&Values=" + e);
            pAgent = new AjaxAgent(d + "/Update", !1, !0);
            pAgent.SendRequest("V=" + N + "&S=" + J.valueOf() + "&Layer=" + escape(this.getName()) + "&ID=" + a + "&GEOM=" + b + "&Values=" + e, f, null, g);
            Reget()
        };
        this.ExecuteDelete = function(a, b, e) {
            pAgent = new AjaxAgent(d + "/Delete", !1, !0);
            pAgent.SendRequest("V=" + N + "&S=" + J.valueOf() + "&Layer=" + escape(this.getName()) + "&ID=" + a, b, null, e);
            Reget()
        }
    }
    var h = new MercatorProjection(0, 0, 0, 1),
        m = new HorizontalDatum(6378137, 0),
        n = this,
        p = null,
        s = a,
        q = a,
        v = g.left,
        x = g.top,
        A = g.right,
        B = g.bottom,
        D = !0,
        y = b,
        z = null == e ? TGOS.WMSLayer.enumCoordinate.TWD97 : e,
        w = null == f ? TGOS.WMSLayer.enumCoordinate.TWD97 : f,
        t = "auto",
        u = [];
    if (-1 < y.indexOf("?"))
        for (b = y.indexOf("?"), a = y.substring(0, b), b = y.substr(b + 1, y.length - b), y = a, a = b.split("&"), b = 0; b < a.length; b++) 0 != a[b].toUpperCase().indexOf("BBOX") && 0 != a[b].toUpperCase().indexOf("WIDTH") && 0 != a[b].toUpperCase().indexOf("HEIGHT") && u.push(a[b]);
    var C = 0,
        E = 0,
        G = 0,
        H = 0,
        O = 0,
        M = 0,
        P = 0,
        Q = 0,
        N = 0,
        J = new Date,
        K = null,
        F = [],
        L = null,
        V = 100;
    this.setZIndex = function(a) {
        t = a;
        K && (K.style.zIndex =
            t)
    };
    this.getZIndex = function() {
        return t
    };
    this.getName = function() {
        return s
    };
    this.putName = function(a) {
        s = a
    };
    this.getTitle = function() {
        return q
    };
    this.putTitle = function(a) {
        q = a
    };
    this.getVisible = function() {
        return D
    };
    this.putVisible = function(a) {
        D = a;
        K && (K.style.visibility = a ? "" : "hidden")
    };
    this.putTransparent = function(a) {
        V = a;
        this.SetTransparent(a)
    };
    this.putShpPath = function(a) {
        m_shpPath = a
    };
    this.putLabelName = function(a) {};
    this.getLeft = function() {
        return v
    };
    this.getTop = function() {
        return x
    };
    this.getRight = function() {
        return A
    };
    this.getBottom = function() {
        return B
    };
    this.getLayers = function() {
        return F
    };
    this.getThematicLayer = function() {
        return L
    };
    this.Initialize = function(a) {
        p = a;
        a = p.getHObject();
        K = a.ownerDocument.createElement("img");
        a.appendChild(K);
        K.galleryImg = !1;
        K.hideFocus = !0;
        K.style.MozUserSelect = "none";
        K.border = "0px";
        K.style.position = "absolute";
        K.style.width = "100%";
        K.style.height = "100%";
        K.style.zIndex = t;
        K.style.visibility = D ? "" : "hidden";
        K.onmousedown = function() {
            return !1
        };
        K.galleryImg = !1;
        this.SetTransparent(V)
    };
    this.RemoveSelf =
        function() {
            null != K && (null != p && p.getHObject().removeChild(K), K = null)
        };
    this.SetTransparent = function(a) {
        if (K) {
            var b = parseFloat(a, 10) / 100;
            K.style.filter = "alpha(opacity=" + a + ")";
            K.style.opacity = b
        }
    };
    this.UpdateElement = function() {
        var a, b;
        "97" != k ? (a = h.Forward(m, new CPoint3(parseFloat(C), parseFloat(E), 0)), b = h.Forward(m, new CPoint3(parseFloat(G), parseFloat(H), 0)), a = p.FromMapPoint(a.X, a.Y), b = p.FromMapPoint(b.X, b.Y)) : (a = p.FromMapPoint(C, E), b = p.FromMapPoint(G, H));
        K.style.zIndex = t;
        K.style.width = parseInt(Math.abs(b.x -
            a.x)) + "px";
        K.style.height = parseInt(Math.abs(b.y - a.y)) + "px";
        K.style.left = Math.round(Math.min(a.x, b.x)) + "px";
        K.style.top = Math.round(Math.min(a.y, b.y)) + "px"
    };
    var X = function() {
        if ("complete" == K.readyState || K.complete && null == K.readyState) "MSIE" == DeviceTest() ? DetachEvent(K, "readystatechange", X, !1) : DetachEvent(K, "load", X, !1), C = O, E = M, G = P, H = Q, n.UpdateElement && n.UpdateElement()
    };
    this.RebuildElement = function() {
        if (!1 != this.getVisible()) {
            var a = p.FromMapPoint(v, x),
                b = p.FromMapPoint(A, B);
            0 > a.x ? a.x = 0 : a.x > p.getClientWidth() &&
                (a.x = p.getClientWidth());
            0 > a.y ? a.y = 0 : a.y > p.getClientHeight() && (a.y = p.getClientHeight());
            0 > b.x ? b.x = 0 : b.x > p.getClientWidth() && (b.x = p.getClientWidth());
            0 > b.y ? b.y = 0 : b.y > p.getClientHeight() && (b.y = p.getClientHeight());
            if (!(a.x > b.x || a.y > b.y)) {
                var d = p.ToMapPoint(a.x, a.y),
                    e = p.ToMapPoint(b.x, b.y);
                O = d.x;
                M = d.y;
                P = e.x;
                Q = e.y;
                nWidth = parseInt(b.x - a.x);
                nHeight = parseInt(b.y - a.y);
                "MSIE" == DeviceTest() ? AttachEvent(K, "readystatechange", X, !1) : AttachEvent(K, "load", X, !1);
                z == w && (a = "?" + u.join("&"), "97" != k && (b = h.Inverse(m, new CPoint3(O,
                    M, 0)), d = h.Inverse(m, new CPoint3(P, Q, 0)), O = b.X, M = b.Y, P = d.X, Q = d.Y), a += "&BBOX=" + O + "," + Q + "," + P + "," + M + "&WIDTH=" + nWidth + "&HEIGHT=" + nHeight, K.src = y + a)
            }
        }
    };
    var Z = function(a, b) {
        L = b
    };
    this.CreateLegend = function(a) {
        if (1 < F.length)
            for (var b = 0; b < F.length; b++) a.CreateSubLegend(F[b], Z)
    };
    this.ExecuteQuery = function(a, b, d, e) {
        if (null != L) return L.ExecuteQuery(a, b, d, e)
    };
    this.ExecuteUpdate = function(a, b, d, e, f) {
        if (null != L) return L.ExecuteUpdate(a, b, d, e, f)
    };
    this.ExecuteDelete = function(a, b, d) {
        if (null != L) return L.ExecuteDelete(a,
            b, d)
    };
    this.getFeatureType = function() {
        if (null != L) return L.getFeatureType()
    };
    this.getFields = function() {
        if (null != L) return L.getFields()
    };
    F = [];
    0 == F.length ? F.push(new l(null)) : 1 == F.length && (F[0].putName(""), F[0].putTitle(q));
    L = F[F.length - 1]
};
TGOS.WMSLayer.enumCoordinate = {
    WGS84: 0,
    TWD97: 1,
    GOOGLE: 2,
    TWD97_119: 3
};
MapLayer.enumFeatureType = {
    Unknown: 0,
    Point: 1,
    LineString: 2,
    Polygon: 3
};

function MapLayer(a, d) {
    function b(a) {
        var b = null,
            e = "",
            g = "",
            h = 0;
        a && (e = GetXMLNodeAttribute(a, "Name"), h = parseInt(GetXMLNodeAttribute(a, "FeatureType")), g = GetXMLNodeAttribute(a, "SRName"));
        var k = e;
        if (a = FindXMLNodes(GetXMLChildNode(a, "Fields"), "Field"))
            for (var b = [], l = 0; l < a.length; l++) b.push(GetXMLNodeAttribute(a.item(l), "Name"));
        this.getName = function() {
            return e
        };
        this.putName = function(a) {
            e = a
        };
        this.getTitle = function() {
            return k
        };
        this.putTitle = function(a) {
            k = a
        };
        this.getFields = function() {
            return b
        };
        this.getFeatureType =
            function() {
                return h
            };
        this.getSRName = function() {
            return g
        };
        this.ExecuteQuery = function(a, b, e, f) {
            O = new AjaxAgent(d + "/Query", !0, !0);
            O.SendRequest("V=" + w + "&S=" + t.valueOf() + "&Layer=" + escape(this.getName()) + (b ? "&GEOM=" : "&EXPR=") + escape(a), e, null, f)
        };
        this.ExecuteUpdate = function(a, b, e, g, h) {
            O = new AjaxAgent(d + "/Update", !1, !0);
            O.SendRequest("V=" + w + "&S=" + t.valueOf() + "&Layer=" + escape(this.getName()) + "&ID=" + a + "&GEOM=" + b + "&Values=" + e, g, null, h);
            f()
        };
        this.ExecuteDelete = function(a, b, e) {
            O = new AjaxAgent(d + "/Delete", !1, !0);
            O.SendRequest("V=" + w + "&S=" + t.valueOf() + "&Layer=" + escape(this.getName()) + "&ID=" + a, b, null, e);
            f()
        }
    }

    function f() {
        w++;
        (new AjaxAgent(d, !1, !0)).SendRequest("V=" + w + "&S=" + t.valueOf(), function(a) {
            a = GetXMLChildNode(a.responseXML.documentElement, "Infomation");
            a = GetXMLChildNode(a, "Envelope");
            h = parseFloat(GetXMLNodeAttribute(a, "Left"));
            m = parseFloat(GetXMLNodeAttribute(a, "Top"));
            n = parseFloat(GetXMLNodeAttribute(a, "Right"));
            p = parseFloat(GetXMLNodeAttribute(a, "Bottom"));
            e.RebuildElement()
        })
    }
    var e = this,
        g = null,
        k = a,
        l = a,
        h = 0,
        m = 0,
        n = 1,
        p = 1,
        s = !0,
        q = 0,
        v = 0,
        x = 0,
        A = 0,
        B = 0,
        D = 0,
        y = 0,
        z = 0,
        w = 0,
        t = new Date,
        u = null,
        C = [],
        E = null;
    this.getName = function() {
        return k
    };
    this.putName = function(a) {
        k = a
    };
    this.getTitle = function() {
        return l
    };
    this.putTitle = function(a) {
        l = a
    };
    this.getVisible = function() {
        return s
    };
    this.putVisible = function(a) {
        s = a;
        u && (u.style.visibility = a ? "" : "hidden")
    };
    this.getResourcePath = function() {
        return d
    };
    this.getLeft = function() {
        return h
    };
    this.getTop = function() {
        return m
    };
    this.getRight = function() {
        return n
    };
    this.getBottom = function() {
        return p
    };
    this.getLayers = function() {
        return C
    };
    this.getThematicLayer = function() {
        return E
    };
    this.Initialize = function(a) {
        g = a;
        a = g.getHObject();
        u = a.ownerDocument.createElement("img");
        a.appendChild(u);
        u.galleryImg = !1;
        u.hideFocus = !0;
        u.style.MozUserSelect = "none";
        u.border = "0px";
        u.style.position = "absolute";
        u.style.width = "100%";
        u.style.height = "100%";
        u.style.visibility = s ? "" : "hidden";
        u.onmousedown = function() {
            return !1
        };
        u.galleryImg = !1
    };
    this.RemoveSelf = function() {
        null != u && (null != g && g.getHObject().removeChild(u), u = null)
    };
    this.UpdateElement =
        function() {
            var a = g.FromMapPoint(q, v),
                b = g.FromMapPoint(x, A);
            u.style.width = parseInt(Math.abs(b.x - a.x)) + "px";
            u.style.height = parseInt(Math.abs(b.y - a.y)) + "px";
            u.style.left = Math.round(Math.min(a.x, b.x)) + "px";
            u.style.top = Math.round(Math.min(a.y, b.y)) + "px"
        };
    var G = function() {
        if ("complete" == u.readyState || u.complete && null == u.readyState) "MSIE" == DeviceTest() ? DetachEvent(u, "readystatechange", G, !1) : DetachEvent(u, "load", G, !1), q = B, v = D, x = y, A = z, e.UpdateElement && e.UpdateElement()
    };
    this.RebuildElement = function() {
        if (!1 !=
            this.getVisible()) {
            var a = g.FromMapPoint(h, m),
                b = g.FromMapPoint(n, p);
            0 > a.x ? a.x = 0 : a.x > g.getClientWidth() && (a.x = g.getClientWidth());
            0 > a.y ? a.y = 0 : a.y > g.getClientHeight() && (a.y = g.getClientHeight());
            0 > b.x ? b.x = 0 : b.x > g.getClientWidth() && (b.x = g.getClientWidth());
            0 > b.y ? b.y = 0 : b.y > g.getClientHeight() && (b.y = g.getClientHeight());
            if (!(a.x > b.x || a.y > b.y)) {
                var e = g.ToMapPoint(a.x, a.y),
                    f = g.ToMapPoint(b.x, b.y);
                B = e.x;
                D = e.y;
                y = f.x;
                z = f.y;
                nWidth = parseInt(b.x - a.x);
                nHeight = parseInt(b.y - a.y);
                a = "/GetImage?V=" + w + "&S=" + t.valueOf() +
                    "&Width=" + nWidth + "&Height=" + nHeight + "&Left=" + B + "&Top=" + D + "&Right=" + y + "&Bottom=" + z;
                "MSIE" == DeviceTest() ? AttachEvent(u, "readystatechange", G, !1) : AttachEvent(u, "load", G, !1);
                u.src = d + a
            }
        }
    };
    var H = function(a, b) {
        E = b
    };
    this.CreateLegend = function(a) {
        if (1 < C.length)
            for (var b = 0; b < C.length; b++) a.CreateSubLegend(C[b], H)
    };
    this.ExecuteQuery = function(a, b, d, e) {
        if (null != E) return E.ExecuteQuery(a, b, d, e)
    };
    this.ExecuteUpdate = function(a, b, d, e, f) {
        if (null != E) return E.ExecuteUpdate(a, b, d, e, f)
    };
    this.ExecuteDelete = function(a, b,
        d) {
        if (null != E) return E.ExecuteDelete(a, b, d)
    };
    this.getFeatureType = function() {
        if (null != E) return E.getFeatureType()
    };
    this.getFields = function() {
        if (null != E) return E.getFields()
    };
    var C = [],
        O = new AjaxAgent(d, !1, !0);
    O.SendRequest("V=" + w + "&S=" + t.valueOf(), function(a) {
        a = GetXMLChildNode(a.responseXML.documentElement, "Infomation");
        var d = GetXMLChildNode(a, "Envelope");
        h = parseFloat(GetXMLNodeAttribute(d, "Left"));
        m = parseFloat(GetXMLNodeAttribute(d, "Top"));
        n = parseFloat(GetXMLNodeAttribute(d, "Right"));
        p = parseFloat(GetXMLNodeAttribute(d,
            "Bottom"));
        if (a = FindXMLNodes(GetXMLChildNode(a, "Layers"), "Layer"))
            for (d = 0; d < a.length; d++) C.push(new b(a.item(d)))
    });
    0 == C.length ? C.push(new b(null)) : 1 == C.length && (C[0].putName(""), C[0].putTitle(l));
    E = C[C.length - 1]
};

function CPoint3(a, d, b) {
    this.X = a;
    this.Y = d;
    this.Z = b;
    return this
}
CPoint3.prototype.toString = function() {
    return "(" + this.X + "," + this.Y + "," + this.Z + ")"
};
CPoint3.prototype.Distance = function() {
    return Math.sqrt(this.X * this.X + this.Y * this.Y + this.Z * this.Z)
};

function GeographicTransform(a, d, b, f, e, g, k) {
    this.BursaWolfTransform = function(l) {
        var h = Math.sin(f),
            m = Math.cos(f);
        l = new CPoint3(l.X, m * l.Y + h * l.Z, -h * l.Y + m * l.Z);
        h = Math.sin(e);
        m = Math.cos(e);
        l = new CPoint3(m * l.X - h * l.Z, l.Y, h * l.X + m * l.Z);
        h = Math.sin(g);
        m = Math.cos(g);
        l = new CPoint3(m * l.X + h * l.Y, -h * l.X + m * l.Y, l.Z);
        return new CPoint3(a + (1 + k) * l.X, d + (1 + k) * l.Y, b + (1 + k) * l.Z)
    };
    this.MolodenskyBadekasTransform = function(l) {
        return new CPoint3(a + k * l.X + (l.X + g * l.Y - e * l.Z), d + k * l.Y + (-g * l.X + l.Y + f * l.Z), b + k * l.Z + (e * l.X - f * l.Y + l.Z))
    };
    return this
}

function HorizontalDatum(a, d) {
    this.SemiMajorAxis = a;
    this.Flattening = d;
    this.SemiMinorAxis = this.SemiMajorAxis * (1 - this.Flattening);
    this.es = 1 - (1 - this.Flattening) * (1 - this.Flattening);
    this.et2 = this.es / (1 - this.es);
    return this
}
HorizontalDatum.prototype.CartesianFromGeodetic = function(a) {
    if (90 == a.Y || -90 == a.Y) return new CPoint3(0, 0, (-90 == a.Y ? -1 : 1) * this.SemiMajorAxis * (1 - this.es) + a.Z);
    var d = a.Y * Math.PI / 180,
        b = a.X * Math.PI / 180,
        f = Math.sin(d),
        e = Math.cos(d),
        d = this.SemiMajorAxis / Math.sqrt(1 - this.es * f * f),
        g = (d + a.Z) * e * Math.cos(b),
        b = (d + a.Z) * e * Math.sin(b);
    return new CPoint3(g, b, ((1 - this.es) * d + a.Z) * f)
};
HorizontalDatum.prototype.GeodeticFromCartesian = function(a) {
    if (0 == a.X && 0 == a.Y) return new CPoint3(0, 0 <= a.Z ? 90 : -90, Math.abs(a.Z) - this.SemiMinorAxis);
    var d = a.X * a.X + a.Y * a.Y,
        b = Math.sqrt(d),
        f = 1.0026 * a.Z,
        d = Math.sqrt(f * f + d),
        f = f / d,
        d = b / d,
        f = a.Z + this.SemiMinorAxis * this.et2 * f * f * f,
        d = b - this.SemiMajorAxis * this.es * d * d * d,
        e = Math.sqrt(f * f + d * d),
        f = f / e,
        e = d / e,
        g = this.SemiMajorAxis / Math.sqrt(1 - this.es * f * f),
        d = 0,
        d = 0.3826834323650898 <= e ? b / e - g : -0.3826834323650898 >= e ? b / -e - g : a.Z / f - g * (1 - this.es),
        b = 180 * Math.atan(f / e) / Math.PI;
    a = 0 !=
        a.X ? 180 * Math.atan2(a.Y, a.X) / Math.PI : 0 < a.Y ? 90 : -90;
    return new CPoint3(a, b, d)
};

function TransverseMercatorProjection(a, d, b, f, e) {
    function g(a, b, d, e) {
        var f, g = (f = e * e) * (0.46875 - e * (0.013020833333333334 + 0.007120768229166667 * e)),
            s = (f *= e) * (0.3645833333333333 - 0.005696614583333333 * e);
        d *= b;
        b *= b;
        return (1 - e * (0.25 + e * (0.046875 + e * (0.01953125 + 0.01068115234375 * e)))) * a - d * (e * (0.75 - e * (0.046875 + e * (0.01953125 + 0.01068115234375 * e))) + b * (g + b * (s + 0.3076171875 * b * f * e)))
    }
    this.centralMeridian = a;
    this.falseEasting = d;
    this.falseNorthing = b;
    this.latitudeOfOrigin = f;
    this.scaleFactor = e;
    this.Forward = function(k, l) {
        var h =
            CPoint3((l.X - a) * Math.PI / 180, l.Y * Math.PI / 180, l.Z),
            m = Math.sin(h.Y),
            n = Math.cos(h.Y),
            p = 1E-10 < Math.abs(n) ? m / n : 0,
            p = p * p,
            s = n * h.X,
            q = s * s,
            s = s / Math.sqrt(1 - k.es * m * m),
            v = k.et2 * n * n,
            x = s * (1 + q / 6 * (1 - p + v + q / 20 * (5 + p * (p - 18) + v * (14 - 58 * p) + q / 42 * (61 + p * (p * (179 - p) - 479))))),
            A = f * Math.PI / 180,
            A = g(A, Math.sin(A), Math.cos(A), k.es),
            m = g(h.Y, m, n, k.es) - A + m * s * h.X / 2 * (1 + q / 12 * (5 - p + v * (9 + 4 * v) + q / 30 * (61 + p * (p - 58) + v * (270 - 330 * p) + q / 56 * (1385 + p * (p * (543 - p) - 3111)))));
        l = new CPoint3(x, m, h.Z);
        l.X = l.X * e * k.SemiMajorAxis + d;
        l.Y = l.Y * e * k.SemiMajorAxis + b;
        return l
    };
    this.Inverse = function(k, l) {
        var h = CPoint3((l.X - d) / k.SemiMajorAxis / e, (l.Y - b) / k.SemiMajorAxis / e, l.Z),
            m = f * Math.PI / 180,
            m = g(m, Math.sin(m), Math.cos(m), k.es) + h.Y,
            n = k.es,
            p = 1 / (1 - n),
            s = m,
            q;
        for (q = 10; q; --q) {
            var v = Math.sin(s),
                x = 1 - n * v * v,
                s = s - (x = (g(s, v, Math.cos(s), n) - m) * x * Math.sqrt(x) * p);
            if (1E-11 > Math.abs(x)) break
        }
        m = s;
        n = Math.PI / 2;
        Math.abs(m) >= n ? l = new CPoint3(0, 0 > h.Y ? -n : n, h.Z) : (q = Math.sin(m), n = Math.cos(m), p = 1E-10 < Math.abs(n) ? q / n : 0, s = k.et2 * n * n, q = 1 - k.es * q * q, v = h.X * Math.sqrt(q), q *= p, p *= p, x = v * v, m -= q * x / (1 - k.es) / 2 * (1 - x / 12 *
            (5 + p * (3 - 9 * s) + s * (1 - 4 * s) - x / 30 * (61 + p * (90 - 252 * s + 45 * p) + 46 * s - x / 56 * (1385 + p * (3633 + p * (4095 + 1574 * p)))))), l = new CPoint3(v * (1 - x / 6 * (1 + 2 * p + s - x / 20 * (5 + p * (28 + 24 * p + 8 * s) + 6 * s - x / 42 * (61 + p * (662 + p * (1320 + 720 * p)))))) / n, m, h.Z));
        l.X = 180 * l.X / Math.PI + a;
        l.Y = 180 * l.Y / Math.PI;
        return l
    };
    return this
}

function CoordinateTransform(a, d, b, f, e, g) {
    d && (g = d.Inverse(a, g));
    a && b && a != b && (g = a.CartesianFromGeodetic(g), e && (g = e.BursaWolfTransform(g)), g = b.GeodeticFromCartesian(g));
    f && (g = f.Forward(b, g));
    return g
};

function MercatorProjection(a, d, b, f) {
    function e(a, b, d) {
        b *= d;
        return Math.tan(0.5 * (g - a)) / Math.pow((1 - b) / (1 + b), 0.5 * d)
    }
    this.centralMeridian = a;
    this.falseEasting = d;
    this.falseNorthing = b;
    this.scaleFactor = f;
    this.Forward = function(l, h) {
        var m = CPoint3((h.X - a) * Math.PI / 180, h.Y * Math.PI / 180, h.Z);
        if (0 == l.es)
            if (1E-10 >= Math.abs(Math.abs(m.Y) - g)) h = null;
            else {
                var n = m.X,
                    p = Math.log(Math.tan(k + 0.5 * m.Y));
                h = new CPoint3(n, p, m.Z)
            }
        else 1E-10 >= Math.abs(Math.abs(m.Y) - g) ? h = null : (n = m.X, p = -Math.log(e(m.Y, Math.sin(m.Y), Math.sqrt(l.es))),
            h = new CPoint3(n, p, m.Z));
        h.X = h.X * f * l.SemiMajorAxis + d;
        h.Y = h.Y * f * l.SemiMajorAxis + b;
        return h
    };
    this.Inverse = function(e, h) {
        var k = CPoint3((h.X - d) / e.SemiMajorAxis / f, (h.Y - b) / e.SemiMajorAxis / f, h.Z);
        if (0 == e.es) {
            var n = g - 2 * Math.atan(Math.exp(-k.Y));
            h = new CPoint3(k.X, n, k.Z)
        } else {
            var n = Math.exp(-k.Y),
                p = Math.sqrt(e.es),
                s = 0.5 * p,
                q = g - 2 * Math.atan(n);
            i = 15;
            do var v = p * Math.sin(q),
                v = g - 2 * Math.atan(n * Math.pow((1 - v) / (1 + v), s)) - q,
                q = q + v; while (1E-10 < Math.abs(v) && --i);
            h = new CPoint3(k.X, q, k.Z)
        }
        h.X = 180 * h.X / Math.PI + a;
        h.Y = 180 * h.Y / Math.PI;
        return h
    };
    var g = Math.PI / 2,
        k = Math.PI / 4;
    return this
};

function ScaleTransformation(a) {
    var d = a,
        b = -a,
        f = 1,
        e = 1;
    this.getBaseScaleX = function() {
        return d
    };
    this.putBaseScaleX = function(a) {
        d = a
    };
    this.getBaseScaleY = function() {
        return b
    };
    this.putBaseScaleY = function(a) {
        b = a
    };
    this.getScale = function() {
        return d * f
    };
    this.putScale = function(a) {
        f = a / d;
        e = a / Math.abs(b)
    };
    this.getScaleX = function() {
        return d * f
    };
    this.getScaleY = function() {
        return b * e
    }
}

function LevelTransformation(a, d, b) {
    var f = a,
        e = -a,
        g = d,
        k = Math.pow(2, g),
        l = b;
    this.FitLevel = function() {
        this.putMapLevel(Math.round(g))
    };
    this.getBaseScaleX = function() {
        return f
    };
    this.putBaseScaleX = function(a) {
        f = a
    };
    this.getBaseScaleY = function() {
        return e
    };
    this.putBaseScaleY = function(a) {
        e = a
    };
    this.getMapMaxLevel = function() {
        return l
    };
    this.putMapMaxLevel = function(a) {
        l = a
    };
    this.getMapLevel = function() {
        return g
    };
    this.putMapLevel = function(a) {
        if (g == a) return !0;
        var b = a > l - 1 ? l - 1 : 0 > a ? 0 : a;
        if ((a >= l || 0 > a) && g == b) return !1;
        g =
            b;
        k = Math.pow(2, g);
        return !0
    };
    this.getScale = function() {
        return f * k
    };
    this.putScale = function(a) {
        this.putMapLevel(Math.log(a / f) / Math.LN2)
    };
    this.getScaleX = function() {
        return f * k
    };
    this.getScaleY = function() {
        return e * k
    }
}

function MapBase(a, d) {
    var b, f, e, g, k, l = 0,
        h = 0,
        m = 0,
        n = 0,
        p = null;
    e = [];
    g = [];
    k = null;
    p = d;
    b = a.ownerDocument.createElement("div");
    a.appendChild(b);
    b.style.position = "absolute";
    b.style.overflow = "hidden";
    b.style.left = "0px";
    b.style.top = "0px";
    b.style.width = "100%";
    b.style.height = "100%";
    b.style.zIndex = 0;
    f = b.ownerDocument.createElement("div");
    b.appendChild(f);
    f.style.position = "absolute";
    f.style.left = "0px";
    f.style.top = "0px";
    f.style.width = "100%";
    f.style.height = "100%";
    f.style.zIndex = 0;
    var l = Number(f.clientWidth),
        h = Number(f.clientHeight),
        s, q = FuncAdapter(this, function() {
            if (l != Number(f.clientWidth) || h != Number(f.clientHeight)) s && clearTimeout(s), s = setTimeout(FuncAdapter(this, function() {
                this.RefreshMap(!0, !0)
            }), 1E3), this.RefreshMap(!1, !1)
        });
    AttachEvent(f, "resize", q, !1);
    this.setColor = function(a) {
        f.style.background = a
    };
    this.FinalRelease = function() {
        this.SelectMapTool(null);
        this.RemoveAllElements();
        DetachEvent(f, "resize", q, !1);
        b.removeChild(b)
    };
    this.getHObject = function() {
        return f
    };
    this.getHPackage = function() {
        return b
    };
    this.getClientWidth = function() {
        return l
    };
    this.getClientHeight = function() {
        return h
    };
    this.getCenterX = function() {
        return m
    };
    this.putCenterX = function(a) {
        m = a
    };
    this.getCenterY = function() {
        return n
    };
    this.putCenterY = function(a) {
        n = a
    };
    this.getTransformation = function() {
        return p
    };
    this.putScale = function(a) {
        p = a
    };
    this.getScale = function() {
        return p.getScale()
    };
    this.putScale = function(a) {
        p.putScale(a)
    };
    this.getCellSizeX = function() {
        return this.ToMapDistX(1)
    };
    this.getCellSizeY = function() {
        return this.ToMapDistY(1)
    };
    this.MoveMapTo = function(a, b) {
        this.putCenterX(a);
        this.putCenterY(b)
    };
    this.ZoomMapTo = function(a) {
        if (null != a.left && null != a.top && null != a.right && null != a.bottom) {
            this.MoveMapTo((a.right + a.left) / 2, (a.bottom + a.top) / 2);
            var b = h / (a.bottom - a.top);
            this.putScale(Math.min(Math.abs(l / (a.right - a.left)), Math.abs(b)))
        }
    };
    this.getPackageOffset = function() {
        var a = 0,
            d = 0,
            d = b.getBoundingClientRect(),
            a = d.left,
            d = d.top;
        return new TGOS.TGPoint(a, d)
    };
    this.getCursorPosition = function(a) {
        if (null == a) return null;
        var b = this.getPackageOffset();
        return new TGOS.TGPoint(a.clientX - b.x,
            a.clientY - b.y)
    };
    this.ToMapPoint = function(a, b) {
        return new TGOS.TGPoint(this.ToMapDistX(a - l / 2) + m, this.ToMapDistY(b - h / 2) + n)
    };
    this.FromMapPoint = function(a, b) {
        return new TGOS.TGPoint(this.FromMapDistX(a - m) + l / 2, this.FromMapDistY(b - n) + h / 2)
    };
    this.ToMapDistX = function(a) {
        return a / p.getScaleX()
    };
    this.ToMapDistY = function(a) {
        return a / p.getScaleY()
    };
    this.FromMapDistX = function(a) {
        return a * p.getScaleX()
    };
    this.FromMapDistY = function(a) {
        return a * p.getScaleY()
    };
    this.SelectMapTool = function(a) {
        if (a) {
            if (a.InitMapEvent) return k &&
                k.ExitMapEvent && k.ExitMapEvent(), a.InitMapEvent(this), k = a, !0
        } else k && k.ExitMapEvent && (k.ExitMapEvent(), k = null);
        return !1
    };
    this.getLayers = function() {
        return e
    };
    this.AddLayer = function(a) {
        null != a && (a.Initialize && a.Initialize(this), e.push(a))
    };
    this.RemoveLayer = function(a) {
        var b, d = e.length;
        for (b = 0; b < d; b++)
            if (e[b] == a) {
                e.splice(b, 1);
                break
            }
        a.RemoveSelf && a.RemoveSelf()
    };
    this.RemoveAllLayers = function() {
        var a, b = e.length;
        for (a = 0; a < b; a++) e[a].RemoveSelf && e[a].RemoveSelf();
        e = []
    };
    this.getElements = function(a) {
        return g
    };
    this.AddElement = function(a) {
        a.Initialize && a.Initialize(this);
        g.push(a)
    };
    this.RemoveElement = function(a) {
        var b, d = g.length;
        for (b = 0; b < d; b++)
            if (g[b] == a) {
                g.splice(b, 1);
                break
            }
        a.RemoveSelf && a.RemoveSelf()
    };
    this.RemoveAllElements = function() {
        var a, b = g.length;
        for (a = 0; a < b; a++) g[a].RemoveSelf && g[a].RemoveSelf();
        g = []
    };
    this.getExtent = function() {
        for (var a = null, b = null, d = null, f = null, g = 0; g < e.length; g++) {
            var h = e[g];
            h.getLeft && (null == a || this.FromMapDistX(a) > this.FromMapDistX(h.getLeft())) && (a = h.getLeft());
            h.getTop && (null ==
                b || this.FromMapDistY(b) > this.FromMapDistY(h.getTop())) && (b = h.getTop());
            h.getRight && (null == d || this.FromMapDistX(d) < this.FromMapDistX(h.getRight())) && (d = h.getRight());
            h.getBottom && (null == f || this.FromMapDistY(f) < this.FromMapDistY(h.getBottom())) && (f = h.getBottom())
        }
        return new TGOS.TGEnvelope(a, b, d, f)
    };
    this.RefreshMap = function(a) {
        x = !0;
        a && (l = Number(f.clientWidth), h = Number(f.clientHeight));
        if (e && 0 < e.length) {
            var b = e.length;
            if (a)
                for (var d = 0; d < b; d++) e[d].RebuildElement && e[d].RebuildElement();
            for (d = 0; d < b; d++) e[d].UpdateElement &&
                e[d].UpdateElement(1)
        }
        if (g && 0 < g.length) {
            b = g.length;
            if (a)
                for (d = 0; d < b; d++) g[d].RebuildElement && g[d].RebuildElement();
            for (d = 0; d < b; d++) g[d].UpdateElement && g[d].UpdateElement(1)
        }
    };
    var v = null,
        x = !1,
        A = null,
        B = null,
        D = null;
    this.MoveToAnimation = function(a, b, d) {
        x = !1;
        A = a.x;
        B = a.y;
        D = b;
        if (null == v) {
            var e = function() {
                if (!x) {
                    var a = this.getCenterX(),
                        b = this.getCenterY(),
                        f = this.getScale();
                    if (5 <= this.FromMapDistX(Math.abs(a - A)) || 5 <= this.FromMapDistY(Math.abs(b - B)) || 0.03125 <= Math.abs(Math.log(f / D)))
                        if (this.putScale(2 / (1 / f +
                                1 / D)), f != this.getScale()) {
                            this.MoveMapTo((a + A) / 2, (b + B) / 2);
                            this.RefreshMap(!1, !0);
                            x = !1;
                            v = setTimeout(FuncAdapter(this, e), 100);
                            return
                        }
                    this.putScale(D);
                    this.MoveMapTo(A, B);
                    this.RefreshMap(!0, !0);
                    x = !1
                }
                v = null;
                d && d()
            };
            e.call(this)
        }
    }
}

function MapPoint(a, d) {
    this.x = a;
    this.y = d;
    this.Diff = function(a) {
        return a.constructor != TGOS.TGPoint ? this : new TGOS.TGPoint(this.x - a.x, this.y - a.y)
    };
    this.Plus = function(a) {
        return a.constructor != TGOS.TGPoint ? this : new TGOS.TGPoint(this.x + a.x, this.y + a.y)
    };
    this.toString = function() {
        return this.x + " " + this.y
    }
}

function MapEnvelope(a, d, b, f) {
    this.Left = a;
    this.Top = d;
    this.Right = b;
    this.Bottom = f;
    this.Extend = function(a) {
        a.constructor == TGOS.TGEnvelope && (!a.Left || null != this.Left && this.Left > a.Left != this.Right > this.Left || (this.Left = a.Left), !a.Top || null != this.Top && this.Top < a.Top != this.Bottom < this.Top || (this.Top = a.Top), !a.Right || null != this.Right && this.Right < a.Right != this.Left < this.Right || (this.Right = a.Right), !a.Bottom || null != this.Bottom && this.Bottom > a.Bottom != this.Top > this.Bottom || (this.Bottom = a.Bottom))
    };
    this.Shrink =
        function(a) {
            a.constructor == TGOS.TGEnvelope && (!a.Left || null != this.Left && this.Left < a.Left != this.Right > this.Left || (this.Left = a.Left), !a.Top || null != this.Top && this.Top > a.Top != this.Bottom < this.Top || (this.Top = a.Top), !a.Right || null != this.Right && this.Right > a.Right != this.Left < this.Right || (this.Right = a.Right), !a.Bottom || null != this.Bottom && this.Bottom < a.Bottom != this.Top > this.Bottom || (this.Bottom = a.Bottom))
        };
    this.toString = function() {
        return Math.min(this.Left, this.Right) + " " + Math.min(this.Top, this.Bottom) + "," +
            Math.max(this.Left, this.Right) + " " + Math.max(this.Top, this.Bottom)
    }
};

function Overview(a, d, b, f, e, g) {
    function k(a, b) {
        var d, e, f = !1;
        this.ExitMapEvent = null;
        this.IsMapAction = function() {
            return f
        };
        this.InitMapEvent = function(g) {
            var h = g.getHObject(),
                k = function(a) {
                    var b = a.screenX - d,
                        f = a.screenY - e;
                    d = a.screenX;
                    e = a.screenY;
                    g.MoveMapTo(g.getCenterX() - g.ToMapDistX(b), g.getCenterY() - g.ToMapDistY(f));
                    g.RefreshMap(!1)
                },
                l = function(a) {
                    DetachEvent(h, "mousemove", k, !0);
                    DetachEvent(h, "mouseup", l, !1);
                    g.RefreshMap(!0);
                    f = !1
                },
                m = function(a) {
                    util.disableDefault(a);
                    f = !0;
                    d = a.screenX;
                    e = a.screenY;
                    AttachEvent(h,
                        "mouseup", l, !1);
                    AttachEvent(h, "mousemove", k, !0)
                },
                n = function(b) {
                    a && (f = !0, b = g.getCursorPosition(b), b = g.ToMapPoint(b.X, b.Y), g.MoveToAnimation(b, g.getScale(), function() {
                        f = !1
                    }))
                },
                p = function(a) {
                    if (b) {
                        f = !0;
                        var d = g.getCursorPosition(a),
                            d = g.ToMapPoint(d.X, d.Y),
                            e = g.getScale(),
                            h = a.wheelDelta ? a.wheelDelta : -a.detail;
                        a = 0;
                        0 < h ? a = 1 : 0 > h && (a = -1);
                        h = 1;
                        h = g.getTransformation();
                        h = null != h && null != h.getLevelScale && null != h.getMapLevel ? h.getLevelScale(h.getMapLevel() + a) / e : Math.pow(2, a);
                        e *= h;
                        d = new MapPoint((g.getCenterX() - d.X) /
                            h + d.X, (g.getCenterY() - d.Y) / h + d.Y);
                        g.MoveToAnimation(d, e, function() {
                            f = !1
                        })
                    }
                };
            this.ExitMapEvent = function() {
                b && DetachEvent(h.ownerDocument, "mousewheel", p, !1);
                DetachEvent(h, "mousedown", m, !1);
                a && DetachEvent(h, "dblclick", n, !1)
            };
            AttachEvent(h, "mousedown", m, !1);
            a && AttachEvent(h, "dblclick", n, !1);
            b && AttachEvent(h.ownerDocument, "mousewheel", p, !1)
        }
    }

    function l(b) {
        switch (b) {
            case "Open":
                a.style.width = f + "px";
                a.style.height = e + "px";
                a.style.border = "2px solid";
                h.style.width = f + "px";
                h.style.height = e + "px";
                s.alt = "Open";
                s.src = TGOS.RES_PATH + "ShowClose.gif";
                s.status = !0;
                break;
            case "Close":
                a.style.width = "11px", a.style.height = "11px", a.style.border = "0px", h.style.width = "11px", h.style.height = "11px", s.alt = "Open", s.src = TGOS.RES_PATH + "ShowOpen.gif", s.status = !1
        }
    }
    var h = null,
        m = null,
        n = null,
        p = null,
        s, q = null,
        v = null;
    this.Show = function(b) {
        b ? (a.style.display = "inline", l("Open")) : a.style.display = "none"
    };
    this.Minimize = function() {
        l("Close")
    };
    this.FinalRelease = function() {
        d.RemoveElement(this);
        p && p.FinalRelease && p.FinalRelease();
        p = null;
        n &&
            n.FinalRelease && n && n.FinalRelease && n.FinalRelease();
        n = null;
        m && a.removeChild(m);
        m = null
    };
    this.CenterXY = function() {
        return new MapPoint(n.getCenterX(), n.getCenterY())
    };
    this.SelectAreaHide = function() {
        m_IndexObj.style.visibility = "hidden"
    };
    this.SelectAreaShow = function() {
        m_IndexObj.style.visibility = "visible"
    };
    this.getTarget = function() {
        return d
    };
    this.getMapBase = function() {
        return n
    };
    this.UpdateElement = function() {
        p.UpdateElement()
    };
    this.RebuildElement = function() {
        null != p && p.RebuildElement();
        if (null != n) {
            var a =
                d.getScale() / Math.pow(2, g);
            n.MoveToAnimation(new MapPoint(d.getCenterX(), d.getCenterY()), a)
        }
    };
    var x = new ScaleTransformation(1);
    x.putBaseScaleX(b.getBaseScaleX());
    x.putBaseScaleY(b.getBaseScaleY());
    h = document.createElement("div");
    a.appendChild(h);
    h.style.position = "absolute";
    h.style.right = "0px";
    h.style.bottom = "0px";
    this.setColor = function(a) {
        h.style.backgroundColor = a
    };
    h.style.width = f - 10 + "px";
    h.style.height = e - 10 + "px";
    h.style.overflow = "hidden";
    m = document.createElement("div");
    h.appendChild(m);
    m.style.position =
        "absolute";
    m.style.overflow = "hidden";
    m.style.right = "0px";
    m.style.bottom = "0px";
    m.style.width = f + "px";
    m.style.height = e + "px";
    s = h.ownerDocument.createElement("img");
    s.onreadystatechange = function() {
        m.style.right = s.offsetWidth - 10 + "px";
        m.style.width = f + "px";
        m.style.height = e + "px";
        s.onstatechange = null
    };
    h.appendChild(s);
    s.style.position = "absolute";
    s.style.right = "0px";
    s.style.bottom = "0px";
    s.status = !0;
    s.alt = "Close";
    s.style.cursor = "pointer";
    var A = null;
    this.setStyle = function(a) {};
    s.onclick = function() {
        var b = function(d,
            e) {
            var f = parseInt(h.style.width),
                g = parseInt(h.style.height),
                k = d - f,
                l = e - g;
            10 > Math.abs(k) || 10 > Math.abs(l) ? (a.style.width = d + "px", a.style.height = e + "px", h.style.width = d + "px", h.style.height = e + "px", a.style.border = "0px", A = null, s.status && (a.style.border = "2px solid", a.style.width = d + "px", a.style.height = e + "px", h.style.width = d + "px", h.style.height = e + "px")) : (a.style.width = f + k / 2 + "px", a.style.height = g + l / 2 + "px", h.style.width = f + k / 2 + "px", h.style.height = g + l / 2 + "px", A = setTimeout(function() {
                b(d, e)
            }, 50))
        };
        null != A && clearTimeout(A);
        A = null;
        (s.status = !s.status) ? (s.alt = "Close", s.src = TGOS.RES_PATH + "ShowClose.gif", b(f, e)) : (s.alt = "Open", s.src = TGOS.RES_PATH + "ShowOpen.gif", a.style.border = "2px solid", b(parseInt(s.offsetWidth), parseInt(s.offsetHeight)))
    };
    n = new MapBase(m, x, "0px", "0px", "100%", "100%");
    n.MoveMapTo(d.getCenterX(), d.getCenterY());
    n.RefreshMap(!0);
    p = new function(a) {
        var b = a.getTarget(),
            d = a.getMapBase(),
            e = !1,
            f = new k(!1, !1),
            g = d.getHPackage(),
            h = document.createElement("div");
        g.appendChild(h);
        h.style.position = "absolute";
        h.style.overflow =
            "hidden";
        h.style.width = "40px";
        h.style.height = "40px";
        h.style.left = "15px";
        h.style.top = "15px";
        h.style.border = "inset 1px #0300FA";
        a = h.ownerDocument.createElement("div");
        h.appendChild(a);
        a.style.filter = "Alpha(Opacity=35)";
        a.style.opacity = 0.35;
        a.style.MozOpacity = 0.35;
        a.style.MozUserSelect = "none";
        a.style.backgroundColor = "#5e38ff";
        a.style.width = "100%";
        a.style.height = "100%";
        var l, m, n = function(a) {
                var e = a.screenX - l,
                    f = a.screenY - m;
                l = a.screenX;
                m = a.screenY;
                b.MoveMapTo(b.getCenterX() + d.ToMapDistX(e), b.getCenterY() +
                    d.ToMapDistY(f));
                b.RefreshMap(!1)
            },
            p = function(a) {
                h.style.cursor = "default";
                DetachEvent(h, "mousemove", n, !0);
                DetachEvent(h, "mouseup", p, !1);
                b.RefreshMap(!0)
            },
            s = function(a) {
                util.disableDefault(a);
                l = a.screenX;
                m = a.screenY;
                h.style.cursor = "move";
                AttachEvent(h, "mousemove", n, !0);
                AttachEvent(h, "mouseup", p, !1)
            };
        AttachEvent(h, "mousedown", s, !1);
        d.SelectMapTool(f);
        d.AddElement(this);
        this.FinalRelease = function() {
            d.RemoveElement(this);
            DetachEvent(h, "mousedown", s, !1);
            f && f.FinalRelease && f.FinalRelease();
            f = null;
            h && g.removeChild(h);
            h = null
        };
        this.UpdateElement = function() {
            if (f.IsMapAction()) e || (e = !0, q.x = parseInt(h.style.left) + parseInt(h.style.width) / 2, q.y = parseInt(h.style.top) + parseInt(h.style.height) / 2, a = d.ToMapPoint(q.x, q.y), b.MoveMapTo(a.x, a.y), b.RefreshMap(!1), e = !1);
            else {
                var a = b.ToMapPoint(0, 0),
                    g = b.ToMapPoint(b.getClientWidth(), b.getClientHeight());
                q = d.FromMapPoint(a.x, a.y);
                v = d.FromMapPoint(g.x, g.y);
                q.x && q.y && v.x && v.y && (h.style.left = q.x + "px", h.style.top = q.y + "px", h.style.width = v.x - q.x + "px", h.style.height = v.y - q.y + "px")
            }
        };
        this.RebuildElement =
            function() {
                f.IsMapAction() && !e && (e = !0, b.RefreshMap(!0), e = !1)
            }
    }(this);
    d.AddElement(this);
    this.RebuildElement()
};
TGOS.CTRL_ZINDEX = 214748364;
TGOS.CopyrightControl = function(a, d) {
    this.getDiv = function() {
        return e
    };
    this.getPosition = function() {
        return b
    };
    this.setPosition = function(f) {
        var k = a.controls[b].indexOf(e);
        d in TGOS.TGControlPosition && (0 <= k && a.controls[b].removeAt(k), a.controls[f].push(e), b = f)
    };
    var b = null,
        f = null,
        e = null,
        b = TGOS.TGControlPosition.BOTTOM_LEFT;
    d in TGOS.TGControlPosition && (b = d);
    e = document.createElement("div");
    util.disableSelect(e);
    e.style.width = "250px";
    e.style.height = "20px";
    f = document.createElement("img");
    e.appendChild(f);
    f.src = TGOS.RES_PATH + "copyright.png";
    f.style.position = "absolute";
    e.style.position = "absolute";
    this.setPosition(b)
};
TGOS.MapTypeBarControl = function(a, d, b, f) {
    function e(b) {
        v = document.createElement("div");
        v.style.position = "absolute";
        v.style.overflow = "hidden";
        x = document.createElement("table");
        x.style.borderSpacing = "0";
        x.border = "0";
        v.appendChild(x);
        for (var d = x.insertRow(-1), e = 0; e < b.length; e++)
            if (b[e] in a.getDocName()) {
                var f = d.insertCell(0);
                f.width = h + "px";
                f.height = m + "px";
                f.style.padding = "0px";
                f.style.backgroundRepeat = "no-repeat";
                f.style.cursor = "pointer";
                f.mapTypeId = b[e];
                var g = document.createElement("img");
                f.appendChild(g);
                f.imgElem = g;
                g.mapTypeId = b[e];
                AttachEvent(g, "click", function(a) {
                    a = util.eventTarget(a);
                    n.getMapTypeId() != a.mapTypeId && (a.src = l[a.mapTypeId + "_IMG_D"], k(a.mapTypeId))
                });
                n.getMapTypeId() == b[e] ? g.src = l[b[e] + "_IMG_D"] : g.src = l[b[e] + "_IMG"]
            }
        AttachEvent(q, "mouseover", function(a) {
            s.mapTypeControlStyle != TGOS.TGMapTypeControlStyle.DROPDOWN_MENU && z.expand()
        });
        AttachEvent(q, "mouseout", function(a) {
            s.mapTypeControlStyle != TGOS.TGMapTypeControlStyle.DROPDOWN_MENU && z.minimize()
        });
        q.appendChild(v);
        util.disableSelect(v)
    }

    function g(b) {
        A = document.createElement("div");
        A.style.position = "absolute";
        A.style.right = "0px";
        A.style.backgroundColor = "#CCCCDD";
        A.style.borderStyle = "solid";
        A.style.borderColor = "#888888";
        A.style.fontFamily = "Times New Roman,\u5fae\u8edf\u6b63\u9ed1\u9ad4";
        D = document.createElement("div");
        D.innerHTML = "\u5730\u5716\u985e\u578b";
        D.style.margin = "5px";
        B = document.createElement("select");
        B.style.margin = "5px";
        B.style.marginTop = "0px";
        A.appendChild(D);
        A.appendChild(B);
        util.disableSelect(D);
        AttachEvent(B, "change",
            function(a) {
                k(B.value)
            });
        for (var d = 0; d < b.length; d++)
            if (b[d] in a.getDocName()) {
                var e = new Option(TGOS.TGMapTypeId_zh_TW[b[d]], b[d]);
                B.add(e)
            }
        q.appendChild(A)
    }

    function k(a) {
        z.setActiveType(a);
        n.setMapTypeId(a);
        for (var d = 0; d < f.length; d++) f[d].mapTypeId == a ? f[d].putVisible(!0) : f[d].putVisible(!1);
        b.getMapBase().RefreshMap(!0)
    }
    var l = {
            ROADMAP_IMG_D: TGOS.RES_PATH + "ROADMAP_d.png",
            SATELLITE_IMG_D: TGOS.RES_PATH + "SATELLITE_d.png",
            HYBRID_IMG_D: TGOS.RES_PATH + "HYBRID_d.png",
            TGOSMAP_IMG_D: TGOS.RES_PATH + "TGOSMAP_d.png",
            NLSCMAP_IMG_D: TGOS.RES_PATH + "NLSCMAP_d.png",
            MOTCMAP_IMG_D: TGOS.RES_PATH + "MOTCMAP_d.png",
            F2IMAGE_IMG_D: TGOS.RES_PATH + "F2IMAGE_d.png",
            HILLSHADE_IMG_D: TGOS.RES_PATH + "HILLSHADE_d.png",
            SEGISMAP_IMG_D: TGOS.RES_PATH + "SEGISMAP_d.png",
            HILLSHADEMIX_IMG_D: TGOS.RES_PATH + "HILLSHADEMIX_d.png",
            ROADMAP_IMG: TGOS.RES_PATH + "ROADMAP_n.png",
            SATELLITE_IMG: TGOS.RES_PATH + "SATELLITE_n.png",
            HYBRID_IMG: TGOS.RES_PATH + "HYBRID_n.png",
            TGOSMAP_IMG: TGOS.RES_PATH + "TGOSMAP_n.png",
            NLSCMAP_IMG: TGOS.RES_PATH + "NLSCMAP_n.png",
            MOTCMAP_IMG: TGOS.RES_PATH +
                "MOTCMAP_n.png",
            F2IMAGE_IMG: TGOS.RES_PATH + "F2IMAGE_n.png",
            HILLSHADE_IMG: TGOS.RES_PATH + "HILLSHADE_n.png",
            SEGISMAP_IMG: TGOS.RES_PATH + "SEGISMAP_n.png",
            HILLSHADEMIX_IMG: TGOS.RES_PATH + "HILLSHADEMIX_n.png"
        },
        h = 70,
        m = 70,
        n = a;
    n.getDiv();
    var p = n.getMapBase(),
        s = d,
        q = null,
        v = null,
        x = null,
        A = null,
        B = null,
        D = null,
        y = d.controlPosition,
        z = this;
    this.ani = null;
    this.expand = function() {
        for (var a = 0, b = 0, b = 0; b < x.rows[0].cells.length; b++) x.rows[0].cells[b].style.display = "table-cell", a += h;
        var d = parseInt(q.style.width),
            e = a - d;
        this.ani &&
            this.ani.stop();
        this.ani = TGOS.fx.createAnimation({
            easing: TGOS.fx.easing.quadOut,
            type: window.requestAnimationFrame ? "req" : "setTimeout",
            duration: 200,
            onAnimation: function(a) {
                q.style.width = d + parseInt(e * a) + "px"
            },
            onEnd: function() {
                q.style.width = a + "px"
            }
        });
        this.ani.play()
    };
    this.minimize = function() {
        for (var a = 0; a < x.rows[0].cells.length; a++) n.getMapTypeId() == x.rows[0].cells[a].mapTypeId ? x.rows[0].cells[a].style.display = "table-cell" : x.rows[0].cells[a].style.display = "none";
        var b = parseInt(q.style.width),
            d = b - h;
        this.ani &&
            this.ani.stop();
        this.ani = TGOS.fx.createAnimation({
            easing: TGOS.fx.easing.quadOut,
            type: window.requestAnimationFrame ? "req" : "setTimeout",
            duration: 200,
            onAnimation: function(a) {
                q.style.width = b - parseInt(d * a) + "px"
            },
            onEnd: function() {
                q.style.width = h + "px"
            }
        });
        this.ani.play()
    };
    this.getDiv = function() {
        return q
    };
    this.init = function() {
        q = document.createElement("div");
        q.style.position = "absolute";
        q.style.padding = "5px";
        q.setAttribute("class", "tgMapTypeCtrl");
        e(d.mapTypeIds);
        g(d.mapTypeIds);
        this.setStyle(TGOS.TGMapTypeControlStyle.DEFAULT);
        this.setPosition(y)
    };
    this.setWms = function(a, b) {
        for (var d = defaultLayer; d < pLyr.length; d++) pLyr[d].getName() == a && pLyr[d].putVisible(b);
        p.RefreshMap(!0)
    };
    this.removeWms = function(a) {
        for (var b = defaultLayer; b < pLyr.length; b++) {
            if (pLyr[b].getName() == a) {
                p.RemoveLayer(pLyr[b]);
                for (var d = pLyr, e = b, f = Array(d.length - 1), g = 0, h = 0; h < d.length - 1; h++) h != e && (f[g] = d[h], g++);
                pLyr = f
            }
            p.RefreshMap(!0)
        }
    };
    this.setPosition = function(b) {
        var d = a.controls[y].indexOf(q);
        b in TGOS.TGControlPosition && (0 <= d && a.controls[y].removeAt(d),
            a.controls[b].push(q), y = b)
    };
    this.setStyle = function(a) {
        if (a) {
            this.ani && this.ani.stop();
            v.style.display = "inline";
            A.style.display = "none";
            if (a == TGOS.TGMapTypeControlStyle.DEFAULT || a == TGOS.TGMapTypeControlStyle.HORIZONTAL_BAR) v.style.display = "inline", A.style.display = "none", q.style.width = h + "px", q.style.height = h + "px";
            else if (a == TGOS.TGMapTypeControlStyle.DROPDOWN_MENU) v.style.display = "none", A.style.display = "inline", q.style.height = A.scrollHeight + 10 + "px", q.style.width = A.scrollWidth + 10 + "px";
            else throw "invalide map type control style";
            s.mapTypeControlStyle = a
        }
    };
    this.setMapTypeIds = function(a) {
        q.removeChild(A);
        q.removeChild(v);
        e(a);
        g(a);
        s.mapTypeIds = a;
        var b = n.getDocName();
        a[0] in b && (k(a[0]), this.minimize())
    };
    this.setActiveType = function(a) {
        for (var b = 0; b < x.rows[0].cells.length; b++) {
            var d = x.rows[0].cells[b];
            d.imgElem.src = d.mapTypeId == a ? l[d.imgElem.mapTypeId + "_IMG_D"] : l[d.imgElem.mapTypeId + "_IMG"]
        }
    };
    this.remove = function() {
        var b = a.controls[y];
        b.removeAt(b.indexOf(q))
    };
    this.display = function(a) {
        q.style.display = a ? "inline" : "none"
    };
    this.setOptions =
        function(a) {
            void 0 != a.mapTypeIds && (this.setMapTypeIds(a.mapTypeIds), this.setStyle(s.mapTypeControlStyle));
            void 0 != a.mapTypeControlStyle && this.setStyle(a.mapTypeControlStyle);
            void 0 != a.controlPosition && this.setPosition(a.controlPosition)
        };
    this.getDiv = function() {
        return q
    };
    this.init()
};
TGOS.LevelBarControl = function(a, d, b, f, e) {
    function g(a) {
        d.putMapLevel(d.getMapLevel() + a);
        d.FitLevel();
        m.RefreshMap(!0)
    }
    this.getDiv = function() {
        return l
    };
    var k = b,
        l = null,
        h = 16,
        m = null,
        l = document.createElement("table");
    l.style.position = "absolute";
    l.style.paddingLeft = "20px";
    l.border = "0";
    l.cellPadding = "0";
    l.cellSpacing = "0";
    l.id = "pLevelBarBar";
    l.name = "pLevelBarBar";
    util.disableSelect(l);
    a = l.insertRow(-1);
    var n = a.insertCell(-1);
    n.align = "center";
    a = document.createElement("table");
    n.appendChild(a);
    a.border = "0";
    a.cellPadding = "0";
    a.cellSpacing = "0";
    a.width = "34";
    n = a.insertRow(-1);
    a = n.insertCell(-1);
    a.style.padding = "0px 4px 0px 0px";
    var p = a.ownerDocument.createElement("img");
    a.appendChild(p);
    AttachEvent(p, "click", function() {
        g(1)
    }, !1);
    p.style.cursor = "pointer";
    p.style["vertical-align"] = "top";
    a = l.insertRow(-1);
    n = a.insertCell(-1);
    n.align = "center";
    a = document.createElement("table");
    n.appendChild(a);
    a.border = "0";
    a.cellPadding = "0";
    a.cellSpacing = "0";
    a.width = "34";
    var n = a.insertRow(-1),
        s = n.insertCell(-1),
        q = s.ownerDocument.createElement("div");
    s.appendChild(q);
    q.style.position = "relative";
    q.style.width = "12px";
    q.style.height = "100%";
    var v = document.createElement("img");
    q.appendChild(v);
    v.style.position = "absolute";
    v.src = TGOS.RES_PATH + "icons/bar_06.png";
    v.style.left = "0px";
    v.style.bottom = "0px";
    v.width = "34";
    v.height = "16";
    AttachEvent(q, "mousedown", function(a) {
        function b(a) {
            d.putMapLevel(Math.round(g + (f - a.clientY) / h));
            m.RefreshMap(!1)
        }

        function e(a) {
            DetachEvent(v, "mousemove", b, !0);
            DetachEvent(v, "mouseup", e, !0);
            d.FitLevel();
            m.RefreshMap(!0)
        }
        util.disableDefault(a);
        if (a.srcElement == v) {
            var f = a.clientY,
                g = d.getMapLevel();
            AttachEvent(v, "mousemove", b, !0);
            AttachEvent(v, "mouseup", e, !0)
        } else d.putMapLevel((q.clientHeight - a.offsetY) / h - 0.5), d.FitLevel(), m.RefreshMap(!0)
    }, !1);
    s.align = "center";
    s.style.height = "0px";
    n = a.insertRow(-1);
    a = n.insertCell(-1);
    a.align = "center";
    a.style.padding = "0px 4px 0px 0px";
    var x = a.ownerDocument.createElement("img");
    a.appendChild(x);
    x.src = TGOS.RES_PATH + "/bar_bottom.png";
    AttachEvent(x, "click", function() {
        g(-1)
    }, !1);
    x.style.cursor = "pointer";
    this.Initialize =
        function(a) {
            m = a
        };
    this.UpdateElement = function() {
        var a, b = TGOS.MapTypeMaxZoomLevel[e.getCoordSys()][e.getMapTypeId()];
        a = Math.max(d.getMapMinLevel(), 0);
        b = Math.min(d.getMapMaxLevel(), b) - a;
        s.style.height = (b + 1) * h + "px";
        a = (d.getMapLevel() - a) * h;
        v.style.bottom = a + "px"
    };
    this.RebuildElement = function() {};
    this.display = function(a) {
        l.style.display = a ? "" : "none"
    };
    this.setPosition = function(a) {
        var b = e.controls[k].indexOf(l);
        a in TGOS.TGControlPosition && (0 <= b && e.controls[k].removeAt(b), e.controls[a].push(l), k = a)
    };
    this.setStyle =
        function(a) {
            switch (a) {
                case TGOS.TGNavigationControlStyle.SMALL:
                    q.style.display = "none";
                    v.style.display = "none";
                    s.style.display = "none";
                    p.src = TGOS.RES_PATH + "/bar_head.png";
                    p.onmousedown = null;
                    p.onmouseup = null;
                    x.src = TGOS.RES_PATH + "/bar_bottom.png";
                    x.onmousedown = null;
                    x.onmouseup = null;
                    break;
                case TGOS.TGNavigationControlStyle.MEDIUM:
                    q.style.display = "none";
                    v.style.display = "none";
                    s.style.display = "none";
                    p.src = TGOS.RES_PATH + "TGOS01_01.png";
                    p.onmousedown = function() {
                        this.src = TGOS.RES_PATH + "TGOS02_01.png"
                    };
                    p.onmouseup =
                        function() {
                            this.src = TGOS.RES_PATH + "TGOS01_01.png"
                        };
                    x.src = TGOS.RES_PATH + "TGOS01_02.png";
                    x.onmousedown = function() {
                        this.src = TGOS.RES_PATH + "TGOS02_02.png"
                    };
                    x.onmouseup = function() {
                        this.src = TGOS.RES_PATH + "TGOS01_02.png"
                    };
                    break;
                case TGOS.TGNavigationControlStyle.LARGE:
                    p.src = TGOS.RES_PATH + "/bar_head.png";
                    p.onmousedown = null;
                    p.onmouseup = null;
                    x.src = TGOS.RES_PATH + "/bar_bottom.png";
                    x.onmousedown = null;
                    x.onmouseup = null;
                    a = Math.max(1, d.getMapMaxLevel()) * h;
                    q.style.display = "";
                    v.style.display = "";
                    s.style.display = "";
                    s.style.backgroundImage =
                        "url(" + TGOS.RES_PATH + "bar_02.png)";
                    s.style.height = a + "px";
                    a = (d.getMapLevel() - 0.5) * h - v.clientHeight / 2;
                    v.style.bottom = a + "px";
                    break;
                default:
                    q.style.display = "none", v.style.display = "none", s.style.display = "none", p.src = TGOS.RES_PATH + "/bar_head.png", p.onmousedown = null, p.onmouseup = null, x.src = TGOS.RES_PATH + "/bar_bottom.png", x.onmousedown = null, x.onmouseup = null
            }
            this.UpdateElement()
        };
    this.setOptions = function(a) {
        void 0 != a.navigationControlStyle && this.setStyle(a.navigationControlStyle);
        void 0 != a.controlPosition &&
            this.setPosition(a.controlPosition)
    };
    e.controls[k].push(l);
    this.setPosition(b);
    this.setStyle(f);
    this.UpdateElement()
};
TGOS.ScaleBarControl = function(a, d, b, f, e) {
    function g(a, b, d, e, f, g) {
        var h = document.createElement("div");
        a.appendChild(h);
        h.style.position = "relative";
        h.style.width = f + "px";
        h.style.height = g + "px";
        h.style.overflow = "hidden";
        a = document.createElement("img");
        h.appendChild(a);
        a.src = b;
        a.style.position = "absolute";
        a.style.left = -d + "px";
        a.style.top = -e + "px";
        h.Img = a;
        return h
    }
    this.getDiv = function() {
        return h
    };
    this.setPosition = function(a) {
        var b = e.controls[m].indexOf(l);
        a in TGOS.TGControlPosition && (0 <= b && e.controls[m].removeAt(b),
            e.controls[a].push(l), m = a)
    };
    this.setStyle = function(a) {};
    this.setOptions = function(a) {
        void 0 != a.scaleControlStyle && this.setStyle(a.scaleControlStyle);
        void 0 != a.controlPosition && this.setPosition(a.controlPosition)
    };
    var k = document.createElement("div");
    k.style.position = "relative";
    var l = document.createElement("div");
    l.style.overflow = "visible";
    l.style.padding = "10px";
    var h = null,
        m = b,
        h = document.createElement("div");
    h.style.position = "relative";
    h.style.height = "36px";
    h.style.overflow = "hidden";
    h.id = "pScaleBar";
    h.name = "pScaleBar";
    g(h, TGOS.RES_PATH + "scale.png", 0, 0, 4, 32).style.position = "absolute";
    a = g(h, TGOS.RES_PATH + "scale.png", 4, 14, 508, 4);
    a.style.position = "absolute";
    a.style.left = "4px";
    a.style.top = "14px";
    var n = g(h, TGOS.RES_PATH + "scale.png", 0, 0, 4, 15);
    n.style.position = "absolute";
    n.style.left = "0px";
    n.style.top = "0px";
    var p = g(h, TGOS.RES_PATH + "scale.png", 0, 17, 4, 15);
    p.style.position = "absolute";
    p.style.left = "0px";
    p.style.top = "17px";
    a = g(h, TGOS.RES_PATH + "scale.png", 511, 14, 1, 4);
    a.style.position = "absolute";
    a.style.right =
        "0px";
    a.style.top = "14px";
    var s = h.ownerDocument.createElement("div");
    h.appendChild(s);
    s.className = "text";
    s.style.fontSize = "0.7em";
    s.style.position = "absolute";
    s.style.left = "25px";
    s.style.top = "18px";
    var q = h.ownerDocument.createElement("div");
    h.appendChild(q);
    q.className = "text";
    q.style.fontSize = "0.7em";
    q.style.position = "absolute";
    q.style.left = "25px";
    q.style.top = "-2px";
    l.appendChild(k);
    l.appendChild(h);
    var v = f ? f : TGOS.TGScaleControlStyle.DEFAULT;
    this.setStyle = function(a) {
        if (a) {
            v = a;
            switch (v) {
                case TGOS.TGScaleControlStyle.TEXT:
                    k.style.display =
                        "block";
                    h.style.display = "none";
                    break;
                default:
                    k.style.display = "none", h.style.display = "block"
            }
            this.UpdateElement()
        }
    };
    var x = new HorizontalDatum(6378137, 0),
        A = new MercatorProjection(0, 0, 0, 1);
    this.UpdateElement = function() {
        if (v == TGOS.TGScaleControlStyle.TEXT) {
            var a = TGOS.GetMapScale(e.getCoordSys(), e.getZoom());
            k.innerHTML = " 1 : " + a
        } else {
            var b = d.ToMapDistX(250),
                f = b,
                g = 1,
                a = "\u516c\u5c3a";
            6615 < b && (f /= 1E3, g = 1E3, a = "\u516c\u91cc");
            var l = Math.floor(Math.log(f) / Math.LN10),
                l = Math.pow(10, l),
                f = Math.floor(f / l),
                f = (2 >
                    f ? 1 : 5 > f ? 2 : 5) * l,
                g = d.FromMapDistX(f * g) + 2,
                m = b / 0.3048,
                l = m,
                u = 1,
                b = "\u82f1\u544e";
            21702 < m && (l /= 5280, u = 5280, b = "\u82f1\u91cc");
            m = Math.floor(Math.log(l) / Math.LN10);
            m = Math.pow(10, m);
            l = Math.floor(l / m);
            l = (2 > l ? 1 : 5 > l ? 2 : 5) * m;
            u = d.FromMapDistX(0.3048 * l * u) + 2;
            A.Inverse(x, new CPoint3(d.getCenterX(), d.getCenterY(), 0));
            h.style.width = Math.round(Math.max(g, u)) + "px";
            n.style.left = Math.round(g - 4) + "px";
            p.style.left = Math.round(u - 4) + "px";
            q.innerHTML = f + a;
            s.innerHTML = l + b;
            Math.round(Math.max(g, u))
        }
    };
    this.display = function(a) {
        l.style.display = !1 == a ? "none" : ""
    };
    this.ControlOptionsChang = function(a, b) {
        Location(b.getClientWidth(), b.getClientHeight())
    };
    this.setPosition(m);
    this.setStyle(v);
    this.UpdateElement()
};

function initControlArray(a) {
    var d = a.controls,
        b = function() {
            f.BOTTOM_CENTER_update.call(d.BOTTOM_CENTER);
            f.BOTTOM_LEFT_update.call(d.BOTTOM_LEFT);
            f.BOTTOM_RIGHT_update.call(d.BOTTOM_RIGHT);
            f.LEFT_BOTTOM_update.call(d.LEFT_BOTTOM);
            f.LEFT_CENTER_update.call(d.LEFT_CENTER);
            f.LEFT_TOP_update.call(d.LEFT_TOP);
            f.RIGHT_BOTTOM_update.call(d.RIGHT_BOTTOM);
            f.RIGHT_CENTER_update.call(d.RIGHT_CENTER);
            f.RIGHT_TOP_update.call(d.RIGHT_TOP);
            f.TOP_CENTER_update.call(d.TOP_CENTER);
            f.TOP_LEFT_update.call(d.TOP_LEFT);
            f.TOP_RIGHT_update.call(d.TOP_RIGHT)
        },
        f = {
            BOTTOM_CENTER_update: function() {
                var b = 0,
                    e = 0;
                d.BOTTOM_CENTER.forEach(function(d, f) {
                    var m = parseInt(d.clientWidth, 10),
                        n = parseInt(d.clientHeight, 10),
                        p = 0 <= a.getMapSize().width / 2 - m / 2 ? a.getMapSize().width / 2 - m / 2 : 0;
                    b += m;
                    e = Math.max(e, n);
                    d.style.right = "auto";
                    d.style.left = p + "px";
                    d.style.top = "auto";
                    d.style.bottom = "0px"
                });
                d.BOTTOM_CENTER.totalWidth = b;
                d.BOTTOM_CENTER.totalHeight = e
            },
            BOTTOM_LEFT_update: function() {
                var a = 0,
                    b = 0;
                d.BOTTOM_LEFT.forEach(function(d, e) {
                    var f = parseInt(d.scrollWidth,
                            10),
                        n = parseInt(d.scrollHeight, 10);
                    a += f;
                    b = Math.max(b, n);
                    d.style.right = "auto";
                    d.style.left = a - f + "px";
                    d.style.top = "auto";
                    d.style.bottom = "0px"
                });
                d.BOTTOM_LEFT.totalWidth = a;
                d.BOTTOM_LEFT.totalHeight = b
            },
            BOTTOM_RIGHT_update: function() {
                var a = 0,
                    b = 0;
                d.BOTTOM_RIGHT.forEach(function(d, e) {
                    var f = parseInt(d.clientWidth, 10),
                        n = parseInt(d.clientHeight, 10);
                    a += f;
                    b = Math.max(b, n);
                    d.style.left = "auto";
                    d.style.right = a - f + "px";
                    d.style.top = "auto";
                    d.style.bottom = "0px"
                });
                d.BOTTOM_RIGHT.totalWidth = a;
                d.BOTTOM_RIGHT.totalHeight = b
            },
            TOP_LEFT_update: function() {
                var a = 0,
                    b = 0;
                d.TOP_LEFT.forEach(function(d, e) {
                    var f = parseInt(d.clientWidth, 10),
                        n = parseInt(d.clientHeight, 10);
                    a += f;
                    b = Math.max(b, n);
                    d.style.right = "auto";
                    d.style.left = a - f + "px";
                    d.style.bottom = "auto";
                    d.style.top = "0px"
                });
                d.TOP_LEFT.totalWidth = a;
                d.TOP_LEFT.totalHeight = b
            },
            TOP_CENTER_update: function() {
                var b = 0,
                    e = 0;
                d.TOP_CENTER.forEach(function(d, f) {
                    var m = parseInt(d.clientWidth, 10),
                        n = parseInt(d.clientHeight, 10),
                        p = 0 <= a.getMapSize().width / 2 - m / 2 ? a.getMapSize().width / 2 - m / 2 : 0;
                    b += m;
                    e = Math.max(e,
                        n);
                    d.style.right = "auto";
                    d.style.left = p + "px";
                    d.style.bottom = "auto";
                    d.style.top = "0px"
                });
                d.TOP_CENTER.totalWidth = b;
                d.TOP_CENTER.totalHeight = e
            },
            TOP_RIGHT_update: function() {
                var a = 0,
                    b = 0;
                d.TOP_RIGHT.forEach(function(d, e) {
                    var f = parseInt(d.clientWidth, 10),
                        n = parseInt(d.clientHeight, 10);
                    a += f;
                    b = Math.max(b, n);
                    d.style.left = "auto";
                    d.style.right = a - f + "px";
                    d.style.bottom = "auto";
                    d.style.top = "0px"
                });
                d.TOP_RIGHT.totalWidth = a;
                d.TOP_RIGHT.totalHeight = b
            },
            LEFT_TOP_update: function() {
                var a = 0,
                    b = 0,
                    e = 0;
                0 < d.TOP_LEFT.getLength() &&
                    (e = parseInt(d.TOP_LEFT.totalHeight));
                d.LEFT_TOP.forEach(function(d, f) {
                    var n = parseInt(d.clientWidth, 10),
                        p = parseInt(d.clientHeight, 10);
                    a += n;
                    b += p;
                    d.style.bottom = "auto";
                    d.style.right = "auto";
                    d.style.left = "0px";
                    d.style.top = b - p + e + "px"
                });
                d.LEFT_TOP.totalWidth = a;
                d.LEFT_TOP.totalHeight = b
            },
            LEFT_CENTER_update: function() {
                var b = 0,
                    e = 0;
                d.LEFT_CENTER.forEach(function(d, f) {
                    var m = parseInt(d.clientWidth, 10),
                        n = parseInt(d.clientHeight, 10);
                    b += m;
                    e += n;
                    m = 0 <= a.getMapSize().height / 2 - n / 2 ? a.getMapSize().height / 2 - n / 2 : 0;
                    d.style.bottom =
                        "auto";
                    d.style.right = "auto";
                    d.style.left = "0px";
                    d.style.top = m + "px"
                });
                d.LEFT_CENTER.totalWidth = b;
                d.LEFT_CENTER.totalHeight = e
            },
            LEFT_BOTTOM_update: function() {
                var a = 0,
                    b = 0,
                    e = 0;
                0 < d.BOTTOM_LEFT.getLength() && (e = parseInt(d.BOTTOM_LEFT.totalHeight));
                d.LEFT_BOTTOM.forEach(function(d, f) {
                    var n = parseInt(d.clientWidth, 10),
                        p = parseInt(d.clientHeight, 10);
                    a += n;
                    b += p;
                    d.style.top = "auto";
                    d.style.right = "auto";
                    d.style.left = "0px";
                    d.style.bottom = e + b - p + "px"
                });
                d.LEFT_BOTTOM.totalWidth = a;
                d.LEFT_BOTTOM.totalHeight = b
            },
            RIGHT_TOP_update: function() {
                var a =
                    0,
                    b = 0,
                    e = 0;
                0 < d.TOP_RIGHT.getLength() && (e = parseInt(d.TOP_RIGHT.totalHeight));
                d.RIGHT_TOP.forEach(function(d, f) {
                    var n = parseInt(d.clientWidth, 10),
                        p = parseInt(d.clientHeight, 10);
                    a += n;
                    b += p;
                    d.style.bottom = "auto";
                    d.style.left = "auto";
                    d.style.right = "0px";
                    d.style.top = e + b - p + "px"
                });
                d.RIGHT_TOP.totalWidth = a;
                d.RIGHT_TOP.totalHeight = b
            },
            RIGHT_CENTER_update: function() {
                var b = 0,
                    e = 0;
                d.RIGHT_CENTER.forEach(function(d, f) {
                    var m = parseInt(d.clientWidth, 10),
                        n = parseInt(d.clientHeight, 10),
                        p = 0 <= a.getMapSize().height / 2 - n / 2 ? a.getMapSize().height /
                        2 - n / 2 : 0;
                    b += m;
                    e += n;
                    d.style.bottom = "auto";
                    d.style.left = "auto";
                    d.style.right = "0px";
                    d.style.top = p + "px"
                });
                d.RIGHT_CENTER.totalWidth = b;
                d.RIGHT_CENTER.totalHeight = e
            },
            RIGHT_BOTTOM_update: function() {
                var a = 0,
                    b = 0,
                    e = 0;
                0 < d.BOTTOM_RIGHT.getLength() && (e = parseInt(d.BOTTOM_RIGHT.totalHeight));
                d.RIGHT_BOTTOM.forEach(function(d, f) {
                    var n = parseInt(d.clientWidth, 10),
                        p = parseInt(d.clientHeight, 10);
                    a += n;
                    b += p;
                    d.style.top = "auto";
                    d.style.left = "auto";
                    d.style.right = "0px";
                    d.style.bottom = b - p + e + "px"
                });
                d.RIGHT_BOTTOM.totalWidth = a;
                d.RIGHT_BOTTOM.totalHeight = b
            }
        },
        e;
    for (e in d) TGOS.TGEvent.addListener(d[e], "insert_at", function() {
        return function(d) {
            d = this.getAt(d);
            d.style.position = "absolute";
            a.getHPackage().appendChild(d);
            b()
        }
    }()), TGOS.TGEvent.addListener(d[e], "remove_at", function() {
        return function(d, e) {
            a.getHPackage().removeChild(e);
            b()
        }
    }()), TGOS.TGEvent.addListener(a, "resize", function() {
        b()
    })
};
(function() {
    TGOS.MVCArray = function() {
        this.arr_ = []
    };
    var a = TGOS.MVCArray.prototype;
    a.getAt = function(a) {
        return this.arr_[a]
    };
    a.getLength = function() {
        return this.arr_.length
    };
    a.push = function(a) {
        var b = this.arr_.length;
        0 >= b && (b = 0);
        return this.insertAt(b, a)
    };
    a.pop = function() {
        var a = this.arr_.length - 1;
        if (!(0 > a)) return this.removeAt(a)
    };
    a.forEach = function(a) {
        for (var b = 0; b < this.arr_.length; b++) a.call(this, this.arr_[b], b)
    };
    a.getArray = function() {
        return this.arr_
    };
    a.removeAt = function(a) {
        if (!(a > this.arr_.length -
                1)) {
            var b = this.arr_.splice(a, 1);
            TGOS.TGEvent.trigger_(this, "remove_at", a, b[0]);
            TGOS.TGEvent.trigger_(this, "changed");
            return b
        }
    };
    a.insertAt = function(a, b) {
        a > this.arr_.length || (this.arr_.splice(a, 0, b), TGOS.TGEvent.trigger_(this, "insert_at", a), TGOS.TGEvent.trigger_(this, "changed"))
    };
    a.setAt = function(a, b) {
        if (!(a > this.arr_.length - 1)) {
            var f = this.arr_[a];
            this.arr_.splice(a, 1, b);
            TGOS.TGEvent.trigger_(this, "set_at", a, f);
            TGOS.TGEvent.trigger_(this, "changed")
        }
    };
    a.indexOf = function(a) {
        return this.arr_.indexOf(a)
    };
    TGOS.RegisterEvent(TGOS.MVCArray, ["insert_at", "remove_at", "set_at", "changed"])
})();
(function() {
    var a = new HorizontalDatum(6378137, 0),
        d = new MercatorProjection(0, 0, 0, 1),
        b = function(a, b) {
            this.map = b;
            this.add = function(b) {
                a.push(b)
            };
            this.remove = function(b) {
                var d = this.map.getMapBase(),
                    e = a.indexOf(b); - 1 != e && (a.splice(e, 1), d.getHPackage().contains(b.getElement()) && d.getHPackage().removeChild(b.getElement()))
            };
            this.UpdateElement = function() {
                for (var b = 0; b < a.length; b++) a[b].update()
            };
            this.containing = function(b) {
                return 0 <= a.indexOf(b)
            }
        },
        f = function(a) {
            this.getArray = function() {
                return a
            };
            this.add =
                function(a) {
                    this.updateArrayOrder(a);
                    this.updateElementOrder(a)
                };
            this.push = function(b) {
                a.push(b)
            };
            this.sortElement = function() {
                if (!(1 >= a.length)) {
                    var b = a[0].getEventElement();
                    if (b)
                        for (var d = 1; d < a.length; d++) {
                            var e = a[d].getEventElement();
                            e && (e.insertAfter(b), b = e)
                        }
                }
            };
            this.updateArrayOrder = function(b) {
                var d = a.indexOf(b);
                0 <= d && a.splice(d, 1);
                d = b.getZIndex();
                if (0 === a.length) a.push(b);
                else
                    for (var e = 0; e < a.length; e++)
                        if (a[e].getZIndex() > d) {
                            a.splice(e, 0, b);
                            break
                        } else if (e == a.length - 1) {
                    a.push(b);
                    break
                }
            };
            this.updateElementOrder =
                function(b) {
                    if (b) {
                        var d = b.getEventElement();
                        if (d && (b = b.getZIndex(), 0 !== a.length))
                            for (var e = 0; e < a.length; e++) {
                                var f = a[e].getZIndex(),
                                    g = a[e].getEventElement();
                                if (g)
                                    if (f > b) {
                                        d.insertBefore(g);
                                        break
                                    } else if (e == a.length - 1) {
                                    d.toFront();
                                    break
                                }
                            }
                    }
                };
            this.containing = function(b) {
                return 0 <= a.indexOf(b)
            };
            this.remove = function(b) {
                b = a.indexOf(b);
                a.splice(b, 1)
            };
            this.UpdateElement = function() {
                for (var b = 0; b < a.length; b++) a[b].update && a[b].update()
            };
            this.RebuildElement = function() {
                for (var b = 0; b < a.length; b++) a[b].redraw &&
                    a[b].redraw()
            }
        };
    TGOS.TGTransStatus = {
        ERROR: "ERROR",
        INVALID_REQUEST: "INVALID_REQUEST",
        OK: "OK",
        OVER_QUERY_LIMIT: "OVER_QUERY_LIMIT",
        REQUEST_DENIED: "REQUEST_DENIED",
        UNKNOWN_ERROR: "UNKNOWN_ERROR"
    };
    TGOS.TGIndexViewControlOptions = {
        NORMAL: "NORMAL",
        MINIMIZED: "MINIMIZED"
    };
    TGOS.tgHash = "4LnJOioEgG8yJiWDwFuBFf9gMV7gOM53NfQmP4ZL4tU=";
    TGOS.APPID = "jsQd5cZYrT+o/4aTN1kTTHsQoNHFMWxacSZ3zgiIWNro+dilR/dC8w==";
    TGOS.APIKEY = "cGEErDNy5yN/1fQ0vyTOZrghjE+jIU6ubRXixv29QoWkc/agTxC5zD7Ib/9YSh6m679CbIXsVnkV3erqSOygiLuahd+mJ8ezGzNpdqRlaUKVAzBrCff40cuMpQpE+ldTYlpGkeKJflkq+BCGmTT5Uq6QAMDYu9vmQFRSfgg/hXT6lcd+z7RDgm8oiW8HjIrUdE+OHh5o52uYNtK2v7TcnNI5xD6IVTy2t+XvC5yvg9GpbVXDQaAnQjoj2WKmvEBdy8pDq+MIfbbEJ0nIhbXbWrQi5eMIe1dJLZ5JThjo3ikSF6CIh2x/f+ZJyok0+8mo/Dwp9VynbSyH/ASqiZch2IoQjADOGWKaaFdv+Ofh2Hs=";
    TGOS.MapTypeScales = {
        EPSG3825: {
            scales: [500, 1E3, 2500, 5E3, 1E4, 25E3, 5E4, 1E5, 25E4, 5E5, 1E6, 25E5, 5E6, 1E7, 125E5],
            levelX: 846666.666666667,
            levelY: -846666.666666667
        },
        EPSG3826: {
            scales: [500, 1E3,
                2500, 5E3, 1E4, 25E3, 5E4, 1E5, 25E4, 5E5, 1E6, 25E5, 5E6, 1E7, 125E5
            ],
            levelX: 846666.666666667,
            levelY: -846666.666666667
        },
        EPSG3857: {
            scales: [1128, 2257, 4514, 9028, 18056, 36112, 72224, 144448, 288896, 577792, 1155583, 2311167, 4622334, 9244667, 18489335, 36978669, 73957339, 147914678, 295829355, 591658711],
            levelX: 4.00750166855785E7,
            levelY: -4.00750166855785E7,
            factors: [0.298582141727292, 0.597164283481042, 1.19432856696208, 2.38865713392417, 4.77731426782187, 9.55462853564375, 19.1092570712875, 38.2185141426015, 76.4370282851765, 152.874056570353,
                305.748113140706, 611.496226281412, 1222.99245256282, 2445.98490512565, 4891.96981025127, 9783.93962050256, 19567.8792410051, 39135.7584820103, 78271.5169640206, 156543.033928041
            ]
        }
    };
    TGOS.TGControlPosition = {
        BOTTOM_CENTER: "BOTTOM_CENTER",
        BOTTOM_LEFT: "BOTTOM_LEFT",
        BOTTOM_RIGHT: "BOTTOM_RIGHT",
        LEFT_BOTTOM: "LEFT_BOTTOM",
        LEFT_CENTER: "LEFT_CENTER",
        LEFT_TOP: "LEFT_TOP",
        RIGHT_BOTTOM: "RIGHT_BOTTOM",
        RIGHT_CENTER: "RIGHT_CENTER",
        RIGHT_TOP: "RIGHT_TOP",
        TOP_CENTER: "TOP_CENTER",
        TOP_LEFT: "TOP_LEFT",
        TOP_RIGHT: "TOP_RIGHT"
    };
    TGOS.TGMapTypeControlStyle = {
        DEFAULT: "DEFAULT",
        DROPDOWN_MENU: "DROPDOWN_MENU",
        HORIZONTAL_BAR: "HORIZONTAL_BAR"
    };
    TGOS.TGNavigationControlStyle = {
        DEFAULT: "DEFAULT",
        LARGE: "LARGE",
        MEDIUM: "MEDIUM",
        SMALL: "SMALL"
    };
    TGOS.TGScaleControlStyle = {
        DEFAULT: "DEFAULT",
        TEXT: "TEXT",
        BAR: "BAR",
        HD: "HD"
    };
    TGOS.TGCoordSys = {
        EPSG3825: "EPSG3825",
        EPSG3826: "EPSG3826",
        EPSG3857: "EPSG3857"
    };
    TGOS.GetMapScale = function(a, b) {
        try {
            return TGOS.MapTypeScales[a].scales[TGOS.MapTypeScales[a].scales.length - 1 - b]
        } catch (d) {
            throw "[GetMapScale] Invalid Parameters";
        }
    };
    TGOS.TGOnlineMap =
        function(e, g, h) {
            this.getCurrentMapType = function() {
                return currentMapType
            };
            var k, l;
            this.getMapTypeTag = function() {
                return I
            };
            this.controls = {
                BOTTOM_CENTER: new TGOS.MVCArray,
                BOTTOM_LEFT: new TGOS.MVCArray,
                BOTTOM_RIGHT: new TGOS.MVCArray,
                LEFT_BOTTOM: new TGOS.MVCArray,
                LEFT_CENTER: new TGOS.MVCArray,
                LEFT_TOP: new TGOS.MVCArray,
                RIGHT_BOTTOM: new TGOS.MVCArray,
                RIGHT_CENTER: new TGOS.MVCArray,
                RIGHT_TOP: new TGOS.MVCArray,
                TOP_CENTER: new TGOS.MVCArray,
                TOP_LEFT: new TGOS.MVCArray,
                TOP_RIGHT: new TGOS.MVCArray
            };
            this.getMapSize =
                function() {
                    var a = parseInt(F.offsetWidth),
                        b = parseInt(F.offsetHeight);
                    return new TGOS.TGSize(a, b)
                };
            this.IndexViewControl = {
                Show: function(a) {
                    aa.Show(a)
                },
                Minimize: function() {
                    aa.Minimize()
                }
            };
            this.setCoordSys = function(a) {
                a instanceof TGOS.TGCoordSys && (z = a, TGOS.TGEvent.trigger(this, "projection_changed"))
            };
            this.getDocName = function() {
                var a;
                switch (z) {
                    case TGOS.TGCoordSys.EPSG3826:
                        a = TGOS.MapTypeDocumentName;
                        I = "97";
                        break;
                    case TGOS.TGCoordSys.EPSG3825:
                        a = TGOS.MapTypeDocumentNameTWD97_119;
                        I = "97_119";
                        break;
                    case TGOS.TGCoordSys.EPSG3857:
                        a =
                            TGOS.MapTypeDocumentNameGoogle, I = "google"
                }
                return a
            };
            this.getCoordSys = function() {
                return z
            };
            this.getOPackage = function() {
                return L
            };
            this.getMapOptions = function() {
                return H
            };
            this.getMapTypeId = function() {
                return Z
            };
            this.getHPackage = function() {
                return F
            };
            this.getHPack = function() {
                return J.getHPackage()
            };
            this.getHObj = function() {
                return J.getHObject()
            };
            this.getHMap = function() {
                return J.getHObject()
            };
            this.getMapBase = function() {
                return J
            };
            this.getMap = function() {
                return this
            };
            this.ZoomTo = function(a) {
                D(a)
            };
            this.ZoomIn =
                function() {
                    D(S.getMapLevel() + 1)
                };
            this.ZoomOut = function() {
                D(S.getMapLevel() - 1)
            };
            this.setOptions = function(a) {
                var b = function(a) {
                        var b;
                        switch (z) {
                            case TGOS.TGCoordSys.EPSG3857:
                                b = TGOS.WGS84ToGoo(a.left, a.top);
                                a = TGOS.WGS84ToGoo(a.right, a.bottom);
                                b = new TGOS.TGEnvelope(b.x, b.y, a.x, a.y);
                                break;
                            default:
                                b = a
                        }
                        S.setMapBoundsLevel(b);
                        N.setMapBounds(b);
                        J.RefreshMap(!0)
                    },
                    d = function(a, b) {
                        var d = a,
                            e = b;
                        null != d && null != e && d > e && (d = b, e = a);
                        S.setMapMinMaxLevel(d, e);
                        J.RefreshMap(!0)
                    },
                    e = function(a) {
                        "string" == typeof a && (J.setColor(a),
                            H.backgroundColor = a)
                    },
                    f = function(a) {
                        "boolean" == typeof a && (a ? (sa.display(!1), ha.display(!1), ba.display(!1)) : (sa.display(!0), ha.display(!0), ba.display(!0)), H.disableDefaultUI = a, J.RefreshMap(!0))
                    },
                    g = function(a) {
                        "boolean" == typeof a && (P = a, H.scrollwheel = a, N.OpenCloseWheel(a))
                    },
                    h = function(a) {
                        "boolean" == typeof a && (ha.display(a), H.mapTypeControl = a)
                    },
                    k = function(a) {
                        ha.setOptions(a);
                        H.mapTypeControlOptions = a;
                        J.RefreshMap(!0)
                    },
                    l = function(a) {
                        "boolean" == typeof a && (ba.display(a), H.navigationControl = a);
                        J.RefreshMap(!0)
                    },
                    m = function(a) {
                        ba.setOptions(a);
                        H.navigationControlOptions = a
                    },
                    n = function(a) {
                        "boolean" == typeof a && (sa.display(a), H.scaleControl = a)
                    },
                    p = function(a) {
                        sa.setOptions(a);
                        H.scaleControlOptions = a
                    },
                    t = function(a) {
                        "boolean" == typeof a && (aa.Show(a), H.indexViewControl = a)
                    },
                    u = function(a) {
                        a == TGOS.TGIndexViewControlOptions.MINIMIZED && (aa.Minimize(), H.indexViewControlOptions = a)
                    },
                    s = function(a) {
                        "boolean" == typeof a && (M = a, H.draggable = a, N.OpenCloseMove(a))
                    },
                    q = function(a) {
                        "boolean" == typeof a && (N.allowKeyboard(a), H.keyboardShortcuts =
                            a)
                    },
                    v = function(a) {
                        "boolean" == typeof a && (N.setDragInertia(a), H.dragInertia = a)
                    },
                    C = function(a) {
                        "string" == typeof a && (N.changeDraggableCursor(a), H.draggableCursor = a)
                    },
                    w = function(a) {
                        "string" == typeof a && (N.changeDraggingCursor(a), H.draggingCursor = a)
                    };
                void 0 != a && (void 0 != a.backgroundColor && e(a.backgroundColor), void 0 != a.disableDefaultUI && f(a.disableDefaultUI), void 0 != a.scrollwheel && g(a.scrollwheel), void 0 != a.mapTypeControl && h(a.mapTypeControl), void 0 != a.mapTypeControlOptions && k(a.mapTypeControlOptions), void 0 !=
                    a.navigationControl && l(a.navigationControl), void 0 != a.navigationControlOptions && m(a.navigationControlOptions), void 0 != a.scaleControl && n(a.scaleControl), void 0 != a.scaleControlOptions && p(a.scaleControlOptions), void 0 != a.indexViewControl && t(a.indexViewControl), void 0 != a.indexViewControlOptions && u(a.indexViewControlOptions), void 0 != a.draggable && s(a.draggable), void 0 != a.keyboardShortcuts && q(a.keyboardShortcuts), void 0 != a.draggableCursor && C(a.draggableCursor), void 0 != a.dragInertia && v(a.dragInertia), void 0 !=
                    a.draggingCursor && w(a.draggingCursor), void 0 != a.center && K.setCenter(a.center), void 0 != a.dbClickZoomIn && N.OpenCloseDblClick(a.dbClickZoomIn), void 0 !== a.maxZoom && void 0 !== a.minZoom ? d(a.minZoom, a.maxZoom) : (void 0 !== a.maxZoom && (S.setMapMaxLevel(a.maxZoom), J.RefreshMap(!0)), void 0 !== a.minZoom && (S.setMapMinLevel(a.minZoom), J.RefreshMap(!0))), void 0 !== a.mapBounds && b(a.mapBounds))
            };
            this.freezeMap = function() {
                N.ExitMapEvent();
                R = !0
            };
            this.unFreezeMap = function() {
                R = !1;
                N.InitMapEvent()
            };
            this.loopThroughOverlay =
                function() {};
            this.resize = function(a, b) {
                F.style.width = a + "px";
                F.style.height = b + "px";
                k = F.clientWidth;
                l = F.clientHeight
            };
            this.getBoundary = function() {
                return J.getExtent()
            };
            this.getLevel = function() {
                return S.getMapLevel()
            };
            this.getDiv = function() {
                return ga
            };
            this.getEventElement = function() {
                return this.getHObj()
            };
            this.getTransformation = function() {
                return S
            };
            this.fitBounds = function(b) {
                if (null != b.left && null != b.top && null != b.right && null != b.bottom) {
                    var e = {
                            X: 0,
                            Y: 0
                        },
                        f = {
                            X: 0,
                            Y: 0
                        };
                    z == TGOS.TGCoordSys.EPSG3857 ? (e = d.Forward(a,
                        new CPoint3(b.left, b.top, 0)), f = d.Forward(a, new CPoint3(b.right, b.bottom, 0))) : (e.X = b.left, e.Y = b.top, f.X = b.right, f.Y = b.bottom);
                    TGOS.moveMapTo_(this, (f.X + e.X) / 2, (f.Y + e.Y) / 2);
                    b = Number(F.clientHeight) / (f.Y - e.Y);
                    J.putScale(Math.min(Math.abs(Number(F.clientWidth) / (f.X - e.X)), Math.abs(b)));
                    S.FitLevel();
                    J.RefreshMap(!0)
                }
            };
            this.getRawBound = function() {
                var a = k,
                    b = l,
                    d = J.ToMapPoint(0, 0),
                    a = J.ToMapPoint(a, b);
                return new TGOS.TGEnvelope(d.x, d.y, a.x, a.y)
            };
            this.getBounds = function() {
                var a = k,
                    b = l,
                    d = J.ToMapPoint(0, 0),
                    a = J.ToMapPoint(a,
                        b),
                    e, f, g, h;
                switch (z) {
                    case TGOS.TGCoordSys.EPSG3857:
                        f = TGOS.GooToWGS84(d.x, d.y);
                        d = TGOS.GooToWGS84(a.x, a.y);
                        e = f.x;
                        f = f.y;
                        g = d.x;
                        h = d.y;
                        break;
                    case TGOS.TGCoordSys.EPSG3826:
                        e = d.x;
                        f = d.y;
                        g = a.x;
                        h = a.y;
                        break;
                    case TGOS.TGCoordSys.EPSG3825:
                        e = d.x, f = d.y, g = a.x, h = a.y
                }
                return new TGOS.TGEnvelope(e, f, g, h)
            };
            this.checkMapBoundsRestrict = function(a, b, d) {
                var e = null;
                if (a) {
                    var f = 0,
                        g = 0,
                        h = this.getRawBound(),
                        k = h.top - h.bottom,
                        l = a.top - a.bottom;
                    h.right - h.left > a.right - a.left ? (f = 1, b = (a.left + a.right) / 2) : h.left < a.left ? (f = h.left - a.left,
                        b -= f) : h.right > a.right && (f = h.right - a.right, b -= f);
                    k > l ? (g = 1, d = (a.top + a.bottom) / 2) : h.top > a.top ? (g = h.top - a.top, d -= g) : h.bottom < a.bottom && (g = h.bottom - a.bottom, d -= g);
                    if (0 != f || 0 != g) e = new TGOS.TGPoint(b, d)
                }
                return e
            };
            this.getCenter = function(a) {
                a = J.getCenterX();
                var b = J.getCenterY(),
                    d, e;
                switch (z) {
                    case TGOS.TGCoordSys.EPSG3857:
                        e = TGOS.GooToWGS84(a, b);
                        d = e.x;
                        e = e.y;
                        break;
                    case TGOS.TGCoordSys.EPSG3826:
                        d = a;
                        e = b;
                        break;
                    case TGOS.TGCoordSys.EPSG3825:
                        d = a, e = b
                }
                return new TGOS.TGPoint(d, e)
            };
            this.setCenter = function(b) {
                switch (z) {
                    case TGOS.TGCoordSys.EPSG3826:
                        TGOS.moveMapTo_(this,
                            b.x, b.y);
                        break;
                    case TGOS.TGCoordSys.EPSG3825:
                        TGOS.moveMapTo_(this, b.x, b.y);
                        break;
                    case TGOS.TGCoordSys.EPSG3857:
                        b = d.Forward(a, new CPoint3(b.x, b.y, 0)), TGOS.moveMapTo_(this, b.X, b.Y)
                }
                J.RefreshMap(!0)
            };
            this.getZoom = function() {
                return S.getMapLevel()
            };
            this.setZoom = function(a) {
                this.ZoomTo(a)
            };
            this.setMapTypeId = function(a) {
                if (Z !== a) {
                    var b = U,
                        d = y ? H.backgroundColor : TGOS.MapTypeBackgroundColor[a];
                    H.backgroundColor = d;
                    J.setColor(d);
                    aa.setColor(d);
                    for (d = 0; d < b.length; d++) !b[d].skip && b[d].putVisible && (b[d].mapTypeId ==
                        a ? b[d].putVisible(!0) : b[d].putVisible(!1));
                    TGOS.TGEvent.trigger(this, "maptypeid_changed");
                    Z = a;
                    b = S.getMapLevel();
                    this.getCoordSys();
                    S.getMapMinLevel();
                    d = S.getMapMaxLevel();
                    b > d && (b = d);
                    S.putMapLevel(b);
                    ha.setActiveType(a);
                    J.RefreshMap(!0)
                }
            };
            this.panBy = function(a, b) {
                N.panBy(a, b);
                J.RefreshMap(!0)
            };
            this.panToBounds = function(a) {
                if (null != a.left && null != a.top && null != a.right && null != a.bottom) {
                    var b, d;
                    switch (z) {
                        case TGOS.TGCoordSys.EPSG3857:
                            a = TGOS.WGS84ToGoo(a.left, a.top);
                            b = a.x;
                            d = a.y;
                            break;
                        case TGOS.TGCoordSys.EPSG3826:
                            b =
                                a.left;
                            d = a.top;
                            break;
                        case TGOS.TGCoordSys.EPSG3825:
                            b = a.left, d = a.top
                    }
                    TGOS.moveMapTo_(this, b, d);
                    J.RefreshMap(!0)
                }
            };
            this.getLayerList = function() {
                return U
            };
            this.setMapAction = function(a, b) {
                if (1 == a) {
                    var d = J.getHObject(),
                        e = function(a, e, g, h) {
                            DetachEvent(d, "mousedown", f, !1);
                            freezeMap || N.InitMapEvent();
                            null != b && b(a, e, g, h)
                        },
                        f = function(a) {
                            RectangleTracker(J, a, e)
                        };
                    N.ExitMapEvent();
                    AttachEvent(d, "mousedown", f, !1)
                } else freezeMap || N.InitMapEvent()
            };
            this.getCoordinateString = function(a, b) {
                var d = J.ToMapPoint(a, b);
                return d.x +
                    "," + d.y
            };
            this.changeOverviewMapType = function(a, b) {
                for (var d = 0; d < a.length; d++) a[d].mapTypeId == b ? a[d].putVisible(!0) : a[d].putVisible(!1);
                aa.getMapBase().RefreshMap(!0)
            };
            var v = function(a, b) {
                    var d = TGOS.MapTypeDocumentName;
                    switch (z) {
                        case TGOS.TGCoordSys.EPSG3826:
                            d = TGOS.MapTypeDocumentName;
                            break;
                        case TGOS.TGCoordSys.EPSG3825:
                            d = TGOS.MapTypeDocumentNameTWD97_119;
                            break;
                        case TGOS.TGCoordSys.EPSG3857:
                            d = TGOS.MapTypeDocumentNameGoogle
                    }
                    for (var e = 0; e < a.length; e++)
                        if (a[e] in d) {
                            var f = new MapCachedLayer(TGOS.TGMapTypeId_zh_TW[a[e]],
                                d[a[e]], !1, K, b);
                            f.mapTypeId = a[e];
                            U.push(f)
                        }
                },
                x = function(a, b) {
                    var d = TGOS.MapTypeIndexViewDocumentName;
                    switch (z) {
                        case TGOS.TGCoordSys.EPSG3826:
                            d = TGOS.MapTypeIndexViewDocumentName;
                            b = "97";
                            break;
                        case TGOS.TGCoordSys.EPSG3825:
                            d = TGOS.MapTypeIndexViewDocumentName;
                            b = "97_119";
                            break;
                        case TGOS.TGCoordSys.EPSG3857:
                            d = TGOS.MapTypeIndexViewDocumentNameGoogle, b = "google"
                    }
                    for (var e = 0; e < a.length; e++)
                        if (a[e] in d) {
                            var f = new MapCachedLayer(TGOS.MapTypeIndexViewId_zh_TW[a[e]], d[a[e]], !1, K, b);
                            f.mapTypeId = a[e];
                            Y.push(f)
                        }
                },
                A = function() {
                    F.style.width = e.offsetWidth + "px";
                    F.style.height = e.offsetHeight + "px";
                    l = F.clientHeight;
                    k = F.clientWidth;
                    E.style.width = e.offsetWidth + "px";
                    E.style.height = e.offsetHeight + "px";
                    u.style.width = e.offsetWidth + "px";
                    u.style.height = e.offsetHeight + "px";
                    C.style.width = e.offsetWidth + "px";
                    C.style.height = e.offsetHeight + "px";
                    w.setSize(F.offsetWidth, F.offsetHeight);
                    t.setSize(F.offsetWidth, F.offsetHeight);
                    K.getMapBase().RefreshMap(!0);
                    TGOS.TGEvent.trigger(K, "idle")
                },
                B = function() {
                    L = document.createElement("div");
                    F.appendChild(L);
                    L.style.position = "absolute";
                    L.style.right = "0px";
                    L.style.bottom = "0px";
                    L.style.width = "145px";
                    L.style.height = "145px";
                    L.style.display = "inline";
                    L.style.backgroundColor = "#ADD8E6";
                    L.style.margin = "5px";
                    L.style.border = "2px solid";
                    L.style.zIndex = 1E7;
                    aa = new Overview(L, J, S, 150, 150, 4);
                    for (var a = 0; a < Y.length; a++) aa.getMapBase().AddLayer(Y[a]), 0 < a && Y[a].putVisible(!0)
                },
                D = function(a) {
                    !R && S.putMapLevel(a) && (a = S.getScale(), J.putScale(a), J.RefreshMap(!0))
                },
                y;
            this.setBackgroundColor = function(a) {
                "string" ==
                typeof a && (y = !0, J.setColor(a), H.backgroundColor = a)
            };
            this.getBackgroundColor = function() {
                return H.backgroundColor
            };
            this.initialize_ = function(g) {
                this.infoWindowLayer = new b(V, this);
                this.overlay = new f(X);
                if ("EPSG3857" == z) {
                    I = "google";
                    var h = d.Forward(a, new CPoint3(118.9940295414, 25.30028310652, 0)),
                        n = d.Forward(a, new CPoint3(122.0064955717, 21.896606644941, 0));
                    la = new TGOS.TGEnvelope(n.X, n.Y, h.X, h.Y);
                    var h = TGOS.MapTypeScales.EPSG3857.levelX,
                        n = TGOS.MapTypeScales.EPSG3857.levelY,
                        p = TGOS.MapTypeScales.EPSG3857.scales
                } else "EPSG3825" ==
                    z ? (I = "97_119", la = new TGOS.TGEnvelope(339023.59349082, 2425702.7292442, 51368.8242689183, 2799323.57990279), h = TGOS.MapTypeScales.EPSG3825.levelX, n = TGOS.MapTypeScales.EPSG3825.levelY, p = TGOS.MapTypeScales.EPSG3825.scales) : (I = "97", la = new TGOS.TGEnvelope(339023.59349082, 2425702.7292442, 51368.8242689183, 2799323.57990279), h = TGOS.MapTypeScales.EPSG3826.levelX, n = TGOS.MapTypeScales.EPSG3826.levelY, p = TGOS.MapTypeScales.EPSG3826.scales);
                for (var y in TGOS.MapTypeMaxZoomLevel[z]) ma = Math.max(TGOS.MapTypeMaxZoomLevel[z][y],
                    ma);
                y = [TGOS.TGMapTypeId.TGOSMAP, TGOS.TGMapTypeId.NLSCMAP, TGOS.TGMapTypeId.MOTCMAP, TGOS.TGMapTypeId.F2IMAGE, TGOS.TGMapTypeId.ROADMAP, TGOS.TGMapTypeId.HILLSHADEMIX, TGOS.TGMapTypeId.HILLSHADE, TGOS.TGMapTypeId.SEGISMAP];
                v(y, I);
                x(y, I);
                F = document.createElement("div");
                e.appendChild(F);
                F.style.position = "relative";
                F.style.overflow = "hidden";
                F.style.width = e.offsetWidth + "px";
                F.style.height = e.offsetHeight + "px";
                F.style.border = "0px";
                F.style.left = "0px";
                F.style.top = "0px";
                F.unselectable = "on";
                F.className = "hpack";
                k =
                    F.clientWidth;
                l = F.clientHeight;
                S = new TGOS.MapScaleLevel(fa, ma, h, n, p);
                J = new MapBase(F, S);
                this.bindEvents(this.getEventElement());
                e.style.overflow = "hidden";
                J.AddElement(this.overlay);
                J.AddElement(this.infoWindowLayer);
                J.setColor("#a5bfdd");
                for (y = 1; y < U.length; y++) U[y].putVisible(!1);
                for (y = 0; y < U.length; y++) J.AddLayer(U[y]);
                J.ZoomMapTo(la);
                S.FitLevel();
                initControlArray(this);
                B();
                this.IndexViewControl.Show(!0);
                y = this.getMapBase().getHObject();
                this.getMapBase().getHPackage().oncontextmenu = function() {
                    return !1
                };
                E = document.createElement("div");
                E.style.position = "absolute";
                E.style.width = "100%";
                E.style.height = "100%";
                E.className = "tgoverlayview";
                y.appendChild(E);
                C = document.createElement("div");
                C.style.position = "absolute";
                C.style.width = "100%";
                C.style.height = "100%";
                C.className = "tgshadow";
                y.appendChild(C);
                t = Raphael(C);
                u = document.createElement("div");
                u.style.position = "absolute";
                u.style.width = "100%";
                u.style.height = "100%";
                u.className = "tgoverlay";
                y.appendChild(u);
                Raphael.fn.createMarker = function(a) {
                    var b = this.canvas.getElementsByTagName("defs")[0],
                        d = document.createElementNS("http://www.w3.org/2000/svg", "marker");
                    d.setAttribute("id", Raphael.createUUID());
                    d.setAttribute("markerWidth", 22);
                    d.setAttribute("markerHeight", 22);
                    d.setAttribute("viewBox", "-11 -11 22 22");
                    d.setAttribute("orient", "auto");
                    var e = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    e.setAttribute("fill", a.fillColor);
                    e.setAttribute("fill-opacity", a.fillOpacity);
                    e.setAttribute("stroke", a.strokeColor);
                    e.setAttribute("stroke-width", a.strokeWeight);
                    e.setAttribute("stroke-opacity",
                        a.strokeOpacity);
                    e.setAttribute("d", a.symbolStyle);
                    d.appendChild(e);
                    b.appendChild(d);
                    return d.id
                };
                Raphael.fn.removeMarker = function(a) {
                    (a = def.getElementById(a)) && a.parentNode.removeChild(a)
                };
                w = Raphael(u);
                w.canvas.setAttribute("pointer-events", "all");
                w.rect(0, 0, 300, 300).hide();
                this.changeOverviewMapType(Y, TGOS.TGMapTypeId.TGOSMAP);
                da = new TGOS.CopyrightControl(this, TGOS.TGControlPosition.BOTTOM_LEFT);
                J.AddElement(da);
                sa = new TGOS.ScaleBarControl(F, J, G.scaleControlOptions.controlPosition, G.scaleControlOptions.scaleControlStyle,
                    this);
                J.AddElement(sa);
                ha = new TGOS.MapTypeBarControl(this, G.mapTypeControlOptions, aa, Y);
                ba = new TGOS.LevelBarControl(this.getHPackage(), S, G.navigationControlOptions.controlPosition, G.navigationControlOptions.style, this);
                J.AddElement(ba);
                N = new TGOS.TGMapMove(S, O, M, P, Q, G.draggableCursor, G.draggingCursor, ha, this);
                N.InitMapEvent(this);
                this.setOptions(G);
                this.setOptions(g);
                J.RefreshMap(!0);
                window.onresize = function() {
                    TGOS.TGEvent.trigger(K, "resize")
                };
                TGOS.TGEvent.addListener(this, "resize", A);
                this.dataManager =
                    new TGOS.TGData({
                        map: this,
                        style: null
                    })
            };
            this.getPanes = function() {
                return {
                    graphicLayer: u,
                    mapLayer: K.getHObj(),
                    shadowLayer: C,
                    controlLayer: K.getHPackage(),
                    overlayviewLayer: E
                }
            };
            this.addLayer = function(a, b) {
                a.skip = b;
                U.push(a);
                J.AddLayer(a);
                J.RefreshMap(!0)
            };
            this.removeLayer = function(a) {
                var b = U.indexOf(a);
                U.splice(b, 1);
                J.RemoveLayer(a);
                J.RefreshMap(!0)
            };
            this.getShadowPaper = function() {
                return t
            };
            this.getPaper = function() {
                return w
            };
            var z = g,
                w, t, u, C, E, G = {
                    backgroundColor: "#a5bfdd",
                    disableDefaultUI: !1,
                    draggable: !0,
                    scrollwheel: !0,
                    keyboardShortcuts: !0,
                    draggableCursor: "",
                    draggingCursor: "",
                    mapTypeControl: !0,
                    mapTypeControlOptions: {
                        mapTypeIds: "EPSG3825" == z ? [TGOS.TGMapTypeId.TGOSMAP, TGOS.TGMapTypeId.NLSCMAP] : [TGOS.TGMapTypeId.TGOSMAP, TGOS.TGMapTypeId.NLSCMAP, TGOS.TGMapTypeId.MOTCMAP, TGOS.TGMapTypeId.F2IMAGE, TGOS.TGMapTypeId.ROADMAP, TGOS.TGMapTypeId.HILLSHADEMIX, TGOS.TGMapTypeId.HILLSHADE],
                        controlPosition: TGOS.TGControlPosition.TOP_RIGHT,
                        mapTypeControlStyle: TGOS.TGMapTypeControlStyle.DROPDOWN_MENU
                    },
                    navigationControl: !0,
                    navigationControlOptions: {
                        controlPosition: TGOS.TGControlPosition.LEFT_CENTER,
                        navigationControlStyle: TGOS.TGNavigationControlStyle.LARGE
                    },
                    scaleControl: !0,
                    scaleControlOptions: {
                        controlPosition: TGOS.TGControlPosition.LEFT_BOTTOM,
                        scaleControlstyle: TGOS.TGScaleControlStyle.DEFAULT
                    },
                    indexViewControl: !1,
                    indexViewControlOptions: TGOS.TGIndexViewControlOptions.MINIMIZED,
                    maxZoom: null,
                    minZoom: null,
                    dbClickZoomIn: !0
                },
                H = {
                    backgroundColor: "#a5bfdd",
                    disableDefaultUI: !0,
                    draggable: !0,
                    scrollwheel: !0,
                    keyboardShortcuts: !0,
                    draggableCursor: "",
                    dragInertia: !0,
                    draggingCursor: "",
                    mapTypeControl: !0,
                    mapTypeControlOptions: {
                        mapTypeIds: [TGOS.TGMapTypeId.TGOSMAP, TGOS.TGMapTypeId.NLSCMAP, TGOS.TGMapTypeId.MOTCMAP, TGOS.TGMapTypeId.F2IMAGE, TGOS.TGMapTypeId.ROADMAP, TGOS.TGMapTypeId.HILLSHADEMIX, TGOS.TGMapTypeId.HILLSHADE],
                        controlPosition: TGOS.TGControlPosition.RIGHT_TOP,
                        mapTypeControlStyle: TGOS.TGMapTypeControlStyle.DEFAULT
                    },
                    navigationControl: !0,
                    navigationControlOptions: {
                        controlPosition: TGOS.TGControlPosition.LEFT_TOP,
                        navigationControlStyle: TGOS.TGNavigationControlStyle.DEFAULT
                    },
                    scaleControl: !0,
                    scaleControlOptions: {
                        controlPosition: TGOS.TGControlPosition.LEFT_BOTTOM,
                        scaleControlstyle: TGOS.TGScaleControlStyle.DEFAULT
                    },
                    indexViewControl: !1,
                    indexViewControlOptions: TGOS.TGIndexViewControlOptions.NORMAL,
                    maxZoom: null,
                    minZoom: null,
                    dbClickZoomIn: !0
                },
                O = !0,
                M = !0,
                P = !0,
                Q = !1,
                N = null,
                J = null,
                K = this,
                F = null,
                L = null,
                V = [],
                X = [],
                Z = TGOS.TGMapTypeId.TGOSMAP,
                I = "97",
                U = [],
                Y = [],
                fa = this,
                ga = e,
                la = null,
                ma = 0,
                S = null,
                R = !1,
                da = null,
                ba = null,
                ha = null,
                sa = null,
                aa = null;
            this.initialize_(h);
            TGOS.Log("web", "A01", "")
        };
    TGOS.TGOnlineMap.prototype =
        new TGOS.MVCObject;
    var e = TGOS.TGOnlineMap.prototype;
    e.triggerEvent = function(a, b) {
        var d = this.getMapBase();
        if (d) {
            var e = d.getPackageOffset(),
                f, g;
            a.changedTouches && a.changedTouches.length ? (f = a.changedTouches[0].clientX, g = a.changedTouches[0].clientY) : (f = a.clientX, g = a.clientY);
            var d = d.ToMapPoint(f - e.x, g - e.y),
                h;
            switch (this.getMap().getCoordSys()) {
                case TGOS.TGCoordSys.EPSG3857:
                    h = TGOS.GooToWGS84(d.x, d.y);
                    break;
                case TGOS.TGCoordSys.EPSG3826:
                    h = d;
                    break;
                case TGOS.TGCoordSys.EPSG3825:
                    h = d
            }
            d = new TGOS.TGMouseEvent(a);
            d.point = new TGOS.TGPoint(h.x, h.y);
            d.target = this;
            TGOS.TGEvent.trigger_(this, b, d)
        }
    };
    e.onMouseUp = function(a) {
        this.triggerEvent.call(this, a, "mouseup")
    };
    e.onMouseMove = function(a) {
        this.triggerEvent.call(this, a, "mousemove")
    };
    e.onMouseDown = function(a) {
        this.__downE = a;
        this.triggerEvent.call(this, a, "mousedown");
        var b = this;
        a = function() {
            b.onDrag.apply(b, arguments)
        };
        var d = function() {
            b.onDragEnd.apply(b, arguments)
        };
        this.elem.dragWrapper = a;
        this.elem.dragEndWrapper = d;
        AttachEvent(this.elem, "mousemove", a);
        AttachEvent(this.elem,
            "mouseup", d);
        AttachEvent(this.elem, "touchmove", a);
        AttachEvent(this.elem, "touchend", d)
    };
    e.onMouseOver = function(a) {
        this.triggerEvent.call(this, a, "mouseover")
    };
    e.onMouseOut = function(a) {
        this.triggerEvent.call(this, a, "mouseout")
    };
    e.onDblClick = function(a) {
        this.triggerEvent.call(this, a, "dblclick")
    };
    e.isSamePosition = function(a, b) {
        var d, e, f, g;
        a.changedTouches && b.changedTouches && a.changedTouches.length && b.changedTouches.length ? (d = a.changedTouches[0].screenX, e = a.changedTouches[0].screenY, f = b.changedTouches[0].screenX,
            g = b.changedTouches[0].screenY) : (d = a.screenX, e = a.screenY, f = b.screenX, g = b.screenY);
        return d === f && e === g
    };
    e.onDrag = function(a) {
        this.isSamePosition(this.__downE, a) || (DetachEvent(this.elem, "mousemove", this.elem.dragWrapper), DetachEvent(this.elem, "mouseup", this.elem.dragEndWrapper), DetachEvent(this.elem, "touchmove", this.elem.dragWrapper), DetachEvent(this.elem, "touchend", this.elem.dragEndWrapper))
    };
    e.onDragEnd = function(a) {
        DetachEvent(this.elem, "mousemove", this.elem.dragWrapper);
        DetachEvent(this.elem, "mouseup",
            this.elem.dragEndWrapper);
        DetachEvent(this.elem, "touchmove", this.elem.dragWrapper);
        DetachEvent(this.elem, "touchend", this.elem.dragEndWrapper);
        a.button == TGOS.TGEvent.RIGHTBUTTON ? this.triggerEvent.call(this, a, "rightclick") : this.triggerEvent.call(this, a, "click")
    };
    e.bindEvents = function() {
        if (this.elem = this.getEventElement()) {
            var a = this;
            AttachEvent(this.elem, "mouseup", function(b) {
                a.onMouseUp.apply(a, arguments)
            });
            AttachEvent(this.elem, "mousemove", function(b) {
                a.onMouseMove.apply(a, arguments)
            });
            AttachEvent(this.elem,
                "mousedown",
                function(b) {
                    a.onMouseDown.apply(a, arguments)
                });
            AttachEvent(this.elem, "mouseover", function(b) {
                a.onMouseOver.apply(a, arguments)
            });
            AttachEvent(this.elem, "mouseout", function(b) {
                a.onMouseOut.apply(a, arguments)
            });
            AttachEvent(this.elem, "dblclick", function(b) {
                a.onDblClick.apply(a, arguments)
            });
            AttachEvent(this.elem, "touchstart", function(b) {
                a.onMouseDown.apply(a, arguments)
            });
            AttachEvent(this.elem, "touchend", function(b) {
                a.onMouseUp.apply(a, arguments)
            });
            AttachEvent(this.elem, "touchmove", function(b) {
                a.onMouseMove.apply(a,
                    arguments)
            })
        }
    };
    TGOS.RegisterEvent(TGOS.TGOnlineMap, "bounds_changed center_changed zoom_changed maptypeid_changed tilesloaded click mousedown mousemove mouseout mouseover projection_changed dragstart drag dragend idle resize dblclick rightclick".split(" "));
    TGOS.moveMapTo_ = function(a, b, d) {
        var e = a.getMapBase().getCenterX(),
            f = a.getMapBase().getCenterY(),
            g = a.getBounds().toString();
        a.getMapBase().MoveMapTo(b, d);
        var h = a.getBounds().toString();
        e == b && f == d || TGOS.TGEvent.trigger(a, "center_changed");
        g != h && TGOS.TGEvent.trigger(a,
            "bounds_changed")
    };
    TGOS.TGIndexViewControl = function(a) {
        this.show = function(b) {
            a.IndexViewControl && a.IndexViewControl.Show(b)
        };
        this.minimize = function() {
            a.IndexViewControl.minimize()
        }
    };
    TGOS.TGMapMove = function(a, b, d, e, f, g, h, k, l, D) {
        var y, z = !1,
            w, t = !1,
            u = !1,
            C, E, G, H, O, M, P = !1,
            Q, N, J = !1,
            K, F, L = !1,
            V = "",
            X = "",
            Z = !0,
            I, U = !1,
            Y = 0,
            fa = 0,
            ga = 0,
            la = null,
            ma = null,
            S = null,
            R = null,
            da = function() {
                var a = R - ma;
                fa = (S - la) / 50;
                ga = a / 50
            };
        this.ExitMapEvent = null;
        this.IsMapAction = function() {
            return L
        };
        var ba = function(a, b, d) {
            var e = l.getMapBase(),
                f = e.getCenterX(),
                g = e.getCenterY(),
                h = a.x - f,
                k = a.y - g;
            d = 1E3 / d;
            var m = (new Date).getTime(),
                n = setInterval(function() {
                    var d = (new Date).getTime();
                    d - m > 1E3 * b ? (TGOS.moveMapTo_(l, a.x, a.y), e.RefreshMap(!0), clearInterval(n)) : (d = (d - m) / (1E3 * b), e.putCenterX(f + d * h), e.putCenterY(g + d * k), e.RefreshMap(!1))
                }, d)
        };
        this.panBy = function(a, b) {
            var d = l.getMapBase(),
                e = d.getClientWidth(),
                f = d.getClientHeight(),
                g = d.getCenterX() + a,
                h = d.getCenterY() + b,
                d = d.FromMapPoint(g, h);
            0 <= d.x && d.x <= e && 0 <= d.y && d.y <= f ? ba({
                x: g,
                y: h
            }, 0.5, 30) : TGOS.moveMapTo_(l,
                g, h)
        };
        this.panToBounds = function(a) {
            var b = l.getMapBase();
            a = b.getClientWidth();
            var d = b.getClientHeight(),
                e = b.getCenterX() + offsetX,
                f = b.getCenterY() + offsetY,
                b = b.FromMapPoint(e, f);
            0 <= b.x && b.x <= a && 0 <= b.y && b.y <= d ? ba({
                x: e,
                y: f
            }, 0.5, 30) : TGOS.moveMapTo_(l, e, f)
        };
        this.setMapBounds = function(a) {
            D = a;
            a = l.getMapBase();
            var b = a.getCenterX(),
                d = a.getCenterY(),
                b = l.checkMapBoundsRestrict(D, b, d);
            null != b && (TGOS.moveMapTo_(l, b.x, b.y), a.RefreshMap(!0))
        };
        this.allowKeyboard = function(a) {
            "boolean" == typeof a && (Z = a)
        };
        this.clearNum =
            function() {
                c = 0
            };
        var ha = !0;
        this.setDragInertia = function(a) {
            "boolean" == typeof a && (ha = a)
        };
        this.changeDraggableCursor = function(a) {
            V = a;
            I.style.cursor = V
        };
        this.changeDraggingCursor = function(a) {
            X = a
        };
        this.InitMapEvent = function(g) {
            var h = g.getMapBase();
            I = h.getHObject();
            h.getHPackage();
            var k = [],
                v = function(a) {
                    setTimeout(function() {
                        t = !1
                    }, a)
                },
                x = function(a, b, d) {
                    var e = 20;
                    d && (e = d);
                    return Math.abs(a.X - b.X) <= e && Math.abs(a.Y - b.Y) <= e ? !0 : !1
                },
                A = function(a, b) {
                    var d = h.getCursorPosition(a),
                        e = h.getCursorPosition(b),
                        f = parseFloat((d.x +
                            e.x) / 2),
                        g = parseFloat((d.y + e.y) / 2),
                        d = Math.sqrt((d.x - e.x) * (d.x - e.x) + (d.y - e.y) * (d.y - e.y));
                    return {
                        scrCenter: {
                            X: f,
                            Y: g
                        },
                        length: d
                    }
                },
                ba = function(a) {
                    var b;
                    a.preventDefault();
                    k = a.touches;
                    ia && ia.stop();
                    ga = fa = 0;
                    a = k[0];
                    !0 == t && !0 == x({
                        X: k[0].clientX,
                        Y: k[0].clientY
                    }, y) && (u = !0, t = !1, w = a);
                    y = {
                        X: a.clientX,
                        Y: a.clientY
                    };
                    if (1 < k.length) {
                        b = A(a, k[1]);
                        a = b.scrCenter;
                        var d = b.length;
                        C = b = h.ToMapPoint(a.X, a.Y);
                        E = a;
                        G = d;
                        H = h.getCellSizeX();
                        O = h.getCellSizeY();
                        M = h.getScale();
                        P = !0
                    } else S = k[0].clientX, R = k[0].clientY, la = S, ma = R, wa = setInterval(da,
                        50), va = !1, xa = 0;
                    z = !0
                },
                pa = function(a) {
                    a.preventDefault();
                    k = a.touches;
                    a = k[0];
                    var b = a.clientX - y.X,
                        d = a.clientY - y.Y;
                    1 < k.length ? J || (J = !0, b = k[1], P && (a = A(a, b), b = a.scrCenter, x(b, E, 5) || (a = parseFloat(a.length / G), d = h.getClientWidth() / 2 - b.X, b = h.getClientHeight() / 2 - b.Y, b = new TGOS.TGPoint(C.x + d * H / a, C.y + b * O / a), Q = new TGOS.TGPoint(b.x, b.y), N = M * a, h.putScale(N), TGOS.moveMapTo_(l, b.x, b.y), h.RefreshMap(!0))), J = !1) : (Ha && (clearTimeout(Ha), va = !1), setTimeout(Aa, 500), xa++, y = {
                            X: a.clientX,
                            Y: a.clientY
                        }, la = S, ma = R, S = a.clientX, R =
                        a.clientY, z && (TGOS.moveMapTo_(l, h.getCenterX() - h.ToMapDistX(b), h.getCenterY() - h.ToMapDistY(d)), h.RefreshMap(!1)))
                },
                ra = function(b) {
                    b.preventDefault();
                    k = b.touches;
                    if (!0 == u) u = !1, ja(w), l.onDblClick(w);
                    else {
                        if (null != Q && null != N) h.putScale(N), TGOS.moveMapTo_(l, Q.x, Q.y), a.FitLevel(), h.RefreshMap(!0);
                        else if (ha) {
                            var d = Math.abs(Math.sqrt(fa * fa + ga * ga)),
                                e = -fa;
                            b = -ga;
                            if (d > Ga && 2 < xa && !va) {
                                d = e * ua;
                                b *= ua;
                                var f = h.getCenterX(),
                                    g = h.getCenterY(),
                                    n = h.ToMapDistX(d),
                                    p = h.ToMapDistY(b);
                                b = f + n;
                                d = g + p;
                                ia = TGOS.fx.createAnimation({
                                    easing: TGOS.fx.easing.quadOut,
                                    type: window.requestAnimationFrame ? "req" : "setTimeout",
                                    duration: ua,
                                    repeat: !1,
                                    onAnimation: function(a) {
                                        TGOS.moveMapTo_(l, f + n * a, g + p * a);
                                        h.RefreshMap(!1)
                                    },
                                    onEnd: function() {
                                        var a = h.getCenterX(),
                                            b = h.getCenterY(),
                                            a = l.checkMapBoundsRestrict(D, a, b);
                                        null != a ? (TGOS.moveMapTo_(l, a.x, a.y), h.RefreshMap(!1)) : h.RefreshMap(!0);
                                        TGOS.TGEvent.trigger(l, "idle")
                                    }
                                });
                                ia.play()
                            } else b = h.getCenterX(), d = h.getCenterY(), b = l.checkMapBoundsRestrict(D, b, d), null != b && TGOS.moveMapTo_(l, b.x, b.y), h.RefreshMap(!0), TGOS.TGEvent.trigger(l,
                                "idle")
                        } else h.RefreshMap(!0), TGOS.TGEvent.trigger(l, "idle");
                        N = Q = null;
                        P = z = !1;
                        t = !0;
                        v(500)
                    }
                },
                Da = function(a) {
                    a.preventDefault();
                    k = [];
                    h.RefreshMap(!0);
                    z = !1
                },
                Aa = function() {
                    va = !0
                },
                Ma = function(a) {
                    util.disableDefault(a);
                    if (d) {
                        var b = a.screenX - K,
                            e = a.screenY - F;
                        K = a.screenX;
                        F = a.screenY;
                        Ha && (clearTimeout(Ha), va = !1);
                        setTimeout(Aa, 500);
                        xa++;
                        la = S;
                        ma = R;
                        S = a.screenX;
                        R = a.screenY;
                        U = !0;
                        I.style.cursor = X ? X : "url(" + TGOS.RES_PATH + "catch.cur),default";
                        a = h.getCenterX() - h.ToMapDistX(b);
                        e = h.getCenterY() - h.ToMapDistY(e);
                        TGOS.moveMapTo_(l,
                            a, e);
                        h.RefreshMap(!1);
                        1 > Y && TGOS.TGEvent.trigger(l, "dragstart");
                        TGOS.TGEvent.trigger(l, "drag");
                        Y++
                    }
                },
                ia, ua = 500,
                Ga = 0.08,
                Ba = function(a) {
                    util.disableDefault(a);
                    if (d) {
                        DetachEvent(I, "mousemove", Ma, !0);
                        DetachEvent(I, "mouseup", Ba, !0);
                        I.style.cursor = V ? V : "default";
                        L = !1;
                        if (D) {
                            var b = a.screenX - K;
                            a = a.screenY - F;
                            b = h.getCenterX() - h.ToMapDistX(b);
                            a = h.getCenterY() - h.ToMapDistY(a);
                            b = l.checkMapBoundsRestrict(D, b, a);
                            null != b && (TGOS.moveMapTo_(l, b.x, b.y), h.RefreshMap(!1))
                        } else if (ha) {
                            a = Math.abs(Math.sqrt(fa * fa + ga * ga));
                            var e = -fa,
                                b = -ga;
                            if (a > Ga && 2 < xa && !va) {
                                a = e * ua;
                                var b = b * ua,
                                    f = h.getCenterX(),
                                    g = h.getCenterY(),
                                    k = h.ToMapDistX(a),
                                    m = h.ToMapDistY(b),
                                    b = f + k;
                                a = g + m;
                                ia = TGOS.fx.createAnimation({
                                    easing: TGOS.fx.easing.quadOut,
                                    type: window.requestAnimationFrame ? "ra" : "setTimeout",
                                    duration: ua,
                                    repeat: !1,
                                    onAnimation: function(a) {
                                        TGOS.moveMapTo_(l, f + k * a, g + m * a);
                                        h.RefreshMap(!1)
                                    },
                                    onEnd: function() {
                                        h.RefreshMap(!0);
                                        TGOS.TGEvent.trigger(l, "idle")
                                    }
                                });
                                ia.play()
                            } else h.RefreshMap(!0), TGOS.TGEvent.trigger(l, "idle")
                        } else h.RefreshMap(!0), TGOS.TGEvent.trigger(l,
                            "idle");
                        clearInterval(wa);
                        U && TGOS.TGEvent.trigger(l, "dragend");
                        TGOS.Log("web", "A01", "")
                    }
                },
                wa, Ha, xa = 0,
                va = !0,
                Ca = function(a) {
                    util.disableDefault(a);
                    ia && ia.stop();
                    va = !1;
                    ga = fa = xa = 0;
                    S = a.screenX;
                    R = a.screenY;
                    la = S;
                    ma = R;
                    wa = setInterval(da, 50);
                    d && (L = !0, U = !1, Y = 0, AttachEvent(I, "mouseup", Ba, !0), AttachEvent(I, "mousemove", Ma, !0), I.focus())
                },
                Na = function(a) {
                    util.disableDefault(a);
                    d && (L = !0, K = a.screenX, F = a.screenY)
                },
                ja = function(d) {
                    util.disableDefault(d);
                    b && (L = !0, d = h.getCursorPosition(d), d = h.ToMapPoint(d.x, d.y), a.putMapLevel(a.getMapLevel() +
                        1), TGOS.moveMapTo_(l, d.x, d.y), h.RefreshMap(!0), TGOS.TGEvent.trigger(l, "idle"))
                },
                ya = function(b) {
                    util.disableDefault(b);
                    if (e) {
                        L = !0;
                        var d = h.getCursorPosition(b),
                            f = h.getClientWidth() / 2,
                            g = h.getClientHeight() / 2;
                        h.FromMapPoint(f, g);
                        d = h.ToMapPoint(d.x, d.y);
                        f = h.getScale();
                        b = b.wheelDelta ? b.wheelDelta : -b.detail;
                        g = 0;
                        0 < b ? g = 1 : 0 > b && (g = -1);
                        a.putMapLevel(a.getMapLevel() + g);
                        b = h.getScale() / f;
                        d = new TGOS.TGPoint((h.getCenterX() - d.x) / b + d.x, (h.getCenterY() - d.y) / b + d.y);
                        D && (b = l.checkMapBoundsRestrict(D, d.x, d.y), null != b &&
                            (d.x = b.x, d.y = b.y));
                        TGOS.moveMapTo_(l, d.x, d.y);
                        h.RefreshMap(!0);
                        TGOS.TGEvent.trigger(l, "idle")
                    }
                },
                $ = 0,
                Oa = function(a) {
                    Z && ($ = 0)
                },
                Ia = function(a) {
                    function b(a, d) {
                        TGOS.moveMapTo_(l, h.getCenterX() + a, h.getCenterY() + d);
                        h.RefreshMap(!1)
                    }
                    if (Z) {
                        var d = h.getTransformation();
                        $ += 4;
                        24 < $ && ($ = 24);
                        var e = 1 / d.getScaleX() * $,
                            f = 1 / d.getScaleY() * $;
                        switch (a.keyCode) {
                            case 37:
                                b(-e, 0);
                                break;
                            case 38:
                                b(0, -f);
                                break;
                            case 39:
                                b(e, 0);
                                break;
                            case 40:
                                b(0, f);
                                break;
                            case 107:
                                d.putMapLevel(d.getMapLevel() + 1);
                                h.RefreshMap(!0);
                                break;
                            case 109:
                                d.putMapLevel(d.getMapLevel() +
                                    -1), h.RefreshMap(!0)
                        }
                    }
                };
            this.OpenCloseDblClick = function(a) {
                b && a || ((b = a) ? AttachEvent(I, "dblclick", ja, !1) : DetachEvent(I, "dblclick", ja, !1))
            };
            this.OpenCloseMove = function(a) {
                d && a || ((d = a) ? (AttachEvent(I, "mousedown", Ca, !1), AttachEvent(I, "touchstart", ba, !1), AttachEvent(I, "touchend", ra, !1), AttachEvent(I, "touchcancel", Da, !1), AttachEvent(I, "touchleave", ra, !1), AttachEvent(I, "touchmove", pa, !1)) : (DetachEvent(I, "mousedown", Ca, !1), DetachEvent(I, "touchstart", ba, !1), DetachEvent(I, "touchend", ra, !1), DetachEvent(I, "touchcancel",
                    Da, !1), DetachEvent(I, "touchleave", ra, !1), DetachEvent(I, "touchmove", pa, !1)))
            };
            this.OpenCloseWheel = function(a) {
                e && a || (a ? AttachEvent(I, "mousewheel", ya, !1) : DetachEvent(I, "mousewheel", ya, !1), e = a)
            };
            this.OpenClosekeyboard = function(a) {
                f && a || (f = a, !1 == a ? (DetachEvent(I, "keydown", Ia, !1), DetachEvent(I, "keyup", Oa, !1)) : (AttachEvent(I, "keydown", Ia, !1), AttachEvent(I, "keyup", Oa, !1)))
            };
            this.ExitMapEvent = function() {
                e && DetachEvent(I, "mousewheel", ya, !1);
                DetachEvent(I, "mousedown", Ca, !1);
                DetachEvent(I, "mousedown", Na, !1);
                b && DetachEvent(I, "dblclick", ja, !1);
                DetachEvent(I, "touchstart", ba, !1);
                DetachEvent(I, "touchend", ra, !1);
                DetachEvent(I, "touchcancel", Da, !1);
                DetachEvent(I, "touchleave", ra, !1);
                DetachEvent(I, "touchmove", pa, !1)
            };
            AttachEvent(I, "mousedown", Ca, !1);
            AttachEvent(I, "mousedown", Na, !1);
            AttachEvent(I, "contextmenu", function(a) {}, !1);
            AttachEvent(I, "keydown", Ia, !1);
            AttachEvent(I, "keyup", Oa, !1);
            b && AttachEvent(I, "dblclick", ja, !1);
            e && AttachEvent(I, "mousewheel", ya, !1);
            AttachEvent(I, "touchstart", ba, !1);
            AttachEvent(I, "touchend",
                ra, !1);
            AttachEvent(I, "touchcancel", Da, !1);
            AttachEvent(I, "touchleave", ra, !1);
            AttachEvent(I, "touchmove", pa, !1)
        }
    };
    TGOS.MapScaleLevel = function(a, b, d, e, f) {
        function g(a) {
            for (var b = 0, b = 0; b < w.length - 1 && !(a < w[b + 1]); b++);
            if (b < w.length - 1) var d = w[b],
                e = w[b + 1],
                b = b + Math.log(a / d) / Math.log(e / d);
            return b
        }

        function h(a) {
            var b = Math.floor(Math.max(0, Math.min(a, w.length - 2))),
                d = w[b];
            return d * Math.pow(w[b + 1] / d, a - b)
        }
        var k = 1,
            l = b,
            D = null,
            y = 256 / d,
            z = 256 / e,
            w = [];
        for (b = 0; b < f.length; b++) w.push(f[f.length - 1] / f[b]);
        w.reverse();
        var t =
            1,
            u;
        this.FitLevel = function() {
            this.putMapLevel(Math.round(k))
        };
        this.setMapBoundsLevel = function(b) {
            if (u = b) b = a.getMapBase(), b.getClientHeight(), b = b.getClientWidth() / (u.right - u.left), b = Math.ceil(g(b / y)), b < D && (b = D), b > l && (b = l), this.setMapMinLevel(b)
        };
        this.getBaseScaleX = function() {
            return y
        };
        this.putBaseScaleX = function(a) {
            y = a
        };
        this.getBaseScaleY = function() {
            return z
        };
        this.putBaseScaleY = function(a) {
            z = a
        };
        this.getMapMinLevel = function() {
            return D
        };
        this.setMapMinMaxLevel = function(b, d) {
            l = null == d ? TGOS.MapTypeMaxZoomLevel[a.getCoordSys()][a.getMapTypeId()] :
                Math.min(d, TGOS.MapTypeMaxZoomLevel[a.getCoordSys()][a.getMapTypeId()]);
            D = null == b ? 0 : b;
            k > l ? (this.putMapLevel(l), a.setZoom(l)) : k < D && (this.putMapLevel(D), a.setZoom(D))
        };
        this.setMapMaxLevel = function(b) {
            l = null == b ? TGOS.MapTypeMaxZoomLevel[a.getCoordSys()][a.getMapTypeId()] : Math.min(b, TGOS.MapTypeMaxZoomLevel[a.getCoordSys()][a.getMapTypeId()]);
            k > l && (this.putMapLevel(l), a.setZoom(l))
        };
        this.getMapMaxLevel = function() {
            Math.min(l, TGOS.MapTypeMaxZoomLevel[a.getCoordSys()][a.getMapTypeId()]);
            return l
        };
        this.setMapMinLevel =
            function(b) {
                D = null == b ? 0 : b;
                k < D && (this.putMapLevel(D), a.setZoom(D))
            };
        this.getLevelNumber = function() {
            return this.getMapMaxLevel() - this.getMapMinLevel()
        };
        this.getMapLevel = function() {
            return k
        };
        this.putMapLevel = function(b) {
            var d = a.getMapBase().getCenterX(),
                e = a.getMapBase().getCenterY(),
                f = a.getBounds().toString(),
                g = TGOS.MapTypeMaxZoomLevel[a.getCoordSys()][a.getMapTypeId()],
                g = null == l ? g : g > l ? l : g,
                n = null == D ? 0 : D,
                p = b > g ? g : b < n ? n : b,
                s = k !== b;
            k = p;
            t = h(k);
            var q = a.getMapTypeId(),
                v = a.getCoordSys();
            TGOS.Log("web", "A02",
                TGOS.TGMapTypeIdCode[q]);
            "EPSG3826" == v || "EPSG3825" == v ? "TGOSMAP" == q && 13 == p && TGOS.Log("web", "A02", TGOS.TGMapTypeIdCode.NLSCMAP) : "EPSG3857" == v && "TGOSMAP" == q && 19 == p && TGOS.Log("web", "A02", TGOS.TGMapTypeIdCode.NLSCMAP);
            p = a.getMapBase().getCenterX();
            q = a.getMapBase().getCenterY();
            v = a.getBounds().toString();
            d == p && e == q || TGOS.TGEvent.trigger(a, "center_changed");
            f != v && TGOS.TGEvent.trigger(a, "bounds_changed");
            s && TGOS.TGEvent.trigger(a, "zoom_changed");
            u && (d = a.getMapBase().getCenterX(), e = a.getMapBase().getCenterY(),
                d = a.checkMapBoundsRestrict(u, d, e), null != d && (TGOS.moveMapTo_(a, d.x, d.y), a.getMapBase().RefreshMap(!1)));
            TGOS.TGEvent.trigger(a, "idle");
            return b > g || b < n ? !1 : !0
        };
        this.getScale = function() {
            return y * t
        };
        this.putScale = function(a) {
            this.putMapLevel(g(a / y))
        };
        this.getScaleX = function() {
            return y * t
        };
        this.getScaleY = function() {
            return z * t
        };
        this.getLevelScale = function(a) {
            return y * h(a)
        }
    };
    TGOS.TGTransStatus = {
        OK: "OK",
        INVALID_REQUEST: "INVALID_REQUEST"
    };
    TGOS.TGMaxZoomLevel = function() {
        this.getMaxZoomLevel = function(a, b, d) {
            return d.call(this,
                TGOS.MapTypeMaxZoomLevel[b][a])
        }
    };
    Proj4js.defs["EPSG:3826"] = "+title=TWD97 TM2+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +units=\u516c\u5c3a +no_defs";
    Proj4js.defs["EPSG:3857"] = "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs";
    Proj4js.defs["EPSG:3825"] = "+title=\u4e8c\u5ea6\u5206\u5e36\uff1aTWD97 TM2 \u6f8e\u6e56 +proj=tmerc +lat_0=0 +lon_0=119 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +units=\u516c\u5c3a +no_defs";
    var g = new Proj4js.Proj("EPSG:3826"),
        k = new Proj4js.Proj("EPSG:3825"),
        l = new Proj4js.Proj("EPSG:3857"),
        h = new Proj4js.Proj("EPSG:4326");
    TGOS.TWD97toWGS84 = function(a, b) {
        var d = new Proj4js.Point(parseFloat(a), parseFloat(b));
        Proj4js.transform(g, h, d);
        return d
    };
    TGOS.WGS84toTWD97 = function(a, b) {
        var d = new Proj4js.Point(parseFloat(a), parseFloat(b));
        Proj4js.transform(h, g, d);
        return d
    };
    TGOS.TWD97_119toWGS84 = function(a, b) {
        var d = new Proj4js.Point(parseFloat(a), parseFloat(b));
        Proj4js.transform(k, h, d);
        return d
    };
    TGOS.TWD67toWGS84 =
        TGOS.TWD97_119toWGS84;
    TGOS.WGS84toTWD97_119 = function(a, b) {
        var d = new Proj4js.Point(parseFloat(a), parseFloat(b));
        Proj4js.transform(h, k, d);
        return d
    };
    TGOS.WGS84toTWD67 = TGOS.WGS84toTWD97_119;
    TGOS.TWD97toTWD97_119 = function(a, b) {
        var d = new Proj4js.Point(parseFloat(a), parseFloat(b));
        Proj4js.transform(g, k, d);
        return d
    };
    TGOS.TWD97toTWD67 = TGOS.TWD97toTWD97_119;
    TGOS.TWD97_119toTWD97 = function(a, b) {
        var d = new Proj4js.Point(parseFloat(a), parseFloat(b));
        Proj4js.transform(EPSG4325, g, d);
        return d
    };
    TGOS.TWD67toTWD97 = TGOS.TWD97_119toTWD97;
    TGOS.GooToWGS84 = function(a, b) {
        var d = new Proj4js.Point(parseFloat(a), parseFloat(b));
        Proj4js.transform(l, h, d);
        return d
    };
    TGOS.WGS84ToGoo = function(a, b) {
        var d = new Proj4js.Point(parseFloat(a), parseFloat(b));
        Proj4js.transform(h, l, d);
        return d
    };
    TGOS.TGTransformation = function() {
        this.twd97towgs84 = function(a, b) {
            var d = new Proj4js.Point(parseFloat(a), parseFloat(b));
            Proj4js.transform(g, h, d);
            this.transResult = new TGOS.TGPoint(d.x, d.y);
            TGOS.Log("web", "A06", "")
        };
        this.wgs84totwd97 = function(a, b) {
            var d = new Proj4js.Point(parseFloat(a),
                parseFloat(b));
            Proj4js.transform(h, g, d);
            this.transResult = new TGOS.TGPoint(d.x, d.y);
            TGOS.Log("web", "A06", "")
        };
        this.twd97_119towgs84 = function(a, b) {
            var d = new Proj4js.Point(parseFloat(a), parseFloat(b));
            Proj4js.transform(k, h, d);
            this.transResult = new TGOS.TGPoint(d.x, d.y);
            TGOS.Log("web", "A06", "")
        };
        this.wgs84totwd97_119 = function(a, b) {
            var d = new Proj4js.Point(parseFloat(a), parseFloat(b));
            Proj4js.transform(h, k, d);
            this.transResult = new TGOS.TGPoint(d.x, d.y);
            TGOS.Log("web", "A06", "")
        };
        this.transResult = null
    }
})();
TGOS.Graphic = function() {
    var a = function() {
        this.type = "TGGraphic"
    };
    TGOS.extend(TGOS.MVCObject, a);
    var d = a.prototype;
    d.triggerEvent = function(a, d) {
        var e = this.getMapBase();
        if (e) {
            var g = e.getPackageOffset(),
                k, l;
            a.changedTouches && a.changedTouches.length ? (k = a.changedTouches[0].clientX, l = a.changedTouches[0].clientY) : (k = a.clientX, l = a.clientY);
            var e = e.ToMapPoint(k - g.x, l - g.y),
                h;
            switch (this.getMap().getCoordSys()) {
                case TGOS.TGCoordSys.EPSG3857:
                    h = TGOS.GooToWGS84(e.x, e.y);
                    break;
                case TGOS.TGCoordSys.EPSG3826:
                    h = e;
                    break;
                case TGOS.TGCoordSys.EPSG3825:
                    h = e
            }
            e = new TGOS.TGMouseEvent(a);
            e.point = new TGOS.TGPoint(h.x, h.y);
            e.target = this;
            TGOS.TGEvent.trigger_(this, d, e)
        }
    };
    d.onMouseUp = function(a) {
        this.triggerEvent.call(this, a, "mouseup")
    };
    d.onMouseMove = function(a) {
        this.triggerEvent.call(this, a, "mousemove")
    };
    d.onMouseDown = function(a) {
        this.__downE = a;
        this.triggerEvent.call(this, a, "mousedown");
        var d = this;
        a = function() {
            d.onDrag.apply(d, arguments)
        };
        var e = function() {
            d.onDragEnd.apply(d, arguments)
        };
        this.elem.dragWrapper = a;
        this.elem.dragEndWrapper =
            e;
        this.elem.mousemove(a);
        this.elem.mouseup(e);
        this.elem.touchmove(a);
        this.elem.touchend(e)
    };
    d.onMouseOver = function(a) {
        this.triggerEvent.call(this, a, "mouseover")
    };
    d.onMouseOut = function(a) {
        this.triggerEvent.call(this, a, "mouseout")
    };
    d.onDblClick = function(a) {
        this.triggerEvent.call(this, a, "dblclick")
    };
    d.isSamePosition = function(a, d) {
        var e, g, k, l;
        a.changedTouches && d.changedTouches && a.changedTouches.length && d.changedTouches.length ? (e = a.changedTouches[0].screenX, g = a.changedTouches[0].screenY, k = d.changedTouches[0].screenX,
            l = d.changedTouches[0].screenY) : (e = a.screenX, g = a.screenY, k = d.screenX, l = d.screenY);
        return e === k && g === l
    };
    d.onDrag = function(a) {
        this.isSamePosition(this.__downE, a) || (this.elem.unmousemove(this.elem.dragWrapper), this.elem.unmouseup(this.elem.dragEndWrapper), this.elem.untouchmove(this.elem.dragWrapper), this.elem.untouchend(this.elem.dragEndWrapper))
    };
    d.onDragEnd = function(a) {
        this.elem.unmousemove(this.elem.dragWrapper);
        this.elem.unmouseup(this.elem.dragEndWrapper);
        this.elem.untouchmove(this.elem.dragWrapper);
        this.elem.untouchend(this.elem.dragEndWrapper);
        a.button == TGOS.TGEvent.RIGHTBUTTON ? this.triggerEvent.call(this, a, "rightclick") : this.triggerEvent.call(this, a, "click")
    };
    d.bindEvents = function() {
        if (this.elem = this.getEventElement()) {
            var a = this;
            this.elem.mouseup(function(d) {
                a.onMouseUp.apply(a, arguments)
            });
            this.elem.mousemove(function(d) {
                a.onMouseMove.apply(a, arguments)
            });
            this.elem.mousedown(function(d) {
                a.onMouseDown.apply(a, arguments)
            });
            this.elem.mouseover(function(d) {
                a.onMouseOver.apply(a, arguments)
            });
            this.elem.mouseout(function(d) {
                a.onMouseOut.apply(a, arguments)
            });
            this.elem.dblclick(function(d) {
                a.onDblClick.apply(a, arguments)
            });
            this.elem.touchstart(function(d) {
                a.onMouseDown.apply(a, arguments)
            });
            this.elem.touchend(function(d) {
                a.onMouseUp.apply(a, arguments)
            });
            this.elem.touchmove(function(d) {
                a.onMouseMove.apply(a, arguments)
            })
        }
    };
    d.annotation = null;
    return a
}();
TGOS.TGGraphic = function() {
    var a = function(a) {
            this.gs_ = [];
            a && (a.geometry instanceof TGOS.TGGeometry && (this.geometry = a.geometry), a.properties && (this.properties = a.properties), a.id && (this.id = a.id))
        },
        d = a.prototype;
    d.id = null;
    d.geometry = null;
    d.properties = null;
    d.style = null;
    d.gs_ = null;
    d.getGeometry = function() {
        return this.geoemtry
    };
    d.getProperty = function(a) {
        if (this.properties) return this.properties[a]
    };
    d.setProperty = function(a, d) {
        if (this.properties && a) {
            var e = this.properties[a];
            this.properties[a] = d;
            TGOS.TGEvent.trigger_(this,
                "setproperty", {
                    graphic: this,
                    name: a,
                    oldValue: e,
                    newValue: d
                })
        }
    };
    d.redraw = function(a) {
        this.clear();
        this.draw(a)
    };
    d.setGeometry = function(a) {
        if (!a) {
            var d = this.geometry;
            this.geometrty = a;
            TGOS.TGEvent.trigger_(this, "setgeometry", {
                graphic: this,
                oldGeometry: d,
                newGeometry: value
            })
        }
    };
    d.removeProperty = function(a) {
        if (this.properties && a && a in this.properties) {
            var d = this.properties[a];
            this.properties[a] = void 0;
            TGOS.TGEvent.trigger_(this, "removeproperty", {
                graphic: this,
                name: a,
                oldValue: d
            })
        }
    };
    d.setStyle = function(a) {
        this.style =
            a
    };
    d.clear = function() {
        for (var a = 0; a < this.gs_.length; a++) this.gs_[a].setMap(null);
        this.gs_ = []
    };
    d.bindEvents = function(a) {
        var d = this;
        TGOS.TGEvent.addListener(a, "mousedown", function(a) {
            TGOS.TGEvent.trigger_(d, "mousedown", a)
        });
        TGOS.TGEvent.addListener(a, "mouseup", function(a) {
            TGOS.TGEvent.trigger_(d, "mouseup", a)
        });
        TGOS.TGEvent.addListener(a, "mousemove", function(a) {
            TGOS.TGEvent.trigger_(d, "mousemove", a)
        });
        TGOS.TGEvent.addListener(a, "mouseover", function(a) {
            TGOS.TGEvent.trigger_(d, "mouseover", a)
        });
        TGOS.TGEvent.addListener(a,
            "dblclick",
            function(a) {
                TGOS.TGEvent.trigger_(d, "dblclick", a)
            });
        TGOS.TGEvent.addListener(a, "click", function(a) {
            TGOS.TGEvent.trigger_(d, "click", a)
        });
        TGOS.TGEvent.addListener(a, "rightclick", function(a) {
            TGOS.TGEvent.trigger_(d, "rightclick", a)
        });
        TGOS.TGEvent.addListener(a, "mouseout", function(a) {
            TGOS.TGEvent.trigger_(d, "mouseout", a)
        })
    };
    d.style_changed = function() {};
    d.ownStyle = null;
    d.draw = function(a, d) {
        if (a && (d = d ? d : this.geometry)) {
            var e = this.ownStyle || this.style;
            "function" == typeof e && (e = e(this));
            if (d instanceof TGOS.TGPoint) {
                var g = new TGOS.TGMarker(a, d, null, null, e);
                this.bindEvents(g);
                this.gs_.push(g)
            } else if (d instanceof TGOS.TGLineString) e = new TGOS.TGLine(a, d, e), this.bindEvents(g), this.gs_.push(e);
            else if (d instanceof TGOS.TGPolygon) g = new TGOS.TGFill(a, d, e), this.bindEvents(g), this.gs_.push(g);
            else if (d instanceof TGOS.TGMultiLineString) e = new TGOS.TGLine(a, d, e), this.bindEvents(e), this.gs_.push(e);
            else if (d instanceof TGOS.TGMultiPolygon) g = new TGOS.TGFill(a, d, e), this.bindEvents(g), this.gs_.push(g);
            else if (d instanceof TGOS.TGMultiPoint)
                for (g = d.getArray(), e = 0; e < g.length; e++) this.draw(a, g[e]);
            else if (d instanceof TGOS.TGGeometryCollection)
                for (g = d.getArray(), e = 0; e < g.length; e++) this.draw(a, g[e])
        }
    };
    TGOS.RegisterEvent(a, "setproperty removeproperty click dblclick mousedown mouseup mouseout mouseover mousemove rightclick".split(" "));
    return a
}();
(function() {
    function a(a) {
        a.cancelBubble = !0;
        a.stopPropagation && a.stopPropagation()
    }
    var d = function(a, b) {
            switch (a) {
                case TGOS.TGCoordSys.EPSG3857:
                    var d = TGOS.WGS84ToGoo(b.x, b.y);
                    break;
                case TGOS.TGCoordSys.EPSG3826:
                    d = b;
                    break;
                case TGOS.TGCoordSys.EPSG3825:
                    d = b
            }
            return d
        },
        b = function(a, b, g, k) {
            var l = "";
            g = g.getPath().getPath();
            var h = k ? d(b, g[g.length - 1]) : d(b, g[0]),
                h = a.FromMapPoint(h.x, h.y),
                l = l + "M" + h.x + " " + h.y;
            for (k = 0; k < g.length; k++) h = d(b, g[k]), h = a.FromMapPoint(h.x, h.y), l = l + "L" + h.x + " " + h.y;
            return l + " Z "
        };
    TGOS.TGFill =
        function(f, e, g) {
            var k = 0,
                l = 0,
                h = f,
                m = e,
                n = !0,
                p = 1,
                s = "#88ff88",
                q = "#000000",
                v = 1,
                x = 1,
                A = "none",
                B = 0,
                D = !0,
                y = null;
            this.getEventElement = function() {
                return null == h ? null : t
            };
            var z = this;
            this.markMove = function(b) {
                a(b);
                var d = h.getMapBase(),
                    e = d.getPackageOffset(),
                    f;
                switch (h.getCoordSys()) {
                    case TGOS.TGCoordSys.EPSG3857:
                        f = d.ToMapPoint(b.clientX - e.x, b.clientY - e.y);
                        f = TGOS.GooToWGS84(f.x, f.y);
                        f = new TGOS.TGPoint(f.x, f.y);
                        break;
                    case TGOS.TGCoordSys.EPSG3826:
                        f = d.ToMapPoint(b.clientX - e.x, b.clientY - e.y);
                        break;
                    case TGOS.TGCoordSys.EPSG3825:
                        f =
                            d.ToMapPoint(b.clientX - e.x, b.clientY - e.y)
                }
                b = f.x - z.spos.x;
                f = f.y - z.spos.y;
                d = m.getBounds();
                m.transform(1, 0, 0, 1, b - (d.left - z.senv.left), f - (d.top - z.senv.top));
                z.update()
            };
            this.endDrag = function(b) {
                a(b);
                DetachEvent(document.body, "mousemove", z.markMove, !0);
                DetachEvent(document.body, "mouseup", z.endDrag, !0)
            };
            this.markDrag = function(b) {
                a(b);
                var d = h.getMapBase(),
                    e = d.getPackageOffset(),
                    f;
                switch (h.getCoordSys()) {
                    case TGOS.TGCoordSys.EPSG3857:
                        b = d.ToMapPoint(b.clientX - e.x, b.clientY - e.y);
                        b = TGOS.GooToWGS84(b.x, b.y);
                        f = new TGOS.TGPoint(b.x, b.y);
                        break;
                    case TGOS.TGCoordSys.EPSG3826:
                        f = d.ToMapPoint(b.clientX - e.x, b.clientY - e.y);
                        break;
                    case TGOS.TGCoordSys.EPSG3825:
                        f = d.ToMapPoint(b.clientX - e.x, b.clientY - e.y)
                }
                z.spos = f;
                b = m.getBounds();
                z.senv = new TGOS.TGEnvelope(b.left, b.top, b.right, b.bottom);
                AttachEvent(document.body, "mousemove", z.markMove, !0);
                AttachEvent(document.body, "mouseup", z.endDrag, !0)
            };
            this.getDraggable = function() {
                return this.draggable
            };
            this.setDraggable = function(a) {
                this.draggable = a;
                t && (a && t ? t.mousedown(this.markDrag) :
                    t.unmousedown(this.markDrag))
            };
            this.getVisible = function() {
                return D
            };
            this.setVisible = function(a) {
                switch (a) {
                    case !0:
                        D = !0;
                        t.show();
                        this.redraw();
                        this.update();
                        break;
                    case !1:
                        t.hide(), D = !1, this.redraw(), this.update()
                }
            };
            this.getMap = function() {
                return h
            };
            this.setMap = function(a) {
                t && t.remove();
                if (null == a) {
                    if (!h) return;
                    h.overlay.containing(this) && h.overlay.remove(this);
                    TGOS.TGEvent.clearInstanceListeners(this);
                    h = null
                }
                a instanceof TGOS.TGOnlineMap && (h = a)
            };
            this.getPath = function() {
                return m
            };
            this.setPath = function(a) {
                m =
                    a;
                this.redraw(!0)
            };
            this.getBounds = function() {
                if (m) return m.getBounds()
            };
            this.setClickable = function(a) {
                "boolean" === typeof a && ((n = a) ? TGOS.TGEvent.releaseEventLock(this, "click") : TGOS.TGEvent.lockEvent(this, "click"), TGOS.TGEvent.trigger(this, "clickable_changed"))
            };
            this.getOpacity = function() {
                return p
            };
            this.setOpacity = function(a) {
                p = a;
                t && t.attr({
                    "fill-opacity": p
                })
            };
            this.getClickable = function() {
                return n
            };
            this.getFillColor = function() {
                return s
            };
            this.setFillColor = function(a) {
                s = a;
                t && t.attr({
                    fill: s
                })
            };
            this.getStrokeColor =
                function() {
                    return q
                };
            this.setStrokeColor = function(a) {
                q = a;
                t && t.attr({
                    stroke: a
                })
            };
            this.getStrokeWeight = function() {
                return v
            };
            this.setStrokeWeight = function(a) {
                v = a;
                t && t.attr({
                    "stroke-width": v
                })
            };
            this.getStrokeOpacity = function() {
                return x
            };
            this.setStrokeOpacity = function(a) {
                x = a;
                t && t.attr({
                    "stroke-opacity": x
                })
            };
            this.getZIndex = function() {
                return B
            };
            this.setZIndex = function(a, b) {
                "number" === typeof a && t && (B = parseFloat(a), h.overlay.updateArrayOrder(this), h.overlay.updateElementOrder(this), TGOS.TGEvent.trigger(this,
                    "zindex_changed"))
            };
            this.update = function() {
                if (m && h && t)
                    if (D) {
                        var a = h.getMapBase(),
                            b = this.getAnchorPoint(),
                            a = a.FromMapPoint(b.x, b.y);
                        t.transform("t" + (a.x - k) + "," + (a.y - l))
                    } else t.hide()
            };
            this.createPathStr = function() {
                var a = "",
                    e = h.getCoordSys(),
                    f = h.getMapBase();
                if (m instanceof TGOS.TGPolygon)
                    for (var a = a + b(f, e, m.getExteriorRing()), g = m.getInteriorRings(), k = 0; k < g.length; k++) a += b(f, e, g[k], !0);
                if (m instanceof TGOS.TGMultiPolygon)
                    for (var a = "", l = 0; l < m.getLength(); l++)
                        for (g = m.getArray()[l], a += b(f, e, g.getExteriorRing()),
                            g = g.getInteriorRings(), k = 0; k < g.length; k++) a += b(f, e, g[k], !0);
                else if (m instanceof TGOS.TGCircle) {
                    for (var a = d(e, m.getCenter()), e = f.FromMapPoint(a.x, a.y), a = m.getRadius(), f = f.FromMapDistX(a), n = 0, g = e.x + Math.cos(0) * f, n = e.y + Math.sin(0) * f, a = "M" + Math.round(g) + " " + Math.round(n), k = 12, l = 0; 30 > l; l++) n = k / 180 * Math.PI, g = Math.round(e.x + Math.cos(n) * f), n = Math.round(e.y + Math.sin(n) * f), a = a + "L" + g + " " + n, k += 12;
                    a += " Z"
                } else m instanceof TGOS.TGEnvelope && (g = d(e, new TGOS.TGPoint(m.left, m.top)), k = d(e, new TGOS.TGPoint(m.right,
                    m.top)), a = d(e, new TGOS.TGPoint(m.right, m.bottom)), e = d(e, new TGOS.TGPoint(m.left, m.bottom)), g = f.FromMapPoint(g.x, g.y), k = f.FromMapPoint(k.x, k.y), a = f.FromMapPoint(a.x, a.y), f = f.FromMapPoint(e.x, e.y), a = "M" + Math.round(g.x) + " " + Math.round(g.y) + "L" + Math.round(k.x) + " " + Math.round(k.y) + "L" + Math.round(a.x) + " " + Math.round(a.y) + "L" + Math.round(f.x) + " " + Math.round(f.y) + " Z");
                return a
            };
            this.getAnchorPoint = function() {
                var a, b = h.getCoordSys();
                m instanceof TGOS.TGPolygon ? a = d(b, m.getExteriorRing().getPath().getPath()[0]) :
                    m instanceof TGOS.TGMultiPolygon ? a = d(b, m.getArray()[0].getExteriorRing().getPath().getPath()[0]) : m instanceof TGOS.TGCircle ? a = d(b, m.getCenter()) : m instanceof TGOS.TGEnvelope && (a = d(b, new TGOS.TGPoint(m.left, m.top)));
                return a
            };
            this.redraw = function(a) {
                if (t && h && m)
                    if (D) {
                        var b = h.getMapBase(),
                            d = h.getCoordSys(),
                            e = m.getBounds(d),
                            d = Math.abs(b.FromMapDistX(e.right - e.left)),
                            f = Math.abs(b.FromMapDistY(e.top - e.bottom)),
                            g = this.getAnchorPoint(),
                            n = h.getMapSize().width,
                            w = h.getMapSize().height,
                            z;
                        h.getCoordSys() == TGOS.TGCoordSys.EPSG3857 ?
                            (z = TGOS.WGS84ToGoo(e.left, e.top), e = TGOS.WGS84ToGoo(e.right, e.bottom), z = b.FromMapPoint(z.x, z.y), e = b.FromMapPoint(e.x, e.y)) : (z = b.FromMapPoint(e.left, e.top), e = b.FromMapPoint(e.right, e.bottom));
                        if (util.intersectRect({
                                left: z.x,
                                top: z.y,
                                right: e.x,
                                bottom: e.y
                            }, {
                                left: 0,
                                top: 0,
                                right: n,
                                bottom: w
                            })) {
                            t.show();
                            if (!a) {
                                if (y == b.getScale()) return;
                                y = b.getScale()
                            }
                            a = b.FromMapPoint(g.x, g.y);
                            k = a.x;
                            l = a.y;
                            a = this.createPathStr();
                            t.attr({
                                "stroke-width": v,
                                stroke: q,
                                "stroke-opacity": x,
                                fill: s,
                                "fill-opacity": p,
                                width: d,
                                height: f,
                                "stroke-dasharray": A,
                                path: a
                            })
                        } else t.hide()
                    } else t.hide()
            };
            this.getMapBase = function() {
                if (h) return h.getMapBase()
            };
            var w, t;
            this.init = function() {
                w = h.getPaper();
                t = w.path("");
                h.overlay.updateArrayOrder(this);
                h.overlay.updateElementOrder(this);
                this.bindEvents(t);
                h.overlay.push(this);
                this.redraw();
                this.update();
                !0 == this.draggable && this.setDraggable(!0)
            };
            void 0 != g && ("undefined" != typeof g.visible && "boolean" == typeof g.visible && (D = g.visible), "undefined" != typeof g.path && g.path instanceof TGOS.TGPolygon && (m = g.path), "undefined" !=
                typeof g.clickable && "boolean" == typeof g.clickable && (n = g.clickable), "undefined" != typeof g.fillColor && "string" == typeof g.fillColor && (s = g.fillColor), "undefined" != typeof g.fillOpacity && "number" == typeof g.fillOpacity && (p = g.fillOpacity), "undefined" != typeof g.strokeWeight && "number" == typeof g.strokeWeight && (v = g.strokeWeight), "undefined" != typeof g.strokeOpacity && "number" == typeof g.strokeOpacity && (x = g.strokeOpacity), "undefined" != typeof g.zIndex && "number" == typeof g.zIndex && (B = g.zIndex), "undefined" != typeof g.strokeColor &&
                "string" == typeof g.strokeColor && (q = g.strokeColor), "undefined" != typeof g.strokeDasharray && "string" == typeof g.strokeDasharray && (A = g.strokeDasharray), "undefined" != typeof g.draggable && "boolean" == typeof g.draggable && this.setDraggable(g.draggable));
            this.init()
        };
    TGOS.extend(TGOS.Graphic, TGOS.TGFill);
    TGOS.RegisterEvent(TGOS.TGFill, "zindex_changed click mousedown mouseup mousemove mouseout mouseover dblclick rightclick".split(" "))
})();
(function() {
    function a(a) {
        a.cancelBubble = !0;
        a.stopPropagation && a.stopPropagation()
    }
    var d = function(a, d) {
        var e;
        switch (a) {
            case TGOS.TGCoordSys.EPSG3857:
                e = TGOS.WGS84ToGoo(d.x, d.y);
                break;
            case TGOS.TGCoordSys.EPSG3826:
                e = d;
                break;
            case TGOS.TGCoordSys.EPSG3825:
                e = d
        }
        return e
    };
    TGOS.TGLine = function(b, f, e) {
        var g = new TGOS.TGPoint(0, 0),
            k = b,
            l = f,
            h = !0,
            m = !0,
            n = "#000000",
            p = "none",
            s, q = 1,
            v = new TGOS.TGEnvelope(0, 0, 0, 0),
            x = 1,
            A = 0,
            B = 0,
            D = 0,
            y = this;
        this.getBounds = function() {
            this.calEnv();
            return v
        };
        this.markMove = function(b) {
            a(b);
            var d = k.getMapBase(),
                e = d.getPackageOffset(),
                f;
            switch (k.getCoordSys()) {
                case TGOS.TGCoordSys.EPSG3857:
                    f = d.ToMapPoint(b.clientX - e.x, b.clientY - e.y);
                    f = TGOS.GooToWGS84(f.x, f.y);
                    f = new TGOS.TGPoint(f.x, f.y);
                    break;
                case TGOS.TGCoordSys.EPSG3826:
                    f = d.ToMapPoint(b.clientX - e.x, b.clientY - e.y);
                    break;
                case TGOS.TGCoordSys.EPSG3825:
                    f = d.ToMapPoint(b.clientX - e.x, b.clientY - e.y)
            }
            b = l.Envelope;
            l.transform(1, 0, 0, 1, f.x - y.spos.x - (b.left - y.senv.left), f.y - y.spos.y - (b.top - y.senv.top));
            y.update()
        };
        this.endDrag = function(b) {
            a(b);
            DetachEvent(document.body, "mousemove", y.markMove, !0);
            DetachEvent(document.body, "mouseup", y.endDrag, !0)
        };
        this.markDrag = function(b) {
            a(b);
            var d = k.getMapBase(),
                e = d.getPackageOffset(),
                f;
            switch (k.getCoordSys()) {
                case TGOS.TGCoordSys.EPSG3857:
                    b = d.ToMapPoint(b.clientX - e.x, b.clientY - e.y);
                    b = TGOS.GooToWGS84(b.x, b.y);
                    f = new TGOS.TGPoint(b.x, b.y);
                    break;
                case TGOS.TGCoordSys.EPSG3826:
                    f = d.ToMapPoint(b.clientX - e.x, b.clientY - e.y);
                    break;
                case TGOS.TGCoordSys.EPSG3825:
                    f = d.ToMapPoint(b.clientX - e.x, b.clientY - e.y)
            }
            y.spos =
                f;
            b = l.Envelope;
            y.senv = new TGOS.TGEnvelope(b.left, b.top, b.right, b.bottom);
            AttachEvent(document.body, "mousemove", y.markMove, !0);
            AttachEvent(document.body, "mouseup", y.endDrag, !0)
        };
        this.getDraggable = function() {
            return this.draggable
        };
        this.setDraggable = function(a) {
            this.draggable = a;
            z && (a && z ? z.mousedown(this.markDrag) : z.unmousedown(this.markDrag))
        };
        this.getEventElement = function() {
            return z
        };
        this.calEnv = function() {
            for (var a = l.getPath(), b = Infinity, d = -Infinity, e = -Infinity, f = Infinity, g = 0; g < a.length; g++) b = Math.min(b,
                a[g].x), f = Math.min(f, a[g].y), d = Math.max(d, a[g].x), e = Math.max(e, a[g].y);
            v.left = b;
            v.right = d;
            v.top = e;
            v.bottom = f;
            return new TGOS.TGEnvelope(b, e, d, e)
        };
        this.getMap = function() {
            return k
        };
        this.setMap = function(a) {
            z && z.remove();
            if (null == a) {
                if (!k) return;
                k.overlay.containing(this) && k.overlay.remove(this);
                TGOS.TGEvent.clearInstanceListeners(this);
                k = null
            }
            a instanceof TGOS.TGOnlineMap && (k = a, k.overlay.add(this))
        };
        this.getPath = function() {
            return l
        };
        this.setPath = function(a) {
            a instanceof TGOS.TGLineString && (l = a, this.redraw())
        };
        this.getVisible = function() {
            return h
        };
        this.setVisible = function(a) {
            switch (a) {
                case !0:
                    h = !0;
                    this.update();
                    this.redraw();
                    break;
                case !1:
                    h = !1, this.update(), this.redraw()
            }
        };
        this.getClickable = function() {
            return m
        };
        this.setClickable = function(a) {
            "boolean" === typeof a && ((m = a) ? TGOS.TGEvent.releaseEventLock(this, "click") : TGOS.TGEvent.lockEvent(this, "click"), TGOS.TGEvent.trigger(this, "clickable_changed"))
        };
        this.getStrokeColor = function() {
            return n
        };
        this.setStrokeColor = function(a) {
            n = a;
            z && z.attr({
                stroke: n
            })
        };
        this.getStrokeOpacity =
            function() {
                return q
            };
        this.setStrokeOpacity = function(a) {
            q = a;
            z && z.attr({
                "stroke-opacity": q
            })
        };
        this.getStrokeWeight = function() {
            return x
        };
        this.setStrokeWeight = function(a) {
            x = a;
            z && z.attr({
                "stroke-width": x
            })
        };
        this.getZIndex = function() {
            return A
        };
        this.setZIndex = function(a, b) {
            "number" === typeof a && z && (A = parseFloat(a), k.overlay.updateArrayOrder(this), k.overlay.updateElementOrder(this), TGOS.TGEvent.trigger(this, "zindex_changed"))
        };
        this.redraw = function() {
            if (l)
                if (h) {
                    var a = k.getMapBase(),
                        a = a.FromMapPoint(100, 100);
                    if (a.x || a.y) {
                        var b = l.getBounds(),
                            e, a = k.getMapBase(),
                            f = l instanceof TGOS.TGMultiLineString ? l.getArray()[0].getPath() : l.getPath(),
                            m = a.FromMapPoint(f[0]);
                        Math.abs(m.x - g.x);
                        Math.abs(m.y - g.y);
                        g.x = m.x;
                        g.y = m.y;
                        a.FromMapPoint(b.left, b.top);
                        a.FromMapPoint(b.right, b.right);
                        a.getClientWidth();
                        a.getClientHeight();
                        var s = k.getMapSize().width,
                            v = k.getMapSize().height,
                            w, m = k.getCoordSys();
                        m == TGOS.TGCoordSys.EPSG3857 ? (w = TGOS.WGS84ToGoo(b.left, b.top), b = TGOS.WGS84ToGoo(b.right, b.bottom), w = a.FromMapPoint(w.x, w.y), b = a.FromMapPoint(b.x,
                            b.y)) : (w = a.FromMapPoint(b.left, b.top), b = a.FromMapPoint(b.right, b.bottom));
                        if (util.intersectRect({
                                left: w.x,
                                top: w.y,
                                right: b.x,
                                bottom: b.y
                            }, {
                                left: 0,
                                top: 0,
                                right: s,
                                bottom: v
                            })) {
                            z.show();
                            e = d(m, f[0]);
                            w = a.FromMapPoint(e.x, e.y);
                            B = w.x;
                            D = w.y;
                            s = l instanceof TGOS.TGMultiLineString ? l.getArray() : [l];
                            v = "";
                            for (b = 0; b < s.length; b++)
                                for (f = s[b].getPath(), w = d(m, f[0]), w = a.FromMapPoint(w.x, w.y), v = v + "M" + w.x + "," + w.y, w = 1; w < f.length; w++) {
                                    e = f[w];
                                    var y;
                                    0 < w && (y = f[w - 1]);
                                    e = d(m, e);
                                    e = a.FromMapPoint(e.x, e.y);
                                    if (y) var A = d(m, y),
                                        A = a.FromMapPoint(A.x,
                                            A.y),
                                        v = v + "L" + (A.x + e.x) / 2 + "," + (A.y + e.y) / 2;
                                    v = v + "L" + e.x + "," + e.y
                                }
                            z.attr({
                                "stroke-opacity": q,
                                stroke: n,
                                "stroke-width": x,
                                "stroke-dasharray": p,
                                path: v
                            })
                        } else z.hide()
                    }
                } else z.hide()
        };
        this.update = function() {
            if (l)
                if (h) {
                    var a = k.getMapBase();
                    l.getBounds();
                    var a = k.getMapBase(),
                        b = (l instanceof TGOS.TGMultiLineString ? l.getArray()[0].getPath() : l.getPath())[0],
                        b = d(k.getCoordSys(), b),
                        a = a.FromMapPoint(b.x, b.y);
                    z.transform("t" + (a.x - B) + "," + (a.y - D))
                } else z.hide()
        };
        var z, w;
        this.init = function() {
            k.getMapBase().getHObject();
            w = k.getPaper();
            s && (this.marker = w.createMarker(icons));
            z = w.path();
            this.marker && (z.node.style.marker = "url(#" + this.marker + ")");
            k.overlay.add(this);
            this.bindEvents(z);
            this.redraw();
            this.update();
            this.setDraggable(this.draggable)
        };
        this.getMapBase = function() {
            if (k) return k.getMapBase()
        };
        this.getEventElement = function() {
            return null == k ? null : z
        };
        if (void 0 != e) {
            e.map instanceof TGOS.TGOnlineMap && this.setMap(e.map);
            if ("undefined" != typeof e.visible && "boolean" == typeof e.visible) switch (e.visible) {
                case !0:
                    h = !0;
                    break;
                case !1:
                    h = !1
            }
            "undefined" != typeof e.path && e.path instanceof TGOS.TGLineString && this.setPath(e.path);
            "undefined" != typeof e.clickable && "boolean" == typeof e.clickable && (m = e.clickable);
            "undefined" != typeof e.strokeWeight && "number" == typeof e.strokeWeight && (x = e.strokeWeight);
            "undefined" != typeof e.strokeOpacity && "number" == typeof e.strokeOpacity && (q = e.strokeOpacity);
            "undefined" != typeof e.zIndex && "number" == typeof e.zIndex && (A = e.zIndex);
            "undefined" != typeof e.strokeColor && "string" == typeof e.strokeColor && (n = e.strokeColor);
            "undefined" != typeof e.strokeDasharray && "string" == typeof e.strokeDasharray && (p = e.strokeDasharray);
            "undefined" != typeof e.draggable && "boolean" == typeof e.draggable && this.setDraggable(e.draggable);
            e && e.icons && (s = e.icons)
        }
        this.init()
    };
    TGOS.extend(TGOS.Graphic, TGOS.TGLine);
    TGOS.RegisterEvent(TGOS.TGLine, "click mousedown mouseup mousemove mouseout mouseover dblclick zindex_changed".split(" "))
})();
(function() {
    TGOS.TGGroundOverlay = function(a, d, b, f) {
        var e = null,
            g = 1,
            k = null,
            l = null,
            h = new TGOS.TGEnvelope(0, 0, 0, 0),
            m, n, p = 0,
            s = !0,
            q;
        this.getMap = function() {
            return e
        };
        this.getEventElement = function() {
            return n
        };
        this.setMap = function(a) {
            n && n.remove();
            if (null == a) e && (e.overlay.containing(this) && e.overlay.remove(this), TGOS.TGEvent.clearInstanceListeners(this), e = null);
            else if (a instanceof TGOS.TGOnlineMap && !a.overlay.containing(this)) {
                e = a;
                q = e.getCoordSys();
                switch (q) {
                    case TGOS.TGCoordSys.EPSG3857:
                        a = TGOS.WGS84ToGoo(l.left,
                            l.top);
                        var b = TGOS.WGS84ToGoo(l.right, l.bottom);
                        h.left = a.x;
                        h.top = a.y;
                        h.right = b.x;
                        h.bottom = b.y;
                        break;
                    case TGOS.TGCoordSys.EPSG3826:
                        h = l;
                        break;
                    case TGOS.TGCoordSys.EPSG3825:
                        h = l
                }
                m = e.getPaper();
                n = m.image(k.getUrl(), 10, 10, 80, 80);
                n.attr({
                    opacity: g
                });
                e.overlay.add(this);
                this.bindEvents(n);
                this.redraw();
                this.update()
            }
        };
        this.getClickable = function() {
            return s
        };
        this.setClickable = function(a) {
            "boolean" === typeof a && ((s = a) ? TGOS.TGEvent.releaseEventLock(this, "click") : TGOS.TGEvent.lockEvent(this, "click"), TGOS.TGEvent.trigger(this,
                "clickable_changed"))
        };
        this.getOpacity = function() {
            return g
        };
        this.setZIndex = function(a) {
            "number" === typeof a && n && (p = parseFloat(a), e.overlay.updateArrayOrder(this), e.overlay.updateElementOrder(this), TGOS.TGEvent.trigger(this, "zindex_changed"))
        };
        this.getMapBase = function() {
            if (e) return e.getMapBase()
        };
        this.getZIndex = function() {
            return p
        };
        this.setOpacity = function(a) {
            "number" == typeof a && 1 > a && 0 <= a && (g = a, n && n.attr({
                opacity: a
            }), this.redraw(), this.update())
        };
        this.getImage = function() {
            return k
        };
        this.setImage = function(a) {
            a instanceof
            TGOS.TGImage && (k = a, n && (n.attr({
                src: k.getUrl()
            }), this.redraw(), this.update()))
        };
        this.getBounds = function() {
            return l
        };
        this.setBounds = function(a) {
            if (a instanceof TGOS.TGEnvelope) {
                l = a;
                if (e) switch (q) {
                    case TGOS.TGCoordSys.EPSG3857:
                        a = TGOS.WGS84ToGoo(l.left, l.top);
                        var b = TGOS.WGS84ToGoo(l.right, l.bottom);
                        h.left = a.x;
                        h.top = a.y;
                        h.right = b.x;
                        h.bottom = b.y;
                        break;
                    case TGOS.TGCoordSys.EPSG3826:
                        h = l;
                        break;
                    case TGOS.TGCoordSys.EPSG3825:
                        h = l
                }
                this.redraw();
                this.update()
            }
        };
        this.redraw = function() {
            if (e) {
                var a = e.getMapBase().FromMapPoint(100,
                    100);
                if (a.x || a.y) {
                    e.getMapBase().FromMapPoint(h.left, h.top);
                    var a = Math.abs(e.getMapBase().FromMapDistX(Math.abs(h.right - h.left))),
                        b = Math.abs(e.getMapBase().FromMapDistY(Math.abs(h.bottom - h.top)));
                    n.attr({
                        width: a,
                        height: b
                    })
                }
            }
        };
        this.update = function() {
            if (e) {
                var a = e.getMapBase().FromMapPoint(h.left, h.top);
                n.attr({
                    x: a.x,
                    y: a.y
                })
            }
        };
        this.setImage(d);
        this.setBounds(b);
        this.setMap(a);
        this.setZIndex(p);
        this.setOpacity(f);
        this.redraw()
    };
    TGOS.extend(TGOS.Graphic, TGOS.TGGroundOverlay);
    TGOS.RegisterEvent(TGOS.TGGroundOverlay,
        "zindex_changed click dblclick rightclick mousemove mousedown mouseup mouseover mouseout".split(" "))
})();
TGOS.TGGeometry = function() {};
TGOS.Geometry = TGOS.TGGeometry;
TGOS.TGGeometry.prototype.srs = null;
TGOS.TGGeometry.prototype.lon = NaN;
TGOS.TGGeometry.prototype.lat = NaN;
TGOS.TGGeometry.prototype.getType = function() {
    return this.type
};
TGOS.TGGeometry.Transform = function(a, d) {
    if (a && d) {
        if (a instanceof TGOS.TGPoint) {
            var b = d(a.x, a.y);
            return new TGOS.TGPoint(b.x, b.y)
        }
        if (a instanceof TGOS.TGLineString) {
            for (var f = [], e = 0; e < a.path.length; e++) b = a.path[e], b = d(b.x, b.y), f.push(new TGOS.TGPoint(b.x, b.y));
            return new TGOS.TGLineString(f)
        }
        if (a instanceof TGOS.TGLinearRing) return e = TGOS.TGGeometry.Transform(a.linestring, d), new TGOS.TGLinearRing(e);
        if (a instanceof TGOS.TGEnvelope) return e = new TGOS.TGPoint(a.left, a.top), f = new TGOS.TGPoint(a.right,
            a.bottom), e = TGOS.TGGeometry.Transform(e, d), f = TGOS.TGGeometry.Transform(f, d), new TGOS.TGEnvelope(e.x, e.y, f.x, f.y);
        if (a instanceof TGOS.TGCircle) return e = new TGOS.TGCircle, b = a.getCenter(), f = a.getRadius(), b = TGOS.TGGeometry.Transform(b, d), e.setCenter(b), e.setRadius(f), e;
        if (a instanceof TGOS.TGPolygon) {
            b = [];
            for (e = 0; e < a.rings_.length; e++) f = a.rings_[e], f = TGOS.TGGeometry.Transform(f, d), b.push(f);
            return new TGOS.TGPolygon(b)
        }
    }
};
TGOS.TGPoint = function(a, d, b) {
    this.srs = b ? b : null;
    this.srs == TGOS.TGCoordSys.EPSG3857 && (this.lon = parseFloat(a), this.lat = parseFloat(d));
    this.Envelope = null;
    this.x = parseFloat(a);
    this.y = parseFloat(d)
};
TGOS.extend(TGOS.TGGeometry, TGOS.TGPoint);
TGOS.TGPoint.prototype.transform = function(a, d, b, f, e, g) {
    this.x = this.x * a + this.y * b + e;
    this.y = this.x * d + this.y * f + g
};
TGOS.TGPoint.prototype.isEmpty = function() {
    return IsNumeric(this.x) || IsNumeric(this.y) ? !0 : !1
};
TGOS.TGPoint.prototype.setEmpty = function() {
    this.y = this.x = null
};
TGOS.TGPoint.prototype.isSimple = function() {
    return !0
};
TGOS.TGPoint.prototype.getBounds = function() {
    return new TGOS.TGEnvelope(this.x, this.y, this.x, this.y)
};
TGOS.TGPoint.prototype.type = "TGPoint";
TGOS.TGPoint.prototype.toGeoJson = function() {
    return {
        type: "Point",
        coordinates: [this.x, this.y]
    }
};
TGOS.TGSize = function(a, d) {
    this.width = parseFloat(a);
    this.height = parseFloat(d)
};
TGOS.TGEnvelope = function(a, d, b, f) {
    this.left = parseFloat(a);
    this.right = parseFloat(b);
    this.top = parseFloat(d);
    this.bottom = parseFloat(f);
    this.renderer = null
};
TGOS.extend(TGOS.TGGeometry, TGOS.TGEnvelope);
TGOS.TGEnvelope.prototype.type = "TGEnvelope";
TGOS.TGEnvelope.prototype.Extend = function(a) {
    a.constructor == TGOS.TGEnvelope && (!a.left || null != this.left && this.left > a.left != this.right > this.left || (this.left = a.left), !a.top || null != this.top && this.top < a.top != this.bottom < this.top || (this.top = a.top), !a.right || null != this.right && this.right < a.right != this.left < this.right || (this.right = a.right), !a.bottom || null != this.bottom && this.bottom > a.bottom != this.top > this.bottom || (this.bottom = pEnv.bottom))
};
TGOS.TGEnvelope.prototype.Shrink = function(a) {
    a.constructor == TGOS.TGEnvelope && (!a.left || null != this.left && this.left < a.left != this.right > this.left || (this.left = a.left), !a.top || null != this.top && this.top > a.top != this.bottom < this.top || (this.top = a.top), !a.right || null != this.right && this.right > a.right != this.left < this.right || (this.right = a.right), !a.bottom || null != this.bottom && this.bottom < a.bottom != this.top > this.bottom || (this.bottom = a.bottom))
};
TGOS.TGEnvelope.prototype.toString = function() {
    return Math.min(this.left, this.right) + " " + Math.min(this.top, this.bottom) + "," + Math.max(this.left, this.right) + " " + Math.max(this.top, this.bottom)
};
TGOS.TGEnvelope.prototype.transform = function(a, d, b, f, e, g) {
    var k = new TGOS.TGPoint(this.left, this.top),
        l = new TGOS.TGPoint(this.right, this.bottom);
    k.transform(a, d, b, f, e, g);
    l.transform(a, d, b, f, e, g);
    this.left = k.x;
    this.top = k.y;
    this.right = l.x;
    this.bottom = l.y;
    this.renderer && this.renderer.redraw()
};
TGOS.TGEnvelope.prototype.isEmpty = function() {
    var a = IsNumeric(this.left),
        d = IsNumeric(this.top),
        b = IsNumeric(this.right),
        f = IsNumeric(this.bottom);
    return !0 == a && !0 == d && !0 == b && !0 == f ? !0 : !1
};
TGOS.TGEnvelope.prototype.setEmpty = function() {
    this.bottom = this.right = this.top = this.left = null
};
TGOS.TGEnvelope.prototype.getLeft = function() {
    return this.left
};
TGOS.TGEnvelope.prototype.getTop = function() {
    return this.top
};
TGOS.TGEnvelope.prototype.getRight = function() {
    return this.right
};
TGOS.TGEnvelope.prototype.getBottom = function() {
    return this.bottom
};
TGOS.TGEnvelope.prototype.setLeft = function(a) {
    this.left = a
};
TGOS.TGEnvelope.prototype.setTop = function(a) {
    this.top = a
};
TGOS.TGEnvelope.prototype.setRight = function(a) {
    this.right = a
};
TGOS.TGEnvelope.prototype.setBottom = function(a) {
    this.bottom = a
};
TGOS.TGEnvelope.prototype.getWidth = function() {
    return Math.abs(this.left - this.right)
};
TGOS.TGEnvelope.prototype.getHeight = function() {
    return Math.abs(this.top - this.bottom)
};
TGOS.TGEnvelope.prototype.getBounds = function() {
    return this
};
TGOS.TGEnvelope.prototype.contains = function(a) {
    return a.x >= this.left && a.x <= this.right && a.y >= this.bottom && a.y <= this.top
};
TGOS.TGLineString = function(a) {
    this.path = a;
    this.renderer = null;
    this.Envelope = new TGOS.TGEnvelope(0, 0, 0, 0);
    this.updateEnvelope()
};
TGOS.extend(TGOS.TGGeometry, TGOS.TGLineString);
TGOS.TGLineString.prototype.type = "TGLineString";
TGOS.TGLineString.prototype.getPath = function() {
    return this.path
};
TGOS.TGLineString.prototype.setPath = function(a) {
    this.path = a;
    this.updateEnvelope();
    this.renderer && this.renderer.redraw()
};
TGOS.TGLineString.prototype.isEmpty = function() {};
TGOS.TGLineString.prototype.setEmpty = function() {};
TGOS.TGLineString.prototype.getLength = function() {
    for (var a = 0, d = 0, b = d = 0, f = 0; f < this.path.length - 1; f++) d = this.path[f].x - this.path[f + 1].x, b = this.path[f].y - this.path[f + 1].y, d = Math.sqrt(d * d + b * b), a += d;
    return a
};
TGOS.TGLineString.prototype.startPoint = function() {
    return this.path[0]
};
TGOS.TGLineString.prototype.endPoint = function() {
    return this.path[this.path.length - 1]
};
TGOS.TGLineString.prototype.isSimple = function() {};
TGOS.TGLineString.prototype.transform = function(a, d, b, f, e, g) {
    for (var k = 0; k < this.path.length; k++) this.path[k].transform(a, d, b, f, e, g);
    this.updateEnvelope();
    this.renderer && this.renderer.redraw()
};
TGOS.TGLineString.prototype.value = function(a) {
    return this.path[a]
};
TGOS.TGLineString.prototype.getBounds = function() {
    return this.Envelope
};
TGOS.TGLineString.prototype.isClosed = function() {
    return this.path[0].x == this.path[this.path.length - 1].x && this.path[0].y == this.path[this.path.length - 1].y ? !0 : !1
};
TGOS.TGLineString.prototype.getEnvelope = function() {
    return this.Envelope
};
TGOS.TGLineString.prototype.updateEnvelope = function() {
    for (var a = this.path, d = Infinity, b = -Infinity, f = -Infinity, e = Infinity, g = 0; g < a.length; g++) d = Math.min(d, a[g].x), e = Math.min(e, a[g].y), b = Math.max(b, a[g].x), f = Math.max(f, a[g].y);
    this.Envelope.setLeft(d);
    this.Envelope.setRight(b);
    this.Envelope.setTop(f);
    this.Envelope.setBottom(e)
};
TGOS.TGLineString.prototype.toGeoJson = function() {
    for (var a = [], d = 0; d < this.path.length; d++) a.push([this.path[d].x, this.path[d].y]);
    return {
        type: "LineString",
        coordinates: a
    }
};
TGOS.TGLinearRing = function(a) {
    this.linestring = a;
    this.renderer = null
};
TGOS.extend(TGOS.TGGeometry, TGOS.TGLinearRing);
TGOS.TGLinearRing.prototype.getPath = function() {
    return this.linestring
};
TGOS.TGLinearRing.prototype.setPath = function(a) {
    this.linestring = a;
    this.renderer && this.renderer.redraw()
};
TGOS.TGLinearRing.prototype.type = "TGLinearRing";
TGOS.TGPolygon = function(a) {
    this.rings_ = a;
    this.empty_ = !0;
    this.extIdx = 0;
    this.ext_ = a[this.extIdx];
    this.renderer = a.renderer;
    this.Envelope = new TGOS.TGEnvelope(0, 0, 0, 0);
    this.updateEnvelope()
};
TGOS.extend(TGOS.TGGeometry, TGOS.TGPolygon);
TGOS.TGPolygon.prototype.type = "TGPolygon";
TGOS.TGPolygon.prototype.getEnvelope = function() {
    return this.Envelope
};
TGOS.TGPolygon.prototype.isEmpty = function() {
    return !0
};
TGOS.TGPolygon.prototype.setEmpty = function() {
    this.empty_ = !0
};
TGOS.TGPolygon.prototype.getBounds = function() {
    return this.Envelope
};
TGOS.TGPolygon.prototype.getArea = function() {
    for (var a = 0, d = this.rings_[this.extIdx].getPath().getPath(), b = d.length, f = d[b - 1], e = 0; e < b; e++) var g = d[e],
        a = a + (g.x * f.y - f.x * g.y),
        f = g;
    return Math.abs(0.5 * a)
};
TGOS.TGPolygon.prototype.isSimple = function() {};
TGOS.TGPolygon.prototype.updateEnvelope = function() {
    for (var a = Infinity, d = -Infinity, b = -Infinity, f = Infinity, e = 0; e < this.rings_.length; e++)
        for (var g = this.rings_[e].getPath().getPath(), k = 0; k < g.length; k++) a = Math.min(a, g[k].x), f = Math.min(f, g[k].y), d = Math.max(d, g[k].x), b = Math.max(b, g[k].y);
    this.Envelope.left = a;
    this.Envelope.right = d;
    this.Envelope.top = b;
    this.Envelope.bottom = f
};
TGOS.TGPolygon.prototype.transform = function(a, d, b, f, e, g) {
    for (var k = 0; k < this.rings_.length; k++) this.rings_[k].getPath().transform(a, d, b, f, e, g);
    this.updateEnvelope();
    this.renderer && this.renderer.redraw()
};
TGOS.TGPolygon.prototype.setExterior = function(a) {
    this.extIdx = this.rings_[this.rings_.indexOf(a)];
    this.updateEnvelope();
    this.renderer && this.renderer.redraw()
};
TGOS.TGPolygon.prototype.setInterior = function(a, d) {
    this.rings_[a].setPath(d)
};
TGOS.TGPolygon.prototype.addInterior = function(a) {
    this.rings_.push(a);
    this.updateEnvelope();
    this.renderer && this.renderer.redraw()
};
TGOS.TGPolygon.prototype.removeInterior = function(a) {
    this.rings_.splice(a, 1);
    this.updateEnvelope();
    this.renderer && this.renderer.redraw()
};
TGOS.TGPolygon.prototype.removeAllInterior = function() {
    var a = this.rings_.length - this.extIdx + 1;
    this.rings_.splice(0, this.extIdx);
    this.rings_.splice(1, a);
    this.updateEnvelope();
    this.renderer && this.renderer.redraw()
};
TGOS.TGPolygon.prototype.getExteriorRing = function() {
    return this.rings_[this.extIdx]
};
TGOS.TGPolygon.prototype.getInteriorRings = function() {
    var a = this.rings_.slice(0, this.extIdx),
        d = this.rings_.slice(this.extIdx + 1, this.rings_.length - this.extIdx + 1);
    return a.concat(d)
};
TGOS.TGPolygon.prototype.getNumInteriorRing = function() {
    return path_.length - 1
};
TGOS.TGPolygon.prototype.type = "TGPolygon";
TGOS.TGPolygon.prototype.toGeoJson = function() {
    for (var a = [], d = 0; d < this.rings_.length; d++) {
        for (var b = [], f = this.rings_[d].getPath().getPath(), e = 0; e < f.length; e++) b.push([f[e].x, f[e].y]);
        a.push(b)
    }
    return {
        type: "Polygon",
        coordinates: a
    }
};
TGOS.TGCircle = function() {
    var a = new TGOS.TGPoint(0, 0),
        d = 0;
    this.renderer = null;
    this.getBounds = function(b) {
        if (b == TGOS.TGCoordSys.EPSG3857) {
            var f = TGOS.WGS84ToGoo(a.x, a.y);
            b = f.x + d;
            var e = f.y - d,
                f = TGOS.GooToWGS84(f.x - d, f.y + d);
            b = TGOS.GooToWGS84(b, e);
            return new TGOS.TGEnvelope(f.x, f.y, b.x, b.y)
        }
        return new TGOS.TGEnvelope(a.x - d, a.y + d, a.x + d, a.y - d)
    };
    this.setCenter = function(b) {
        b instanceof TGOS.TGPoint && (a = b, this.renderer && this.renderer.update())
    };
    this.getCenter = function() {
        return a
    };
    this.setRadius = function(a) {
        "number" ==
        typeof a && (d = a, this.renderer && this.renderer.redraw())
    };
    this.getRadius = function() {
        return d
    };
    this.transform = function(b, d, e, g, k, l) {
        a.transform(b, d, e, g, k, l);
        this.renderer && this.renderer.redraw()
    }
};
TGOS.extend(TGOS.TGGeometry, TGOS.TGCircle);
TGOS.TGCircle.prototype.type = "TGCircle";
TGOS.TGMultiGeometry = function() {};
TGOS.extend(TGOS.TGGeometry, TGOS.TGMultiGeometry);
TGOS.TGMultiGeometry.prototype.getArray = function() {
    return this.geoms
};
TGOS.TGMultiGeometry.prototype.getAt = function(a) {
    return this.geoms[a]
};
TGOS.TGMultiGeometry.prototype.getLength = function() {
    return this.geoms.length
};
TGOS.TGMultiGeometry.prototype.getBounds = function() {
    return this.Envelope
};
TGOS.TGMultiGeometry.prototype.transform = function(a, d, b, f, e, g) {
    for (var k = 0; k < this.geoms.length; k++) this.geoms[k].transform(a, d, b, f, e, g);
    this.updateEnvelope();
    this.renderer && this.renderer.redraw()
};
TGOS.TGMultiGeometry.prototype.updateEnvelope = function() {
    if (!this.geoms || !this.geoms.length) return null;
    for (var a = Infinity, d = -Infinity, b = -Infinity, f = Infinity, e = 0; e < this.geoms.length; e++) var g = this.geoms[e].getBounds(),
        a = Math.min(a, g.left),
        d = Math.max(d, g.top),
        b = Math.max(b, g.right),
        f = Math.min(f, g.bottom);
    this.Envelope = new TGOS.TGEnvelope(a, d, b, f)
};
TGOS.TGMultiPoint = function(a) {
    this.geoms = a;
    this.updateEnvelope()
};
TGOS.extend(TGOS.TGMultiGeometry, TGOS.TGMultiPoint);
TGOS.TGMultiPoint.prototype.type = "TGMultiPoint";
TGOS.TGMultiPoint.prototype.toGeoJson = function() {
    for (var a = [], d = 0; d < this.geoms.length; d++) {
        var b = this.geoms[d];
        a.push([b.x, b.y])
    }
    return {
        type: "MultiPoint",
        coordinates: a
    }
};
TGOS.TGMultiPolygon = function(a) {
    this.geoms = a;
    this.updateEnvelope()
};
TGOS.extend(TGOS.TGMultiGeometry, TGOS.TGMultiPolygon);
TGOS.TGMultiPolygon.prototype.type = "TGMultiPolygon";
TGOS.TGMultiPolygon.prototype.toGeoJson = function() {
    for (var a = [], d = 0; d < this.geoms.length; d++) {
        for (var b = this.geoms[d], f = [], e = 0; e < b.rings_.length; e++) {
            for (var g = [], k = b.rings_[e].getPath().getPath(), l = 0; l < k.length; l++) g.push([k[l].x, k[l].y]);
            f.push(g)
        }
        a.push(f)
    }
    return {
        type: "MultiPolygon",
        coordinates: a
    }
};
TGOS.TGMultiLineString = function(a) {
    this.geoms = a;
    this.updateEnvelope()
};
TGOS.extend(TGOS.TGMultiGeometry, TGOS.TGMultiLineString);
TGOS.TGMultiLineString.prototype.type = "TGMultiLineString";
TGOS.TGMultiLineString.prototype.toGeoJson = function() {
    for (var a = [], d = 0; d < this.geoms.length; d++) {
        for (var b = this.geoms[d], f = [], e = 0; e < b.path.length; e++) {
            var g = b.path[e];
            f.push([g.x, g.y])
        }
        a.push(f)
    }
    return {
        type: "MultiLineString",
        coordinates: a
    }
};
TGOS.TGGeometryCollection = function(a) {
    this.geoms = a;
    this.updateEnvelope()
};
TGOS.extend(TGOS.TGMultiGeometry, TGOS.TGGeometryCollection);
TGOS.TGGeometryCollection.prototype.type = "TGGeometryCollection";
TGOS.TGGeometryCollection.prototype.toGeoJson = function() {
    for (var a = [], d = 0; d < this.geoms.length; d++) a.push(this.geoms[d].toGeoJson());
    return {
        type: "GeometryCollection",
        geometries: a
    }
};
TGOS.TGLabel = function(a) {
    var d = "",
        b = 12,
        f = "",
        e = "#000000",
        g = 1,
        k = "",
        l, h, m, n, p, s, q;
    this.getEventElement = function() {
        return q
    };
    this.update = function() {
        if (p) {
            switch (p.getCoordSys()) {
                case TGOS.TGCoordSys.EPSG3857:
                    s.FromMapPoint(l.x, l.y);
                    var a = TGOS.WGS84ToGoo(l.x, l.y),
                        b = s.FromMapPoint(a.x, a.y);
                    break;
                case TGOS.TGCoordSys.EPSG3826:
                    b = s.FromMapPoint(l.x, l.y);
                    break;
                case TGOS.TGCoordSys.EPSG3825:
                    b = s.FromMapPoint(l.x, l.y)
            }
            a = b.x;
            b = b.y;
            this.offset && (a += this.offset.x, b += this.offset.y);
            q.transform("t" + a + "," + b)
        }
    };
    this.setVisible =
        function(a) {
            q && (!0 == a ? q.show() : !1 == a && q.hide());
            n = a;
            TGOS.TGEvent.trigger(this, "visible_changed")
        };
    this.getVisible = function() {
        return n
    };
    this.setZIndex = function(a, b) {
        void 0 != a && q && (m = a, p.overlay.updateArrayOrder(this), p.overlay.updateElementOrder(this), TGOS.TGEvent.trigger(this, "zindex_changed"))
    };
    this.getZIndex = function() {
        return m
    };
    this.setFont = function(a) {
        d = a;
        q && q.attr({
            "font-family": d
        })
    };
    this.getFont = function() {
        return d
    };
    this.setFontSize = function(a) {
        b = a;
        q && q.attr({
            "font-size": b
        })
    };
    this.getFontSize =
        function() {
            return b
        };
    this.setSize = function(a) {
        size_ = a
    };
    this.getSize = function() {
        return size_
    };
    this.setFontColor = function(a) {
        e = a;
        q && q.attr({
            fill: e
        })
    };
    this.getFontColor = function() {
        return e
    };
    this.setOpacity = function(a) {
        g = a;
        q && q.attr({
            opacity: g
        })
    };
    this.getOpacity = function() {
        return g
    };
    this.setBackgroundColor = function(a) {
        k = a
    };
    this.getBackgroundColor = function() {
        return k
    };
    this.setPosition = function(a) {
        l = a;
        TGOS.TGEvent.trigger(this, "position_changed")
    };
    this.getPosition = function() {
        return l
    };
    this.setLabel = function(a) {
        h =
            a;
        q && q.attr({
            opacity: h
        });
        TGOS.TGEvent.trigger(this, "label_changed")
    };
    this.getLabel = function() {
        return h
    };
    this.setFontWeight = function(a) {
        f = a;
        q && q.attr({
            "font-weight": f
        })
    };
    this.getFontWeight = function() {
        return f
    };
    this.destroy = function() {
        p && (p.overlay.remove(this), q && q.remove())
    };
    this.offset = null;
    this.setOffset = function(a) {
        a instanceof TGOS.TGPoint && (this.offset = a, this.update())
    };
    this.setMap = function(a) {
        this.destroy();
        null == a && p ? (p = null, TGOS.TGEvent.clearInstanceListeners(this)) : a instanceof TGOS.TGOnlineMap &&
            (p = a, paper = p.getPaper(), q = paper.text(0, 0, h), p.overlay.add(this), this.bindEvents(q), s = p.getMapBase(), q.attr({
                "font-family": d,
                fill: e,
                "font-weight": f,
                "font-size": b,
                text: h,
                opacity: g
            }), this.update())
    };
    this.getMap = function() {
        return p
    };
    this.getMapBase = function() {
        return s
    };
    this.setOptions = function(a) {
        void 0 !== a.zIndex && this.setZIndex(a.zIndex);
        a.font && this.setFont(a.font);
        a.fontColor && this.setFontColor(a.fontColor);
        a.fontWeight && this.setFontWeight(a.fontWeight);
        a.fontSize && this.setFontSize(a.fontSize);
        a.label &&
            this.setLabel(a.label);
        a.backgroundColor && this.setBackgroundColor(a.backgroundColor);
        void 0 !== a.opacity && this.setOpacity(a.opacity);
        a.position && this.setPosition(a.position);
        a.map && this.setMap(a.map);
        this.update()
    };
    this.setOptions(a)
};
TGOS.extend(TGOS.Graphic, TGOS.TGLabel);
TGOS.RegisterEvent(TGOS.TGLabel, "zindex_changed click dblclick rightclick mousemove mousedown mouseup mouseover mouseout".split(" "));
TGOS.TGInfoWindow = function(a, d, b, id=null) {
    var f = "",
        e, g, k, h = this,
        m, n;
    e = document.createElement("div");
    g = document.createElement("div");
    k = document.createElement("div");
    e.className = "info-window"
    k.className = "info-close"
    k.style.backgroundImage = 'url("' + TGOS.RES_PATH + 'Sample/Close.png")';
    this.onCloseClick = function(a) {
        h.close()
    };
    AttachEvent(k, "click", this.onCloseClick);
    e.appendChild(g);
    var p = {
        position: d || new TGOS.TGPoint(0,
            0),
        pixelOffset: new TGOS.TGSize(0, 0),
        zIndex: 1E6,
        disableAutoPan: !0
    };

    this.movable = true;

    this.getElement = function() {
        return e
    };
    this.open = function(a) {
        a.infoWindowLayer.containing(this) ? this.update() : (a.getHPack().appendChild(e), e.appendChild(k), a.infoWindowLayer.add(this), m = a, n = m.getMapBase(), e.style.zIndex = p.zIndex, g.innerHTML = '<div class="info-description">' + f + "</div>", this.update(), this.panToCenter())
    };
    this.after_close = function(){ };
    this.close = function(fn=null) {
        m && m.infoWindowLayer.containing(this) && (m.infoWindowLayer.remove(this), k.style.display = "none") && h.after_close()
    };
    this.setContent = function(a) {
        "string" == typeof a ? f = a : a instanceof HTMLElement && g.appendChild(a);
        f = a;
        g.innerHTML = '<div class="info-description">' + f + "</div>";
        TGOS.TGEvent.trigger(this,
            "content_changed")
    };
    this.setPosition = function(a) {
        a instanceof TGOS.TGPoint && (a.x !== p.position.x || a.y !== p.position.y) && (p.position = a, this.update(), TGOS.TGEvent.trigger(this, "position_changed"))
    };
    this.getPosition = function() {
        return p.position
    };
    this.getContentPane = function() {
        return g
    };
    this.setMaxWidth = function(a) {
        p.maxWidth = a;
    };
    this.setZIndex = function(a) {
        a !== p.zIndex && (p.zIndex = a, e.style.zIndex =
            a, this.update(), TGOS.TGEvent.trigger(this, "zindex_changed"))
    };
    this.getZIndex = function() {
        return p.zIndex
    };
    this.setPixelOffset = function(a) {
        p.pixelOffset = a;
        this.update()
    };
    this.disableAutoPan = function(a) {
        "boolean" == typeof a && (p.disableAutoPan = a)
    };
    this.putOpacity = function(a) {
        e.style.opacity = a;
        k.style.opacity = a;
        e.style.filter = "alpha(opacity=" + 100 * a + ")";
        k.style.filter = "alpha(opacity=" + 100 * a + ")"
    };
    this.panToCenter = function() {
        if (!1 == p.disableAutoPan && n && m) {
            var a = n.FromMapPoint(p.position.x, p.position.y),
                b = parseInt(a.x) - e.offsetWidth / 2,
                a = parseInt(a.y) - e.offsetHeight / 2;
            n.ToMapPoint(b, a);
            m.setCenter(p.position)
        }
    };
    this.setMessageText = function(a) {
        this.setContent(a)
    };
    this.setOptions = function(a) {
        void 0 != a && ("boolean" == typeof a.disableAutoPan && this.disableAutoPan(a.disableAutoPan), a.position instanceof TGOS.TGPoint && this.setPosition(a.position), "number" == typeof a.maxWidth && this.setMaxWidth(a.maxWidth), a.pixelOffset instanceof TGOS.TGSize && this.setPixelOffset(a.pixelOffset), "number" == typeof a.zIndex && this.setZIndex(a.zIndex), "string" == typeof a.messageText && this.setMessageText(a.messageText), "number" == typeof a.opacity && this.putOpacity(a.opacity), this.update())
    };
    this.update = function() {
        if ("undefined" != typeof n && m) {
            switch (m.getCoordSys()) {
                case TGOS.TGCoordSys.EPSG3857:
                    var a = TGOS.WGS84ToGoo(p.position.x, p.position.y),
                        a = n.FromMapPoint(a.x, a.y);
                    break;
                case TGOS.TGCoordSys.EPSG3826:
                    a = n.FromMapPoint(p.position.x, p.position.y);
                    break;
                case TGOS.TGCoordSys.EPSG3825:
                    a = n.FromMapPoint(p.position.x, p.position.y)
            }
            if( h.movable ){
                e.style.left = parseInt(a.x) + p.pixelOffset.width + "px";
                e.style.top = parseInt(a.y) - 19 - parseInt(e.offsetHeight) + p.pixelOffset.height + "px";
                // k.style.left = parseInt(a.x) + e.clientWidth + p.pixelOffset.width - 20 + "px";
                // k.style.top = parseInt(e.style.top) + 5 + "px"
            }
        }
    };

    this.setContent(a);
    this.setOptions({
        position: d
    });
    this.setOptions(b);
    console.log(this);
};
TGOS.RegisterEvent(TGOS.TGLabel, ["closeclick", "content_changed", "position_changed", "zindex_changed", "domready"]);
TGOS.TGImage = function(a, d, b, f, e) {
    var g = "";
    this.size = d instanceof TGOS.TGSize ? d : new TGOS.TGSize(32, 32);
    this.scaledSize = e instanceof TGOS.TGPoint ? e : new TGOS.TGSize(32, 32);
    this.anchor = f instanceof TGOS.TGPoint ? f : new TGOS.TGPoint(this.size.width / 2 - 1, this.size.height - 1);
    this.origin = b instanceof TGOS.TGPoint ? b : new TGOS.TGPoint(0, 0);
    this.setUrl = function(a) {
        "string" == typeof a && (g = a)
    };
    this.getUrl = function() {
        return g
    };
    this.setUrl(a)
};
TGOS.extend(TGOS.MVCObject, TGOS.TGImage);
TGOS.TGSymbol = function() {
    var a = {
        FORWARD_OPEN_ARROW: 1,
        BACKWARD_OPEN_ARROW: 3
    };
    TGOS.TGSymbolStyle = {
        FORWARD_CLOSED_ARROW: 0,
        FORWARD_OPEN_ARROW: 1,
        BACKWARD_CLOSED_ARROW: 2,
        BACKWARD_OPEN_ARROW: 3,
        CIRCLE: 4,
        DOUBLE_CIRCLE: 5,
        TRIPLE_CIRCLE: 6,
        CIRCLE_SPOT: 7,
        TRIANGLE: 8,
        INVERT_TRIANGLE: 9,
        SQUARE: 10,
        PENTAGON: 11,
        HEXAGON: 12,
        OCTAGON: 13,
        PENTASTAR: 14,
        HEXASTAR: 15
    };
    var d = function() {
        this.anchor = new TGOS.TGPoint(0, 0);
        this.symbolStyle = TGOS.TGSymbolStyle.CIRCLE;
        this.yPixel = this.xPixel = 48;
        this.rotation = 0;
        this.fillColor = "#ffffff";
        this.fillOpacity = 0;
        this.strokeColor = "#000000";
        this.strokeWeight = 2;
        this.strokeOpacity = 1
    };
    TGOS.extend(TGOS.MVCObject, d);
    d.noFill = function(b) {
        for (var d in a)
            if (a[d] == b) return !0;
        return !1
    };
    d.SymbolPath = "M0 0 L 100 50 L0 100L50 50Z;M0 0 L 100 50 L0 100;M100 0 L 0 50 L100 100L50 50Z;M100 0 L 0 50 L100 100;M0 50 A 50 50 0 0 1 100 50 A50 50 0 0 1 0 50z;M0 50A50 50 0 0 1 100 50 A50 50 0 0 1 0 50zM25 50A25 25 0 0 1 75 50 A25 25 0 0 1 25 50z;M0 50A50 50 0 0 1 100 50 A50 50 0 0 1 0 50zM16.67 50A33.33 33.33 0 0 1 83.33 50 A33.33 33.33 0 0 1 16.67 50zM33.33 50A16.67 16.67 0 0 1 66.67 50 A16.67 16.67 0 0 1 33.33 50z;M0 50A50 50 0 0 1 100 50 A50 50 0 0 1 0 50ZM45 45L55 55M55 45L45 55;M50 0L7 75L93 75Z;M93 25L7 25L50 100Z;M0 0L100 0L100 100L0 100Z;M50 0L2 35L21 90L79 90L98 35Z;M50 0L7 25L7 75L50 100L93 75L93 25Z;M50 0L15 15L0 50L15 85L50 100L85 85L100 50L85 15Z;M50 0L35 30L2 35 L26 58L21 90L50 75L79 90L74\t58L98 35L65\t30Z;M50,0L38,28L7,25L25,50L7,75L37,72L50,100L62,72L93,75L75,50L93,25L63,28Z".split(";");
    return d
}();
TGOS.TGEvent = function() {
    var a = 0 > util.getInternetExplorerVersion() ? 0 : 1,
        d = {
            standardDomMouseEvents: {
                click: "click",
                mousemove: "mousemove",
                mousedown: "mousedown",
                mouseover: "mouseover",
                mouseout: "mouseout",
                mouseup: "mouseup",
                dblclick: "dblclick",
                rightclick: "rightclick"
            },
            drawingManagerEvents: {
                circle_complete: "circle_complete",
                marker_complete: "marker_complete",
                overlay_complete: "overlay_complete",
                polygon_complete: "polygon_complete",
                linestring_complete: "linestring_complete",
                envelope_complete: "envelope_complete"
            },
            RIGHTBUTTON: 2
        };
    d.LEFTBUTTON = a;
    TGOS.MapsEventListener = function() {};
    TGOS.OverlayCompleteEvent = function(a, d) {
        this.overlay = a;
        this.type = d
    };
    TGOS.TGMouseEvent = function(a) {
        this.mapListener_ = null;
        this.stop = function() {
            d.removeListener(this.mapListener_);
            this.mapListener_ = null
        };
        this.stopPropagation = function() {
            a.stopPropagation && a.stopPropagation();
            a.cancelBubble = !0
        };
        this.point = new TGOS.TGPoint
    };
    d.addListener_ = function(a, d, e, g, k) {
        if (a && d && a.events && !(0 > a.events.indexOf(d))) {
            var l = a[d + "_"],
                h = null;
            l || (a[d + "_"] = [], l = a[d + "_"]);
            if (l) return h = {
                target_: a,
                eventName_: d,
                targetQueue_: d + "_",
                handler_: e,
                executeLimit: k,
                capture: g
            }, l.push(h), h
        }
    };
    d.addDomListener = function(a, f, e, g) {
        return d.addListener_(a, f, e, g, Infinity)
    };
    d.addDomListenerOnce = function(a, f, e, g) {
        return d.addListener_(a, f, e, g, 1)
    };
    d.addListener = function(a, f, e, g) {
        return d.addListener_(a, f, e, g, Infinity)
    };
    d.addListenerOnce = function(a, f, e, g) {
        return d.addListener_(a, f, e, g, 1)
    };
    d.clearInstanceListeners = function(a) {
        if (a.events)
            for (var f = 0; f < a.events.length; f++) d.clearListeners(a,
                a.events[f])
    };
    d.copyEvent = function(a, f) {
        for (var e = 0; e < a.events.length; e++) {
            var g = a.events[e],
                k = a[g + "_"];
            if (k)
                for (var l = 0; l < k.length; l++) {
                    var h = k[l];
                    d.addListener_(f, g, h.handler_, h.capture, h, h.executeLimit)
                }
        }
    };
    d.clearListeners = function(a, d) {
        var e = a[d + "_"];
        if (e)
            for (var g = 0; g < e.length; g++);
    };
    d.removeListener = function(a) {
        var d = null;
        a && (d = a.target_[a.targetQueue_], d.splice(d.indexOf(a), 1))
    };
    d.trigger_ = function(a, f) {
        var e = null,
            e = a[f + "_"];
        if (!e || 0 >= e.length) return !1;
        for (var g = 0; g < e.length; g++) e[g].handler_.apply(a,
            Array.prototype.slice.call(arguments).slice(2)), e[g].executeLimit--, 0 >= e[g].executeLimit && d.removeListener(e[g])
    };
    d.trigger = function(a, f) {
        d.trigger_(a, f)
    };
    d.releaseEventLock = function(a, d) {
        if (a && a.events && a.events.length && d && a.lockEvt && 0 <= a.lockEvt.indexOf(d)) {
            var e = a.lockEvt.indexOf(d);
            0 > e || a.lockEvt.splice(e, 1)
        }
    };
    d.lockEvent = function(a, d) {
        a && a.events && a.events.length && d && (a.lockEvt || (a.lockEvt = []), 0 <= a.lockEvt.indexOf(d) || a.lockEvt.push(d))
    };
    return d
}();
(function() {
    function a(a) {
        a.cancelBubble = !0;
        a.stopPropagation && a.stopPropagation()
    }
    var d = TGOS.RES_PATH + "marker2.png",
        b = TGOS.RES_PATH + "shadow2.png";
    TGOS.TGMarker = function(b, d, e, f, m) {
        var n = this;
        this.markMove = function(b) {
            a(b);
            var d = n.map.getMapBase(),
                e = d.getPackageOffset();
            switch (n.map.getCoordSys()) {
                case TGOS.TGCoordSys.EPSG3857:
                    b = d.ToMapPoint(b.clientX - e.x, b.clientY - e.y);
                    b = TGOS.GooToWGS84(b.x, b.y);
                    var f = new TGOS.TGPoint(b.x, b.y);
                    break;
                case TGOS.TGCoordSys.EPSG3826:
                    f = d.ToMapPoint(b.clientX - e.x, b.clientY -
                        e.y);
                    break;
                case TGOS.TGCoordSys.EPSG3825:
                    f = d.ToMapPoint(b.clientX - e.x, b.clientY - e.y)
            }
            n.setPosition(f)
        };
        this.endDrag = function(b) {
            a(b);
            DetachEvent(document.body, "mousemove", n.markMove, !0);
            DetachEvent(document.body, "mouseup", n.endDrag, !0)
        };
        this.markDrag = function(b) {
            a(b);
            AttachEvent(document.body, "mousemove", n.markMove, !0);
            AttachEvent(document.body, "mouseup", n.endDrag, !0)
        };
        d instanceof TGOS.TGPoint && (this.position = d);
        f && (this.icon = f);
        e && (this.title = e);
        m && this.setMarkerOptions(m);
        b && this.setMap(b)
    };
    var f =
        TGOS.TGMarker;
    TGOS.extend(TGOS.Graphic, f);
    var e = f.prototype;
    e.elem = null;
    e.map = null;
    e.gPos = null;
    e.getBounds = function() {
        return new TGOS.TGEnvelope(this.position.x, this.position.y, this.position.x, this.position.y)
    };
    e.setMap = function(a) {
        if (null === a) this.destroy(), this.map = null;
        else if (this.destroy(), a instanceof TGOS.TGOnlineMap) {
            (this.map = a) && this.map.getCoordSys() == TGOS.TGCoordSys.EPSG3857 && (this.gPos = TGOS.WGS84ToGoo(this.position.x, this.position.y));
            this.map.overlay.add(this);
            this.map.getPaper();
            a =
                this.map.getShadowPaper();
            var d = this.shadow ? this.shadow.getUrl() : b;
            this.sImg = a.image(d, 0, 0, this.shadow.size.width, this.shadow.size.height);
            !0 != this.flat && !1 != this.visible || this.sImg.hide();
            this.redrawMarker();
            this.update()
        }
    };
    e.getMap = function() {
        return this.map
    };
    e.getMapBase = function() {
        if (this.map) return this.map.getMapBase()
    };
    e.destroy = function() {
        this.map && (this.elem && this.elem.remove(), this.sImg && this.sImg.remove(), this.map.overlay.remove(this), this.sImg = this.elem = null)
    };
    e.getEventElement = function() {
        return this.elem
    };
    e.title = "";
    e.getTitle = function() {
        return this.title
    };
    e.setTitle = function(a) {
        this.title = a;
        this.elem && (this.elem.attr({
            title: this.title
        }), TGOS.TGEvent.trigger(this, "title_changed"))
    };
    e.position = null;
    e.getPosition = function() {
        return this.position
    };
    e.setPosition = function(a) {
        a instanceof TGOS.TGPoint && (this.position = a, this.map && this.map.getCoordSys() == TGOS.TGCoordSys.EPSG3857 && (this.gPos = TGOS.WGS84ToGoo(this.position.x, this.position.y)), this.update(), TGOS.TGEvent.trigger(this, "position_changed"))
    };
    this.infoAnchorPosition =
        null;
    e.getInfoAnchorPoint = function() {
        return this.infoAnchorPoint
    };
    e.setInfoAnchorPoint = function(a) {
        this.infoAnchorPoint = a
    };
    e.icon = new TGOS.TGImage(d, new TGOS.TGSize(31, 30), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(9, 28));
    e.getIcon = function() {
        return this.icon
    };
    e.setIcon = function(a) {
        if (a instanceof TGOS.TGImage || a instanceof TGOS.TGSymbol) this.icon = a, this.redrawMarker(), this.update(), TGOS.TGEvent.trigger(this, "icon_changed")
    };
    e.clickable = !1;
    e.getClickable = function() {
        return this.clickable
    };
    e.setClickable =
        function(a) {
            "boolean" === typeof a && ((this.clickable = a) ? TGOS.TGEvent.releaseEventLock(this, "click") : TGOS.TGEvent.lockEvent(this, "click"), TGOS.TGEvent.trigger(this, "clickable_changed"))
        };
    e.redrawMarker = function() {
        if ((this.icon instanceof TGOS.TGImage || this.icon instanceof TGOS.TGSymbol) && this.map) {
            this.elem && this.elem.remove();
            var a = this.map.getPaper();
            if (this.icon instanceof TGOS.TGImage)
                if (this.fitImageSize) {
                    var b = document.createElement("img"),
                        d = this;
                    b.onload = function() {
                        var b = e.icon.size.width,
                            f = e.icon.size.height;
                        try {
                            b = this.width, f = this.height
                        } catch (k) {}
                        e.elem = a.image(d.icon.getUrl(), 0, 0, b, f);
                        !1 === e.visible ? e.elem.hide() : e.elem.show();
                        null != e.cursor && e.elem.attr({
                            cursor: e.cursor
                        });
                        null != e.title && e.elem.attr({
                            title: e.title
                        });
                        d.map.overlay.updateElementOrder(d);
                        d.bindEvents();
                        d.update()
                    };
                    b.src = this.icon.getUrl()
                } else this.elem = a.image(this.icon.getUrl(), 0, 0, this.icon.size.width, this.icon.size.height), !1 === this.visible ? this.elem.hide() : this.elem.show(), null != this.cursor && this.elem.attr({
                        cursor: this.cursor
                    }),
                    null != this.title && this.elem.attr({
                        title: this.title
                    }), this.map.overlay.updateElementOrder(this), this.bindEvents(), this.update();
            else if (this.icon instanceof TGOS.TGSymbol) {
                b = this.icon.symbolStyle in TGOS.TGSymbol.SymbolPath ? TGOS.TGSymbol.SymbolPath[this.icon.symbolStyle] : this.icon.symbolStyle;
                if (!b) throw "Invalid SymbolStyle or path";
                this.elem = a.path(b);
                this.bbox_ = this.elem.getBBox(!0);
                b = TGOS.TGSymbol.noFill(this.icon.symbolStyle);
                this.elem.attr({
                    fill: this.icon.fillColor,
                    "fill-opacity": b ? 0 : this.icon.fillOpacity,
                    stroke: this.icon.strokeColor,
                    "stroke-opacity": this.icon.strokeOpacity,
                    "stroke-width": this.icon.strokeWeight
                });
                !1 === this.visible ? this.elem.hide() : this.elem.show();
                null != this.cursor && this.elem.attr({
                    cursor: this.cursor
                });
                null != this.title && this.elem.attr({
                    title: this.title
                });
                this.map.overlay.updateElementOrder(this);
                this.bindEvents();
                this.update()
            }
        }
    };
    e.icon_changed = function() {
        this.redrawMarker()
    };
    e.visible = !0;
    e.getVisible = function() {
        return this.visible
    };
    e.setVisible = function(a, b) {
        this.visible = a;
        this.map &&
            (!0 === this.visible ? (this.elem.show(), !1 === this.flat && this.sImg.show()) : (this.elem.hide(), this.sImg.hide()), b || this.update(), TGOS.TGEvent.trigger(this, "visible_changed"))
    };
    e.cursor = null;
    e.getCursor = function() {
        return this.cursor
    };
    e.setCursor = function(a) {
        this.cursor = a;
        this.elem && (this.elem.attr({
            cursor: this.cursor
        }), TGOS.TGEvent.trigger(this, "cursor_changed"))
    };
    e.zIndex = 0;
    e.getZIndex = function() {
        return this.zIndex
    };
    e.setZIndex = function(a) {
        this.zIndex = parseInt(a);
        this.map && (this.map.overlay.updateArrayOrder(this),
            this.map.overlay.updateElementOrder(this), TGOS.TGEvent.trigger(this, "zindex_changed"))
    };
    e.draggable = !1;
    e.getDraggable = function() {
        return this.draggable
    };
    e.setDraggable = function(a) {
        this.draggable = a;
        TGOS.TGEvent.trigger(this, "draggable_changed");
        this.elem && (this.elem && !0 == a ? this.elem.mousedown(this.markDrag) : this.elem && !1 == a && this.elem.unmousedown(this.markDrag))
    };
    e.flat = !1;
    e.getFlat = function() {
        return this.flat
    };
    e.setFlat = function(a) {
        this.flat = a;
        this.sImg && (!0 === this.flat ? this.sImg.hide() : this.sImg.show(),
            TGOS.TGEvent.trigger(this, "flat_changed"))
    };
    e.shadow = new TGOS.TGImage(b, new TGOS.TGSize(31, 30), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(9, 25));
    e.getShadow = function() {
        return this.shadow
    };
    e.setShadow = function(a) {
        this.shadow = a;
        TGOS.TGEvent.trigger(this, "shadow_changed")
    };
    e.fitImageSize = !1;
    e.setFitImageSize = function(a) {
        this.fitImageSize = a
    };
    e.setMarkerOptions = function(a) {
        a && (void 0 !== a.visible && this.setVisible(a.visible), void 0 != a.icon && this.setIcon(a.icon), void 0 !== a.shadow && this.setShadow(a.shadow), void 0 !=
            a.title && this.setTitle(a.title), void 0 !== a.position && this.setPosition(a.position), void 0 !== a.infoAnchor && this.setInfoAnchorPoint(a.infoAnchor), void 0 !== a.clickable && this.setClickable(a.clickable), void 0 !== a.cursor && this.setCursor(a.cursor), void 0 != a.zIndex && this.setZIndex(a.zIndex), void 0 !== a.draggable && this.setDraggable(a.draggable), void 0 !== a.flat && this.setFlat(a.flat), void 0 !== a.shape && this.setShape(a.shape), void 0 !== a.fitImageSize && this.setFitImageSize(a.fitImageSize))
    };
    e.update = function() {
        if (this.position &&
            this.visible && this.elem && this.map) {
            var a;
            switch (this.map.getCoordSys()) {
                case TGOS.TGCoordSys.EPSG3857:
                    a = this.gPos;
                    break;
                default:
                    a = this.position
            }
            var b = this.map.getMapBase();
            if (this.map.getRawBound().contains(a)) {
                this.visible && (this.elem.show(), !0 !== this.flat && this.sImg.show());
                a = b.FromMapPoint(a.x, a.y);
                if (this.icon instanceof TGOS.TGImage) this.elem.attr({
                    x: a.x - this.icon.anchor.x,
                    y: a.y - this.icon.anchor.y
                });
                else if (this.icon instanceof TGOS.TGSymbol) {
                    if (!this.bbox_) {
                        this.bbox_ = this.elem.getBBox(!0);
                        return
                    }
                    this.elem.transform("t" + (a.x - this.icon.anchor.x) + "," + (a.y - this.icon.anchor.y) + "r" + this.icon.rotation + "," + this.icon.anchor.x + "," + this.icon.anchor.y + "s" + this.icon.xPixel / this.bbox_.width + "," + this.icon.yPixel / this.bbox_.height + ",0,0")
                } else return;
                !1 === this.flat && this.sImg.attr({
                    x: a.x - this.shadow.anchor.x,
                    y: a.y - this.shadow.anchor.y
                })
            } else this.elem.hide(), this.sImg.hide()
        }
    };
    TGOS.RegisterEvent(f, "clickable_changed icon_changed position_changed title_changed visible_changed zindex_changed click mousedown mouseup mouseover mouseout mousemove cursor_changed draggable_changed flat_changed shadow_changed shape_changed dblclick rightclick".split(" "))
})();
TGOS.TGDrawing = function() {
    var a = {
            ENVELOPE: TGOS.RES_PATH + "rect.png",
            CIRCLE: TGOS.RES_PATH + "circle.png",
            MARKER: TGOS.RES_PATH + "mark.png",
            LABEL: TGOS.RES_PATH + "label.png",
            POLYGON: TGOS.RES_PATH + "poly.png",
            LINESTRING: TGOS.RES_PATH + "line.png"
        },
        d = {
            ENVELOPE: TGOS.RES_PATH + "rect2.png",
            CIRCLE: TGOS.RES_PATH + "circle2.png",
            MARKER: TGOS.RES_PATH + "mark2.png",
            LABEL: TGOS.RES_PATH + "label2.png",
            POLYGON: TGOS.RES_PATH + "poly2.png",
            LINESTRING: TGOS.RES_PATH + "line2.png"
        },
        b = function(b, e) {
            var f = this;
            this.manager = b;
            this.mode = e;
            this.active = !1;
            this.div = document.createElement("div");
            this.img = document.createElement("img");
            this.div.appendChild(this.img);
            this.setActive = function(b) {
                this.active = b;
                this.img.src = this.active ? d[this.mode] : a[this.mode]
            };
            this.destructor = function() {
                div.parentNode && div.parentNode.removeChild(this.div);
                this.img = this.div = null
            };
            this.setActive(!1);
            this.div.onclick = function() {
                f.manager.setDrawingMode(f.manager.getDrawingMode() == f.mode ? null : f.mode)
            }
        },
        f = function(a) {
            a.cancelBubble = !0;
            a.stopPropagation && a.stopPropagation()
        },
        e = function(a, b, d) {
            this.buttons = [];
            a && (this.manager = a);
            b && (this.position = b);
            d && (this.modes = d);
            this.div = document.createElement("div");
            util.disableSelect(this.div);
            this.table = document.createElement("table");
            this.div.appendChild(this.table);
            this.row = this.table.insertRow(-1);
            a.map && this.setMap(a.map)
        },
        g = e.prototype;
    g.setMap = function(a) {
        this.map != a && (this.map = a, a.controls[this.position].push(this.div))
    };
    g.setVisible = function(a) {
        this.div.style.display = a ? "" : "none"
    };
    g.setPosition = function(a) {
        if (this.manager.map) {
            var b =
                this.manager.map.controls[this.position].indexOf(this.div);
            0 <= b && (this.manager.map.controls[this.position].removeAt(b), this.manager.map.controls[a].push(this.div), this.position = a)
        }
    };
    g.setOptions = function(a) {
        a.drawingModes && this.setModes(a.drawingModes);
        a.controlPosition && this.setPosition(a.controlPosition)
    };
    g.toggleMode = function(a) {
        for (var b = 0; b < this.buttons.length; b++) {
            var d = this.buttons[b];
            d.setActive(a == d.mode)
        }
    };
    g.setModes = function(a) {
        this.div.innerHTML = "";
        this.table = document.createElement("table");
        this.div.appendChild(this.table);
        this.buttons = [];
        this.row = this.table.insertRow(-1);
        for (var d = 0; d < a.length; d++)
            if ("LABEL" != a[d]) {
                var e = new b(this.manager, a[d]);
                this.row.insertCell(-1).appendChild(e.div);
                this.buttons.push(e)
            }
    };
    TGOS.TGOverlayType = {
        CIRCLE: "CIRCLE",
        MARKER: "MARKER",
        POLYGON: "POLYGON",
        LINESTRING: "LINESTRING",
        ENVELOPE: "ENVELOPE",
        LABEL: "LABEL"
    };
    var k = TGOS.RES_PATH + "marker2.png",
        l = TGOS.RES_PATH + "shadow2.png",
        h = function(a) {
            var b = 0,
                d = 0;
            a.getBoundingClientRect && (a = a.getBoundingClientRect(), b = a.left,
                d = a.top);
            return new TGOS.TGPoint(b, d)
        },
        g = function(a) {
            var b = this,
                d, g, m, x, A, B, D = null,
                y, z, w = function(a) {
                    util.disableDefault(a);
                    f(a);
                    var e = h(z);
                    d = a.clientX - e.x;
                    g = a.clientY - e.y;
                    switch (b.getDrawingMode()) {
                        case TGOS.TGOverlayType.ENVELOPE:
                            dragGraphic = new TGOS.TGFill(b.map, null, b.options.envelopeOptions);
                            break;
                        case TGOS.TGOverlayType.CIRCLE:
                            dragGraphic = new TGOS.TGFill(b.map, null, b.options.circleOptions)
                    }
                    AttachEvent(document.body, "mousemove", t);
                    AttachEvent(document.body, "mouseup", u);
                    AttachEvent(document.body,
                        "mouseleave", u)
                },
                t = function(a) {
                    util.disableDefault(a);
                    f(a);
                    var e = h(z);
                    m = a.clientX - e.x;
                    x = a.clientY - e.y;
                    a = b.map.getMapBase();
                    var k;
                    if (d != A && B != g) {
                        switch (b.drawingMode) {
                            case TGOS.TGOverlayType.ENVELOPE:
                                var l, n;
                                k = d > m ? m : d;
                                e = g > x ? x : g;
                                l = Math.abs(d - m);
                                n = Math.abs(g - x);
                                mlr = a.ToMapPoint(k, e);
                                a = a.ToMapPoint(k + l, e + n);
                                a = new TGOS.TGEnvelope(mlr.x, mlr.y, a.x, a.y);
                                b.map.getCoordSys() == TGOS.TGCoordSys.EPSG3857 && (a = TGOS.Geometry.Transform(a, TGOS.GooToWGS84));
                                k = a;
                                break;
                            case TGOS.TGOverlayType.CIRCLE:
                                k = d, e = g, l = g - x, n = d -
                                    m, n = Math.sqrt(n * n + l * l), l = new TGOS.TGCircle, k = a.ToMapPoint(k, e), a = a.ToMapDistX(n), l.setCenter(k), l.setRadius(a), b.map.getCoordSys() == TGOS.TGCoordSys.EPSG3857 && (l = TGOS.Geometry.Transform(l, TGOS.GooToWGS84)), k = l
                        }
                        dragGraphic.setPath(k)
                    }
                },
                u = function(a) {
                    util.disableDefault(a);
                    f(a);
                    b.map.getPaper();
                    var e = b.map.getMapBase();
                    A = a.offsetX;
                    B = a.offsetY;
                    if (d != A && B != g) {
                        var h;
                        switch (b.drawingMode) {
                            case TGOS.TGOverlayType.ENVELOPE:
                                var k, l;
                                a = d > m ? m : d;
                                h = g > x ? x : g;
                                k = Math.abs(d - m);
                                l = Math.abs(g - x);
                                mlr = e.ToMapPoint(a, h);
                                e =
                                    e.ToMapPoint(a + k, h + l);
                                e = new TGOS.TGEnvelope(mlr.x, mlr.y, e.x, e.y);
                                b.map.getCoordSys() == TGOS.TGCoordSys.EPSG3857 && TGOS.Geometry.Transform(e, TGOS.GooToWGS84);
                                h = new TGOS.OverlayCompleteEvent(dragGraphic, TGOS.TGOverlayType.ENVELOPE);
                                TGOS.TGEvent.trigger_(b, "envelope_complete", h);
                                break;
                            case TGOS.TGOverlayType.CIRCLE:
                                a = d, h = g, k = g - x, l = d - m, l = Math.sqrt(l * l + k * k), k = new TGOS.TGCircle, a = e.ToMapPoint(a, h), e = e.ToMapDistX(l), k.setCenter(a), k.setRadius(e), b.map.getCoordSys() == TGOS.TGCoordSys.EPSG3857 && TGOS.Geometry.Transform(k,
                                    TGOS.GooToWGS84), h = new TGOS.OverlayCompleteEvent(dragGraphic, TGOS.TGOverlayType.CIRCLE), TGOS.TGEvent.trigger_(b, "circle_complete", h)
                        }
                        TGOS.TGEvent.trigger_(b, "overlay_complete", h)
                    }
                    DetachEvent(document.body, "mousemove", t, !1);
                    DetachEvent(document.body, "mouseup", u, !1);
                    DetachEvent(document.body, "mouseleave", u, !1)
                },
                C = function(a, d) {
                    var e;
                    e = a.slice();
                    d && e.pop();
                    b.getDrawingMode() == TGOS.TGOverlayType.POLYGON ? (e.push(e[0]), e = new TGOS.TGLineString(e), e = new TGOS.TGLinearRing(e), e = new TGOS.TGPolygon([e])) : e = new TGOS.TGLineString(e);
                    b.map.getCoordSys() == TGOS.TGCoordSys.EPSG3857 && (e = TGOS.Geometry.Transform(e, TGOS.GooToWGS84));
                    return e
                },
                E = function(a) {
                    var d = b.map.getMapBase(),
                        e = h(z);
                    a = d.ToMapPoint(a.clientX - e.x, a.clientY - e.y);
                    !D || 0 >= D.length || !O || (a = C(D.concat(a)), O.setPath(a))
                },
                G = function(a) {
                    if (!H) {
                        f(a);
                        var d = b.getDrawingMode();
                        if (d == TGOS.TGOverlayType.MARKER) {
                            AttachEvent(z, "dblclick", Q);
                            var e = b.map.getMapBase(),
                                g = h(z),
                                d = a.clientX - g.x;
                            a = a.clientY - g.y;
                            e = e.ToMapPoint(d, a);
                            b.map.getCoordSys() == TGOS.TGCoordSys.EPSG3857 && (d = TGOS.Geometry.Transform(e,
                                TGOS.GooToWGS84), e = new TGOS.TGPoint(d.x, d.y));
                            d = new TGOS.TGMarker(b.map, e);
                            d.setMarkerOptions(b.options.markerOptions);
                            event = new TGOS.OverlayCompleteEvent(d, TGOS.TGOverlayType.MARKER);
                            TGOS.TGEvent.trigger_(b, "marker_complete", event);
                            TGOS.TGEvent.trigger_(b, "overlay_complete", event)
                        } else d == TGOS.TGOverlayType.LABEL ? (AttachEvent(z, "dblclick", Q), e = b.map.getMapBase(), g = h(z), d = a.clientX - g.x, a = a.clientY - g.y, e = e.ToMapPoint(d, a), b.map.getCoordSys() == TGOS.TGCoordSys.EPSG3857 && (d = TGOS.Geometry.Transform(e,
                            TGOS.GooToWGS84), e = new TGOS.TGPoint(d.x, d.y)), d = b.options.labelOptions, d.position = e, a = new TGOS.TGLabel(d), a.setLabel(d.label), event = new TGOS.OverlayCompleteEvent(a, TGOS.TGOverlayType.LABEL), TGOS.TGEvent.trigger_(b, "label_complete", event), TGOS.TGEvent.trigger_(b, "overlay_complete", event)) : (D || (D = []), 0 >= D.length && (AttachEvent(z, "dblclick", Q), O = b.getDrawingMode() == TGOS.TGOverlayType.POLYGON ? new TGOS.TGFill(b.map, null, b.options.polygonOptions) : new TGOS.TGLine(b.map, null, b.options.polylineOptions)), e =
                            b.map.getMapBase(), g = h(z), d = a.clientX - g.x, a = a.clientY - g.y, e = e.ToMapPoint(d, a), D.push(e), y || (y = b.map.getPaper().path("M" + d + "," + a)), d = C(D), O.setPath(d))
                    }
                },
                H = !1,
                O, M = function(a) {
                    util.disableDefault(a);
                    H = !1;
                    b.getDrawingMode();
                    AttachEvent(z, "mousemove", P);
                    AttachEvent(z, "mousemove", E);
                    AttachEvent(z, "mouseup", G)
                },
                P = function(a) {
                    util.disableDefault(a);
                    H = !0;
                    DetachEvent(z, "mousemove", P);
                    DetachEvent(z, "mouseup", G)
                },
                Q = function(a) {
                    util.disableDefault(a);
                    f(a);
                    var d = b.getDrawingMode();
                    if (d != TGOS.TGOverlayType.MARKER &&
                        d != TGOS.TGOverlayType.LABEL) {
                        var d = b.map.getMapBase(),
                            e = h(z);
                        d.ToMapPoint(a.clientX - e.x, a.clientY - e.y);
                        a = C(D, !0);
                        O.setPath(a);
                        var g;
                        switch (b.getDrawingMode()) {
                            case TGOS.TGOverlayType.LINESTRING:
                                g = "linestring_complete";
                                break;
                            case TGOS.TGOverlayType.POLYGON:
                                g = "polygon_complete"
                        }
                        a = new TGOS.OverlayCompleteEvent(O, b.getDrawingMode());
                        TGOS.TGEvent.trigger_(b, g, a);
                        D = null;
                        DetachEvent(document.body, "mousemove", E);
                        DetachEvent(z, "dblclick", Q);
                        TGOS.TGEvent.trigger_(b, "overlay_complete", a)
                    }
                };
            this.enterEnvMode =
                function() {
                    this.setDrawingMode(TGOS.TGOverlayType.ENVELOPE)
                };
            this.enterCircleMode = function() {
                this.setDrawingMode(TGOS.TGOverlayType.CIRCLE)
            };
            this.enterPolyMode = function() {
                this.setDrawingMode(TGOS.TGOverlayType.POLYGON)
            };
            this.enterLineStrMode = function() {
                this.setDrawingMode(TGOS.TGOverlayType.LINESTRING)
            };
            this.enterMarkMode = function() {
                this.setDrawingMode(TGOS.TGOverlayType.MARKER)
            };
            this.enterLabelMode = function() {
                this.setDrawingMode(TGOS.TGOverlayType.LABEL)
            };
            this.setDrawingMode = function(a) {
                z = this.map.getPanes().graphicLayer;
                DetachEvent(z, "mousedown", w);
                DetachEvent(z, "mouseup", G);
                DetachEvent(z, "mousedown", M);
                DetachEvent(z, "mousemove", E);
                DetachEvent(z, "dblclick", Q);
                DetachEvent(document.body, "mousemove", t);
                DetachEvent(document.body, "mouseup", u);
                DetachEvent(document.body, "mouseleave", u);
                z.style.cursor = "crosshair";
                switch (a) {
                    case TGOS.TGOverlayType.ENVELOPE:
                        AttachEvent(z, "mousedown", w);
                        this.drawingMode = TGOS.TGOverlayType.ENVELOPE;
                        TGOS.TGEvent.trigger(this, "drawModeChanged");
                        break;
                    case TGOS.TGOverlayType.CIRCLE:
                        AttachEvent(z,
                            "mousedown", w);
                        this.drawingMode = TGOS.TGOverlayType.CIRCLE;
                        TGOS.TGEvent.trigger(this, "drawModeChanged");
                        break;
                    case TGOS.TGOverlayType.POLYGON:
                        AttachEvent(z, "mousedown", M);
                        this.drawingMode = TGOS.TGOverlayType.POLYGON;
                        TGOS.TGEvent.trigger(this, "drawModeChanged");
                        break;
                    case TGOS.TGOverlayType.LINESTRING:
                        AttachEvent(z, "mousedown", M);
                        this.drawingMode = TGOS.TGOverlayType.LINESTRING;
                        TGOS.TGEvent.trigger(this, "drawModeChanged");
                        break;
                    case TGOS.TGOverlayType.MARKER:
                        AttachEvent(z, "mousedown", M);
                        this.drawingMode =
                            TGOS.TGOverlayType.MARKER;
                        TGOS.TGEvent.trigger(this, "drawModeChanged");
                        break;
                    case TGOS.TGOverlayType.LABEL:
                        AttachEvent(z, "mousedown", M);
                        this.drawingMode = TGOS.TGOverlayType.LABEL;
                        TGOS.TGEvent.trigger(this, "drawModeChanged");
                        break;
                    case null:
                        this.drawingMode = null, z.style.cursor = "default"
                }
                this.drawingControl && this.drawingControl.toggleMode(a)
            };
            this.options = {
                drawingControl: !0,
                drawingControlOptions: {
                    drawingModes: [TGOS.TGOverlayType.POLYGON, TGOS.TGOverlayType.ENVELOPE, TGOS.TGOverlayType.CIRCLE, TGOS.TGOverlayType.LINESTRING,
                        TGOS.TGOverlayType.LABEL, TGOS.TGOverlayType.MARKER
                    ],
                    controlPosition: TGOS.TGControlPosition.BOTTOM_RIGHT
                },
                labelOptions: {
                    fontSize: "",
                    fontColor: "",
                    font: "",
                    fontWeight: "",
                    opacity: 1,
                    label: "\u6587\u5b57\u6a19\u8a18"
                },
                markerOptions: {
                    title: "",
                    clickable: !0,
                    cursor: "",
                    zIndex: "auto",
                    flat: !1,
                    icon: new TGOS.TGImage(k, new TGOS.TGSize(31, 30), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(11, 30)),
                    shadow: new TGOS.TGImage(l, new TGOS.TGSize(31, 30), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(9, 25))
                },
                polylineOptions: {
                    clickable: !1,
                    strokeWeight: 2,
                    zIndex: "auto",
                    strokeColor: "#555555",
                    strokeOpacity: 1
                },
                polygonOptions: {
                    clickable: !1,
                    fillColor: "#eeaaaa",
                    fillOpacity: 0.5,
                    strokeWeight: 2,
                    zIndex: "auto",
                    strokeColor: "#555555",
                    strokeOpacity: 1
                },
                circleOptions: {
                    clickable: !1,
                    fillColor: "#eeaaaa",
                    fillOpacity: 0.5,
                    strokeWeight: 2,
                    zIndex: "auto",
                    strokeColor: "#555555",
                    strokeOpacity: 1
                },
                envelopeOptions: {
                    clickable: !1,
                    fillColor: "#eeaaaa",
                    fillOpacity: 0.5,
                    strokeWeight: 2,
                    zIndex: "auto",
                    strokeColor: "#555555",
                    strokeOpacity: 1
                }
            };
            this.drawingControl = new e(this, this.options.drawingControlOptions.controlPosition,
                this.options.drawingControlOptions.drawingModes);
            this.drawingControl.setModes([TGOS.TGOverlayType.ENVELOPE, TGOS.TGOverlayType.POLYGON, TGOS.TGOverlayType.CIRCLE, TGOS.TGOverlayType.LINESTRING, TGOS.TGOverlayType.LABEL, TGOS.TGOverlayType.MARKER]);
            a && (this.map = null)
        },
        m = g.prototype;
    m.getDrawingMode = function() {
        return this.drawingMode
    };
    m.getMap = function() {
        return this.map
    };
    m.setMap = function(a) {
        this.map = a;
        this.drawingControl && this.drawingControl.setMap(this.map)
    };
    m.setMarkerOptions = function(a) {
        a && (this.options.markerOptions =
            a)
    };
    m.setLabelOptions = function(a) {
        a && (this.options.labelOptions = a)
    };
    m.setLineOptions = function(a) {
        a && (this.options.polylineOptions = a)
    };
    m.setPolygonOptions = function(a) {
        a && (this.options.polygonOptions = a)
    };
    m.setCircleOptions = function(a) {
        a && (this.options.circleOptions = a)
    };
    m.setEnvOptions = function(a) {
        a && (this.options.envelopeOptions = a)
    };
    m.setOptions = function(a) {
        a && (!0 == a.drawingControl ? this.drawingControl.setVisible(!0) : !1 == a.drawingControl && this.drawingControl.setVisible(!1), a.drawingControlOptions && this.drawingControl.setOptions(a.drawingControlOptions),
            this.options.circleOptions = a.circleOptions ? a.circleOptions : this.options.circleOptions, this.options.envelopeOptions = a.circleOptions ? a.envelopeOptions : this.options.envelopeOptions, this.options.markerOptions = a.markerOptions ? a.markerOptions : this.options.markerOptions, this.options.labelOptions = a.circleOptions ? a.labelOptions : this.options.labelOptions, this.options.polylineOptions = a.polylineOptions ? a.polylineOptions : this.options.polylineOptions, this.options.polygonOptions = a.polygonOptions ? a.polygonOptions :
            this.options.polygonOptions)
    };
    TGOS.RegisterEvent(g, "circle_complete marker_complete overlay_complete polygon_complete linestring_complete envelope_complete label_complete drawmodeChanged".split(" "));
    return g
}();
(function() {
    TGOS.MapIdInfo = TGOS.MapIdInfo || {};
    TGOS.TGMapServiceId = TGOS.TGMapServiceId || {};
    TGOS.TGMapId = TGOS.TGMapId || {};
    TGOS.ThemeLayerID = {
        REGION: "M05",
        REGION_119: "M06",
        EOC: "M11",
        FIREDEPARTMENT: "M12",
        POLICEDEPARTMENT: "M13",
        NASC: "M14",
        SOCIALSERVICE: "M15",
        SHELTERS: "M18",
        NASC_LANDING: "M19",
        INDUSTRY: "M21",
        SCHOOL: "M22",
        DEBRISFLOW_P: "M08"
    };
    TGOS.ThemeLayerID.MEDICAL = "M17";
    TGOS.ThemeTileID = {
        LANDUSE: "T04"
    };
    TGOS.TGMapTypeId = {
        TGOSMAP: "TGOSMAP",
        NLSCMAP: "NLSCMAP",
        F2IMAGE: "F2IMAGE",
        ROADMAP: "ROADMAP",
        HILLSHADE: "HILLSHADE",
        SEGISMAP: "SEGISMAP",
        HILLSHADEMIX: "HILLSHADEMIX"
    };
    TGOS.TGMapTypeIdCode = {
        TGOSMAP: "B01",
        NLSCMAP: "B02",
        F2IMAGE: "B04",
        ROADMAP: "B05",
        HILLSHADE: "B06",
        SEGISMAP: "B08",
        HILLSHADEMIX: "B07"
    };
    TGOS.TGMapTypeId_zh_TW = {
        TGOSMAP: "TGOSMAP",
        NLSCMAP: "\u901a\u7528\u7248\u96fb\u5b50\u5730\u5716",
        F2IMAGE: "\u798f\u885b\u4e8c\u865f\u885b\u661f\u5f71\u50cf",
        ROADMAP: "\u798f\u885b\u6df7\u5408\u5730\u5716",
        HILLSHADE: "\u5730\u5f62\u6688\u6e32\u5716",
        SEGISMAP: "\u7d71\u8a08\u5340\u5730\u5716",
        HILLSHADEMIX: "\u5730\u5f62\u6688\u6e32\u6df7\u5408\u5730\u5716"
    };
    TGOS.MapTypeDocumentName = {
        TGOSMAP: getWebProtocal() + getAPIPath() + "Agent/TWD97/Agent_TGOSMAP3826.aspx",
        NLSCMAP: getWebProtocal() + getAPIPath() + "Agent/TWD97/Agent_NLSCMAP3826.aspx",
        F2IMAGE: getWebProtocal() + getAPIPath() + "Agent/TWD97/Agent_F2IMAGE3826.aspx",
        ROADMAP: getWebProtocal() + getAPIPath() + "Agent/TWD97/Agent_ROADMAP3826.aspx",
        HILLSHADE: getWebProtocal() + getAPIPath() + "Agent/TWD97/Agent_HILLSHADE3826.aspx",
        SEGISMAP: getWebProtocal() + getAPIPath() + "Agent/TWD97/Agent_SEGISMAP3826.aspx",
        HILLSHADEMIX: getWebProtocal() +
            getAPIPath() + "Agent/TWD97/Agent_HILLSHADEMIX3826.aspx"
    };
    TGOS.MapTypeDocumentNameTWD97_119 = {
        NLSCMAP: getWebProtocal() + getAPIPath() + "Agent/TWD97/Agent_NLSCMAP3825.aspx",
        SEGISMAP: getWebProtocal() + getAPIPath() + "Agent/TWD97Agent_SEGISMAP3825.aspx",
        TGOSMAP: getWebProtocal() + getAPIPath() + "Agent/TWD97/Agent_TGOSMAP3825.aspx"
    };
    TGOS.MapTypeDocumentNameGoogle = {
        TGOSMAP: getWebProtocal() + getAPIPath() + "Agent/Google/Agent_TGOSMAP3857.aspx",
        NLSCMAP: getWebProtocal() + getAPIPath() + "Agent/Google/Agent_NLSCMAP3857.aspx",
        F2IMAGE: getWebProtocal() + getAPIPath() + "Agent/Google/Agent_F2IMAGE3857.aspx",
        ROADMAP: getWebProtocal() + getAPIPath() + "Agent/Google/Agent_ROADMAP3857.aspx",
        HILLSHADE: getWebProtocal() + getAPIPath() + "Agent/Google/Agent_HILLSHADE3857.aspx",
        SEGISMAP: getWebProtocal() + getAPIPath() + "Agent/Google/Agent_SEGISMAP3857.aspx",
        HILLSHADEMIX: getWebProtocal() + getAPIPath() + "Agent/Google/Agent_HILLSHADEMIX3857.aspx"
    };
    TGOS.MapTypeIndexViewId_zh_TW = {
        TGOSMAP: "TGOSMAP\u7d22\u5f15",
        NLSCMAP: "\u901a\u7528\u7248\u96fb\u5b50\u5730\u5716\u7d22\u5f15",
        F2IMAGE: "\u798f\u885b\u4e8c\u865f\u885b\u661f\u5f71\u50cf\u7d22\u5f15",
        ROADMAP: "\u798f\u885b\u6df7\u5408\u5730\u5716\u7d22\u5f15",
        HILLSHADE: "\u5730\u5f62\u6688\u6e32\u5716\u7d22\u5f15",
        SEGISMAP: "\u7d71\u8a08\u5340\u5730\u5716\u7d22\u5f15",
        HILLSHADEMIX: "\u5730\u5f62\u6688\u6e32\u6df7\u5408\u5730\u5716\u7d22\u5f15"
    };
    TGOS.MapTypeIndexViewDocumentName = {
        TGOSMAP: getWebProtocal() + getAPIPath() + "Agent/TWD97/Agent_TGOSMAP3826_IV.aspx",
        NLSCMAP: getWebProtocal() + getAPIPath() + "Agent/TWD97/Agent_NLSCMAP3826_IV.aspx",
        F2IMAGE: getWebProtocal() + getAPIPath() + "Agent/TWD97/Agent_F2IMAGE3826_IV.aspx",
        ROADMAP: getWebProtocal() + getAPIPath() + "Agent/TWD97/Agent_ROADMAP3826_IV.aspx",
        HILLSHADE: getWebProtocal() + getAPIPath() + "Agent/TWD97/Agent_HILLSHADE3826_IV.aspx",
        SEGISMAP: getWebProtocal() + getAPIPath() + "Agent/TWD97/Agent_SEGISMAP3826_IV.aspx",
        HILLSHADEMIX: getWebProtocal() + getAPIPath() + "Agent/TWD97/Agent_HILLSHADEMIX3826_IV.aspx"
    };
    TGOS.MapTypeIndexViewDocumentNameTWD97_119 = {
        TGOSMAP: getWebProtocal() + getAPIPath() + "Agent/TWD97/Agent_TGOSMAP3825_IV.aspx",
        NLSCMAP: getWebProtocal() + getAPIPath() + "Agent/TWD97/Agent_NLSCMAP3825_IV.aspx",
        SEGISMAP: getWebProtocal() + getAPIPath() + "Agent/TWD97Agent_SEGISMAP3825_IV.aspx"
    };
    TGOS.MapTypeIndexViewDocumentNameGoogle = {
        TGOSMAP: getWebProtocal() + getAPIPath() + "Agent/Google/Agent_TGOSMAP3857_IV.aspx",
        NLSCMAP: getWebProtocal() + getAPIPath() + "Agent/Google/Agent_NLSCMAP3857_IV.aspx",
        F2IMAGE: getWebProtocal() + getAPIPath() + "Agent/Google/Agent_F2IMAGE3857_IV.aspx",
        ROADMAP: getWebProtocal() + getAPIPath() + "Agent/Google/Agent_ROADMAP3857_IV.aspx",
        HILLSHADE: getWebProtocal() + getAPIPath() + "Agent/Google/Agent_HILLSHADE3857_IV.aspx",
        SEGISMAP: getWebProtocal() + getAPIPath() + "Agent/Google/Agent_SEGISMAP3857_IV.aspx",
        HILLSHADEMIX: getWebProtocal() + getAPIPath() + "Agent/Google/Agent_HILLSHADEMIX3857_IV.aspx"
    };
    TGOS.MapTypeBackgroundColor = {
        TGOSMAP: "#a5bfdd",
        NLSCMAP: "#a5bfdd",
        F2IMAGE: "#13437c",
        ROADMAP: "#13437c",
        HILLSHADE: "rgb(151,219,242)",
        SEGISMAP: "#a5bfdd",
        HILLSHADEMIX: "rgb(151,219,242)"
    };
    TGOS.MapTypeMaxZoomLevel = {
        EPSG3825: {
            TGOSMAP: 13,
            SEGISMAP: 12,
            NLSCMAP: 13
        },
        EPSG3826: {
            TGOSMAP: 13,
            SEGISMAP: 12,
            NLSCMAP: 13,
            F2IMAGE: 11,
            HILLSHADE: 8,
            ROADMAP: 11,
            HILLSHADEMIX: 8
        },
        EPSG3857: {
            TGOSMAP: 19,
            SEGISMAP: 18,
            NLSCMAP: 19,
            F2IMAGE: 17,
            HILLSHADE: 13,
            ROADMAP: 17,
            HILLSHADEMIX: 13
        }
    };
    var a = TGOS.TGMapServiceId;
    a.LANDUSE = "LANDUSE";
    a.REGION = "REGION";
    a.REGION_119 = "REGION_119";
    a.EOC = "EOC";
    a.FIREDEPARTMENT = "FIREDEPARTMENT";
    a.POLICEDEPARTMENT = "POLICEDEPARTMENT";
    a.NASC = "NASC";
    a.SOCIALSERVICE = "SOCIALSERVICE";
    a.SHELTERS = "SHELTERS";
    a.NASC_LANDING = "NASC_LANDING";
    a.INDUSTRY = "INDUSTRY";
    a.SCHOOL = "SCHOOL";
    a.DEBRISFLOW_P = "DEBRISFLOW_P";
    a.MEDICAL = "MEDICAL";
    a = TGOS.TGMapId;
    a.LANDUSE = "LANDUSE";
    a.COUNTY = "COUNTY";
    a.TOWN = "TOWN";
    a.VILLAGE = "VILLAGE";
    a.EOC = "EOC";
    a.FIREDEPARTMENT = "FIREDEPARTMENT";
    a.POLICEDEPARTMENT = "POLICEDEPARTMENT";
    a.NASC = "NASC";
    a.SOCIALSERVICE = "SOCIALSERVICE";
    a.SHELTERS = "SHELTERS";
    a.NASC_LANDING = "NASC_LANDING";
    a.INDUSTRY = "INDUSTRY";
    a.INDUSTRY_A = "INDUSTRY_A";
    a.INDUSTRY_B = "INDUSTRY_B";
    a.INDUSTRY_C = "INDUSTRY_C";
    a.INDUSTRY_D = "INDUSTRY_D";
    a.INDUSTRY_E = "INDUSTRY_E";
    a.INDUSTRY_F = "INDUSTRY_F";
    a.INDUSTRY_G =
        "INDUSTRY_G";
    a.INDUSTRY_H = "INDUSTRY_H";
    a.INDUSTRY_I = "INDUSTRY_I";
    a.INDUSTRY_J = "INDUSTRY_J";
    a.INDUSTRY_K = "INDUSTRY_K";
    a.INDUSTRY_L = "INDUSTRY_L";
    a.INDUSTRY_M = "INDUSTRY_M";
    a.INDUSTRY_N = "INDUSTRY_N";
    a.INDUSTRY_O = "INDUSTRY_O";
    a.INDUSTRY_P = "INDUSTRY_P";
    a.INDUSTRY_Q = "INDUSTRY_Q";
    a.INDUSTRY_R = "INDUSTRY_R";
    a.INDUSTRY_S = "INDUSTRY_S";
    a.MEDICAL = "MEDICAL";
    a.SCHOOL = "SCHOOL";
    a.SCHOOL_A = "SCHOOL_A";
    a.SCHOOL_B = "SCHOOL_B";
    a.SCHOOL_C = "SCHOOL_C";
    a.SCHOOL_D = "SCHOOL_D";
    a.SCHOOL_E = "SCHOOL_E";
    a.SCHOOL_F = "SCHOOL_F";
    a.SCHOOL_G =
        "SCHOOL_G";
    a.SCHOOL_H = "SCHOOL_H";
    a.SCHOOL_I = "SCHOOL_I";
    a.SCHOOL_J = "SCHOOL_J";
    a.SCHOOL_K = "SCHOOL_K";
    a.SCHOOL_L = "SCHOOL_L";
    a.SCHOOL_M = "SCHOOL_M";
    a.SCHOOL_N = "SCHOOL_N";
    a.DEBRISFLOW_P = "DEBRISFLOW_P";
    TGOS.MapIdInfo.DEBRISFLOW_P = {
        resource: "DEBRISFLOW_P.cfg",
        layers: {
            DEBRISFLOW_P: {
                name: "dbo.DEBRISFLOW_P",
                oname: "dbo.DEBRISFLOW_P_201208A",
                identify: {
                    DEBRISNO: "DEBRISNO",
                    COUNTY01: "COUNTY01",
                    TOWN01: "TOWN01",
                    VILL01: "VILL01",
                    NAME: "NAME",
                    MARK: "MARK",
                    ROADNAME: "ROADNAME",
                    DW_NUMBER: "DW_NUMBER",
                    POTENTIAL: "POTENTIAL"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/18_DEBRISFLOW_P.png",
                    symbolName: "\u571f\u77f3\u6d41\u6f5b\u52e2\u6eaa\u6d41\u5716"
                }]
            }
        }
    };
    TGOS.MapIdInfo.LANDUSE = {
        tileoverlay: {
            path: getWebProtocal() + getAPIPath() + "/TGOS_WMTS/TWD97/SimpleWMTS_LANDUSE3826.aspx",
            layer: "Map",
            matrixSet: "TGOS97_LANDUSE.cfg"
        },
        resource: "LANDUSE.cfg",
        layers: {
            LANDUSE: {
                name: "dbo.LANDUSE",
                oname: "dbo.LANDUSE_201207A",
                identify: {
                    LCODE_C1: "LCODE_C1",
                    LCODE_C2: "LCODE_C2",
                    LCODE_C3: "LCODE_C3"
                }
            }
        }
    };
    TGOS.MapIdInfo.REGION = {
        path: getWebProtocal() + getServicePath() + "REGION/Agent.aspx",
        resource: "REGION.cfg",
        layers: {
            COUNTY: {
                name: "dbo.COUNTY",
                oname: "dbo.COUNTY_201211C",
                identify: {
                    PRO_ID: "PRO_ID",
                    COUNTY_ID: "COUNTY_ID",
                    COUNTY: "COUNTY"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/16_REGION_A.png",
                    symbolName: "\u7e23\u5e02"
                }]
            },
            TOWN: {
                name: "dbo.TOWN",
                oname: "dbo.TOWN_201211C",
                identify: {
                    PRO_ID: "PRO_ID",
                    COUNTY_ID: "COUNTY_ID",
                    TOWN_ID: "TOWN_ID",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/16_REGION_B.png",
                    symbolName: "\u9109\u93ae\u5e02\u5340"
                }]
            },
            VILLAGE: {
                name: "dbo.VILLAGE",
                oname: "dbo.VILLAGE_201211C",
                identify: {
                    UID: "UID",
                    PRO_ID: "PRO_ID",
                    COUNTY_ID: "COUNTY_ID",
                    TOWN_ID: "TOWN_ID",
                    VILLAGE_ID: "VILLAGE_ID",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    VILLAGE: "VILLAGE"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/16_REGION_C.png",
                    symbolName: "\u6751\u91cc"
                }]
            }
        }
    };
    TGOS.MapIdInfo.REGION_119 = {
        path: getWebProtocal() + getServicePath() + "REGION/Agent.aspx",
        resource: "REGION_119.cfg",
        layers: {
            COUNTY: {
                name: "dbo.COUNTY",
                oname: "dbo.COUNTY_201211C",
                identify: {
                    PRO_ID: "PRO_ID",
                    COUNTY_ID: "COUNTY_ID",
                    COUNTY: "COUNTY"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/16_REGION_A.png",
                    symbolName: "\u7e23\u5e02"
                }]
            },
            TOWN: {
                name: "dbo.TOWN",
                oname: "dbo.TOWN_201211C",
                identify: {
                    PRO_ID: "PRO_ID",
                    COUNTY_ID: "COUNTY_ID",
                    TOWN_ID: "TOWN_ID",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/16_REGION_B.png",
                    symbolName: "\u9109\u93ae\u5e02\u5340"
                }]
            },
            VILLAGE: {
                name: "dbo.VILLAGE",
                oname: "dbo.VILLAGE_201211C",
                identify: {
                    UID: "UID",
                    PRO_ID: "PRO_ID",
                    COUNTY_ID: "COUNTY_ID",
                    TOWN_ID: "TOWN_ID",
                    VILLAGE_ID: "VILLAGE_ID",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    VILLAGE: "VILLAGE"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/16_REGION_C.png",
                    symbolName: "\u6751\u91cc"
                }]
            }
        }
    };
    TGOS.MapIdInfo.EOC = {
        path: getWebProtocal() + getServicePath() + "EOC/Agent.aspx",
        resource: "EOC.cfg",
        layers: {
            EOC: {
                name: "dbo.EOC",
                oname: "dbo.EOC_201205A",
                identify: {
                    NAME: "NAME",
                    ADDRESS: "ADDRESS",
                    CONTACT: "CONTACT",
                    NOTE: "NOTE"
                },
                buffer: {
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    CONTACT: "CONTACT",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    CONTACT: "CONTACT",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/21_EOC.png",
                    symbolName: "\u4e2d\u592e\u8207\u5730\u65b9\u7dca\u6025\u61c9\u8b8a\u4e2d\u5fc3"
                }]
            }
        }
    };
    TGOS.MapIdInfo.FIREDEPARTMENT = {
        resource: "FIREDEPARTMENT.cfg",
        layers: {
            FIREDEPARTMENT: {
                name: "dbo.FIREDEPARTMENT",
                oname: "dbo.FIREDEPARTMENT_201206A",
                identify: {
                    TYPE: "TYPE",
                    NAME: "NAME",
                    ADDRESS: "ADDRESS",
                    CONTACT: "CONTACT"
                },
                buffer: {
                    TYPE: "TYPE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    CONTACT: "CONTACT",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    TYPE: "TYPE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    CONTACT: "CONTACT",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/22_FIREDEPARTMENT.png",
                    symbolName: "\u5168\u570b\u6d88\u9632\u6a5f\u95dc"
                }]
            }
        }
    };
    TGOS.MapIdInfo.POLICEDEPARTMENT = {
        resource: "POLICEDEPARTMENT.cfg",
        layers: {
            POLICEDEPARTMENT: {
                name: "dbo.POLICEDEPARTMENT",
                oname: "dbo.POLICEDEPARTMENT_201208A",
                identify: {
                    NAME: "NAME",
                    CONTACT: "CONTACT",
                    ADDRESS: "ADDRESS"
                },
                buffer: {
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    CONTACT: "CONTACT",
                    ADDRESS: "ADDRESS",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    CONTACT: "CONTACT",
                    ADDRESS: "ADDRESS",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/23_POLICEDEPARTMENT.png",
                    symbolName: "\u5168\u570b\u8b66\u5bdf\u6a5f\u95dc"
                }]
            }
        }
    };
    TGOS.MapIdInfo.NASC = {
        resource: "NASC.cfg",
        layers: {
            NASC: {
                name: "dbo.NASC",
                oname: "dbo.NASC_201204A",
                identify: {
                    NAME1: "NAME1",
                    NAME2: "NAME2",
                    ADDRESS: "ADDRESS"
                },
                buffer: {
                    NAME2: "NAME2",
                    NAME1: "NAME1",
                    AREA: "AREA",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    NAME2: "NAME2",
                    NAME1: "NAME1",
                    AREA: "AREA",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/24_NASC.png",
                    symbolName: "\u7a7a\u4e2d\u52e4\u52d9\u7e3d\u968a"
                }]
            }
        }
    };
    TGOS.MapIdInfo.SOCIALSERVICE = {
        resource: "SOCIALSERVICE.cfg",
        layers: {
            SOCIALSERVICE: {
                name: "dbo.SOCIALSERVICE",
                oname: "dbo.SOCIALSERVICE_201206A",
                identify: {
                    TYPE: "TYPE",
                    NAME: "NAME",
                    ADDRESS: "ADDRESS",
                    CHARGE: "CHARGE",
                    CONTACT: "CONTACT",
                    FILINGDATE: "FILINGDATE",
                    URL: "URL",
                    REMARK: "REMARK"
                },
                buffer: {
                    TYPE: "TYPE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    CHARGE: "CHARGE",
                    CONTACT: "CONTACT",
                    FILINGDATE: "FILINGDATE",
                    URL: "URL",
                    REMARK: "REMARK",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    TYPE: "TYPE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    CHARGE: "CHARGE",
                    CONTACT: "CONTACT",
                    FILINGDATE: "FILINGDATE",
                    URL: "URL",
                    REMARK: "REMARK",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/25_AGED.png",
                    symbolName: "\u8001\u4eba\u798f\u5229\u6a5f\u69cb"
                }, {
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/25_DISABLED.png",
                    symbolName: "\u8eab\u969c\u6a5f\u69cb"
                }]
            }
        }
    };
    TGOS.MapIdInfo.SHELTERS = {
        resource: "SHELTERS.cfg",
        layers: {
            SHELTERS: {
                oname: "dbo.SHELTERS_201204A",
                name: "dbo.SHELTERS",
                identify: {
                    ID: "ID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    FLOODING: "FLOODING",
                    EARTHQUAKE: "EARTHQUAKE",
                    DEBRISFLOW: "DEBRISFLOW",
                    TSUNAMI: "TSUNAMI",
                    INTERIOR: "INTERIOR",
                    OUTDOOR: "OUTDOOR",
                    WEAKPEOPLE: "WEAKPEOPLE",
                    NUMBERS: "NUMBERS",
                    NUCLEAR: "NUCLEAR"
                },
                buffer: {
                    ID: "ID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    FLOODING: "FLOODING",
                    EARTHQUAKE: "EARTHQUAKE",
                    DEBRISFLOW: "DEBRISFLOW",
                    TSUNAMI: "TSUNAMI",
                    INTERIOR: "INTERIOR",
                    OUTDOOR: "OUTDOOR",
                    WEAKPEOPLE: "WEAKPEOPLE",
                    NUMBERS: "NUMBERS",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N",
                    NUCLEAR: "NUCLEAR"
                },
                query: {
                    ID: "ID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    FLOODING: "FLOODING",
                    EARTHQUAKE: "EARTHQUAKE",
                    DEBRISFLOW: "DEBRISFLOW",
                    TSUNAMI: "TSUNAMI",
                    INTERIOR: "INTERIOR",
                    OUTDOOR: "OUTDOOR",
                    WEAKPEOPLE: "WEAKPEOPLE",
                    NUMBERS: "NUMBERS",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N",
                    NUCLEAR: "NUCLEAR"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/28_SHELTERS.png",
                    symbolName: "\u907f\u96e3\u6536\u5bb9\u8655\u6240"
                }]
            }
        }
    };
    TGOS.MapIdInfo.NASC_LANDING = {
        resource: "NASC_LANDING.cfg",
        layers: {
            NASC_LANDING: {
                name: "dbo.NASC_LANDING",
                oname: "dbo.NASC_LANDING_201206A",
                identify: {
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN"
                },
                buffer: {
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/29_NASC_LANDING.png",
                    symbolName: "\u76f4\u5347\u6a5f\u7dca\u6025\u6551\u96e3\u81e8\u6642\u8d77\u964d\u5834"
                }]
            }
        }
    };
    TGOS.MapIdInfo.INDUSTRY = {
        resource: "INDUSTRY.cfg",
        layers: {
            INDUSTRY: {
                name: "dbo.INDUSTRY",
                oname: "dbo.INDUSTRY_201204A",
                identify: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI"
                },
                buffer: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/31_INDUSTRY.png",
                    symbolName: "\u5de5\u5546\u4f01\u696d"
                }]
            },
            INDUSTRY_A: {
                name: "dbo.INDUSTRY_A",
                oname: "dbo.INDUSTRY_A",
                identify: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI"
                },
                buffer: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/31_INDUSTRY_A.png",
                    symbolName: "\u5de5\u5546\u4f01\u696d\u2500\u8fb2\u3001\u6797\u3001\u6f01\u3001\u7267\u696d"
                }]
            },
            INDUSTRY_B: {
                name: "dbo.INDUSTRY_B",
                oname: "dbo.INDUSTRY_B",
                identify: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI"
                },
                buffer: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/31_INDUSTRY_B.png",
                    symbolName: "\u5de5\u5546\u4f01\u696d\u2500\u7926\u696d\u53ca\u571f\u77f3\u63a1\u53d6\u696d"
                }]
            },
            INDUSTRY_C: {
                name: "dbo.INDUSTRY_C",
                oname: "dbo.INDUSTRY_C",
                identify: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI"
                },
                buffer: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/31_INDUSTRY_C.png",
                    symbolName: "\u5de5\u5546\u4f01\u696d\u2500\u88fd\u9020\u696d"
                }]
            },
            INDUSTRY_D: {
                name: "dbo.INDUSTRY_D",
                oname: "dbo.INDUSTRY_D",
                identify: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI"
                },
                buffer: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/31_INDUSTRY_D.png",
                    symbolName: "\u5de5\u5546\u4f01\u696d\u2500\u96fb\u529b\u53ca\u71c3\u6c23\u4f9b\u61c9\u696d"
                }]
            },
            INDUSTRY_E: {
                name: "dbo.INDUSTRY_E",
                oname: "dbo.INDUSTRY_E",
                identify: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI"
                },
                buffer: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/31_INDUSTRY_E.png",
                    symbolName: "\u5de5\u5546\u4f01\u696d\u2500\u7528\u6c34\u4f9b\u61c9\u53ca\u6c61\u67d3\u6574\u6cbb\u696d"
                }]
            },
            INDUSTRY_F: {
                name: "dbo.INDUSTRY_F",
                oname: "dbo.INDUSTRY_F",
                identify: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI"
                },
                buffer: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/31_INDUSTRY_F.png",
                    symbolName: "\u5de5\u5546\u4f01\u696d\u2500\u71df\u9020\u696d"
                }]
            },
            INDUSTRY_G: {
                name: "dbo.INDUSTRY_G",
                oname: "dbo.INDUSTRY_G",
                identify: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI"
                },
                buffer: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/31_INDUSTRY_G.png",
                    symbolName: "\u5de5\u5546\u4f01\u696d\u2500\u6279\u767c\u53ca\u96f6\u552e\u696d"
                }]
            },
            INDUSTRY_H: {
                name: "dbo.INDUSTRY_H",
                oname: "dbo.INDUSTRY_H",
                identify: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI"
                },
                buffer: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/31_INDUSTRY_H.png",
                    symbolName: "\u5de5\u5546\u4f01\u696d\u2500\u904b\u8f38\u53ca\u5009\u5132\u696d"
                }]
            },
            INDUSTRY_I: {
                name: "dbo.INDUSTRY_I",
                oname: "dbo.INDUSTRY_I",
                identify: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI"
                },
                buffer: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/31_INDUSTRY_I.png",
                    symbolName: "\u5de5\u5546\u4f01\u696d\u2500\u4f4f\u5bbf\u53ca\u9910\u98f2\u696d"
                }]
            },
            INDUSTRY_J: {
                name: "dbo.INDUSTRY_J",
                oname: "dbo.INDUSTRY_J",
                identify: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI"
                },
                buffer: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/31_INDUSTRY_J.png",
                    symbolName: "\u5de5\u5546\u4f01\u696d\u2500\u8cc7\u8a0a\u53ca\u901a\u8a0a\u50b3\u64ad\u696d"
                }]
            },
            INDUSTRY_K: {
                name: "dbo.INDUSTRY_K",
                oname: "dbo.INDUSTRY_K",
                identify: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI"
                },
                buffer: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/31_INDUSTRY_K.png",
                    symbolName: "\u5de5\u5546\u4f01\u696d\u2500\u91d1\u878d\u53ca\u4fdd\u96aa\u696d"
                }]
            },
            INDUSTRY_L: {
                name: "dbo.INDUSTRY_L",
                oname: "dbo.INDUSTRY_L",
                identify: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI"
                },
                buffer: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/31_INDUSTRY_L.png",
                    symbolName: "\u5de5\u5546\u4f01\u696d\u2500\u4e0d\u52d5\u7522\u696d"
                }]
            },
            INDUSTRY_M: {
                name: "dbo.INDUSTRY_M",
                oname: "dbo.INDUSTRY_M",
                identify: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI"
                },
                buffer: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/31_INDUSTRY_M.png",
                    symbolName: "\u5de5\u5546\u4f01\u696d\u2500\u5c08\u696d\u3001\u79d1\u5b78\u53ca\u6280\u8853\u670d\u52d9\u696d"
                }]
            },
            INDUSTRY_N: {
                name: "dbo.INDUSTRY_N",
                oname: "dbo.INDUSTRY_N",
                identify: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI"
                },
                buffer: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/31_INDUSTRY_N.png",
                    smybolName: "\u5de5\u5546\u4f01\u696d\u2500\u652f\u63f4\u670d\u52d9\u696d"
                }]
            },
            INDUSTRY_O: {
                name: "dbo.INDUSTRY_O",
                oname: "dbo.INDUSTRY_O",
                identify: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI"
                },
                buffer: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/31_INDUSTRY_O.png",
                    symbolName: "\u5de5\u5546\u4f01\u696d\u2500\u516c\u5171\u884c\u653f\u53ca\u570b\u9632\uff1b\u5f37\u5236\u6027\u793e\u6703\u5b89\u5168"
                }]
            },
            INDUSTRY_P: {
                name: "dbo.INDUSTRY_P",
                oname: "dbo.INDUSTRY_P",
                identify: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI"
                },
                buffer: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/31_INDUSTRY_P.png",
                    symbolName: "\u5de5\u5546\u4f01\u696d\u2500\u6559\u80b2\u670d\u52d9\u696d"
                }]
            },
            INDUSTRY_Q: {
                name: "dbo.INDUSTRY_Q",
                oname: "dbo.INDUSTRY_Q",
                identify: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI"
                },
                buffer: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/31_INDUSTRY_Q.png",
                    symbolName: "\u5de5\u5546\u4f01\u696d\u2500\u91ab\u7642\u4fdd\u5065\u53ca\u793e\u6703\u5de5\u4f5c\u670d\u52d9\u696d"
                }]
            },
            INDUSTRY_R: {
                name: "dbo.INDUSTRY_R",
                oname: "dbo.INDUSTRY_R",
                identify: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI"
                },
                buffer: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/31_INDUSTRY_R.png",
                    symbolName: "\u5de5\u5546\u4f01\u696d\u2500\u85dd\u8853\u3001\u5a1b\u6a02\u53ca\u4f11\u9592\u670d\u52d9\u696d"
                }]
            },
            INDUSTRY_S: {
                name: "dbo.INDUSTRY_S",
                oname: "dbo.INDUSTRY_S",
                identify: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI"
                },
                buffer: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    RID: "RID",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    COMMERCEKI: "COMMERCEKI",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/31_INDUSTRY_S.png",
                    symbolName: "\u5de5\u5546\u4f01\u696d\u2500\u5176\u4ed6\u670d\u52d9\u696d"
                }]
            }
        }
    };
    TGOS.MapIdInfo.MEDICAL = {
        resource: "MEDICAL.cfg",
        layers: {
            MEDICAL: {
                name: "dbo.MEDICAL",
                oname: "dbo.MEDICAL_201304A",
                identify: {
                    NAME: "NAME",
                    ADDRESS: "ADDRESS",
                    CHARGE: "CHARGE",
                    CONTACT: "CONTACT"
                },
                buffer: {
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    CHARGE: "CHARGE",
                    CONTACT: "CONTACT",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    CHARGE: "CHARGE",
                    CONTACT: "CONTACT",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/27_MEDICAL.png",
                    symbolName: "\u91ab\u7642\u9662\u6240"
                }]
            }
        }
    };
    TGOS.MapIdInfo.SCHOOL = {
        resource: "SCHOOL.cfg",
        layers: {
            SCHOOL: {
                name: "dbo.SCHOOL",
                oname: "dbo.SCHOOL_201207A",
                identify: {
                    TYPE: "TYPE",
                    NAME: "NAME",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    WEBSITE: "WEBSITE"
                },
                buffer: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/32_SCHOOL.png",
                    symbolName: "\u5404\u7d1a\u5b78\u6821"
                }]
            },
            SCHOOL_A: {
                name: "dbo.SCHOOL_A",
                oname: "dbo.SCHOOL_A",
                identify: {
                    TYPE: "TYPE",
                    NAME: "NAME",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    WEBSITE: "WEBSITE"
                },
                buffer: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/32_SCHOOL_A.png",
                    symbolName: "\u5404\u7d1a\u5b78\u6821\u2500\u516c\u7acb\u5e7c\u7a1a\u5712"
                }]
            },
            SCHOOL_B: {
                name: "dbo.SCHOOL_B",
                oname: "dbo.SCHOOL_B",
                identify: {
                    TYPE: "TYPE",
                    NAME: "NAME",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    WEBSITE: "WEBSITE"
                },
                buffer: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/32_SCHOOL_B.png",
                    symbolName: "\u5404\u7d1a\u5b78\u6821\u2500\u570b\u6c11\u5c0f\u5b78"
                }]
            },
            SCHOOL_C: {
                name: "dbo.SCHOOL_C",
                oname: "dbo.SCHOOL_C",
                identify: {
                    TYPE: "TYPE",
                    NAME: "NAME",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    WEBSITE: "WEBSITE"
                },
                buffer: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/32_SCHOOL_C.png",
                    symbolName: "\u5404\u7d1a\u5b78\u6821\u2500\u9644\u8a2d\u570b\u6c11\u5c0f\u5b78"
                }]
            },
            SCHOOL_D: {
                name: "dbo.SCHOOL_D",
                oname: "dbo.SCHOOL_D",
                identify: {
                    TYPE: "TYPE",
                    NAME: "NAME",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    WEBSITE: "WEBSITE"
                },
                buffer: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/32_SCHOOL_D.png",
                    symbolName: "\u5404\u7d1a\u5b78\u6821\u2500\u570b\u6c11\u4e2d\u5b78"
                }]
            },
            SCHOOL_E: {
                name: "dbo.SCHOOL_E",
                oname: "dbo.SCHOOL_E",
                identify: {
                    TYPE: "TYPE",
                    NAME: "NAME",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    WEBSITE: "WEBSITE"
                },
                buffer: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/32_SCHOOL_E.png",
                    symbolName: "\u5404\u7d1a\u5b78\u6821\u2500\u9644\u8a2d\u570b\u6c11\u4e2d\u5b78"
                }]
            },
            SCHOOL_F: {
                name: "dbo.SCHOOL_F",
                oname: "dbo.SCHOOL_F",
                identify: {
                    TYPE: "TYPE",
                    NAME: "NAME",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    WEBSITE: "WEBSITE"
                },
                buffer: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/32_SCHOOL_F.png",
                    symbolName: "\u5404\u7d1a\u5b78\u6821\u2500\u9ad8\u7d1a\u4e2d\u5b78"
                }]
            },
            SCHOOL_G: {
                name: "dbo.SCHOOL_G",
                oname: "dbo.SCHOOL_G",
                identify: {
                    TYPE: "TYPE",
                    NAME: "NAME",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    WEBSITE: "WEBSITE"
                },
                buffer: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/32_SCHOOL_G.png",
                    symbolName: "\u5404\u7d1a\u5b78\u6821\u2500\u9ad8\u7d1a\u8077\u696d\u5b78\u6821"
                }]
            },
            SCHOOL_H: {
                name: "dbo.SCHOOL_H",
                oname: "dbo.SCHOOL_H",
                identify: {
                    TYPE: "TYPE",
                    NAME: "NAME",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    WEBSITE: "WEBSITE"
                },
                buffer: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/32_SCHOOL_H.png",
                    symbolName: "\u5404\u7d1a\u5b78\u6821\u2500\u5927\u5c08\u9662\u6821"
                }]
            },
            SCHOOL_I: {
                name: "dbo.SCHOOL_I",
                oname: "dbo.SCHOOL_I",
                identify: {
                    TYPE: "TYPE",
                    NAME: "NAME",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    WEBSITE: "WEBSITE"
                },
                buffer: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/32_SCHOOL_I.png",
                    symbolName: "\u5404\u7d1a\u5b78\u6821\u2500\u5b97\u6559\u7814\u4fee\u5b78\u9662"
                }]
            },
            SCHOOL_J: {
                name: "dbo.SCHOOL_J",
                oname: "dbo.SCHOOL_J",
                identify: {
                    TYPE: "TYPE",
                    NAME: "NAME",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    WEBSITE: "WEBSITE"
                },
                buffer: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/32_SCHOOL_J.png",
                    symbolName: "\u5404\u7d1a\u5b78\u6821\u2500\u8ecd\u8b66\u5927\u5c08\u9662\u6821"
                }]
            },
            SCHOOL_K: {
                name: "dbo.SCHOOL_K",
                oname: "dbo.SCHOOL_K",
                identify: {
                    TYPE: "TYPE",
                    NAME: "NAME",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    WEBSITE: "WEBSITE"
                },
                buffer: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/32_SCHOOL_K.png",
                    symbolName: "\u5404\u7d1a\u5b78\u6821\u2500\u7279\u6b8a\u6559\u80b2\u5b78\u6821"
                }]
            },
            SCHOOL_L: {
                name: "dbo.SCHOOL_L",
                oname: "dbo.SCHOOL_L",
                identify: {
                    TYPE: "TYPE",
                    NAME: "NAME",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    WEBSITE: "WEBSITE"
                },
                buffer: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/32_SCHOOL_L.png",
                    symbolName: "\u5404\u7d1a\u5b78\u6821\u2500\u570b\u4e2d\u5c0f\u88dc\u6821"
                }]
            },
            SCHOOL_M: {
                name: "dbo.SCHOOL_M",
                oname: "dbo.SCHOOL_M",
                identify: {
                    TYPE: "TYPE",
                    NAME: "NAME",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    WEBSITE: "WEBSITE"
                },
                buffer: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/32_SCHOOL_M.png",
                    symbolName: "\u5404\u7d1a\u5b78\u6821\u2500\u9ad8\u4e2d\u8077\u9032\u4fee\u5b78\u6821"
                }]
            },
            SCHOOL_N: {
                name: "dbo.SCHOOL_N",
                oname: "dbo.SCHOOL_N",
                identify: {
                    TYPE: "TYPE",
                    NAME: "NAME",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    WEBSITE: "WEBSITE"
                },
                buffer: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                query: {
                    TYPE: "TYPE",
                    CODE: "CODE",
                    NAME: "NAME",
                    COUNTY: "COUNTY",
                    TOWN: "TOWN",
                    ADDRESS: "ADDRESS",
                    TEL: "TEL",
                    AREA: "AREA",
                    WEBSITE: "WEBSITE",
                    CLASS: "CLASS",
                    AWAY: "AWAY",
                    NOTE: "NOTE",
                    X_97121: "X_97121",
                    Y_97121: "Y_97121",
                    X_97119: "X_97119",
                    Y_97119: "Y_97119",
                    E: "E",
                    N: "N"
                },
                legends: [{
                    iconUrl: "http://api.tgos.nat.gov.tw/TGOS_API/ThemeLegend/32_SCHOOL_N.png",
                    symbolName: "\u5404\u7d1a\u5b78\u6821\u2500\u7a7a\u5927\u53ca\u5927\u5c08\u6821\u9662\u9644\u8a2d\u9032\u4fee\u5b78\u6821"
                }]
            }
        }
    }
})();
TGOS.PROXY_LOCAL = "http://localhost:49937/tgproxy.ashx";
TGOS.PROXY_SERVICE = getWebProtocal() + getAPIPath() + "proxyservice/proxy.aspx";
TGOS.PROXY_SERVICE2 = getWebProtocal() + getAPIPath() + "proxyservice/tgproxy.ashx";
TGOS.LOCATOR_SERVICE = getWebProtocal() + getServicePath() + "addresslocator/locate.aspx";
TGOS.STATISTICS_SERVICE = getWebProtocal() + getAPIPath() + "TGDistrict/statistics.aspx";
TGOS.STATISTICS_SERVICE2 = getWebProtocal() + getAPIPath() + "TGDistrict/statistics2.aspx";
TGOS.ADDRESSLOCATE_SERVICE = getWebProtocal() + getServicePath() + "TGAddress/TGAddress.aspx";
TGOS.QUERY_SERVICE = getWebProtocal() + getServicePath() + "TGQuery/TGQuery.ashx";
TGOS.TGKML_ATTR_SERVICE = getWebProtocal() + getAPIPath() + "SGSPWS/TGKMLService.ashx/TGQueryService";
TGOS.TGKML_BUFFER_SERVICE = getWebProtocal() + getAPIPath() + "SGSPWS/TGKMLService.ashx/TGBufferService";
TGOS.TGBufferStatus = {
    ERROR: "ERROR",
    INVALID_REQUEST: "INVALID_REQUEST",
    OK: "OK",
    OVER_QUERY_LIMIT: "OVER_QUERY_LIMIT",
    REQUEST_DENIED: "REQUEST_DENIED",
    UNKNOWN_ERROR: "UNKNOWN_ERROR",
    ZERO_RESULTS: "ZERO_RESULTS"
};
TGOS.TGQueryStatus = {
    ERROR: "ERROR",
    INVALID_REQUEST: "INVALID_REQUEST",
    OK: "OK",
    OVER_QUERY_LIMIT: "OVER_QUERY_LIMIT",
    REQUEST_DENIED: "REQUEST_DENIED",
    UNKNOWN_ERROR: "UNKNOWN_ERROR",
    ZERO_RESULTS: "ZERO_RESULTS"
};
TGOS.TGIdentifyStatus = {
    ERROR: "ERROR",
    INVALID_REQUEST: "INVALID_REQUEST",
    OK: "OK",
    OVER_QUERY_LIMIT: "OVER_QUERY_LIMIT",
    REQUEST_DENIED: "REQUEST_DENIED",
    UNKNOWN_ERROR: "UNKNOWN_ERROR",
    ZERO_RESULTS: "ZERO_RESULTS"
};
TGOS.TGLocatorStatus = {
    ERROR: "ERROR",
    INVALID_REQUEST: "INVALID_REQUEST",
    OK: "OK",
    OVER_QUERY_LIMIT: "OVER_QUERY_LIMIT",
    REQUEST_DENIED: "REQUEST_DENIED",
    UNKNOWN_ERROR: "UNKNOWN_ERROR",
    ZERO_RESULTS: "ZERO_RESULTS",
    TOO_MANY_RESULTS: "TOO_MANY_RESULTS"
};
TGOS.TGMeasureStatus = {
    ERROR: "ERROR",
    INVALID_REQUEST: "INVALID_REQUEST",
    OK: "OK",
    OVER_QUERY_LIMIT: "OVER_QUERY_LIMIT",
    REQUEST_DENIED: "REQUEST_DENIED",
    UNKNOWN_ERROR: "UNKNOWN_ERROR",
    INVALID_Coordinate: "INVALID_Coordinate"
};
TGOS.TGLocatorLocation = {
    APPROXIMATE: "APPROXIMATE",
    GEOMETRIC_CENTER: "GEOMETRIC_CENTER",
    RANGE_INTERPOLATED: "GEOMETRIC_CENTER",
    ROOFTOP: "ROOFTOP"
};
TGOS.TGUnitSystem = {
    IMPERIAL: "IMPERIAL",
    METRIC: "METRIC"
};
TGOS.TGStatMapId = {
    COUNTYMAP: "COUNTYMAP",
    TOWNMAP: "TOWNMAP",
    VILLAGEMAP: "VILLAGEMAP"
};
TGOS.TGStatServiceStatus = {
    ERROR: "ERROR",
    INVALID_REQUEST: "INVALID_REQUEST",
    OK: "OK",
    OVER_QUERY_LIMIT: "OVER_QUERY_LIMIT",
    REQUEST_DENIED: "REQUEST_DENIED",
    UNKNOWN_ERROR: "UNKNOWN_ERROR",
    ZERO_RESULTS: "ZERO_RESULTS"
};
TGOS.APPID = "jsQd5cZYrT+o/4aTN1kTTHsQoNHFMWxacSZ3zgiIWNro+dilR/dC8w==";
TGOS.Log = function(a, d, b) {
    a = getWebProtocal() + "api.tgos.nat.gov.tw/rec/count.aspx?AppID=" + TGOS.APPID + "&APIID=" + d + "&DataID=" + b;
    d = document.createElement("script");
    d.onload = function() {
        this.parentNode.removeChild(this)
    };
    d.type = "text/javascript";
    document.body.appendChild(d);
    d.src = a
};
TGOS.ajaxCount__ = 0;
(function() {
    var a = function(a, b, f) {
        a += 0 <= a.indexOf("?") ? "&" : "?";
        return a + (b + "=" + f)
    };
    TGOS.getJSON = function(d, b, f, e) {
        var g = {
                src: d
            },
            k = util.getInternetExplorerVersion(),
            l = "sn" + TGOS.ajaxCount__;
        TGOS.getJSON[l] = function() {
            b.apply(g, arguments);
            delete TGOS.getJSON[l]
        };
        f && (d = a(f, "serv", encodeURIComponent(d)));
        d = a(d, "keystr", encodeURIComponent(TGOS.tgHash));
        d = a(d, "jsonp", encodeURIComponent("TGOS.getJSON['" + l + "']"));
        f = document.getElementsByTagName("head");
        if (0 != f.length) {
            var h = document.createElement("script");
            h.type =
                "text/javascript";
            0 <= k && 8 >= k ? h.onreadystatechange = function() {
                this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (this.parentNode.removeChild(h), h = void 0)
            } : h.onload = function() {
                this.parentNode.removeChild(h);
                h = void 0
            };
            h.onerror = function() {
                e && e.call(this);
                this.parentNode.removeChild(h);
                h = void 0
            };
            TGOS.ajaxCount__++;
            h.src = d;
            f[0].appendChild(h)
        }
    }
})();
TGOS.loadJsonData = function(a, d, b, f, e) {
    var g = document.createElement("script");
    g.type = "text/javascript";
    document.body.appendChild(g);
    d = 0 <= d.indexOf("?") ? d + "&keystr=" + encodeURIComponent(TGOS.tgHash) : d + "?keystr=" + encodeURIComponent(TGOS.tgHash);
    d += "&rn=" + Math.floor(1E5 * Math.random() + 1);
    g.onreadystatechange = function() {
        "loaded" == this.readyState && b.call(this, dataObj)
    };
    g.onload = function() {
        b.call(this, dataObj);
        g.parentNode.removeChild(g);
        for (var a in g) delete g[a]
    };
    g.onerror = function() {
        f && f.call(this)
    };
    "" ==
    a ? g.src = d : (e && (g.src = a + "?serv=" + encodeURIComponent(d) + "&skip=true&hash=" + TGOS.tgHash), g.src = a + "?serv=" + encodeURIComponent(d))
};
TGOS.DistrictID = {
    U01COS01_201212A: "S01",
    U01COS02_201212A: "S02",
    U01COS03_201212A: "S03",
    U01COS04_201212A: "S04",
    U01COS05_201212A: "S05",
    U01TOS01_201212A: "S06",
    U01TOS02_201212A: "S07",
    U01TOS03_201212A: "S08",
    U01TOS04_201212A: "S09",
    U01TOS05_201212A: "S10",
    U01VIS01_201212A: "S11",
    U01VIS02_201212A: "S12",
    U01VIS03_201212A: "S13",
    U01VIS04_201212A: "S14",
    U01VIS05_201212A: "S15"
};
TGOS.TGDistrictStat = function() {
    this.stat = function(a, d, b, f) {
        var e = {
                getImageUrl: "",
                district: []
            },
            g = "";
        switch (a) {
            case TGOS.TGStatMapId.COUNTYMAP:
                g = "county";
                break;
            case TGOS.TGStatMapId.TOWNMAP:
                g = "town";
                break;
            case TGOS.TGStatMapId.VILLAGEMAP:
                g = "village"
        }
        var k = "string" == typeof b.layer ? b.layer : "",
            l = "string" == typeof b.code ? b.code : "",
            h = "ei";
        switch ("string" == typeof b.classifyMethod ? b.classifyMethod : "") {
            case "EqualInterval":
                h = "ei";
                break;
            case "Quantile":
                h = "qt";
                break;
            case "StanDevi":
                h = "sd"
        }
        var m = "number" == typeof b.classes ?
            b.classes.toString() : "",
            n = "green";
        switch (b.graduatedColor.toLowerCase()) {
            case "red":
                n = "red";
                break;
            case "yellow":
                n = "yellow";
                break;
            case "green":
                n = "green";
                break;
            case "blue":
                n = "blue"
        }
        var p = "number" == typeof b.height ? b.height.toString() : "",
            s = "number" == typeof b.width ? b.width.toString() : "";
        TGOS.getJSON(TGOS.STATISTICS_SERVICE2 + "?width=" + s + "&height=" + p + "&district=" + g + "&color=" + n + "&layer=" + k + "&code=" + l + "&method=" + h + "&classnum=" + m, function(a) {
            if (a && a.error) f.call(this, null, "REQUEST_DENIED");
            else {
                e.district =
                    a.district;
                e.legend = a.legend;
                var b = parseFloat(a.envelope.left),
                    d = parseFloat(a.envelope.top),
                    A = parseFloat(a.envelope.right);
                a = parseFloat(a.envelope.bottom);
                e.envelope = new TGOS.TGEnvelope(b, d, A, a);
                b = TGOS.STATISTICS_SERVICE + "?width=" + s + "&height=" + p + "&district=" + g + "&color=" + n + "&layer=" + k + "&code=" + l + "&method=" + h + "&classnum=" + m;
                b = 0 <= b.indexOf("?") ? b + "&keystr=" + encodeURIComponent(TGOS.tgHash) : b + "?keystr=" + encodeURIComponent(TGOS.tgHash);
                e.imageUrl = b;
                f.call(this, e, "OK");
                k in TGOS.DistrictID && TGOS.Log("web",
                    "A05", TGOS.DistrictID[k])
            }
        })
    }
};
TGOS.TGLocateService = function() {
    function a(a, b, d) {
        var f = [];
        new TGOS.TGTransformation;
        var h = "",
            m = "";
        switch (d) {
            case "84":
                m = "EPSG:4326";
                break;
            case "97_119":
                m = "EPSG:3825";
                break;
            default:
                m = "EPSG:3826"
        }
        TGOS.getJSON(TGOS.ADDRESSLOCATE_SERVICE + "?oAddress=" + a.address + "&oSRS=" + m + "&oResultDataType=jsonp&pnum=" + parseInt(a.pageNumber), function(a) {
            if (a && a.Info && a.Info.length)
                if (0 >= parseInt(a.Info[0].OutTotal)) h = TGOS.TGLocatorStatus.ZERO_RESULTS, b.call(this, null, h);
                else {
                    h = TGOS.TGLocatorStatus.OK;
                    30 < parseInt(a.Info[0].OutTotal) &&
                        (h = TGOS.TGLocatorStatus.TOO_MANY_RESULTS);
                    for (var e = 0; e < a.AddressList.length; e++) {
                        var m = {
                                addressComponents: [],
                                formattedAddress: "",
                                geometry: {
                                    bounds: "",
                                    location: "",
                                    locatorLocation: "",
                                    geometry: ""
                                },
                                types: []
                            },
                            q = parseFloat(a.AddressList[e].X),
                            v = parseFloat(a.AddressList[e].Y);
                        m.addressComponents = {
                            county: a.AddressList[e].COUNTY,
                            town: a.AddressList[e].TOWN,
                            village: a.AddressList[e].VILLAGE,
                            neighborhood: a.AddressList[e].NEIGHBORHOOD,
                            road: a.AddressList[e].ROAD,
                            section: a.AddressList[e].SECTION,
                            lane: a.AddressList[e].LANE,
                            alley: a.AddressList[e].ALLEY,
                            sub_alley: a.AddressList[e].SUB_ALLEY,
                            number: a.AddressList[e].NUMBER
                        };
                        m.formattedAddress = a.AddressList[e].FULL_ADDR;
                        m.geometry.location = new TGOS.TGPoint(q, v);
                        "84" == d ? (v = TGOS.WGS84ToGoo(m.geometry.location.x, m.geometry.location.y), q = TGOS.GooToWGS84(v.x - 500, v.y + 500), v = TGOS.GooToWGS84(v.x + 500, v.y - 500), m.geometry.viewport = new TGOS.TGEnvelope(q.x, q.y, v.x, v.y)) : m.geometry.viewport = new TGOS.TGEnvelope(q - 500, v + 500, q + 500, v - 500);
                        f.push(m)
                    }
                    b.call(this, f, h);
                    TGOS.Log("web", "A12", "")
                }
            else h =
                TGOS.TGLocatorStatus.ERROR, b.call(this, null, h)
        })
    }

    function d(a, b, d) {
        var f = [],
            h = new TGOS.TGTransformation,
            m = {
                addressComponents: [],
                formattedAddress: "",
                geometry: {
                    bounds: "",
                    location: "",
                    locatorLocation: "",
                    geometry: "",
                    viewPort: ""
                },
                types: []
            },
            n = a.town ? a.town : "",
            p = a.county ? a.county : "",
            p = p.replace("\u6843\u5712\u7e23", "\u6843\u5712\u5e02");
        srs = "84" == d ? "EPSG4326" : "97_119" == d ? "EPSG3825" : "EPSG3826";
        n = TGOS.LOCATOR_SERVICE + "?op=poi&keyword=" + a.poi + "&pnum=" + parseInt(a.pageNumber) + "&county=" + p + "&town=" + n + "&srs=" + srs;
        a.center && a.center instanceof TGOS.TGPoint && (n += "&center=" + a.center.x + "," + a.center.y);
        TGOS.getJSON(n, function(a) {
            if (a && a.error) b.call(this, f, "REQUEST_DENIED", 0, 0);
            else if (!a || !a.Table || 0 >= a.Table.length) b.call(this, f, TGOS.TGLocatorStatus.ZERO_RESULTS, 0, 0);
            else {
                for (var e = 0; e < a.Table.length; e++) {
                    m = {
                        addressComponents: [],
                        formattedAddress: "",
                        geometry: {
                            bounds: "",
                            location: "",
                            locatorLocation: "",
                            geometry: "",
                            viewPort: ""
                        },
                        types: []
                    };
                    var n = parseFloat(a.Table[e].X_97121),
                        p = parseFloat(a.Table[e].Y_97121);
                    if ("84" ==
                        d) {
                        var A, B;
                        h.twd97towgs84(n, p);
                        m.geometry.location = new TGOS.TGPoint(h.transResult.x, h.transResult.y);
                        h.twd97towgs84(n - 1E3, p + 1E3);
                        A = h.transResult.x;
                        B = h.transResult.y;
                        h.twd97towgs84(n + 1E3, p - 1E3);
                        p = h.transResult.x;
                        n = h.transResult.y;
                        m.geometry.viewport = new TGOS.TGEnvelope(A, B, p, n)
                    } else "97_119" == d ? (h.twd97towgs84(n, p), h.wgs84totwd97_119(h.transResult.x, h.transResult.y), m.geometry.location = new TGOS.TGPoint(h.transResult.x, h.transResult.y), h.twd97towgs84(n - 1E3, p + 1E3), h.wgs84totwd97_119(h.transResult.x, h.transResult.y),
                        A = h.transResult.x, B = h.transResult.y, h.twd97towgs84(n + 1E3, p - 1E3), h.wgs84totwd97_119(h.transResult.x, h.transResult.y), p = h.transResult.x, n = h.transResult.y, m.geometry.viewport = new TGOS.TGEnvelope(A, B, p, n)) : (m.geometry.viewport = new TGOS.TGEnvelope(n - 1E3, p + 1E3, n + 1E3, p - 1E3), m.geometry.location = new TGOS.TGPoint(n, p));
                    m.poiName = a.Table[e].LANDMARKNA;
                    m.county = a.Table[e].COUNTYNAME;
                    m.town = a.Table[e].TOWNNAME;
                    f.push(m)
                }
                b.call(this, f, 1 < a.pages ? TGOS.TGLocatorStatus.TOO_MANY_RESULTS : TGOS.TGLocatorStatus.OK, a.items,
                    a.pages);
                TGOS.Log("web", "A13", "")
            }
        })
    }

    function b(a, b, d) {
        var f = [],
            h = new TGOS.TGTransformation,
            m = a.town ? a.town : "",
            n = a.county ? a.county : "",
            n = n.replace("\u6843\u5712\u7e23", "\u6843\u5712\u5e02"),
            p;
        p = "84" == d ? "EPSG4326" : "97_119" == d ? "EPSG3825" : "EPSG3826";
        m = TGOS.LOCATOR_SERVICE + "?op=rd&road=" + a.roadLocation + "&pnum=" + parseInt(a.pageNumber) + "&county=" + n + "&town=" + m + "&srs=" + p;
        a.center && a.center instanceof TGOS.TGPoint && (m += "&center=" + a.center.x + "," + a.center.y);
        TGOS.getJSON(m, function(a) {
            if (a && a.error) b.call(this,
                f, "REQUEST_DENIED", 0, 0);
            else if (a && a.results) {
                for (r = 0; r < a.results.length; r++) {
                    var e = {
                            addressComponents: [],
                            formattedAddress: "",
                            geometry: {
                                bounds: "",
                                location: "",
                                locatorLocation: "",
                                geometry: "",
                                viewPort: ""
                            },
                            types: []
                        },
                        m = parseFloat(a.results[r].min_x),
                        n = parseFloat(a.results[r].min_y),
                        p = parseFloat(a.results[r].max_x),
                        B = parseFloat(a.results[r].max_y),
                        D = parseFloat(a.results[r].point_x),
                        y = parseFloat(a.results[r].point_y);
                    "84" == d ? (h.twd97towgs84(D, y), e.geometry.location = new TGOS.TGPoint(h.transResult.x, h.transResult.y),
                            h.twd97towgs84(m, B), m = h.transResult.x, B = h.transResult.y, h.twd97towgs84(p, n), p = h.transResult.x, n = h.transResult.y) : "97_119" == d ? (h.twd97towgs84(D, y), h.wgs84totwd97_119(h.transResult.x, h.transResult.y), e.geometry.location = new TGOS.TGPoint(h.transResult.x, h.transResult.y), h.twd97towgs84(m, B), h.wgs84totwd97_119(h.transResult.x, h.transResult.y), m = h.transResult.x, B = h.transResult.y, h.twd97towgs84(p, n), h.wgs84totwd97_119(h.transResult.x, h.transResult.y), p = h.transResult.x, n = h.transResult.y) : e.geometry.location =
                        new TGOS.TGPoint(D, y);
                    n = new TGOS.TGEnvelope(m, B, p, n);
                    e.geometry.viewport = n;
                    e.county = a.results[r].countyname;
                    e.town = a.results[r].townname;
                    e.formattedAddress = a.results[r].roadname;
                    f.push(e)
                }
                b.call(this, f, 1 < a.pages ? TGOS.TGLocatorStatus.TOO_MANY_RESULTS : TGOS.TGLocatorStatus.OK, a.items, a.pages);
                TGOS.Log("web", "A14", "")
            } else b.call(this, f, TGOS.TGLocatorStatus.ZERO_RESULTS, 0, 0)
        })
    }

    function f(a, b, d) {
        var f = [];
        new TGOS.TGTransformation;
        var h = {
            addressComponents: [],
            formattedAddress: "",
            geometry: {
                bounds: "",
                location: "",
                locatorLocation: "",
                geometry: "",
                viewport: ""
            },
            types: []
        };
        a = encodeURIComponent(a.district.replace("\u6843\u5712\u7e23", "\u6843\u5712\u5e02"));
        TGOS.getJSON(TGOS.LOCATOR_SERVICE + "?op=dist&district=" + a, function(a) {
            if (a && a.error) b.call(this, null, "REQUEST_DENIED");
            else if (a && "OK" == a.status) {
                var e = parseFloat(a.Information.x),
                    p = parseFloat(a.Information.y),
                    s = new TGOS.TGEnvelope(a.Information.minX, a.Information.maxY, a.Information.maxX, a.Information.minY);
                a = util.parsePolyWkt(a.Information.geometry);
                if ("84" == d) {
                    var q =
                        TGOS.TWD97toWGS84(s.left, s.top),
                        s = TGOS.TWD97toWGS84(s.right, s.bottom),
                        e = TGOS.TWD97toWGS84(e, p);
                    h.geometry.location = new TGOS.TGPoint(e.x, e.y);
                    h.geometry.viewport = new TGOS.TGEnvelope(q.x, q.y, s.x, s.y);
                    e = TGOS.Geometry.Transform(a, TGOS.TWD97toWGS84);
                    h.geometry.geometry = e
                } else "97_119" == d ? (q = TGOS.TWD97toTWD67(s.left, s.top), s = TGOS.TWD97toTWD67(s.right, s.bottom), e = TGOS.TWD97toTWD67(e, p), h.geometry.location = new TGOS.TGPoint(e.x, e.y), h.geometry.viewport = new TGOS.TGEnvelope(q.x, q.y, s.x, s.y), e = TGOS.Geometry.Transform(a,
                    TGOS.TWD97toTWD67), h.geometry.geometry = e) : (h.geometry.location = new TGOS.TGPoint(e, p), h.geometry.viewport = s, h.geometry.geometry = a);
                h.geometry && h.geometry.geometry && h.geometry.geometry.getBounds && (h.geometry.bounds = h.geometry.geometry.getBounds());
                f.push(h);
                b.call(this, f, TGOS.TGLocatorStatus.OK);
                TGOS.Log("web", "A15", "")
            } else b.call(this, null, TGOS.TGLocatorStatus.ZERO_RESULTS)
        })
    }
    this.locateWGS84 = function(e, g) {
        "undefined" != typeof e.address ? a(e, g, "84") : "undefined" != typeof e.poi ? d(e, g, "84") : "undefined" !=
            typeof e.roadLocation ? b(e, g, "84") : "undefined" != typeof e.district ? f(e, g, "84") : g.call(this, null, TGOS.TGLocatorStatus.INVALID_REQUEST)
    };
    this.locateTWD97 = function(e, g) {
        "undefined" != typeof e.address ? a(e, g, "97") : "undefined" != typeof e.poi ? d(e, g, "97") : "undefined" != typeof e.roadLocation ? b(e, g, "97") : "undefined" != typeof e.district ? f(e, g, "97") : g.call(this, null, TGOS.TGLocatorStatus.INVALID_REQUEST)
    };
    this.locateTWD97_119 = function(e, g) {
        "undefined" != typeof e.address ? a(e, g, "97_119") : "undefined" != typeof e.poi ? d(e,
            g, "97_119") : "undefined" != typeof e.roadLocation ? b(e, g, "97_119") : "undefined" != typeof e.district ? f(e, g, "97_119") : g.call(this, null, TGOS.TGLocatorStatus.INVALID_REQUEST)
    };
    this.setCenter = function(a, b) {
        a.setCenter(b)
    };
    this.fitBounds = function(a, b) {
        a.fitBounds(b)
    }
};
TGOS.TGMeasureService = function() {
    this.twd97LineMeasure = function(a, d) {
        var b, f;
        a instanceof TGOS.TGLineString ? (b = a.getLength(), f = "OK") : (b = null, f = "INVALID_REQUEST");
        d.call(this, b, f);
        TGOS.Log("web", "A07", "")
    };
    this.twd97PolygonMeasure = function(a, d) {
        var b, f;
        a instanceof TGOS.TGPolygon ? (b = a.getArea(), f = "OK") : (b = null, f = "INVALID_REQUEST");
        d.call(this, b, f);
        TGOS.Log("web", "A07", "")
    };
    this.twd97_119LineMeasure = function(a, d) {
        var b, f;
        a instanceof TGOS.TGLineString ? (b = a.getLength(), f = "OK") : (b = null, f = "INVALID_REQUEST");
        d.call(this, b, f);
        TGOS.Log("web", "A07", "")
    };
    this.twd97_119PolygonMeasure = function(a, d) {
        var b, f;
        a instanceof TGOS.TGPolygon ? (b = a.getArea(), f = "OK") : (b = null, f = "INVALID_REQUEST");
        d.call(this, b, f);
        TGOS.Log("web", "A07", "")
    };
    this.wgs84LineMeasure = function(a, d) {
        var b, f;
        b = new TGOS.TGTransformation;
        var e = [],
            g, k;
        if (a instanceof TGOS.TGLineString) {
            f = a.getPath();
            for (var l = 0; l < f.length; l++) b.wgs84totwd97(f[l].x, f[l].y), g = b.transResult.x, k = b.transResult.y, g = new TGOS.TGPoint(g, k), e.push(g);
            b = new TGOS.TGLineString(e);
            b = b.getLength();
            f = "OK"
        } else b = null, f = "INVALID_REQUEST";
        d.call(this, b, f);
        TGOS.Log("web", "A07", "")
    };
    this.wgs84PolygonMeasure = function(a, d) {
        var b, f;
        b = new TGOS.TGTransformation;
        var e = [],
            g, k;
        if (a instanceof TGOS.TGPolygon) {
            f = a.getExteriorRing().getPath().getPath();
            for (var l = 0; l < f.length; l++) b.wgs84totwd97(f[l].x, f[l].y), g = b.transResult.x, k = b.transResult.y, g = new TGOS.TGPoint(g, k), e.push(g);
            b = new TGOS.TGLineString(e);
            b = new TGOS.TGLinearRing(b);
            b = new TGOS.TGPolygon([b]);
            b = b.getArea();
            f = "OK"
        } else b = null, f =
            "INVALID_REQUEST";
        d.call(this, b, f);
        TGOS.Log("web", "A07", "")
    }
};
TGOS.TGTileOverlay = function() {
    var a = [],
        d, b = "auto";
    this.getLayerById = function(b) {
        for (var d = 0; d < a.length; d++)
            if (a[d].id == b) return a[d];
        return null
    };
    this.setZIndex = function(d) {
        b = d;
        for (d = 0; d < a.length; d++) a[d].setZIndex(b)
    };
    this.getZIndex = function() {
        return b
    };
    this.setTileOpacity = function(a, b) {
        if (null != this.getLayerById(b)) {
            if (null == this.getLayerById(b)) throw "Layer Not Found";
            this.getLayerById(b).setTileOpacity(a)
        }
    };
    this.removeTileOverlay = function(b) {
        if (null != this.getLayerById(b)) {
            d.removeLayer(this.getLayerById(b));
            for (var e = 0; e < a.length; e++) a[e].id == b && a.splice(e, 1)
        }
    };
    this.getThemeTile = function(b, e, g, k) {
        var l = this.getLayerById(b),
            h;
        if (l) {
            h = l.getTiles(e.left, e.top, e.right, e.bottom, e.scaleLevel, 0);
            g = [];
            for (var l = [], m = 0; m < h.length; m++) g.push(new TGOS.TGPoint(h[m].leftTop[0], h[m].leftTop[1])), l.push(h[m].url);
            k && k.call(this, {
                leftTopAnchor: g,
                imageUrl: l
            })
        } else {
            d = e.map;
            null != e.zIndex && this.setZIndex(e.zIndex);
            var l = getWebProtocal() + getAPIPath() + "Agent/TWD97/Agent_" + b + ".aspx",
                n = new MapCachedLayer(b, l, !1, this, "97",
                    function() {
                        h = n.getTiles(e.left, e.top, e.right, e.bottom, e.scaleLevel, 0);
                        for (var a = [], b = [], f = 0; f < h.length; f++) {
                            if (d.getCoordSys() == TGOS.TGCoordSys.EPSG3857) {
                                var g = TGOS.TWD97ToWGS84(h[f].leftTop[0], h[f].leftTop[1]);
                                a.push(new TGOS.TGPoint(g.x, g.y))
                            } else a.push(new TGOS.TGPoint(h[f].leftTop[0], h[f].leftTop[1]));
                            b.push(h[f].url)
                        }
                        k && k.call(this, {
                            leftTopAnchor: a,
                            imageUrl: b
                        })
                    });
            n.id = b;
            e.map.addLayer(n, !0);
            n.setZIndex(this.getZIndex());
            n.setOpacity(g);
            a.push(n);
            l = n;
            e.overlay || n.putVisible(!1)
        }
        b in TGOS.ThemeTileID &&
            TGOS.Log("web", "A03", TGOS.ThemeTileID[b])
    }
};
TGOS.TGThemeTileRequest = function() {
    this.bottom = this.top = this.right = this.left = null;
    this.map = this.overlay = !0;
    this.setScaleLevel = null
};
TGOS.TGThemeTileResult = function() {
    this.LeftTopAnchor = this.ImageUrl = null
};
TGOS.TGThemeLayer = function() {
    this.getThemePic = function(a, d, b, f) {
        b = TGOS.QUERY_SERVICE + "?op=image&res=" + TGOS.MapIdInfo[a].resource + "&layer=" + TGOS.MapIdInfo[a].layers[d].name + "&Left=" + b.left + "&Top=" + b.top + "&Right=" + b.right + "&Bottom=" + b.bottom + "&Width=" + b.width + "&Height=" + b.height + "&keystr=" + encodeURIComponent(TGOS.tgHash);
        f.call(this, b, "OK", TGOS.MapIdInfo[a].layers[d].legends);
        a in TGOS.ThemeLayerID && TGOS.Log("web", "A04", TGOS.ThemeLayerID[a])
    }
};
TGOS.TGThemePicRequest = function() {
    this.bottom = this.top = this.right = this.left = null;
    this.height = this.width = 256;
    this.setRange = function(a, d, b, f) {
        this.left = a;
        this.right = d;
        this.top = b;
        this.bottom = f
    };
    this.setImageSize = function(a, d) {
        this.height = a;
        this.width = d
    }
};
TGOS.TGFeatureIdentify = function() {
    function a(a) {
        return a.replace(/^[\s]*/gi, "").replace(/[\s]*$/gi, "")
    }
    this.identify = function(d, b, f, e, g) {
        function k(a, b) {
            var d = new TGOS.TGTransformation,
                e = [],
                f = a.indexOf("("),
                g = a.indexOf(")");
            f++;
            a = a.substring(f, g);
            f = a.split(",");
            for (g = 0; g < f.length; g++) {
                var h = f[g].split(" ");
                if (isNaN(h[0]) || isNaN(h[1])) return !1;
                b ? (d.twd97towgs84(parseFloat(h[0]), parseFloat(h[1])), e.push(new TGOS.TGPoint(d.transResult.x, d.transResult.y))) : e.push(new TGOS.TGPoint(parseFloat(h[0]), parseFloat(h[1])))
            }
            return new TGOS.TGLineString(e)
        }

        function l(a, b) {
            var d = a.indexOf("("),
                e = a.indexOf(")");
            d++;
            a = a.substring(d, e);
            d = a.split(" ");
            return isNaN(d[0]) || isNaN(d[1]) ? !1 : b ? (e = new TGOS.TGTransformation, e.twd97towgs84(parseFloat(d[0]), parseFloat(d[1])), new TGOS.TGPoint(e.transResult.x, e.transResult.y)) : new TGOS.TGPoint(parseFloat(d[0]), parseFloat(d[1]))
        }

        function h(a, b, d) {
            var e = a.indexOf("(");
            e++;
            for (var f = []; - 1 != e;) {
                var g = a.indexOf("))", e),
                    e = a.substring(e, g + 2);
                "MULTIPOINT" == b ? f.push(l(e, d)) : "MULTILINESTRING" == b ? f.push(k(e, d)) : "MULTIPOLYGON" ==
                    b && f.push(util.parsePolyWkt(e, d));
                e = a.indexOf("(", g - 1)
            }
            return f
        }

        function m(f) {
            var m = "";
            if (f) {
                f = f.Feature;
                var n = null,
                    p = [],
                    n = null,
                    q;
                for (q in TGOS.MapIdInfo[d].layers[b].identify) m = m + q + ",";
                x.fieldName = m;
                if ("undefined" == typeof f.length) {
                    p = [];
                    n = f.Values;
                    for (q in TGOS.MapIdInfo[d].layers[b].identify) {
                        var t = n[TGOS.MapIdInfo[d].layers[b].identify[q]];
                        p.push(t)
                    }
                    n = f.Geometry;
                    t = n.indexOf("(");
                    t = a(n.substr(0, t).toUpperCase());
                    x.featureType = t;
                    var u = "EPSG3857" == e;
                    if ("POINT" == t) var s = [l(n, u)];
                    else "LINESTRING" ==
                        t ? s = [k(n, u)] : "POLYGON" == t ? s = [util.parsePolyWkt(n)] : -1 != t.indexOf("MULTI") && (s = new h(n, t, u));
                    x.fieldAttr.push(p);
                    x.geometry = s
                } else
                    for (m = 0; m < f.length; m++) {
                        p = [];
                        n = f[m].Values;
                        for (q in TGOS.MapIdInfo[d].layers[b].identify) t = n[TGOS.MapIdInfo[d].layers[b].identify[q]], p.push(t);
                        n = f[m].Geometry;
                        t = n.indexOf("(");
                        t = a(n.substr(0, t).toUpperCase());
                        x.featureType = t;
                        u = "EPSG3857" == e;
                        "POINT" == t ? s = [l(n, u)] : "LINESTRING" == t ? s = [k(n, u)] : "POLYGON" == t ? s = [util.parsePolyWkt(n, u)] : -1 != t.indexOf("MULTI") && (s = new h(n, t, u));
                        x.fieldAttr.push(p);
                        x.geometry = s
                    }
                g.call(this, x, "OK");
                TGOS.Log("web", "A08", TGOS.ThemeLayerID[d])
            } else g.call(this, null, "ZERO_RESULTS")
        }

        function n() {
            var a = TGOS.QUERY_SERVICE + "?op=fid_s",
                a = a + "&layer=dbo.LANDUSE_201207A_1" + ("&res=" + TGOS.MapIdInfo[d].resource),
                a = a + ("&geom=POLYGON((" + A + "))");
            TGOS.getJSON(a, function(a) {
                a ? m(a) : (a = TGOS.QUERY_SERVICE + "?op=fid_s", a = a + "&layer=dbo.LANDUSE_201207A_2" + ("&res=" + TGOS.MapIdInfo[d].resource), a += "&geom=POLYGON((" + A + "))", TGOS.getJSON(a, function(a) {
                    m(a)
                }))
            })
        }
        if (f instanceof TGOS.TGPoint) {
            var p = new TGOS.TGPoint(0, 0),
                s = new TGOS.TGPoint(0, 0),
                q = new TGOS.TGPoint(0, 0),
                v = new TGOS.TGPoint(0, 0),
                x = {
                    fieldAttr: [],
                    geometry: []
                };
            p.x = f.x;
            p.y = f.y + 30;
            s.x = f.x + 30;
            s.y = f.y;
            q.x = f.x;
            q.y = f.y - 30;
            v.x = f.x - 30;
            v.y = f.y;
            var A = p.x + " " + p.y + "," + s.x + " " + s.y + "," + q.x + " " + q.y + "," + v.x + " " + v.y + "," + p.x + " " + p.y;
            "LANDUSE" == d ? n() : (p = TGOS.QUERY_SERVICE + "?op=fid", p += "&layer=" + TGOS.MapIdInfo[d].layers[b].name, p += "&res=" + TGOS.MapIdInfo[d].resource, p += "&cx=" + f.x, p += "&cy=" + f.y, TGOS.getJSON(p, function(f) {
                var m = "";
                if (f &&
                    f.error) g.call(this, null, "REQUEST_DENIED");
                else if (f && f.Feature) {
                    f = f.Feature;
                    var n = null,
                        p = [],
                        n = null,
                        q;
                    for (q in TGOS.MapIdInfo[d].layers[b].identify) m = m + q + ",";
                    x.fieldName = m;
                    if ("undefined" == typeof f.length) {
                        p = [];
                        n = f.Values;
                        for (q in TGOS.MapIdInfo[d].layers[b].identify) {
                            var t = n[TGOS.MapIdInfo[d].layers[b].identify[q]];
                            p.push(t)
                        }
                        n = f.Geometry;
                        t = n.indexOf("(");
                        t = a(n.substr(0, t).toUpperCase());
                        x.featureType = t;
                        var u = "EPSG3857" == e;
                        if ("POINT" == t) var s = [l(n, u)];
                        else "LINESTRING" == t ? s = [k(n, u)] : "POLYGON" == t ? s = [util.parsePolyWkt(n)] : -1 != t.indexOf("MULTI") && (s = new h(n, t, u));
                        x.fieldAttr.push(p);
                        x.geometry = s
                    } else
                        for (m = 0; m < f.length; m++) {
                            p = [];
                            n = f[m].Values;
                            for (q in TGOS.MapIdInfo[d].layers[b].identify) t = n[TGOS.MapIdInfo[d].layers[b].identify[q]], p.push(t);
                            n = f[m].Geometry;
                            t = n.indexOf("(");
                            t = a(n.substr(0, t).toUpperCase());
                            x.featureType = t;
                            u = "EPSG3857" == e;
                            "POINT" == t ? s = [l(n, u)] : "LINESTRING" == t ? s = [k(n, u)] : "POLYGON" == t ? s = [util.parsePolyWkt(n, u)] : -1 != t.indexOf("MULTI") && (s = new h(n, t, u));
                            x.fieldAttr.push(p);
                            x.geometry =
                                s
                        }
                    g.call(this, x, "OK");
                    TGOS.Log("web", "A08", TGOS.ThemeLayerID[d])
                } else g.call(this, null, "ZERO_RESULTS")
            }))
        } else g.call(this, null, "INVALID_REQUEST")
    }
};
TGOS.parsePointWKT = function(a) {
    var d = a.indexOf("("),
        b = a.indexOf(")");
    d++;
    a = a.substring(d, b);
    a = a.split(" ");
    return isNaN(a[0]) || isNaN(a[1]) ? !1 : new TGOS.TGPoint(parseFloat(a[0]), parseFloat(a[1]))
};
TGOS.TGAttriQuery = function() {
    this.identify = function(a, d, b, f, e) {
        var g = "",
            k = {},
            l = b.county,
            h = b.town,
            m = b.keyword;
        "" != h && "" == l ? (g = g + "[TOWN]='" + h + "'", m && (g = g + " AND [NAME] LIKE N'%" + m + "%'")) : "" == h && "" != l ? (g = g + "[COUNTY]='" + l.replace("\u53f0", "\u81fa") + "'", m && (g = g + " AND [NAME] LIKE N'%" + m + "%'")) : "" != h && "" != l ? (l && (g = g + "[TOWN]='" + h + "' AND [COUNTY]='" + l.replace("\u53f0", "\u81fa") + "'"), m && (g = g + " AND [NAME] LIKE N'%" + m + "%'")) : m && (g = g + " [NAME] LIKE N'%" + m + "%'");
        b = isNaN(b.pageNumber) || 1 > b.pageNumber ? 1 : parseInt(b.pageNumber);
        l = TGOS.QUERY_SERVICE + "?op=att&res=" + TGOS.MapIdInfo[a].resource;
        l += "&layer=" + TGOS.MapIdInfo[a].layers[d].name;
        l += "&EXPR=" + encodeURIComponent(g);
        k.fieldAttr = [];
        k.position = [];
        TGOS.getJSON(l + ("&page=" + b), function(b) {
            var g = "";
            if (b && b.error) e.call(this, null, "REQUEST_DENIED", 0, 0);
            else if (b) {
                var h = b.Feature,
                    l = null,
                    m = [],
                    x = null,
                    A = b.items;
                b = b.pages;
                for (var B in TGOS.MapIdInfo[a].layers[d].query) g = g + B + ",";
                k.fieldName = g;
                for (var g = h.length, D = 0; D < g; D++) {
                    m = [];
                    l = h[D].Values;
                    x = h[D].Geometry;
                    for (B in TGOS.MapIdInfo[a].layers[d].query) m.push(l[TGOS.MapIdInfo[a].layers[d].query[B]]);
                    switch (f) {
                        case "EPSG3857":
                            var l = TGOS.parsePointWKT(x),
                                l = TGOS.TWD97toWGS84(l.x, l.y),
                                y = new TGOS.TGPoint(l.x, l.y);
                            break;
                        case "EPSG3826":
                            y = TGOS.parsePointWKT(x);
                            break;
                        case "EPSG3825":
                            l = TGOS.parsePointWKT(x), l = TGOS.TWD97toTWD97_119(l.x, l.y), y = new TGOS.TGPoint(l.x, l.y)
                    }
                    k.fieldAttr.push(m);
                    k.position.push(y)
                }
                e.call(this, k, "OK", A, b);
                TGOS.Log("web", "A09", TGOS.ThemeLayerID[a])
            } else e.call(this, null, "ZERO_RESULTS", 0, 0)
        })
    }
};
TGOS.TGPointBuffer = function() {
    this.identify = function(a, d, b, f, e) {
        if (b.position instanceof TGOS.TGPoint && "number" == typeof b.distance) {
            new TGOS.TGPoint(0, 0);
            new TGOS.TGPoint(0, 0);
            new TGOS.TGPoint(0, 0);
            new TGOS.TGPoint(0, 0);
            var g = {
                    fieldAttr: [],
                    position: []
                },
                k = TGOS.QUERY_SERVICE + "?op=pb",
                k = k + ("&layer=" + TGOS.MapIdInfo[a].layers[d].name),
                k = k + ("&res=" + TGOS.MapIdInfo[a].resource),
                k = k + ("&cx=" + b.position.x),
                k = k + ("&cy=" + b.position.y),
                k = k + ("&range=" + b.distance);
            TGOS.getJSON(k, function(b) {
                var h = "";
                if (b && b.error) e.call(this,
                    null, "REQUEST_DENIED");
                else if (b) {
                    b = b.Feature;
                    var k = null,
                        n = null,
                        p = [],
                        s;
                    for (s in TGOS.MapIdInfo[a].layers[d].buffer) h = h + s + ",";
                    g.fieldName = h;
                    if ("undefined" == typeof b.length) {
                        p = [];
                        k = b.Values;
                        n = b.Geometry;
                        switch (f) {
                            case "EPSG3857":
                                var q = TGOS.parsePointWKT(n),
                                    q = TGOS.TWD97toWGS84(q.x, q.y),
                                    q = new TGOS.TGPoint(q.x, q.y);
                                break;
                            case "EPSG3826":
                                q = TGOS.parsePointWKT(n);
                                break;
                            case "EPSG3825":
                                q = TGOS.parsePointWKT(n), q = TGOS.TWD97toTWD97_119(q.x, q.y), q = new TGOS.TGPoint(q.x, q.y)
                        }
                        for (s in TGOS.MapIdInfo[a].layers[d].buffer) {
                            var v =
                                k[TGOS.MapIdInfo[a].layers[d].buffer[s]];
                            p.push(v)
                        }
                        g.position.push(q);
                        g.fieldAttr.push(p)
                    } else
                        for (h = 0; h < b.length; h++) {
                            p = [];
                            k = b[h].Values;
                            n = b[h].Geometry;
                            for (s in TGOS.MapIdInfo[a].layers[d].buffer) v = k[TGOS.MapIdInfo[a].layers[d].buffer[s]], p.push(v);
                            switch (f) {
                                case "EPSG3857":
                                    q = TGOS.parsePointWKT(n);
                                    q = TGOS.TWD97toWGS84(q.x, q.y);
                                    q = new TGOS.TGPoint(q.x, q.y);
                                    break;
                                case "EPSG3826":
                                    q = TGOS.parsePointWKT(n);
                                    break;
                                case "EPSG3825":
                                    q = TGOS.parsePointWKT(n), q = TGOS.TWD97toTWD97_119(q.x, q.y), q = new TGOS.TGPoint(q.x,
                                        q.y)
                            }
                            g.position.push(q);
                            g.fieldAttr.push(p)
                        }
                    e.call(this, g, "OK");
                    TGOS.Log("web", "A10", TGOS.ThemeLayerID[a])
                } else e.call(this, null, "ZERO_RESULTS")
            })
        } else e.call(this, null, "INVALID_REQUEST")
    }
};
TGOS.TGKmlQuery = function() {
    this.identify = function(a, d, b, f) {
        if (!(a in TGOS.TGMapServiceId)) throw "Invalid TGMapServiceId";
        if (!(d in TGOS.TGMapId)) throw "Invalid mapID";
        var e = TGOS.TGKML_ATTR_SERVICE,
            e = util.appendQStr(e, "TGMapServiceId", a),
            e = util.appendQStr(e, "TGMapId", d);
        "string" == typeof b.county && (e = util.appendQStr(e, "County", b.county));
        "string" == typeof b.town && (e = util.appendQStr(e, "Town", b.town));
        "string" == typeof b.keyword && (e = util.appendQStr(e, "Keyword", b.keyword));
        f && f.call(this, [{
            kmlUrl: e
        }], "OK")
    }
};
TGOS.TGKmlBuffer = function(a) {
    this.identify = function(a, b, f, e) {
        if (!(a in TGOS.TGMapServiceId)) throw "Invalid TGMapServiceId";
        if (!(b in TGOS.TGMapId)) throw "Invalid mapID";
        var g = TGOS.TGKML_BUFFER_SERVICE,
            g = util.appendQStr(g, "TGMapServiceId", a);
        switch (f.coordSys) {
            case "3826":
                break;
            case "4326":
                break;
            default:
                throw "Invalid CoordSys";
        }
        g = util.appendQStr(g, "EPSG", f.coordSys);
        g = util.appendQStr(g, "TGMapId", b);
        if (!util.isFloat(f.pointX)) throw "Invalid pointX";
        g = util.appendQStr(g, "PointX", f.pointX);
        if (!util.isFloat(f.pointY)) throw "Invalid pointY";
        g = util.appendQStr(g, "PointY", f.pointY);
        if (!util.isFloat(f.distance)) throw "Invalid distance";
        g = util.appendQStr(g, "Distance", f.distance);
        e && e.call(this, [{
            kmlUrl: g
        }], "OK")
    }
};
var util = util || {
    info: "utility class"
};
util.isInt = function(a) {
    return !isNaN(parseInt(a))
};
util.isUInt = function(a) {
    return !isNaN(parseInt(a)) || 0 <= parseInt(a)
};
util.isFloat = function(a) {
    return !isNaN(parseFloat(a))
};
util.appendQStr = function(a, d, b) {
    a || (a = "");
    return a = -1 < a.indexOf("?") ? a.concat("&" + d + "=" + b) : a.concat("?" + d + "=" + b)
};
util.parsePolyWkt = function(a) {
    var d = /^\s*\(?(.*?)\)?\s*$/,
        b = /\s+/,
        f = /\s*,\s*/,
        e = /\)\s*,\s*\(/,
        g = function(a) {
            var d = [];
            a = a.split(f);
            for (var e = 0; e < a.length; e++) {
                var g = a[e].split(b),
                    k = parseFloat(g[0]),
                    g = parseFloat(g[1]);
                isNaN(k) || isNaN(g) || (k = new TGOS.TGPoint(k, g), d.push(k))
            }
            return d
        },
        k = [];
    if (0 <= a.indexOf("MULTIPOLYGON"))
        for (a = a.replace("MULTIPOLYGON", "").replace(d, "$1").replace(d, "$1"), a = a.split(e), e = 0; e < a.length; e++) {
            var l = a[e].replace(d, "$1"),
                l = g(l),
                l = new TGOS.TGLineString(l),
                l = new TGOS.TGLinearRing(l);
            k.push(l)
        } else
            for (d = a.split(e), a = 0; a < d.length; a++) l = g(d[a]), l = new TGOS.TGLineString(l), l = new TGOS.TGLinearRing(l), k.push(l);
    return new TGOS.TGPolygon(k)
};
util.decompress = function(a, d) {
    d = Math.pow(10, -d);
    for (var b = a.length, f = 0, e = 0, g = 0, k = []; f < b;) {
        var l, h = 0,
            m = 0;
        do l = a.charCodeAt(f++) - 63, m |= (l & 31) << h, h += 5; while (32 <= l);
        e += m & 1 ? ~(m >> 1) : m >> 1;
        m = h = 0;
        do l = a.charCodeAt(f++) - 63, m |= (l & 31) << h, h += 5; while (32 <= l);
        g += m & 1 ? ~(m >> 1) : m >> 1;
        k.push(e * d);
        k.push(g * d)
    }
    return k
};
TGOS.TGAddressStatus = {
    ERROR: "ERROR",
    INVALID_REQUEST: "INVALID_REQUEST",
    OK: "OK",
    ZERO_RESULTS: "ZERO_RESULTS"
};
TGOS.TGAddress = function() {
    return function() {
        this.nearestAddress = function(a, d, b) {
            if (!(a instanceof TGOS.TGPoint)) throw "Must be a Point @nearestAddress";
            var f = "EPSG:3826";
            switch (d) {
                case TGOS.TGCoordSys.EPSG3857:
                    f = "EPSG:4326";
                    break;
                case TGOS.TGCoordSys.EPSG3826:
                    f = "EPSG:3826";
                    break;
                case TGOS.TGCoordSys.EPSG3825:
                    f = "EPSG:3825"
            }
            TGOS.getJSON(TGOS.ADDRESSLOCATE_SERVICE + "?op=PointQueryNearAddr&oAPPId=" + TGOS.APPID + "&oAPIKey=" + TGOS.APIKey + "&oSRS=" + f + "&oResultDataType=jsonp&oPX=" + a.x + "&oPY=" + a.y, function(a) {
                a =
                    a.AddressList;
                0 >= a.length ? b.call(this, null, TGOS.TGAddressStatus.ZERO_RESULTS) : (a = a[0], a = {
                    formattedAddress: a.FULL_ADDR,
                    addressComponents: {
                        county: a.COUNTY,
                        town: a.TOWN,
                        village: a.VILLAGE,
                        neighborhood: a.NEIGHBORHOOD,
                        road: a.ROAD,
                        section: a.SECTION,
                        lane: a.LANE,
                        alley: a.ALLEY,
                        sub_alley: a.SUB_ALLEY,
                        tong: a.TONG,
                        number: a.NUMBER
                    },
                    geometry: {
                        bounds: new TGOS.TGEnvelope(a.X, a.Y, a.X, a.Y),
                        location: new TGOS.TGPoint(a.X, a.Y)
                    }
                }, b.call(this, a, TGOS.TGAddressStatus.OK))
            }, null, null)
        }
    }
}();
TGOS.TGMileageType = {
    HIGHWAY: "HIGHWAY",
    EXPRESSWAY: "EXPRESSWAY",
    PROVINCEWAY: "PROVINCEWAY",
    TRA: "TRA",
    HSR: "HSR"
};
TGOS.TGDirectionType = {
    N: "N",
    E: "E",
    S: "S",
    W: "W"
};
TGOS.TGLocatorType = {
    STREET_ADDRESS: "address",
    INTERPOLATED: "address",
    ROUTE: "road",
    COORD: "coord",
    POI: "poi",
    INTERSECTION: "roadcross"
};
TGOS.COUNTYCODES = {
    "09007": "\u9023\u6c5f\u7e23",
    "09020": "\u91d1\u9580\u7e23",
    10002: "\u5b9c\u862d\u7e23",
    10004: "\u65b0\u7af9\u7e23",
    10005: "\u82d7\u6817\u7e23",
    10007: "\u5f70\u5316\u7e23",
    10008: "\u5357\u6295\u7e23",
    10009: "\u96f2\u6797\u7e23",
    10010: "\u5609\u7fa9\u7e23",
    10013: "\u5c4f\u6771\u7e23",
    10014: "\u81fa\u6771\u7e23",
    10015: "\u82b1\u84ee\u7e23",
    10016: "\u6f8e\u6e56\u7e23",
    10017: "\u57fa\u9686\u5e02",
    10018: "\u65b0\u7af9\u5e02",
    10020: "\u5609\u7fa9\u5e02",
    63E3: "\u81fa\u5317\u5e02",
    64E3: "\u9ad8\u96c4\u5e02",
    65E3: "\u65b0\u5317\u5e02",
    66E3: "\u81fa\u4e2d\u5e02",
    67E3: "\u81fa\u5357\u5e02",
    68E3: "\u6843\u5712\u5e02"
};
TGOS.TGLocate = function() {
    var a = function(a) {
            if (!a) return "";
            for (var b in TGOS.COUNTYCODES)
                if (a.replace("\u53f0", "\u81fa") == TGOS.COUNTYCODES[b]) return b
        },
        d = TGOS.LOCATOR_SERVICE,
        b = getWebProtocal() + getServicePath() + "TGLocator/TGLocator.ashx",
        f = function() {};
    f.prototype.buildDescription = function(a, b, d, f) {
        var h = "",
            m = "",
            n = "";
        switch (a) {
            case TGOS.TGMileageType.HIGHWAY:
                h = "\u570b\u9053";
                break;
            case TGOS.TGMileageType.EXPRESSWAY:
                h = "\u5feb\u901f\u9053\u8def";
                break;
            case TGOS.TGMileageType.PROVINCEWAY:
                h = "\u7701\u9053";
                break;
            case TGOS.TGMileageType.TRA:
                h = "\u53f0\u9435";
                break;
            case TGOS.TGMileageType.HSR:
                h = "\u9ad8\u9435"
        }
        n = a == TGOS.TGMileageType.HSR ? n + h : n + (h + f);
        if (a == TGOS.TGMileageType.HIGHWAY) {
            switch (b) {
                case TGOS.TGDirectionType.E:
                    m = "\u6771\u5411";
                    break;
                case TGOS.TGDirectionType.W:
                    m = "\u897f\u5411";
                    break;
                case TGOS.TGDirectionType.S:
                    m = "\u5357\u5411";
                    break;
                case TGOS.TGDirectionType.N:
                    m = "\u5317\u5411"
            }
            n += "," + m
        }
        return n + ("," + d + "\u516c\u91cc")
    };
    f.prototype.calcViewport = function(a, b, d) {
        switch (d) {
            case TGOS.TGCoordSys.EPSG3857:
                b =
                    TGOS.WGS84ToGoo(a, b);
                a = TGOS.GooToWGS84(b.x - 500, b.y + 500);
                b = TGOS.GooToWGS84(b.x + 500, b.y - 500);
                a = new TGOS.TGEnvelope(a.x, a.y, b.x, b.y);
                break;
            default:
                a = new TGOS.TGEnvelope(a - 500, b + 500, a + 500, b - 500)
        }
        return a
    };
    f.prototype.buildGeometry = function(a, b) {
        var d = new TGOS.TGPoint,
            f;
        switch (b) {
            case TGOS.TGCoordSys.EPSG3826:
                d.x = a.TWD97X || a["97X"];
                d.y = a.TWD97Y || a["97Y"];
                break;
            case TGOS.TGCoordSys.EPSG3857:
                d.x = a.Lng;
                d.y = a.Lat;
                break;
            case TGOS.TGCoordSys.EPSG3825:
                x97 = a.TWD97X || a["97X"], y97 = a.TWD97Y || a["97Y"], f = TGOS.TWD97toTWD97_119(x97,
                    y97), d.x = f.x, d.y = f.y
        }
        f = this.calcViewport(d.x, d.y, b);
        return {
            location: d,
            bounds: new TGOS.TGEnvelope(d.x, d.y, d.x, d.y),
            viewport: f
        }
    };
    f.prototype.complexLocate = function(a, d, f) {
        var l = this,
            h = a.requestText,
            m = a.town,
            n = a.county,
            p = a.geometryInfo,
            s = a.pageNumber;
        a = a.center;
        var q;
        switch (d) {
            case TGOS.TGCoordSys.EPSG3826:
                q = "EPSG:3826";
                break;
            case TGOS.TGCoordSys.EPSG3857:
                q = "EPSG:4326"
        }
        h = b + "?format=jsonp&input=" + h + "&srs=" + q;
        n && (h += "&county=" + n);
        m && (h += "&town=" + m);
        h += p ? "&ignoreGeometry=false" : "&ignoreGeometry=true";
        "number" ==
        typeof s && (h += "&pnum=" + s);
        a instanceof TGOS.TGPoint && !isNaN(a.x) && !isNaN(a.y) && (h += "&center=" + a.x + "," + a.y);
        TGOS.getJSON(h, function(a) {
            var b = a.status,
                e = a.results,
                h = a.featureCount,
                m = a.pages,
                n = [];
            if ("OK" == b || "TOO_MANY_RESULTS" == b)
                for (var p = 0; p < e.length; p++) {
                    a = e[p];
                    var s = {
                        county: a.county,
                        town: a.town,
                        type: a.type,
                        name: a.name
                    };
                    "address" == a.type && (s.addressComponents = {
                        county: a.COUNTY,
                        town: a.TOWN,
                        village: a.VILLAGE,
                        neighborhood: a.NEIGHBORHOOD,
                        road: a.ROAD,
                        section: a.SECTION,
                        lane: a.LANE,
                        alley: a.ALLEY,
                        sub_alley: a.SUB_ALLEY,
                        number: a.NUMBER
                    });
                    "roadcross" == a.type && (s.firstRoad = a.NAME1, s.secondRoad = a.NAME2);
                    a.geometry && (s.geometry = {
                        location: new TGOS.TGPoint(a.geometry.x, a.geometry.y),
                        locatorLocation: null,
                        viewport: l.calcViewport(a.geometry.x, a.geometry.y, d),
                        bounds: null
                    });
                    n.push(s)
                }
            f && f.call(l, n, b, h, m)
        })
    };
    f.prototype.intersection = function(a, b, d) {
        this.roadCross.call(this, {
            firstRoad: a.roadName,
            secondRoad: "",
            county: a.county,
            town: a.town,
            pageNumber: a.pageNumber,
            geometryInfo: a.geometryInfo,
            center: a.center
        }, b, d)
    };
    f.prototype.roadCross =
        function(d, f, k) {
            var l = this,
                h = d.firstRoad,
                m = a(d.firstCounty),
                n = d.county,
                p = d.firstTown,
                s = d.secondRoad,
                q = a(d.secondCounty),
                v = d.secondTown,
                x = "number" == typeof d.pageNumber ? d.pageNumber : 1,
                A = d.center;
            d = d.geometryInfo;
            switch (f) {
                case TGOS.TGCoordSys.EPSG3826:
                    mCoordSys = "EPSG:3826";
                    break;
                case TGOS.TGCoordSys.EPSG3857:
                    mCoordSys = "EPSG:4326"
            }
            h = b + "?types=roadcross&input=" + h + " " + s + "&srs=" + mCoordSys + "&format=jsonp";
            "number" == typeof x && (h += "&pnum=" + x);
            "string" == typeof n && (h += "&county=" + n);
            "string" == typeof m && (h += "&county1=" +
                m);
            "string" == typeof p && (h += "&firstTown=" + p);
            "string" == typeof q && (h += "&county2=" + q);
            "string" == typeof v && (h += "&secondTown=" + v);
            A instanceof TGOS.TGPoint && !isNaN(A.x) && !isNaN(A.y) && (h += "&center=" + A.x + "," + A.y);
            TGOS.getJSON(h + (d ? "&ignoreGeometry=false" : "&ignoreGeometry=true"), function(a) {
                var b = a.status,
                    d = a.results,
                    e = a.featureCount,
                    h = a.pages,
                    m = [];
                if ("OK" == b || "TOO_MANY_RESULTS" == b)
                    for (var n = 0; n < d.length; n++) {
                        a = d[n];
                        var p = {
                            county: a.county,
                            town: a.town,
                            type: a.type,
                            name: a.name
                        };
                        "roadcross" == a.type && (p.firstRoad =
                            a.NAME1, p.secondRoad = a.NAME2);
                        a.geometry && (p.geometry = {
                            location: new TGOS.TGPoint(a.geometry.x, a.geometry.y),
                            locatorLocation: null,
                            viewport: l.calcViewport(a.geometry.x, a.geometry.y, f),
                            bounds: null
                        });
                        m.push(p)
                    }
                k && k.call(l, m, b, e, h)
            })
        };
    f.prototype.mileage = function(a, b, f) {
        var l = this,
            h = a.mileageType,
            m = a.roadCode,
            n = a.directionType,
            p = a.mileageNum;
        a = d + "?op=mileage&mt=" + h.toLowerCase() + "&dt=" + n + "&rc=" + m + "&mn=" + p;
        TGOS.getJSON(a, function(a) {
            var d = "";
            a && a.Table ? 0 >= a.Table.length ? (d = TGOS.TGLocatorStatus.ZERO_RESULTS,
                f.call(l, null, null, d)) : (d = l.buildDescription(h, n, p, a.Table[0].Number), a = l.buildGeometry(a.Table[0], b), f && f.call(l, d, a, "OK")) : (d = TGOS.TGLocatorStatus.ERROR, f.call(l, null, null, d))
        })
    };
    return f
}();
(function() {
    var a = ["Document", "Folder", "Placemark"];
    TGOS.TGKmlLayerOption = function() {
        this.suppressInfoWindows = this.preserveViewport = this.map = null;
        this.markerFitImageSize = !1
    };
    TGOS.TGKmlLayerMetaData = function() {
        this.snippet = this.name = this.description = this.author = null
    };
    TGOS.KmlMouseEvent = function() {
        this.pixelOffset = this.point = this.feature = null
    };
    TGOS.KmlFeatureData = function() {
        this.snippet = this.name = this.description = this.author = null
    };
    TGOS.KmlAuthor = function() {
        this.uri = this.name = this.email = null
    };
    TGOS.TGKmlLayerStatus = {
        DOCUMENT_NOT_FOUND: "DOCUMENT_NOT_FOUND",
        DOCUMENT_TOO_LARGE: "DOCUMENT_TOO_LARGE",
        FETCH_ERROR: "FETCH_ERROR",
        INVALID_DOCUMENT: "INVALID_DOCUMENT",
        INVALID_REQUEST: "INVALID_REQUEST",
        LIMITS_EXCEEDED: "LIMITS_EXCEEDED",
        OK: "OK",
        TIMED_OUT: "TIMED_OUT",
        UNKNOWN: "UNKNOWN"
    };
    TGOS.TGKmlLayer = function(d, b, f) {
        var e = this,
            g = b.map,
            k = "number" == typeof b.zIndex ? b.zIndex : 0,
            l = "boolean" == typeof b.visible ? b.visible : !0,
            h = g.getCoordSys(),
            m = {
                author: {
                    email: "",
                    name: "",
                    uri: ""
                },
                description: "",
                name: "",
                snippet: ""
            },
            n, p = new TGOS.TGInfoWindow("",
                null, {
                    pixelOffset: new TGOS.TGSize(0, 0)
                }),
            s = null,
            q = b.markerFitImageSize;
        this.overlays = [];
        this.points = [];
        this.polygons = [];
        this.polylines = [];
        this.groundoverlays = [];
        this.icons = [];
        this.getDefaultViewport = function() {
            if (!s) {
                for (var a = Infinity, b = -Infinity, d = -Infinity, e = Infinity, f = 0; f < this.overlays.length; f++) var g = this.overlays[f].getBounds(),
                    a = Math.min(a, g.left),
                    e = Math.min(e, g.bottom),
                    b = Math.max(b, g.right),
                    d = Math.max(d, g.top);
                for (f = 0; f < this.polylines.length; f++) g = this.polylines[f].getPath().getEnvelope(),
                    a = Math.min(a, g.left), e = Math.min(e, g.bottom), b = Math.max(b, g.right), d = Math.max(d, g.top);
                for (f = 0; f < this.groundoverlays.length; f++) g = this.groundoverlays[f].getBounds(), a = Math.min(a, g.left), e = Math.min(e, g.bottom), b = Math.max(b, g.right), d = Math.max(d, g.top);
                for (f = 0; f < this.polygons.length; f++) g = this.polygons[f].getBounds(), a = Math.min(a, g.left), e = Math.min(e, g.bottom), b = Math.max(b, g.right), d = Math.max(d, g.top);
                for (g = 0; g < this.points.length; g++) f = this.points[g].getPosition(), a = Math.min(a, f.x), e = Math.min(e, f.y),
                    b = Math.max(b, f.x), d = Math.max(d, f.y);
                if (!(isFinite(a) && isFinite(d) && isFinite(b) && isFinite(e))) return null;
                s = new TGOS.TGEnvelope(a, d, b, e)
            }
            return s
        };
        this.getMetadata = function() {
            return m
        };
        this.getStatus = function() {
            return n
        };
        this.parseCoordinates = function(a, b) {
            for (var d = a.trim().split(/\s*[,]\s*/), e = [
                    []
                ], f = e[0], g = 0; g < d.length; g++)
                if (d[g].match(/\s+/)) {
                    var h = d[g].split(/\s+/);
                    f.push(parseFloat(h[0]));
                    e.push(f);
                    f = [parseFloat(h[1])];
                    e.push(f)
                } else f.push(parseFloat(d[g]));
            d = [];
            for (f = 0; f < e.length; f++) {
                switch (b) {
                    case "EPSG3826":
                        var k =
                            TGOS.WGS84toTWD97(e[f][0], e[f][1]);
                        break;
                    case "EPSG3825":
                        k = TGOS.WGS84toTWD97_119(e[f][0], e[f][1]);
                        break;
                    case "EPSG3857":
                        k = {
                            x: e[f][0],
                            y: e[f][1]
                        }
                }
                k.x && k.y && d.push(new TGOS.TGPoint(k.x, k.y))
            }
            return d
        };
        this.setZIndex = function(a) {
            k = a;
            for (a = 0; a < this.polygons.length; a++) this.polygons[a].setZIndex(k, !1);
            for (a = 0; a < this.polylines.length; a++) this.polylines[a].setZIndex(k, !1);
            for (a = 0; a < this.groundoverlays.length; a++) this.groundoverlays[a].setZIndex(k, !1);
            for (var b = 0; b < this.points.length; b++) this.points[a].setZIndex(k, !1)
        };
        this.getZIndex = function() {
            return k
        };
        this.createPoint = function(a) {
            switch (h) {
                case "EPSG3826":
                    var b = this.parseCoordinates(a.coordinates, "EPSG3826");
                    break;
                case "EPSG3825":
                    b = this.parseCoordinates(a.coordinates, "EPSG3825");
                    break;
                case "EPSG3857":
                    b = this.parseCoordinates(a.coordinates, "EPSG3857")
            }
            if (!(1 > b.length)) return b[0]
        };
        this.parseRing = function(a, b) {
            switch (b) {
                case "EPSG3826":
                    var d = this.parseCoordinates(a.coordinates, "EPSG3826");
                    break;
                case "EPSG3825":
                    d = this.parseCoordinates(a.coordinates, "EPSG3825");
                    break;
                case "EPSG3857":
                    d = this.parseCoordinates(a.coordinates, "EPSG3857")
            }
            d = new TGOS.TGLineString(d);
            return new TGOS.TGLinearRing(d)
        };
        this.createPolygon = function(a) {
            var b = [],
                d = this.parseRing(a.outerBoundaryIs.LinearRing, h);
            b.push(d);
            if (a = a.innerBoundaryIs)
                if (a.length)
                    for (d = 0; d < a.length; d++)
                        if (a[d].LinearRing.length)
                            for (var e = 0; e < a[d].LinearRing.length; e++) {
                                var f = this.parseRing(a[d].LinearRing[e], h);
                                b.push(f)
                            } else f = this.parseRing(a[d].LinearRing, h), b.push(f);
                        else f = this.parseRing(a.LinearRing, h), b.push(f);
            return new TGOS.TGPolygon(b)
        };
        this.createPolyLine = function(a) {
            switch (h) {
                case "EPSG3826":
                    var b = this.parseCoordinates(a.coordinates, "EPSG3826");
                    break;
                case "EPSG3825":
                    b = this.parseCoordinates(a.coordinates, "EPSG3825");
                    break;
                case "EPSG3857":
                    b = this.parseCoordinates(a.coordinates, "EPSG3857")
            }
            return new TGOS.TGLineString(b)
        };
        this.handleGroundOverlay = function(a) {
            function d(a) {
                var f = new TGOS.TGImage(a.Icon.href);
                switch (h) {
                    case "EPSG3826":
                        var k = TGOS.WGS84toTWD97(parseFloat(a.LatLonBox.west), parseFloat(a.LatLonBox.north));
                        a = TGOS.WGS84toTWD97(parseFloat(a.LatLonBox.east), parseFloat(a.LatLonBox.south));
                        var l = k.x,
                            k = k.y,
                            m = a.x,
                            n = a.y;
                        break;
                    case "EPSG3825":
                        k = TGOS.WGS84toTWD97_119(parseFloat(a.LatLonBox.west), parseFloat(a.LatLonBox.north));
                        a = TGOS.WGS84toTWD97_119(parseFloat(a.LatLonBox.east), parseFloat(a.LatLonBox.south));
                        l = k.x;
                        k = k.y;
                        m = a.x;
                        n = a.y;
                        break;
                    case "EPSG3857":
                        l = parseFloat(a.LatLonBox.west), k = parseFloat(a.LatLonBox.north), m = parseFloat(a.LatLonBox.east), n = parseFloat(a.LatLonBox.south)
                }
                l = new TGOS.TGEnvelope(l, k, m, n);
                f = new TGOS.TGGroundOverlay(g, f, l, 1);
                TGOS.TGEvent.addListener(f, "click", x);
                TGOS.TGEvent.addListener(f, "mousedown", A);
                TGOS.TGEvent.addListener(f, "mouseup", B);
                TGOS.TGEvent.addListener(f, "mousemove", D);
                TGOS.TGEvent.addListener(f, "mouseout", y);
                TGOS.TGEvent.addListener(f, "dblclick", z);
                TGOS.TGEvent.addListener(f, "rightclick", w);
                b.suppressInfoWindows || TGOS.TGEvent.addListener(f, "click", v);
                e.groundoverlays.push(f)
            }
            if (a.length)
                for (var f = 0; f < a.length; f++) d(a[f]);
            else d(a)
        };
        this.handleNetworkLink = function(a) {
            var b =
                "";
            if (a.length)
                for (var d = 0; d < a.length; d++) {
                    if (a[d].hasOwnProperty("Url")) b = a[d].Url.href;
                    else if (a[d].hasOwnProperty("Link")) b = a[d].Link.href;
                    else continue; - 1 == b.indexOf(".kmz") && TGOS.getJSON(b, function(a) {
                        a.error || e.parseKML(a.kml)
                    }, TGOS.PROXY_SERVICE2)
                } else {
                    if (a.hasOwnProperty("Url")) b = a.Url.href;
                    else if (a.hasOwnProperty("Link")) b = a.Link.href;
                    else return; - 1 == b.indexOf(".kmz") && TGOS.getJSON(b, function(a) {
                        a.error || e.parseKML(a.kml)
                    }, TGOS.PROXY_SERVICE2)
                }
        };
        this.handleDescription = function(a) {};
        this.handleAuthor =
            function(a) {
                a.hasOwnProperty("atom:name") && (m.author.name = a["atom:name"]);
                a.hasOwnProperty("atom:link") && (m.author.uri = a["atom:link"]["@href"])
            };
        this.handleMultiGeometry = function(a) {
            var b = [],
                d;
            for (d in a) switch (d) {
                case "Point":
                    if (a.Point.length)
                        for (var e = 0; e < a.Point.length; e++) {
                            var f = this.createPoint(a.Point[e]);
                            f && b.push(f)
                        } else this.createPoint(a.Point), (f = this.createPoint(a.Point)) && b.push(f);
                    break;
                case "Polygon":
                    if (a.Polygon.length)
                        for (e = 0; e < a.Polygon.length; e++)(f = this.createPolygon(a.Polygon[e])) &&
                            b.push(f);
                    else(f = this.createPolygon(a.Polygon)) && b.push(f);
                    break;
                case "LineString":
                    if (a.LineString.length)
                        for (e = 0; e < a.LineString.length; e++)(f = this.createPolyLine(a.LineString[e])) && b.push(f);
                    else(f = this.createPolyLine(a.LineString)) && b.push(f);
                    break;
                case "MultiGeometry":
                    if (a.MultiGeometry.length)
                        for (e = 0; e < a.MultiGeometry.length; e++)(f = this.handleMultiGeometry(a.MultiGeometry[e])) && (b = b.concat(f));
                    else(f = this.handleMultiGeometry(a.MultiGeometry)) && (b = b.concat(f))
            }
            return b
        };
        this.parseGeometry = function(a) {
            var b = [];
            a.hasOwnProperty("Point") ? (a = this.createPoint(a.Point)) && b.push(a) : a.hasOwnProperty("Polygon") ? (a = this.createPolygon(a.Polygon)) && b.push(a) : a.hasOwnProperty("LineString") ? (a = this.createPolyLine(a.LineString)) && b.push(a) : a.hasOwnProperty("MultiGeometry") && (a = this.handleMultiGeometry(a.MultiGeometry, a)) && (b = b.concat(a));
            return b
        };
        this.createRandomColor = function() {
            return {
                r: parseInt(255 * Math.random()),
                g: parseInt(255 * Math.random()),
                b: parseInt(255 * Math.random())
            }
        };
        this.parseKmlColor = function(a, b, d) {
            b =
                parseInt(a.substring(0, 2), 16);
            var e = parseInt(a.substring(2, 4), 16),
                f = parseInt(a.substring(4, 6), 16),
                g = parseInt(a.substring(6, 8), 16);
            "random" == d && ("ffffffff" == a ? (a = this.createRandomColor(), e = a.b, g = a.r, f = a.g) : (e *= Math.random(), f *= Math.random(), g *= Math.random()));
            return {
                a: b / 255,
                b: parseInt(e),
                g: parseInt(f),
                r: parseInt(g)
            }
        };
        this.matchSharedStyle = function(a, b) {
            if (b && a)
                if (b = b.replace("#", ""), a instanceof Array)
                    for (var d = 0; d < a.length; d++) {
                        if (a[d]["@id"] == b) return a[d]
                    } else if (a["@id"] == b) return a
        };
        this.createStyle =
            function(a, b) {
                var d = a.inStyle ? a.inStyle : this.matchSharedStyle(a.sharedStyle, a.styleUrl),
                    e = {
                        fillColor: {
                            a: null,
                            r: null,
                            g: null,
                            b: null
                        },
                        lineWidth: null,
                        lineColor: {
                            a: null,
                            r: null,
                            g: null,
                            b: null
                        },
                        iconLink: null
                    };
                if (d) {
                    if (d.LineStyle) {
                        if (d.LineStyle.color) {
                            var f = this.parseKmlColor(d.LineStyle.color, b, d.LineStyle.colorMode);
                            e.lineColor = f
                        }
                        "string" == typeof d.LineStyle.width && (e.lineWidth = parseFloat(d.LineStyle.width))
                    }
                    d.PolyStyle && (d.PolyStyle.color && (f = this.parseKmlColor(d.PolyStyle.color, b, d.PolyStyle.colorMode),
                        e.fillColor = f), "0" == d.PolyStyle.fill && (e.fillColor.a = 0), "0" == d.PolyStyle.outline && (e.lineColor.a = 0));
                    d.IconStyle && d.IconStyle.Icon && d.IconStyle.Icon.href && (e.iconLink = d.IconStyle.Icon.href)
                }
                return e
            };
        this.colorToHex = function(a) {
            if ("number" == typeof a.r || "number" == typeof a.g || "number" == typeof a.b) {
                var b = a.r.toString(16);
                16 > a.r && (b = "0" + b);
                var d = a.g.toString(16);
                16 > a.g && (d = "0" + d);
                var e = a.b.toString(16);
                16 > a.b && (e = "0" + e);
                return "#" + b + d + e
            }
        };
        this.handlePlacemark = function(a) {
            a.inStyle = a.Style ? a.Style : a.inStyle;
            var d = [];
            if (a.length)
                for (var e = 0; e < a.length; e++) {
                    var f = this.parseGeometry(a[e]);
                    f && (d = d.concat(f))
                } else(f = this.parseGeometry(a)) && (d = d.concat(f));
            for (e = 0; e < d.length; e++) {
                f = this.createStyle(a, e / d.length);
                if (d[e] instanceof TGOS.TGPolygon) {
                    var h = new TGOS.TGFill(g, d[e], {
                        fillColor: this.colorToHex(f.fillColor),
                        fillOpacity: f.fillColor.a,
                        strokeWeight: f.lineWidth,
                        strokeColor: this.colorToHex(f.lineColor),
                        strokeOpacity: f.lineColor.a,
                        visible: l,
                        zIndex: k
                    });
                    this.polygons.push(h)
                } else d[e] instanceof TGOS.TGLineString ?
                    (h = new TGOS.TGLine(g, d[e], {
                        strokeWeight: f.lineWidth,
                        strokeColor: this.colorToHex(f.lineColor),
                        strokeOpacity: f.lineColor.a,
                        visible: l,
                        zIndex: k
                    }), this.polylines.push(h)) : d[e] instanceof TGOS.TGPoint && (null != f.iconLink ? (h = new TGOS.TGImage(f.iconLink), h = new TGOS.TGMarker(g, d[e], a.name, h, {
                        visible: l,
                        zIndex: k,
                        flat: !0,
                        fitImageSize: q ? q : !1
                    })) : h = new TGOS.TGMarker(g, d[e], a.name, null, {
                        visible: l,
                        zIndex: k
                    }), this.points.push(h));
                h.targetPlacemark = a;
                TGOS.TGEvent.addListener(h, "click", x);
                TGOS.TGEvent.addListener(h, "mousedown",
                    A);
                TGOS.TGEvent.addListener(h, "mouseup", B);
                TGOS.TGEvent.addListener(h, "mousemove", D);
                TGOS.TGEvent.addListener(h, "mouseout", y);
                TGOS.TGEvent.addListener(h, "dblclick", z);
                TGOS.TGEvent.addListener(h, "rightclick", w);
                b.suppressInfoWindows || TGOS.TGEvent.addListener(h, "click", v)
            }
        };
        this.getStyleColorById = function(a, b) {
            if (styles)
                if (styles.length)
                    for (var d = 0; d < styles.length; d++) {
                        if (b.slice(1, b.length) == styles[d].id) {
                            var e = styles[d].colorMode;
                            if ("random" == e) return null;
                            if ("line" == a && styles[d].LineStyle) return e =
                                styles[d].LineStyle.colorMode, "random" == e ? null : {
                                    a: styles[d].LineStyle.color.slice(0, 2),
                                    b: styles[d].LineStyle.color.slice(2, 4),
                                    g: styles[d].LineStyle.color.slice(4, 6),
                                    r: styles[d].LineStyle.color.slice(6, 8)
                                };
                            if ("poly" == a && styles[d].PolyStyle) return e = styles[d].PolyStyle.colorMode, "random" == e ? null : {
                                a: styles[d].PolyStyle.color.slice(0, 2),
                                b: styles[d].PolyStyle.color.slice(2, 4),
                                g: styles[d].PolyStyle.color.slice(4, 6),
                                r: styles[d].PolyStyle.color.slice(6, 8)
                            }
                        }
                    } else {
                        if ("line" == a && styles.LineStyle) return e = styles.LineStyle.colorMode,
                            "random" == e ? null : {
                                a: styles.LineStyle.color.slice(0, 2),
                                b: styles.LineStyle.color.slice(2, 4),
                                g: styles.LineStyle.color.slice(4, 6),
                                r: styles.LineStyle.color.slice(6, 8)
                            };
                        if ("poly" == a && styles.PolyStyle) return e = styles.PolyStyle.colorMode, "random" == e ? null : {
                            a: styles.PolyStyle.color.slice(0, 2),
                            b: styles.PolyStyle.color.slice(2, 4),
                            g: styles.PolyStyle.color.slice(4, 6),
                            r: styles.PolyStyle.color.slice(6, 8)
                        }
                    }
        };
        this.getVisible = function() {
            return l
        };
        this.setVisible = function(a) {
            l = a;
            for (a = 0; a < this.polygons.length; a++) this.polygons[a].setVisible(l);
            for (a = 0; a < this.polylines.length; a++) this.polylines[a].setVisible(l);
            for (a = 0; a < this.groundoverlays.length; a++) this.groundoverlays[a].setVisible(l);
            for (a = 0; a < this.points.length; a++) this.points[a].setVisible(l)
        };
        this.parseFeature = function(a, b) {
            var d = a.Style ? a.Style : null,
                e;
            for (e in a) {
                var f = a[e];
                switch (e) {
                    case "Document":
                        f.inStyle = d ? d : null;
                        this.Schema = f.Schema;
                        if (f instanceof Array)
                            for (var g = 0; g < f.length; g++) {
                                var h = f[g];
                                h.inStyle = h.Style ? h.Style : null;
                                this.parseFeature(h, f.Style)
                            } else this.parseFeature(f,
                                f.Style);
                        break;
                    case "Folder":
                        f.inStyle = d ? d : null;
                        if (f instanceof Array)
                            for (g = 0; g < f.length; g++) h = f[g], h.inStyle = h.Style ? h.Style : null, this.parseFeature(h, b);
                        else this.parseFeature(f, b);
                        break;
                    case "Placemark":
                        f.inStyle = d ? d : null;
                        f.sharedStyle = b;
                        if (f instanceof Array)
                            for (g = 0; g < f.length; g++) h = f[g], h.inStyle = h.Style ? h.Style : null, h.sharedStyle = b, this.handlePlacemark(h);
                        else f.inStyle = f.Style ? f.Style : null, f.sharedStyle = b, this.handlePlacemark(f);
                        break;
                    case "GroundOverlay":
                        this.handleGroundOverlay(f);
                        break;
                    case "NetworkLink":
                        this.handleNetworkLink(f)
                }
            }
        };
        this.parseKML = function(b) {
            if (b)
                for (var d in b)
                    if (0 <= a.indexOf(d)) {
                        this.parseFeature(b[d], b[d].Style);
                        break
                    }
        };
        this.removeKml = function() {
            if (0 < this.points.length)
                for (var a = 0; a < this.points.length; a++) this.points[a].setMap(null);
            if (0 < this.polygons.length)
                for (a = 0; a < this.polygons.length; a++) this.polygons[a].setMap(null);
            if (0 < this.polylines.length)
                for (a = 0; a < this.polylines.length; a++) this.polylines[a].setMap(null);
            if (0 < this.groundoverlays.length)
                for (a = 0; a < this.groundoverlays.length; a++) this.groundoverlays[a].setMap(null);
            this.points = [];
            this.polygons = [];
            this.polylines = [];
            this.groundoverlays = [];
            p && p.close()
        };
        var v = function(a) {
                if (a.target.targetPlacemark) {
                    var b = "",
                        d = a.target.targetPlacemark.name;
                    a.target.targetPlacemark.hasOwnProperty("description") && (b = a.target.targetPlacemark.description.hasOwnProperty("#cdata-section") ? a.target.targetPlacemark.description["#cdata-section"] : a.target.targetPlacemark.description);
                    var b = a.target.targetPlacemark.name + "</br>" + b,
                        f = a.target.targetPlacemark.ExtendedData;
                    if (f) {
                        var h;
                        if (f.Data) {
                            h =
                                f.Data.length ? f.Data : [f.Data];
                            for (var b = b + "<br><table style='border: 1px solid black;'>", k = 0; k < h.length; k++) var l = h[k],
                                d = l["@name"],
                                m = l.displayName,
                                l = l.value,
                                b = b + "<tr>",
                                b = b + "<td style='border: 1px solid black;'>",
                                b = b + (m || d),
                                b = b + "</td>",
                                b = b + "<td style='border: 1px solid black;'>",
                                b = b + l,
                                b = b + "</td>",
                                b = b + "</tr>";
                            b += "</table>"
                        }
                        if (f.SchemaData)
                            for (f = f.SchemaData.length ? f.SchemaData : [f.SchemaData], h = 0; h < f.length; h++) {
                                m = null;
                                f[h].SimpleData && (m = f[h].SimpleData.length ? f[h].SimpleData : [f[h].SimpleData]);
                                var n =
                                    "";
                                if (e.Schema)
                                    for (d = e.Schema.length ? e.Schema : [e.Schema], k = 0; k < d.length; k++)
                                        if (l = d[k], l["@id"] == f[h]["@schemaUrl"].replace("#", "")) {
                                            n = l["@name"];
                                            break
                                        }
                                if (m) {
                                    b += "<br><table style='border: 1px solid black;'>";
                                    for (k = 0; k < m.length; k++) l = m[k], d = l["@name"], l = l["#text"], b += "<tr>", b += "<td style='border: 1px solid black;'>", b += n + ":" + d, b += "</td>", b += "<td style='border: 1px solid black;' >", b += void 0 === l ? "" : l, b += "</td>", b += "</tr>";
                                    b += "</table>"
                                }
                            }
                    }
                    p.setContent(b);
                    p.setPosition(a.point);
                    p.open(g)
                }
            },
            x = function(a) {
                TGOS.TGEvent.trigger_(e,
                    "click", {
                        featureData: {
                            author: m.author,
                            description: a.target.description,
                            name: a.target.name,
                            snippet: a.target.snippet
                        },
                        point: a.point,
                        pixelOffset: 0
                    })
            },
            A = function(a) {
                TGOS.TGEvent.trigger_(e, "mousedown", {
                    featureData: {
                        author: m.author,
                        description: a.target.description,
                        name: a.target.name,
                        snippet: a.target.snippet
                    },
                    point: a.point,
                    pixelOffset: 0
                })
            },
            B = function(a) {
                TGOS.TGEvent.trigger_(e, "mouseup", {
                    featureData: {
                        author: m.author,
                        description: a.target.description,
                        name: a.target.name,
                        snippet: a.target.snippet
                    },
                    point: a.point,
                    pixelOffset: 0
                })
            },
            D = function(a) {
                TGOS.TGEvent.trigger_(e, "mousemove", {
                    featureData: {
                        author: m.author,
                        description: a.target.description,
                        name: a.target.name,
                        snippet: a.target.snippet
                    },
                    point: a.point,
                    pixelOffset: 0
                })
            },
            y = function(a) {
                TGOS.TGEvent.trigger_(e, "mouseout", {
                    featureData: {
                        author: m.author,
                        description: a.target.description,
                        name: a.target.name,
                        snippet: a.target.snippet
                    },
                    point: a.point,
                    pixelOffset: 0
                })
            },
            z = function(a) {
                TGOS.TGEvent.trigger_(e, "dblclick", {
                    featureData: {
                        author: m.author,
                        description: a.target.description,
                        name: a.target.name,
                        snippet: a.target.snippet
                    },
                    point: a.point,
                    pixelOffset: 0
                })
            },
            w = function(a) {
                TGOS.TGEvent.trigger_(e, "rightclick", {
                    featureData: {
                        author: m.author,
                        description: a.target.description,
                        name: a.target.name,
                        snippet: a.target.snippet
                    },
                    point: a.point,
                    pixelOffset: 0
                })
            };
        n = "loading";
        if (!d) throw "Invalid kml url";
        TGOS.getJSON(d, function(a) {
            if (!a || a.error) n = TGOS.TGKmlLayerStatus.FETCH_ERROR, "function" == typeof f && f.call(this, n);
            else {
                var d = a.kml;
                d.Document ? (d.Document.hasOwnProperty("description") && (d.Document.description.hasOwnProperty("#cdata-section") ?
                        m.description = d.Document.description["#cdata-section"] : m.description = d.Document.description), d.Document.hasOwnProperty("name") && (d.Document.name.hasOwnProperty("#cdata-section") ? m.name = d.Document.name["#cdata-section"] : m.name = d.Document.name), d.Document.hasOwnProperty("Snippet") && (d.Document.Snippet.hasOwnProperty("#cdata-section") ? m.snippet = d.Document.Snippet["#cdata-section"] : m.snippet = d.Document.Snippet), d.Document.hasOwnProperty("atom:author") && e.handleAuthor(d.Document["atom:author"]), e.Schema =
                    d.Document.Schema) : (d.hasOwnProperty("description") && (d.description.hasOwnProperty("#cdata-section") ? m.description = d.description["#cdata-section"] : m.description = d.description), d.hasOwnProperty("name") && (d.name.hasOwnProperty("#cdata-section") ? m.name = d.name["#cdata-section"] : m.name = d.name), d.hasOwnProperty("Snippet") && (d.Snippet.hasOwnProperty("#cdata-section") ? m.snippet = d.Snippet["#cdata-section"] : m.snippet = d.Snippet), d.hasOwnProperty("atom:author") && e.handleAuthor(d["atom:author"]));
                e.parseKML(a.kml);
                n = TGOS.TGKmlLayerStatus.OK;
                b && !0 == b.preserveViewport && (a = e.getDefaultViewport()) && g.fitBounds(a);
                "function" == typeof f && f.call(e, n)
            }
        }, TGOS.PROXY_SERVICE2, function() {
            "function" == typeof f && f.call(this, TGOS.TGKmlLayerStatus.FETCH_ERROR)
        })
    };
    TGOS.RegisterEvent(TGOS.TGKmlLayer, "click mousemove mouseout mouseover dblclick rightclick".split(" "))
})();
TGOS.TGWmtsLayer = function() {
    var a = function(a) {
        this.matrixSet = a.matrixSet;
        this.matrixId = a.matrixId;
        this.row = a.row;
        this.col = a.col;
        this.left = a.left;
        this.top = a.top
    };
    a.prototype.equals = function(a) {
        return this.matrixSet == a.matrixSet && this.matrixId == a.matrixId && this.row == a.row && this.col == a.col
    };
    return function(d, b, f, e, g) {
        var k = "number" == typeof e.left ? e.left : null,
            l = "number" == typeof e.top ? e.top : null,
            h = "number" == typeof e.right ? e.right : null,
            m = "number" == typeof e.bottom ? e.bottom : null,
            n = [],
            p = [],
            s, q = !1,
            v = this,
            x =
            "number" == typeof f.dpi ? 25.4 / f.dpi / 1E3 : 2.8E-4,
            A = "string" == typeof f.style ? f.style : "default",
            B = "string" == typeof f.format ? f.format : "image/png",
            D = "number" == typeof f.tileWidth ? f.tileWidth : 256,
            y = "number" == typeof e.opacity ? e.opacity : 1,
            z = "number" == typeof e.zIndex ? e.zIndex : "auto",
            w = !1 == e.wmtsVisible ? !1 : !0,
            t = null,
            u = document.createElement("div");
        u.style.position = "absolute";
        u.style.left = "0px";
        u.style.top = "0px";
        u.style.width = "100%";
        u.style.height = "100%";
        u.style.zIndex = z;
        u.style.display = w ? "" : "none";
        var C = document.createElement("div");
        C.style.position = "absolute";
        C.style.overflow = "hidden";
        C.style.left = "0px";
        C.style.top = "0px";
        C.style.width = "100%";
        C.style.height = "100%";
        u.appendChild(C);
        e = document.createElement("div");
        e.style.position = "absolute";
        e.style.overflow = "hidden";
        e.style.left = "0px";
        e.style.top = "0px";
        e.style.width = "100%";
        e.style.height = "100%";
        u.appendChild(e);
        document.createElement("img");
        var E;
        this.getMatrixSetId = function() {
            return t["ows:Identifier"]
        };
        this.getTileOpacity = function() {
            return y
        };
        this.setTileOpacity = function(a) {
            if ("number" ==
                typeof a)
                for (y = a, a = 0; a < n.length; a++)
                    for (var b = 0; b < n[a].length; b++) null != n[a][b] && (n[a][b].style.opacity = y, n[a][b].style.filter = "alpha(opacity=" + 100 * y + ")")
        };
        this.getSource = function() {
            return d
        };
        this.setZIndex = function(a) {
            z = a;
            u && (u.style.zIndex = z)
        };
        this.getZIndex = function() {
            return z
        };
        this.RemoveSelf = function() {
            s.getHObject().removeChild(u)
        };
        var G = function() {
                var a = this,
                    b = 0;
                a.style.opacity = b;
                var d = y / 7,
                    e = setInterval(function() {
                        b >= y ? (a.style.filter = "alpha(opacity=" + 100 * y + ")", a.style.opacity = y, clearInterval(e)) :
                            (a.style.opacity = b, a.style.filter = "alpha(opacity=" + 100 * b + ")", b += d)
                    }, 33);
                a.style.filter = "alpha(opacity=0)";
                this.style.display = "block"
            },
            H = function(b, d, e) {
                if (!b) return null;
                var f;
                if (b.TileMatrix.length || b.TileMatrix["ows:Identifier"] != d)
                    for (var g = 0; g < b.TileMatrix.length; g++) {
                        if (b.TileMatrix[g]["ows:Identifier"] == d) {
                            f = b.TileMatrix[g];
                            break
                        }
                    } else f = b.TileMatrix;
                if (!f) return null;
                var g = parseFloat(f.MatrixWidth),
                    h = parseFloat(f.MatrixHeight);
                mIdx = 0 == g ? 1 : g - 1;
                mIdy = 0 == h ? 1 : h - 1;
                var k = e.left,
                    l = e.top,
                    m = e.right,
                    n = e.bottom;
                e = [];
                h = f.TopLeftCorner;
                g = parseFloat(h.split(" ")[0]);
                h = parseFloat(h.split(" ")[1]);
                f = parseFloat(f.ScaleDenominator) * D * x;
                var p;
                p = k <= g ? 0 : Math.floor((k - g) / f);
                k = p + Math.ceil(Math.abs(k - m) / f) + 1;
                m = l >= h ? 0 : Math.floor((h - l) / f);
                l = m + Math.ceil(Math.abs(n - l) / f) + 1;
                for (n = m; n < l; n++)
                    for (m = p; m < k; m++) {
                        var s = new a({
                            left: g + m * f,
                            top: h - n * f,
                            matrixId: d,
                            matrixSet: b["ows:Identifier"],
                            col: m,
                            row: n
                        });
                        e.push(s)
                    }
                return e
            },
            O = function(a, b) {
                for (var d = 0, e = Infinity, f = a.ToMapDistX(D), g = 0; g < b.TileMatrix.length; g++) {
                    var h = parseFloat(b.TileMatrix[g].ScaleDenominator) *
                        D * x,
                        h = Math.abs(h - f);
                    h < e && (e = h, d = g)
                }
                return 0.1 < e / f ? null : b.TileMatrix[d]["ows:Identifier"]
            };
        this.getTiles = function(a) {
            var e = a.handler,
                g = new TGOS.TGEnvelope(a.rl, a.rt, a.rr, a.rb),
                g = M(g),
                h = O(s, t),
                g = H(t, h, g);
            if (!g) return null;
            for (var h = [], k = [], l = 0; l < g.length; l++) b.getCoordSys() == TGOS.TGCoordSys.EPSG3857 ? (a = TGOS.GooToWGS84(g[l].left, g[l].top), h.push(new TGOS.TGPoint(a.x, a.y))) : h.push(new TGOS.TGPoint(g[l].left, g[l].top)), a = P(d, "1.0.0", f.layer, g[l].matrixSet, g[l].matrixId, g[l].row, g[l].col), k.push(a);
            e &&
                e.call(this, {
                    leftTopAnchor: h,
                    imageUrl: k
                })
        };
        this.Initialize = function(a) {
            s = a;
            u.style.zIndex = this.getZIndex();
            s.getHObject().appendChild(u);
            TGOS.getJSON(d + "?SERVICE=WMTS&REQUEST=GetCapabilities&VERSION=1.0.0", function(a) {
                E = a.Capabilities;
                if (!E) throw "Service Error";
                a = E.Contents.TileMatrixSet;
                if ("undefined" != typeof a.length)
                    for (var b = 0; b < a.length; b++) {
                        var d = a[b]["ows:Identifier"];
                        if (d && d == f.matrixSet) {
                            t = a[b];
                            break
                        }
                        t = a[0]
                    } else t = a;
                q = !0;
                v.RebuildElement();
                v.UpdateElement();
                g && g.call(this)
            }, TGOS.PROXY_SERVICE2)
        };
        this.UpdateElement = function() {
            if (q && w && t) {
                this.RebuildElement();
                for (var a = 0; a < p.length; a++) {
                    var b;
                    b = s.FromMapPoint(p[a].left, p[a].top);
                    p[a].img.style.left = b.x + "px";
                    p[a].img.style.top = b.y + "px"
                }
            }
        };
        this.putVisible = function(a) {
            w = a;
            u.style.display = a ? "" : "none"
        };
        this.removeWmtsLayer = function() {
            b.removeLayer(this)
        };
        this.getWmtsVisible = function() {
            return w
        };
        this.setWmtsVisible = function(a) {
            this.putVisible(a)
        };
        var M = function(a) {
                null !== k && a.left < k && (a.left = k);
                null !== l && a.top > l && (a.top = l);
                null !== h && a.right > h &&
                    (a.right = h);
                null !== m && a.bottom < m && (a.bottom = m);
                return a
            },
            P = function(a, b, d, e, f, g, h) {
                return a + "?SERVICE=WMTS&REQUEST=GetTile&VERSION=" + b + "&Layer=" + d + "&Style=" + A + "&Format=" + B + "&TileMatrixSet=" + e + "&TileMatrix=" + f + "&TileRow=" + g + "&TileCol=" + h
            },
            Q;
        this.RebuildElement = function() {
            if (q && w && t) {
                var a = s.ToMapPoint(0, 0),
                    e = s.ToMapPoint(s.getClientWidth(), s.getClientHeight()),
                    g = b.getZoom();
                if (Q != g && 0 < p.length) {
                    for (var h = 0; h < p.length; h++) C.removeChild(p[h].img);
                    p = []
                }
                Q = g;
                g = O(s, t);
                if (null != g) {
                    a = new TGOS.TGEnvelope(a.x,
                        a.y, e.x, e.y);
                    a = M(a);
                    g = H(t, g, a);
                    if (!g) return null;
                    a = [];
                    for (h = 0; h < g.length; h++) {
                        for (var e = g[h], k = !1, l = 0; l < p.length; l++)
                            if (p[l].equals(e)) {
                                k = !0;
                                break
                            }
                        k || a.push(e)
                    }
                    for (g = 0; g < a.length; g++) e = a[g], k = P(d, "1.0.0", f.layer, e.matrixSet, e.matrixId, e.row, e.col), h = C, l = document.createElement("img"), l.style.display = "none", l.onload = G, l.style.position = "absolute", l.galleryImg = !1, l.hideFocus = !0, l.style.MozUserSelect = "none", l.border = "0px", l.src = k, l.style.opacity = y, l.style.filter = "alpha(opacity=" + 100 * y + ")", h.appendChild(l),
                        e.img = l, p.push(e)
                }
            }
        };
        b.addLayer(this, !0)
    }
}();
TGOS.TGWfsLayer = function() {
    function a(a, b) {
        var d = a.split("?");
        if (1 == d.length) return null;
        for (var d = d[1].split("&"), e = 0; e < d.length; e++) {
            var f = d[e].split("=");
            if (f[0].toUpperCase() == b.toUpperCase()) return f[1]
        }
    }
    var d = function(a) {
            a = a.split(".");
            for (var b = [], d = 0; d < a.length; d++) b.push(a[d]);
            return b
        },
        b = function(a, b) {
            if ("1" != b[0] || "0" != b[1]) {
                a = a["#text"] || a;
                a = a.replace(/[\s]*$/gi, "").replace(/^[\s]*/gi, "").split(/[\s]+/);
                for (var d = [], e = 0; e < a.length; e += 2) {
                    var f = new TGOS.TGPoint(parseFloat(a[e]), parseFloat(a[e +
                        1]));
                    d.push(f)
                }
            } else {
                a = a["#text"] || a;
                for (var g = a.replace(/[\s]*$/gi, "").replace(/^[\s]*/gi, "").split(/[\s]+/), d = [], e = 0; e < g.length; e++) f = g[e].split(","), f = new TGOS.TGPoint(parseFloat(f[0]), parseFloat(f[1])), d.push(f)
            }
            return d
        },
        f = function(a, b, d) {
            var e = [],
                f;
            for (f in a) {
                var n = a[f];
                if (n && "object" === typeof n)
                    for (var p in n) switch (p) {
                        case b + ":MultiPolygon":
                            for (var y = k(n[p], b, d), z = 0; z < y.length; z++) e.push(y[z]);
                            break;
                        case b + ":MultiSurface":
                            y = k(n[p], b, d);
                            for (z = 0; z < y.length; z++) e.push(y[z]);
                            break;
                        case b + ":Polygon":
                            z =
                                g(n, b, d);
                            e.push(z);
                            break;
                        case b + ":MultiLineString":
                            y = h(n[p], b, d);
                            for (z = 0; z < y.length; z++) e.push(y[z]);
                            break;
                        case b + ":MultiCurve":
                            y = h(n[p], b, d);
                            for (z = 0; z < y.length; z++) e.push(y[z]);
                            break;
                        case b + ":LineString":
                            z = l(n, b, d);
                            e.push(z);
                            break;
                        case b + ":MultiPoint":
                            var z = b,
                                y = d,
                                w = n[p][z + ":pointMember"],
                                t = [];
                            if (void 0 !== w.length)
                                for (var u = 0; u < w.length; u++) {
                                    var C = m(w[u], z, y);
                                    t.push(C)
                                } else C = m(w, z, y), t.push(C);
                            y = t;
                            for (z = 0; z < y.length; z++) e.push(y[z]);
                            break;
                        case b + ":Point":
                            z = m(n[b + ":Point"], b, d), e.push(z)
                    }
            }
            return e
        },
        e = function(a, d, e) {
            a = b(a[d + ":coordinates"] || a[d + ":posList"], e);
            a = new TGOS.TGLineString(a);
            return new TGOS.TGLinearRing(a)
        },
        g = function(a, b, d) {
            var f = [];
            a = a[b + ":Polygon"];
            var g = e((a[b + ":outerBoundaryIs"] || a[b + ":exterior"])[b + ":LinearRing"], b, d);
            f.push(g);
            if (a = a[b + ":innerBoundaryIs"] || a[b + ":interior"])
                if (a instanceof Array)
                    for (g = 0; g < a.length; g++) {
                        var h = a[g][b + ":LinearRing"],
                            h = e(h, b, d);
                        f.push(h)
                    } else h = a[b + ":LinearRing"], h = e(h, b, d), f.push(h);
            return new TGOS.TGPolygon(f)
        },
        k = function(a, b, d) {
            a = a[b + ":polygonMember"] ||
                a[b + ":surfaceMember"];
            var e = [];
            if (void 0 !== a.length)
                for (var f = 0; f < a.length; f++) {
                    var h = g(a[f], b, d);
                    e.push(h)
                } else h = g(a, b, d), e.push(h);
            return e
        },
        l = function(a, d, e) {
            a = a[d + ":LineString"];
            d = b(a[d + ":coordinates"] || a[d + ":posList"], e);
            return new TGOS.TGLineString(d)
        },
        h = function(a, b, d) {
            a = a[b + ":lineStringMember"] || a[b + ":curveMember"];
            var e = [];
            if (void 0 !== a.length)
                for (var f = 0; f < a.length; f++) {
                    var g = l(a[f], b, d);
                    e.push(g)
                } else g = l(a, b, d), e.push(g);
            return e
        },
        m = function(a, d, e) {
            return b(a[d + ":coordinates"] || a[d + ":pos"],
                e)[0]
        },
        n = function(a, b, d) {
            this.zIndex = 0;
            this.defaultViewport = null;
            this.preserveViewport = !0;
            this.callback = d;
            this.gs = [];
            b && (void 0 !== b.map && this.setMap(b.map), void 0 !== b.preserveViewport && this.setPreserveViewport(b.preserveViewport), void 0 !== b.zIndex && this.setZIndex(b.zIndex), void 0 !== b.wfsVisible && this.setWfsVisible(b.wfsVisible));
            this.setUrl(a);
            this.update(this.callback)
        },
        p = n.prototype;
    p.update = function(b) {
        if (this.url && this.map) {
            var e = a(this.url, "typeName"),
                g = a(this.url, "version");
            if (!g) throw "Invalid WFS version";
            if (!e) throw "Invalid Type Name";
            var h = d(g);
            if (3 != h.length) throw "Invalid WFS version";
            e.split(":");
            var k = "",
                l = "",
                m = this;
            TGOS.getJSON(this.url, function(a) {
                if (!a || a.error) b.call(this, a.error);
                else {
                    var d, g;
                    for (g in a) 0 <= g.indexOf("FeatureCollection") && (d = a[g]);
                    if (d) {
                        for (var n in d)
                            if (0 <= n.indexOf("@xmlns:")) {
                                if ("http://www.opengis.net/gml" == d[n] || "http://www.opengis.net/gml/3.2" == d[n]) k = n.replace("@xmlns:", "");
                                if ("http://www.opengis.net/wfs" == d[n] || "http://www.opengis.net/wfs/2.0" == d[n]) l = n.replace("@xmlns:",
                                    "")
                            }
                        d = d[k + ":featureMember"] || d[k + ":featureMembers"] || d[k + ":member"] || d[l + ":member"];
                        a = [];
                        if (d) {
                            if (d.length)
                                for (g = 0; g < d.length; g++)
                                    for (n = f(d[g][e], k, h), p = 0; p < n.length; p++) a.push(n[p]);
                            else
                                for (g = g = 0; g < d[e].length; g++) {
                                    n = f(d[e][g], k, h);
                                    for (var p = 0; p < n.length; p++) a.push(n[p])
                                }
                            for (d = 0; d < a.length; d++) a[d] instanceof TGOS.TGPolygon ? (g = new TGOS.TGFill(m.map, a[d]), g.setOpacity(0.5), m.gs.push(g)) : a[d] instanceof TGOS.TGLineString ? (g = new TGOS.TGLine(m.map, a[d]), g.setStrokeWeight(4), m.gs.push(g)) : a[d] instanceof
                            TGOS.TGPoint && (g = new TGOS.TGMarker(m.map, a[d]), m.gs.push(g));
                            m.setZIndex(m.zIndex);
                            m.setWfsVisible(m.visible);
                            m.map && !0 == m.preserveViewport && m.getDefaultViewport() && m.map.fitBounds(m.getDefaultViewport());
                            b && b.call(m)
                        }
                    }
                }
            }, TGOS.PROXY_SERVICE2)
        }
    };
    p.setUrl = function(a, b) {
        this.url = a
    };
    p.setPreserveViewport = function(a) {
        this.preserveViewport = a
    };
    p.setZIndex = function(a) {
        this.zIndex = a;
        for (a = 0; a < this.gs.length; a++) this.gs[a].setZIndex(this.zIndex)
    };
    p.setMap = function(a) {
        this.map = a
    };
    p.getDefaultViewport = function() {
        if (!this.defaultViewport) {
            for (var a =
                    Infinity, b = -Infinity, d = -Infinity, e = Infinity, f = 0; f < this.gs.length; f++) {
                var g = this.gs[f].getBounds();
                g && (a = Math.min(a, g.left), e = Math.min(e, g.bottom), b = Math.max(b, g.right), d = Math.max(d, g.top))
            }
            isFinite(a) && isFinite(d) && isFinite(b) && isFinite(e) ? this.defaultViewport = new TGOS.TGEnvelope(a, d, b, e) : this.defaultViewport = null
        }
        return this.defaultViewport
    };
    p.getUrl = function() {
        return this.url
    };
    p.removeWfs = function() {
        for (var a = 0; a < this.gs.length; a++) this.gs[a].setMap(null), this.gs[a] = null;
        this.gs = [];
        this.map = null
    };
    p.getZIndex = function() {
        return this.zIndex
    };
    p.getWfsVisible = function() {
        return this.visible
    };
    p.setWfsVisible = function(a) {
        this.visible = a;
        for (a = 0; a < this.gs.length; a++) this.gs[a].setVisible(this.visible)
    };
    return n
}();
TGOS.CDC_SERVICE = getWebProtocal() + getAPIPath() + "CDCDistrict/StatisticsCombined.aspx";
TGOS.TGCounty = {
    KEELUNG: {
        code: "11"
    },
    TAIPEI: {
        code: "01"
    },
    XINBEI: {
        code: "31"
    },
    TAOYUAN: {
        code: "32"
    },
    HSINCHUCOUNTY: {
        code: "33"
    },
    HSINCHUCITY: {
        code: "12"
    },
    MIAOLI: {
        code: "35"
    },
    TAICHUNG: {
        code: "03"
    },
    CHANGHUA: {
        code: "37"
    },
    NANTOU: {
        code: "38"
    },
    YUNLIN: {
        code: "39"
    },
    CHIAYICOUNTY: {
        code: "40"
    },
    CHIAYICITY: {
        code: "22"
    },
    TAINAN: {
        code: "05"
    },
    KAOHSIUNG: {
        code: "07"
    },
    PINGTUNG: {
        code: "43"
    },
    YILAN: {
        code: "34"
    },
    HUALIEN: {
        code: "45"
    },
    TAITUNG: {
        code: "46"
    },
    PENGHU: {
        code: "44"
    },
    KINMEN: {
        code: "90"
    },
    LIENCHIANG: {
        code: "91"
    }
};
TGOS.TGCDCStatMapId = {
    COUNTYMAP: "COUNTYMAP",
    TOWNMAP: "TOWNMAP"
};
TGOS.TGCDCStatServiceStatus = {
    ERROR: "ERROR",
    INVALID_REQUEST: "INVALID_REQUEST",
    OK: "OK",
    OVER_QUERY_LIMIT: "OVER_QUERY_LIMIT",
    REQUEST_DENIED: "REQUEST_DENIED",
    UNKNOWN_ERROR: "UNKNOWN_ERROR",
    ZERO_RESULTS: "ZERO_RESULTS"
};
TGOS.TGCDCDistrictStat = function() {
    var a = function(a, d) {
            var e, g, k;
            if (!d) return null;
            switch (a) {
                case "year":
                    e = d.slice(0, 4);
                    if (isNaN(parseInt(e))) throw "Invalid Date";
                    break;
                case "month":
                    e = d.slice(0, 4);
                    g = d.slice(4, 6);
                    if (isNaN(parseInt(e)) || isNaN(parseInt(g))) throw "Invalid Date";
                    break;
                case "week":
                    e = d.slice(0, 4);
                    k = d.slice(4, 6);
                    if (isNaN(parseInt(e)) || isNaN(parseInt(k))) throw "Invalid Date";
                    break;
                default:
                    return null
            }
            return {
                year: e,
                month: g,
                week: k
            }
        },
        d = {
            EPSG3857: "EPSG3857",
            EPSG3826: "EPSG3826"
        };
    this.stat = function(b,
        f, e, g) {
        if (e) {
            if (!e) throw "Missing Request";
            if (!(f in d)) throw "Invalid Coordinate System";
            var k = e.width;
            b = e.height;
            var l = e.diseaseCode,
                h = e.graduatedColor,
                m = e.ageGroup,
                n = e.statType,
                p = e.date1,
                s = e.date2,
                q = e.gender,
                v = e.classifyMethod,
                x = e.dateType,
                A = e.countyName,
                B = e.classes,
                D = e.originInfection,
                y = e.layer,
                z = e.county,
                w = e.autoSize;
            switch (x) {
                case "year":
                    break;
                case "month":
                    break;
                case "week":
                    break;
                default:
                    throw "Invalid dateType";
            }
            e = a(x, p);
            s = a(x, s);
            if (!e || !s) throw "date1 and date2 are required";
            switch (D) {
                case "0":
                    D =
                        "0";
                    break;
                case "1":
                    D = "1";
                    break;
                default:
                    D = "all"
            }
            switch (q) {
                case "male":
                    q = "m";
                    break;
                case "female":
                    q = "f";
                    break;
                case "all":
                    q = "all";
                    break;
                default:
                    q = "all"
            }
            switch (m) {
                case "0to14":
                    m = "1";
                    break;
                case "15to49":
                    m = "2";
                    break;
                case "50upper":
                    m = "3";
                    break;
                default:
                    m = "a"
            }
            switch (n) {
                case "confirmed":
                    n = "deter";
                    break;
                case "reported":
                    n = "report";
                    break;
                default:
                    n = "deter"
            }
            switch (v) {
                case "EqualInterval":
                    v = "ei";
                    break;
                case "Quantile":
                    v = "qt";
                    break;
                case "StanDevi":
                    v = "sd";
                    break;
                case "TBClassfy":
                    v = "2005TB";
                    s = e;
                    break;
                default:
                    v = "ei"
            }
            switch (h.toLowerCase()) {
                case "red":
                    h =
                        "red";
                    break;
                case "yellow":
                    h = "yellow";
                    break;
                case "green'":
                    h = "green";
                    break;
                case "blue":
                    h = "blue";
                    break;
                default:
                    h = "green"
            }
            switch (A) {
                case !0:
                    A = "true";
                    break;
                case !1:
                    A = "false";
                    break;
                default:
                    A = "false"
            }
            l = "?disease=" + l;
            w || (l = l + "&width=" + k + "&height=" + b);
            l = l + "&layer=" + y;
            l = l + "&classm=" + v;
            l = l + "&color=" + h;
            l = l + "&gender=" + q;
            l = l + "&classes=" + B;
            l = l + "&ag=" + m;
            l = l + "&dateType=" + x;
            l = l + "&sy=" + e.year;
            l = l + "&ey=" + s.year;
            l = l + "&label=" + A;
            l = l + "&oi=" + D;
            l = l + "&stattype=" + n;
            z && z.code && (l = l + "&targetDist=" + z.code);
            switch (x) {
                case "week":
                    l =
                        l + "&sw=" + e.week;
                    l = l + "&ew=" + s.week;
                    break;
                case "month":
                    l = l + "&sm=" + e.month, l = l + "&em=" + s.month
            }
            b = TGOS.CDC_SERVICE + l + "&t=data";
            var t = TGOS.CDC_SERVICE + l + "&t=img&keystr=" + encodeURIComponent(TGOS.tgHash),
                u = {};
            TGOS.getJSON(b, function(a) {
                if (a)
                    if (a.error) switch (a.error) {
                        case "ZERO_RESULT":
                            g.call(this, u, "ZERO_RESULT");
                            break;
                        default:
                            g.call(this, u, "INVALID_REQUEST")
                    } else {
                        u.district = a.district;
                        u.legend = a.legend;
                        if ("EPSG3826" == f) var b = parseFloat(a.bounds.left),
                            d = parseFloat(a.bounds.top),
                            e = parseFloat(a.bounds.right),
                            h = parseFloat(a.bounds.bottom);
                        else "EPSG3857" == f && (d = TGOS.TWD97toWGS84(a.bounds.left, a.bounds.top), a = TGOS.TWD97toWGS84(a.bounds.right, a.bounds.bottom), b = d.x, d = d.y, e = a.x, h = a.y);
                        u.envelope = new TGOS.TGEnvelope(b, d, e, h);
                        b = (d - h) / (e - b);
                        w && (t = t + "&width=" + k, t = t + "&height=" + Math.round(k * b));
                        u.imageUrl = t;
                        g.call(this, u, "OK")
                    } else g.call(this, u, "INVALID_REQUEST")
            })
        } else g.call(this, null)
    }
};
TGOS.TGMarkerCluster = function() {
    var a = TGOS.RES_PATH + "clusters/cluster-10-99.png",
        d = TGOS.RES_PATH + "clusters/cluster-100-999.png",
        b = TGOS.RES_PATH + "clusters/cluster-999up.png",
        f = new TGOS.TGImage(TGOS.RES_PATH + "clusters/cluster-2-9.png", new TGOS.TGSize(36, 36), null, new TGOS.TGPoint(18, 18)),
        a = new TGOS.TGImage(a, new TGOS.TGSize(48, 48), null, new TGOS.TGPoint(24, 24)),
        d = new TGOS.TGImage(d, new TGOS.TGSize(64, 64), null, new TGOS.TGPoint(32, 32)),
        b = new TGOS.TGImage(b, new TGOS.TGSize(72, 72), null, new TGOS.TGPoint(36,
            36)),
        e = function(a, b, d) {
            a = {
                center: {
                    x: a.x,
                    y: a.y
                },
                markers: b,
                symbols: []
            };
            d && (a.centerLonLat = {
                x: d.x,
                y: d.y
            });
            return a
        },
        g = function(a) {
            if (!a) return null;
            for (var b = Infinity, d = Infinity, e = -Infinity, f = -Infinity, g = 0; g < a.length; g++) var k = a[g].getPosition(),
                b = Math.min(b, k.x),
                d = Math.min(d, k.y),
                e = Math.max(e, k.x),
                f = Math.max(f, k.y);
            a = new TGOS.TGEnvelope;
            a.left = b;
            a.top = f;
            a.right = e;
            a.bottom = d;
            return a
        },
        k = function(a, b, d) {
            var e = this;
            this.map = a ? a : null;
            this.clusters = [];
            this.markers = [];
            if (b && b.length)
                for (var f = 0; f < b.length; f++) this.markers.push(b[f]);
            this.clickable = !0;
            this.clickHandler = function() {
                e.clickable && TGOS.TGEvent.trigger_(e, "clusterclick", {
                    specifiedCluster: this.cluster.markers,
                    clusterEnvelope: g(this.cluster.markers)
                })
            };
            TGOS.TGEvent.addListener(a, "idle", function() {
                e.redrawViewport()
            });
            TGOS.TGEvent.addListener(a, "zoom_changed", function() {
                if (e.map.getZoom() > e.maxZoom) {
                    e.clearClusters();
                    for (var a = 0; a < e.markers.length; a++) e.markers[a].setMap(e.map)
                } else {
                    for (a = 0; a < e.markers.length; a++) e.markers[a].setMap(null);
                    e.clearClusters()
                }
            });
            d && ("number" ==
                typeof d.bounds && (this.bounds = d.bounds), "number" == typeof d.maxZoom && (this.maxZoom = d.maxZoom), d.scaleClass && "number" == typeof d.scaleClass.length && (this.scaleClass = d.scaleClass), d.style && "number" == typeof d.style.length && (this.styles = d.style), d.updateCenter && (this.updateCenter = d.updateCenter))
        },
        l = k.prototype;
    l.clusters = null;
    l.cursor = "default";
    l.visible = !0;
    l.zIndex = 0;
    l.bounds = 30;
    l.map = null;
    l.markers = null;
    l.scaleClass = [9, 99, 999];
    l.classifyMarker = function(a) {
        var b = Infinity,
            d = null,
            f = this.map.getMapBase(),
            g = a.getPosition(),
            k = this.map.getCoordSys();
        k == TGOS.TGCoordSys.EPSG3857 && (g = a.gPos);
        var l = f.FromMapPoint(g.x, g.y),
            x = 2 * this.bounds;
        if (0 == this.clusters.length) {
            var A = a.getPosition();
            if (k == TGOS.TGCoordSys.EPSG3857) var B = A,
                A = a.gPos;
            g = e({
                x: A.x,
                y: A.y
            }, [a], B);
            this.clusters.push(g)
        } else {
            for (var D = 0; D < this.clusters.length; D++) {
                var y = this.clusters[D].center,
                    A = f.FromMapPoint(y.x, y.y),
                    y = l.x - A.x,
                    A = l.y - A.y,
                    y = Math.sqrt(y * y + A * A);
                y <= b && (b = y, d = D)
            }
            b <= x ? (b = this.clusters[d], this.updateCenter && (b.center.x = (b.center.x * b.markers.length +
                g.x) / (b.markers.length + 1), b.center.y = (b.center.y * b.markers.length + g.y) / (b.markers.length + 1)), b.markers.push(a), g = b) : (A = a.getPosition(), k == TGOS.TGCoordSys.EPSG3857 && (B = A, A = a.gPos), g = e({
                x: A.x,
                y: A.y
            }, [a], B), this.clusters.push(g))
        }
        a.isClustered = !0;
        return a.parentCluster = g
    };
    l.styles = [{
        icon: f,
        label: new TGOS.TGPoint(0, 0),
        labelColor: "#f0f0f0",
        labelSize: 12
    }, {
        icon: a,
        label: new TGOS.TGPoint(0, 0),
        labelColor: "#f0f0f0",
        labelSize: 14
    }, {
        icon: d,
        label: new TGOS.TGPoint(0, 0),
        labelColor: "#f0f0f0",
        labelSize: 16
    }, {
        icon: b,
        label: new TGOS.TGPoint(0, 0),
        labelColor: "#f0f0f0",
        labelSize: 18
    }];
    l.setMarkers = function(a, b) {
        this.markers = a;
        for (var d = 0; d < this.markers.length; d++) this.classifyMarker(this.markers[d])
    };
    l.getClickable = function() {
        return this.clickable
    };
    l.setClickable = function(a) {
        this.clickable = a
    };
    l.addMarkers = function(a, b) {
        for (var d = 0; d < a.length; d++) this.markers.push(a[d]);
        b && this.redrawAll()
    };
    l.addMarker = function(a, b) {
        this.markers.push(a);
        b && this.redrawAll()
    };
    l.redrawAll = function() {
        if (this.map.getZoom() > this.maxZoom) {
            this.clearClusters();
            for (var a = 0; a < this.markers.length; a++) this.markers[a].setMap(this.map)
        } else {
            for (a = 0; a < this.markers.length; a++) this.markers[a].setMap(null);
            this.clearClusters();
            this.redrawViewport()
        }
    };
    l.clearAll = function() {
        this.clearClusters();
        this.markers = []
    };
    l.clearClusters = function() {
        for (var a = 0; a < this.clusters.length; a++) {
            for (var b = this.clusters[a], d = 0; d < b.symbols.length; d++) b.symbols[d].setMap(null);
            b.symbols = [];
            for (d = 0; d < b.markers.length; d++) b.markers[d].isClustered = !1
        }
        this.clusters = []
    };
    l.getClustersCounts =
        function() {
            return this.clusters ? this.clusters.length : 0
        };
    l.getExtendedBounds = function() {
        var a = this.map.getRawBound(),
            b = this.bounds,
            d = a.left,
            e = a.top,
            f = a.right,
            a = a.bottom,
            g = this.map.getMapBase().FromMapDistX(b),
            b = this.map.getMapBase().FromMapDistY(b);
        return new TGOS.TGEnvelope(d - g, e + b, f + g, a - b)
    };
    l.redrawViewport = function() {
        if (this.map)
            if (this.map.getZoom() > this.maxZoom) this.clearClusters();
            else {
                for (var a = this.getExtendedBounds(), b = 0; b < this.markers.length; b++) {
                    var d = this.markers[b],
                        e = d.getPosition();
                    this.map.getCoordSys() ==
                        TGOS.TGCoordSys.EPSG3857 && (d.gPos || (d.gPos = TGOS.WGS84ToGoo(e.x, e.y)), e = d.gPos);
                    !d.isClustered && a.contains(e) && this.classifyMarker(this.markers[b])
                }
                for (a = 0; a < this.clusters.length; a++) 0 >= this.clusters[a].symbols.length && this.addClusterMarker(this.clusters[a])
            }
    };
    l.addClusterMarker = function(a) {
        var b;
        b = a.centerLonLat ? a.centerLonLat : a.center;
        var d = new TGOS.TGPoint(b.x, b.y);
        b = a.markers.length;
        var e = new TGOS.TGMarker(null, d);
        e.setFlat(!0);
        e.setClickable(!0);
        e.setVisible(this.visible);
        e.setZIndex(this.zIndex);
        e.setMap(this.map);
        a.symbols.push(e);
        if (1 < b) {
            var f = new TGOS.TGLabel({
                map: this.map,
                position: d,
                fontColor: "#ff0000",
                fontSize: this.bounds,
                fontWeight: "bold",
                opacity: 1,
                zIndex: this.zIndex + 1,
                label: b.toString()
            });
            f.setZIndex(this.zIndex + 1);
            f.setVisible(this.visible);
            a.symbols.push(f)
        }
        a: {
            var d = this.scaleClass,
                g = this.styles;
            if (1 == a.markers.length) a.symbols[0].setIcon(a.markers[0].getIcon());
            else {
                for (var k = 0; k < d.length; k++)
                    if (a.markers.length <= d[k]) {
                        d = k > g.length - 1 ? g[g.length - 1] : g[k];
                        a.symbols[0].setIcon(d.icon);
                        a.symbols[0].setTitle(a.markers.length);
                        a.symbols[1].setFontColor(d.labelColor ? d.labelColor : "#f0f0f0");
                        a.symbols[1].setFontSize(d.labelSize ? d.labelSize : 12);
                        d.labelAnchor && a.symbols[1].setOffset(d.labelAnchor);
                        break a
                    }
                d = g[g.length - 1];
                a.symbols[0].setIcon(d.icon);
                a.symbols[0].setTitle(a.markers.length);
                a.symbols[1].setFontColor(d.labelColor ? d.labelColor : "#f0f0f0");
                a.symbols[1].setFontSize(d.labelSize ? d.labelSize : 12);
                d.labelAnchor && a.symbols[1].setOffset(d.labelAnchor)
            }
        }
        1 == b && (TGOS.TGEvent.copyEvent(a.markers[0],
            e), e.setTitle(a.markers[0].getTitle()), e.annotation = a.markers[0].annotation);
        f && (f.cluster = a, TGOS.TGEvent.addListener(f, "click", this.clickHandler));
        e && (e.cluster = a, TGOS.TGEvent.addListener(e, "click", this.clickHandler))
    };
    l.getScaleClass = function() {
        return this.scaleClass
    };
    l.setScaleClass = function(a) {
        this.scaleClass = a
    };
    l.setClusterStyle = function(a) {
        this.styles = a
    };
    l.getClusterStyle = function() {
        return this.styles
    };
    l.removeMarker = function(a, b) {
        for (var d = 0; d < this.markers.length; d++)
            if (this.markers[d] == a) {
                this.markers.splice(d,
                    1);
                break
            }
        b && this.redrawAll()
    };
    l.removeMarkers = function(a, b) {
        for (var d = 0; d < a.length; d++)
            for (var e = 0; e < this.markers.length; e++)
                if (this.markers[e] == a[d]) {
                    this.markers.splice(e, 1);
                    break
                }
        b && this.redrawAll()
    };
    l.setVisible = function(a, b) {
        this.visible = a;
        b && this.redrawAll()
    };
    l.getVisible = function() {
        return this.visible
    };
    l.setSearchBounds = function(a) {
        this.bounds = a
    };
    l.getCursor = function() {
        return this.cursor
    };
    l.setCursor = function(a, b) {
        this.cursor = a;
        b && this.redrawAll()
    };
    l.setZIndex = function(a, b) {
        this.zIndex = a;
        b &&
            this.redrawAll()
    };
    l.getZIndex = function() {
        return this.zIndex
    };
    l.maxZoom = Infinity;
    l.getMaxZoom = function() {
        return this.maxZoom
    };
    l.setMaxZoom = function(a) {
        this.maxZoom = a
    };
    TGOS.RegisterEvent(k, ["clusterclick"]);
    return k
}();
TGOS.TGData = function() {
    var a = "Point MultiPoint LineString MultiLineString Polygon MultiPolygon GeometryCollection".split(" "),
        d = function(a, b, d) {
            var e = a[0];
            a = a[1];
            b = b == d ? {
                x: e,
                y: a
            } : TGOS[b + "to" + d](e, a);
            return new TGOS.TGPoint(b.x, b.y)
        },
        b = function(a, e, f) {
            switch (a.type) {
                case "Point":
                    return d(a.coordinates, e, f);
                case "MultiPoint":
                    for (var g = [], n = 0; n < a.coordinates.length; n++) g.push(d(a.coordinates[n], e, f));
                    return new TGOS.TGMultiPoint(g);
                case "LineString":
                    g = [];
                    for (n = 0; n < a.coordinates.length; n++) g.push(d(a.coordinates[n],
                        e, f));
                    return new TGOS.TGLineString(g);
                case "MultiLineString":
                    for (var p = [], s = 0; s < a.coordinates.length; s++) {
                        g = [];
                        for (n = 0; n < a.coordinates[s].length; n++) g.push(d(a.coordinates[s][n], e, f));
                        g = new TGOS.TGLineString(g);
                        p.push(g)
                    }
                    return new TGOS.TGMultiLineString(p);
                case "Polygon":
                    for (var q = [], s = 0; s < a.coordinates.length; s++) {
                        g = [];
                        if (0 == s)
                            for (n = 0; n < a.coordinates[s].length; n++) g.push(d(a.coordinates[s][n], e, f));
                        else
                            for (n = a.coordinates[s].length - 1; 0 <= n; n--) g.push(d(a.coordinates[s][n], e, f));
                        g = new TGOS.TGLineString(g);
                        g = new TGOS.TGLinearRing(g);
                        q.push(g)
                    }
                    return new TGOS.TGPolygon(q);
                case "MultiPolygon":
                    for (var v = [], p = 0; p < a.coordinates.length; p++) {
                        q = [];
                        for (s = 0; s < a.coordinates[p].length; s++) {
                            g = [];
                            for (n = 0; n < a.coordinates[p][s].length; n++) g.push(d(a.coordinates[p][s][n], e, f));
                            g = new TGOS.TGLineString(g);
                            g = new TGOS.TGLinearRing(g);
                            q.push(g)
                        }
                        s = new TGOS.TGPolygon(q);
                        v.push(s)
                    }
                    return new TGOS.TGMultiPolygon(v);
                case "GeometryCollection":
                    e = [];
                    for (p = 0; p < a.geometries.length; p++) f = b(a.geometries[p]), e.push(f);
                    return new TGOS.TGGeometryCollection(e);
                default:
                    throw "Unable to import GeoJSON";
            }
        },
        f = function(a, d, e, f) {
            e = b(a.geometry, e, f);
            f = a.properties;
            a = a.id;
            d && d.idPropertyName && f && (a = f[d.idPropertyName]);
            return new TGOS.TGGraphic({
                geometry: e,
                properties: f,
                id: a
            })
        },
        e = function(a) {
            this.graphics = [];
            a.map && (this.map = a.map);
            a.style && (this.style = a.style)
        };
    e.prototype = new TGOS.MVCObject;
    var g = e.prototype;
    g.graphics = null;
    g.map = null;
    g.style = null;
    g.add = function(a) {
        if (a instanceof TGOS.TGGraphic) return this.graphics.push(a), this.bindTo("style", a, "style"), a.draw(this.map),
            this.bindEvents(a), TGOS.TGEvent.trigger_(this, "addgraphic", a), a
    };
    g.bindEvents = function(a) {
        var b = this;
        TGOS.TGEvent.addListener(a, "setproperty", function(a) {
            b.redraw(a.graphic);
            TGOS.TGEvent.trigger_(b, "setproperty", a)
        });
        TGOS.TGEvent.addListener(a, "setgeometry", function(a) {
            b.redraw(a.graphic);
            TGOS.TGEvent.trigger_(b, "setgeometry", a)
        });
        TGOS.TGEvent.addListener(a, "removeproperty", function(a) {
            b.redraw(a.graphic);
            TGOS.TGEvent.trigger_(b, "removeproperty", a)
        });
        TGOS.TGEvent.addListener(a, "mousedown", function(d) {
            d.graphic =
                a;
            TGOS.TGEvent.trigger_(b, "mousedown", d)
        });
        TGOS.TGEvent.addListener(a, "mouseup", function(d) {
            d.graphic = a;
            TGOS.TGEvent.trigger_(b, "mouseup", d)
        });
        TGOS.TGEvent.addListener(a, "mousemove", function(d) {
            d.graphic = a;
            TGOS.TGEvent.trigger_(b, "mousemove", d)
        });
        TGOS.TGEvent.addListener(a, "mouseover", function(d) {
            d.graphic = a;
            TGOS.TGEvent.trigger_(b, "mouseover", d)
        });
        TGOS.TGEvent.addListener(a, "dblclick", function(d) {
            d.graphic = a;
            TGOS.TGEvent.trigger_(b, "dblclick", d)
        });
        TGOS.TGEvent.addListener(a, "click", function(d) {
            d.graphic =
                a;
            TGOS.TGEvent.trigger_(b, "click", d)
        });
        TGOS.TGEvent.addListener(a, "rightclick", function(d) {
            d.graphic = a;
            TGOS.TGEvent.trigger_(b, "rightclick", d)
        });
        TGOS.TGEvent.addListener(a, "mouseout", function(d) {
            d.graphic = a;
            TGOS.TGEvent.trigger_(b, "mouseout", d)
        })
    };
    g.removeAllGraphics = function() {
        this.forEach(function(a) {
            this.remove(a)
        })
    };
    g.remove = function(a) {
        if (a && this.contains(a)) {
            a.clear();
            var b = this.graphics.indexOf(a);
            this.graphics.splice(b, 1);
            TGOS.TGEvent.trigger_(this, "removegraphic", a)
        }
    };
    g.forEach = function(a,
        b) {
        for (var d = this.graphics.slice(0), e = 0; e < d.length; e++) a.call(b, d[e])
    };
    g.contains = function(a) {
        if (!(a instanceof TGOS.TGGraphic)) return !1;
        for (var b = 0; b < this.graphics.length; b++)
            if (this.graphics[b] == a) return !0;
        return !1
    };
    g.getGraphicById = function(a) {
        for (var b = 0; b < this.graphics.length; b++)
            if (this.graphics[b].id === a) return this.graphics[b]
    };
    g.getMap = function() {
        return this.map
    };
    g.setMap = function(a) {
        this.clearAll();
        (this.map = a) && this.redrawAll()
    };
    g.clearAll = function() {
        this.forEach(function(a) {
            a.clear()
        })
    };
    g.getStyle = function() {
        return this.style
    };
    g.setStyle = function(a) {
        this.set("style", a);
        this.redrawAll()
    };
    g.redrawAll = function() {
        var a = this;
        this.forEach(function(b) {
            b.redraw(a.map)
        })
    };
    g.redraw = function(a) {
        that = this;
        this.contains(a) && a.redraw(that.map)
    };
    g.overrideStyle = function(a, b) {
        a instanceof TGOS.TGGraphic && (a.ownStyle = b, a.redraw())
    };
    g.revertStyle = function(a) {
        a instanceof TGOS.TGGraphic && (a.ownStyle = null, a.redraw())
    };
    g.loadGeoJson = function(a, b, d) {
        var e, f = this;
        e = window.XMLHttpRequest ? new XMLHttpRequest :
            new ActiveXObject("Microsoft.XMLHTTP");
        e.onreadystatechange = function() {
            if (4 == e.readyState && 200 == e.status) {
                var a = JSON.parse(e.responseText),
                    a = f.addGeoJson(a);
                d.call(void 0, a)
            }
        };
        e.open("GET", a, !0);
        e.send()
    };
    g.addGeoJson = function(d, e) {
        if (!d) throw "Unable to import GeoJSON";
        var g = "WGS84";
        if (d.crs && "name" == d.crs.type && d.crs.properties) {
            var m = d.crs.properties.name;
            "urn:ogc:def:crs:EPSG::3826" == m ? g = "TWD97" : "urn:ogc:def:crs:EPSG::3825" == m && (g = "TWD67")
        }
        m = null;
        switch (this.map.getCoordSys()) {
            case TGOS.TGCoordSys.EPSG3857:
                m =
                    "WGS84";
                break;
            case TGOS.TGCoordSys.EPSG3826:
                m = "TWD97";
                break;
            case TGOS.TGCoordSys.EPSG3825:
                m = "TWD67";
                break;
            default:
                throw "Invalid Map CRS";
        }
        if (0 <= a.indexOf(d.type)) return g = b(d, g, m), g = new TGOS.TGGraphic({
            geometry: g
        }), this.add(g), [g];
        if ("Feature" == d.type) return g = f(d, e, g, m), this.add(g), [g];
        if ("FeatureCollection" == d.type) {
            for (var n = m, m = [], p = 0; p < d.features.length; p++) m.push(f(d.features[p], e, g, n));
            for (g = 0; g < m.length; g++) this.add(m[g]);
            return m
        }
        throw "Unable to import GeoJSON";
    };
    TGOS.RegisterEvent(e, "addgraphic removegraphic removeproperty setgeometry setproperty click dblclick mousedown mouseup mouseout mouseover mousemove rightclick".split(" "));
    return e
}();
TGOS.TGGeometry.TGSpherical = function() {
    var a = {
        EARTH_RADIUS: 6378137,
        computeSignedArea: function(a, b) {
            for (var f = "number" == typeof b ? b : 6378137, e = 0, g = a.length, k = a[g - 1].x, l = a[g - 1].y, h = 0; h < g; h++) var m = a[h].x,
                n = a[h].y,
                e = e + TGOS.math.toRadian(m - k) * (2 + Math.sin(TGOS.math.toRadian(l)) + Math.sin(TGOS.math.toRadian(n))),
                k = m,
                l = n;
            return e * f * f / 2
        },
        computeArea: function(d, b) {
            return Math.abs(a.computeSignedArea(d), b)
        },
        computeDistanceBetween: function(a, b, f) {
            f = "number" == typeof f ? f : 6378137;
            var e = TGOS.math.toRadian(a.y),
                g = TGOS.math.toRadian(b.y);
            a = TGOS.math.toRadian(b.x - a.x);
            return f * Math.acos(Math.sin(e) * Math.sin(g) + Math.cos(e) * Math.cos(g) * Math.cos(a))
        },
        computeHeading: function(a, b) {
            var f = TGOS.math.toRadian(a.y),
                e = TGOS.math.toRadian(b.y),
                g = TGOS.math.toRadian(b.x - a.x),
                k = Math.sin(g) * Math.cos(e),
                f = Math.cos(f) * Math.sin(e) - Math.sin(f) * Math.cos(e) * Math.cos(g);
            return TGOS.math.toDegree(Math.atan2(k, f))
        },
        computeLength: function(d, b) {
            for (var f = 0, e = 0; e < d.length - 1; e++) f += a.computeDistanceBetween(d[e], d[e + 1], b);
            return f
        },
        computeOffset: function(a, b, f,
            e) {
            var g = "number" == typeof e ? e : 6378137;
            f = TGOS.math.toRadian(f);
            e = TGOS.math.toRadian(a.y);
            a = TGOS.math.toRadian(a.x);
            g = b / g;
            b = Math.asin(Math.sin(e) * Math.cos(g) + Math.cos(e) * Math.sin(g) * Math.cos(f));
            f = a + Math.atan2(Math.sin(f) * Math.sin(g) * Math.cos(e), Math.cos(g) - Math.sin(e) * Math.sin(b));
            return new TGOS.TGPoint(TGOS.math.toDegree(f), TGOS.math.toDegree(b))
        },
        interpolate: function(a, b, f) {
            var e = TGOS.math.toRadian(a.y);
            a = TGOS.math.toRadian(a.x);
            var g = TGOS.math.toRadian(b.y),
                k = TGOS.math.toRadian(b.x),
                l = Math.cos(e),
                e = Math.sin(e),
                h = Math.cos(g),
                g = Math.sin(g),
                m = Math.cos(k - a),
                n = e * g + l * h * m;
            if (1 <= n) return b.slice();
            n = f * Math.acos(n);
            b = Math.cos(n);
            f = Math.sin(n);
            k = Math.sin(k - a) * h;
            h = Math.atan2(k, l * g - e * h * m);
            k = Math.asin(e * b + l * f * Math.cos(h));
            a += Math.atan2(Math.sin(h) * f * l, b - e * Math.sin(k));
            return new TGOS.TGPoint(TGOS.math.toDegree(a), TGOS.math.toDegree(k))
        }
    };
    return a
}();
(function() {
    TGOS.TGOverlayView = function() {};
    var a = TGOS.TGOverlayView.prototype;
    a.setMap = function(a) {
        null == a ? (this.map.removeLayer(this), this.map = null) : a instanceof TGOS.TGOnlineMap && (this.map = a, this.map.addLayer(this))
    };
    a.getMap = function() {
        return this.map
    };
    a.getPanes = function() {
        return this.map ? this.map.getPanes() : null
    };
    a.getProjection = function() {
        if (!this.map) return null;
        var a = this.map,
            b = a.getMapBase(),
            f = a.getCoordSys();
        return {
            fromDivToMap: function(a) {
                if (f == TGOS.TGCoordSys.EPSG3857) return a = b.ToMapPoint(a.x,
                    a.y), a = TGOS.WGS84ToGoo(a.x, a.y), new TGOS.TGPoint(a.x, a.y);
                a = b.ToMapPoint(a.x, a.y);
                return new TGOS.TGPoint(a.x, a.y)
            },
            fromMapToDiv: function(a) {
                if (f == TGOS.TGCoordSys.EPSG3857) return a = TGOS.WGS84ToGoo(a.x, a.y), a = b.FromMapPoint(a.x, a.y), new TGOS.TGPoint(a.x, a.y);
                a = b.FromMapPoint(a.x, a.y);
                return new TGOS.TGPoint(a.x, a.y)
            }
        }
    };
    a.Initialize = function() {
        this.onAdd()
    };
    a.UpdateElement = function() {
        this.onDraw()
    };
    a.RebuildElement = function() {
        this.onDraw()
    };
    a.RemoveSelf = function() {
        this.onRemove()
    }
})();
(function() {
    var a = function(a, b, d, k) {
            this.max = "number" == typeof a ? a : 1;
            this.min = "number" == typeof b ? b : 0;
            this.radius = d;
            k && (this.stops = k);
            a = document.createElement("canvas");
            a.width = 1;
            a.height = d;
            a = a.getContext("2d");
            b = a.createLinearGradient(0, 0, 0, d);
            for (var l = k = 1 / this.stops.length, h = 0; h < this.stops.length; h++) b.addColorStop(l, this.stops[h]), l += k;
            a.fillStyle = b;
            a.fillRect(0, 0, 1, d);
            this.data = a.getImageData(0, 0, 1, d).data
        },
        d = a.prototype;
    d.stops = "rgba(0,0,255,0) #00f #0ff #0f0 #ff0 #f00".split(" ");
    d.getColor =
        function(a) {
            a = (a - this.min) / (this.max - this.min);
            1 < a && (a = 1);
            a = 4 * Math.round((this.radius - 1) * a);
            return [this.data[a], this.data[a + 1], this.data[a + 2], this.data[a + 3]]
        };
    var b = function(a, b, d) {
        for (var k = [], l = 2 * a, h = 0; h < l; h++) {
            for (var m = [], n = 0; n < l; n++) {
                var p = a - 1 - h,
                    s = a - 1 - n,
                    p = Math.sqrt(p * p + s * s),
                    s = 0,
                    q = p / a,
                    q = 0.5 > q ? 2 * q * q : -1 + (4 - 2 * q) * q;
                p < a && (s = b * (1 - q));
                m.push(s)
            }
            k.push(m)
        }
        this.cmap = k;
        this.radius = a;
        this.intensity = b;
        d && (this.maxIntensity = d.maxIntensity)
    };
    b.prototype.process = function(a, b, d) {
        var k = a.length,
            l = a[0].length;
        b -= this.radius;
        var h = b + 2 * this.radius;
        d -= this.radius;
        for (var m = d + 2 * this.radius, h = 0 > h ? 0 : h >= k ? k : h, n = 0 > d ? 0 : d > l ? l : d, l = 0 > m ? 0 : m >= l ? l : m, m = -Infinity, p = Infinity, k = 0 > b ? 0 : b > k ? k : b; k < h; k++)
            for (var s = n; s < l; s++) a[k][s] += this.cmap[k - b][s - d], "number" == typeof this.maxIntensity && a[k][s] > this.maxIntensity && (a[k][s] = maxIntensity), m = Math.max(m, a[k][s]), p = Math.min(p, a[k][s]);
        return {
            max: m,
            min: p
        }
    };
    TGOS.TGHeatmapLayer = function(a) {
        this.data = [];
        this.div = document.createElement("div");
        this.div.style.width = "100%";
        this.div.style.height =
            "100%";
        this.div.style.position = "absolute";
        this.cv = document.createElement("canvas");
        this.cv.style.position = "absolute";
        this.div.appendChild(this.cv);
        this.ctx = this.cv.getContext("2d");
        this.cacheImage = new Image;
        a && this.setOptions(a)
    };
    TGOS.TGHeatmapLayer.prototype = new TGOS.TGOverlayView;
    d = TGOS.TGHeatmapLayer.prototype;
    d.getData = function() {
        return this.data
    };
    d.createKernels = function() {
        this.kernels = [];
        for (var a = 0; a < this.data.length; a++) {
            var d = "number" == typeof this.data[a].weight ? this.data[a].weight : 1,
                g = 1;
            this.dissipating && (g = this.map.getZoom(), g = Math.pow(2, g));
            d = new b((this.radius ? this.radius : 10) * g, d);
            this.kernels.push(d)
        }
    };
    d.setData = function(a) {
        this.data = a;
        this.createKernels();
        this.draw_()
    };
    d.createHeatmap = function(a, b) {
        for (var d = [], k = 0; k < a; k++) {
            for (var l = [], h = 0; h < b; h++) l.push(null);
            d.push(l)
        }
        return d
    };
    d.onAdd = function() {
        this.getPanes().overlayviewLayer.appendChild(this.div);
        this.width = this.div.clientWidth;
        this.height = this.div.clientHeight;
        this.cv.width = this.width;
        this.cv.height = this.height;
        var a =
            this;
        this.chl && TGOS.TGEvent.removeListener(this.chl);
        this.il && TGOS.TGEvent.removeListener(this.il);
        this.rl && TGOS.TGEvent.removeListener(this.rl);
        this.chl = TGOS.TGEvent.addListener(this.map, "center_changed", function() {
            a.translate()
        });
        this.il = TGOS.TGEvent.addListener(this.map, "idle", function() {
            a.draw_()
        });
        this.rl = TGOS.TGEvent.addListener(this.map, "resize", function() {
            a.width = a.div.clientWidth;
            a.height = a.div.clientHeight;
            a.cv.width = a.div.clientWidth;
            a.cv.height = a.div.clientHeight;
            a.draw_()
        });
        a.draw_()
    };
    d.translate = function() {
        if (this.center_) {
            var a = this.getProjection(),
                b = this.map.getCenter(),
                d = a.fromMapToDiv(this.center_),
                b = a.fromMapToDiv(b),
                a = b.x - d.x,
                d = b.y - d.y;
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.drawImage(this.cacheImage, -a, -d)
        }
    };
    d.draw_ = function() {
        this.heatmap = this.createHeatmap(this.width, this.height);
        var b = -Infinity,
            d = 0,
            g = this.getProjection();
        this.kernels && !this.dissipating || this.createKernels();
        for (var k = 0; k < this.data.length; k++) var l = g.fromMapToDiv(this.data[k]),
            l = this.kernels[k].process(this.heatmap,
                Math.round(l.x), Math.round(l.y)),
            b = Math.max(l.max, b),
            d = Math.min(l.min, d);
        "number" == typeof this.maxIntensity && (b = this.maxIntensity);
        b = new a(b, d, 256, this.gradient ? this.gradient : this.stops);
        this.ctx.clearRect(0, 0, this.width, this.height);
        d = this.ctx.createImageData(this.width, this.height);
        for (g = 0; g < this.heatmap.length; g++)
            for (k = 0; k < this.heatmap[g].length; k++)
                if (l = this.heatmap[g][k], null != l) {
                    var l = b.getColor(l),
                        h = d,
                        m = l[1],
                        n = l[2],
                        p = l[3],
                        s = 4 * (g + k * h.width);
                    h.data[s] = l[0];
                    h.data[s + 1] = m;
                    h.data[s + 2] = n;
                    h.data[s +
                        3] = p
                }
        this.ctx.putImageData(d, 0, 0);
        this.cacheImage.src = this.cv.toDataURL();
        this.center_ = this.map.getCenter()
    };
    d.onDraw = function() {};
    d.onRemove = function() {
        this.div.parentNode.removeChild(this.div)
    };
    d.setOptions = function(a) {
        a && (a.data && (this.data = a.data), void 0 !== a.dissipating && (this.dissipating = a.dissipating), void 0 !== a.gradient && (this.gradient = a.gradient), void 0 !== a.maxIntensity && (this.maxIntensity = a.maxIntensity), void 0 !== a.opacity && (this.opacity = a.opacity), this.div.style.opacity = this.opacity ? this.opacity :
            0.6, void 0 !== a.radius && (this.radius = a.radius), this.kernels = null, this.setMap(a.map || this.map))
    }
})();
var deps, util = util || {};
util.getInternetExplorerVersion = function() {
    var a = -1;
    "Microsoft Internet Explorer" == navigator.appName && null != /MSIE ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) && (a = parseFloat(RegExp.$1));
    return a
};
util.loadScripts = function(a, d, b) {
    for (d = 0; d < a.length; d++) document.write("<script src='" + b + a[d] + "'>\x3c/script>");
    document.write("<script>TGOS.APPID = 'BHvpiOJ5Wp41CsxemFMNWQ==';TGOS.APIKEY = 'mcXodoZFWJaUJRFS5H3gCec83a570/QupBX5ROqlSmu9vZW61YOYMe86Om9zQ2g2pVSGtjfLi5gex++mKHMFNK95UFUwZD3TtpSdH73WhL5KMv0WZVPMe5rB4KiLpaRrReusEFx+W10=';\x3c/script>")
};
TGOS_LOADED = 1;
var DEBUG_MODE = !1;