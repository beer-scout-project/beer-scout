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
      <div>
        <h6>Recent posts</h6>
        <div className="flex flex-col gap-4">
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
      <div>
        <h6>All Happy Hours</h6>
      </div>
      <div>
        <h6>Map View</h6>
      </div>
    </div>
  );
}
