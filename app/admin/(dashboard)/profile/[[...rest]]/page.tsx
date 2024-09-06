import { SignedIn, UserProfile } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="flex justify-center items-center">
      <SignedIn>
        <UserProfile />
      </SignedIn>
    </div>
  );
};

export default page;
