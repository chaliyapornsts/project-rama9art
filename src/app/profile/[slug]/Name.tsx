import { ComponentArtistProps } from "@/components/types/Artist";

export default function ArtistItem({ artist }: ComponentArtistProps) {
  const hasBiographyData = artist.born_day || artist.born_month || artist.born_year || artist.birth_place || artist.dead_day || artist.dead_month || artist.dead_year || artist.address || artist.telephone || artist.Email || (artist.education && artist.education.length > 0) || (artist.exhibitions && artist.exhibitions.length > 0) || (artist.solo_exhibitions && artist.solo_exhibitions.length > 0) || (artist.group_exhibitions && artist.group_exhibitions.length > 0) || (artist.awards && artist.awards.length > 0) || (artist.collections && artist.collections.length > 0);

  return (
    <div className="h-screen mb-24">
      <p className="text-3xl pt-10">{artist.name_en}</p>
      <p className="text-3xl">{artist.name_th}</p>
      {hasBiographyData && (
        <div>
          <h4 className="text-3xl pt-10 pb-10">BIOGRAPHY</h4>
          <div className="text-left mx-5">
            {(artist.born_day || artist.born_month || artist.born_year) && (
              <div className="grid grid-cols-[150px_1fr]">
                <p className="font-bold">Born:</p>
                <p>{`${artist.born_day || ''} ${artist.born_month || ''} ${artist.born_year || ''}`.trim()}</p>
              </div>
            )}
            {artist.birth_place && (
              <div className="grid grid-cols-[150px_1fr]">
                <p className="font-bold">Place of birth:</p>
                <p>{artist.birth_place}</p>
              </div>
            )}
            {(artist.dead_day || artist.dead_month || artist.dead_year) && (
              <div className="grid grid-cols-[150px_1fr]">
                <p className="font-bold">Died:</p>
                <p>{`${artist.dead_day || ''} ${artist.dead_month || ''} ${artist.dead_year || ''}`.trim()}</p>
              </div>
            )}
            {artist.address && (
              <div className="grid grid-cols-[150px_1fr]">
                <p className="font-bold">Address:</p>
                <p>{artist.address}</p>
              </div>
            )}
            {artist.telephone && (
              <div className="grid grid-cols-[150px_1fr]">
                <p className="font-bold">Telephone:</p>
                <p>{artist.telephone}</p>
              </div>
            )}
            {artist.Email && (
              <div className="grid grid-cols-[150px_1fr]">
                <p className="font-bold">Email:</p>
                <p>{artist.Email}</p>
              </div>
            )}

            {artist.education && artist.education.length > 0 && (
              <div>
                <p className="font-bold">Education</p>
                {artist.education.map((edu, index) => (
                  <div key={index} className="grid grid-cols-[150px_1fr] mb-2">
                    <p className="font-medium">
                      {edu.year && edu.year_end
                        ? `${edu.year} - ${edu.year_end}`
                        : edu.year || ''}
                    </p>
                    <div>
                      <p>{edu.education_en || ''}</p>
                      {edu.education_th && <p>{edu.education_th}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {artist.exhibitions && artist.exhibitions.length > 0 && (
              <div>
                <p className="font-bold">Exhibitions</p>
                {artist.exhibitions.map((exhib, index) => (
                  <div key={index} className="grid grid-cols-[150px_1fr] mb-2">
                    <p className="font-medium">
                      {exhib.year && exhib.year_end
                        ? `${exhib.year} - ${exhib.year_end}`
                        : exhib.year || ''}
                    </p>
                    <div>
                      <p>{exhib.exhibitions_en || ''}</p>
                      {exhib.exhibitions_th && <p>{exhib.exhibitions_th}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {artist.solo_exhibitions && artist.solo_exhibitions.length > 0 && (
              <div>
                <p className="font-bold">Solo Exhibitions</p>
                {artist.solo_exhibitions.map((solo, index) => (
                  <div key={index} className="grid grid-cols-[150px_1fr] mb-2">
                    <p className="font-medium">
                      {solo.year && solo.year_end
                        ? `${solo.year} - ${solo.year_end}`
                        : solo.year || ''}
                    </p>
                    <div>
                      <p>{solo.exhibitions_en || ''}</p>
                      {solo.exhibitions_th && <p>{solo.exhibitions_th}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {artist.group_exhibitions && artist.group_exhibitions.length > 0 && (
              <div>
                <p className="font-bold">Group Exhibitions</p>
                {artist.group_exhibitions.map((group, index) => (
                  <div key={index} className="grid grid-cols-[150px_1fr] mb-2">
                    <p className="font-medium">
                      {group.year && group.year_end
                        ? `${group.year} - ${group.year_end}`
                        : group.year || ''}
                    </p>
                    <div>
                      <p>{group.exhibitions_en || ''}</p>
                      {group.exhibitions_th && <p>{group.exhibitions_th}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {artist.awards && artist.awards.length > 0 && (
              <div>
                <p className="font-bold">Awards</p>
                {artist.awards.map((award, index) => (
                  <div key={index} className="grid grid-cols-[150px_1fr] mb-2">
                    <p className="font-medium">
                      {award.year && award.year_end
                        ? `${award.year} - ${award.year_end}`
                        : award.year || ''}
                    </p>
                    <div>
                      <p>{award.awards_en || ''}</p>
                      {award.awards_th && <p>{award.awards_th}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {artist.collections && artist.collections.length > 0 && (
              <div>
                <p className="font-bold">Collections</p>
                {artist.collections.map((collection, index) => (
                  <div key={index} className="grid grid-cols-[150px_1fr] mb-2">
                    <p className="font-medium">
                      {collection.year && collection.year_end
                        ? `${collection.year} - ${collection.year_end}`
                        : collection.year || ''}
                    </p>
                    <div>
                      <p>{collection.collections_en || ''}</p>
                      {collection.collections_th && <p>{collection.collections_th}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};