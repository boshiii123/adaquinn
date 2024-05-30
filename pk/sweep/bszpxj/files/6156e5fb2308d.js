window.ConfettiGenerator = function(g) {
    var d = {
        target: "confetti-holder",
        max: 80,
        size: 1,
        animate: !0,
        props: ["circle", "square", "triangle", "line"],
        colors: [
            [165, 104, 246],
            [230, 61, 135],
            [0, 199, 228],
            [253, 214, 126]
        ],
        clock: 25,
        interval: null,
        width: window.innerWidth,
        height: window.innerHeight
    };
    g && (g.target && (d.target = g.target), g.max && (d.max = g.max), g.size && (d.size = g.size), void 0 !== g.animate && null !== g.animate && (d.animate = g.animate), g.props && (d.props = g.props), g.colors && (d.colors = g.colors), g.clock && (d.clock = g.clock), g.width && (d.width = g.width), g.height && (d.height = g.height));
    var c = document.getElementById(d.target),
        b = c.getContext("2d"),
        f = [];

    function h(l, k) {
        l || (l = 1);
        var a = Math.random() * l;
        return k ? Math.floor(a) : a
    }

    function j(k) {
        var a = k.radius <= 3 ? 0.4 : 0.8;
        switch (b.fillStyle = b.strokeStyle = "rgba(" + k.color + ", " + a + ")", b.beginPath(), k.prop) {
            case "circle":
                b.moveTo(k.x, k.y), b.arc(k.x, k.y, k.radius * d.size, 0, 2 * Math.PI, !0), b.fill();
                break;
            case "triangle":
                b.moveTo(k.x, k.y), b.lineTo(k.x + k.angles[0] * d.size, k.y + k.angles[1] * d.size), b.lineTo(k.x + k.angles[2] * d.size, k.y + k.angles[3] * d.size), b.closePath(), b.fill();
                break;
            case "line":
                b.moveTo(k.x, k.y), b.lineTo(k.x + k.line * d.size, k.y + 5 * k.radius), b.lineWidth = 2 * d.size, b.stroke();
                break;
            case "square":
                b.save(), b.translate(k.x + 15, k.y + 5), b.rotate(k.rotation), b.fillRect(-15 * d.size, -5 * d.size, 15 * d.size, 5 * d.size), b.restore()
        }
    }
    return {
        render: function() {
            c.width = d.width, c.height = d.height, f = [];
            for (var a = 0; a < d.max; a++) {
                f.push({
                    prop: d.props[h(d.props.length, !0)],
                    x: h(d.width),
                    y: h(d.height),
                    radius: h(4) + 1,
                    line: Math.floor(h(65) - 30),
                    angles: [h(10, !0) + 2, h(10, !0) + 2, h(10, !0) + 2, h(10, !0) + 2],
                    color: d.colors[h(d.colors.length, !0)],
                    rotation: h(360, !0) * Math.PI / 180,
                    speed: h(d.clock / 7) + d.clock / 30
                })
            }
            return function a() {
                for (var e in b.clearRect(0, 0, d.width, d.height), f) {
                    j(f[e])
                }! function() {
                    for (var l = 0; l < d.max; l++) {
                        var k = f[l];
                        d.animate && (k.y += k.speed), k.y > d.height && (f[l] = k, f[l].x = h(d.width, !0), f[l].y = -10)
                    }
                }(), d.animate && requestAnimationFrame(a)
            }()
        },
        clear: function() {
            d.animate = !1, clearInterval(d.interval), requestAnimationFrame(function() {
                b.clearRect(0, 0, c.width, c.height);
                var a = c.width;
                c.width = 1, c.width = a
            })
        }
    }
};