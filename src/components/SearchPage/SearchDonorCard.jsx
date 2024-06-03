const SearchDonorCard = ({ donor }) => {
  const { name, email, bloodGroup, upazila, district, image_url } = donor;
  return (
    <div className="col-span-1 border p-6">
      <img
        src={image_url}
        alt="User Photo"
        className="mb-8 h-60 w-full rounded border-2 border-primary object-cover"
      />
      <h4 className="my-3 text-xl font-bold text-primary">{bloodGroup}</h4>
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="my-1 text-sm">Email: {email}</p>

      <p className="my-1 text-sm">
        {upazila}, {district}
      </p>
    </div>
  );
};

export default SearchDonorCard;
