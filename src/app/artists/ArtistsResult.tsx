"use client";
import { useState, useEffect } from "react";
import "./ArtistsResult.css";
import { Button } from "@/components/ui/button";
import data from "@/app/data/data-artist.json";
import { SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { type CarouselApi } from "@/components/ui/carousel"
import ArtistSearchForm from "./ArtistSearchForm";

const AZAsciis = Array.from({ length: 26 }, (_, index) => index + 65);

export default function ArtistsResult() {
  const [api, setApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [isListFilterVisible, setListFilterVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const searchLower = search.toLowerCase();

  const filteredData = data
    .filter((artist) => {
      const matchesSearch =
        artist.name_en.toLowerCase().includes(searchLower)
        || artist.major.toLowerCase().includes(searchLower)

      const matchesSelect = select === "all"
        || artist.major === select;

      const matchesSelectedArtist =
        selectedArtist === "" ||
        (selectedArtist.match(/[A-Z]/) && artist.name_en.charAt(0).toUpperCase() === selectedArtist);

      const matchesCategory = selectedCategory === ""

      return matchesSearch && matchesSelect && matchesSelectedArtist && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name_en.localeCompare(b.name_en);
      } else {
        return b.name_en.localeCompare(a.name_en);
      }
    });

  const groupedData = filteredData.reduce((acc: { [key: string]: typeof data; }, search) => {
    const firstCharEn = search.name_en.charAt(0).toUpperCase();

    if (!acc[firstCharEn]) {
      acc[firstCharEn] = [];
    }

    acc[firstCharEn].push(search);
    return acc;
  }, {});

  const toggleListFilter = () => {
    setListFilterVisible(!isListFilterVisible);
  };

  const closeListFilter = () => {
    setListFilterVisible(false);
  };

  const handleMainCategoryChange = (value: string) => {
    setSelect(value);
    setSelectedCategory("");
  };

  useEffect(() => {
    if (!api) return;

    const updateScrollState = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateScrollState();
    api.on("select", updateScrollState);
    api.on("reInit", updateScrollState);

    return () => {
      api.off("select", updateScrollState);
      api.off("reInit", updateScrollState);
    };
  }, [api]);

  return (
    <div>
      <div className="flex justify-center">
        <Image src="/images/artist-img.png" alt="Artist" width={400} height={400} />
      </div>
      <div className="hidden lg:flex justify-center">
        <div className="relative w-[700px]">
          <ArtistSearchForm search={search} setSearch={setSearch} />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center">
        <div className="lg:w-[700px] lg:pt-5">
          <div className="hidden flex-col lg:flex">
            <div className="flex justify-center space-x-4">
              <Button
                className={`text-gray-600 font-bold text-sm hover:text-orange-500 px-1 py-1 items-start bg-white hover:bg-white shadow-none ${selectedArtist === "" ? "text-orange-500" : ""}`}
                onClick={() => setSelectedArtist("")}
              >
                ALL
              </Button>
              {AZAsciis.map(ascii => (
                <Button
                  key={ascii}
                  className={`text-gray-600 font-bold text-sm hover:text-orange-500 px-1 py-1 items-start bg-white hover:bg-white shadow-none ${selectedArtist === String.fromCharCode(ascii) ? "text-orange-500" : ""}`}
                  onClick={() => setSelectedArtist(String.fromCharCode(ascii))}
                >
                  {String.fromCharCode(ascii)}
                </Button>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex justify-center pt-5 space-x-4">
            <Select onValueChange={handleMainCategoryChange} value={select}>
              <SelectTrigger className="rounded-full bg-gray-300">
                <SelectValue placeholder="Thai Artists" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectGroup>
                  <SelectItem value="all">Thai Artists</SelectItem>
                  <SelectItem value="National Artist: ศิลปินแห่งชาติ">National Artist</SelectItem>
                  <SelectItem value="Beloved: ศิลปินอันเป็นที่รัก">Beloved</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setSortOrder(value as "asc" | "desc")} value={sortOrder}>
              <SelectTrigger className="rounded-full bg-gray-300">
                <SelectValue placeholder="Artist name A - Z" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectGroup>
                  <SelectItem value="asc">Artist name A - Z</SelectItem>
                  <SelectItem value="desc">Artist name Z - A</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="p-5 lg:p-0">
          <div className="lg:hidden cursor-pointer relative">
            <div className="flex">
              <ArtistSearchForm search={search} setSearch={setSearch} />
              <div className="pt-1.5 pl-3">
                <SlidersHorizontal
                  className="flex justify-end"
                  onClick={toggleListFilter} />
                <div
                  className={`fixed z-50 top-0 right-0 h-full w-9/12 md:w-1/2 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isListFilterVisible ? "translate-x-0" : "translate-x-full"}`}
                >
                  <div className="p-4 flex justify-end">
                    <X onClick={closeListFilter} />
                  </div>
                  <div className="max-h-screen overflow-y-scroll">
                    <h3 className="font-semibold text-xl px-5 p-2">ARTIST NAME</h3>
                    <div className="px-5 py-3">
                      <Select onValueChange={handleMainCategoryChange} value={select}>
                        <SelectTrigger className="rounded-full bg-gray-300 w-full p-5">
                          <SelectValue placeholder="Thai Artists" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectItem value="all">Thai Artists</SelectItem>
                            <SelectItem value="National Artist: ศิลปินแห่งชาติ">National Artist</SelectItem>
                            <SelectItem value="Beloved: ศิลปินอันเป็นที่รัก">Beloved</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Select onValueChange={(value) => setSortOrder(value as "asc" | "desc")} value={sortOrder}>
                        <SelectTrigger className="rounded-full bg-gray-300 w-full p-5 mt-3">
                          <SelectValue placeholder="Artist name A - Z" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectItem value="asc">Artist name A - Z</SelectItem>
                            <SelectItem value="desc">Artist name Z - A</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {isListFilterVisible && (
              <div
                className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
                onClick={closeListFilter}
              ></div>
            )}
            <div className="lg:hidden flex pt-5 space-x-6">
              <Button
                className={`text-gray-600 font-bold text-sm hover:text-orange-500 px-1 py-1 items-start bg-white hover:bg-white shadow-none ${selectedArtist === "" ? "text-orange-500" : ""}`}
                onClick={() => setSelectedArtist("")}
              >
                All
              </Button>
              <Carousel
                setApi={setApi}
                opts={{
                  align: "start",
                }}
                className="w-11/12 lg:w-full pr-5"
              >
                <CarouselContent className="relative pl-5 space-x-6">
                  {AZAsciis.map(ascii => (
                    <Button
                      key={ascii}
                      className={`text-gray-600 font-bold text-sm hover:text-orange-500 px-1 py-1 items-start bg-white hover:bg-white shadow-none ${selectedArtist === String.fromCharCode(ascii) ? "text-orange-500" : ""}`}
                      onClick={() => setSelectedArtist(String.fromCharCode(ascii))}
                    >
                      {String.fromCharCode(ascii)}
                    </Button>
                  ))}
                </CarouselContent>
                <CarouselPrevious
                  className={`absolute -left-1 top-4 ${!canScrollPrev ? "hidden" : ""}`}
                />
                <CarouselNext
                  className={`absolute right-6 sm:-right-2 lg:-right-0.5 top-4 ${!canScrollNext ? "hidden" : ""}`}
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="pt-5 pl-5 font-bold">
          {filteredData.length > 0
            ? `${filteredData.length} artists of ${data.length}`
            : "ยังไม่มีข้อมูลแสดงในส่วนนี้"}
        </p>
        {Object.keys(groupedData).map(firstCharEn => (
          <div key={firstCharEn} className="w-full">
            <div className="pt-5 pl-5">
              <div className="flex items-end space-x-2">
                <h3 className="text-3xl">{firstCharEn}</h3>
                {selectedArtist !== "" && (
                  <div className="flex space-x-2">
                    <span>|</span>
                    <p className="text-sm">
                      {groupedData[firstCharEn].length} artists of {data.length}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 m-5 gap-4">
              {groupedData[firstCharEn].map(item => (
                <Link key={item.slug} className="cursor-pointer" href={`/profile/${item.slug}`}>
                  <div>
                    <div className="h-0 pb-[100%] relative">
                      <Image
                        className="mx-auto object-cover w-full h-full absolute top-0 bottom-0 left-0 right-0 rounded-full artist-img shadow-xl"
                        src={item.image_url}
                        alt={item.name_en}
                        width={600}
                        height={400}
                      />
                    </div>
                    <div className="pt-3">
                      <p className="text-sm text-center"><b>{item.name_en}</b></p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
