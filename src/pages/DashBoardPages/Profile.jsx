import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import useAuth from "@/hooks/auth/useAuth";
import useAxiosPublic from "@/hooks/axios/useAxiosPublic";
import useDistricts from "@/hooks/getDataFromDB/useDistricts";
import useUpazilas from "@/hooks/getDataFromDB/useUpazilas";
import useUser from "@/hooks/getDataFromDB/useUser";
import { imageUpload } from "@/utils/imageUpload";
import { useState } from "react";

const Profile = () => {
  const [updateModeOn, setUpdateModeOn] = useState(false);
  const { user, updateUserProfile, setIsLoading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { userFromDB, isUserFromDBPending, refetch } = useUser(user.email);
  const { districts, isDistrictsPending } = useDistricts();
  const { upazilas, isUpazilasPending } = useUpazilas();

  const handleUpdateMode = () => {
    setUpdateModeOn(!updateModeOn);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bloodGroup = e.target.bloodGroup.value;
    const picture = e.target.picture.files[0];
    const district = e.target.district.value;
    const upazila = e.target.upazila.value;

    const updatedInfo = {
      name,
      email,
      bloodGroup,
      district,
      upazila,
    };

    if (picture) {
      imageUpload(picture)
        .then((res) => {
          const image_url = res.data.data.display_url;
          updateUserProfile(name, image_url)
            .then(() => {
              setIsLoading(false);
              axiosPublic
                .put("users", { ...updatedInfo, image_url })
                .then((res) => {
                  if (res.data.modifiedCount > 0) {
                    console.log(res.data);
                    refetch();
                    setUpdateModeOn(!updateModeOn);
                    toast({
                      title: "Congratulations!",
                      description: "Profile updated successfully.",
                    });
                  }
                })
                .catch((err) => {
                  setIsLoading(false);
                  console.log(err);
                });
            })
            .catch((err) => console.log(err.message));
        })
        .catch((err) => console.log(err));
    }

    if (!picture) {
      updatedInfo.image_url = userFromDB.image_url;
      updateUserProfile(name, userFromDB.image_url)
        .then(() => {
          setIsLoading(false);
          axiosPublic
            .put("users", { ...updatedInfo })
            .then((res) => {
              if (res.data.modifiedCount > 0) {
                console.log(res.data);
                refetch();
                setUpdateModeOn(!updateModeOn);
                toast({
                  title: "Congratulations!",
                  description: "Profile updated successfully.",
                });
              }
            })
            .catch((err) => {
              setIsLoading(false);
              console.log(err);
            });
        })
        .catch((err) => console.log(err.message));
    }
  };

  if (isDistrictsPending || isUpazilasPending || isUserFromDBPending) return;

  return (
    <>
      {updateModeOn ? (
        <section>
          <div className="mx-auto max-w-screen-2xl px-4">
            <div className="flex items-center justify-center">
              <div className="my-16 w-full border-2 p-3 md:my-24 md:w-4/5 md:p-8 lg:w-3/5 xl:w-2/5 ">
                <div className="space-y-4">
                  <h3 className="text-3xl font-semibold  uppercase">
                    Update your profile
                  </h3>
                  <p className="text-md">
                    First enable the update mode by clicking in update profile
                    button.
                  </p>
                  {updateModeOn ? (
                    ""
                  ) : (
                    <Button onClick={handleUpdateMode} size="sm">
                      Enter into Edit Mode
                    </Button>
                  )}
                </div>
                <div className="mt-10">
                  <form onSubmit={handleFormSubmit} className="grid gap-5">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        disabled={!updateModeOn}
                        id="name"
                        defaultValue={user.displayName}
                        type="text"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        disabled
                        defaultValue={user.email}
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 grid gap-2 md:col-span-1 ">
                        <Label htmlFor="bloodGroup">Blood Group</Label>
                        <select
                          disabled={!updateModeOn}
                          defaultValue={userFromDB.bloodGroup}
                          name="bloodGroup"
                          id="bloodGroup"
                          className="border bg-white p-2 text-sm text-black"
                        >
                          <option value="A positive">A Positive</option>
                          <option value="A negative">A Negative </option>
                          <option value="B positive">B Positive</option>
                          <option value="B negative">B Negative</option>
                          <option value="AB positive">AB Positive</option>
                          <option value="AB negative">AB Negative</option>
                          <option value="O positive">O Positive</option>
                          <option value="O negative">O Negative</option>
                        </select>
                      </div>
                      <div className="col-span-2 grid gap-2 md:col-span-1">
                        <Label htmlFor="image">Add new image</Label>
                        <Input
                          disabled={!updateModeOn}
                          id="picture"
                          type="file"
                          className="file:text-primary"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 grid gap-2 md:col-span-1">
                        <Label htmlFor="district">District</Label>
                        <select
                          disabled={!updateModeOn}
                          name="district"
                          id="district"
                          defaultValue={userFromDB.district}
                          className="border bg-white p-2 text-sm text-black"
                        >
                          {districts.map((district) => (
                            <option key={district._id} value={district.name}>
                              {district.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-2 grid gap-2 md:col-span-1 ">
                        <Label htmlFor="upazila">Upazila</Label>
                        <select
                          disabled={!updateModeOn}
                          name="upazila"
                          id="upazila"
                          defaultValue={userFromDB?.upazila}
                          className="border bg-white p-2 text-sm text-black"
                        >
                          {upazilas.map((upazila) => (
                            <option key={upazila._id} value={upazila.name}>
                              {upazila.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {updateModeOn ? (
                      <Button type="submit">Update Now</Button>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section>
          <div className="mx-auto max-w-screen-2xl px-4">
            <div className="flex items-center justify-center">
              <div className="my-16 w-full border-2 p-3 md:my-24 md:w-4/5 md:p-8 lg:w-3/5 xl:w-2/5 ">
                <div className="space-y-4">
                  <h3 className="text-3xl font-semibold  uppercase">
                    Update your profile
                  </h3>
                  <p className="text-md">
                    First enable the update mode by clicking in update profile
                    button.
                  </p>
                </div>
                <div className="mt-10 flex items-center gap-5">
                  <img
                    src={user.photoURL}
                    alt="User Image"
                    className="h-24 w-24"
                  />
                  <div className="flex flex-col space-y-1">
                    <h4 className="text-md font-semibold uppercase">
                      {user.displayName}
                    </h4>
                    <div className="mt-4 text-xs">
                      <p className="">{user.email}</p>
                      <p className="">{userFromDB.bloodGroup}</p>
                    </div>
                    <div className="mt-4 text-xs">
                      <p>District: {userFromDB.district}</p>
                      <p>Upazila: {userFromDB.upazila}</p>
                    </div>
                  </div>
                </div>

                <Button onClick={handleUpdateMode} className="mt-6" size="sm">
                  Enter into Edit Mode
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Profile;
