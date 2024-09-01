"use client";
import React, { useState } from 'react';
import data from '@/app/data/data-artist.json';
import Name from '@/app/profile/[slug]/Name';
import Documents from '@/app/profile/[slug]/Document';
import Other from '@/app/profile/[slug]/Other';
import Library from '@/app/profile/[slug]/Library';
import Image from 'next/image';
import { Artist } from '@/components/types/Artist';
interface ProfileProps {
    params: {
        slug: string;
    };
}

export default function Profilepage({ params }: ProfileProps) {
    const { slug } = params;
    const artist = data.find((artist) => artist.slug === slug) as Artist | undefined;

    const [activeTab, setActiveTab] = useState<'Name' | 'Library' | 'Documents' | 'Other'>('Name');

    const handleTabClick = (tab: 'Name' | 'Library' | 'Documents' | 'Other') => {
        setActiveTab(tab);
    };

    if (!artist) {
        return <div>Artist not found.</div>;
    }

    return (
        <div>
            <div className="relative">
                <Image
                    className="object-cover w-[150px] h-[150px] md:w-[180px] md:h-[180px] lg:w-[250px] lg:h-[250px] absolute left-5 translate-y-full rounded-full z-1 top-24 md:top-12 lg:top-2"
                    src={artist.image_url}
                    alt={artist.name_en}
                    width={200}
                    height={200}
                />
                <div>
                    <Image
                        className="object-cover w-full h-80 lg:h-96"
                        src="/images/natural-home.jpg"
                        alt="Background"
                        width={1200}
                        height={800}
                    />
                </div>
                <div className="max-w-3xl mx-auto flex flex-col text-center">
                    <div className="mt-28 lg:mt-36 xl:mt-12 mb-8 flex text-center pb-10 mx-5 relative z-20">
                        {['Name', 'Library', 'Documents', 'Other'].map((tab) => (
                            <div key={tab} className="w-1/4 flex justify-center">
                                <p
                                    className={`text-lg cursor-pointer ${activeTab === tab ? 'text-yellow-600' : ''}`}
                                    onClick={() => handleTabClick(tab as typeof activeTab)}
                                >
                                    {tab}
                                </p>
                            </div>
                        ))}
                        <div
                            className={`absolute bottom-0 h-1 bg-yellow-600 transition-all duration-500 ease-in-out ${{
                                Name: 'left-0 w-1/4',
                                Library: 'left-1/4 w-1/4',
                                Documents: 'left-2/4 w-1/4',
                                Other: 'left-3/4 w-1/4',
                            }[activeTab]}`}
                        ></div>
                    </div>
                    {activeTab === 'Name' && <Name artist={artist} />}
                    {activeTab === 'Library' && <Library />}
                    {activeTab === 'Documents' && <Documents />}
                    {activeTab === 'Other' && <Other />}
                </div>
            </div>
        </div>
    );
}