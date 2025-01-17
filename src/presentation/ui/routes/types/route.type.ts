export interface IInitialRootRoutes {
    rootStack: "routesPublic" | "routesPrivate";
    rootStackScreen: "routeWelcome" | "routePreLogin" | "routeTabs" | "routeModel"
}

export type IRootStackInitialScreenName = {
    routesPrivate: {
        screen: "routeTabs" | "routeModel"
    }

    routesPublic: {
        screen: "routeWelcome" | "routePreLogin"
    }
}

export type IRootStackName = {
    routesPrivate: IRootStackInitialScreenName["routesPrivate"];
    routesPublic: IRootStackInitialScreenName["routesPublic"];
}

export type PublicStackRoutes = {
    "routeWelcome": undefined;
    "routePreLogin": undefined;
};

export type PrivateStackRoutes = {
    "routeTabs": undefined;
    "routeModel": { brandCode: string, brandName: string };
};
