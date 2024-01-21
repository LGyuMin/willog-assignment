import { createApi } from "unsplash-js"

const unplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_ACCESS_KEY!
});

export default function useUnplash() {
    const { search, photos, users } = unplash
    return { search, photos, users }
}