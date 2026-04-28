const imageAssets = import.meta.glob( "../assets/images/**/*", {
    eager: true,
    import: "default",
    query: "?url"
} ) as Record<string, string>;

export function getAssetsFile( url: string ) {
    return imageAssets[`../assets/images/${ url }`] ?? "";
}
