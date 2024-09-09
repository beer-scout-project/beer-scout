import BeverageInfoPost from "../components/BeverageInfoPost";

export default function Explore() {
  return (
    <div>
      <div>
        <h2>Explore</h2>
      </div>
      <div>
        <h6>Happening Now</h6>
        <div className="flex flex-col gap-4">
          <BeverageInfoPost
            locationImage="/public/temp-images/bannerman-logo.jpg"
            locationName="Bannerman Brewing Co."
            beverageInfo="All pints are $5 each"
            additionalInfo="From 4pm to 6pm"
          />
          <BeverageInfoPost
            locationImage="/public/temp-images/brewdock-logo.png"
            locationName="Brewdock"
            beverageInfo="Jugs for $25"
            additionalInfo="Anything from our rotating tape selection #1 or #2"
          />
        </div>
      </div>
      <div>
        <h6>Recent posts</h6>
      </div>
      <div>
        <h6>All Happy Hours</h6>
      </div>
      <div>
        <h6>Map View</h6>
      </div>
    </div>
  );
}
