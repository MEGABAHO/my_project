import Image from 'next/image';

interface CubeImageProps {
    src: string;
    alt: string;
    face: 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom';
    objectPosition?: string;
}

export default function CubeImage({ src, alt, face, objectPosition }: CubeImageProps) {
    return (
        <div className={`cube-part ${face}`}>
            <Image
                src={src}
                alt={alt}
                fill
                className="cube-image"
                style={objectPosition ? { objectPosition } : undefined}
                sizes="200px"
                priority
            />
        </div>
    );
}
