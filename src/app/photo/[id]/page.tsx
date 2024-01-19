import PhotoDetail from '@/components/PhotoDetail'

export default function page({ 
    params
}: {
    params: { id: string }
}) {
    return (
        <PhotoDetail photoId={params.id} isModal={false} />
    )
}
