import Image from "next/image";

type PageTitleProps = {
  imgSrc: string;
  imgAlt: string;
};

export default function PageTitle({ imgSrc, imgAlt }: PageTitleProps) {
  return (
    <div className="max-w-[95rem] w-full mx-auto">
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={imgAlt}
          width={1500}
          height={350}
          className="py-6 md:py-16 h-full w-full"
        />
      )}
    </div>
  );
}
