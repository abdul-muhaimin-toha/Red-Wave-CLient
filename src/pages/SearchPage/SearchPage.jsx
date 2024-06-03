import SearchDonorCard from "@/components/SearchPage/SearchDonorCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useDistricts from "@/hooks/getDataFromDB/useDistricts";
import useDonorBySearch from "@/hooks/getDataFromDB/useDonorBySearch";
import useUpazilas from "@/hooks/getDataFromDB/useUpazilas";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

const SearchPage = () => {
  const { districts, isDistrictsPending } = useDistricts();
  const { upazilas, isUpazilasPending } = useUpazilas();
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedUpazila, setSelectedUpazila] = useState(null);

  const { allDonor, isAllDonorPending } = useDonorBySearch(
    selectedBloodGroup,
    selectedDistrict,
    selectedUpazila,
  );

  const handleSearchForm = (e) => {
    e.preventDefault();
    setSelectedBloodGroup(e.target.bloodGroup.value);
    setSelectedDistrict(e.target.district.value);
    setSelectedUpazila(e.target.upazila.value);
  };

  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="flex items-center justify-center">
            <Card className="mb-8 mt-16 w-full md:mb-14 md:mt-24 md:w-4/5 md:p-3 lg:w-4/5 xl:w-3/5">
              <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-3xl font-semibold  uppercase">
                  Search for donor!
                </CardTitle>
                <CardDescription className="text-md">
                  Enter your information bellow to find donors.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleSearchForm}
                  className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4"
                >
                  <div className="grid gap-2">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <select
                      name="bloodGroup"
                      id="bloodGroup"
                      className="border bg-white p-2 text-sm text-black"
                    >
                      <option value="A positive">A +</option>
                      <option value="A negative">A -</option>
                      <option value="B positive">B +</option>
                      <option value="B negative">B -</option>
                      <option value="AB positive">AB +</option>
                      <option value="AB negative">AB -</option>
                      <option value="O positive">O +</option>
                      <option value="O negative">O -</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="district">District</Label>
                    <select
                      name="district"
                      id="district"
                      className="border bg-white p-2 text-sm text-black"
                    >
                      {districts.map((district) => (
                        <option key={district._id} value={district.name}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="upazila">Upazila</Label>
                    <select
                      name="upazila"
                      id="upazila"
                      className="border bg-white p-2 text-sm text-black"
                    >
                      {upazilas.map((upazila) => (
                        <option key={upazila._id} value={upazila.name}>
                          {upazila.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button
                    type="submit"
                    className="mt-4 md:col-span-3 md:mt-1 lg:col-span-1 lg:mt-8"
                  >
                    Search Now
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="mb-10 flex flex-col  items-center justify-center  md:mb-20">
            {!allDonor.length && (
              <h3 className="mx-auto max-w-screen-sm text-center text-lg">
                No donor avaiable for your search!
              </h3>
            )}
            <div className="grid w-full grid-cols-1 gap-8  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allDonor.map((donor) => (
                <SearchDonorCard key={donor._id} donor={donor} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
