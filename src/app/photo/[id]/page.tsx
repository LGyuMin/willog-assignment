import PhotoDetail from '@/components/PhotoDetail'

export default function PhotoDetailPage({ 
    params
}: {
    params: { id: string }
}) {
    return (
        <PhotoDetail photoId={params.id} isModal={false} />
    )
}
