export default function AboutPage() {
  return (
    <div
      className="hero min-h-full"
      style={{
        backgroundImage: "url(/beerBackground.png)",
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-60 p-4 md:p-16">
        <div className="flex flex-col gap-12 rounded-lg bg-[#FDEBD0] bg-opacity-85 p-4 text-[#2f2f2f] md:p-8">
          <div className="flex flex-col gap-4">
            <h4>About</h4>
            <p>
              Beer Scout is here to help you track down the best beer deals in
              Downtown St. John's! 🍻 We want you to hang out with your friends
              and family without stressing about your wallet. So, let us know
              when you spot a great price—together, we can keep Beer Scout
              growing and our community thriving! Cheers! 🍻✨
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
          <div className="flex flex-col gap-8 md:flex-row">
            <img
              className="max-w-[275px] rounded-lg"
              src="/add-bar-form-happy-hr-350x906.png"
              alt="form for use to submit a beer price"
            />
            <div className="flex flex-col flex-wrap gap-4">
              <h5>Add a New Bar Price Form</h5>
              <p>
                Have a new location or beer price update that you'd like to
                share? Fill out this form to send us your suggested update.
              </p>
              <ol className="list-decimal pl-5">
                <li>Enter the name of the bar or location.</li>
                <li>Select the city that the bar is located in.</li>
                <li>Choose the serving size (in milliliters).</li>
                <li>Enter the price of the beer.</li>
              </ol>
              <p>
                Happy Hour details are optional. If you have a happy hour, check
                the tickbox and complete these details.
              </p>
              <ol className="list-decimal pl-5">
                <li>Select the day of the week that the happy hour is on.</li>
                <li>Enter the start time of the happy hour.</li>
                <li>Enter the end time of the happy hour.</li>
              </ol>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4>Terms of Service</h4>
            <p>
            Welcome to Beer Scout, your go-to resource for finding the best beer deals in Downtown St. John&#39;s, Newfoundland. By accessing or using our website, you agree to the following terms and conditions:
            </p>
            <ol className="list-decimal pl-5">
              <li>
                General Information
              </li>
              <p>
                Beer Scout provides information about beer deals and pricing around St. John’s. Our platform relies on user-submitted content, meaning deals and promotions are contributed by the community. We strive to ensure that the information provided is accurate, but we cannot guarantee the accuracy, completeness, or timeliness of any listing.
              </p>
              <br />
              <li>
                User Responsibilities
              </li>
              <p>
                By using Beer Scout, you agree to:
                <ul>
                  <li>
                    •	Provide accurate and truthful information when submitting deals.
                  </li>
                  <li>
                    •	Respect the intellectual property rights of Beer Scout and other users.
                  </li>
                  <li>
                    •	Not use the website for any illegal or harmful purposes.
                  </li>
                  <li>
                    •	Acknowledge that Beer Scout is for personal use only and not for commercial purposes.
                  </li>
                </ul>
              </p>
              <br />
              <li>
                Content Submission
              </li>
              <p>
                When submitting beer deals or other content to Beer Scout, you grant us the right to display and share this content on our platform. You are responsible for ensuring that your submissions do not infringe on any third-party rights or violate any laws.  
              </p>
              <br />
              <li>
                Limitation of Liability
              </li>
              <p>
                Beer Scout is not responsible for any inaccuracies in user-submitted content or any loss or damage resulting from the use of our website. We do not guarantee the availability or accuracy of any deals listed, as pricing and promotions may change at any time.  
              </p>
              <br />
              <li>
                Third-Party Links
              </li>
              <p>
                Beer Scout may include links to third-party websites or promotions. We do not control or endorse these external sites and are not responsible for their content or practices.  
              </p>
              <br />
              <li>
                Changes to the Terms
              </li>
              <p>
                Beer Scout reserves the right to modify these terms at any time. Any changes will be posted on this page, and your continued use of the website constitutes acceptance of these modifications.
              </p>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
