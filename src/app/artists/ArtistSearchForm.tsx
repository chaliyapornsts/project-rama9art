
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ArtistSearchFormProps {
    search: string;
    setSearch: (value: string) => void;
  }

export default function ArtistSearchForm({ search, setSearch }: ArtistSearchFormProps) {

    return (
        <div className="w-full">
            <div className="hidden lg:flex justify-center">
                <div className="relative w-[700px]">
                    <Search className="absolute left-2 top-2" />
                    <Input
                        type="search"
                        className="rounded-full p-2 bg-gray-300 pl-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                    />
                </div>
            </div>
            <div className="lg:hidden cursor-pointer relative">
                <Search className="absolute left-2 top-2" />
                <Input
                    type="search"
                    className="rounded-full p-2 bg-gray-300 pl-10"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                />
            </div>
        </div>
    )
}
