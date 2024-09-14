import { SignedIn, UserProfile } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="flex items-center justify-center">
      <SignedIn>
        <UserProfile />
      </SignedIn>
    </div>
  );
};

export default page;
