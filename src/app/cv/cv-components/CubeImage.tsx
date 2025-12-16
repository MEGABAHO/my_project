import Image from 'next/image';

interface CubeImageProps {
    src: string;
    alt: string;
    face: 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom';
}

export default function CubeImage({ src, alt, face }: CubeImageProps) {
    const isChefPhoto = src === '/cuisinier.jpg';
    
    return (
        <div className={`cube-part ${face}`}>
            <Image
                src={src}
                alt={alt}
                fill
                className={`cube-image ${isChefPhoto ? 'cube-image-chef' : 'cube-image-principle'}`}
                sizes="200px"
                priority
            />
        </div>
    );
}
