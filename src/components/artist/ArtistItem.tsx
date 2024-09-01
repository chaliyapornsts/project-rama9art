import Image from "next/image";
import Link from "next/link";
import { Artist } from "@/components/types/Artist";

interface ArtistItemProps {
  artists: Artist[];
}

export default function ArtistItem({ artists }: ArtistItemProps) {

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 m-5 gap-4">
      {artists.map((artist) => (
        <Link
          key={artist.slug ?? artist.id}
          className="relative"
          href={`/profile/${artist.slug ?? artist.id}`}
        >
          <div className="h-0 pb-[100%] relative">
            <Image
              className="mx-auto object-cover w-full h-full absolute top-0 bottom-0 left-0 right-0 rounded-full artist-img shadow-xl"
              src={artist.image_url ?? "https://www.eng.chula.ac.th/wp-content/uploads/2016/11/profile-pic.jpeg"}
              alt={artist.name_en ?? "Artist Image"}
              width={600}
              height={400}
            />
          </div>
          <div className="pt-3">
            <p className="text-sm text-center"><b>{artist.name_en}</b></p>
          </div>
        </Link>
      ))}
    </div>
  );
}
