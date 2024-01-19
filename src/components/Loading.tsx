const loadingClassName = 'w-[80px] h-[80px] border-[6px] border-sky-600 border-b-transparent rounded-[50%] inline-block box-border animate-spin'

export default function Loading() {
    return (
        <div className='w-full h-full fixed top-0 left-0 z-50 bg-black/50 flex justify-center items-center'>
            <span className={loadingClassName}></span>
        </div>
    )
}