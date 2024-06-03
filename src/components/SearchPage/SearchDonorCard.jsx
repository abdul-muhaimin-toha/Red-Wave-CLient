const SearchDonorCard = ({ donor }) => {
  const { name, email, bloodGroup, upazila, district, image_url } = donor;
  return (
    <div className="border p-4">
      <img
        src={"https://i.ibb.co/KFy2gVR/tamim.jpg"}
        alt="User Photo"
        className="h-60 w-full rounded border-2 border-primary object-cover"
      />
      <h4 className="my-3 text-xl font-bold text-primary">A Positive</h4>
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="my-1 text-sm">Email: {email}</p>

      <p className="my-1 text-sm">
        {upazila}, {district}
      </p>
    </div>
  );
};

export default SearchDonorCard;
