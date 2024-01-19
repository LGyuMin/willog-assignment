import Modal from '@/components/Modal'
import PhotoDetail from '@/components/PhotoDetail'

export default function page({ 
    params 
}: { 
    params: {id: string};
}) {
    return (
        <Modal>
            <PhotoDetail photoId={params.id} isModal={true} />
        </Modal>
    )
}