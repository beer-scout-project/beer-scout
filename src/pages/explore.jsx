import BeverageInfoPost from "../components/BeverageInfoPost";
import LocationInfoPost from "../components/LocationInfoPost";
import { Link } from "react-router-dom";

export default function Explore() {
  return (
    <div className="m-auto flex max-w-max flex-col gap-8 p-10">
      <div>
        <h2>Explore</h2>
      </div>
      <div className="width flex flex-col gap-2">
        <h6>Happening Now</h6>
        <div className="flex flex-wrap gap-4">
          <BeverageInfoPost
            avatarImage="/public/temp-images/bannerman-logo.jpg"
            avatarName="Bannerman Brewing Co."
            primaryInfo="All pints are $5 each"
            additionalInfo="From 4pm to 6pm"
          />
          <BeverageInfoPost
            avatarImage="/public/temp-images/brewdock-logo.png"
            avatarName="Brewdock"
            primaryInfo="Jugs for $25"
            additionalInfo="Anything from our rotating tape selection #1 or #2"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h6>Recent posts</h6>
        <div className="flex flex-wrap gap-4">
          <BeverageInfoPost
            avatarImage="/public/temp-images/girl1-avatar.jpg"
            avatarName="Jane Smith"
            primaryInfo="Bannerman Brewing Co."
            additionalInfo="Had their All Hands and it was crisp and light."
          />
          <BeverageInfoPost
            avatarImage="/public/temp-images/guy1-avatar.jpg"
            avatarName="Frank Douglas"
            primaryInfo="Brewdock"
            additionalInfo="Had a jug of Port Rexton Gluten Free Lager, and I would highly recommend!"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h6>All Happy Hours</h6>
        <div className="flex flex-wrap gap-4">
          <LocationInfoPost
            imagePath="/public/temp-images/landwash-brewery.png"
            imageDescription="Landwash Brewery"
            locationName="Landwash Brewery"
            postInfo="Introducing our new Happy Hour!"
          />
          <LocationInfoPost
            imagePath="/public/temp-images/banished-brewery.jpg"
            imageDescription="Banished Brewery"
            imageLocation
            locationName="Banished Brewery"
            postInfo="Our tap room is now open!"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h6>Map View</h6>
        <div className="min-h-[250px] min-w-[250px] max-w-[786px] flex-shrink flex-grow basis-[350px] max-[795px]:max-w-[384px]">
          <Link to="/map">
            <img
              className="rounded-2xl"
              src="/public/temp-images/temp-map.png"
              alt="Map of all happy hours"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
