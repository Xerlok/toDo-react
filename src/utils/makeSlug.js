export default function makeSlug(slug) {
    return slug
        .toLowerCase()
        .trim()
        // normalize accented characters (é → e, ü → u, etc.)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        // remove anything that is not letter, number, space or hyphen
        .replace(/[^a-z0-9\s-]/g, "")
        // replace multiple spaces or hyphens with single hyphen
        .replace(/[\s-]+/g, "-")
        // remove leading/trailing hyphens
        .replace(/^-+|-+$/g, "");
}
