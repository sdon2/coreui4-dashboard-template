const routeHas = function (urlPattern) {
    var routes = Object.keys(Ziggy.routes);
    for (var i = 0; i < routes.length; i++) {
        if (new RegExp(urlPattern).test(routes[i])) {
            return true;
        }
    }
    return false;
};

const routeIs = function (routePattern) {
    var routes = Object.keys(Ziggy.routes);
    for (var i = 0; i < routes.length; i++) {
        if (new RegExp(routePattern).test(routes[i])) {
            var route_matched = routes[i];
            if (Ziggy.url + '/' + Ziggy.routes[route_matched].uri === window.location.href) {
                return true;
            }
        }
    }
    return false;
}

export { routeHas, routeIs };
