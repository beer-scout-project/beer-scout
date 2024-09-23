export default function AboutPage() {
  return (
    <div
      className="hero min-h-full"
      style={{
        backgroundImage: "url(/drinks-with-friends-1920x1080.png)",
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-60 p-4 md:p-16">
        <div className="rounded-lg bg-[#FDEBD0] bg-opacity-85 p-4 text-[#2f2f2f] md:p-8">
          <div className="mb-12">
            <h4 className="mb-4">About</h4>
            <p>
              Beer Scout shows you the locations that have the cheapest beer
              prices near you (currently only available for Downtown St.
              John’s).
            </p>
          </div>
          <div className="flex flex-col gap-8 md:flex-row">
            <img
              className="max-w-[275px] rounded-lg"
              src="/beer-price-list-570x900.png"
              alt="image of the beer price list"
            />
            <div className="flex flex-col flex-wrap gap-4">
              <h5>Beer Price List</h5>
              <ol className="list-decimal pl-5">
                <li>
                  The location highlighted at the top of the list has the
                  cheapest beer in your area.
                </li>
                <li>The price shown is in dollars per milliliter.</li>
                <li>
                  If the price has a clock icon next to it, this price is for a
                  specific timeframe. Click or hover over the icon to see
                  details.
                </li>
                <li>
                  The date and price was last updated is shown below the
                  location name. You can submit a price correction if you find a
                  price has changed.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
