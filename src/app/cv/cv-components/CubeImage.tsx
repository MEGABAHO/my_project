import Image from 'next/image';

interface CubeImageProps {
    src: string;
    alt: string;
    face: 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom';

}

export default function CubeImage({ src, alt, face }: CubeImageProps) {
    return (
        <div className={`cube-part ${face}`}>
            <Image
                src={src}
                alt={alt}
                fill
                className="cube-image"

                sizes="200px"
                priority
            />
        </div>
    );
}
